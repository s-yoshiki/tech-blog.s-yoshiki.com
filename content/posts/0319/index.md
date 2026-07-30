---
title: "Canvasで空間フィルタを実装する―平滑化とエッジ検出【画像処理100本ノック】"
path: "/entry/319"
date: "2026-07-23 21:10"
coverImage: "../../../images/thumbnail/javascript-logo.png"
author: "s-yoshiki"
tags: ["typescript", "javascript", "canvas", "画像処理", "画像処理100本ノック"]
---

## 概要

[Gasyori100knockJS](https://github.com/s-yoshiki/Gasyori100knockJS)のQ.9〜19では、
近傍画素を使った平滑化とエッジ検出を実装しています。

- [Q.9 ガウシアンフィルタ](https://s-yoshiki.github.io/Gasyori100knockJS/questions/9)
- [Q.10 メディアンフィルタ](https://s-yoshiki.github.io/Gasyori100knockJS/questions/10)
- [Q.11〜19の問題一覧](https://s-yoshiki.github.io/Gasyori100knockJS/questions)

## 畳み込みの基本

空間フィルタは、注目画素の周囲にカーネルを重ね、画素値と係数の積和を出力します。
3×3カーネルなら、画像の各座標で9画素を参照します。

```ts
for (let y = 0; y < height; y++) {
  for (let x = 0; x < width; x++) {
    for (let ky = -1; ky <= 1; ky++) {
      for (let kx = -1; kx <= 1; kx++) {
        const sx = Math.min(width - 1, Math.max(0, x + kx));
        const sy = Math.min(height - 1, Math.max(0, y + ky));
        value += src.data[(sy * width + sx) * 4 + channel] *
          kernel[ky + 1][kx + 1];
      }
    }
  }
}
```

端の画素では画像外を参照しないように座標をクランプします。RGBを個別に計算し、アルファ値は
255のままにするのが各実装に共通する流れです。

## 平滑化フィルタ（Q.9〜12）

| 問題 | 実装の要点 |
| --- | --- |
| Q.9 ガウシアン | 距離に応じたガウス分布の重みを3×3へ配置し、カーネルの合計が1になるよう正規化する |
| Q.10 メディアン | 3×3近傍の9個の値を並べ替え、中央の値を選ぶ |
| Q.11 平滑化 | 3×3の全係数を`1 / 9`にした平均フィルタを畳み込む |
| Q.12 モーション | 左上から右下の対角成分だけに`1 / 3`を置き、一定方向のぶれを作る |

ガウシアンフィルタと平均フィルタはいずれもローパスフィルタですが、ガウシアンは中心に近い
画素ほど重くするため、単純平均より自然にぼかせます。メディアンフィルタは積和を使わず、
外れ値の影響を受けにくいのでごま塩ノイズに向いています。

- [Ans009.ts](https://github.com/s-yoshiki/Gasyori100knockJS/blob/master/src/questions/answers/Ans009.ts)
- [Ans010.ts](https://github.com/s-yoshiki/Gasyori100knockJS/blob/master/src/questions/answers/Ans010.ts)
- [Ans011.ts](https://github.com/s-yoshiki/Gasyori100knockJS/blob/master/src/questions/answers/Ans011.ts)
- [Ans012.ts](https://github.com/s-yoshiki/Gasyori100knockJS/blob/master/src/questions/answers/Ans012.ts)

## エッジ検出フィルタ（Q.13〜19）

| 問題 | カーネルまたは処理 | 特徴 |
| --- | --- | --- |
| Q.13 MAX-MIN | 近傍の最大値−最小値 | 局所的な濃度差を直接取り出す |
| Q.14 微分 | 隣接画素の差 | 水平・垂直方向の輪郭を分けて確認できる |
| Q.15 Sobel | 中央の行・列を強くした一次微分 | 微分と平滑化を同時に行う |
| Q.16 Prewitt | 行・列を均等に重み付けした一次微分 | Sobelより単純な係数で勾配を求める |
| Q.17 Laplacian | 二次微分 | 方向に依存しないエッジを得る |
| Q.18 Emboss | 対角方向の差＋128 | 明暗差を浮き彫りとして見せる |
| Q.19 LoG | ガウシアン＋Laplacian | ノイズを抑えてから二次微分する |

一次微分フィルタはx方向とy方向を別々に適用します。横方向の輝度変化を計算すると縦線が、
縦方向の変化を計算すると横線が強く出ます。

Laplacianは二次微分なので方向を分けませんが、ノイズも強調します。LoGでは先にガウシアンで
平滑化することで、この弱点を補っています。

- [Ans013.ts〜Ans019.ts](https://github.com/s-yoshiki/Gasyori100knockJS/tree/master/src/questions/answers)

## 実装を読むときのポイント

同じ「輪郭を抽出する」処理でも、カーネルによって方向性、ノイズへの強さ、線の太さが変わります。
デモでは同じ入力画像に各フィルタを適用し、出力の違いを比較できます。

畳み込みの実装を追うときは、次の順で確認すると理解しやすくなります。

1. カーネルの係数と合計
2. 画像端で使う座標
3. RGBをそのまま処理するか、グレースケールへ変換するか
4. 負の計算結果をどのように0〜255へ収めるか

## 関連記事

- [画像のプーリング処理 canvas + JavaScript](/entry/123)
- [画像をグレースケールに変換する JavaScript + canvas](/entry/113)
