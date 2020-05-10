---
title: "ファイルベースで動くPHPのCMS「Grav」の紹介とインストールとセットアップまで"
path: "/entry/94"
date: "2019-01-04 15:16:33"
coverImage: "../../../images/thumbnail/grav-logo.jpg"
author: "s-yoshiki"
tags: ["markdown","php","cms","grav"]
---

## 概要

Flat-File CMS(RDBMSを利用せずファイルベースで管理するCMS)であるGravをインストールした時のメモです。

## Gravについて

<a href="https://learn.getgrav.org/basics/what-is-grav">https://learn.getgrav.org/basics/what-is-grav</a>

Gravは早くて簡単でフレキシブルなファイルベースのCMSです。セットアップも容易です。
ページは自体はMarkdownで記述し、プラグインも導入できることから拡張性にも優れています。

## 他のCMSの比較

Flat-File CMSで、もう一つ人気の高い <a href="http://picocms.org/">Pico</a> と最も人気のあるCMSであるWordPressをGitHubのWatch Star数で比較しました。

**GitHubのWatch Starの比較**
<table>
<thead>
<tr>
<th>名前</th>
<th>watch?</th>
<th>star★</th>
<th>url</th>
</tr>
</thead>
<tbody>
<tr>
<td>Grav</td>
<td>413</td>
<td>10047</td>
<td><a href="https://github.com/getgrav/grav">github</a></td>
</tr>
<tr>
<td>Pico</td>
<td>175</td>
<td>2998</td>
<td><a href="https://github.com/picocms/Pico">github</a></td>
</tr>
<tr>
<td>WordPress</td>
<td>1447</td>
<td>11860</td>
<td><a href="https://github.com/WordPress/WordPress">github</a></td>
</tr>
</tbody>
</table>
※2019/01/04 現在

GravのStar数はWordPressに迫る勢いです。

<a href="https://github.com/getgrav/grav">https://github.com/getgrav/grav</a>

<a href="https://github.com/picocms/Pico">https://github.com/picocms/Pico</a>

<a href="https://github.com/WordPress/WordPress">https://github.com/WordPress/WordPress</a>

## 環境

以下の環境で試しました。
<ul>
 	<li>PHP 7.1.19 (cli) (built: Aug 17 2018 20:10:18) ( NTS )</li>
 	<li>Mac OS X 10.14.2</li>
</ul>

## インストール

### Gitでのインストール

いくつかのインストール方法が公式では紹介されていますが、コマンドラインが使える環境であれば、gitで導入する方法が楽だと思います。

インストールするディレクトリを作成します。

```shell
$ mkdir -p /path/to/grav
$ cd /payh/to/grav
```

git cloneする

```shell
$ git clone -b master https://github.com/getgrav/grav.git
```

以下のようなログが出力れていると成功です。

```
Cloning into 'grav'...
remote: Enumerating objects: 46, done.
remote: Counting objects: 100% (46/46), done.
remote: Compressing objects: 100% (30/30), done.
remote: Total 39934 (delta 18), reused 27 (delta 12), pack-reused 39888
Receiving objects: 100% (39934/39934), 13.88 MiB | 439.00 KiB/s, done.
Resolving deltas: 100% (23841/23841), done.
```

インストールに成功すると、以下のようにファイル・ディレクトリが配置されいます。

```shell
$ ls
CHANGELOG.md       LICENSE.txt        backup             codeception.yml    images             robots.txt         tmp
CODE_OF_CONDUCT.md README.md          bin                composer.json      index.php          system             user
CONTRIBUTING.md    assets             cache              composer.lock      logs               tests              webserver-configs
```

必要なリソースはこれで揃いますが、起動はまだできません。
以下のコマンドでインストールを行います。

```shell
$ bin/grav install
```

```
Preparing to install vendor dependencies...

Loading composer repositories with package information
Installing dependencies from lock file
Package operations: 33 installs, 0 updates, 0 removals
  - Installing antoligy/dom-string-iterators (v1.0.1): Downloading (100%)
  - Installing composer/ca-bundle (1.1.2): Downloading (100%)
  - Installing doctrine/cache (v1.6.2): Downloading (100%)
  - Installing doctrine/collections (v1.4.0): Downloading (100%)
  - Installing donatj/phpuseragentparser (v0.10.0): Downloading (100%)
  - Installing erusev/parsedown (1.6.4): Downloading (100%)
  - Installing erusev/parsedown-extra (0.7.1): Downloading (100%)
  - Installing psr/log (1.0.2): Downloading (100%)
  - Installing filp/whoops (2.2.1): Downloading (100%)
  - Installing gregwar/cache (v1.0.12): Downloading (100%)
  - Installing gregwar/image (v2.0.22): Downloading (100%)
  - Installing psr/http-message (1.0.1): Downloading (100%)
  - Installing guzzlehttp/psr7 (1.4.2): Downloading (100%)
  - Installing seld/cli-prompt (1.0.3): Downloading (100%)
  - Installing league/climate (3.4.1): Downloading (100%)
  - Installing matthiasmullie/path-converter (1.1.1): Downloading (100%)
  - Installing matthiasmullie/minify (1.3.60): Downloading (100%)
  - Installing symfony/polyfill-mbstring (v1.9.0): Downloading (100%)
  - Installing symfony/var-dumper (v3.4.17): Downloading (100%)
  - Installing maximebf/debugbar (v1.15.0): Downloading (100%)
  - Installing miljar/php-exif (v0.6.4): Downloading (100%)
  - Installing monolog/monolog (1.23.0): Downloading (100%)
  - Installing psr/container (1.0.0): Downloading (100%)
  - Installing psr/simple-cache (1.0.1): Downloading (100%)
  - Installing symfony/polyfill-ctype (v1.9.0): Downloading (100%)
  - Installing symfony/yaml (v3.4.17): Downloading (100%)
  - Installing symfony/event-dispatcher (v3.4.17): Downloading (100%)
  - Installing pimple/pimple (v3.2.3): Downloading (100%)
  - Installing rockettheme/toolbox (1.4.2): Downloading (100%)
  - Installing symfony/debug (v3.4.17): Downloading (100%)
  - Installing symfony/console (v3.4.17): Downloading (100%)
  - Installing symfony/polyfill-iconv (v1.9.0): Downloading (100%)
  - Installing twig/twig (v1.35.4): Downloading (100%)
Generating optimized autoload files

Installing vendor dependencies
Loading composer repositories with package information
Installing dependencies from lock file
Nothing to install or update
Generating optimized autoload files

Cloning Bits
============

Cloning into 'user/plugins/problems'...
remote: Enumerating objects: 133, done.
remote: Counting objects: 100% (133/133), done.
remote: Compressing objects: 100% (127/127), done.
remote: Total 133 (delta 3), reused 107 (delta 1), pack-reused 0
Receiving objects: 100% (133/133), 737.12 KiB | 1.52 MiB/s, done.
Resolving deltas: 100% (3/3), done.
SUCCESS cloned https://github.com/getgrav/grav-plugin-problems -> /path/to/grav/user/plugins/problems

Cloning into 'user/plugins/error'...
remote: Enumerating objects: 20, done.
remote: Counting objects: 100% (20/20), done.
remote: Compressing objects: 100% (15/15), done.
remote: Total 20 (delta 0), reused 12 (delta 0), pack-reused 0
Unpacking objects: 100% (20/20), done.
SUCCESS cloned https://github.com/getgrav/grav-plugin-error -> /path/to/grav/user/plugins/error

Cloning into 'user/plugins/markdown-notices'...
remote: Enumerating objects: 12, done.
remote: Counting objects: 100% (12/12), done.
remote: Compressing objects: 100% (12/12), done.
remote: Total 12 (delta 0), reused 8 (delta 0), pack-reused 0
Unpacking objects: 100% (12/12), done.
SUCCESS cloned https://github.com/getgrav/grav-plugin-markdown-notices -> /path/to/grav/user/plugins/markdown-notices

Cloning into 'user/themes/quark'...
remote: Enumerating objects: 194, done.
remote: Counting objects: 100% (194/194), done.
remote: Compressing objects: 100% (183/183), done.
remote: Total 194 (delta 3), reused 81 (delta 0), pack-reused 0
Receiving objects: 100% (194/194), 1.23 MiB | 528.00 KiB/s, done.
Resolving deltas: 100% (3/3), done.
SUCCESS cloned https://github.com/getgrav/grav-theme-quark -> /path/to/grav/user/themes/quark

```

これでインストールが完了します。

### PHPビルトインサーバで起動する

とりあえず、動作を確認する場合はphpのサーバモードで確認できます。

```shell
php -S localhost:8000 system/router.php
PHP 7.1.19 Development Server started at Fri Jan  4 13:36:32 2019
Listening on http://localhost:8000
Document root is /path/tp/grav
Press Ctrl-C to quit.
[Fri Jan  4 13:36:39 2019] ::1:65077 [200]: /
```

localhost:8000にアクセスしてこのように表示されると成功です。

<a href="https://pbs.twimg.com/media/DwC5uvdU8AAKvrq.jpg">
<img src="https://pbs.twimg.com/media/DwC5uvdU8AAKvrq.jpg">
</a>

### Apache + Linuxで起動する

Apache + Linuxで起動する場合、マークダウンファイル等の読み書きがあるため、パーミッションを適切に指定する必要があります。

#### Apache

Apacheは、mod_rewriteや(SSL化する場合は)mod_sslといったモジュールを有効化し、htaccessを許可させるためにVirtual Hostの設定に「AllowOverride All」を追加する必要があります。

#### パーミッションの設定

GravディレクトリをApacheで動かせるユーザとグループに変更させます。
Apacheの起動ユーザ・グループは以下のコマンドで確認できます。

```shell
ps aux | grep -v root | grep apache | cut -d\  -f1 | sort | uniq
```

次に以下のコマンドで権限を適切なものに変更します。
最後にumaskコマンドを使うことで、新規にファイルが作成された際に初期値で775とするように設定します。

```shell
chgrp -R GROUP .
find . -type f | xargs chmod 664
find ./bin -type f | xargs chmod 775
find . -type d | xargs chmod 775
find . -type d | xargs chmod +s
umask 0002
```

<a href="https://learn.getgrav.org/basics/requirements">https://learn.getgrav.org/basics/requirements</a>

### トラブルシューティング

Gravのインストールコマンドを叩きブラウザからアクセスした際にエラー(レスポンス:500)となりました。
この時のapacheのログには

```shell
Fatal error: Uncaught RuntimeException: Opening file for writing failed on error fopen(/var/www/html/music/grav/user/config/security.yaml): failed to open stream: Permission denied in /var/www/html/music/grav/vendor/rockettheme/toolbox/File/src/File.php:202
```

と吐かれていました。

解決方法としてはSELinuxのコンテキストの設定を変更する方法で対応できるそうです。

<a href="https://github.com/getgrav/grav/issues/912">https://github.com/getgrav/grav/issues/912</a>