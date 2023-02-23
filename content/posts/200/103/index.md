---
title: "S3にパブリック公開バケットを作成する"
path: "/entry/103"
date: "2019-01-25 00:11:01"
coverImage: "../../../images/thumbnail/aws-logo.png"
author: "s-yoshiki"
tags: ["amazon-aws","amazon-s3"]
---

## 概要

AWSのS3に公開用の設定をしたバケットを作成する方法について(ざっくり)紹介します。
なお、AWSのコンソールのインタフェースは早いスピードで変わるので、
キャプチャ画像が古くなっているかもしれませんが、ご容赦ください。

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
