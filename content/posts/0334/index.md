---
title: "k-meansクラスタリングと画像の代表色抽出をTypeScriptで実装する【画像処理100本ノック】"
path: "/entry/334"
date: "2026-07-23 23:40"
coverImage: "../../../images/thumbnail/typescript-logo.png"
author: "s-yoshiki"
tags: ["typescript", "javascript", "画像処理", "画像処理100本ノック", "機械学習", "k-means"]
---

## 概要

Q.88〜92ではk-means法を実装します。前半は画像ごとの特徴ベクトルをクラスタリングし、
後半は画像内の全画素をRGB空間でクラスタリングして代表色へ減色します。

## k-meansの反復処理

k-meansは次の2処理を、割り当てが変わらなくなるまで繰り返します。

1. 各データを最も近い重心へ割り当てる
2. クラスタ内のデータの平均から重心を更新する

```ts
while (changed) {
  changed = assignNearestCentroid(features, centroids, labels);
  centroids = updateCentroids(features, labels, k);
}
```

## 画像特徴のクラスタリング（Q.88〜90）

| 問題 | 内容 |
| --- | --- |
| Q.88 | ランダムな初期ラベルからクラスタごとの重心を作る |
| Q.89 | 再割り当てと重心更新を収束まで繰り返す |
| Q.90 | 初期ラベルを変え、結果の変化を確認する |

入力にはQ.84と同じ色ヒストグラム特徴を使います。正解ラベルを使わず、色分布の近い画像が
同じグループへ集まるかを確認します。

## 画像のk-means減色（Q.91、Q.92）

画像1枚の各画素をRGBの3次元データとして扱います。Q.91では5個の初期代表色を選び、各画素を
最も近い色へ分類します。Q.92では代表色をクラスタ内画素の平均へ更新し、収束まで繰り返します。

最後に各画素を所属クラスタの代表色で置き換えると、画像全体を5色で表現できます。Q.6の
固定した4階調への減色と違い、入力画像の色分布に応じた代表色が得られます。

- [Q.88〜92のデモ](https://s-yoshiki.github.io/Gasyori100knockJS/questions)
- [Ans088.ts〜Ans092.ts](https://github.com/s-yoshiki/Gasyori100knockJS/tree/master/src/questions/answers)
- [画像の減色処理](/entry/117)

## 初期値と空クラスタ

k-meansは初期重心によって局所解が変わります。クラスタへ画素が1つも割り当てられない場合の
処理も必要です。実装を読むときは、収束条件、初期化、空クラスタの扱いを確認します。
