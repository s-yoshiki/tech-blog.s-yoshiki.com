---
title: "2次元フーリエ変換と周波数フィルタをTypeScriptで実装する【画像処理100本ノック】"
path: "/entry/322"
date: "2026-07-23 21:40"
coverImage: "../../../images/thumbnail/typescript-logo.png"
author: "s-yoshiki"
tags: ["typescript", "javascript", "canvas", "画像処理", "画像処理100本ノック", "フーリエ変換"]
---

## 概要

Q.32〜35では、2次元離散フーリエ変換で画像を周波数成分へ分解し、周波数領域で
ローパス、ハイパス、バンドパスフィルタを適用します。

## 2次元DFTと逆DFT（Q.32）

各周波数`(u, v)`に対して全画素`(x, y)`を走査し、実部と虚部を求めます。

```ts
const angle = -2 * Math.PI * (x * u / width + y * v / height);
real += value * Math.cos(angle);
imag += value * Math.sin(angle);
```

逆変換では角度の符号を反転し、画素数で割って空間画像へ戻します。この実装は仕組みを
追いやすい一方で計算量が大きく、画像サイズによっては完了まで時間がかかります。

- [Q.32のデモ](https://s-yoshiki.github.io/Gasyori100knockJS/questions/32)
- [Ans032.ts](https://github.com/s-yoshiki/Gasyori100knockJS/blob/master/src/questions/answers/Ans032.ts)

## 周波数領域の読み方

低周波成分は画像全体の緩やかな明るさの変化、高周波成分は輪郭や細かな模様に対応します。
実装ではスペクトルをシフトし、低周波が画像中央へ来るようにしてから円形のマスクを作ります。

## 周波数フィルタ

| 問題 | 残す成分 | 出力の特徴 |
| --- | --- | --- |
| Q.33 ローパス | 中心付近の低周波 | 細部やノイズが減り、ぼける |
| Q.34 ハイパス | 中心から遠い高周波 | 輪郭や細かな模様が残る |
| Q.35 バンドパス | 指定した半径の帯域 | 特定スケールの模様を抽出する |

フィルタ処理そのものは、通過させない周波数の実部と虚部を0にする処理です。その後に逆DFTを
行うと、周波数マスクの効果を空間画像として確認できます。

- [Ans033.ts](https://github.com/s-yoshiki/Gasyori100knockJS/blob/master/src/questions/answers/Ans033.ts)
- [Ans034.ts](https://github.com/s-yoshiki/Gasyori100knockJS/blob/master/src/questions/answers/Ans034.ts)
- [Ans035.ts](https://github.com/s-yoshiki/Gasyori100knockJS/blob/master/src/questions/answers/Ans035.ts)

## 空間フィルタとの関係

ガウシアンフィルタによるぼかしは、周波数領域では高周波を弱める処理と考えられます。
Sobelなどのエッジ検出は高周波を強調します。空間領域と周波数領域の結果を比較すると、
別々に見えるフィルタが同じ性質を扱っていることが分かります。
