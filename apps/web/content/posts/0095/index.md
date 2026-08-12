---
title: "フラットファイルCMS Grav に管理ページの追加と日本語化"
path: "/entry/95"
date: "2019-01-04 18:13:29"
coverImage: "../../../images/thumbnail/grav-logo.jpg"
author: "s-yoshiki"
tags: ["cms","grav"]
---

## 概要

<a href="https://tech-blog.s-yoshiki.com/2019/01/984/">https://tech-blog.s-yoshiki.com/2019/01/984/</a>

ファイルベースで動くPHPのCMS「Grav」に管理ページを追加する方法を紹介します。

gitでリポジトリをクローンしインストールした場合、admin(管理ページ)は付属していません。
このパターン以外にもadminが付属していない場合があると思いますが、
コマンドラインが使える場合、adminページを簡単に導入することができます。

## 検証環境

以下の環境で試しましたが、プラグインの導入方法はOSに依存しないと思います。

<ul>
 	<li>PHP 7.1.19 (cli) (built: Aug 17 2018 20:10:18) ( NTS )</li>
 	<li> Mac OS X 10.14.2</li>
</ul>

## 管理機能の導入

### Gravのアップデート

Gravがインストールされたディレクトリまで移動します。

```
$ cd /path/to/grav
```

アップデートコマンを叩きます。

```
$ bin/gpm selfupgrade
```

最新であれば以下のようなメッセージが出てくると思います。

```
GPM Releases Configuration: Stable

You are already running the latest version of Grav (v1.5.6) released on Fri Dec 14 22:08:22 2018
```

### adminのインストール

gravが最新の状態であることを確認したら、以下のコマンドでインストールを実行します。

```
$ bin/gpm install admin
```

導入に成功すると以下のようなメッセージが出てくると思います。

```
GPM Releases Configuration: Stable

The following dependencies need to be installed...
  |- Package form
  |- Package login
  |- Package email

Install these packages? [Y|n] Y
Preparing to install Form [v2.16.4]
  |- Downloading package...   100%
  |- Checking destination...  ok
  |- Installing package...    ok
  '- Success!

Preparing to install Login [v2.8.2]
  |- Downloading package...   100%
  |- Checking destination...  ok
  |- Installing package...    ok
  '- Success!

Preparing to install Email [v2.7.1]
  |- Downloading package...   100%
  |- Checking destination...  ok
  |- Installing package...    ok
  '- Success!

Dependencies are OK

Preparing to install Admin Panel [v1.8.15]
  |- Downloading package...   100%
  |- Checking destination...  ok
  |- Installing package...    ok
  '- Success!

Clearing cache

Cleared:  /path/to/grav/cache/twig/*
Cleared:  /path/to/grav/cache/doctrine/*
Cleared:  /path/to/grav/cache/compiled/*

Touched: /path/to/grav/user/config/system.yaml
```

## 日本語化

管理機能を日本語で表示するにはいくつかの設定が必要です。

Configuration -> Languages -> Supportedに任意の言語コードを追加することで多言語化ができます。
日本語にする場合は、jaと追加します。
<img src="https://pbs.twimg.com/media/DwDjPTZVsAEalko.jpg">
