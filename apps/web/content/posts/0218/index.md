---
title: "PHP-FPM(php7.4) Apache2.4 でWebサーバ構築 on CentOS8"
path: "/entry/218"
date: "2021-01-17 12:00"
coverImage: "../../../images/thumbnail/linux-logo.png"
author: "s-yoshiki"
tags: ["php","apache","centos","red-hat"]
---

## 概要

CentOS8 に PHP7.4 + Apache2.4 をインストールしてWebサーバを構築した際のメモです。
ここで紹介するのはデフォルトと殆ど変わらないオプションでApache + php-fpmを構築する手順です。

## 環境

- CentOS8.3 (docker)

```shell
cat /etc/redhat-release 
CentOS Linux release 8.3.2011
```

docker は次のオプションで起動する。

```shell
$ docker run --detach --name test -p 8080:80 --privileged  -it centos:8 /sbin/init
```

※ ここで紹介している操作は全てrootユーザで実施しています。

## php7.4 のインストール

php7.4のインストールは次のページを参考にしました。

[CentOS8 に PHP7.4 インストール](/entry/217)

```shell
$ dnf module list php # php7.4があることを確認
$ dnf module install php:7.4
$ dnf install php
```

## apacheのインストール

以下のコマンドを実施します。

```shell
$ dnf install httpd
```

## php-fpmの設定を変更する

php-fpmの設定を変更します。
設定ファイルは、 `/etc/php-fpm.d/www.conf` にあります。

```diff
+listen.owner = apache
+listen.group = apache

-listen.acl_users = apache,nginx
+;listen.acl_users = apache,nginx
```

## php-fpm の起動

```
$ systemctl restart php-fpm
```

でphp-fpmを起動します。以下のコマンドのように statusを確認して active になっていればOKです。

```shell
$ systemctl status php-fpm
● php-fpm.service - The PHP FastCGI Process Manager
   Loaded: loaded (/usr/lib/systemd/system/php-fpm.service; disabled; vendor preset: disabled)
   Active: active (running) since Sun 2021-01-17 07:28:31 UTC; 3min 45s ago
 Main PID: 620 (php-fpm)
   Status: "Processes active: 0, idle: 5, Requests: 0, slow: 0, Traffic: 0req/sec"
    Tasks: 6 (limit: 11868)
   Memory: 10.1M
   CGroup: /docker/9cd225d5a0b658092395ffc308219bf22534a1950f2d1cc35b9edd3a5b0837b9/system.slice/php-fpm.service
           ├─620 php-fpm: master process (/etc/php-fpm.conf)
           ├─621 php-fpm: pool www
           ├─622 php-fpm: pool www
           ├─623 php-fpm: pool www
           ├─624 php-fpm: pool www
           └─625 php-fpm: pool www

Jan 17 07:28:31 9cd225d5a0b6 systemd[1]: Starting The PHP FastCGI Process Manager...
Jan 17 07:28:31 9cd225d5a0b6 systemd[1]: Started The PHP FastCGI Process Manager.
```

## apacheの起動

以下のコマンドで apache を起動します。

```
$ systemctl enable httpd
$ systemctl start httpd
```

status を確認し activeになっていることを確認します。

```shell
systemctl status httpd
● httpd.service - The Apache HTTP Server
   Loaded: loaded (/usr/lib/systemd/system/httpd.service; enabled; vendor preset: disabled)
  Drop-In: /usr/lib/systemd/system/httpd.service.d
           └─php-fpm.conf
   Active: active (running) since Sun 2021-01-17 07:09:55 UTC; 1min 2s ago
     Docs: man:httpd.service(8)
 Main PID: 278 (httpd)
   Status: "Total requests: 6; Idle/Busy workers 100/0;Requests/sec: 0.102; Bytes served/sec: 5.4KB/sec"
    Tasks: 213 (limit: 11868)
   Memory: 16.9M
   CGroup: /docker/9cd225d5a0b658092395ffc308219bf22534a1950f2d1cc35b9edd3a5b0837b9/system.slice/httpd.service
           ├─278 /usr/sbin/httpd -DFOREGROUND
           ├─282 /usr/sbin/httpd -DFOREGROUND
           ├─283 /usr/sbin/httpd -DFOREGROUND
lines 1-14...skipping...
● httpd.service - The Apache
```

## 確認

`/var/www/html` に index.php を作成します。

`index.php`

```php
<?php
phpinfo();
```

[http://localhost:8080/](http://localhost:8080/) にアクセスして画面が表示されていればApacheの設定は完了です。

## おまけ: エラーと解決方法

上記の作業を実施する時にハマったエラーについて記載します。

### "System has not been booted with systemd as init system (PID 1). Can't operate ..."が発生する時

systemd 起動時に次のようなメッセージが出ることがあります。

```
System has not been booted with systemd as init system (PID 1). Can't operate.
Failed to connect to bus: Host is down
```

これは docker 起動時に `--privileged` と `/sbin/init` を指定していないため発生すると思われます。

### failed to read the acl of the socket '/run/php-fpm/www.sock'

```
failed to read the acl of the socket '/run/php-fpm/www.sock'
```

というエラーが出ている場合や `systemctl status php-fpm` の結果が`failed` の場合は php-fpm の設定に不備があります。

```diff
+listen.owner = apache
+listen.group = apache

-listen.acl_users = apache,nginx
+;listen.acl_users = apache,nginx
```

の設定を追加したら、`/run/php-fpm/www.sock`が作成され、php-fpmのstatusもactiveになりました。

## 参考にしたサイト

[failed to read the acl of the socket '/run/php-fpm/www.sock'](http://blog.livedoor.jp/sire2/archives/51264184.html)

[CentOS 8 標準の Apache と PHP の関係について](https://laboradian.com/centos8-apache-php/)

[CentOS 8のApache環境にPHP 7.2をインストールして使えるようにする手順](https://www.rem-system.com/centos8-php-install/)
