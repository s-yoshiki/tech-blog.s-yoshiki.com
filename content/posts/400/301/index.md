---
title: "glibcをソースからビルド〜インストール"
path: "/entry/301"
date: "2022-01-14 16:00"
coverImage: "../../../images/thumbnail/linux-logo.png"
author: "s-yoshiki"
tags: ["linux", "debian"]
---

## 概要

glibc をソースビルド〜インストールした際の備忘録です。

## 環境

debian:bullseye-slim (dockerコンテナ)

## ビルド

以下のコマンドでビルドの準備を行います。

```shell
cd /tmp
apt update
apt install -y wget perl gcc make # ビルドに必要なツール類
apt install -y gawk bison # 依存関係として必要なもの
wget https://ftp.gnu.org/gnu/glibc/glibc-2.36.tar.gz
tar -xf glibc-2.36.tar.gz
mkdir -p ./glibc-build # build用ディレクトリが必要
cd ./glibc-build
```

以下のコマンドでビルドします。

```shell
../glibc-2.36/configure \
  --prefix=/$HOME/local
make # 5~10分くらいかかります。
make install
```

