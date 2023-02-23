---
title: "FileAPIで画像を読み込み canvasに描画"
path: "/entry/2"
date: "2018-01-22 12:38:59"
coverImage: "../../../images/thumbnail/javascript-logo.png"
author: "s-yoshiki"
tags: ["html5","css3","javascript","canvas"]
---

## 概要

「FileAPIを使って画像を読み込み、イベント終了と同時に自動的にcanvasに描画したい！」

FileAPIを使って読み込んだ画像を、imgタグを使って画像を表示をすることは容易であったが、
canvasに描画するのに少々手間取ったので、これをメモとして残すことにしました。

## 流れ

- FileAPIでローカルにある任意の画像を選択し読み込む
- canvasに描画

## Image.onloadを使う方法

Image.onloadを使えば一発だった。

```js
const canvas = document.getElementById('canvas');

document.querySelector('input[type="file"]').onchange = function() {
  let img = this.files[0];
  let reader = new FileReader();
  reader.readAsDataURL(img);
  reader.onload = function() {
    drawImage(reader.result);
  };
};

function drawImage(url) {
  let ctx = canvas.getContext('2d');
  let image = new Image();
  image.src = url;
  image.onload = () => {
    canvas.width = image.width;
    canvas.height = image.height;
    ctx.drawImage(image, 0, 0);
  };
}
```

<script src="https://gist.github.com/s-yoshiki/4e561b5a704f1dbda02e75e59e99065a.js"></script>

## 追記

デモを作りました。

<!-- <script async src="//jsfiddle.net/s_yoshiki/xL09s2fm/embed/"></script>
<script async src="//jsfiddle.net/s_yoshiki/z4hwx0sa/embed/"></script> -->

<iframe width="100%" height="300" src="//jsfiddle.net/s_yoshiki/z4hwx0sa/embedded/" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>

<a href="//jsfiddle.net/s_yoshiki/z4hwx0sa/" target="_blank">別ウィンドウで開く</a>
