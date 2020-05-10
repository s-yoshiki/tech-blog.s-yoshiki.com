---
title: "画像をグレースケールに変換する JavaScript + canvas 【画像処理】"
path: "/entry/113"
date: "2019-04-07 19:57:09"
coverImage: "../../../images/thumbnail/javascript-logo.png"
author: "s-yoshiki"
tags: ["javascript","canvas","画像処理","画像処理100本ノック"]
---

## 概要

JavaScriptで画像をグレースケールに変換するサンプルコードの紹介。

## グレースケール変換式

ここではグレースケール画像変換式は次のように定義しています。

`Y = 0.2126 * R + 0.7152 * G + 0.0722 * B`

## デモ

ここからデモを試すことができます。

<a href="https://s-yoshiki.github.io/Gasyori100knockJS/#/questions/ans2">https://s-yoshiki.github.io/Gasyori100knockJS/#/questions/ans2</a>

変換後の画像は次のようになります。

<a href="https://images-tech-blog.s-yoshiki.com/img/2019/04/201904071946_398cds.png">
<img src="https://images-tech-blog.s-yoshiki.com/img/2019/04/201904071946_398cds.png">
</a>

## サンプルソース

```js
const canvas = document.getElementById("canvas")
let image = new Image()
image.src = "./path/to/image.png"
let ctx = canvas.getContext("2d");
ctx.drawImage(image, 0, 0, image.width, image.height)

let src = ctx.getImageData(0, 0, image.width, image.height)
let dst = ctx.createImageData(image.width, image.height)

for (let i = 0; i < src.data.length; i += 4) {
  let y = 0.2126 * src.data[i] + 0.7152 * src.data[i + 1] + 0.0722 * src.data[i + 2]
  y = parseInt(y, 10)
  dst.data[i] = y
  dst.data[i + 1] = y
  dst.data[i + 2] = y
  dst.data[i + 3] = src.data[i + 3]
}
ctx.putImageData(dst, 0, 0)

```

ソースはgithubにもあげてあります

<a href="https://github.com/s-yoshiki/Gasyori100knockJS/blob/master/src/components/questions/answers/Ans2.js">https://github.com/s-yoshiki/Gasyori100knockJS/blob/master/src/components/questions/answers/Ans2.js</a>