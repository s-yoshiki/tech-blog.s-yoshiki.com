---
title: "JSで動的計画法を利用して部分和問題を解く"
path: "/entry/261"
date: "2022-02-20 23:01"
coverImage: "../../../images/thumbnail/javascript-logo.png"
author: "s-yoshiki"
tags: ["javascript","typescript","アルゴリズム"]
---

## 概要

動的計画法を利用して部分和問題を計算した際のメモです。(AtCoder用)

## 動的計画法

動的計画法について

↓

[動的計画法 - Wikipedia](https://ja.wikipedia.org/wiki/%E5%8B%95%E7%9A%84%E8%A8%88%E7%94%BB%E6%B3%95)

## 部分和

部分和問題について

↓

[部分和問題 - Wikipedia](https://ja.wikipedia.org/wiki/%E9%83%A8%E5%88%86%E5%92%8C%E5%95%8F%E9%A1%8C)


## ソース

**動的計画法を行う関数**

```js
function solve(data, num) {
    const dp = Array.from(new Array(data.length + 1), () => new Array(num + 1).fill(0))
    for (let col = 0; col < data.length; col++) {
        for (let row = 0; row < num + 1; row++) {
            if (row < data[col]) {
                dp[col + 1][row] = dp[col][row]
            } else {
                dp[col + 1][row] = Math.max(
                    dp[col][row],
                    dp[col][row - data[col]] + data[col]
                )
            }
        }
    }
    return dp[data.length][num] === num
}
```

利用方法は以下です。

```js
// [問題]
// 問: [3, 7, 8, 12, 13, 18] の部分和が 27 になる部分集合を求めよ。
// 答: 存在する。[7, 8, 12]

const arr = [3, 7, 8, 12, 13, 18];
console.log(solve(arr, 27) ? '存在する' : '存在しない')
```

## おまけ: TypeScript用

TypeScript用のソースです。

```ts
const solve = (data: Array<number>, num: number) => {
  const dp = Array.from(new Array(data.length + 1), () => new Array(num + 1).fill(0))
  for (let col = 0; col < data.length; col++) {
      for (let row = 0; row < num + 1; row++) {
          if (row < data[col]) {
              dp[col + 1][row] = dp[col][row]
          } else {
              dp[col + 1][row] = Math.max(
                  dp[col][row],
                  dp[col][row - data[col]] + data[col]
              )
          }
      }
  }
  return dp[data.length][num] === num
}
```

