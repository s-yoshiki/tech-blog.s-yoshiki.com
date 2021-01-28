---
title: "AWS S3のアクセスキーIDとシークレットアクセスキーの取得 作業用ユーザを作成"
path: "/entry/135"
date: "2019-06-12 00:04:09"
coverImage: "../../../images/thumbnail/aws-logo.png"
author: "s-yoshiki"
tags: ["amazon-aws","linux","amazon-s3","iam"]
---

## 概要

AWS S3 接続用のアカウントを作成する方法の紹介。
ここで作成するユーザはS3のオブジェクトの読み込みおよび書き込みができるものとします。

## ユーザの作成

### ユーザ作成ページまでの遷移

ユーザ作成権限のあるアカウントでログイン後、AWSマネジメントコンソールにアクセス。
右上のユーザ名のところから「Security Credentials」もしくは「マイセキュリティ資格情報」を選択。

<img src="https://images-tech-blog.s-yoshiki.com/img/2019/06/20190611225939.png">

「User」のタブを選択します
<img src="https://images-tech-blog.s-yoshiki.com/img/2019/06/20190611231029.png">

次にユーザ作成をクリックします。

<img src="https://images-tech-blog.s-yoshiki.com/img/2019/06/20190611231301.png">

### アカウント詳細設定

名前は任意とします。
<img src="https://images-tech-blog.s-yoshiki.com/img/2019/06/20190611231634.png">

AWS SDKを使う場合やFTPクライアントを用いてファイルをアップロードする場合は「プログラムによるアクセス」をチェックします。

この作成したアカウントでマネジメントコンソールにアクセスする場合は「AWSマネジメントコンソールへのアクセス」を有効にします。

ここでは「プログラムによるアクセス」のみを洗濯したとして次に進みます。

### アカウント権限の設定

S3オブジェクトに対してのreadおよびwriteの設定をします。

まず「既存のポリシーを直接アタッチ」を選択。

ここで「AmazonS3FullAccess」をチェックします。

フィルターに「S3」と入力すると絞り込むことができます。

<img src="https://images-tech-blog.s-yoshiki.com/img/2019/06/20190611232640.png">

この次にタグなどを設定できますが、必須ではないため飛ばします。

### アクセスキーIDとシークレットアクセスキー

作業が完了したら最後のページにアクセスキーIDとシークレットアクセスキーが表示されるのでメモしましょう。

<img src="https://images-tech-blog.s-yoshiki.com/img/2019/06/20190611233424.png">

この2つのアクセスキーがS3への認証時に必要となります。

## ユーザの削除

上記に記した手順でユーザ一覧が表示されるページに遷移します。

消す対象のユーザを選択し、「ユーザの削除」をクリックします。

<img src="https://images-tech-blog.s-yoshiki.com/img/2019/06/20190611234003.png">

こんな感じで簡単に削除することができます。