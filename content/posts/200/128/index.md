---
title: "gitbookを使ってドキュメントを生成する"
path: "/entry/128"
date: "2019-06-05 00:48:27"
coverImage: "../../../images/thumbnail/git-logo.png"
author: "s-yoshiki"
tags: ["mac","git","gitbook"]
---

## 概要

GitBookを使ってドキュメントを生成するまでをやってみました。
なお、この記事で紹介しているのはgitbook-cliであり、クラウドサービスのGitBookはこちら↓を見て下さい。

<a href="https://www.gitbook.com/">https://www.gitbook.com/</a>

## どんなものができるのか

こんなドキュメントが作れます。

<a href="https://images-tech-blog.s-yoshiki.com/img/2019/06/20190605003400.png"><img src="https://images-tech-blog.s-yoshiki.com/img/2019/06/20190605003400.png"></a>

<a href="https://images-tech-blog.s-yoshiki.com/img/2019/06/20190605003401.png"><img src="https://images-tech-blog.s-yoshiki.com/img/2019/06/20190605003401.png"></a>

<a href="https://images-tech-blog.s-yoshiki.com/img/2019/06/20190605003402.png"><img src="https://images-tech-blog.s-yoshiki.com/img/2019/06/20190605003402.png"></a>

デフォルトのデザインだとこんなドキュメントが作れます。

↓ ※このサイトをキャプチャしています。

<a href="https://gitbookio.gitbooks.io/documentation/index.html">https://gitbookio.gitbooks.io/documentation/index.html</a>

## 検証した環境

 - macOS mojava
 - nodejs 12.1.0
 - npm 6.9.0

nodejs npm の紹介&導入は省きます。

## gitbookのインストール

npmを使ってgitbook-cliをインストールします。
コマンドを実行すると以下のようなメッセージが出てきます。

```shell
$ npm install -g gitbook-cli
/usr/local/bin/gitbook -> /usr/local/lib/node_modules/gitbook-cli/bin/gitbook.js
+ gitbook-cli@2.3.2
added 578 packages from 672 contributors in 18.22s

```

これを導入することによりgitbookコマンドが使えるようになります。

こちらのバージョンがインストールされました。

```shell
$ gitbook -V
CLI version: 2.3.2
Installing GitBook 3.2.3
```

## プロジェクトの作成

プロジェクトを作成していきます。
任意のディレクトリでgitbookコマンドを叩きます。

```shell
$ mkdir gitbook_test
$ cd gitbook_test
$ gitbook init

```

すると REAME.md と SUMMARY.md が作成されます。

```shell
$ tree ../gitbook_test 
../gitbook_test
├── README.md
└── SUMMARY.md
```

## ディレクトリ構成について

基本的なディレクトリ構成について紹介します。

```shell
.
├── README.md   # 概要を書く
├── SUMMARY.md   # 目次を書く
├── _book   # ビルドしたファイルが置かれるディレクトリ
├── book.json   # 設定を記述するファイル
├── docs   # マークダウンファイルを配置するディレクトリ
└── img   # マークダウンで利用する画像を配置するディレクトリ
```

README.md, SUMMARY.md 以外は自分で作成します。
docs や img のディレクトリ名は固定ではなく任意の名前にすることが出来ました。

## ドキュメントの記述

概要とコンテンツが1ページある簡単なドキュメントを生成してみます。

docs以下にhello.mdを作成します。
imgに適当な画像を置き、
**docs/hello.md**

```md
# Hello World

* 最初の投稿

![](/img/test.png)
```

このマークダウンではimgに配置した画像を参照しています。
このソースではルートパスで参照していますが、ビルド時には相対パスに変換されます。
なので、Webサーバのサブディレクトリに配置した場合でも正しく参照してくれるハズです。

**README.md**

```md
# Introduction

* 概要のページです

test
```

※デフォルトではIntroductionとだけ記述がありますが、中身はなんでも良いです。

**SUMMARY.md**

```md

# 概要

[Introduction](./README.md)

[Hello World!](./docs/hello.md)

```

## 日本語化

book.jsonに次のよう記述します。
**book.json**

```json
{
    "language": "ja"
}
```

## ビルドインサーバの起動

gitbookのルートディレクトリに移動し、gitbook serveでビルドインサーバを起動することが出来ます。

```shell
gitbook serve 
Live reload server started on port: 35729
Press CTRL+C to quit ...

info: 7 plugins are installed 
info: loading plugin "livereload"... OK 
info: loading plugin "highlight"... OK 
info: loading plugin "search"... OK 
info: loading plugin "lunr"... OK 
info: loading plugin "sharing"... OK 
info: loading plugin "fontsettings"... OK 
info: loading plugin "theme-default"... OK 
info: found 2 pages 
info: found 0 asset files 
info: >> generation finished with success in 0.7s ! 

Starting server ...
Serving book on http://localhost:4000
```

http://localhost:4000にアクセスするとマークダウンから生成されたhtmlファイルを見ることができます。
ドキュメントを更新すると変更を検知して自動でリロードしてくれる嬉しい機能がついてます。

## ビルドとHTMLの生成

以下のコマンドでビルドすることができます。
実行すると次のようになります。

```shell
$ gitbook build
info: 7 plugins are installed 
info: 6 explicitly listed 
info: loading plugin "highlight"... OK 
info: loading plugin "search"... OK 
info: loading plugin "lunr"... OK 
info: loading plugin "sharing"... OK 
info: loading plugin "fontsettings"... OK 
info: loading plugin "theme-default"... OK 
info: found 2 pages 
info: found 1 asset files 
info: >> generation finished with success in 0.6s !
```

ビルドされたファイルは_bookの中に吐かれます。

(例)

```
_book
├── docs
│   └── hello.html
├── gitbook
│   ├── fonts
│   │   └── fontawesome
│   │       ├── FontAwesome.otf
│   │       ├── fontawesome-webfont.eot
│   │       ├── fontawesome-webfont.svg
│   │       ├── fontawesome-webfont.ttf
│   │       ├── fontawesome-webfont.woff
│   │       └── fontawesome-webfont.woff2
│   ├── gitbook-plugin-fontsettings
│   │   ├── fontsettings.js
│   │   └── website.css
│   ├── gitbook-plugin-highlight
│   │   ├── ebook.css
│   │   └── website.css
│   ├── gitbook-plugin-lunr
│   │   ├── lunr.min.js
│   │   └── search-lunr.js
│   ├── gitbook-plugin-search
│   │   ├── lunr.min.js
│   │   ├── search-engine.js
│   │   ├── search.css
│   │   └── search.js
│   ├── gitbook-plugin-sharing
│   │   └── buttons.js
│   ├── gitbook.js
│   ├── images
│   │   ├── apple-touch-icon-precomposed-152.png
│   │   └── favicon.ico
│   ├── style.css
│   └── theme.js
├── img
│   └── test.png
├── index.html
└── search_index.json
```

## PDFの生成

PDFの生成にはCalibreが必要です。

<a href="https://calibre-ebook.com">https://calibre-ebook.com</a>

mac (homebrew) の場合はbrew cask install Calibreで取得することができます。

```shell
$ gitbook pdf              
info: 7 plugins are installed 
info: 6 explicitly listed 
info: loading plugin "highlight"... OK 
info: loading plugin "search"... OK 
info: loading plugin "lunr"... OK 
info: loading plugin "sharing"... OK 
info: loading plugin "fontsettings"... OK 
info: loading plugin "theme-default"... OK 
info: found 2 pages 
info: found 1 asset files 
info: >> generation finished with success in 5.5s ! 
info: >> 1 file(s) generated
```

book.pdf が生成されます。

ルートにcover.jpg　cover_small.jpgを配置すると自動で挿入されます。

## 参考

<a href="https://www.npmjs.com/package/gitbook-cli">https://www.npmjs.com/package/gitbook-cli</a>

<a href="https://1000ch.net/posts/2018/gitbook.html">https://1000ch.net/posts/2018/gitbook.html</a>

<a href="https://qiita.com/arm_band/items/ec5bb0a0d1dec1e6da79">https://qiita.com/arm_band/items/ec5bb0a0d1dec1e6da79</a>

<a href="https://akerun.hateblo.jp/entry/2017/12/26/110102">https://akerun.hateblo.jp/entry/2017/12/26/110102</a>

<a href="https://kounoike.github.io/posts/2016-06-16-gitbook-pdf/">https://kounoike.github.io/posts/2016-06-16-gitbook-pdf/</a>