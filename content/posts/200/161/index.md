---
title: "S3 + CloudFront でコンテンツをHTTPS配信"
path: "/entry/161"
date: "2019-08-17 12:22:53"
coverImage: "../../../images/thumbnail/aws-logo.png"
author: "s-yoshiki"
tags: ["amazon-aws","amazon-s3","cloudfront"]
---
AWSのS3に公開用の設定をしたバケットを作成し、CloudFrontを介してコンテンツを配信する仕組みを作る話です。

<img class="alignnone size-full wp-image-1488" src="https://tech-blog.s-yoshiki.com/wp-content/uploads/2019/08/s3_cloudfront-e1566007940565.png" alt="" width="640" height="335" />

## S3バケットを作成する

AWSのコンソールからS3を選択します。

### オプションの設定

<a href="https://images-tech-blog.s-yoshiki.com/img/2019/01/201901250010_748f3m.jpg"><img src="https://images-tech-blog.s-yoshiki.com/img/2019/01/201901250010_748f3m.jpg" /></a>

**S3の画面**

S3へ遷移したら、「バケットを作成する」ボタンを押下すると、モーダルウィンドウが立ち上がるのでそこから設定を入力します。

<a href="https://images-tech-blog.s-yoshiki.com/img/2019/01/201901242326_445jfi.jpg"><img src="https://images-tech-blog.s-yoshiki.com/img/2019/01/201901242326_445jfi.jpg" /></a>

ここでは特に設定はしていません。
必要なオプションがあれば任意で選択して「次へ」をクリックします。

### アクセス許可の設定

<a href="https://images-tech-blog.s-yoshiki.com/img/2019/01/201901250010_839hwv.jpg"><img src="https://images-tech-blog.s-yoshiki.com/img/2019/01/201901250010_839hwv.jpg" /></a>

ここで以下の4つのチェックボックスからチェックが外れていることを確認します。
<ul>
 	<li>新規のパブリック ACL と、パブリックオブジェクトのアップロードをブロックする (推奨)</li>
 	<li>パブリック ACL を通じて付与されたパブリックアクセスを削除する (推奨)</li>
 	<li>新規のパブリックバケットポリシーをブロックする (推奨)</li>
 	<li>バケットにパブリックポリシーがある場合、パブリックアクセスとクロスアカウントアクセスをブロックする (推奨)</li>
</ul>
チェックがついていれば外します。

<a href="https://images-tech-blog.s-yoshiki.com/img/2019/01/201901242331_f9jLMz.jpg"><img src="https://images-tech-blog.s-yoshiki.com/img/2019/01/201901242331_f9jLMz.jpg" /></a>

バケット作成が成功すると一覧に表示されます。

## S3アクセス権限の公開設定

バケットが作成できたら、もう一度S3のバケット一覧から作成したバケットを選択します。

アクセス権限 → バケットポリシーでポリシーを入力します。

<a href="https://images-tech-blog.s-yoshiki.com/img/2019/01/201901242327_98cim0.jpg"><img src="https://images-tech-blog.s-yoshiki.com/img/2019/01/201901242327_98cim0.jpg" /></a>
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

<a href="https://images-tech-blog.s-yoshiki.com/img/2019/01/201901242329_21wqy1.jpg"><img src="https://images-tech-blog.s-yoshiki.com/img/2019/01/201901242329_21wqy1.jpg" /></a>

このような状態になればパブリックへの公開が成功しています。

<a href="https://docs.aws.amazon.com/ja_jp/AmazonS3/latest/dev/example-bucket-policies.html">https://docs.aws.amazon.com/ja_jp/AmazonS3/latest/dev/example-bucket-policies.html</a>

## ACM(AWS Certificate Manager)

ACM(AWS Certificate Manager)を利用してSSL証明書を発行します。

SSL化対象のURLをRoute53で管理できることが前提です。

取得する方法をざっとまとめます。
<h3 class="qb-private-ca-wizard-title">証明書のリクエスト

**パブリック証明書のリクエスト **を選択して、次へ

### ステップ 1: ドメイン名の追加

SSL化したいドメインを入力。ワイルドカードを使うことも可能。 (*.example.com)

### ステップ 2: 検証方法の選択

<b class="qb-validation-method-name">DNS の検証 </b>を選択

### ステップ 3: 確認とリクエスト

<b class="qb-validation-method-name">確認とリクエスト </b>を選択

### ステップ 4: 検証

「DNS 設定をファイルにエクスポート」からcsvをダウンロード。

Route53に移動する。

CNAME で csv の <span class="s1">Record Name を レコードセットの名前に、Record Value を 値の項目にそれぞれセットする。</span>

再びACMに戻ると、正しく設定されているのが確認できれば使用可能となる。

これでACMの操作は完了。

## CloudFront の設定

CloudFrontに移動。

「Create Distribution」を選択。

<img class="alignnone size-full wp-image-1489" src="https://tech-blog.s-yoshiki.com/wp-content/uploads/2019/08/cloudfront1-e1566009917329.png" alt="" width="640" height="239" />

「Get Started」を選択。

<img class="alignnone size-full wp-image-1490" src="https://tech-blog.s-yoshiki.com/wp-content/uploads/2019/08/cloudfront2-e1566009903549.png" alt="" width="640" height="305" />

ここで細かな設定を行なっていきます。
<ul>
 	<li>Origin Domain Name
<ul>
 	<li>対象とするサービスを選択(先ほど作成したS3)</li>
</ul>
</li>
 	<li>Alternate Domain Names (CNAMEs)
<ul>
 	<li>CloudFrontに割り当てるドメイン名</li>
 	<li>Route53側でもレコードを設定する必要がある。</li>
</ul>
</li>
 	<li>Viewer Protocol Policy
<ul>
 	<li>Redirect HTTP to HTTPS</li>
</ul>
</li>
 	<li>SSL Certificate
<ul>
 	<li>Custom SSL Certificate  を選択</li>
 	<li>ACMで設定した項目を入力する</li>
</ul>
</li>
 	<li>Custom SSL Client Support
<ul>
 	<li>Clients that Support Server Name Indication (SNI) - (Recommended)</li>
</ul>
</li>
 	<li>Security Policy
<ul>
 	<li>TLSv1.1_2016 (recommended)</li>
</ul>
</li>
</ul>
他の項目は任意です。

CloudFrontのtop画面からStatusを確認し、Enabledとなっていれば成功です。