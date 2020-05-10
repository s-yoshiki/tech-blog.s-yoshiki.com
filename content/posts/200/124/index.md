---
title: "WSL領域のファイルをエクスプローラで操作する。mountコマンド"
path: "/entry/124"
date: "2019-05-19 02:20:22"
coverImage: "../../../images/thumbnail/linux-logo.png"
author: "s-yoshiki"
tags: ["linux","ubuntu","windows","wsl","mount"]
---

## はじめに

タイトルだけを見ると誤解されそうなので正しく説明します。
WSL上では /mnt/c/ にWindowsのCドライブがマウントされています。

例) /mnt/c/Users, /mnt/c/Windows

Windowsのエクスプローラで、/bin や /var を参照することは基本的にはできません。
(Windows 10 build 1903 からは可能なようです。)

これだと、WSLでApacheなどを使っていて ルート以下のファイル・ディレクトリ (/var/www/htmlなど) に配置したファイルを編集したりするのに苦労します。

ここでエクスプローラからルート直下にファイルを置いたり、編集する方法を紹介します。

## 環境

- Windows10 Pro
- WSL (Ubuntu 18.04)

## mountコマンドでディレクトリをマウントする

mountコマンドは通常、デバイスをマウントするときに使いますが、bindオプションでディレクトリをマウントすることができます。

WSLから /mnt/c 以下の任意のディレクトリをマウントします。
ここではルート直下のディレクトリ:/workspaceにマウントさせます。

```shell
mkdir /workspace
mount -bind /workspace /mnt/c/Users/ユーザ/workspace
```

## 参考

<a href="https://news.mynavi.jp/article/20190219-773301/">https://news.mynavi.jp/article/20190219-773301/</a>

<a href="https://www.atmarkit.co.jp/ait/articles/1903/18/news031.html">https://www.atmarkit.co.jp/ait/articles/1903/18/news031.html</a>