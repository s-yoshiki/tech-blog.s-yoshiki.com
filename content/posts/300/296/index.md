---
title: "Turborepoを利用したmonorepo構成のNestJS+Prismaプロジェクトの構築"
path: "/entry/296"
date: "2023-01-04 16:00"
coverImage: "../../../images/thumbnail/nestjs-logo.png"
author: "s-yoshiki"
tags: ["turborepo", "nestjs", "prisma", "javascript", "typescript", "npm", "node.js"]
---

## 概要

turborepoを利用したmonorepo構成のNestJS+Prismaプロジェクトを構築した際のメモです。

### なぜ monorepo で管理するのか

Prismaを別のワークスペースに分けることで、フロントエンドのアプリケーションからPrismaのインタフェースをimportして共有したり、バックエンドの複数のリポジトリで単一のPrismaの設定を共有することに対応したかったからです。

### turborepo について

[Turborepo](https://turbo.build/)

Turborepoは Vercel が開発を行っている JS/TS のmonorepo環境のビルド管理システムです。

### 環境

- npm 8.19.3
- node 19.1.0
- turbo 1.6.3

## 初期化

まずは以下のコマンドでたたき台を作成します。

```sh
npx create-turbo@latest
# ここではappという名前でプロジェクトを作成
```

デフォルトで次のようなアプリケーション・パッケージが作成されます。

 - apps/web: Next.js with TypeScript
 - apps/docs: Next.js with TypeScript
 - packages/ui: Shared React component library
 - packages/eslint-config-custom: Shared configuration (ESLint)
 - packages/tsconfig: Shared TypeScript `tsconfig.json`

## Backend関連リポジトリの初期化

ここではサンプル用のAPIとしてNestJSとExpress.jsの2パターンのAPIの構築を実施します。

### API1: NestJS API

NestJSは、Node.jsを使用したサーバサイドアプリケーション開発のためのフレームワークです。
モダンなJavaScriptの言語機能をフルに活用したアプリケーションを構築することができます。

npm workspaceのオプションを利用してNestJSのAPIのワークスペースを作成します。

```sh
npm init -y -w apps/nestjs-api
cd apps/nestjs-api
rm package.json # nest new コマンドを利用したいため削除
npx nest new .
# 質問にてpackage管理にnpmを選択
cd ../../
npm -w apps/nestjs-api run start  # 起動することを確認
```

このプロジェクトではルートディレクトリで`npm run dev`を行った場合に全てのリポジトリにてnpm run devが行われるようにしたいため、`apps/nestjs-api/package.json`を調整します


```diff
+    "dev": "nest start",
-    "start": "nest start",
```

### API2: Express.js

Express.jsは軽量なWebアプリケーションフレームワークです。

```sh
npm init -y -w apps/express-api
npm -w apps/express-api install express --save
```

`apps/express-api/index.js`

```js
const express = require('express')
const app = express()
const port = 3003

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
```

`apps/express-api/package.json`

```diff
  "scripts": {
+    "dev": "node index.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
```

## Primsa

### Prismaについて

データベースを操作するためのJavaScriptライブラリです。
ORM（Object-Relational Mapping）と呼ばれるもので、データベースに保存されているデータを、JavaScriptのオブジェクトとして扱えるようにするものです。

MySQLやPostgreSQL、SQLiteなどをはじめとするリレーショナルデータベース、MongoDBなどをはじめとするドキュメントデータベース、そしてGraphQLを使用したデータベースなどに対応しています。

### packageとしてPrismaを追加

ここでは `database` という名前で package として Prisma を追加します。
以下のコマンドでワークスペースを構築します。

```sh
npm init -y -w packages/database
npm -w packages/database install @prisma/client
npm -w packages/database install prisma --save-dev
echo "public-hoist-pattern[]=*prisma*" >> .npmrc
cd packages/database
npx prisma init
```

`schema.prisma`にスキーマの定義を行います。ここではUsersテーブルを作成します。

`packages/database/prisma/schema.prisma`

```prisma
generator client {
  provider = "prisma-client-js"
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

prisma の generate や push に対応するコマンドを定義します。

`packages/database/package.json`

```diff
  "scripts": {
+    "db:generate": "prisma generate",
+    "db:push": "prisma db push --skip-generate",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
```

`turbo.json`

```diff
{
  "pipeline": {
+    "db:generate": {
+      "cache": false
+    },
+    "db:push": {
+      "cache": false
+    },
  }
}
```

最後に外のパッケージやアプリケーションでimportできるようexportの設定を定義します。

`packages/database/index.ts`

```ts
export * from '@prisma/client';
```

```diff
-  "main": "index.js",
+  "main": "./index.ts",
+  "types": "./index.ts"
```

## NestJS用 PrismaService

NestJSでPrismaを利用するためにDIに対応するServiceクラスを作成します。
ここではこのクラスが複数のワークスペースで利用することを想定して、`prisma-nestjs-plugin`という名前で独立したパッケージとして作成します。

```sh
npm init -y -w packages/prisma-nestjs-plugin
npm -w packages/prisma-nestjs-plugin install @nestjs/common
mkdir -p packages/prisma-nestjs-plugin/src
touch packages/prisma-nestjs-plugin/src/index.ts
touch packages/prisma-nestjs-plugin/src/prisma.service.ts
touch packages/prisma-nestjs-plugin/src/prisma.module.ts
touch packages/prisma-nestjs-plugin/tsconfig.json
```

`packages/prisma-nestjs-plugin/package.json`

```diff
-  "main": "index.js",
+  "main": "./src/index.ts",
+  "types": "./src/index.ts",
+  "dependencies": {
+    "database": "*"
+  },
```

`packages/prisma-nestjs-plugin/src/prisma.service.ts`

```ts
import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from 'database'
 
@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }
}
```

`packages/prisma-nestjs-plugin/src/prisma.module.ts`

```ts
import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Module({
  imports: [],
  providers: [PrismaService],
})
export class PrismaModule {}
```

外部のアプリケーション・パッケージで利用できるようexportの設定を定義します。

`packages/prisma-nestjs-plugin/src/index.ts`

```ts
export * from './prisma.service'
export * from './prisma.module'
```

VSCodeでデコレータの警告が出力されるので、tsconfig の設定で許容させるようにします。

`packages/prisma-nestjs-plugin/tsconfig.json`

```json
{
  "compilerOptions": {
    "experimentalDecorators": true
  }
}
```

これでNestJSからPrismaを呼び出す準備が整いました。
試しにNestJSのアプリケーションからPrismaClientを呼び出す実装を書いてみます。

`apps/nestjs-api/package.json`

```diff
  "dependencies": {
+    "prisma-nestjs-plugin": "*",
```

`apps/nestjs-api/src/app.module.ts`

```ts
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from 'prisma-nestjs-plugin'

@Module({
  imports: [PrismaModule], // PrismaModuleを追加
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```

`apps/nestjs-api/src/app.service.ts`

```ts
import { Injectable } from '@nestjs/common';
// packages/prisma-nestjs-plugin を import
import { PrismaService } from 'prisma-nestjs-plugin'

@Injectable()
export class AppService {
  // PrismaServiceをコンストラクタの引数に設定
  constructor(private readonly prisma: PrismaService) {}

  getHello(): string {
    return 'Hello World!';
  }

  // Usersを取得するクエリ
  async getUsers() {
    return await this.prisma.user.findMany();
  }
}
```


ついでに `apps/express-api/index.js` の方にも `/users`のエンドポイントを生やしておきます。

```js
const { PrismaClient } = require("database")
const express = require('express')
const app = express()
const port = 3003

const prisma = new PrismaClient();

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/users', async (req, res) => {
  const users = await prisma.user.findMany();
  res.send(users)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
```

両方のAPIで動作確認ができたら構築は完了です。


## 参考にしたサイト

- Turborepo関連
  - [Turborepo を使ってモノレポ構成の npmパッケージ を管理する](https://cam-inc.co.jp/p/techblog/728530570199434396)
  - [Using Prisma with Turborepo – Turborepo](https://turbo.build/repo/docs/handbook/tools/prisma)
- Prisma関連
  - [npmの依存関係について勘違いしていたこと](https://zenn.dev/estra/articles/npm-about-dependencsies)
  - [モノレポにおけるback/front間のPrismaの型共有の方法](https://zenn.dev/takky94/articles/23f4c814432208)
  - [Quickstart with TypeScript & SQLite](https://www.prisma.io/docs/getting-started/quickstart)
- NestJS関連
  - [Documentation | NestJS - A progressive Node.js framework](https://docs.nestjs.com/cli/monorepo)
- TypeScript関連
  - [ts-nodeを使ってtsconfigのpathsをちゃんと読み込ませる | Oinari Tech Blog](https://tech-blog.tkcco21.me/blog/resolve_paths_with_ts-node/)
