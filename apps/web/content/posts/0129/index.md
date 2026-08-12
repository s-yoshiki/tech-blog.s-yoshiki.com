---
title: "gitbookで使えそうなプラグインを集めて見た"
path: "/entry/129"
date: "2019-06-05 22:11:25"
coverImage: "../../../images/thumbnail/git-logo.png"
author: "s-yoshiki"
tags: ["node.js","git","gitbook","graphviz","plantuml","uml"]
---

## 概要

gitbookで使えそうなプラグインを集めて見ました。
なお、下記の内容はgitbookが導入されていることを前提としています。

<a href="https://tech-blog.s-yoshiki.com/2019/06/1254/">https://tech-blog.s-yoshiki.com/2019/06/1254/</a>

## 目次の折りたたみ - expand-active-chapter

目次の折りたたみができるプラグインです。

### インストール

```shell
npm i gitbook-plugin-expand-active-chapter
```

### 設定

book.jsonに次のように記述します。

```json
{
  "plugins": ["expand-active-chapter"]
}
```

### 参考

<a href="https://www.npmjs.com/package/gitbook-plugin-expand-active-chapter">https://www.npmjs.com/package/gitbook-plugin-expand-active-chapter</a>

## コードハイライト - gitbook-plugin-prism

デフォルトのコードハイライトを無効にするとともに、オリジナルのスタイルを適用することができます。

<a href="http://i.imgur.com/S1YMlee.png"><img src="http://i.imgur.com/S1YMlee.png"></a>

この画像オリジナルのスタイルを適用したコードハイライトの一例です。

### インストール

```shell
npm i gitbook-plugin-prism
```

### 参考

<a href="https://www.npmjs.com/package/gitbook-plugin-prism">https://www.npmjs.com/package/gitbook-plugin-prism</a>

## ツリービュー

<a href="https://raw.githubusercontent.com/aleen42/gitbook-treeview/master/1.png"><img src="https://raw.githubusercontent.com/aleen42/gitbook-treeview/master/1.png"></a>

この画像のようにメニューをツリー構造で表示します。

### インストール

```shell
npm i gitbook-plugin-page-treeview
```

### 設定

book.jsonに記述する設定の一例です。

```json
{
  "plugins": [
    "page-treeview"
  ],
  "pluginsConfig": {
    "page-treeview": {
      "copyright": "Copyright © aleen42",
      "minHeaderCount": "2",
      "minHeaderDeep": "2"
    }
  }
}
```

### 参考

<a href="https://www.npmjs.com/package/gitbook-plugin-page-treeview">https://www.npmjs.com/package/gitbook-plugin-page-treeview</a>

## UML - gitbook-plugin-uml

gitbook-plugin-umlは
UMLを作成するPlantUMLをgitbook上で表示するためのプラグインです。

### インストール

gitbook-plugin-uml を npmでインストールします。

```shell
$ npm install gitbook-plugin-uml
```

book.json は次のように記述します。

```json
{
  "plugins": ["uml"]
}
```

UMLにはオプションを加えることができ、次のように記述します。

```js
"pluginsConfig": {
  "uml": {
    format: "png",
    nailgun: false
  }
}
```

<a href="http://martiansoftware.com/nailgun/">Nailgun ?</a>
また、上記の作業を進める前提としてgraphvizのインストールが必要です。

**Mac**

```shell
$ brew install graphviz
```

**Linux**

```shell
$ sudo apt install graphviz
```

or

```shell
$ sudo yum install graphviz
```

### 表示

uml か puml でコードブロックとして囲みます。

```uml
@startuml

	Class Stage
	Class Timeout {
		+constructor:function(cfg)
		+timeout:function(ctx)
		+overdue:function(ctx)
		+stage: Stage
	}
 	Stage <|-- Timeout

@enduml
```

<a href="https://github.com/vowstar/gitbook-plugin-uml/raw/master/images/uml.png"><img src="https://github.com/vowstar/gitbook-plugin-uml/raw/master/images/uml.png"></a>

### 参考

<a href="https://github.com/vowstar/gitbook-plugin-uml">https://github.com/vowstar/gitbook-plugin-uml</a>

<a href="http://plantuml.com/ja/">http://plantuml.com/ja/</a>

<a href="https://qiita.com/tatsuya_oyanagi/items/db53157640d59572eac5">https://qiita.com/tatsuya_oyanagi/items/db53157640d59572eac5</a>

## favicon - gitbook-plugin-custom-favicon

オリジナルのfaviconを利用するプラグイン

### インストール

```
npm install gitbook-plugin-custom-favicon
```

### 設定

book.jsonに次のように記述します。
path/to/favicon.ico には置き換えたいfaviconのパスを記述します。

```json
{
  "plugins": ["custom-favicon"],
  "pluginsConfig": {
    "favicon": "path/to/favicon.ico"
  }
}
```

### 参考

<a href="https://github.com/Bandwidth/gitbook-plugin-custom-favicon">https://github.com/Bandwidth/gitbook-plugin-custom-favicon</a>

## ロゴ - gitbook-plugin-insert-logo

### インストール

```shell
npm i gitbook-plugin-insert-logo
```

### 設定

book.jsonに次のように記述します。
urlの部分はbase64にすることも可能です。

```json
{
  "plugins": ["insert-logo", "another plugin 1", "another plugin 2"],
  "pluginsConfig": {
    "insert-logo": {
      "url": "http://www.example.com/my-logo.png",
      "style": "background: none;"
    }
  }
}
```

### 参考

<a href="https://github.com/matusnovak/gitbook-plugin-insert-logo">https://github.com/matusnovak/gitbook-plugin-insert-logo</a>
