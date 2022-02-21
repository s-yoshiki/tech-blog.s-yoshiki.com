---
title: "JSでIPアドレスがサブネットマスクで指定した範囲内にあるか判定する"
path: "/entry/228"
date: "2021-02-16 01:00"
coverImage: "../../../images/thumbnail/javascript-logo.png"
author: "s-yoshiki"
tags: ["javascript","node.js","アルゴリズム"]
---

## 概要

JSでIPアドレス(IPv4)が指定したサブネットの範囲に含まれるか判定するロジックを作った時の記録です。


## IPアドレスが指定した範囲内にあるかどうか判定

処理としては、IPアドレスのネットワークアドレスが同じかどうかを比較する方法でチェックします。

```js
// IPv4(X.X.X.X)形式のIPアドレスをNumber型に変換する
const ip2long = (ip) => parseInt(ip.split(".").map(e => Number(e).toString(2).padStart(8, '0')).join(''), 2)


const inRange = (remoteIp, acceptIp, cidr) => {
    cidr = Number(cidr)
    const remoteIpNetwork = remoteIp >>> (32 - cidr)
    const acceptIpNetwork = acceptIp >>> (32 - cidr)
    return remoteIpNetwork === acceptIpNetwork
}
// 短くするとこう書ける
// const inRange = (remoteIp, acceptIp, cidr) => remoteIp >>> (32 - Number(cidr)) === acceptIp >>> (32 - Number(cidr))

console.log(`192.168.0.1 は 192.168.0.254/24 に含まれ${ inRange(ip2long("192.168.0.1"), ip2long("192.168.0.254"), 24) ? 'ます' : 'ません' }`)
// 192.168.0.1 は 192.168.0.254/24 に含まれます
console.log(`192.168.1.0 は 192.168.0.254/24 に含まれ${ inRange(ip2long("192.168.1.0"), ip2long("192.168.0.254"), 24) ? 'ます' : 'ません' }`)
// 192.168.1.0 は 192.168.0.254/24 に含まれません
```

## 参考にしたサイト

[ネットワーク 関数](https://www.php.net/manual/ja/ref.network.php)