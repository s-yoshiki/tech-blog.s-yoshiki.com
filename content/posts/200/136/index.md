---
title: "Cyberduck で AWS S3に接続する"
path: "/entry/136"
date: "2019-06-12 00:26:47"
coverImage: "../../../images/thumbnail/aws-logo.png"
author: "s-yoshiki"
tags: ["amazon-aws","mac","s3","開発環境","iam","cyberduck"]
---

## 概要

Macでよく使われているFTPクライアント「Cyberduck」 で AWS S3に接続する方法の紹介。

## Cyberduck で S3に接続

### 検証環境

Cyberduck 7.0.0

<a href="https://cyberduck.io/">https://cyberduck.io/</a>

### 接続手順

Cyberduckを起動します。

左上の新規接続をクリックします。

<img src="https://images-tech-blog.s-yoshiki.com/img/2019/06/20190612000755.png">

接続先に「Amazon S3」を選択し、
アクセスキーID、シークレットアクセスキーを入力します。

<img src="https://images-tech-blog.s-yoshiki.com/img/2019/06/20190612001019.png">

これで接続できるかと思います。
アクセスキーID、シークレットアクセスキーの取得に関しては次のセクションを参考にしてください。

## S３接続ユーザの作成

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

公開バケットを作成する場合は次の手順を参考にしてください。

## S3バケットを作成する

AWSのコンソールからS3を選択します。

### オプションの設定

<a href="https://images-tech-blog.s-yoshiki.com/img/2019/01/201901250010_748f3m.jpg"><img src="https://images-tech-blog.s-yoshiki.com/img/2019/01/201901250010_748f3m.jpg"></a>

**S3の画面**

S3へ遷移したら、「バケットを作成する」ボタンを押下すると、モーダルウィンドウが立ち上がるのでそこから設定を入力します。

<a href="https://images-tech-blog.s-yoshiki.com/img/2019/01/201901242326_445jfi.jpg"><img src="https://images-tech-blog.s-yoshiki.com/img/2019/01/201901242326_445jfi.jpg"></a>

ここでは特に設定はしていません。
必要なオプションがあれば任意で選択して「次へ」をクリックします。

### アクセス許可の設定

<a href="https://images-tech-blog.s-yoshiki.com/img/2019/01/201901250010_839hwv.jpg"><img src="https://images-tech-blog.s-yoshiki.com/img/2019/01/201901250010_839hwv.jpg"></a>

ここで以下の4つのチェックボックスからチェックが外れていることを確認します。
<ul>
 	<li>新規のパブリック ACL と、パブリックオブジェクトのアップロードをブロックする (推奨)</li>
 	<li>パブリック ACL を通じて付与されたパブリックアクセスを削除する (推奨)</li>
 	<li>新規のパブリックバケットポリシーをブロックする (推奨)</li>
 	<li>バケットにパブリックポリシーがある場合、パブリックアクセスとクロスアカウントアクセスをブロックする (推奨)</li>
</ul>
チェックがついていれば外します。

<a href="https://images-tech-blog.s-yoshiki.com/img/2019/01/201901242331_f9jLMz.jpg"><img src="https://images-tech-blog.s-yoshiki.com/img/2019/01/201901242331_f9jLMz.jpg"></a>

バケット作成が成功すると一覧に表示されます。

## S3アクセス権限の公開設定

バケットが作成できたら、もう一度S3のバケット一覧から作成したバケットを選択します。

アクセス権限 → バケットポリシーでポリシーを入力します。

<a href="https://images-tech-blog.s-yoshiki.com/img/2019/01/201901242327_98cim0.jpg"><img src="https://images-tech-blog.s-yoshiki.com/img/2019/01/201901242327_98cim0.jpg"></a>
**ポリシー入力例**

上記の画像のように以下のバケットポリシーを適用させます。

```
{
  "Version":"2012-10-17",
  "Statement":[
    {
      "Sid":"AddPerm",
      "Effect":"Allow",
      "Principal": "*",
      "Action":["s3:GetObject"],
      "Resource":["arn:aws:s3:::examplebucket/*"]
    }
  ]
}
```

ポリシーの適用が成功すると黄色い文字で「パブリック」という文字が現れます。

※　examplebucketのところは自身のバケット名に変えます。

<a href="https://images-tech-blog.s-yoshiki.com/img/2019/01/201901242329_21wqy1.jpg"><img src="https://images-tech-blog.s-yoshiki.com/img/2019/01/201901242329_21wqy1.jpg"></a>

このような状態になればパブリックへの公開が成功しています。

<a href="https://docs.aws.amazon.com/ja_jp/AmazonS3/latest/dev/example-bucket-policies.html">https://docs.aws.amazon.com/ja_jp/AmazonS3/latest/dev/example-bucket-policies.html</a>

## アップロードを試す

再びバケットを選択し、アップロードボタンを選択し画像を選択し決定するとアップロードされます。

<a href="https://images-tech-blog.s-yoshiki.com/img/2019/01/201901242330_3248mN.jpg"><img src="https://images-tech-blog.s-yoshiki.com/img/2019/01/201901242330_3248mN.jpg"></a>

公開設定が正しくなされていれば、オブジェクトURLにアクセスできるはずです。

<a href="https://images-tech-blog.s-yoshiki.com/img/2019/01/201901242329_oKl1mZ.jpg"><img src="https://images-tech-blog.s-yoshiki.com/img/2019/01/201901242329_oKl1mZ.jpg"></a>