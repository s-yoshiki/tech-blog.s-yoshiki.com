---
title: "JavaScriptによる2分探索(バイナリサーチ) のサンプルコード"
path: "/entry/195"
date: "2020-05-24"
coverImage: "../../../images/thumbnail/javascript-logo.png"
author: "s-yoshiki"
tags: ["javascript", "競技プログラミング", "アルゴリズム"]
---

## 概要

JavaScriptで2分探索(バイナリサーチ)を実装してみました。

## 2分探索について

探索する範囲を半分に絞る→次の探索でさらに半分に絞る...という具合に探索する方法です。

前提として探索する配列などのデータがソートされている必要があります。

また、wikipediaではこのように説明されています。

>ソート済みのリストや配列に入ったデータ（同一の値はないものとする）に対する検索を行うにあたって、 中央の値を見て、検索したい値との大小関係を用いて、検索したい値が中央の値の右にあるか、左にあるかを判断して、片側には存在しないことを確かめながら検索していく。
>
> 大小関係を用いるため、未ソートのリストや大小関係の定義されない要素を含むリストには二分探索を用いることはできない。
>
> n個のデータがある場合、時間計算量はO(log _{2}n)である（O記法）。
>
> n個のデータの中央の値を見ることで、1回の操作でn/2個程度（奇数の場合は(n-1)/2個、偶数の場合はn/2個または(n/2)-1個）の要素を無視することができる。

https://ja.wikipedia.org/wiki/%E4%BA%8C%E5%88%86%E6%8E%A2%E7%B4%A2

より

## ソース

2分探索ソースがこちらです。

関数 `binarySearch` は、探索する配列と探索対象を受け取り結果のインデックスを返します。見つからなかったら-1を返します。

このサンプルでは検索結果のインデックスとともに探索時の最後に絞った探索範囲の最小値と最大値を返しています。


```js
/**
 * 2分探索
 * @param Array arr ソート済みの探索対象配列
 * @param Int target 探索する値
 * @return Array 探索結果の添字 見つからなかった場合は-1を返す
 */
function binarySearch(arr, target) {
    let idx = -1;
    let iMin = 0;
    let iMax = arr.length - 1;
    while (iMin <= iMax) {
        let iMid = Math.floor((iMin + iMax) / 2);
        if (arr[iMid] === target) {
            idx = iMid;
            break;
        } else if (arr[iMid] < target) {
            iMin = iMid + 1;
        } else {
            iMax = iMid - 1;
        }
    }
    return [idx, iMin, iMax]
}

//
// sample
//
let data = [0,9,1,8,2,7,3,6,4,5,10].sort((a,b) => a-b)
console.log(data)
// 0,1,2,3,4,5,6,7,8,9,10
let [idx, iMin, iMax] = binarySearch(data, 4)
console.log([idx, iMin, iMax])
// 4,4,4
```

## 参考

[https://ja.wikipedia.org/wiki/2分探索](https://ja.wikipedia.org/wiki/%E4%BA%8C%E5%88%86%E6%8E%A2%E7%B4%A2)

[https://qiita.com/may88seiji/items/189002cb497e61578114](https://qiita.com/may88seiji/items/189002cb497e61578114)