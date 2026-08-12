---
title: "async awaitで画像を読み込み canvasに描画 JavaScript"
path: "/entry/140"
date: "2019-06-23 12:43:55"
coverImage: "../../../images/thumbnail/javascript-logo.png"
author: "s-yoshiki"
tags: ["html5","javascript","canvas","async","await","promise"]
---

## 概要

async await Promise を使ってブラウザにアップロードした画像をcanvasに非同期で描画するサンプルの紹介です。
onloadメソッド縛りで実装すると非同期地獄になりますが、async await を使うことによりすっきりと書くことができました。

## async

async について

<a href="https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Statements/async_function">https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Statements/async_function</a>

## サンプルコード

**解説**
アップロードされたファイルをImageオブジェクトとして読み込みます。
画像の読み込みが完了したら、canvasに画像を描画します。
**ソース**

```js
function load(canvas, file) {
  return new Promise((resolve, reject) => {
    let ctx = canvas.getContext('2d');
    let image = new Image();
    let reader = new FileReader();
    reader.onload = e => {
      image.src = e.target.result;
      image.onload = () => {
        ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
        resolve(image);
      };
    };
    reader.readAsDataURL(file);
  });
}

async function onChange(file) {
  const canvas = document.getElementById(canvasId);
  await load(canvas, file);
  alert('読み込み完了!');
}

document.getElementById('input').addEventListener('change', (e) => {
  onChange(e.target.files[0]);
}, false);
```

**デモ**
OpenCV.jsを組み合わせたものです。
上記のサンプルコードとは若干異なりますが、同様の動作をします。

<script async="" src="//jsfiddle.net/s_yoshiki/0m7pdurh/embed/result,js,html/dark/"></script>

<a href="https://jsfiddle.net/s_yoshiki/0m7pdurh/show">https://jsfiddle.net/s_yoshiki/0m7pdurh/show</a>

<iframe width="100%" height="500" src="//jsfiddle.net/s_yoshiki/0m7pdurh/embedded/result,js" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>
