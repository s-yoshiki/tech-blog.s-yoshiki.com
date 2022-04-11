---
title: "[AmazonSES] node.js と ejs を利用してEメールを送信する"
path: "/entry/272"
date: "2022-04-09 21:00"
coverImage: "../../../images/thumbnail/aws-logo.png"
author: "s-yoshiki"
tags: ["javascript", "node.js", "amazon-aws"]
---

## 概要

AmazonSES + node.js + ejs を利用してメールを送信するデモです。

やりたいことはテンプレートエンジンであるejsを利用してテンプレートにメールを埋め込みAmazonSESでメールを送信します。

## 環境

- aws-sdk v2.1111
- ejs v3.1.6

ローカルで実行する場合はIAM(アクセスキー/シークレットキー)等の設定を正しく行います。

特に AmazonSESのポリシーが利用できるかを確認しておきます。

## 実装

### セットアップ

次のコマンドでセットアップを行います。

```shell
npm init # 適当なオプション
npm install aws-sdk
npm install ejs
```

プロジェクトの初期化が終わったら、`index.js` `mail.ejs` を作成します。

```
.
├── index.js
├── mail.ejs
├── node_modules
├── package-lock.json
└── package.json
```

### index.js

```js
const AWS = require("aws-sdk");
const ejs = require("ejs");
const fs = require("fs/promises");

const ses = new AWS.SES({ apiVersion: "2010-12-01", region: "ap-northeast-1" });

const main = async () => {
  const template = (await fs.readFile('./mail.ejs')).toString()
  const data = ejs.render(template, {
    name: 'Tanaka Taro',
    body: 'hello world'
  })
  const params = {
    Destination: {
      CcAddresses: [
        'test@example.com',
      ],
      ToAddresses: [
        'test@example.com',
      ]
    },
    Message: {
      Body: {
        Text: {
         Charset: "UTF-8",
         Data: data
        },
       },
       Subject: {
        Charset: 'UTF-8',
        Data: 'Test email'
       }
      },
    Source: 'TANAKA Taro<test@example.com>',
    ReplyToAddresses: [
       'test@example.com',
    ],
  };
  const res = await ses.sendEmail(params).promise()
  console.log(res)
};

main();

// todo:
// test@example.com は適当なものに置き換える
```

### mail.ejs

```
<%= name %> 様

<%= body %>
```

### 実行

```
node index.js
```

これを実行すると次のようなメールが送信されます。

```
Tanaka Taro 様

hello world
```