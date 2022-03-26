---
title: "javascriptで累積和を解く"
path: "/entry/265"
date: "2022-02-27 00:10"
coverImage: "../../../images/thumbnail/javascript-logo.png"
author: "s-yoshiki"
tags: ["アルゴリズム","競技プログラムミング","atcoder","node.js","javascript","typescript"]
---

## 概要

javascriptで累積和を実装した際のメモです。

## 累積和について

あるデータ配列内の特定の区間の中での件数の合計値を算出する際、
愚直にカウントするのではなく、
あらかじめ初項から現在の項までの合計値を計算しておくという前処理を加える事で、より高速で計算を行うことができます。

特にデータに対してたくさんのクエリが発生する場合に効果を発揮します。

### 例

例えば

```js
A = [1,3,5,9,11,13,15,17,19,21]
```

と定義された配列の中で`i`が`3`〜`6`の区間の合計値を求めたい場合、通常のカウント方法であれば

```js
ans = A[3] + A[4] + A[5] + A[6]
// つまり
9 + 11 + 13 + 15 = 48
```

と求めると思います。

累積和の場合は、この配列について初項から現在の項までの合計値を計算するという前処理を行います。

```js
A = [1,3,5,9,11,13,15,17,19,21]
```

↓

```js
S = [A[0], A[0] + A[1], A[0] + A[1] + A[2] ... ]
// つまり
S = [1,4,9,18,29,42,57,74,93,114]
```

この前処理で生成したデータを利用することで、
`i`が`3`〜`6`の区間の合計値を求めたい場合、

```js
ans = A['区間終わり'] - A['区間始まり']
// つまり
ans = A[6] - A[2]
// つまり
57 - 9 = 48
```

とすることで、計算を単純にすることができます。

さらに、同じデータ配列に対して、

「`i`が`4`〜`7`」、「`i`が`1`〜`3`」、「`i`が`2`〜`10`」....

と問い合わせが増えるほど効果が増えていきます。

## 実装

コード

```js
let data = [1,3,5,9,11,13,15,17,19,21]
let sums = new Array(data.length).fill(0)
sums[0] = data[0]
for (let i = 1; i < data.length; i++) {
    sums[i] = data[i] + sums[i - 1]
}

// 課題
let query = [
    [3,6],
    [1,6],
    [2,6],
    [5,9],
    [2,4],
    [3,8],
].forEach(e => {
    let [l, r] = e
    console.log(sums[r] - sums[l - 1])
})
```

結果

```
48
56
53
85
25
84
```

## 参考にしたサイト


- [累積和を何も考えずに書けるようにする！](https://qiita.com/drken/items/56a6b68edef8fc605821)
- [累積和手法 - sataniC++](https://satanic0258.hatenablog.com/entry/2016/04/10/151315)