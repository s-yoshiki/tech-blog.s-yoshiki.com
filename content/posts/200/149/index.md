---
title: "fswatchで変更されたファイルを監視する"
path: "/entry/149"
date: "2019-07-07 14:34:31"
coverImage: "../../../images/thumbnail/console-image.png"
author: "s-yoshiki"
tags: ["linux","mac","shell","fswatch"]
---

## 概要

ディレクトリを監視できるサービスfswatchをMacでインストールして使ってみました。

## fswatch

<a href="https://github.com/emcrisostomo/fswatch">https://github.com/emcrisostomo/fswatch</a>

## インストール

homebrewでインストールします。

```shell
$ brew install fswatch
==> Downloading https://homebrew.bintray.com/bottles/fswatch-1.14.0.mojave.bottle.tar.gz
==> Downloading from https://akamai.bintray.com/73/7310f4dbbbdeed582cb713b3d08bf982553747cbda75eb76d2dfe00f309ed3f7?__gda__=exp=1562475460~hmac=da777c8652420e61c6f1f52c5e0feeecf670eee82f4764b442f02a937b69ee3e&response-content-disposition=attachment%3Bfilename%3D%22fswa
######################################################################## 100.0%
==> Pouring fswatch-1.14.0.mojave.bottle.tar.gz
?  /usr/local/Cellar/fswatch/1.14.0: 51 files, 1.2MB
```

## 基本的なコマンドの使い方

コマンドはこのように使います。変更があったファイルは標準出力に出力されます。

```shell
fswatch /path/to/dir
```

/path/to/dir は任意のディレクトリとします。
このディレクトリ内でファイルの追加・編集・削除があった場合、ファイルパスが出力されます。

## 試す

パスを渡す

```shell
$ fswatch  /path/to/dir/ | xargs -n1 echo &
$ echo "hello!" >> /path/to/dit/test.txt
/path/to/dit/test.txt
```

ファイルの中身を出力する

```shell
$ fswatch  /path/to/dir/ | xargs -n1 cat &
$ echo "hello!" >> /path/to/dit/test.txt
hello!
```
