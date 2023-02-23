---
title: "JavaScript canvasで扇型を描画するサンプル"
path: "/entry/101"
date: "2019-01-20 20:29:29"
coverImage: "../../../images/thumbnail/javascript-logo.png"
author: "s-yoshiki"
tags: ["javascript","canvas"]
---

## 概要

canvasで扇型を描画するサンプルを紹介します。

## 解説

<a href="https://developer.mozilla.org/ja/docs/Web/API/CanvasRenderingContext2D/arc">https://developer.mozilla.org/ja/docs/Web/API/CanvasRenderingContext2D/arc</a>

扇型はCanvas API の CanvasRenderingContext2D.arc()で描画することができます。
moveToメソッドで始点を与えることで扇型を描画することができます。

```js
context.beginPath();
context.moveTo(150, 150);
context.fillStyle = '#f3f3f3';
context.arc(150, 150, 100, 0 * Math.PI / 180, 45 * Math.PI / 180, true);
context.fill();
```

サンプルソースはデモの座標と同じように(150, 150)を中心とし、半径が100で、０度から45度の扇型を描画します。

```js
var canvas = document.getElementById('canvas');
canvas.width = 300;
canvas.height = 300;

var context = canvas.getContext('2d');
context.beginPath();
context.moveTo(150, 150);
context.fillStyle = '#3f7845';
context.arc(150, 150, 100, 20 * Math.PI / 180, 45 * Math.PI / 180, false);
context.fill();
```

## デモ

これを応用して、ルーレットを作りました。

<a href="https://tech-blog.s-yoshiki.com/2019/01/1024/">https://tech-blog.s-yoshiki.com/2019/01/1024/</a>

<iframe width="100%" height="500" src="//jsfiddle.net/s_yoshiki/8q1Lxg9k/embedded/result,js" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>
