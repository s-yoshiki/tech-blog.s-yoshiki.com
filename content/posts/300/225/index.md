---
title: "JSでサブネットマスクの計算"
path: "/entry/225"
date: "2021-02-04 00:01"
coverImage: "../../../images/thumbnail/javascript-logo.png"
author: "s-yoshiki"
tags: ["javascript","node.js","アルゴリズム"]
---

## 概要

JSでIPv4のサブネットマスクの計算を行った時の記録及び自分用メモです。

JSでIPの計算を行う機会なんて殆どないかもしれませんが、(node.jsは別として)
重要な理論を整理するためにJSで実装してみました。

## JSによるサブネットマスク関連の計算

大前提としてサブネットの計算を整理しておきます。

※ ここに記載しているコードは"最低限の機能"しか実装しておらず、入力値をチェックする機構はないので注意が必要です。例外的な値を入力すると誤作動します。

### IPv4アドレス文字列をNumber型に変換する

IPv4アドレスの文字列、例えば `192.168.0.1` のような形式の文字列を計算で利用するために、Number型に変換しておきます。後々bit演算するのが楽です。

```js
// IPv4 to binary string
const ip2bin = (ip) => ip.split(".").map(e => Number(e).toString(2).padStart(8, '0')).join('')
// IPv4 to Number
const ip2long = (ip) => parseInt(ip2bin(ip), 2)
// Number to IPv4
const long2ip = (num) => {
    let bin = Number(num).toString(2).padStart(32, '0')
    return [
        bin.slice(0, 8),
        bin.slice(8, 16),
        bin.slice(16, 24),
        bin.slice(24, 32),
    ].map(e => parseInt(e, 2)).join('.')
}

console.log(ip2bin("192.0.34.166")) // 11000000000000000010001010100110
console.log(ip2long("192.0.34.166")) // 3221234342
console.log(long2ip(ip2long("192.0.34.166"))) // 192.0.34.166
```

余談ですが、ip2long/long2ipはPHPで同じ名前の関数が存在します。ここから名前を拝借しました。

[ip2long - php.net](https://www.php.net/manual/ja/function.ip2long.php)

### CIDR と サブネットの相互変換

CIDRは2進数で表示された場合の先頭からの1の数を表しており、1〜32の値となります。

なので次のような関係が成り立ちます。

```
26 (CIDR)
↓
1111111,1111111,1111111,11000000 (2進数表記)
↓
255.255.255.192 (10進数表記、サブネットマスク)
```

コードにするとこのようになります。

```js
// CIDR to Number
const cidr2long = (cidr) => parseInt(String("").padStart(cidr, '1').padEnd(32, '0'), 2)
// CIDR to SubnetMask
const cidr2subnetmask = (num) => long2ip(cidr2long(num))
// SubnetMask to CIDR
const subnetmask2cidr = (ip) => ip2bin(ip).split('1').length - 1

console.log(cidr2subnetmask(26)) // 255.255.255.192
console.log(subnetmask2cidr("255.255.255.192")) // 26
```

### ネットワークアドレス と ブロードキャストアドレス

ネットワークアドレス(開始アドレス)は、IPアドレスとサブネットマスクのAND(論理積)で求められます。

また、ブロードキャストアドレス(終了アドレス)は、IPアドレスと反転したサブネットマスクのOR(論理和)で求められます。

イメージだとこんな感じです↓

```js
ip & subnetmask // ネットワークアドレス
ip | ~subnetmask // ブロードキャストアドレス
```

なので、純粋にJSのビット論理積とビット論理和で計算しようとしましたが、、、ここでハマりました。

```js
console.log(64) // 64
console.log(64 | 0) // 64
console.log(ip2long("192.168.0.1")) // 3232235521
console.log(3232235521) // 3232235521
console.log(3232235521 | 0) // -1062731775
```

ここにあるコードの5行目ように、計算中に意図せず負の値となっていました。
これは2の補数(=符号付き32ビットの整数)として表現されています。
符号付き32ビット整数は -2の32乗から2の32乗-1を表現できます。

今回は32ビットで表せる数値を全て符号なしの整数として表現したかったので、変換する方法を探したところ "符号なし右シフト演算子" で符号なしの表現に変換することができました。

```js
console.log(3232235521) // 3232235521
console.log(3232235521 >>> 0) // 3232235521
```

これを利用して、ネットワークアドレスとブロードキャストアドレスは次のように求めます。

```js
// ネットワークアドレス
const getNetworkAddr = (ip, subnetmask) => (ip & subnetmask) >>> 0
// ブロードキャストアドレス
const getBroadcastAddr = (ip, subnetmask) => (ip | ~subnetmask) >>> 0
```

### クラス

IPアドレスは使用するネットワークの規模によってクラスA〜Cに分かれています。

 - **クラスA** 10.0.0.0 ～ 10.255.255.255
 - **クラスB** 172.16.0.0 ～ 172.31.255.255
 - **クラスC** 192.168.0.0 ～ 192.168.255.255

これを次のようにコードに落としました。

```js
const getClass = (ip) => {
    if (ip2long("10.0.0.0") <= ip && ip <= ip2long("10.255.255.255")) {
        return 'A'
    }
    if (ip2long("172.16.0.0") <= ip && ip <= ip2long("172.31.255.255")) {
        return 'B'
    }
    if (ip2long("192.168.0.0") <= ip && ip <= ip2long("192.168.255.255")) {
        return 'C'
    }
    return false;
}
console.log(getClass(ip2long("192.168.0.1"))) // C
```

## 改めてサブネットマスクを計算する

改めて整理してサブネットマスクの計算を行います。コード全て載せます。

```js
const ip2bin = (ip) => ip.split(".").map(e => Number(e).toString(2).padStart(8, '0')).join('')

const ip2long = (ip) => parseInt(ip2bin(ip), 2)

const long2ip = (num) => {
    let bin = Number(num).toString(2).padStart(32, '0')
    return [
        bin.slice(0, 8),
        bin.slice(8, 16),
        bin.slice(16, 24),
        bin.slice(24, 32),
    ].map(e => parseInt(e, 2)).join('.')
}

const cidr2long = (cidr) => parseInt(String("").padStart(cidr, '1').padEnd(32, '0'), 2)

const cidr2subnetmask = (num) => long2ip(cidr2long(Number(num)))

const subnetmask2cidr = (ip) => ip2bin(ip).split('1').length - 1

const getNetworkAddr = (ip, subnetmask) => (ip & subnetmask) >>> 0

const getBroadcastAddr = (ip, subnetmask) => (ip | ~subnetmask) >>> 0

const getClass = (ip) => {
    if (ip2long("10.0.0.0") <= ip && ip <= ip2long("10.255.255.255")) {
        return 'A'
    }
    if (ip2long("172.16.0.0") <= ip && ip <= ip2long("172.31.255.255")) {
        return 'B'
    }
    if (ip2long("192.168.0.0") <= ip && ip <= ip2long("192.168.255.255")) {
        return 'C'
    }
    return false;
}

const ip = "192.168.0.1"
console.log(`
IPアドレス: ${ip}
サブネットマスク: /${subnetmask2cidr("255.255.255.0")} (${cidr2subnetmask(24)})
ネットワークアドレス: ${long2ip(getNetworkAddr(ip2long(ip), cidr2long(24)))}
使用可能IP: ${long2ip(getNetworkAddr(ip2long(ip), cidr2long(24)) + 1)} 〜 ${long2ip(getBroadcastAddr(ip2long(ip), cidr2long(24)) - 1)}
ブロードキャストアドレス: ${long2ip(getBroadcastAddr(ip2long(ip), cidr2long(24)))}
アドレス数: ${getBroadcastAddr(ip2long(ip), cidr2long(24)) - getNetworkAddr(ip2long(ip), cidr2long(24)) + 1}
ホストアドレス数: ${getBroadcastAddr(ip2long(ip), cidr2long(24)) - getNetworkAddr(ip2long(ip), cidr2long(24)) - 1}
IPアドレスクラス: ${getClass(ip2long(ip))}
`)
```

そして出力結果がこちらになります。サブネット計算サイトの結果と一致しました。

```
IPアドレス: 192.168.0.1
サブネットマスク: /24 (255.255.255.0)
ネットワークアドレス: 192.168.0.0
使用可能IP: 192.168.0.1 〜 192.168.0.254
ブロードキャストアドレス: 192.168.0.255
アドレス数: 256
ホストアドレス数: 254
IPアドレスクラス: C
```

## 参考にさせていただいたサイト

[サブネットマスクとは？ - CMAN](https://www.cman.jp/network/term/subnet/)

[JavaScriptのビット演算な罠](http://katwat.s1005.xrea.com/wp/5164)

[符号なし右シフト (>>>) - MDN ](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/Unsigned_right_shift)

[32ビット - Wikipedia](https://ja.wikipedia.org/wiki/32%E3%83%93%E3%83%83%E3%83%88)