---
title: "画像のHSV変換 JavaScript + canvas"
path: "/entry/116"
date: "2019-04-08 23:06:01"
coverImage: "../../../images/thumbnail/javascript-logo.png"
author: "s-yoshiki"
tags: ["javascript","canvas","画像処理","画像処理100本ノック","hsv"]
---

## 概要

画像のHSV変換を行うサンプルコードとデモの紹介

## デモ

以下のリンクでデモを動かしています。

<a href="https://s-yoshiki.github.io/Gasyori100knockJS/#/questions/ans5">https://s-yoshiki.github.io/Gasyori100knockJS/#/questions/ans5</a>

<iframe src="https://s-yoshiki.github.io/Gasyori100knockJS/#/questions/ans5/iframe" style="width:100%; height:350px"></iframe>

デモの内容はRGB画像をHSVに変換し、色相(H)を反転(180を加算)した後、再びRGBに戻すとい処理を行なっています。

<a href="https://images-tech-blog.s-yoshiki.com/img/2019/04/201904082255_r1tc43.png">
<img src="https://images-tech-blog.s-yoshiki.com/img/2019/04/201904082255_r1tc43.png"></a>

デモの実行後、画像はこの写真のように処理されます。

## ソース

**hsv.js**

```js
/**
 * HSV変換
 */
export default class {
  /**
   * rgb to hsv
   * @param {Array} rgb
   */
  rgb2hsv(rgb) {
    let r = rgb[0] / 255;
    let g = rgb[1] / 255;
    let b = rgb[2] / 255;

    let max = Math.max(r, g, b);
    let min = Math.min(r, g, b);
    let diff = max - min;

    let h = 0;

    switch (min) {
      case max:
        h = 0;
        break;
      case r:
        h = (60 * ((b - g) / diff)) + 180;
        break;
      case g:
        h = (60 * ((r - b) / diff)) + 300;
        break;
      case b:
        h = (60 * ((g - r) / diff)) + 60;
        break;
    }

    let s = max == 0 ? 0 : diff / max;
    let v = max;

    return [h, s, v];
  }
  /**
   * hsv to rgb
   * @param {Array} hsv
   */
  hsv2rgb(hsv) {
    let h = hsv[0];
    let s = hsv[1];
    let v = hsv[2];
    let c = v * s;
    let hp = h / 60;
    let x = c * (1 - Math.abs(hp % 2 - 1));

    let r, g, b;
    if (0 <= hp && hp < 1) [r, g, b] = [c, x, 0];
    if (1 <= hp && hp < 2) [r, g, b] = [x, c, 0];
    if (2 <= hp && hp < 3) [r, g, b] = [0, c, x];
    if (3 <= hp && hp < 4) [r, g, b] = [0, x, c];
    if (4 <= hp && hp < 5) [r, g, b] = [x, 0, c];
    if (5 <= hp && hp < 6) [r, g, b] = [c, 0, x];

    let m = v - c;
    [r, g, b] = [r + m, g + m, b + m];

    r = Math.floor(r * 255);
    g = Math.floor(g * 255);
    b = Math.floor(b * 255);

    return [r, g, b];
  }
  /**
   * メイン
   * @param {Object} canvas
   * @param {Object} image
   */
  main(canvas, image) {
    let ctx = canvas.getContext('2d');
    ctx.drawImage(image, 0, 0, image.width, image.height);

    let src = ctx.getImageData(0, 0, image.width, image.height);
    let dst = ctx.createImageData(image.width, image.height);

    for (let i = 0; i < src.data.length; i += 4) {
      let r = src.data[i];
      let g = src.data[i + 1];
      let b = src.data[i + 2];

      let hsv = this.rgb2hsv([r, g, b]);
      hsv[0] = (hsv[0] + 180) % 360;
      let rgb = this.hsv2rgb(hsv);

      dst.data[i] = rgb[0];
      dst.data[i + 1] = rgb[1];
      dst.data[i + 2] = rgb[2];
      dst.data[i + 3] = src.data[i + 3];
    }
    ctx.putImageData(dst, 0, 0);
  }
}
```

**main.js**

```js
import HSV from '/path/to/hsv.js';
const canvas = document.getElementById('canvas');
let image = new Image();
image.crossOrigin = 'Anonymous';
image.src = 'path/to/image.png';

image.onload = function() {
  canvas.width = image.width;
  canvas.height = image.height;
  let hsv = new HSV();
  hsv.main(canvas, image);
};
```

参考にしたソース

<a href="https://github.com/s-yoshiki/Gasyori100knockJS/blob/master/src/components/questions/answers/Ans5.js">https://github.com/s-yoshiki/Gasyori100knockJS/blob/master/src/components/questions/answers/Ans5.js</a>

## 参考

参考にしたサイトのまとめです。

<a href="https://qiita.com/hachisukansw/items/633d1bf6baf008e82847">https://qiita.com/hachisukansw/items/633d1bf6baf008e82847</a>

<a href="https://gist.github.com/mjackson/5311256">https://gist.github.com/mjackson/5311256</a>

<a href="https://lab.syncer.jp/Web/JavaScript/Snippet/66/">https://lab.syncer.jp/Web/JavaScript/Snippet/66/</a>
