---
title: "google.52ecy.topとかいうサイトからアクセスがあった"
path: "/entry/148"
date: "2019-07-06 23:13:00"
coverImage: "../../../images/thumbnail/network-image.png"
author: "s-yoshiki"
tags: ["雑談"]
---

## はじめに

このブログのアクセスログのリファラに google.52ecy.top というものがあった。

<a href="https://google.52ecy.top/">https://google.52ecy.top/</a>

とりあえず、アクセスしてみるとgoogleのtopとまるっきり同じ画面が表示された。

## nmapしてみた

とりあえず、nmapしてみる

```shell
$ nmap google.52ecy.top 
Starting Nmap 7.70 ( https://nmap.org ) at 2019-07-06 18:58 JST
Nmap scan report for google.52ecy.top (104.28.30.194)
Host is up (0.019s latency).
Other addresses for google.52ecy.top (not scanned): 2606:4700:30::681c:1fc2 2606:4700:30::681c:1ec2 104.28.31.194
Not shown: 996 filtered ports
PORT     STATE SERVICE
80/tcp   open  http
443/tcp  open  https
8080/tcp open  http-proxy
8443/tcp open  https-alt
```

うーん、普通のwebサーバか? Proxyサーバか?
それより、https-altってなんだろ

## whoisしてみた

次にwhoisしてみる

```shell
$ whois 852ecy.top
% IANA WHOIS server
% for more information on IANA, visit http://www.iana.org
% This query returned 1 object

refer:        whois.nic.top

domain:       TOP

organisation: Jiangsu Bangning Science & Technology Co.,Ltd.
address:      3th Floor, BangNing Technology Park, 2 YuHua Avenue, Yuhuatai District, Nanjing City, Jiangsu Province.
address:      China

contact:      administrative
name:         Xiangli Li
organisation: Jiangsu Bangning Science & technology Co.,Ltd.
address:      3th Floor, BangNing Technology Park, 2 YuHua Avenue, Yuhuatai District, Nanjing City, Jiangsu Province.
address:      China
phone:        +86 13915996396
fax-no:       +86 2586883476
e-mail:       newgtld@55hl.com

contact:      technical
name:         Lin Dong
organisation: Jiangsu Bangning Science & technology Co.,Ltd.
address:      3th Floor, BangNing Technology Park, 2 YuHua Avenue, Yuhuatai District, Nanjing City, Jiangsu Province
address:      China
phone:        +86 15261877642
fax-no:       +86 02586883476
e-mail:       kf@55hl.com

nserver:      A.ZDNSCLOUD.COM 203.99.24.1
nserver:      B.ZDNSCLOUD.COM 203.99.25.1
nserver:      C.ZDNSCLOUD.COM 203.99.26.1
nserver:      D.ZDNSCLOUD.COM 203.99.27.1
nserver:      F.ZDNSCLOUD.COM 114.67.46.12
nserver:      G.ZDNSCLOUD.COM 42.62.2.16
nserver:      I.ZDNSCLOUD.COM 2401:8d00:1:0:0:0:0:1
nserver:      J.ZDNSCLOUD.COM 2401:8d00:2:0:0:0:0:1
ds-rdata:     56384 8 2 ba378c5913404ec654df544f519b0fb287e140d64dac5d59e349962393c17945

whois:        whois.nic.top

status:       ACTIVE
remarks:      Registration information: http://www.nic.top

created:      2014-07-24
changed:      2018-12-11
source:       IANA

The queried object does not exist: 852ecy.top
>>> Last update of WHOIS database: 2019-07-06T13:35:10Z <<<
```

なるほど。chainaか！

```
address:      China
```

## DNSを調べてみる

```
dig google.52ecy.top

; <<>> DiG 9.10.6 <<>> google.52ecy.top
;; global options: +cmd
;; Got answer:
;; ->>HEADER<<- opcode: QUERY, status: NOERROR, id: 13278
;; flags: qr rd ra; QUERY: 1, ANSWER: 2, AUTHORITY: 0, ADDITIONAL: 1

;; OPT PSEUDOSECTION:
; EDNS: version: 0, flags:; udp: 512
;; QUESTION SECTION:
;google.52ecy.top.              IN      A

;; ANSWER SECTION:
google.52ecy.top.       300     IN      A       104.28.31.194
google.52ecy.top.       300     IN      A       104.28.30.194

;; Query time: 161 msec
;; SERVER: 2404:1a8:7f01:b::3#53(2404:1a8:7f01:b::3)
;; WHEN: Sat Jul 06 22:45:21 JST 2019
;; MSG SIZE  rcvd: 77
```

IPアドレス自体はCloudFlareに向いていた。

よくわからなかったけど「China」な上に怪しさMAXなので気をつけようと思いました。
