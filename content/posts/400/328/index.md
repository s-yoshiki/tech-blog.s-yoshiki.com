---
title: "HOG特徴量をTypeScriptで実装して可視化する【画像処理100本ノック】"
path: "/entry/328"
date: "2026-07-23 22:40"
coverImage: "../../../images/thumbnail/typescript-logo.png"
author: "s-yoshiki"
tags: ["typescript", "javascript", "canvas", "画像処理", "画像処理100本ノック", "機械学習"]
---

## 概要

Q.66〜69では、物体の輪郭や形状を表すHOG（Histogram of Oriented Gradients）特徴量を
4段階で実装します。後半の画像認識と物体検出でも再利用する重要な特徴量です。

## 勾配強度と角度（Q.66）

x方向とy方向の輝度差から勾配を求めます。

```ts
const magnitude = Math.sqrt(gx * gx + gy * gy);
const angle = (Math.atan2(gy, gx) * 180) / Math.PI;
```

向きの反転を同じ輪郭として扱うため角度を0〜180度へ収め、20度刻みの9方向へ量子化します。

## セルごとの方向ヒストグラム（Q.67）

画像を8×8画素のセルに分けます。各画素の勾配強度を、その角度に対応するビンへ加算します。
これにより64画素の情報を「どの向きの輪郭がどれだけ強いか」という9次元の値へ要約します。

## ブロック正規化（Q.68）

周囲3×3セルのヒストグラムを使ってL2正規化します。

```text
normalized = value / sqrt(sum(value²) + ε)
```

局所的な明るさやコントラストが変わっても、輪郭方向の比率を比較しやすくなります。

## 特徴量を描画する（Q.69）

各セルの中心から、9方向のヒストグラム値に比例した長さの線を描きます。数値配列だけでは
分かりにくいHOGが、物体の輪郭に沿った線の集合として見えるようになります。

- [Q.66〜69のデモ](https://s-yoshiki.github.io/Gasyori100knockJS/questions)
- [Ans066.ts〜Ans069.ts](https://github.com/s-yoshiki/Gasyori100knockJS/tree/master/src/questions/answers)
- [HOG共通処理](https://github.com/s-yoshiki/Gasyori100knockJS/blob/master/src/lib/vision.ts)

## HOGが後続処理で果たす役割

RGB画素をそのまま学習器へ入れる代わりに、HOGで形状を表す特徴ベクトルへ変換します。
Q.96のニューラルネットワーク学習とQ.97以降のスライディングウィンドウでは、同じHOG実装を
使って顔らしさを判定します。
