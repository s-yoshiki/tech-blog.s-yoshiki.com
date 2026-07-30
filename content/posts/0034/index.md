---
title: "JavaScript + canvasで画像変換処理をするときのスニペット"
path: "/entry/34"
date: "2018-09-03 01:09:31"
coverImage: "../../../images/thumbnail/javascript-logo.png"
author: "s-yoshiki"
tags: ["html5","javascript"]
---

## 概要

canvasはJSによって図形などを描画する際に使われます。
canvasに描画された画像はピクセルに対して参照・操作することが可能なので、
これを用いて画像変換処理を行うことができます。

<img src="https://pbs.twimg.com/media/DmGXrUjU4AAyQ4j.jpg">
デモ画像

この記事では自分がよく使うスニペットを置いときます
(自分用メモ、※随時更新中)

## ソース

<img src="https://pbs.twimg.com/media/DmGXqiWUwAAFgu2.jpg">
変換後の画像例です。
基本的にはImageDataオブジェクトを利用することで、画像はピクセルに対して参照・操作することが可能なのです。
ImageData.dataは１次元の画像配列で[r,g,b,a,r,g,b,a,....]といった形で格納されてます。

### グレイスケール

```js
var src = ctx.getImageData(0, 0, canvas.width, canvas.height);
var dst = ctx.createImageData(canvas.width, canvas.height);
for (let i = 0; i < src.data.length; i = i + 4) {
  var x = (src.data[i] + src.data[i + 1] + src.data[i + 2]) / 3;
  dst.data[i] = dst.data[i + 1] = dst.data[i + 2] = x;
  dst.data[i + 3] = src.data[i + 3];
}
ctx.putImageData(dst, 0, 0);
```

### ２値化

```js
var src = ctx.getImageData(0, 0, canvas.width, canvas.height);
var dst = ctx.createImageData(canvas.width, canvas.height);
for (let i = 0; i < src.data.length; i = i + 4) {
  var x = (src.data[i] + src.data[i + 1] + src.data[i + 2]) / 3;
  if (int_thresh > x) {
    x = 255;
  } else {
    x = 0;
  }
  dst.data[i] = dst.data[i + 1] = dst.data[i + 2] = x;
  dst.data[i + 3] = src.data[i + 3];
}
ctx.putImageData(dst, 0, 0);
```

### ネガポジ変換

```js
var src = ctx.getImageData(0, 0, canvas.width, canvas.height);
var dst = ctx.createImageData(canvas.width, canvas.height);
for (let i = 0; i < src.data.length; i = i + 4) {
  dst.data[i] = Math.abs(255 - src.data[i]);
  dst.data[i + 1] = Math.abs(255 - src.data[i + 1]);
  dst.data[i + 2] = Math.abs(255 - src.data[i + 2]);
  dst.data[i + 3] = src.data[i + 3];
}
ctx.putImageData(dst, 0, 0);
```

### ガンマ補正

```js
var src = ctx.getImageData(0, 0, canvas.width, canvas.height);
var dst = ctx.createImageData(canvas.width, canvas.height);
var int_g = 2.0;
const correctify = val => 255 * Math.pow(val / 255, 1 / int_g);
for (let i = 0; i < src.data.length; i += 4) {
  dst.data[i] = correctify(src.data[i]);
  dst.data[i + 1] = correctify(src.data[i + 1]);
  dst.data[i + 2] = correctify(src.data[i + 2]);
  dst.data[i + 3] = src.data[i + 3];
}
ctx.putImageData(dst, 0, 0);
```

## デモ

<script async="" src="//jsfiddle.net/s_yoshiki/uwvjL0ye/1/embed/result,js/dark"></script>

<a href="//jsfiddle.net/s_yoshiki/uwvjL0ye/1/embed/result,js/dark" target="_blank">別ウィンドウで開く</a>

### サンプルコード

```js
const cv = {
  grayscale: (src, dst) => {
    for (let i = 0; i < src.data.length; i = i + 4) {
      let x = (src.data[i] + src.data[i + 1] + src.data[i + 2]) / 3;
      dst.data[i] = dst.data[i + 1] = dst.data[i + 2] = x;
      dst.data[i + 3] = src.data[i + 3];
    }
  },
  threshold: (src, dst, int_thresh) => {
    int_thresh = int_thresh || 120;
    for (let i = 0; i < src.data.length; i = i + 4) {
      let x = (src.data[i] + src.data[i + 1] + src.data[i + 2]) / 3;
      if (int_thresh > x) {
        x = 255;
      } else {
        x = 0;
      }
      dst.data[i] = dst.data[i + 1] = dst.data[i + 2] = x;
      dst.data[i + 3] = src.data[i + 3];
    }
  },
  reverse: (src, dst) => {
    for (let i = 0; i < src.data.length; i = i + 4) {
      dst.data[i] = Math.abs(255 - src.data[i]);
      dst.data[i + 1] = Math.abs(255 - src.data[i + 1]);
      dst.data[i + 2] = Math.abs(255 - src.data[i + 2]);
      dst.data[i + 3] = src.data[i + 3];
    }
  },
  gamma: (src, dst, int_g) => {
    int_g = int_g || 2.0;
    const correctify = val => 255 * Math.pow(val / 255, 1 / int_g);
    for (let i = 0; i < src.data.length; i += 4) {
      dst.data[i] = correctify(src.data[i]);
      dst.data[i + 1] = correctify(src.data[i + 1]);
      dst.data[i + 2] = correctify(src.data[i + 2]);
      dst.data[i + 3] = src.data[i + 3];
    }
  },
};

const canvas = document.getElementById('canvas');
const default_imageurl = document.getElementById('img_src').value;
drawImage(default_imageurl);

document.getElementById('menu').addEventListener('change', () => {
  try {
    let func_code = document.getElementById('menu').value || '';
    drawImage(default_imageurl, () => {
      let ctx = canvas.getContext('2d');
      let src = ctx.getImageData(0, 0, canvas.width, canvas.height);
      let dst = ctx.createImageData(canvas.width, canvas.height);
      cv[func_code](src, dst);
      ctx.putImageData(dst, 0, 0);
    });
  } catch (e) {
    alert(e);
  }
});

function drawImage(url, evt) {
  let ctx = canvas.getContext('2d');
  let image = new Image();
  image.src = url;
  image.onload = () => {
    canvas.width = image.width;
    canvas.height = image.height;
    ctx.drawImage(image, 0, 0);
    evt();
  };
}
```

## 関連

https://tech-blog.s-yoshiki.com/2018/01/10/

https://tech-blog.s-yoshiki.com/2018/07/197/
