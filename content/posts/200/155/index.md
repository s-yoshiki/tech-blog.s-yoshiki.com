---
title: "Ubuntu18.04にApache MariaDB PHP7.2 をセットアップ"
path: "/entry/155"
date: "2019-07-29 00:59:45"
coverImage: "../../../images/thumbnail/ubuntu-logo.png"
author: "s-yoshiki"
tags: ["amazon-aws","php","linux","ubuntu","wordpress","データベース","mysql","amazon-ec2","apache","mariadb"]
---
AWS の EC2 の Ubuntu18.04 に Apache MariaDB PHP7.2 をセットアップした時のメモ。

## 概要

AWS の EC2 の Ubuntu18.04 に Apache MariaDB PHP7.2 をセットアップしました。
この時の一連の手順をまとめました。

## 環境情報

今回導入したアプリケーション等のバージョンはこちらになります。
Apache

```shell
$ apache2 -v
Server version: Apache/2.4.29 (Ubuntu)
Server built:   2019-07-16T18:14:45
```

Ubuntu

```shell
$ cat /etc/os-release
NAME="Ubuntu"
VERSION="18.04.2 LTS (Bionic Beaver)"
```

PHP

```shell
$ php -v
PHP 7.2.19-0ubuntu0.18.04.1 (cli) (built: Jun  4 2019 14:48:12) ( NTS )
Copyright (c) 1997-2018 The PHP Group
Zend Engine v3.2.0, Copyright (c) 1998-2018 Zend Technologies
```

MariaDB

```shell
Welcome to the MariaDB monitor.  Commands end with ; or \g.
Your MariaDB connection id is 51
Server version: 10.1.40-MariaDB-0ubuntu0.18.04.1 Ubuntu 18.04
```

## モジュール類の更新

モジュール類の更新を行います。
以下のコマンドで更新します。

```shell
$ sudo apt -y update
$ sudo apt -y upgrade
```

## Apacheのインストール

Apacheのインストールを行います。

```shell
$ sudo apt -y install apache2
```

インストールが完了したら、Apacheを起動します。

```shell
$ sudo service apache2 start
```

起動がうまくいかなければメッセージが出てくると思います。
一応、ステータスを確認します。

```shell
$ sudo service apache2 status
● apache2.service - The Apache HTTP Server
   Loaded: loaded (/lib/systemd/system/apache2.service; enabled; vendor preset: enabled)
  Drop-In: /lib/systemd/system/apache2.service.d
           └─apache2-systemd.conf
   Active: active (running) since Sun 2019-07-28 22:06:25 JST; 31min ago
 Main PID: 9597 (apache2)
    Tasks: 7 (limit: 547)
   CGroup: /system.slice/apache2.service
           ├─ 9597 /usr/sbin/apache2 -k start
           ├─ 9603 /usr/sbin/apache2 -k start
           ├─ 9604 /usr/sbin/apache2 -k start
           ├─ 9605 /usr/sbin/apache2 -k start
           ├─ 9606 /usr/sbin/apache2 -k start
           ├─ 9607 /usr/sbin/apache2 -k start
           └─12096 /usr/sbin/apache2 -k start

Jul 28 22:06:25 ip-10-0-1-142 systemd[1]: Stopped The Apache HTTP Server.
Jul 28 22:06:25 ip-10-0-1-142 systemd[1]: Starting The Apache HTTP Server...
Jul 28 22:06:25 ip-10-0-1-142 systemd[1]: Started The Apache HTTP Server.
```

「running」と表示されました。

## PHP7.2のインストール

### インストール

次にPHPのインストールを行います。
とりあえず、最低限必要そうなものを入れておきます。

```shell
sudo apt install php7.2 php7.2-common php7.2-cli php7.2-fpm php7.2-mysql php7.2-dev php7.2-mbstring php7.2-zip
```

インストールしたPHPを確認します。

```shell
$ which php
/usr/bin/php
$ php -v
PHP 7.2.19-0ubuntu0.18.04.1 (cli) (built: Jun  4 2019 14:48:12) ( NTS )
Copyright (c) 1997-2018 The PHP Group
Zend Engine v3.2.0, Copyright (c) 1998-2018 Zend Technologies
```

### 動作確認

DocumentRootディレクトリにPHPファイルを置いて動作確認します。
まず、パーミッションを変更します。

```shell
$ chown -R www-data:www-data
```

**/var/www/html/index.php**

```php
<?php
phpinfo();
```

ブラウザから動いている確認します。
URLはhttp://${ipアドレス}/index.phpです。
phpinfo の画面が出ていれば正解です。

## MariaDBのセットアップ

### MariaDBのインストール

MariaDB サーバとクライアントをインストールします。

```shell
$ sudo apt install mariadb-server mariadb-client
```

次に、mysql_secure_installation で初期セットアップを行います。

```shell
$ sudo mysql_secure_installation
```

ここでは次のように入力しました。

```shell
Enter current password for root (enter for none): ${password}

Change the root password? [Y/n] Y
New password: ${password}
Re-enter new password: ${password}

Remove anonymous users? [Y/n] 

Disallow root login remotely? [Y/n] 

Remove test database and access to it? [Y/n] 

Reload privilege tables now? [Y/n] 

```

初期セットアップが完了しました。
ログインして確認してみます。

```shell
$ sudo mysql -u root -p
Enter password: 
Welcome to the MariaDB monitor.  Commands end with ; or \g.
Your MariaDB connection id is 49
Server version: 10.1.40-MariaDB-0ubuntu0.18.04.1 Ubuntu 18.04

Copyright (c) 2000, 2018, Oracle, MariaDB Corporation Ab and others.

Type 'help;' or '\h' for help. Type '\c' to clear the current input statement.

MariaDB [(none)]> show databases;
+--------------------+
| Database           |
+--------------------+
| information_schema |
| mysql              |
| performance_schema |
+--------------------+
3 rows in set (0.01 sec)

MariaDB [(none)]>
```

### データベースと作業用ユーザの作成

Webアプリを動かすのに必要な最低限のデータベースとユーザを作成します。

```sql
create user '${user}'@'localhost' identified by '${password}';
create database ${database};
grant SELECT, ALTER, INSERT, UPDATE, DELETE, CREATE, DROP on ${database}.* to '${database}'@'localhost';
FLUSH PRIVILEGES;
```

作成したらコンソールを一度終了し、再び作成したユーザでログインします。

```shell
mysql -u${user} -p${password} -hlocalhost ${database}
```

ログインできればMariaDBのセットアップの完了です。

## 参考

<a href="https://qiita.com/PallCreaker/items/0b02c5f42be5d1a14adb">https://qiita.com/PallCreaker/items/0b02c5f42be5d1a14adb</a>

<a href="https://geraldalinio.com/wordpress/install-wordpress-on-ubuntu-18-04-aws-ec2-beginner-tutorial/">https://geraldalinio.com/wordpress/install-wordpress-on-ubuntu-18-04-aws-ec2-beginner-tutorial/</a>

<a href="https://qiita.com/cherubim1111/items/265cfbbe91adb44562d5">https://qiita.com/cherubim1111/items/265cfbbe91adb44562d5</a>

<a href="https://qiita.com/motofumi/items/b24c5c9e54363060a28f">https://qiita.com/motofumi/items/b24c5c9e54363060a28f</a>

<a href="https://qiita.com/seijikohara/items/f34753b2a783e03d7db4">https://qiita.com/seijikohara/items/f34753b2a783e03d7db4</a>