---
title: "next_permutationをJSで実装する"
path: "/entry/245"
date: "2021-07-22 23:00"
coverImage: "../../../images/thumbnail/javascript-logo.png"
author: "s-yoshiki"
tags: ["javascript","typescript","競技プログラミング","アルゴリズム"]
---

## 概要

C++で提供されている順列を生成する next_permutation のJS実装です。

## ソース

順列が存在する場合はtrueを返し、そうでなければfalseを返します。

```js
function next_permutation(arr) {
    for (let i = arr.length - 2; i >= 0; i--) {
        if (arr[i] < arr[i + 1]) {
            for (let j = arr.length - 1; j > i; j--) {
                if (arr[j] > arr[i]) {
                    [arr[i], arr[j]] = [arr[j], arr[i]]
                    const len = (arr.length - (i + 1)) >> 1
                    for (let k = 0; k < len; k++) {
                        [arr[i + 1 + k], arr[arr.length - 1 - k]] = [arr[arr.length - 1 - k], arr[i + 1 + k]]
                    }
                    return true
                }
            }
        }
    }
    return false
}
```

## 使い方

```js
let row = Array.from(Array(3).keys())
do {
  console.log(row)
} while (next_permutation(row))
// 0,1,2
// 0,2,1
// 1,0,2
// 1,2,0
// 2,0,1
// 2,1,0
```

## 参考

[順列の全探索をするプログラム（競技プログラミング向け）](https://qiita.com/suzuki-navi/items/a80677a0747232843957)

[HunterLarco/next_permutation.js - Gist](https://gist.github.com/HunterLarco/bf270d6809f8de95a711660cbfdf7685)

[【C++】next_permutation（順列列挙）](https://note.com/memenekokaburi/n/nf0201d6002cd)

[提出 #23921358 - 競プロ典型 90 問](https://atcoder.jp/contests/typical90/submissions/23921358)

[順列・組み合わせ のサンプルコード JS [permutation] [combination]](https://tech-blog.s-yoshiki.com/entry/144)