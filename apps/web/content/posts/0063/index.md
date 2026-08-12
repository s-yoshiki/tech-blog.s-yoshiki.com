---
title: "3つ以上の整数の最大公約数・最小公倍数を求める JavaScript"
path: "/entry/63"
date: "2018-10-14 01:40:44"
coverImage: "../../../images/thumbnail/javascript-logo.png"
author: "s-yoshiki"
tags: ["javascript","アルゴリズム"]
---

## 概要

JavaScriptで3つ以上の整数の最大公約数・最小公倍数を求める時のメモ。スニペット。
どちらもユークリッド互除法を利用しています。

AtCoderとかで役に立ちます。

## 最大公約数

### 2つの整数の最大公約数を求める

```js
function gcd(a, b) {
  if (b === 0) {
    return a;
  }
  return gcd(b, a % b);
}

console.log(gcd(10, 25));
// 5
```

### 3つ以上の整数の最大公約数を求める

```js
function gcd() {
  var f = (a, b) => b ? f(b, a % b) : a;
  var ans = arguments[0];
  for (var i = 1; i < arguments.length; i++) {
    ans = f(ans, arguments[i]);
  }
  return ans;
}

console.log(gcd(10, 20, 30, 100));
// 10
```

## 最小公倍数

### 2つの整数の最小公倍数を求める

```js
function lcm(a, b) {
  var g = (n, m) => m ? g(m, n % m) : n;
  return a * b / g(a, b);
}

console.log(lcm(24, 18)); // 72
```

### 3つ以上の整数の最小公倍数を求める

```js
function lcm() {
  var a = arguments;
  var g = (n, m) => m ? g(m, n % m) : n;
  var l = (n, m) => n * m / g(n, m);
  var ans = a[0];

  for (var i = 1; i < a.length; i++) {
    ans = l(ans, a[i]);
  }
  return ans;
}

console.log(lcm(24, 18, 36)); // 72
```
