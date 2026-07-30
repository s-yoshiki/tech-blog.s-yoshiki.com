---
title: "Node.js で作成した REST API を Docker化"
path: "/entry/249"
date: "2021-08-08 01:00"
coverImage: "../../../images/thumbnail/docker-logo.png"
author: "s-yoshiki"
tags: ["docker","node.js","javascript"]
---

## 概要

Node.js で作成した REST API を Docker化した際のメモです。

## Node.jsでREST APIを作成

まずはNode.jsでアプリケーションを作成します。

次のようにディレクトリ/ファイルを作成します。

```shell
app
├── Dockerfile # コンテナ
├── index.js # APIのソース
└── package.json
```

`package.json`に次のように記載します。

```json
{
  "name": "docker-nodejs-api",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "start": "node index.js"
  },
  "author": "hoge",
  "license": "MIT",
  "dependencies": {
    "express": "^4.17.1"
  }
}
```

`index.js`にREST APIを実装します。

```js
'use strict';

const express = require('express');
const app = express();

app.get('/', (req, res) => {
  const param = {
    'msg': 'Hello World!',
  };
  res.header('Content-Type', 'application/json; charset=utf-8');
  res.send(param);
});

app.listen(8080, '0.0.0.0');
```

これは単純に `{"msg": "Hello World!"}` を返すAPIです。

これでAPIの作成部分は完了です。

## コンテナ化

### コンテナ化定義

`Dockerfile`に次の内容を記載します。

```dockerfile
FROM node:12

WORKDIR /usr/src/app

# アプリケーションの依存関係をインストールする
COPY package*.json ./

RUN npm install

# アプリケーションのソースをバンドル
COPY . .

EXPOSE 8080
CMD [ "node", "index.js" ]
```

`.dockerignore`にコンテナに含まないファイル/ディレクトリを定義します。

```
node_modules
```

### コンテナ化作業

次のコマンドでコンテナイメージをビルドします。

```shell
docker build . -t test/node-rest-api
```

ビルドが完了すると、`docker images`からイメージを確認することができます。

```shell
$ docker images
test/node-rest-api
```

次のコマンドでコンテナを開始します。8080ポートを8081ポートにバインドしたので、ブラウザから8081ポートで叩くとアクセスすることができます。

```
docker run -p 8081:8080 -d test/node-rest-api
```

## 参考

[Node.js Web アプリケーションを Docker 化する](https://nodejs.org/ja/docs/guides/nodejs-docker-webapp/)
