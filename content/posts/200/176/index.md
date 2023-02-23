---
title: "WordPressを静的サイトに変換するプラグインの紹介。WP2Static"
path: "/entry/176"
date: "2019-12-07 17:20:58"
coverImage: "../../../images/thumbnail/wordpress-logo.png"
author: "s-yoshiki"
tags: ["wordpress","cms","amazon-s3","wp2static","amazon-aws"]
---

## 概要

WordPressを静的化するプラグインとして、simply staticやStaticPress、WP2Staticといったプラグインが存在します。色々試した中でWP2Staticが使いやすかったのが、3つを比較したときの感想を紹介します。\n※下記で紹介しているものは2019/12時点の情報に基づくものです。

## 静的化の目的

そもそもWordPressサイトを静的HTMLとして公開することの目的は、HTML化し悪意のある攻撃/マルウェアといった脅威から守りセキュリティを強化させることや、データベースにアクセスしたり、PHPコードを実行したりすることがないのでパフォーマンスが向上することです。

## WP2Static

<!-- wp:html -->

<a href="https://wp2static.com/">https://wp2static.com/</a>

<!-- /wp:html -->

★: 4.5 (78件)、インストール数: 10000~

<!-- wp:list -->
<ul><li>サーバー上のフォルダー、ZIPファイル、FTPサーバー、S3、GitHub、Netlif、BunnyCDN、BitBucketまたはGitLabへの自動展開</li><li>WP Crontrolプラグイン、またはカスタムフックを通してイベントを自動実行する</li><li>URL/パス等置換機能</li></ul>
<!-- /wp:list -->

## StaticPress

<a href="http://en.staticpress.net/">http://en.staticpress.net/</a>

★: 4.0 (16件)、インストール数: 1000~

<!-- wp:list -->
<ul><li>開発に日本人が関わっている・ドキュメントが充実</li><li>機能がシンプル</li></ul>
<!-- /wp:list -->

## Simply Static

<a href="https://www.simplystatic.co/">https://www.simplystatic.co/</a>

★: 5(89件)、インストール数: 20000~

<!-- wp:list -->
<ul><li>ファイルをzip化して出力する</li><li>URL/パス等置換機能</li></ul>
<!-- /wp:list -->

## 3つを比較して

最初はSimply Staticを利用していました。このプラグインは安定感はありましたが、各種サービスの連携が弱いことと、何よりも開発が数年ストップしているので、開発が続けられているWP2Staticの方が良いと思い、現在ではこれを利用しています。
