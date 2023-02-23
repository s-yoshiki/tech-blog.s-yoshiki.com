---
title: "NestJS+Prismaのバンドルツール比較とコンテナイメージ軽量化"
path: "/entry/297"
date: "2023-01-22 16:00"
coverImage: "../../../images/thumbnail/nest-logo.png"
author: "s-yoshiki"
tags:
  [
    "webpack",
    "nestjs",
    "prisma",
    "javascript",
    "typescript",
    "npm",
    "node.js",
    "docker",
  ]
---

## 概要

NestJS+Prisma 構成のアプリケーションを webpack や ncc 等のバンドルツールでバンドルした際のツールの比較をまとめました。
特に Prisma のバンドルに苦戦したため、そこを中心に説明しています。

またこの記事では Prisma+NestJS のアプリケーションを作る初期段階の部分は説明を省いています。

### モチベーション

NestJS も Prisma についてもサイズが大きく少しでも余分なものを減らし、サイズを小さくすることが狙いでした。

### 環境

- Node 関連

  - npm 8.19.3
  - node 19.1.0
  - Prisma 9.0.0
  - NestJS

- Docker

  - Docker version 20.10.21, build baeda1f
  - Docker Compose version v2.12.2

- MySQL 8.0

マシンは M1 Mac を利用しています。

### 結果

各ビルド方法について後述します。
先に結果を説明すると以下の通りとなりました。

#### コンテナ

| No | コンテナイメージ                    | 利用技術         | 容量   |
| -- | ----------------------------------- | ---------------- | ------ |
| 1  | node:18                             | 特になし         | 3.38GB |
| 2  | node:18                             | webpack          | 1.02GB |
| 3  | node:18-slim                        | webpack          | 352MB  |
| 4  | node:18-slim                        | ncc              | 316MB  |
| 5  | node:18-slim                        | vite             | 312MB  |
| 6  | gcr.io/distroless/nodejs18-debian11 | ncc              | 279MB  |
| 7  | gcr.io/distroless/cc                | ncc + vercel/pkg | 177MB  |

※ 1 以外はマルチステージビルドを利用

#### アプリケーション単体でのビルド

またアプリケーション単体のサイズは以下の通りとなりました。

| No | バンドル方法 | 成果物の全体 | ソースのみ |
| -- | ------------ | ------------ | ---------- |
| 1  | バンドルなし | 100MB        |            |
| 2  | webpack      | 24MB         | 9MB        |
| 3  | ncc          | 19MB         | 4MB        |
| 4  | vite         | 30MB         | 1MB        |

※ マルチステージビルドはビルド用とプロダクション用のコンテナを分けてビルドに依存するツールをプロダクション用コンテナに含めない様にした方法のことを指してます。
※これらの比較は、オプションを厳密に揃えた訳ではないのでフェアではない可能性があります。

## プロジェクト作成

- [Documentation | NestJS - A progressive Node.js framework](https://docs.nestjs.com/recipes/prisma)
- [NestJS Database & Prisma | Type-safe ORM for SQL Databases](https://www.prisma.io/nestjs)

あたりを参考に NestJS+Prisma アプリケーションを作成します。
DB には MySQL8 を採用しています。

### schema.prisma の設定

schema.prisma に以下の内容を定義します。

**schema.prisma**

```prisma
generator client {
  provider      = "prisma-client-js"
  binaryTargets = ["native", "darwin", "debian-openssl-1.1.x", "linux-arm64-openssl-1.1.x"]
}

datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}

model User {
  id    Int     @id @default(autoincrement())
  email String  @unique
  name  String?
}
```

schema.prisma の設定の際にポイントとなるのが `binaryTargets` です。
基本的には `native` を指定しておけば問題ないようです。
(そもそもデフォルトの指定値が`native`であるので指定不要)

ビルドしたマシンと異なる環境で利用する場合は、任意のターゲットを指定する必要があります。

[Generators (Reference)](https://www.prisma.io/docs/concepts/components/prisma-schema/generators)

このバイナリは prisma-engine のバイナリなのですが、
より詳しい説明はこちらで紹介されています。

[Prisma engines](https://www.prisma.io/docs/concepts/components/prisma-engines)

それから、`binaryTargets`の設定を変更した際に`prisma generate`しないと利用したいバイナリが履かれなかったので、忘れずに実行する必要がありそうです。

## webpack の設定

`webpack.config.js`には次のような設定を定義します。

**webpack.config.js**

```js
const path = require('path');
const webpack = require('webpack');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const { NODE_ENV = 'production' } = process.env;
const CopyWebpackPlugin = require('copy-webpack-plugin');
const WriteFilePlugin = require('write-file-webpack-plugin');

module.exports = {
  entry: './src/main.ts',
  mode: NODE_ENV,
  // note: 調査目的として例外発生時のコードの行数を出力するようにする
  devtool: 'inline-source-map',
  target: 'node',
  externals: [
    {
      '@nestjs/websockets/socket-module':
        'commonjs2 @nestjs/websockets/socket-module',
      '@nestjs/microservices/microservices-module':
        'commonjs2 @nestjs/microservices/microservices-module',
    },
  ],
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        {
          from: '.env',
          to: '.env',
        },
        {
          from: './prisma/schema.prisma',
          to: './schema.prisma',
        },
        {
          from: './node_modules/.prisma/client/*.node',
          to({ context, absoluteFilename }) {
            return Promise.resolve('[name][ext]');
          },
        },
      ],
    }),
    new WriteFilePlugin(),
    new webpack.IgnorePlugin({
      /**
       * @see https://github.com/nestjs/nest/issues/1706
       */
      checkResource(resource) {
        const lazyImports = [
          '@nestjs/microservices',
          '@nestjs/platform-express',
          'cache-manager',
          'class-validator',
          'class-transformer',
        ];
        if (!lazyImports.includes(resource)) {
          return false;
        }
        try {
          require.resolve(resource);
        } catch (err) {
          return true;
        }
        return false;
      },
    }),
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js',
  },
  resolve: {
    extensions: ['.ts', '.js'],
    plugins: [new TsconfigPathsPlugin({ configFile: './tsconfig.build.json' })],
  },
  module: {
    rules: [{ test: /\.ts$/, loader: 'ts-loader' }],
  },
  stats: {
    warningsFilter: [
      'node_modules/express/lib/view.js',
      'node_modules/@nestjs/common/utils/load-package.util.js',
      'node_modules/@nestjs/core/helpers/load-adapter.js',
      'node_modules/optional/optional.js',
      (warning) => false,
    ],
  },
};
```

また依存関係として次のプラグインをインストールします。

```sh
npm install webpack tsconfig-paths-webpack-plugin copy-webpack-plugin write-file-webpack-plugin
# 環境構築の方法によっては、webpackが既にインストールされている可能性があるため要確認
```

ここでもいくつかつまづくポイントがあったので説明します。

### socket-module と icroservices-module

Webpack で特にオプションなしでインストールしようとした際に次の様なエラーが発生しました。

```
Module not found: Error: Can't resolve '@nestjs/microservices/microservices-module' in ...
```

なので、socket-module と icroservices-module に対しては上記の様な対応を行っております。
根本的な原因の特定まではできなかったです。

※ NestJS 9.1.6 で解決された様です。

[Nest 9.1.3 version does not work with webpack config from the serverless page · Issue #10367 · nestjs/nest](https://github.com/nestjs/nest/issues/10367)

### Prisma 関連

Prisma を利用したアプリケーションを動かすためには `schema.prisma` と バイナリを入れる必要があります。
なので、`copy-webpack-plugin`を利用してファイルを出力先のディレクトリ(dist)に格納するよう設定しています。

### ビルド

package.json に webpack でビルドする設定を記載し、ビルドします。

**package.json**

```diff
{
  "scripts": {
+    "build": "rimraf dist && webpack",
  }
}
```

```sh
npm run build
```

ビルド後、次のようにファイルが吐かれます。

```sh
./dist
├── libquery_engine-darwin.dylib.node
├── main.js
└── schema.prisma
```

node_modules インストール済みの状態でプロジェクト全体が 100MB に対して、
dist 以下の全てのファイルサイズの合計が 44MB、main.js のサイズが 9MB になりました。

44MB の内訳は Prisma エンジンの割合が大きいのものとなっています。

一応起動するか確認しておきます。

```sh
node dist/main.js
```

## vercel/ncc

[vercel/ncc](https://github.com/vercel/ncc)は単一ファイルにコンパイルするためのツールです。

### インストール〜ビルド

以下のコマンドでインストールします。

```sh
npm i -g @vercel/ncc
```

以下のコマンドでビルドします。

```sh
ncc build src/main.ts -o dist/
# ソースマップとかを生成したい場合は
ncc build src/main.ts -o dist/ -s -m
```

次の様に出力されました。オプションなしでも関連するリソースも拾ってくれるのでありがたいです。

```
./dist
├── client
│   └── libquery_engine-darwin.dylib.node
├── schema.prisma
└── index.js
```

しかしこの状態で `node dist` を実行しようとしたら「Error: Query engine library for current platform "darwin" could not be found.」と怒られたので、 `./dist/client`以下にあるライブラリを`./dist`に置き直したら動作しました。

### 所感

利用してもた感想として、webpack に比べ複雑な設定を記載しなくても、
必要なリソースの調整を自動で行うため非常に便利だと思いました。

prisma に関して prisma-engine のパスを調整できなかったので、
もう少し調査が必要そうです。

ビルド時間も webpack より早かったです。(体感)

## vite

### インストール〜ビルド

vite 関連のモジュールをインストールします。

```sh
npm install vite vite-plugin-node
```

`vite.config.ts`を作成し以下の内容を定義します。

**vite.config.ts**

```ts
import { defineConfig } from 'vite';
import { VitePluginNode } from 'vite-plugin-node';

export default defineConfig({
  server: {
    port: 3000,
  },
  // note: monorepoの場合は次の様に解決する
  // resolve: {
  //   alias: [
  //     { find: '@my-modules', replacement: `${__dirname}/../../@my-modules/src/` },
  //   ],
  // },
  plugins: [
    ...VitePluginNode({
      adapter: 'nest',
      appPath: './src/main.ts',
      exportName: 'viteNodeApp',
      tsCompiler: 'esbuild',
    }),
  ],
  optimizeDeps: {
    exclude: [
      '@nestjs/microservices',
      '@nestjs/websockets',
      'cache-manager',
      'class-transformer',
      'class-validator',
      'fastify-swagger',
    ],
  },
});
```

```sh
npx vite build
# vite-plugin-node と static を処理するプラグインが依存関係で競合したため強引に解決
cp ./node_modules/.prisma/client/libquery_engine-* ./dist
cp ./prisma/schema.prisma ./dist
```

```
node dist/main.js
```

### 所感

全体として

気になった点はプラグインの依存関係と monorepo 対応です。

プラグインの依存関係について、
vite-plugin-node と vite-plugin-static-copy のバージョンによる依存関係の問題で併用することができなかったです。

monorepo 環境の場合、ローカルのパッケージの依存関係を解決するのに`resolve`を利用する必要がありました。

[Lerna + vite で他パッケージの依存関係をうまく解決できないときの確認ポイント](https://zenn.dev/catnose99/articles/08cf9e475004b2)

を参考に解決することができましたが、複数のパッケージを利用している場合は調整に手間がかかると思われます。

他のツールでは発生しなかったので、ここを解決できればよりよかったなという感じです。

あくまでも体感ですがビルド時間も webpack より早かったです。

## vercel/pkg + distroless

[vercel/pkg: Package your Node.js project into an executable](https://github.com/vercel/pkg)

vercel/pkgは、JavaScriptのアプリケーションやライブラリをバイナリにコンパイルし、ネイティブなアプリケーションに変換するツールです。
これにより、Windows、macOS、LinuxなどのOS上で実行可能なバイナリ形式に変換されます。
また、Node.jsのランタイムと一緒にバイナリを生成するため、Node.jsがインストールされていない環境でもアプリケーションが実行可能になります。

これにより、Node.jsランタイム用のコンテナを選ばなくても良くなるので、
現時点で最も軽量な部類に入ると思われる[distroless](https://github.com/GoogleContainerTools/distroless)でコンテナイメージを作成します。

そして以下のようにDockerfileを定義します。

```dockerfile
FROM node:18 as nestjs-api-builder

RUN apt-get -y update && apt-get -y install -y wget perl gcc make

WORKDIR /tmp
RUN wget https://www.zlib.net/zlib-1.2.13.tar.gz &&\
  tar -xvf zlib-1.2.13.tar.gz &&\
  cd zlib-1.2.13 &&\
  ./configure  --prefix="/opt/local" &&\
  make &&\
  make install

ENV LD_LIBRARY_PATH /opt/local/lib:/$LD_LIBRARY_PATH
ENV PATH /opt/local/bin:/$PATH

WORKDIR /app
RUN mkdir -p /app
COPY . /app
RUN chmod 705 -R /app && npm install

RUN mkdir dist2 && npx ncc build src/main.ts -o dist2/ && cp dist/client/libquery_engine-linux-arm64-openssl-* dist2

RUN npx pkg dist/index.js \
  -o dist2/app \
  -t node18-linux-arm64 \
  --no-bytecode \
  --public-packages "*" \
  --public

FROM busybox:1.35.0-uclibc as busybox
FROM gcr.io/distroless/cc as nestjs-api
COPY --from=nestjs-api-builder /opt/local/lib /opt/local/lib
COPY --from=busybox /bin/sh /bin/sh
COPY --from=nestjs-api-builder --chown=nonroot:nonroot /app/apps/nestjs-api/dist /app
ENV NODE_ENV production
ENV LD_LIBRARY_PATH /opt/local/lib:/lib:/$LD_LIBRARY_PATH
ENV DATABASE_URL "mysql://docker:docker@host.docker.internal:3306/app"
WORKDIR /app
COPY --from=nestjs-api-builder /app/dist2 /app
USER nonroot
EXPOSE 3002
CMD [ "/app/app" ]
```

Distriless + Prismaで動かすには少し調整が必要だったので、
こちらの記事で説明しています。

[DistrolessコンテナでPrismaを動かす | 404 motivation not found](https://tech-blog.s-yoshiki.com/entry/298)

## 試そうと思ったけどやめたこと

### esbuild

esbuild 単体ではビルドができなかったです。swc と組み合わせて使うのであれば、利用できそうです。

https://github.com/nestjs/nest-cli/issues/731

## 参考にしたサイト

- [Query engine binary could not be found · Issue #616 · prisma/prisma-client-js](https://github.com/prisma/prisma-client-js/issues/616)
- [AWS CDK の NodejsFunction で Prisma をバンドルして Lambda へデプロイする | DevelopersIO](https://dev.classmethod.jp/articles/aws-cdk-nodejsfunction-prisma-deploy/)
- [NestJS アプリケーションのビルドサイズを ncc 使って 300MB 減らした話 - Qiita](https://qiita.com/kyusyukeigo/items/d913d35e455aba782c55)
- [ZenSoftware/bundled-nest: 💥 Nest 🔰 Webpack 🔰 Docker 💥 --- 🏯 Now archived for historical reference ⛩](https://github.com/ZenSoftware/bundled-nest)
- [Bundle a NestJS + TypeORM application (with webpack) - Stack Overflow](https://stackoverflow.com/questions/66169705/bundle-a-nestjs-typeorm-application-with-webpack)
- [NestJS アプリケーションを webpack で Bundle | 404 motivation not found](https://tech-blog.s-yoshiki.com/entry/260)
- [](https://stackoverflow.com/questions/72152136/nestjs-microservices-cannot-find-module)
