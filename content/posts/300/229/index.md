---
title: "JSで32ビット符号付き整数に対してのビット演算でハマった"
path: "/entry/229"
date: "2021-02-17 00:01"
coverImage: "../../../images/thumbnail/javascript-logo.png"
author: "s-yoshiki"
tags: ["javascript","node.js","アルゴリズム"]
---

## 概要

JSでサブネットマスクの計算を行おうとしたとき、ビット演算でハマりました。その時のメモです。

[JSでサブネットマスクの計算](https://tech-blog.s-yoshiki.com/entry/225)

JSでビット演算子を利用する場合 32ビットを超える整数を扱う場合は論理右シフト`>>>`などを利用して変換するなどの対応が必要そうです。


### 具体例

例えば64などの32ビット符号付き整数の範囲に収まる数値に対して論理和を計算すると次のような結果となります。

※符号付き32ビット整数は -2の32乗から2の32乗-1 (−2,147,483,648 から 2,147,483,647) を表現できます。

```js
console.log(64) // 64
console.log(64 | 0) // 64
console.log(-64 | 0) // -64
console.log(2147483647 | 0) // 2147483647
```


しかし32ビット符号付き整数の範囲内で計算できれば良いのですが、
例えば、192.168.0.1 のようなIPアドレスの値を10進数に変換する場合 `3232235521` となります。
このように、この範囲を超えた数値を計算しようとした際に意図せず負の値となっていました。

```js
console.log(2147483648 | 0) // -2147483648
console.log(3232235521 | 0) // -1062731775
```

この計算では32ビットで表せる数値を全て符号なしの整数として表現したかったので、変換する方法を探したところ "符号なし右シフト演算子" で符号なしの表現に変換することができました。

```js
console.log((2147483648 | 0) >>> 0) // 2147483648
console.log((3232235521 | 0) >>> 0) // 3232235521
```


## 参考にしたサイト

[JavaScriptのビット演算な罠](http://katwat.s1005.xrea.com/wp/5164)

[符号なし右シフト (>>>) - MDN ](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/Unsigned_right_shift)

[32ビット - Wikipedia](https://ja.wikipedia.org/wiki/32%E3%83%93%E3%83%83%E3%83%88)

[javascriptでビット演算をしてみよう！ - SystemGathering](http://sys.sysgathe.com/2010/02/javascriptbit.html)