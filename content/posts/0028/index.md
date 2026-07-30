---
title: "AWS Lightsail + bitnami に自作アプリケーションを作って共存させる + ドメイン振り分け設定"
path: "/entry/28"
date: "2018-08-18 17:38:21"
coverImage: "../../../images/thumbnail/aws-logo.png"
author: "s-yoshiki"
tags: ["amazon-lightsail","php","apache","wordpress","amazon-aws","bitnami"]
---

## はじめに

<img src="https://qiita-image-store.s3.amazonaws.com/0/82419/005b02cf-baf5-eb5f-9e83-ab2059e0fc61.png" alt="lightsail_logo.png">AWS
Lightsailでbitnami WordPressのイメージを選択してインスタンスを立てた場合、 デフォルトのアプリケーションとしてWordPressとphpmyadminが利用できるようになっています。

これに加え、
`http://設定したドメイン/` (場合によっては`http://設定したドメイン/wordpress/`)でwordpressに、
`http://設定したドメイン/phpmyadmin/` でphpmyadminに リクエストが行くようになっています。

デフォルトの設定を流用した場合、同じインスタンス内で複数のアプリケーションを建てると、 URLがサブディレクトリを切る形になります。

**例 : アプリケーション名をmyappとした時**

`http://設定したドメイン/myapp/` 個人的にも、SEO的にも、アプリケーションをサブドメインごとに分けたいので、 bitnamiの構成を維持しつつ複数のアプリケーションを起動 + 複数バーチャルホストの設定を行いました。

**例 : wordpress**

`http://blog.設定したドメイン/` 自作アプリ
`http://myapp.設定したドメイン/` bitnami関連のドキュメントは殆ど英語であり、欲しい記事も見つからなかったので これを記事にしました。

## 概要

<ul>
 	<li>他のbitnamiアプリケーションと同じ設定を流用し、wordpressなどと共存させる</li>
 	<li>バーチャルホストで振り分け設定</li>
 	<li>自作アプリケーションを作成、PHP-FPM + FCGIで起動</li>
</ul>

## 環境

<ul>
 	<li>AWS Lightsail</li>
 	<li>Ubuntu 14.04.5 LTS, Trusty Tahr</li>
 	<li>PHP 7.0.21</li>
 	<li>Apache 2.4</li>
</ul>

## アプリケーションの作成

デフォルト状態のアプリケーションディレクトリの構成はこのようになっていると思います。

```
/opt/bitnami/apps
|-- bitnami
|-- phpmyadmin
`-- wordpress
```

新しく
myappとしてアプリケーション用のディレクトリを作成します。

```shell
mkdir -p /opt/bitnami/apps/myapp
```

```
/opt/bitnami/apps
|-- bitnami
|-- phpmyadmin
|-- wordpress
`-- myapp
```

また、myapp配下に、conf、htdocsを作成します。

```
/opt/bitnami/apps/myapp/
|-- conf
`-- htdocs
```

confはApacheの設定ファイルをおきます。 htdocsは公開するコンテンツ(html/css/js、phpなど)を置くところとします。 phpで動かすことを想定し、 index.phpを作成します。

```php
<?php
echo('Hello World');
```

次にApacheの設定を行います。

## Apache - Virtual Hostの設定

#### ディレクトリ構成

作成したconfディレクトリに以下のようなApacheの設定ファイルを作成し編集します。

```
/opt/bitnami/apps/myapp/conf/
|-- certs
|   |-- server.crt
|   `-- server.key
|-- httpd-app.conf
|-- httpd-prefix.conf
|-- httpd-vhosts.conf
`-- php-fpm
    |-- php-settings.conf
    `-- pool.conf
```

#### 設定ファイルの説明

##### certs/server.key & server.crt

証明書関連の設定で必要。 詳しくは、
<a href="https://tech-blog.s-yoshiki.com/2018/02/27/">【WordPress】AWS LightsailとCertbotでHTTPS化に挑戦してみた</a>

##### httpd-app.conf

DocumentRootなどの設定

##### httpd-prefix.conf

サブディレクトリを切る時に利用する設定ファイル 今回は利用しない

##### httpd-vhosts.conf

バーチャルホストの設定

##### php-fpm/php-settings.conf & pool.conf

PHP-FPMの設定

#### ファイルの修正例

このように書き換えます。myappのところを適宜書き換えます。

##### httpd-app.conf

```xml
<IfDefine USE_PHP_FPM>
	<Proxy 'unix:/opt/bitnami/php/var/run/static.sock|fcgi://static-fpm' timeout=300>
	</Proxy>
</IfDefine>

<Directory '/opt/bitnami/apps/static/htdocs'>
	AllowOverride None
	<IfModule php7_module>
		php_value upload_max_filesize 80M
		php_value post_max_size 80M
	</IfModule>

	<IfDefine USE_PHP_FPM>
	<FilesMatch \.php >
		SetHandler 'proxy:fcgi://static-fpm'
	</FilesMatch>
	</IfDefine>
	<IfVersion < 2.3 >
		Order allow,deny
		Allow from all
		Satisfy all
	</IfVersion>
	<IfVersion >= 2.3>
		Require all granted
	</IfVersion>
</Directory>
```

##### httpd-vhosts.conf

```xml
<VirtualHost *:80>
	ServerName myapp.設定したドメイン.com
	ServerAlias www.myapp.設定したドメイン.com
	DocumentRoot '/opt/bitnami/apps/static/htdocs'
	Include '/opt/bitnami/apps/myapp/conf/httpd-app.conf'
</VirtualHost>

<VirtualHost *:443>
	ServerName myapp.設定したドメイン.com
	ServerAlias www.myapp.設定したドメイン.com
	DocumentRoot '/opt/bitnami/apps/myapp/htdocs'
	SSLEngine on
	SSLCertificateFile '/opt/bitnami/apps/myapp/conf/certs/server.crt'
	SSLCertificateKeyFile '/opt/bitnami/apps/myapp/conf/certs/server.key'
	Include '/opt/bitnami/apps/myapp/conf/httpd-app.conf'
</VirtualHost>
```

##### php-settings.conf

```
php_value[upload_max_filesize]=80M
php_value[post_max_size]=80M
```

##### pool.conf

```
[myapp]
listen=/opt/bitnami/php/var/run/static.sock
include=/opt/bitnami/php/etc/common-ondemand.conf
include=/opt/bitnami/apps/myapp/conf/php-fpm/php-settings.conf
include=/opt/bitnami/php/etc/environment.conf
pm=ondemand
```

### bitnamiに設定ファイルを読み込ませる

bitnamiの設定ファイルの構成は/opt/bitnami/apache2下にあるconfファイルが 各アプリケーションの設定ファイル(上記で設定したファイル)をIncludeするようになっています。 ここでbitnamiのbitnami-apps-prefix.confを無効化しbitnami-apps-vhosts.confに設定を移します。
bitnami-apps-prefix.confの記述内容は全てコメント化します。

```shell
# Bitnami applications installed in a prefix URL
#Include '/opt/bitnami/apps/wordpress/conf/httpd-prefix.conf'
#Include '/opt/bitnami/apps/phpmyadmin/conf/httpd-prefix.conf'
```

bitnami-apps-vhosts.confに先ほど設定したファイルをIncldueさせます。
phpmyadminは利用しなければ消しても良いと思います。

```shell
# Bitnami applications installed in a Virtual Host
Include '/opt/bitnami/apps/wordpress/conf/httpd-vhosts.conf'
#Include '/opt/bitnami/apps/phpmyadmin/conf/httpd-vhosts.conf'
### myapp
Include '/opt/bitnami/apps/myapp/conf/httpd-vhosts.conf'
```

bitnami apacheを再起動します。

```
sudo /opt/bitnami/ctlscript.sh restart apache
```

## PHP-FPMの起動

PHP-FPM関連の設定は
/opt/bitnami/php/etc下にあります 記述したpool.confを読み込ませます。 具体的には/opt/bitnami/php/etc/php-fpm.confを編集し、 最終行に設定を追加します。

```
include=/opt/bitnami/apps/myapp/conf/php-fpm/pool.conf
```

php-fpmとApacheを再起動します。

```shell
sudo /opt/bitnami/ctlscript.sh restart php-fpm
sudo /opt/bitnami/ctlscript.sh restart apache
```

上手くいけばソケットが作成されていると思います。

```
/opt/bitnami/php/var/run/myapp.sock
```

## 参考

https://community.bitnami.com/t/wp-multisite-on-amazon-lightsail/48393/7

## 他

ブログ内で紹介する静的コンテンツを置く場所として && 砂場として && 個人で立てているサーバ代をケチりたくて、このようなことを行いました。 現在Lightsailで小さいインスタンスを利用しており、500円/月〜くらいで運用できるので、
こんなケチくさいことするなら新しいインスタンスを立てるなり、EC2を使うなどした方がよっぽど楽だと思います。以上
