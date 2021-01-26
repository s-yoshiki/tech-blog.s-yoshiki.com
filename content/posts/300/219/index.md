---
title: "PHP-FPM(php7.4) Apache2.4 on Ubutnu20.04 Webサーバ構築"
path: "/entry/219"
date: "2021-01-19 23:00"
coverImage: "../../../images/thumbnail/ubuntu-logo.png"
author: "s-yoshiki"
tags: ["php","apache","ubuntu","linux"]
---

## 概要

Ubuntu20.04 に PHP7.4 + Apache2.4 をインストールしてWebサーバを構築した際のメモです。
ここで紹介するのはデフォルトと殆ど変わらないオプションでApache + php-fpmを構築する手順です。

## 環境

 - Ubuntu20.04 (docker)

```shell
$ cat /etc/os-release
NAME="Ubuntu"
VERSION="20.04.1 LTS (Focal Fossa)"
ID=ubuntu
ID_LIKE=debian
PRETTY_NAME="Ubuntu 20.04.1 LTS"
VERSION_ID="20.04"
HOME_URL="https://www.ubuntu.com/"
SUPPORT_URL="https://help.ubuntu.com/"
BUG_REPORT_URL="https://bugs.launchpad.net/ubuntu/"
PRIVACY_POLICY_URL="https://www.ubuntu.com/legal/terms-and-policies/privacy-policy"
VERSION_CODENAME=focal
UBUNTU_CODENAME=focal
```

docker は次のオプションで起動する。

```shell
$ docker run -it --name my-ubuntu --privileged --publish=8080:80 ubuntu /bin/bash
```

## パッケージの更新

```shell
$ apt update
$ apt upgrade
```

## Apache と PHP のインストール

以下のコマンドでパッケージをインストールする

```shell
$ apt install apache2 php libapache2-mod-php
```

php のバージョンを確認

```shell
php --version
PHP 7.4.3 (cli) (built: Oct  6 2020 15:47:56) ( NTS )
Copyright (c) The PHP Group
Zend Engine v3.4.0, Copyright (c) Zend Technologies
    with Zend OPcache v7.4.3, Copyright (c), by Zend Technologies
```

apache のバージョンを確認

```
$ apachectl -v
Server version: Apache/2.4.41 (Ubuntu)
Server built:   2020-08-12T19:46:17
```


## Apache のサービスを開始する

```shell
$ service apache2 start 
```

動作状況を確認

```shell
$ service apache2 status
 * apache2 is running
```

## PHPファイルを作成

```shell
$ echo '<?php' > /var/www/html/index.php 
$ echo 'phpinfo();' >> /var/www/html/index.php 
```

以下のURLから動作を確認。

http://localhost:8080/index.php


## 参考にしたサイト

[【Ubuntu 20.04 LTS Server】Apache2とPHPを動かす](https://www.yokoweb.net/2020/08/14/ubuntu-20_04-apache-php/)

[UbuntuとApacheでウェブサーバを立てる](https://qiita.com/sakkuntyo/items/03742bad0f57a4f46b07)

[Ubuntu 20.04にApache Webサーバーをインストールする方法](https://www.digitalocean.com/community/tutorials/how-to-install-the-apache-web-server-on-ubuntu-20-04-ja)