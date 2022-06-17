---
title: "[JS]乱数でランダムな整数を生成する"
path: "/entry/279"
date: "2022-06-18 01:00"
coverImage: "../../../images/thumbnail/javascript-logo.png"
author: "s-yoshiki"
tags: ["javascript", "node.js"]
---

## 概要

JavaScriptで乱数を用いてランダムな整数を生成を行う実装のメモです。

ワンライナーで利用できます。

## サンプルコード

実装は以下の通りです。

```js
const randInt = (min, max) => Math.floor(Math.random() * (max + 1 - min)) + min;
```

引数`min`に最小値、引数`max`最大値を与えることで、ランダムな整数を生成します。

例えば `min=1`、`max=10`であれば1~10の間で生成します。


## 利用例

次のコードは10万回1~10の間の整数を生成するコードです。

```js
const randInt = (min, max) => Math.floor(Math.random() * (max + 1 - min)) + min;
let list = {}
for (let i = 0; i < 10000; i++) {
    const num = randInt(1,10)
    if (!(list[num] >= 0)) {
        list[num] = 0
    }
    list[num]++
}
console.log(JSON.stringify(list, null , '  '))
```

結果は次のとおりとなりました。

```json
{
  "1": 1002,
  "2": 985,
  "3": 947,
  "4": 1005,
  "5": 1040,
  "6": 1020,
  "7": 1003,
  "8": 977,
  "9": 1004,
  "10": 1017
}
```