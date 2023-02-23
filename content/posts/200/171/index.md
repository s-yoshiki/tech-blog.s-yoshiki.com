---
title: "WordPressをAmazon S3 + CloudFront構成で月額200円で運用"
path: "/entry/171"
date: "2019-12-04 01:14:11"
coverImage: "../../../images/thumbnail/wordpress-logo.png"
author: "s-yoshiki"
tags: ["amazon-aws","wordpress","cms","docker"]
---

## 概要

AmazonS3 + CloudFront を用いて WordPressを静的サイト化して、ハイパフォーマンスなサイトを構成する方法の紹介です。
実はこのブログ https://tech-blog.s-yoshiki.com もS3 + CloudFront 構成で運用しており、月額のAWS使用料が200円少々で運用できています。
ここでは具体的に利用しているサービスや構成の設定、プラグインを紹介します。

## システム全体の概要

システムをざっくり説明すると、WordPressのサイトを全て静的化し、AmazonS3上に配置しています。S3に加えてCloudFrontも組み合わせて利用し、HTTPSとCDN化を実現しています。

SSL証明書にはAWS Certificate Managerを利用しています。

WordPressのシステム自体はローカル環境のDocker上に構築し、記事を書いたら静的化処理を行いS3にアップロードしています。

## この構成のメリット・デメリット

この構成のメリット・デメリットには次のようなものがあると思います。

<!-- wp:list -->
<ul><li>Amazon S3を利用するのでコストが低い</li><li>サイトを静的化するのでパフォーマンスが高い</li><li>動的システムではないので脆弱性や攻撃に強い</li><li>WordPressの静的化プラグインの挙動が安定していない</li><li>静的サイトで一部プラグインが利用できなくなる</li><li>サーバサイドによる動的処理ができない</li><li>HTML出力〜デプロイに多少時間がかかる</li></ul>
<!-- /wp:list -->

## AWSの構成

静的コンテンツを配置するs3バケットを用意します。またCloudFrontのディストリビューションを作成します。

構築方法については以下の記事で紹介しています。

<!-- wp:core-embed/wordpress {"url":"https://tech-blog.s-yoshiki.com/2019/08/1486/","type":"wp-embed","providerNameSlug":"404-motivation-not-found","className":""} -->
<figure class="wp-block-embed-wordpress wp-block-embed is-type-wp-embed is-provider-404-motivation-not-found"><div class="wp-block-embed__wrapper">
https://tech-blog.s-yoshiki.com/2019/08/1486/
</div></figure>
<!-- /wp:core-embed/wordpress -->

## 静的ページを作成するWordPressプラグイン

<!-- wp:heading {"level":3} -->

### WP2Static

静的コンテンツの作成はWP2Staticを利用しました。このプラグイン導入時にStaticPressやsimply staticなどを検討しましたが、開発の活発度やレビューからWP2Staticを利用することにしました。
250MB程度のコンテンツを作成するのに10分程度かかります。

<!-- wp:heading {"level":3} -->

### **WP Offload Media Lite**

WP Offload Media LiteはWordPressにアップロードした画像・動画などのコンテンツをS3にアップロードして管理する事ができるプラグインです。これによりローカル環境でコンテンツなどを管理しなくても良くなります。

## WordPress on Docker環境

WordPressはDocker上で動かしています。imageはwordpressとmysql(どちらもDockerHubで提供されているもの )を利用しています。
環境は次のような構成となっています。

**ディレクトリ構成**

```
wordpress
├── docker-compose.yml
├── html # /var/www/html以下をマウント
└── mysql # mysqlデータ領域をマウントして永続化
```

**docker-compose.yml**

```yml
version: "3.5"
services:
  wordpress:
    image: wordpress:latest
    volumes:
      - "./html:/var/www/html"
    ports:
      - 80:80
    links:
      - wordpress-db
    environment:
      WORDPRESS_DB_HOST: wordpress-db:3306
      WORDPRESS_DB_NAME: wordpress
      WORDPRESS_DB_USER: wordpress_user
      WORDPRESS_DB_PASSWORD: wordpress_pass

  wordpress-db:
    image: mysql:5.7
    volumes:
      - "./mysql/data:/var/lib/mysql"
    ports:
      - 3306:3306
    environment:
      MYSQL_ROOT_PASSWORD: XXXXXXXXXXX
      MYSQL_DATABASE: wordpress
      MYSQL_USER: wordpress_user
      MYSQL_PASSWORD: wordpress_pass
```

## まとめ

Amazon S3 + CloudFront の構成で WordPressを運用する方法を紹介しました。この方法のポイントはサイトを静的化するのでパフォーマンスに優れており脆弱性や攻撃にも強いという特徴があります。ただし、WordPressを静的化するためのプラグインが安定していないことや、HTML出力するのに多少時間がかかるという欠点があると思います。
コストパフォーマンスの観点で見たらかなり優れている方法だと思うので、是非お勧めしたいと思います。
