---
title: "JavaScriptで多次元配列の初期化を行う"
path: "/entry/119"
date: "2019-05-05 13:34:55"
coverImage: "../../../images/thumbnail/javascript-logo.png"
author: "s-yoshiki"
tags: ["javascript"]
---

## 概要

JavaScript(ES2015)で多次元配列を任意の値で初期化する方法について。

## 1次元配列

例えば、

```js
let arr = new Array(5);
```

と宣言した場合

```js
console.log(arr[0]);
// undefined
```

となります。

ここでfillメソッドを使うことで初期化することができます。

```js
let arr = new Array(5).fill(0);
```

```js
console.log(JSON.stringify(arr));
// [0,0,0,0,0]
```

## 2次元配列

Array.from()を使って浅いコピーを行い2次元行列を生成します。

```js
Array.from(new Array(3), () => new Array(3).fill(0));
```

```js
console.log(JSON.stringify(arr));
// [[0,0,0],[0,0,0],[0,0,0]]
```

調べたら色々な方法が出てきますが、見た中で一番スマートな方法はこれだと思います。

ちなみに以下のように生成した場合、参照先が同じ配列となるため、
期待とは異なる配列が生成されるようです。

```js
let arr = new Array(3).fill(new Array(3).fill(0));
console.log(JSON.stringify(arr));
// [[0,0,0],[0,0,0],[0,0,0]]
arr[0][0] = 1;
console.log(JSON.stringify(arr));
// [[1,0,0],[1,0,0],[1,0,0]]
```

## 3次元配列

２次元配列の生成を応用して3次元配列を生成してみます。
画像のRGB値を扱うときに便利かもしれません。

```js
let arr = Array.from(new Array(3), () => {
  return Array.from(new Array(3), () => new Array(3).fill(0));
});
```

```js
console.log(JSON.stringify(arr));
// [
//     [[0,0,0],[0,0,0],[0,0,0]],
//     [[0,0,0],[0,0,0],[0,0,0]],
//     [[0,0,0],[0,0,0],[0,0,0]]
// ]
```

## 参考

<a href="https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/fill">https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/fill</a>

<a href="https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/from">https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/from</a>

<a href="https://qiita.com/butchi_y/items/db3078dced4592872a9c">https://qiita.com/butchi_y/items/db3078dced4592872a9c</a>
