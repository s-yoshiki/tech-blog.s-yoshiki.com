---
title: "DCT・量子化・YCbCrでJPEG圧縮の仕組みを実装する【画像処理100本ノック】"
path: "/entry/323"
date: "2026-07-23 21:50"
coverImage: "../../../images/thumbnail/typescript-logo.png"
author: "s-yoshiki"
tags: ["typescript", "javascript", "canvas", "画像処理", "画像処理100本ノック", "jpeg"]
---

## 概要

Q.36〜40ではJPEG圧縮の中心処理を段階的に実装します。8×8ブロックのDCT、PSNRによる評価、
量子化、YCbCr変換をつなぎ、圧縮でどの情報が失われるかを確認します。

## 8×8ブロックのDCT（Q.36）

DCTは画像を余弦波の周波数成分へ変換します。JPEGでは画像を8×8画素のブロックに分け、
ブロックごとに64個のDCT係数を求めます。左上が直流成分で、右下へ進むほど高周波です。

逆DCTで元の画素へ戻せるため、Q.36では変換と逆変換を続けて実行して結果を確認します。

## 画質をPSNRで評価する（Q.37）

原画像と復元画像の差を平均二乗誤差`MSE`で表し、PSNRを計算します。

```text
PSNR = 10 log10(255² / MSE)
```

PSNRが大きいほど差が小さいことを表します。見た目だけでなく数値でも圧縮結果を比較できます。

## DCT係数を量子化する（Q.38）

DCT係数を量子化テーブルで割り、整数へ丸めます。高周波側ほど大きな値で割るため、人が
気づきにくい細かな成分の多くが0になります。

```ts
const quantized = dotDivide(block, quantizationTable)
  .map((row) => row.map((value) => Math.round(value)));
const restored = dotMultiply(quantized, quantizationTable);
```

丸めで失われた値は逆量子化しても戻りません。これが非可逆圧縮になる箇所です。

## RGBをYCbCrへ変換する（Q.39）

RGBを輝度`Y`と色差`Cb`、`Cr`へ分けます。人の視覚は色の細かな変化より明るさの変化に
敏感なので、輝度と色差で異なる量子化を適用できます。

## JPEG風の圧縮処理をつなぐ（Q.40）

Q.40では次の順に処理します。

1. RGBからYCbCrへ変換する
2. 各成分を8×8ブロックへ分けてDCTする
3. 輝度用・色差用のテーブルで量子化する
4. 逆量子化と逆DCTを行う
5. YCbCrからRGBへ戻し、0〜255へクランプする

色差成分を強く圧縮しても見た目への影響が比較的小さいという視覚特性を、コードと出力の両方で
確認できます。

- [Q.36〜40のデモ](https://s-yoshiki.github.io/Gasyori100knockJS/questions)
- [Ans036.ts](https://github.com/s-yoshiki/Gasyori100knockJS/blob/master/src/questions/answers/Ans036.ts)
- [Ans040.ts](https://github.com/s-yoshiki/Gasyori100knockJS/blob/master/src/questions/answers/Ans040.ts)
