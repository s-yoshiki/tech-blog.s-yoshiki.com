---
title: "WordPress開設で、自分のサーバを持ちたいけど手間はかけたくないとき【AWS Lightsail】"
path: "/entry/24"
date: "2018-07-29 12:57:04"
coverImage: "../../../images/thumbnail/aws-logo.png"
author: "s-yoshiki"
tags: ["amazon-aws","amazon-lightsail","wordpress"]
---

## 概要

手っ取り早くWordPressでブログを開設するなら、bluehostなどのホスティングサービスを利用するのが一番早いかと思います。
(もちろんhatenaやアメブロの方がもっと早い)
一方で、複雑なカスタマイズや細かな設定、拡張などを将来的に行うと考えたとき、
自分でサーバを構築していた方が都合が良いかと思います。
ただ、知識があるとはいえサーバを一から構築するのは面倒な作業でもあると思います。
なので、この記事では今まで、あらゆるサーバを建て破壊しまくってきた経験の中で、
AWS Lightsailを使う方法がもっとも楽と感じたので、これを紹介したいと思います。

## AWS Lightsail

<a href="https://aws.amazon.com/jp/lightsail/">https://aws.amazon.com/jp/lightsail/</a>
数クリックぽちぽちするだけでインスタンスの作成ができるという部分が最大のメリットです。
これに加え、VPSサービスのようにサーバー料金にインターネット転送料金やディスク料金が含まれているため、
コストの算出が比較的簡単に行えるところにも安心感があります。

## 料金

<img src="https://media.amazonwebservices.com/blog/2016/ls_pricing_dots_2.png" alt="">
一番小さいインスタンスの$5から始められます。
スペックはメモリ:512MB、CPU:1、SSD:20GBのスペックですが、大規模なものを動かさない限りこれを使えば問題ないでしょう。

## インスタンス作成

<img src="https://camo.qiitausercontent.com/9d9bec7b0e36a607404f4322a2aa939e47ae5e65/68747470733a2f2f71696974612d696d6167652d73746f72652e73332e616d617a6f6e6177732e636f6d2f302f35323335332f39316161336463392d613963642d643931382d323265382d3964653834636638613138362e6a706567" alt="">
インスタンス作成をする際にイメージをテンプレートの中から作成することができます。
WordPress以外にもJoomla、Drupalなどが用意されています。
要件にあったものを選択し、ネットワーク設定を行って完成といった流れです。

## その他便利機能

### スナップショット

インスタンスのイメージを丸々コピーして保存できます。
バックアップを作る際に重宝します。

### DNS

自分で取得したドメインをIPアドレスと紐つけることが簡単にできます。
ドメインはお名前ドットコムかなんかで取って来れます。
※大量なリクエストが来ない限り基本的に無料。

### ロードバランサ

アクセスを分散できるロードバランサを使うことができます。
少し値段が張りますが

## 注意

注意点としてこんなものが挙げられる。

- サーバー停止中も課金される
- デフォで自分で作成したVPCを利用できない

## 他

<a href="https://tech-blog.s-yoshiki.com/2018/02/27/">AWS LightsailとCertbotでHTTPS化に挑戦してみた</a>
<a href="https://tech-blog.s-yoshiki.com/2018/02/44/">【WordPress】ソースコードから編集してhttps対応URLに変更</a>

## まとめ

個人的には、ほぼ定額で、面倒な設定をせず運用できるのが１番のメリットだと思います。
随時更新していきます。
