---
title: "CentOS8 に PHP7.4 インストール"
path: "/entry/217"
date: "2021-01-17 00:00"
coverImage: "../../../images/thumbnail/linux-logo.png"
author: "s-yoshiki"
tags: ["php","apache","centos","redhat"]
---

## 概要

CentOS8 に modularity を利用して PHP7.4をインストールした際のメモです。

## 環境

 - CentOS8.3 (docker)

```shell
cat /etc/redhat-release 
CentOS Linux release 8.3.2011
```

※ ここで紹介している操作は全てrootユーザで実施しています。

## 普通にインストールしようとするとphp7.2がインストールされる

dnfコマンドで `dnf install php` といった感じに普通にインストールしようとするとphp7.2がインストールされます。


## modularityについて

modularity は RHEL 8/Fedora 28 から導入されたアプリケーションのライフサイクルをOSのライフサイクルから独立させるための新しい仕組です。

※ modularity についてはこちらを参考にさせていただきました。

[RHEL 8/Fedora 28で導入されたModularity - 赤帽エンジニアブログ](https://rheb.hatenablog.com/entry/201812-modularity)

このようにphpのバージョンを選択して導入することができます。

```shell
$ dnf module list php
Last metadata expiration check: 0:01:43 ago on Sun Jan 17 06:20:09 2021.
CentOS Linux 8 - AppStream
Name        Stream         Profiles                          Summary                      
php         7.2 [d]        common [d], devel, minimal        PHP scripting language       
php         7.3            common [d], devel, minimal        PHP scripting language       
php         7.4            common [d], devel, minimal        PHP scripting language       
Hint: [d]efault, [e]nabled, [x]disabled, [i]nstalled
```

## php7.4 インストール

とりあえず、php7.4をインストールする場合は以下のコマンドを実施します。

```shell
$ dnf module install php:7.4
Failed to set locale, defaulting to C.UTF-8
Last metadata expiration check: 0:24:01 ago on Sun Jan 17 06:20:09 2021.
Dependencies resolved.
==============================================================================================
 Package             Arch      Version                                     Repository    Size
==============================================================================================
Installing group/module packages:
 php-cli             x86_64    7.4.6-4.module_el8.3.0+434+2ab5050a         appstream    3.1 M
 php-common          x86_64    7.4.6-4.module_el8.3.0+434+2ab5050a         appstream    696 k
 php-fpm             x86_64    7.4.6-4.module_el8.3.0+434+2ab5050a         appstream    1.6 M
 php-json            x86_64    7.4.6-4.module_el8.3.0+434+2ab5050a         appstream     74 k
 php-mbstring        x86_64    7.4.6-4.module_el8.3.0+434+2ab5050a         appstream    484 k
 php-xml             x86_64    7.4.6-4.module_el8.3.0+434+2ab5050a         appstream    174 k
Installing dependencies:
 httpd-filesystem    noarch    2.4.37-30.module_el8.3.0+561+97fdbbcc       appstream     37 k
 libedit             x86_64    3.1-23.20170329cvs.el8                      baseos       102 k
 libxslt             x86_64    1.1.32-5.el8                                baseos       250 k
 nginx-filesystem    noarch    1:1.14.1-9.module_el8.0.0+184+e34fea82      appstream     24 k
 oniguruma           x86_64    6.8.2-2.el8                                 appstream    187 k
Installing module profiles:
 php/common                                                                                  
Enabling module streams:
 httpd                         2.4                                                           
 nginx                         1.14                                                          
 php                           7.4                                                           

Transaction Summary
==============================================================================================
Install  11 Packages

Total download size: 6.6 M
Installed size: 28 M
Is this ok [y/N]: 
```

`y` を 入力。

インストール完了後、`dnf install php`を実施する。


```shell
$ dnf install php
Last metadata expiration check: 0:26:33 ago on Sun Jan 17 06:20:09 2021.
Dependencies resolved.
==================================================================================
 Package            Arch   Version                                Repo       Size
==================================================================================
Installing:
 php                x86_64 7.4.6-4.module_el8.3.0+434+2ab5050a    appstream 1.5 M
Installing dependencies:
 apr                x86_64 1.6.3-11.el8                           appstream 125 k
 apr-util           x86_64 1.6.1-6.el8                            appstream 105 k
 brotli             x86_64 1.0.6-2.el8                            baseos    322 k
 centos-logos-httpd noarch 80.5-2.el8                             baseos     24 k
 httpd              x86_64 2.4.37-30.module_el8.3.0+561+97fdbbcc  appstream 1.7 M
 httpd-tools        x86_64 2.4.37-30.module_el8.3.0+561+97fdbbcc  appstream 104 k
 mailcap            noarch 2.1.48-3.el8                           baseos     39 k
 mod_http2          x86_64 1.15.7-2.module_el8.3.0+477+498bb568   appstream 154 k
Installing weak dependencies:
 apr-util-bdb       x86_64 1.6.1-6.el8                            appstream  25 k
 apr-util-openssl   x86_64 1.6.1-6.el8                            appstream  27 k
 php-opcache        x86_64 7.4.6-4.module_el8.3.0+434+2ab5050a    appstream 267 k
 php-pdo            x86_64 7.4.6-4.module_el8.3.0+434+2ab5050a    appstream 123 k

Transaction Summary
==================================================================================
Install  13 Packages

Total download size: 4.5 M
Installed size: 13 M
Is this ok [y/N]: 
```

再び `y` を入力。これでインストールが完了します。

```shell
$ php --version
PHP 7.4.6 (cli) (built: May 12 2020 08:09:15) ( NTS )
Copyright (c) The PHP Group
Zend Engine v3.4.0, Copyright (c) Zend Technologies
    with Zend OPcache v7.4.6, Copyright (c), by Zend Technologies
```