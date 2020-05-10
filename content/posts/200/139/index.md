---
title: "OpenCV.jsを動かしてみる + デモ"
path: "/entry/139"
date: "2019-06-22 18:24:30"
coverImage: "../../../images/thumbnail/opencv-logo.png"
author: "s-yoshiki"
tags: ["javascript","機械学習","画像処理","opencv","wasm","opencv.js"]
---

## 概要

OpenCV.jsを試してみました。

## 環境

OpenCV.js v4.1.0

## OpenCV.jsのセットアップ

OpenCVをWasmにビルドします。

<a href="https://tech-blog.s-yoshiki.com/2018/09/544/">https://tech-blog.s-yoshiki.com/2018/09/544/</a>

デモではこちらを拝借します。

```
https://docs.opencv.org/4.1.0/opencv.js
```

<a href="https://docs.opencv.org/4.1.0/opencv.js">https://docs.opencv.org/4.1.0/opencv.js</a>

## サンプルソース

### グレースケール

```js
let src = cv.imread(srcCanvasId)
let dst = new cv.Mat()
cv.cvtColor(src, dst, cv.COLOR_RGBA2GRAY, 0)
cv.imshow(dstCanvasId, dst)
```

### 2値化

```js
let src = cv.imread(srcCanvasId)
let dst = new cv.Mat()
let gray = new cv.Mat()
cv.cvtColor(src, gray, cv.COLOR_RGBA2GRAY, 0)
cv.threshold(gray, dst, 126, 255, 1)
cv.imshow(dstCanvasId, dst)
```

### Cannyエッジ

```js
let src = cv.imread(srcCanvasId)
let dst = new cv.Mat()
let gray = new cv.Mat()
cv.Canny(src, dst, 100,200)
cv.imshow(dstCanvasId, dst)
```

### 輪郭抽出

```js
let src = cv.imread(srcCanvasId)
let dst = cv.Mat.zeros(src.rows, src.cols, cv.CV_8UC3);
let contours = new cv.MatVector()
let hierarchy = new cv.Mat()
cv.cvtColor(src, src, cv.COLOR_RGBA2GRAY, 0);
cv.adaptiveThreshold(src, src, 200, cv.ADAPTIVE_THRESH_GAUSSIAN_C, cv.THRESH_BINARY, 3, 2);
cv.findContours(src, contours, hierarchy, cv.RETR_CCOMP, cv.CHAIN_APPROX_SIMPLE);
for (let i = 0; i < contours.size(); ++i) {
    let color = new cv.Scalar(
        Math.round(Math.random() * 255),
        Math.round(Math.random() * 255),
        Math.round(Math.random() * 255)
    )
    cv.drawContours(dst, contours, i, color, 1, cv.LINE_8, hierarchy, 100);
}
cv.imshow(dstCanvasId, dst);
```

### ガウシアン

```js
let src = cv.imread(srcCanvasId);
let dst = new cv.Mat();
cv.cvtColor(src, src, cv.COLOR_RGBA2GRAY, 0);
cv.adaptiveThreshold(src, dst, 200, cv.ADAPTIVE_THRESH_GAUSSIAN_C, cv.THRESH_BINARY, 3, 2);
cv.imshow(dstCanvasId, dst)
```

## デモ

<a href="https://jsfiddle.net/s_yoshiki/0m7pdurh/show">https://jsfiddle.net/s_yoshiki/0m7pdurh/show</a>

<iframe width="100%" height="500" src="//jsfiddle.net/s_yoshiki/0m7pdurh/embedded/result,js" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>
