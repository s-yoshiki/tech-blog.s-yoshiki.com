---
title: "curlでunix-socketに失敗するのでcurlのアップデートを行った。"
path: "/entry/40"
date: "2018-09-10 00:55:48"
coverImage: "../../../images/thumbnail/curl-logo.png"
author: "s-yoshiki"
tags: ["linux","ubuntu","curl"]
---

## 概要

Ngix Unitを試していた時の作業です。

```shell
curl -X PUT -d @server_env.json --unix-socket /var/run/control.unit.sock http://localhost/
```

コマンドを実行すると

```shell
curl: option --unix-socket: is unknown
curl: try 'curl --help' or 'curl --manual' for more information
```

と表示されエラーとなった。
これはcurlのバージョンが低かったため起こったようである。unix-socketを利用できるのが7.50〜であったのに対し、curl -Vすると7.30と帰ってきた。ひとまずcurlのバージョンをあげることにした。

## 環境

Ubuntu 14.04 Xenial

## curlのインストール

以下のコマンドを叩きcurlをインストールします。

```shell
sudo apt-get build-dep curl

mkdir ~/curl
cd ~/curl
wget http://curl.haxx.se/download/curl-7.50.2.tar.bz2
tar -xvjf curl-7.50.2.tar.bz2
cd curl-7.50.2

./configure
make
sudo make install

sudo ldconfig

```

<a href="https://gist.github.com/fideloper/f72997d2e2c9fbe66459"> 参照元 https://gist.github.com/fideloper/f72997d2e2c9fbe66459</a>
makeに2〜3分程度かかります。<br />インストールが完了すると、/usr/bin/local/curlから利用できるようになると思います。
以上。