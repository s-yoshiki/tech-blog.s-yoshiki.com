---
title: "[Mac]ipコマンドの導入[iproute2mac]"
path: "/entry/256"
date: "2022-01-16 19:00"
coverImage: "../../../images/thumbnail/docker-logo.png"
author: "s-yoshiki"
tags: ["linux","mac"]
---

## 概要

`iproute2mac`を導入して、macOSでipコマンドを導入した際のメモ

## iproute2macについて

[brona/iproute2mac: CLI wrapper for basic network utilites on Mac OS X inspired with iproute2 on Linux systems - ip command.](https://github.com/brona/iproute2mac)

READMEに書かれているように iproute2と完全な互換性はない様です。

あくまでも、`ifconfig` `ndp` `arp` `route` `networksetup` 等のコマンドをPythonから叩いているだけの様です。

## 導入

### homebrewで導入

homebrewを利用する場合です。

まずはパッケージ情報を確認します。

```
$ brew info iproute2mac  
iproute2mac: stable 1.3.0 (bottled)
CLI wrapper for basic network utilities on macOS - ip command
https://github.com/brona/iproute2mac
Not installed
From: https://github.com/Homebrew/homebrew-core/blob/HEAD/Formula/iproute2mac.rb
License: MIT
==> Dependencies
Required: python@3.10 ✔
==> Analytics
install: 2,173 (30 days), 10,350 (90 days), 30,997 (365 days)
install-on-request: 2,178 (30 days), 10,352 (90 days), 30,968 (365 days)
build-error: 0 (30 days)
```

次のコマンドでインストールを実施します。

```
brew info iproute2mac 
```

### 直接インストール

```
$ curl --remote-name -L https://github.com/brona/iproute2mac/raw/master/src/ip.py
$ chmod +x ip.py
$ mv ip.py /usr/local/bin/ip
```

## 確認


インストールが完了したら`ip route show`を実行してみます。

```
$ ip route show
default via X.X.0.1 dev en0
X.X.0.0/17 dev en0  scope link
X.X.0.1/32 dev en0  scope link
X.X125.73/32 dev en0  scope link
127.0.0.0/8 via 127.0.0.1 dev lo0
127.0.0.1/32 via 127.0.0.1 dev lo0
169.254.0.0/16 dev en0  scope link
224.0.0.0/4 dev en0  scope link
255.255.255.255/32 dev en0  scope link
```

## サポートコマンド

以下のコマンドをサポートしているようです。

> * Help
>   * `ip help`
>   * `ip link help`
>   * `ip addr help`
>   * `ip route help`
>   * `ip neigh help`
> * Link module (Interfaces)
>   * List local interfaces `ip link`
>   * Show one interface `ip link show en0`
>   * Shutdown interface `ip link set dev en0 down`
>   * Start interface `ip link set dev en0 up`
>   * Set custom MAC address `ip link set dev en0 address 00:12:34:45:78:90`
>   * Set **Random MAC** address `ip link set en0 address random`
>   * Set **Factory default MAC** address `ip link set en0 address factory`
>   * Set MTU `ip link set dev en0 mtu 9000`
> * Neighbour module (ARP/NDP)
>   * Show all neighbours `ip neigh`
>   * Show all IPv4 (ARP) neighbours `ip -4 neigh`
>   * Show all IPv6 (NDP) neighbours `ip -6 neigh`
>   * Show all IPv4 (ARP) neighbours for a specific interface `ip -4 neigh show dev en0`
>   * IPv6 (NDP) neighbours cannot be currently shown for a specific interface
>   * Flush all neighbours (IPv4 + IPv6) for a specific interface `ip neigh flush dev en0`
>   * Flush all IPv4 (ARP) neighbours for a specific interface `ip -4 neigh flush dev en0`
>   * IPv6 (NDP) neighbours are currently flushed for all interfaces
> * Address module
>   * List all addresses `ip addr`
>   * List IPv4 addresses `ip -4 addr`
>   * List IPv6 addresses `ip -6 addr`
>   * Add address to interface `ip addr add 10.0.0.5/24 dev en0`
>   * Remove address to interface `ip addr del 10.0.0.5 dev en0`
> * Route module
>   * List IPv4 addresses `ip route`
>   * List IPv6 addresses `ip -6 route`
>   * Flush route cache `ip route flush cache`
>   * Get route for destination `ip route get 8.8.8.8`
>   * Add static route `ip route add 192.168.0.0/16 nexthop 10.0.0.1`
>   * Add default route `ip route add default nexthop 10.0.0.1`
>   * Replace static route `ip route replace 192.0.2.0/24 dev utun1`
>   * Remove static route `ip route del 192.168.0.0/16`
>
> 出典: https://github.com/brona/iproute2mac/blob/master/README.md
