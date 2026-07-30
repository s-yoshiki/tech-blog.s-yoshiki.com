---
title: "Cannyエッジ検出とHough直線検出をTypeScriptで実装する【画像処理100本ノック】"
path: "/entry/324"
date: "2026-07-23 22:00"
coverImage: "../../../images/thumbnail/opencv-logo.png"
author: "s-yoshiki"
tags: ["typescript", "javascript", "canvas", "画像処理", "画像処理100本ノック"]
---

## 概要

Q.41〜46では、Canny法で輪郭を抽出し、そのエッジ画像からHough変換で直線を検出します。
「画素の濃度変化」から「画像中の直線」へ処理を段階的に積み上げるアルゴリズムです。

## Cannyエッジ検出

### 勾配強度と方向（Q.41）

ガウシアンフィルタでノイズを抑え、Sobelフィルタでx方向とy方向の勾配`fx`、`fy`を求めます。

```ts
const magnitude = Math.sqrt(fx * fx + fy * fy);
const angle = Math.atan2(fy, fx);
```

角度は0、45、90、135度の4方向へ量子化します。

### 非極大値抑制（Q.42）

勾配方向の前後にある画素と強度を比較し、局所最大でない値を0にします。これにより太い
エッジ応答を1画素程度へ細くします。

### ヒステリシス閾処理（Q.43）

強いエッジはそのまま残し、弱いエッジは強いエッジへ接続している場合だけ残します。
単一の閾値より、輪郭の途切れとノイズを両方抑えやすくなります。

- [Q.41〜43のデモ](https://s-yoshiki.github.io/Gasyori100knockJS/questions)
- [Ans041.ts〜Ans043.ts](https://github.com/s-yoshiki/Gasyori100knockJS/tree/master/src/questions/answers)

## Hough直線検出

### Hough空間への投票（Q.44）

直線を`ρ = x cosθ + y sinθ`で表します。エッジ画素ごとに複数の`θ`を試し、対応する
`(ρ, θ)`へ投票します。同じ直線上の画素はHough空間の同じ場所へ票を集めます。

### Hough空間のNMS（Q.45）

投票数が多い場所の周囲を比較し、近傍より大きい極大値だけを残します。似たパラメータの
直線候補が大量に残ることを防ぎます。

### 画像上の直線へ戻す（Q.46）

上位の`(ρ, θ)`を直線の式へ戻し、画像の端点を計算してCanvasへ重ねて描画します。

- [Q.44の実装](https://github.com/s-yoshiki/Gasyori100knockJS/blob/master/src/questions/answers/Ans044.ts)
- [Q.45の実装](https://github.com/s-yoshiki/Gasyori100knockJS/blob/master/src/questions/answers/Ans045.ts)
- [Q.46の実装](https://github.com/s-yoshiki/Gasyori100knockJS/blob/master/src/questions/answers/Ans046.ts)

## 処理のつながり

Hough変換へ元画像を直接渡すのではなく、Cannyで得た細いエッジ画像を入力にします。
平滑化、勾配、細線化、閾処理、投票、NMSという流れを追うと、各処理が次段の入力を
整える役割を持っていることが分かります。

## Cannyで結果が変わる箇所

勾配方向は連続値ですが、非極大値抑制では周囲のどの2画素と比較するかを決めます。方向を
0・45・90・135度へ丸める簡易実装と、隣接画素を補間して比較する実装では細線化の精度が
変わります。

ヒステリシス閾値処理では、強いエッジから8近傍をたどり、弱いエッジのうち接続しているものだけを
残します。単純に2値化する処理ではありません。高い閾値と低い閾値の比率、ガウシアンの大きさを
固定して複数画像で比較すると調整しやすくなります。

## Hough投票の実装

エッジ画素ごとに`θ`を走査し、`ρ = x cos θ + y sin θ`へ投票します。`ρ`は負になるため、
画像対角長を加えて配列添字へ変換します。計算量はおおよそ
`O(エッジ画素数 × θの分割数)`です。

投票配列を画像として可視化すると、直線候補が交点として現れます。検出本数だけを見るよりも、
角度刻みが粗すぎないか、似た候補をNMSでまとめられているかをデバッグしやすくなります。
