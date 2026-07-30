---
title: "canvas上のマウス座標を取得する。【JS】"
path: "/entry/90"
date: "2018-12-26 00:28:16"
coverImage: "../../../images/thumbnail/javascript-logo.png"
author: "s-yoshiki"
tags: ["html5","javascript"]
---

## 概要

HTMLのcanvasの上でマウスを動かした時の座標の取得方法を紹介します。

## 考え方

**
canvas上のマウス座標 = window上のマウス座標 - canvasの左上の座標
**
という考え方で取得します。

## サンプルコード

以下のようにHTMLを書きます。

```html
<canvas id="canvas"></canvas>
```

マウスが動いた時にcanvas上の座標が出力されます。
getBoundingClientRectでDOM要素の座標とサイズが取得できます。

```js
const canvas = document.getElementById('canvas');

canvas.addEventListener('mousemove', (e) => {
  var rect = e.target.getBoundingClientRect();
  var x = e.clientX - rect.left;
  var y = e.clientY - rect.top;
  console.log(`${x}:${y}`);
});
```

クリックした時の座標の取得は以下のように実装することで実現できます。

```js
const canvas = document.getElementById('canvas');

canvas.addEventListener('click', (e) => {
  var rect = e.target.getBoundingClientRect();
  var x = e.clientX - rect.left;
  var y = e.clientY - rect.top;
  console.log(`${x}:${y}`);
});
```

## デモ

ブラウザで画像をcanvasに描画 + マウス座標を表示 + ロギングするデモを作りました。

<a href="https://jsfiddle.net/s_yoshiki/hpw7jay0/show">
※外部ウィンドウで開く
</a>

<script async="" src="//jsfiddle.net/s_yoshiki/hpw7jay0/embed/"></script>

<iframe width="100%" height="500" src="//jsfiddle.net/s_yoshiki/hpw7jay0/embedded/result,js" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>

### ソース

```html
<input type="file" id="file">

<canvas id="canvas"></canvas>

<pre id="debug">
</pre>

<textarea id="textarea"></textarea>
```

```js
const canvas = document.getElementById('canvas');

document.getElementById('file').addEventListener('change', function(e) {
  var file = e.target.files;
  var reader = new FileReader();

  reader.readAsDataURL(file[0]);

  reader.onload = function() {
    var src = reader.result;
    drawCanvas(src);
  };
}, false);

canvas.addEventListener('mousemove', function(e) {
  var borderWidth = 1;
  var rect = e.target.getBoundingClientRect();
  var x = e.clientX - rect.left - borderWidth;
  var y = e.clientY - rect.top - borderWidth;
  document.getElementById('debug').innerHTML = `${x}:${y}`;
});

canvas.addEventListener('click', function(e) {
  var borderWidth = 1;
  var rect = e.target.getBoundingClientRect();
  var x = e.clientX - rect.left - borderWidth;
  var y = e.clientY - rect.top - borderWidth;
  document.getElementById('textarea').value += `${x}:${y}\n`;
});

function drawCanvas(source) {
  if (canvas.getContext('2d')) {
    var context = canvas.getContext('2d');
    var image = new Image();
    image.src = source;
    image.onload = function() {
      canvas.width = image.width;
      canvas.height = image.height;
      context.drawImage(image, 0, 0);
    };
  }
}
```

## 参考

https://tech-blog.s-yoshiki.com/2018/01/10/

## CSSで拡大・縮小したCanvasに対応する

`clientX - rect.left` だけでは、Canvasの内部解像度とCSS表示サイズが異なる場合に座標がずれます。比率を掛けてCanvas座標へ変換します。

```js
function getCanvasPoint(canvas, event) {
  const rect = canvas.getBoundingClientRect();
  const scaleX = canvas.width / rect.width;
  const scaleY = canvas.height / rect.height;

  return {
    x: (event.clientX - rect.left) * scaleX,
    y: (event.clientY - rect.top) * scaleY,
  };
}

canvas.addEventListener('pointerdown', (event) => {
  const { x, y } = getCanvasPoint(canvas, event);
  console.log({ x, y });
});
```

`getBoundingClientRect()` はborderを含むため、太いborderをCanvas自体へ付ける場合は `clientLeft` / `clientTop` やラッパー要素の利用も確認します。固定値で `borderWidth = 1` とするとCSS変更に弱くなります。

## Retina / High DPI対応

CSS上のサイズと描画バッファを `devicePixelRatio` に合わせる場合も、上記の比率変換なら同じ関数を利用できます。

```js
const cssWidth = 640;
const cssHeight = 360;
const dpr = window.devicePixelRatio || 1;

canvas.style.width = `${cssWidth}px`;
canvas.style.height = `${cssHeight}px`;
canvas.width = Math.round(cssWidth * dpr);
canvas.height = Math.round(cssHeight * dpr);

const context = canvas.getContext('2d');
context.scale(dpr, dpr);
```

タッチやペンも扱う場合はMouse EventsよりPointer Eventsが便利です。ドラッグ中にCanvas外へ移動しても追跡したい場合は `setPointerCapture()` を組み合わせます。

## 参考

- [MDN: Element.getBoundingClientRect()](https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect)
- [MDN: Pointer events](https://developer.mozilla.org/en-US/docs/Web/API/Pointer_events)
