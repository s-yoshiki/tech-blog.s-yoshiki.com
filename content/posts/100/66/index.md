---
title: "複数キーでソートするサンプルコード JavaScript"
path: "/entry/66"
date: "2018-11-05 01:03:08"
coverImage: "../../../images/thumbnail/javascript-logo.png"
author: "s-yoshiki"
tags: ["javascript","アルゴリズム","競技プログラミング","node.js"]
---

## 概要

JavaScriptでの複数キーでソートするサンプルソースの例。

## サンプルソースとソートのパターン

以下のような配列があるとする。

```js
[
 [0,2,3],
 [1,1,32],
 [2,2,63],
 [3,1,12],
 [4,1,13],
 [5,2,24]
]

```

### 2列目と3列目で昇順ソートする

ソース

```js
arr.sort((a, b) => {
    if (a[1] < b[1]) return -1;
    if (a[1] > b[1]) return 1;
    if (a[2] < b[2]) return -1;
    if (a[2] > b[2]) return 1;
    return 0;
});

```

結果

```js
[
 [3,1,12],
 [4,1,13],
 [1,1,32],
 [0,2,3],
 [5,2,24],
 [2,2,63]
]

```
