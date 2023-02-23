---
title: "大津の二値化で画像を2値化 JavaScript + canvas 【画像処理】"
path: "/entry/115"
date: "2019-04-07 21:16:07"
coverImage: "../../../images/thumbnail/javascript-logo.png"
author: "s-yoshiki"
tags: ["javascript","canvas","画像処理","画像処理100本ノック"]
---

## 概要

大津の二値化で画像を2値化するサンプルコード

<a href="https://tech-blog.s-yoshiki.com/2019/04/1115/">https://tech-blog.s-yoshiki.com/2019/04/1115/</a>

↑のサンプルコードでは閾値を128として決め打ちで2値化していますが、画像のヒストグラムの分散から適切な閾値を求める方法（判別分析法）の1つです。

ここでは、そのサンプルコードとデモを紹介しています。

## デモ

<a href="https://s-yoshiki.github.io/Gasyori100knockJS/#/questions/ans4">https://s-yoshiki.github.io/Gasyori100knockJS/#/questions/ans4</a>

実行するとこのような画像が生成されます。

<a href="https://images-tech-blog.s-yoshiki.com/img/2019/04/201904071958_njvf00.png"><img src="https://images-tech-blog.s-yoshiki.com/img/2019/04/201904071958_njvf00.png"></a>

## サンプルソース

**大津の2値化クラス**

```js
/**
 * 大津の2値化
 */
class ImageProc {
  /**
   * メイン
   * @param {Object} canvas
   * @param {Object} image
   */
  main(canvas, image) {
    const grayscale = (r, g, b) => 0.2126 * r + 0.7152 * g + 0.0722 * b;
    let ctx = canvas.getContext('2d');
    ctx.drawImage(image, 0, 0, image.width, image.height);
    let src = ctx.getImageData(0, 0, image.width, image.height);
    let dst = ctx.createImageData(image.width, image.height);

    let t = this.threshold(src);

    for (let i = 0; i < dst.data.length; i += 4) {
      let v = grayscale(src.data[i], src.data[i + 1], src.data[i + 2]);
      if (v < t) {
        dst.data[i] = dst.data[i + 1] = dst.data[i + 2] = 0;
      } else {
        dst.data[i] = dst.data[i + 1] = dst.data[i + 2] = 255;
      }
      dst.data[i + 3] = 255;
    }
    ctx.putImageData(dst, 0, 0);
  }
  /**
   * 大津の2値化
   * @param {ImageData} src
   */
  threshold(src) {
    const grayscale = (r, g, b) => 0.2126 * r + 0.7152 * g + 0.0722 * b;
    let histgram = Array(256).fill(0);
    let t = 0;
    let max = 0;

    for (let i = 0; i < src.data.length; i += 4) {
      let g = ~~grayscale(src.data[i], src.data[i + 1], src.data[i + 2]);
      histgram[g]++;
    }

    for (let i = 0; i < 256; i++) {
      let w1 = 0;
      let w2 = 0;
      let sum1 = 0;
      let sum2 = 0;
      let m1 = 0;
      let m2 = 0;
      for (let j = 0; j <= i; ++j) {
        w1 += histgram[j];
        sum1 += j * histgram[j];
      }
      for (let j = i + 1; j < 256; ++j) {
        w2 += histgram[j];
        sum2 += j * histgram[j];
      }
      if (w1) {
        m1 = sum1 / w1;
      }
      if (w2) {
        m2 = sum2 / w2;
      }
      let tmp = w1 * w2 * (m1 - m2) * (m1 - m2);
      if (tmp > max) {
        max = tmp;
        t = i;
      }
    }
    return t;
  }
}
```

**メイン**

```js
const canvas = document.getElementById('canvas');
let image = new Image();
image.crossOrigin = 'Anonymous';
image.src = 'path/to/image.png';

image.onload = function() {
  canvas.width = image.width;
  canvas.height = image.height;
  let ip = new ImageProc();
  ip.main(canvas, image);
};
```

**HTML**

```html
<canvas id="canvas"></canvas>
```

GitHubに上がっているものを流用しています。

<a href="https://github.com/s-yoshiki/Gasyori100knockJS/blob/master/src/components/questions/answers/Ans4.js">https://github.com/s-yoshiki/Gasyori100knockJS/blob/master/src/components/questions/answers/Ans4.js</a>

## 大津の2値化

ここら辺の説明を参考にしました。

<a href="http://labs.eecs.tottori-u.ac.jp/sd/Member/oyamada/OpenCV/html/py_tutorials/py_imgproc/py_thresholding/py_thresholding.html">http://labs.eecs.tottori-u.ac.jp/sd/Member/oyamada/OpenCV/html/py_tutorials/py_imgproc/py_thresholding/py_thresholding.html</a>

<a href="https://qiita.com/haru1843/items/00de955790d3a22a217b">https://qiita.com/haru1843/items/00de955790d3a22a217b</a>

<a href="https://algorithm.joho.info/image-processing/otsu-thresholding/">https://algorithm.joho.info/image-processing/otsu-thresholding/</a>
