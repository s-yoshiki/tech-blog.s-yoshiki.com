---
title: "CentOS に MySQL8.0をインストールする"
path: "/entry/220"
date: "2021-01-26 23:00"
coverImage: "../../../images/thumbnail/mysql-logo.png"
author: "s-yoshiki"
tags: ["mysql","mariadb","centos","linux","red-hat"]
---

## 概要

CentOS (8.3) に MySQL8.0をインストールして起動した際の記録です。
dockerで利用するためにmysqldから起動します。

## はじめに

CentOS (8.3) に MySQL8.0をインストールして起動するのであれば systemctl などを使うことが一般的だと思いますが、
ここに記載する方法は systemctl を利用せず mysqld コマンドから立ち上げる方法です。
と言うのも Docker では systemctl を利用するのが厄介です。
色々ゴニョゴニョする必要があります。もちろん普通に立ち上げようとすると怒られます。
[dockerコンテナ内でsystemdが動かないとかなんとか言われる。 - Tihiroのストレスフリーな生活](https://tihiro.hatenablog.com/entry/2020/03/20/165252)

```
$ systemctl
System has not been booted with systemd as init system (PID 1). Can't operate.
Failed to connect to bus: Host is down
```

なので mysqld コマンドから起動する方法でセットアップしました。

## 環境

 - CentOS Linux release 8.3.2011
 - mysql  Ver 8.0.21 for Linux on x86_64 (Source distribution)

## 起動

```shell
docker run --detach --name test -p 8080:80 --privileged  -it centos:8 /bin/bash
docker exec -it test bash
```

## MySQLインストール

まずは以下のコマンドで`mysql-server`をインストールします。clientも一緒にインストールされます。

```shell
dnf -y update
dnf -y install mysql-server
```

## my.cnf の設定

`/etc/my.cnf` に 最低限の設定を記載します。

```conf
[mysqld]
user = mysql
default-authentication-plugin = mysql_native_password
lower_case_table_names = 0
```

## プロセス立ち上げ

`/usr/sbin/mysqld --user=mysql --initialize` でプロセスを立ち上げます。

```shell
$ /usr/sbin/mysqld --user=mysql --initialize
2021-01-26T15:07:27.283529Z 0 [System] [MY-013169] [Server] /usr/sbin/mysqld (mysqld 8.0.21) initializing of server in progress as process 179
2021-01-26T15:07:27.291551Z 1 [System] [MY-013576] [InnoDB] InnoDB initialization has started.
2021-01-26T15:07:27.750767Z 1 [System] [MY-013577] [InnoDB] InnoDB initialization has ended.
2021-01-26T15:07:28.971631Z 6 [Note] [MY-010454] [Server] A temporary password is generated for root@localhost: PASSWORD # ← ランダムな文字列が表示される 
```

rootユーザのpasswordが表示される(PASSWORD)ので控えます。これでrootユーザでログインできるようになります。

```shell
$ /usr/sbin/mysqld --user=mysql & # バックグラウンドに移す
$ mysql -uroot -hlocalhost -p
```

## エラー

### The designated data directory /var/lib/mysql/ is unusable. You can remove all files that the server added to it.

> The designated data directory /var/lib/mysql/ is unusable. You can remove all files that the server added to it.

こんなエラーがでたら `/var/lib/mysql/` 以下を削除します。

```shell
rm -rf /var/lib/mysql/*
```

## 参考にさせていただいたサイト

[Docker+CentOS8にnginx,PHP,MySQLをインストールしたコンテナを作成する - あるSEのつぶやき・改](https://www.aruse.net/entry/2019/10/06/201013)

[dockerコンテナ内でsystemdが動かないとかなんとか言われる。 - Tihiroのストレスフリーな生活](https://tihiro.hatenablog.com/entry/2020/03/20/165252)