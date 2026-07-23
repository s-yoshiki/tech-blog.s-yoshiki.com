---
title: "テンプレートマッチングと連結成分ラベリングをCanvasで実装する【画像処理100本ノック】"
path: "/entry/326"
date: "2026-07-23 22:20"
coverImage: "../../../images/thumbnail/opencv-logo.png"
author: "s-yoshiki"
tags: ["typescript", "javascript", "canvas", "画像処理", "画像処理100本ノック"]
---

## 概要

画像中から既知の小画像を探すテンプレートマッチング（Q.56〜59）と、二値画像を領域ごとに
分ける連結成分ラベリング（Q.60）を解説します。どちらも画像中を走査して対応関係を探しますが、
前者は画素値の類似度、後者は前景画素の接続を扱います。

## テンプレートマッチング

入力画像上でテンプレートと同じ大きさの窓を移動し、各位置で評価値を計算します。

| 問題 | 評価値 | 選ぶ位置 | 性質 |
| --- | --- | --- | --- |
| Q.56 SSD | 差の二乗和 | 最小 | 大きな差へ強いペナルティを与える |
| Q.57 SAD | 差の絶対値和 | 最小 | 計算が単純 |
| Q.58 NCC | 正規化相互相関 | 最大 | 明るさの倍率変化に比較的強い |
| Q.59 ZNCC | 平均を引いた正規化相互相関 | 最大 | 明るさの加算変化にも強い |

```ts
for (let y = 0; y <= imageHeight - templateHeight; y++) {
  for (let x = 0; x <= imageWidth - templateWidth; x++) {
    const score = compareAt(x, y);
    // 最良の位置と評価値を更新する
  }
}
```

SSDとSADは元画像とテンプレートの明るさが変わると評価が悪化します。NCCはベクトルの長さで
正規化し、ZNCCはさらに平均値を引くことで、模様の対応へ注目します。

- [Ans056.ts〜Ans059.ts](https://github.com/s-yoshiki/Gasyori100knockJS/tree/master/src/questions/answers)

## 連結成分ラベリング（Q.60）

二値画像の前景画素を走査し、上下左右でつながる画素へ同じラベルを付けます。異なる仮ラベルが
同じ領域だと判明した場合は、同値関係を記録して後から統合します。

最終的なラベルを色へ変換すると、独立した領域を視覚的に確認できます。斜め方向も同じ領域として
扱う8近傍版は、後続の実装で扱います。

- [Q.60のデモ](https://s-yoshiki.github.io/Gasyori100knockJS/questions/60)
- [Ans060.ts](https://github.com/s-yoshiki/Gasyori100knockJS/blob/master/src/questions/answers/Ans060.ts)

## 使い分け

テンプレートマッチングは「この見た目がどこにあるか」、ラベリングは「前景がいくつの領域に
分かれているか」を求めます。前者は対象の見本がある場合、後者は二値化後の物体数や面積を
調べる前処理として利用できます。
