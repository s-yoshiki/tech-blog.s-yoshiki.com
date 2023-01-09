---
title: "OpenSSL をソースビルドする"
path: "/entry/300"
date: "2023-01-09 01:00"
coverImage: "../../../images/thumbnail/javascript-logo.png"
author: "s-yoshiki"
tags: ["debian", "linux", "openssl"]
---

## 概要

OpenSSL をソースビルドした際の備忘録です。

https://www.openssl.org/source/

## 環境

debian:bullseye-slim コンテナにて実施

## OpenSSL 3.0

### ビルド〜インストール

以下のコマンドでビルド〜インストールを行います。

`$HOME/openssl`の下にインストールするようオプションを指定しています。

```sh
cd /tmp
apt update
apt install -y wget perl gcc make # ビルドに必要なツール
apt install -y zlib1g-dev # openssl の依存関係
wget https://www.openssl.org/source/openssl-3.0.7.tar.gz
tar -xvf openssl-3.0.7.tar.gz
cd openssl-3.0.7
./Configure  --prefix="$HOME/openssl" shared zlib
make
make install
```

これでインストールは完了です。
5分くらいかかると思います。

### 呼び出す

```sh
# 共有ライブラリのパスを設定
export LD_LIBRARY_PATH="$HOME/openssl/lib:$LD_LIBRARY_PATH"
# パスを通す
export PATH="$HOME/openssl/bin/:$PATH"
```

```sh
$ which openssl
/root/openssl/bin/openssl
$ openssl version
OpenSSL 3.0.7 1 Nov 2022 (Library: OpenSSL 3.0.7 1 Nov 2022)
```

