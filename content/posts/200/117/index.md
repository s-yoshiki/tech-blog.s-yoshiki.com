---
title: "画像の減色処理 サンプルコードとデモ JavaScript + canvas"
path: "/entry/117"
date: "2019-04-10 00:36:28"
coverImage: "../../../images/thumbnail/javascript-logo.png"
author: "s-yoshiki"
tags: ["javascript","canvas","画像処理","画像処理100本ノック"]
---

## 概要

画像の減色処理を行ってみた。

サンプルコードとデモの紹介。

環境は JavaScript + Canvas。

## 減色処理について

通常、Canvas上での画像のRGBそれぞれの値は0〜255までの256^3で表現していますが、
このデモでは、4^3(32, 96, 160, 224)まで減色しています。

この場合、画像は以下のように処理されます。

<a href="https://images-tech-blog.s-yoshiki.com/img/2019/04/201904090025_loi44s.png"><img src="https://images-tech-blog.s-yoshiki.com/img/2019/04/201904090025_loi44s.png"></a>

## デモ

<iframe src="https://s-yoshiki.github.io/Gasyori100knockJS/#/questions/ans6/iframe"></iframe>

以下のURLからでも試すことができます。

<a href="https://s-yoshiki.github.io/Gasyori100knockJS/#/questions/ans6">https://s-yoshiki.github.io/Gasyori100knockJS/#/questions/ans6</a>

## ソース

**cv.js**

```js
/**
 * 減色処理
 */
export default class {
  /**
   * @param {Object} canvas
   * @param {Object} image
   */
  main(canvas, image) {
    let ctx = canvas.getContext('2d');
    ctx.drawImage(image, 0, 0, image.width, image.height);
    let src = ctx.getImageData(0, 0, image.width, image.height);
    let dst = ctx.createImageData(image.width, image.height);

    let thresholds = [32, 96, 160, 224];

    for (let i = 0; i < src.data.length; i++) {
      if (i % 4 === 3) {
        dst.data[i] = src.data[i];
        continue;
      }

      let neer = Number.MAX_SAFE_INTEGER;
      let _j = 0;

      for (let j in thresholds) {
        let d = Math.abs(src.data[i] - thresholds[j]);
        if (d < neer) {
          neer = d;
          _j = j;
        }
      }

      dst.data[i] = thresholds[_j];
    }
    ctx.putImageData(dst, 0, 0);
  }
}
```

**main.js**

```js
import CV from '/path/to/cv.js';
const canvas = document.getElementById('canvas');
let image = new Image();
image.crossOrigin = 'Anonymous';
image.src = 'path/to/image.png';

image.onload = function() {
  canvas.width = image.width;
  canvas.height = image.height;
  let cv = new CV();
  cv.main(canvas, image);
};
```

参考に知ったソースはこちら。

<a href="https://github.com/s-yoshiki/Gasyori100knockJS/blob/master/src/components/questions/answers/Ans6.js">https://github.com/s-yoshiki/Gasyori100knockJS/blob/master/src/components/questions/answers/Ans6.js</a>
