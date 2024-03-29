---
title: "zlibをソースビルドする"
path: "/entry/299"
date: "2023-01-09 21:00"
coverImage: "../../../images/thumbnail/linux-logo.png"
author: "s-yoshiki"
tags: ["linux", "debian"]
---

## 概要

zlibのソースビルドした際の備忘録です。

## 環境

debian:bullseye-slim (dockerコンテナ)

## ビルド〜インストール

以下のコマンドでビルド〜インストールを行います。

`$HOME/openssl`の下にインストールするようオプションを指定しています。

```sh
cd /tmp
apt update
apt install wget perl gcc make # ビルドに必要なツール
# apt install zlib1g-dev # openssl の依存関係
wget https://www.zlib.net/zlib-1.2.13.tar.gz
tar -xf zlib-1.2.13.tar.gz
cd zlib-1.2.13
./configure  --prefix="$HOME/zlib"
make
make install
```

```sh
export LD_LIBRARY_PATH="$HOME/zlib/lib:$LD_LIBRARY_PATH"
```

## 参考にしたサイト

- [zlibをソースコードビルドする - Qiita](https://qiita.com/boscoworks/items/a27a74e5da8adc3c1be8)
