---
title: "JavaScriptで画像のヒストグラムの正規化"
path: "/entry/134"
date: "2019-06-10 22:43:03"
coverImage: "../../../images/thumbnail/javascript-logo.png"
author: "s-yoshiki"
tags: ["html5","javascript","canvas","画像処理","画像処理100本ノック"]
---

## 概要

画像のヒストグラムを正規化するコードの紹介

## サンプルソース

```js
/**
 * メイン
 * @param {Object} canvas
 * @param {Object} image
 */
function main(canvas, image) {
  let ctx = canvas.getContext('2d');
  ctx.drawImage(image, 0, 0, image.width, image.height);
  let pixelValues = new Array(255).fill(0);
  let src = ctx.getImageData(0, 0, image.width, image.height);
  let dst = ctx.createImageData(image.width, image.height);

  let dMax = 255;
  let dMin = 0;
  let vMin = 255;
  let vMax = 0;

  const trans = (p) => (dMax - dMin) / (vMax - vMin) * (p - vMin) + dMin;

  for (let i = 0; i < src.data.length; i += 4) {
    for (let c = 0; c < 3; c++) {
      let p = src.data[i + c];
      if (p > vMax) {
        vMax = p;
      }
      if (p < vMin) {
        vMin = p;
      }
    }
  }

  for (let i = 0; i < src.data.length; i += 4) {
    for (let c = 0; c < 3; c++) {
      dst.data[i + c] = parseInt(trans(src.data[i + c]), 10);
      pixelValues[dst.data[i + c]]++; // ヒストグラムの計算
    }
    dst.data[i + 3] = 255;
  }
  ctx.putImageData(dst, 0, 0);
}
```

## 2026年版TypeScript実装

現在の実装とデモはこちらです。

- [Q.21 ヒストグラム正規化のデモ](https://s-yoshiki.github.io/Gasyori100knockJS/questions/21)
- [Ans021.ts](https://github.com/s-yoshiki/Gasyori100knockJS/blob/master/src/questions/answers/Ans021.ts)

入力の最小値を`vMin`、最大値を`vMax`として、各画素値`v`を次の式で出力範囲へ写します。

```text
output = (dMax - dMin) / (vMax - vMin) × (v - vMin) + dMin
```

入力の最大値と最小値が同じ場合は分母が0になるため、実装では変換を行わないなどの分岐が
必要です。また、正規化はRGBを個別に変換するため色合いが変化する場合があります。輝度だけを
伸張したい場合は、YCbCrやHSVなどの色空間へ変換して明るさ成分を処理します。

累積度数を使って分布を再配置するヒストグラム平坦化やガンマ補正との違いは、
[画像のヒストグラムと濃度変換をCanvasで実装する](/entry/320)でまとめています。
