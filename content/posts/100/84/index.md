---
title: "Macでターミナルからポートスキャンを行う方法。"
path: "/entry/84"
date: "2018-12-09 18:58:10"
coverImage: "../../../images/thumbnail/linux-logo.png"
author: "s-yoshiki"
tags: ["linux","mac", "apple"]
---

## 概要

Macでターミナルからポートスキャンを行う方法を紹介します。

## nmap

ターミナルからポートスキャンを行うにはnmapコマンドを使います。
しかしながら、macでは元から用意されているコマンドではないようです。

### nmapのインストール

homebrewを用いて導入します。

https://brew.sh/index_ja

以下のコマンドで導入は完了します。

```
brew install nmap
```

インストール成功時の画像
<img src="https://pbs.twimg.com/media/Dt9z4otU8AAjRrt.jpg">

### コマンドを叩く

引数にはipもしくはホスト名を利用することができます。

```shell
$ nmap 127.0.0.1
Starting Nmap 7.70 ( https://nmap.org ) at 2018-12-09 18:44 JST
Nmap scan report for localhost (127.0.0.1)
Host is up (0.00044s latency).
Not shown: 746 closed ports, 249 filtered ports
PORT     STATE SERVICE
22/tcp   open  ssh
80/tcp   open  http
445/tcp  open  microsoft-ds
631/tcp  open  ipp
5900/tcp open  vnc

Nmap done: 1 IP address (1 host up) scanned in 4.13 seconds
```

<img src="https://pbs.twimg.com/media/Dt9z3XLVYAAdajw.jpg">

```shell
$ nmap google.com
Starting Nmap 7.70 ( https://nmap.org ) at 2018-12-09 18:45 JST
Nmap scan report for google.com (172.217.31.174)
Host is up (0.0096s latency).
rDNS record for 172.217.31.174: nrt12s22-in-f14.1e100.net
Not shown: 998 filtered ports
PORT    STATE SERVICE
80/tcp  open  http
443/tcp open  https

Nmap done: 1 IP address (1 host up) scanned in 4.19 seconds
```

<img src="https://pbs.twimg.com/media/Dt9z2iqV4AAgKC2.jpg">