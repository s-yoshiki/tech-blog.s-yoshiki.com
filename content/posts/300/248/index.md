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
class PriorityQueue {
  /**
   * コンストラクタ
   */
  constructor() {
    this.heap = []
  }
  /**
   * キューに値を追加する
   * 
   * @param x 
   */
  push(x) {
    const a = this.heap;
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
    const a = this.heap
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
    return this.heap.length
  }
  /**
   * 最も高い優先度を持つ要素を取り除くことなく参照する
   * 
   * @returns 
   */
  top() {
    return this.heap[0]
  }
}
```

## 利用してみる

実際にキューにデータを格納し値の取り出しを実施します。

### 昇順で取り出し

```js
const pq = new PriorityQueue()
const data = [7,2,1,4,8,9,6,5,3]
data.map(e => pq.push(e))

console.log(pq.heap)
// 1,3,2,4,8,9,6,7,5


while (pq.size() !== 0) {
    console.log(pq.pop())
}
// 1
// 2
// 3
// 4
// 5
// 6
// 7
// 8
// 9
```

### 降順で取り出し

負の数にすることで高順で値を取得できます。

※ただし、対象のデータが全て正の数である時

```js
const pq = new PriorityQueue()

const data = [7,2,1,4,8,9,6,5,3]
data.map(e => pq.push(e * -1))

console.log(pq.heap)
// -9,-7,-8,-5,-4,-1,-6,-2,-3


while (pq.size() !== 0) {
    console.log(pq.pop() * -1)
}
// 9
// 8
// 7
// 6
// 5
// 4
// 3
// 2
// 1
```

## おまけ

typescriptバージョン

```js
/**
 * 優先度付きキュー
 */
class PriorityQueue {
  private heap :number[] = [];
  /**
   * キューに値を追加する
   *
   * @param x
   */
  push(x) {
    const a = this.heap;
    let i = a.length
    for (let j; i; i = j) {
      j = (i - 1) >> 1;
      if (a[j] <= x) {
        break;
      }
      a[i] = a[j];
    }
    a[i] = x;
  }
  /**
   * キューから値を取り出す
   *
   * @returns
   */
  pop(): number {
    const a = this.heap;
    const r = a[0];
    const x = a.pop();
    const k = a.length >> 1;
    let i = 0
    for (let j; i < k; i = j) {
      j = (i << 1) + 1;
      if (a[j + 1] < a[j]) {
        j++;
      }
      if (x <= a[j]) {
        break;
      }
      a[i] = a[j];
    }
    if (a.length) {
      a[i] = x;
    }
    return r;
  }
  /**
   * サイズを取得
   *
   * @returns 長さ
   */
  size(): number {
    return this.heap.length;
  }
  /**
   * 最も高い優先度を持つ要素を取り除くことなく参照する
   *
   * @returns
   */
  top(): number {
    return this.heap[0];
  }
}
```



## 参考

[優先度付きキュー（PriorityQueue）っぽいものをJSで実装する](https://qiita.com/oimo23/items/28f743021592afa12d0b)

[FastPriorityQueue.js : a fast, heap-based priority queue in JavaScript](https://www.npmjs.com/package/fastpriorityqueue)