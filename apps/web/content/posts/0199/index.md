---
title: "JavaScriptの配列ショートハンド (AtCoder用)"
path: "/entry/199"
date: "2020-07-05"
coverImage: "../../../images/thumbnail/javascript-logo.png"
author: "s-yoshiki"
tags: ["javascript", "アルゴリズム", "競技プログラミング", "atcoder"]
---

## 概要

JavaScriptのショートハンドの個人的なメモです。

特にAtCoderとかで利用頻度が高い物をまとめました。

## 文字列と配列の変換

### スペースで区切られた数字が並んだ文字列を配列に変換

```js
let input = '10 2 45 11 9 1 72';
let arr = input.split(' ').map(Number);
// [10,2,45,11,9,1,72]
```

### スペースで区切られた数字が並ぶ文字列が複数行に並ぶ際に二次元配列に変換

```js
let input = `1 2 3
4 5 6
7 8 9`;
let arr = input.split('\n').map(e => e.split(' ').map(Number));
// [[1,2,3],[4,5,6],[7,8,9]]
```

### 配列をスペースで区切られた文字列に変換

```js
let input = [10, 2, 45, 11, 9, 1, 72];
let arr = input.join(' ');
// "10 2 45 11 9 1 72"
```

### 文字列の置換

```js
let input = '1 2 3';
let dst = input.split('1').join('a');
// "a 2 3"
```

## 配列初期化

### 通常の配列初期化

```js
// 長さなしの配列
let arr = [];
let arr = new Array();
// 長さ指定の配列
let arr = new Array(10);
```

### 多次元配列初期化

map使ったりすると浅いコピーになってしまうので `Array.from()` を使う。

```js
// 3x3の二次元配列
let arr = Array.from(new Array(3), () => new Array(3));
// [[null,null,null],[null,null,null],[null,null,null]]
```

```js
// 3x2x1の配列
let arr = Array.from(
  new Array(3),
  () => Array.from(new Array(2), () => new Array(1)),
);
// [[[null],[null]],[[null],[null]],[[null],[null]]]
```

### 特定の値で埋められた配列

`fill` を使う

```js
let arr = new Array(10).fill(1);
// [1,1,1,1,1,1,1,1,1,1]
let arr = Array.from(new Array(3), () => new Array(3).fill(2));
// [[2,2,2],[2,2,2],[2,2,2]]
```

## ソート

### 昇順ソート

```js
let arr = [1, 9, 3, 5, 7, 2];
arr = arr.sort((a, b) => a - b);
// 1,2,3,5,7,9
```

### 降順ソート

```js
let arr = [1, 9, 3, 5, 7, 2];
arr = arr.sort((a, b) => b - a);
// 9,7,5,3,2,1
```

## filter

### 配列から正の数のみ取得

```js
let arr = [1, -9, 3, -5, 7, -2];
arr = arr.filter(e => e >= 0);
// [1,3,7]
```

### 配列から奇数(偶数)のみ取得

```js
let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
arr = arr.filter(e => e % 2);
// [1,3,5,7,9]
```

```js
let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
arr = arr.filter(e => e % 2 === 0);
// [2,4,6,8]
```

## reduce

### 配列の数値の合計値を求める

```js
let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
let sum = arr.reduce((a, b) => a + b);
// 45
```

## 配列のコピー

### 浅いコピー

```js
let arr1 = [1, 2, 3];
let arr2 = arr1;
arr1[0] = 0;
// arr1:[0,2,3]
// arr2:[0,2,3]
```

### 深いコピー

```js
let arr1 = [1, 2, 3];
let arr2 = arr1.slice();
let arr3 = [].concat(arr1);
let arr4 = [...arr1];
let arr5 = Array.from(arr1);
```

## 配列の重複削除

### 連想配列を利用した抽出

```js
let arr = [1, 2, 2, 3, 3, 3, 4, 4, 4, 4];
let list = {};
arr.forEach(e => list[e] = 1);
arr = Object.keys(list).map(Number);
// [1,2,3,4]
```

### Setを使う

```js
let arr = [1, 2, 2, 3, 3, 3, 4, 4, 4, 4];
arr = Array.from(new Set(arr));
// [1,2,3,4]
```
