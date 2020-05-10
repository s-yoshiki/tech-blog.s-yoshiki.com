---
title: "【WordPress】Amazon LightsailとCertbotでHTTPS化に挑戦してみた"
path: "/entry/4"
date: "2018-02-03 07:59:32"
coverImage: "../../../images/thumbnail/aws-logo.png"
author: "s-yoshiki"
tags: ["amazon-aws","amazon-lightsail","wordpress"]
---

## 概要

AWS Lightsail <a href="https://lightsail.aws.amazon.com/ls/webapp/home/instances">(リンク)</a>とCertbotでHTTPS化に挑戦してみた。
ネットに散らばっている情報を元に"letsencrypt"や"sslなう。"を使ってみたが上手くいかなかった(bitnaminのせいか....)。
改めてCertbotを使ってみたら、すんなりできたので書くことにした。

## 環境

あらかじめ、WordPressがインストールされている状態で、また以下が設定/構築されている

- ubuntu16.04
- ポート80、443
- DNSが名前解決できる

前準備

```shell
sudo apt-get update
sudo apt-get upgradeå
sudo apt-get install git
```

## Certbotのインストール

gitからCertbotを落としてきて10秒くらい待ちます。

```shell
cd /usr/local
git clone https://github.com/certbot/certbot
cd certbot
```

## 証明書取得

現在のディレクトリでこのコマンドを実行する
```./certbot-auto certonly --webroot -w /opt/bitnami/apps/wordpress/htdocs/ -d ドメイン```
上手くいくとこのようなメッセージが出る
<blockquote>IMPORTANT NOTES:
- Congratulations! Your certificate and chain have been saved at:
/etc/letsencrypt/live/ドメイン名/fullchain.pem
Your key file has been saved at:
/etc/letsencrypt/live/ドメイン名/privkey.pem
Your cert will expire on 2018-05-04. To obtain a new or tweaked
version of this certificate in the future, simply run certbot-auto
again. To non-interactively renew *all* of your certificates, run
"certbot-auto renew"
- If you like Certbot, please consider supporting our work by:

Donating to ISRG / Let's Encrypt:   https://letsencrypt.org/donate
Donating to EFF:                    https://eff.org/donate-le</blockquote>

あとは細かい設定を行い、apacheを再起動します。

```shell
sudo cp /etc/letsencrypt/live/ドメイン名/fullchain.pem /opt/bitnami/apache2/conf/server.crt
sudo cp /etc/letsencrypt/live/ドメイン名/privkey.pem /opt/bitnami/apache2/conf/server.key
sudo /opt/bitnami/ctlscript.sh restart apache
```

無事HTTPS化されると思います。

## おまけ1 | 常時SSL

httpにアクセスされた際にhttpsへリダイレクトする

```shell
sudo vim /opt/bitnami/apache2/conf/bitnami/bitnami.conf
```

VirtualHostの項目を編集する

```xml
<virtualhost _default_:80>
DocumentRoot "/opt/bitnami/apache2/htdocs"
RewriteEngine On
RewriteCond %{HTTPS} !=on
RewriteRule ^/(.*) https://%{SERVER_NAME}/$1 [R,L]
</virtualhost>
```
apache再起動

```shell
sudo /opt/bitnami/ctlscript.sh restart apache
```

## 参考

<a href="https://owani.net/aws/post-625/625/">https://owani.net/aws/post-625/625/</a>
