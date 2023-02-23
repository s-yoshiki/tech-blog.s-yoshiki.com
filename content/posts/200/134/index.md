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
