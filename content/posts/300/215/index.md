---
title: "Amplify CLI のインストール"
path: "/entry/215"
date: "2021-01-07 18:00"
coverImage: "../../../images/thumbnail/aws-logo.png"
author: "s-yoshiki"
tags: ["amazon-aws","継続的インテグレーション","aws-amplify"]
---

## 概要

Amplify CLI のインストールから設定まで

 - Amplify CLI をインストール
 - 設定
 - Amplify アプリを初期化

## Amplify CLI のインストール

次のコマンドでインストールします。

```shell
npm install -g @aws-amplify/cli
```

## Amplify CLI の設定

次のコマンドを実行します

```shell
amplify configure
```

ブラウザが立ち上がり、いくつかの情報を聞かれます。途中でIAMユーザを作らされます。

 - region:  ap-northeast-1
 - user name:  amplify-test
 - accessKeyId:  IAMユーザのアクセスキーID
 - secretAccessKey:  IAMユーザのシークレットキー
 - Profile Name:  amplify-test

## バックエンド環境作成

Amplify Console から `Backend enviroment` を選択してバックエンド環境を作成します。

`Local setup instructions`

```shell
amplify pull --appId ${application_id} --envName staging
```

再び質問されるのでこのように回答しました。

```
? Choose your default editor: Visual Studio Code
? Choose the type of app that you're building javascript
Please tell us about your project
? What javascript framework are you using react
? Source Directory Path:  src
? Distribution Directory Path: build
? Build Command:  npm run-script build
? Start Command: npm run-script start
? Do you plan on modifying this backend? Yes
```