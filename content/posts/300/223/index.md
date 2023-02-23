---
title: "Homebrew で php7.4 + Xdebug をインストール"
path: "/entry/223"
date: "2021-02-01 21:00"
coverImage: "../../../images/thumbnail/php-logo.png"
author: "s-yoshiki"
tags: ["php","xdebug","mac","homebrew"]
---

## 概要

phpunitのカバレッジを算出を行うためにMacにHomebrewでphp7.4をインストールしようとした際の記録です。

## php7.4のインストール

php7.4のインストールは次のコマンドで実施します。
バージョン指定なしだとphp8系がインストールされるのでバージョン指定します。

```bash
$ brew info php@7.4
```

インストールされたphp7.4の情報を確認します。

```bash
$ brew info php@7.4
php@7.4: stable 7.4.14 (bottled) [keg-only]
General-purpose scripting language
https://www.php.net/
/usr/local/Cellar/php@7.4/7.4.14_1 (497 files, 72.3MB)
  Poured from bottle on 2021-01-17 at 17:14:07
From: https://github.com/Homebrew/homebrew-core/blob/HEAD/Formula/php@7.4.rb
License: PHP-3.01
==> Dependencies
Build: httpd ✘, pkg-config ✔
Required: apr ✔, apr-util ✔, argon2 ✔, aspell ✔, autoconf ✔, curl ✔, freetds ✔, gd ✘, gettext ✔, glib ✔, gmp ✔, icu4c ✔, krb5 ✔, libffi ✔, libpq ✔, libsodium ✔, libzip ✔, oniguruma ✔, openldap ✘, openssl@1.1 ✔, pcre2 ✔, sqlite ✔, tidy-html5 ✔, unixodbc ✔
```

phpの実行パスは次のパスになります。

```bash
$ /usr/local/opt/php@7.4/bin/php --version
PHP 7.4.14 (cli) (built: Jan  8 2021 13:20:04) ( NTS )
Copyright (c) The PHP Group
Zend Engine v3.4.0, Copyright (c) Zend Technologies
    with Xdebug v3.0.2, Copyright (c) 2002-2021, by Derick Rethans
    with Zend OPcache v7.4.14, Copyright (c), by Zend Technologies
```

## Xdebugのインストール

Xdebugのインストールにはpeclを利用します。

```
$ /usr/local/opt/php@7.4/bin/pecl install xdebug
```

コマンドを実行するとビルドが始まります。最終的には次のようなメッセージが表示されます。

```
Build process completed successfully
Installing '/usr/local/Cellar/php@7.4/7.4.14_1/pecl/20190902/xdebug.so'
install ok: channel://pecl.php.net/xdebug-3.0.2
Extension xdebug enabled in php.ini
```

## php.ini に追記

まず php.ini のパスを探します。

```
/usr/local/opt/php@7.4/bin/php -r "echo phpinfo();" | grep "php.ini"
```

`/usr/local/etc/php/7.4/php.ini` と出てきたので必要な値を追記します。

## 参考にさせていただいたサイト

[brewでxdebugをインストールする(PHP7.1)](https://qiita.com/suin/items/84c0479054809f058f07)

[homebrewでPHP+XDebug+VSCodeの開発環境構築をやり直す](https://qiita.com/kiwi26/items/7e94fb042c5ae819d2d8)
