---
title: "[JS]BigIntでMathが使えない件"
path: "/entry/278"
date: "2022-06-12 01:00"
coverImage: "../../../images/thumbnail/javascript-logo.png"
author: "s-yoshiki"
tags: ["javascript", "node.js", "atcoder", "競技プログラミング"]
---

## はじめに

JS の [BigInt](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/BigInt)
で [Math](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Math)
を利用することはできません。

Math は Number 型のみ利用できます。

例えば以下のコードの場合、引数が BigInt のため実行に失敗します。

```js
console.log(Math.abs(-1)); // 1
console.log(Math.abs(-1n)); // TypeError: Cannot convert a BigInt value to a number
```

それでも、abs とか max, min が利用できたらなと思っていたので、対策を考えてみました。

## 1. Math オブジェクトっぽいものを自前で実装する

Math オブジェクトっぽいものを自前で実装してみました。

BigInt では浮動小数点数は扱えないので、PI や 三角関数は除外しました。

```js
const BigMath = {
  abs(x) {
    if (x < 0n) {
      return -1n * x;
    }
    return x;
  },
  min(base, ...values) {
    for (const value of values) {
      if (value < base) {
        base = value;
      }
    }
    return base;
  },
  max(base, ...values) {
    for (const value of values) {
      if (value > base) {
        base = value;
      }
    }
    return base;
  },
  pow(base, ex) {
    return base ** ex;
  },
  sign(x) {
    if (x === 0n) {
      return 0n;
    }
    return x < 0n ? -1n : 1n;
  },
};
```

実行例

```js
console.log(BigMath.max(1n, 2n, 3n)); // 3n
```

## 2. プロトタイプメソッドを追加してみる

イケてる実装ではないですが、プロトタイプメソッドを使う方法も思いつきました。

```js
BigInt.prototype.abs = function () {
  return -this;
};
BigInt.prototype.pow = function (ex) {
  return this ** ex;
};
BigInt.prototype.min = function (...values) {
  const base = this;
  for (const value of values) {
    if (value < base) {
      base = value;
    }
  }
  return base;
};
BigInt.prototype.max = function (...values) {
  const base = this;
  for (const value of values) {
    if (value > base) {
      base = value;
    }
  }
  return base;
};
```

実行例

```js
let x = BigInt(-2)
console.log(x.abs()) // 2n
console.log(x.pow(2n)) // 4n
console.log(x.max(-3n, -4n)) // -2n
```
