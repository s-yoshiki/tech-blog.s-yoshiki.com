---
title: "DCT・量子化・YCbCrでJPEG圧縮の仕組みを実装する【画像処理100本ノック】"
path: "/entry/323"
date: "2026-07-23 21:50"
coverImage: "../../../images/thumbnail/typescript-logo.png"
author: "s-yoshiki"
aiGenerated: true
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

## 実装をブロック単位に分ける

JPEG風処理では8×8ブロックごとに、画素値から128を引いて中心を0へ移し、DCT係数を計算します。
左上のDC係数はブロックの平均的な明るさ、それ以外のAC係数は横・縦方向の細かい変化を表します。
右下へ行くほど高周波になるため、量子化テーブルも高周波を粗く丸める値になっています。

画像サイズが8の倍数でない場合は、端を複製してパディングするなどの方針が必要です。復元後は
元サイズへ切り詰めます。ブロック境界だけを特別扱いすると、圧縮とは別の継ぎ目が生じます。

## 圧縮率と画質を観察する

量子化後に0になった係数の割合を数えると、情報がどれだけ削減されたかを確認できます。
量子化テーブルへ倍率を掛け、PSNRや平均二乗誤差と見た目を並べると、数値指標と知覚品質が
必ずしも一致しないことも分かります。

実際のJPEGでは、量子化後の係数をジグザグ順に並べ、連続する0を効率よく符号化します。
このシリーズの実装は主に変換と量子化を学ぶ段階であり、ファイル形式全体のエンコーダーでは
ない点も区別しておきます。
