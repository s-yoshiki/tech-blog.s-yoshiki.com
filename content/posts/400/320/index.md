---
title: "画像のヒストグラムと濃度変換をCanvasで実装する【画像処理100本ノック】"
path: "/entry/320"
date: "2026-07-23 21:20"
coverImage: "../../../images/thumbnail/javascript-logo.png"
author: "s-yoshiki"
tags: ["typescript", "javascript", "canvas", "画像処理", "画像処理100本ノック"]
---

## 概要

画像処理100本ノックのうち、画素値の分布を扱うQ.20〜24を解説します。ヒストグラムを
可視化し、線形変換、統計量、累積度数、ガンマ特性を使って画像の明るさとコントラストを
変える一連の処理です。

## ヒストグラムを作る（Q.20）

0〜255に対応する256要素の配列を用意し、画素値を添字として出現回数を加算します。

```ts
const histogram = new Array<number>(256).fill(0);
for (let i = 0; i < src.data.length; i += 4) {
  histogram[src.data[i]]++;
  histogram[src.data[i + 1]]++;
  histogram[src.data[i + 2]]++;
}
```

現在の実装ではChart.jsを使わず、Canvas 2D APIで棒グラフを直接描画しています。

- [Q.20のデモ](https://s-yoshiki.github.io/Gasyori100knockJS/questions/20)
- [Ans020.ts](https://github.com/s-yoshiki/Gasyori100knockJS/blob/master/src/questions/answers/Ans020.ts)
- [画像のヒストグラムを表示する](/entry/127)

## 線形な濃度変換（Q.21、Q.22）

Q.21の正規化では、入力画像の最小値`vMin`と最大値`vMax`を、出力範囲`dMin`〜`dMax`へ
線形に写します。

```ts
const normalize = (value: number) =>
  ((dMax - dMin) / (vMax - vMin)) * (value - vMin) + dMin;
```

Q.22では平均と標準偏差を求め、分布の中心を指定平均へ移し、分布の幅を指定標準偏差へ
拡大・縮小します。どちらも画素の大小関係を保ったままコントラストを調整する処理です。

- [Q.21の実装](https://github.com/s-yoshiki/Gasyori100knockJS/blob/master/src/questions/answers/Ans021.ts)
- [Q.22の実装](https://github.com/s-yoshiki/Gasyori100knockJS/blob/master/src/questions/answers/Ans022.ts)
- [JavaScriptで画像のヒストグラムを正規化](/entry/134)

## 累積ヒストグラムによる平坦化（Q.23）

ヒストグラム平坦化では、値`v`以下の画素数を累積し、全画素数に対する割合を0〜255へ
割り当てます。頻度が集中した濃度域を広く使うため、暗部や明部へ偏った画像の細部が
見えやすくなります。

単純な正規化は最小値と最大値だけを見ます。一方、平坦化は分布全体を使う点が違います。

## 非線形なガンマ補正（Q.24）

ガンマ補正は、正規化した画素値へべき乗を適用します。

```ts
const corrected = 255 * (value / 255) ** (1 / gamma);
```

線形変換と異なり、中間調の明るさを選択的に変えられます。`gamma`の値によって暗部を
持ち上げたり、明部を抑えたりできます。

- [Q.23のデモ](https://s-yoshiki.github.io/Gasyori100knockJS/questions/23)
- [Q.24のデモ](https://s-yoshiki.github.io/Gasyori100knockJS/questions/24)

## まとめ

ヒストグラム処理は「画像をどう変えるか」より先に「画素値がどう分布しているか」を調べます。
同じ画像に正規化、平坦化、ガンマ補正を適用し、ヒストグラムと見た目の両方を比較すると、
各手法の違いを理解しやすくなります。
