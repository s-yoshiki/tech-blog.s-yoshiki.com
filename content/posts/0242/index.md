---
title: "tracerouteコマンドでネットワークの経路を洗い出す"
path: "/entry/242"
date: "2021-10-30 23:59"
coverImage: "../../../images/thumbnail/linux.png"
author: "s-yoshiki"
tags: ["linux", "mac"]
---

## 概要

tracerouteコマンドでネットワークの経路を洗い出した際の操作をメモしました。

環境はmacで実施しています。

また、tracerouteのバージョンは次のバージョンとなります。

```
Version 1.4a12+Darwin
```

## tracerouteの用途

tracerouteコマンドは、ネットワークのトラブルシュートに使われます。

## tracerouteの原理

traceroute は、IPパケットのヘッダ情報に含まれるTTL(Time To Live)を活用します。
TTLは、ルーティングされるたびに1ずつ減っていく値で、パケットの到達範囲の制限や、滞留し続けないようにするために使われます。

※TTLの詳細は後述します。

tracerouteはこの仕組みを利用します。
目的地に向けて、TTLを1つずつ増やしたパケットを順番に目的地まで送ることで、意図的にICMPの時間切れを引き起こし。
時間切れメッセージを送ってきたルータを並べることで、パケットの経路を調べられるます。
※しかし場合によっては、ルータが時間切れメッセージを返さないこともあります。

### IPヘッダのTTL

TTLには0から255までの整数値が入ります。
TTLの値は、パケットを作って送り出すときにノードが初期値を設定します。
そして、パケットのTTLは、ルータを1つ通過する毎に1つずつ値が減っていきます。
もし、経路上でパケットのTTLがゼロになると、そのパケットはルータによって破棄されます。
このとき、パケットを破棄したルータは同時にICMPで時間切れ(TimeExceeded)のメッセージをパケットの送信元に送ることがあります。

## コマンドを実行してみる

実際に `8.8.8.8` (GoogleのDNS) への接続経路を洗い出してみます。

```
$ traceroute -n 8.8.8.8 
traceroute to 8.8.8.8 (8.8.8.8), 64 hops max, 52 byte packets
 1  10.18.X.X  6.372 ms  6.000 ms  6.260 ms
 2  103.5.X.X  6.324 ms
 3  172.30.X.X  6.742 ms  6.937 ms  5.590 ms
 4  172.30.X.X  6.780 ms  6.248 ms  6.842 ms
 5  210.171.X.X  8.001 ms  8.552 ms  9.676 ms
 6  108.170.X.X  8.424 ms
 7  72.14.X.X  7.513 ms
 8  8.8.8.8  7.154 ms  7.363 ms  7.188 ms
```

## 参考文献

- [traceroute - Wikipedia](https://ja.wikipedia.org/wiki/Traceroute)
- [【図解】IPヘッダのフォーマット ～ToS/TTL/Protocol/IHL/Option等各フィールドの解説～](https://milestone-of-se.nesuke.com/nw-basic/ip/ip-format/)

<iframe style="width:120px;height:240px;" marginwidth="0" marginheight="0" scrolling="no" frameborder="0" src="//rcm-fe.amazon-adsystem.com/e/cm?lt1=_blank&bc1=000000&IS2=1&bg1=FFFFFF&fc1=000000&lc1=0000FF&t=yoshiki037-22&language=ja_JP&o=9&p=8&l=as4&m=amazon&f=ifr&ref=as_ss_li_til&asins=B08SH41SL6&linkId=2e77953c36a5ca0b5607b3f917db8be3"></iframe>
