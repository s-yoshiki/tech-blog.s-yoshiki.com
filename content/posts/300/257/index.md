---
title: "Linux の Network Namespace でルータを作成する"
path: "/entry/257"
date: "2022-02-05 19:00"
coverImage: "../../../images/thumbnail/linux-logo.png"
author: "s-yoshiki"
tags: ["linux"]
---


## はじめに

Linux の Network Namespace でルータを作成した際のメモです。

## ルータの作成


netnsの作成

```
ip netns add ns1
ip netns add router
ip netns add ns2
```

vethインタフェースの作成

```
ip link add ns1-veth0 type veth peer name gw-veth0
ip link add ns2-veth0 type veth peer name gw-veth1
```

vethをnetnsにアタッチする。

```
ip link set ns1-veth0 netns ns1
ip link set gw-veth0 netns router
ip link set gw-veth1 netns router
ip link set ns2-veth0 netns ns2
```

インタフェースをUPする。

```
ip netns exec ns1 ip link set ns1-veth0 up
ip netns exec router ip link set gw-veth0 up
ip netns exec router ip link set gw-veth1 up
ip netns exec ns2 ip link set ns2-veth0 up
```

netnsにIPアドレスの付与を行う。

```
ip netns exec ns1 ip address add 192.0.2.1/24 dev ns1-veth0
ip netns exec router ip address add 192.0.2.254/24 dev gw-veth0
ip netns exec router ip address add 198.51.100.254/24 dev gw-veth1
ip netns exec ns2 ip address add 198.51.100.1/24 dev ns2-veth0
```

netnsにルーティングエントリを追加する。

```
ip netns exec ns1 ip route add default via 192.0.2.254
ip netns exec ns2 ip route add default via 198.51.100.254
```

疎通確認。

```
ip netns exec ns1 ping -c 3 192.0.2.254 -I 192.0.2.1
ip netns exec ns2 ping -c 3 198.51.100.254 -I 198.51.100.1
```


## リンク

 - [LinuxのNetwork Namespaceで手元にネットワークテスト環境を作る - APC 技術ブログ](https://techblog.ap-com.co.jp/entry/2019/06/28/100439)
 - [hawksnowlog: Network Namespace 超入門](https://hawksnowlog.blogspot.com/2021/05/getting-started-network-namespace.html)
 - [Linux Network Namespace(netns)でEC2のENIごとに異なるネットワーク設定 | DevelopersIO](https://dev.classmethod.jp/articles/separate-networking-per-eni-by-linux-netns/)
 - [ip netnsコマンドで学ぶNetwork Namespace - Carpe Diem](https://christina04.hatenablog.com/entry/network-namespace)