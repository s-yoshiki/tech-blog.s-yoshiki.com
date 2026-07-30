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

> 自分が管理している端末・ネットワーク、または明示的に許可を得た対象だけをスキャンしてください。許可のないスキャンは、利用規約違反やインシデントとして扱われる可能性があります。

## nmap

ターミナルからポートスキャンを行うにはnmapコマンドを使います。
macOSには標準搭載されていないため、Homebrewから導入します。

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

## よく使う指定

宛先だけを指定した場合、Nmapは既定で頻出するTCP 1,000ポートを調べます。目的が決まっている場合は対象を絞ると、速く、意図も明確になります。

```shell
# 80番と443番だけ
nmap -p 80,443 192.0.2.10

# 1〜1024番
nmap -p 1-1024 192.0.2.10

# サービスの種類とバージョンを推測
nmap -sV -p 22,80,443 192.0.2.10

# ホスト探索を省略（ICMPに応答しない対象向け）
nmap -Pn -p 443 192.0.2.10
```

### スキャン方式の違い

| 指定 | 内容 | 使いどころ |
| :--- | :--- | :--- |
| `-sT` | OSの `connect()` を使うTCP Connectスキャン | 管理者権限がない場合 |
| `-sS` | TCP SYNスキャン | 権限があり、TCPを効率よく調べたい場合 |
| `-sU` | UDPスキャン | DNSやNTPなどUDPサービスを確認する場合 |

`-sU` は応答が返らないケースがあり、TCPより判定に時間がかかります。また、`-sS` はraw packetを扱う権限が必要です。

## 結果の読み方

- `open`: アプリケーションが接続を受け付けている
- `closed`: 到達できるが、そのポートでは待ち受けていない
- `filtered`: ファイアウォールなどのため、openかclosedか判定できない
- `open|filtered`: 応答がなく、openとfilteredを区別できない

`SERVICE` はポート番号などからの推測を含みます。実際のアプリケーションを確認したい場合は `-sV` を使い、結果だけで安全性を断定しないでください。

## ローカルで待ち受け中のポートだけを確認する

自分のMacでどのプロセスが待ち受けているかを知りたいだけなら、ネットワークスキャンより `lsof` が直接的です。

```shell
sudo lsof -nP -iTCP -sTCP:LISTEN
```

## 参考

- [Nmap Reference Guide: Port Scanning Techniques](https://nmap.org/book/man-port-scanning-techniques.html)
- [Nmap Network Scanning: Port Scanning Basics](https://nmap.org/book/port-scanning.html)
