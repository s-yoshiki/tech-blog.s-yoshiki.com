---
title: "JavaScriptで優先度付きキューを実装する"
path: "/entry/248"
date: "2021-08-01 01:00"
coverImage: "../../../images/thumbnail/javascript-logo.png"
author: "s-yoshiki"
tags: ["javascript","typescript","競技プログラミング","アルゴリズム"]
---

## 概要

JavaScriptで優先度付きキュー (プライオリティキュー) を実装する

## 優先度付きキューについて

具体的には次のような機能があります。

 - キューに対して要素を優先度付きで追加 (push)
 - 最も高い優先度を持つ要素をキューから取り除きそれを返す (pop)

## ソース

```js
/**
 * 優先度付きキュー
 */
class priorityQueue {
  /**
   * コンストラクタ
   */
  constructor() {
    this.a = []
  }
  /**
   * キューに値を追加する
   * 
   * @param x 
   */
  push(x) {
    const a = this.a;
    for (var i = a.length, j; i; i = j) {
      j = i - 1 >> 1
      if (a[j] <= x) {
        break
      }
      a[i] = a[j]
    }
    a[i] = x
  }
  /**
   * キューから値を取り出す
   * 
   * @returns 
   */
  pop() {
    const a = this.a
    const r = a[0]
    const x = a.pop()
    const k = a.length >> 1;
    for (var i = 0, j; i < k; i = j) {
      j = (i << 1) + 1
      if (a[j + 1] < a[j]) {
        j++
      }
      if (x <= a[j]) {
        break
      }
      a[i] = a[j]
    }
    if (a.length) {
      a[i] = x
    }
    return r
  }
  /**
   * サイズを取得
   * 
   * @returns 長さ
   */
  size() {
    return this.a.length
  }
  /**
   * 最も高い優先度を持つ要素を取り除くことなく参照する
   * 
   * @returns 
   */
  top() {
    return this.a[0]
  }
}
```

## 参考

[優先度付きキュー（PriorityQueue）っぽいものをJSで実装する](https://qiita.com/oimo23/items/28f743021592afa12d0b)

[FastPriorityQueue.js : a fast, heap-based priority queue in JavaScript](https://www.npmjs.com/package/fastpriorityqueue)