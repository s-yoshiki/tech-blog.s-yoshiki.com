---
title: "JSで画像をまとめて読み込む(プリロードする)"
path: "/entry/120"
date: "2019-05-06 00:20:16"
coverImage: "../../../images/thumbnail/javascript-logo.png"
author: "s-yoshiki"
tags: ["html5","javascript"]
---

## 概要

JSで画像をまとめて読み込む方法(プリロード)の紹介
JSのImageAPIのonloadを使って、複数の画像の読み込み完了時にイベントを発火させる方法です。

asyncを使った方がベターですが、ここでは使いません。

## サンプルコード

```js
let imagesUrl = [
  "/path/to/image/a.png",
  "/path/to/image/b.png",
  "/path/to/image/c.png",
  // ...
]
let images = new Array(imagesUrl.length)
let loadingCount = 0

const mainEvent = () => {
　　// 画像読み込み完了時の処理を書く
  console.log('complete')
}

for (let i = 0; i < imagesUrl.length; i++) {
  images[i] = new Image()
  images[i].src = imagesUrl[i]
  images[i].crossOrigin = "Anonymous";
  images[i].addEventListener('load', () => {
    loadingCount++
    if (loadingCount === images.length - 1) {
      mainEvent()
    }
  })
}
```

## デモ

このデモは指定した画像が全て読み込み完了となった時に、canvasに描画するというものです。

<script async="" src="//jsfiddle.net/s_yoshiki/knzrj13o/embed/js,result/dark/"></script>

コード
<a href="https://jsfiddle.net/s_yoshiki/knzrj13o/">https://jsfiddle.net/s_yoshiki/knzrj13o/</a>

## 参考

<a href="http://ninoha.com/?p=77">http://ninoha.com/?p=77</a>

<a href="https://suganomusic.com/20141009/14">https://suganomusic.com/20141009/14</a>