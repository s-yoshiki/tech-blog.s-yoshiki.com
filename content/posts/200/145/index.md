---
title: "0埋め・ゼロ埋め処理 のコードJavaScript"
path: "/entry/145"
date: "2019-07-02 22:40:42"
coverImage: "../../../images/thumbnail/javascript-logo.png"
author: "s-yoshiki"
tags: ["javascript","アルゴリズム","0埋め","ゼロ埋め"]
---

## 概要

JavaScriptで 0埋め / ゼロ埋め / zero埋め 処理を行うサンプルコード

## サンプル

### コード

```js
const pad = (num, length, str='0') => {
    return (new Array(length).fill(str).join('') + num).slice(-length);
}
```

### 呼び出す

```js
console.log(pad(5, 2))
// 05
```

```js
console.log(pad(5, 10))
// 0000000005
```

```js
console.log(pad(5, 10, x))
// xxxxxxxxx5
```

### 説明

記事タイトルが0埋めになってますが、この関数は任意の文字で埋めることができます。

## 参考

<a href="https://takuya-1st.hatenablog.jp/entry/2014/12/03/114154">https://takuya-1st.hatenablog.jp/entry/2014/12/03/114154</a>

## 追記

padStrを使った方が良さそうです。

```js
const str1 = '5';

console.log(str1.padStart(2, '0'));
// expected output: "05"
```