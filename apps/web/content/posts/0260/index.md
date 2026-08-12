---
title: "NestJSアプリケーションをwebpackでBundle"
path: "/entry/260"
date: "2022-02-20 17:00"
coverImage: "../../../images/thumbnail/nest-logo.png"
author: "s-yoshiki"
tags: ["javascript","typescript","nestjs","node.js","amazon-aws","aws-amplify"]
---

## 概要

NestJSで作成したアプリケーションをAWSのLambdaへデプロイする際にnode_modulesが肥大化しすぎてアップロードが困難になりました。

(Lambdaは250MBまでしかデプロイできないが、node_modulesを含めた全体のサイズが400MBを超えてしまった。)

なので、webpackによるbundle化を行いファイルサイズを圧縮しました。

その際の作業のメモです。

## 環境

- nodejs 17.3.0
- typescript 4.3.5
- nestjs 8.0.0
- webpack 5.66.0

## 準備

nest-cliをインストールします。

```
npm i -g @nestjs/cli
```

プロジェクト領域に移動しサンプルアプリを作成します。

その後開発サーバを起動し、 http://localhost:3000/ で `Hello World!`のレスポンスを確認します。

```
nest new sample-app
cd sample-app
npm run start
```

ビルドできるか確認しておきます。

ビルドが成功すると `./dist`にビルドされたファイルが格納されます。

```
npm run build
```

## webpackでバンドル

### webpack

webpackについて、NestJSはwebpack5に依存しているため追加での導入は不要です。

### webpack.config.js の定義

`webpack.config.js`を作成しリポジトリに配置します。

```js
const { NODE_ENV = 'production' } = process.env;
module.exports = {
  target: 'node',
  mode: NODE_ENV,
  externals: [
    {
      '@nestjs/websockets/socket-module':
        'commonjs2 @nestjs/websockets/socket-module',
      '@nestjs/microservices/microservices-module':
        'commonjs2 @nestjs/microservices/microservices-module',
    },
  ],
  optimization: {
    minimize: false,
  },
};
```

externals の項目は利用するモジュールに合わせて適宜変更します。
またexternalsに定義したものはnode_modulesディレクトリから呼ばれることになります。

### バンドル

`package.json`のbuild項目を次のように変更します。

変更前

```js
"scripts": {
  // 略
  "build": "nest build",
  // 略
}
```

変更後

```js
"scripts": {
  // 略
  "build": "nest build --webpack",
  // 略
}
```

### 実行

`npm run build` を行いバンドルファイルを生成します。

`npm run start:prod` もしくは `node dist/main` にて実行できるか確認します。

## リンク

- [Bundle a NestJS + TypeORM application (with webpack) - Stack Overflow](https://stackoverflow.com/questions/66169705/bundle-a-nestjs-typeorm-application-with-webpack)
