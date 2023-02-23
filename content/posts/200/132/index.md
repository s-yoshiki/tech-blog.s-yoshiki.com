---
title: "JavaScript で bit全探索"
path: "/entry/132"
date: "2019-06-10 01:36:53"
coverImage: "../../../images/thumbnail/javascript-logo.png"
author: "s-yoshiki"
tags: ["アルゴリズム","競技プログラミング","atcoder","動的計画法","dp","ビット演算", "javascript"]
---

## 概要

AtCoderとかをやっていると、
動的計画法(DP)、部分和といった問題とかに遭遇したりしますが、1から実装しようとすると面倒だったりします。
(というよりも、再帰処理で書くのが苦手だったりするからです...)
こんな時に、ビット演算を用いてパターンをひとまず網羅してから実装することがあります。
ここではJSを例に紹介します。

## サンプル1

シフト演算で実装する
**コード**

```js
function main(n) {
  for (let bit = 0; bit < (1 << n); bit++) {
    let row = [];
    for (let i = 0; i < n; i++) {
      if (bit & (1 << i)) {
        row.push(i);
      }
    }
    console.log(row);
  }
}
main(4);
```

このコードの結果は次のようになります。
**結果**

```js
0;
1;
0, 1;
2;
0, 2;
1, 2;
0, 1, 2;
3;
0, 3;
1, 3;
0, 1, 3;
2, 3;
0, 2, 3;
1, 2, 3;
0, 1, 2, 3;
```

部分和の問題を解いてみます。

```js
// [問題]
// 問: [3, 7, 8, 12, 13, 18] の部分和が 27 になる部分集合を求めよ。
// 答: 存在する。[7, 8, 12]

function fetchBitPattern(n, f) {
  for (let bit = 0; bit < (1 << n); bit++) {
    let row = [];
    for (let i = 0; i < n; i++) {
      if (bit & (1 << i)) {
        row.push(i);
      }
    }
    f(row);
  }
}

function main() {
  const Q = [3, 7, 8, 12, 13, 18];
  const A = 27;
  fetchBitPattern(Q.length, (bit) => {
    let s = 0;
    let tmp = [];
    for (let i = 0; i < bit.length; i++) {
      s += Q[bit[i]];
      tmp.push(Q[bit[i]]);
    }
    if (s === A) {
      console.log(tmp);
    }
  });
}

main();
```

```js
[7, 8, 12];
```

と表示されます。

## サンプル2

toStringメソッドで実装する。

```js
function main(n) {
  for (let i = 0; i < Math.pow(2, n); i++) {
    let row = [];
    let t = i.toString(2);
    for (let j = t.length; j < n; j++) {
      t = '0' + t;
    }
    t = t.split('').map(Number);
    for (let j = 0; j < t.length; j++) {
      if (t[j] === 1) {
        row.push(j);
      }
    }
    console.log(row);
  }
}
main(4);
```

このコードの結果は次のようになります。

```js
3;
2;
2, 3;
1;
1, 3;
1, 2;
1, 2, 3;
0;
0, 3;
0, 2;
0, 2, 3;
0, 1;
0, 1, 3;
0, 1, 2;
0, 1, 2, 3;
```

同じく部分和問題を解いてみます。

```js
// [問題]
// 問: [3, 7, 8, 12, 13, 18] の部分和が 27 になる部分集合を求めよ。
// 答: 存在する。[7, 8, 12]

function fetchBitPattern(n, f) {
  for (let i = 0; i < Math.pow(2, n); i++) {
    let row = [];
    let t = i.toString(2);
    for (let j = t.length; j < n; j++) {
      t = '0' + t;
    }
    t = t.split('').map(Number);
    for (let j = 0; j < t.length; j++) {
      if (t[j] === 1) {
        row.push(j);
      }
    }
    f(row);
  }
}

function main() {
  const Q = [3, 7, 8, 12, 13, 18];
  const A = 27;
  fetchBitPattern(Q.length, (bit) => {
    let s = 0;
    let tmp = [];
    for (let i = 0; i < bit.length; i++) {
      s += Q[bit[i]];
      tmp.push(Q[bit[i]]);
    }
    if (s === A) {
      console.log(tmp);
    }
  });
}

main();
```

```js
[7, 8, 12];
```

と表示されます。

見ての通り、どちらのサンプルもをゴリゴリとループで片付けているので必ずしも効率的ではないと思います。

## 参考

<a href="https://qiita.com/drken/items/7c6ff2aa4d8fce1c9361">https://qiita.com/drken/items/7c6ff2aa4d8fce1c9361</a>

<a href="https://ja.stackoverflow.com/questions/49702/%E3%83%93%E3%83%83%E3%83%88dp%E3%81%AE%E6%80%9D%E8%80%83%E5%9B%9E%E8%B7%AF%E3%81%AB%E3%81%A4%E3%81%84%E3%81%A6">https://ja.stackoverflow.com/questions/49702/%E3%83%93%E3%83%83%E3%83%88dp%E3%81%AE%E6%80%9D%E8%80%83%E5%9B%9E%E8%B7%AF%E3%81%AB%E3%81%A4%E3%81%84%E3%81%A6</a>
