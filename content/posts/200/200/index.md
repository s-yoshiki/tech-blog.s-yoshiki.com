---
title: "10進数から2進数 2進数から10進数への変換 JavaScript"
path: "/entry/200"
date: "2020-07-12"
coverImage: "../../../images/thumbnail/javascript-logo.png"
author: "s-yoshiki"
tags: ["javascript", "アルゴリズム", "競技プログラミング"]
---

## 概要

10進数から2進数、2進数から10進数への変換を行うJavaScriptのコードの紹介。
JSの場合、10進数から2進数への変換は`toString`メソッド。2進数から10進数への変換は`parseInt`関数を使えばサクッと算出できますが、それらを使わずに実装しました。

## 10進数から2進数

```js
function intToBin(num) {
  let ans = [];
  if (num === 0) {
    return '0';
  }
  while (num > 0) {
    ans.push(num % 2);
    num = Math.floor(num / 2);
  }
  return ans.reverse().join('');
}
```

## 2進数から10進数

```js
function binToInt(str) {
  let nums = str.split('').map(Number).reverse();
  let ans = 0;
  for (let i = 0; i < nums.length; i++) {
    ans += (2 ** i) * nums[i];
  }
  return ans;
}
```

## テスト

```js
const max = 10e5;
for (let i = 0; i < max; i++) {
  console.log(i);
  if (intToBin(i) !== i.toString(2)) {
    console.log('error:1');
    break;
  }
  let bin = i.toString(2);
  if (binToInt(bin) !== parseInt(bin, 2)) {
    console.log('error:2');
    break;
  }
}
```

10^5 までは問題なく動きました。
