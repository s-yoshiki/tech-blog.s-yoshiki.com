---
title: "JavaScript + canvasで砂嵐を描画する サンプルコード"
path: "/entry/85"
date: "2018-12-12 23:05:25"
coverImage: "../../../images/thumbnail/javascript-logo.png"
author: "s-yoshiki"
tags: ["html5","javascript","画像処理"]
---

## 概要

JSとcanvasで砂嵐を描画するサンプルコード紹介します。

## 動作環境

chrome 61~

## デモ

<script async="" src="//jsfiddle.net/s_yoshiki/k20by3zg/16/embed/result/dark/"></script>

<a href="https://jsfiddle.net/s_yoshiki/k20by3zg/16/show">外部ウィンドウで開く</a>

## サンプルコード

```js
main()

function main() {
	var canvas1 = document.getElementById("canvas1")
	canvas1.width = 500
	canvas1.height = 200
	
	setInterval((function(){
		sandstorm1(canvas1)
	}), 100);
	
	var canvas2 = document.getElementById("canvas2")
	canvas2.width = 500
	canvas2.height = 200
	
	setInterval((function(){
		sandstorm2(canvas2)
	}), 100);
}

function sandstorm1(canvas) {
	var context = canvas.getContext("2d")
	var src = context.getImageData(0, 0, canvas.width, canvas.height);
	var dst = context.createImageData(canvas.width, canvas.height);
	for (var i = 0; i < src.data.length; i += 4) {
		dst.data[i] = Math.ceil(Math.random() * 255);
		dst.data[i + 1] = Math.ceil(Math.random() * 255);
		dst.data[i + 2] = Math.ceil(Math.random() * 255);
		dst.data[i + 3] = 255;
	}
	context.putImageData(dst, 0, 0);
}

function sandstorm2(canvas) {
	var context = canvas.getContext("2d")
	var src = context.getImageData(0, 0, canvas.width, canvas.height);
	var dst = context.createImageData(canvas.width, canvas.height);
	for (var i = 0; i < src.data.length; i += 4) {
		dst.data[i] = dst.data[i + 1] = dst.data[i + 2] = Math.ceil(Math.random() * 255)
		dst.data[i + 3] = 255;
	}
	context.putImageData(dst, 0, 0);
}

```

ちょっとだけ解説。

### canvasの各ピクセルへの参照方法

canvasの各ピクセルへ参照するためにはまず、getImageDataを利用してImageDataオブジェクトを取得します。
ImageDataオブジェクトのdataプロパティは画像情報が格納された1次元配列になっています。
この配列の要素番号をiとした時、i%4 === 0 は R、i%4 === 1 は G、i%4 === 2 は B、i%4 === 3 は α (透明度)を表しています。かつ各要素の最小値は0、最大値が255となっています。
0 から 255までの整数の乱数は

```js
Math.ceil(Math.random() * 255);
```

で取得できるので、これを使って砂嵐っぽいものが描画できます。

## おまけ

<script async="" src="//jsfiddle.net/s_yoshiki/k20by3zg/29/embed/result/"></script>

<a href="http://jsfiddle.net/s_yoshiki/k20by3zg/29/show">外部ウィンドウで開く</a>

```js
main()

function main() {
	var canvas1 = document.getElementById("canvas1")
	canvas1.width = 500
	canvas1.height = 500
	
	setInterval((function(){
		sandstorm1(canvas1)
	}), 100);
}

function sandstorm1(canvas) {
	var context = canvas.getContext("2d")
	var src = context.getImageData(0, 0, canvas.width, canvas.height);
	var dst = context.createImageData(canvas.width, canvas.height);
	for (var i = 0; i < src.data.length; i += 4) {
		if (i < src.data.length * 1 / 5) {
			dst.data[i]     = Math.ceil(Math.random() * 255);
			dst.data[i + 1] = Math.ceil(Math.random() * 255);
			dst.data[i + 2] = Math.ceil(Math.random() * 255);
			
		} else if (i < src.data.length * 2 / 5) {
			dst.data[i]     = Math.ceil(Math.random() * 255);
			dst.data[i + 1] = Math.ceil(Math.random() * 255);
			dst.data[i + 2] = 255
			
		} else if (i < src.data.length * 3 / 5) {
			dst.data[i]     = 255
			dst.data[i + 1] = Math.ceil(Math.random() * 255);
			dst.data[i + 2] = Math.ceil(Math.random() * 255);
			
		} else if (i < src.data.length * 4 / 5) {
			dst.data[i]     = Math.ceil(Math.random() * 255);
			dst.data[i + 1] = 255
			dst.data[i + 2] = Math.ceil(Math.random() * 255);
		} else {
			dst.data[i] = dst.data[i + 1] = dst.data[i + 2] = Math.ceil(Math.random() * 255)
		}
		dst.data[i + 3] = 255;
	}
	console.log(i)
	context.putImageData(dst, 0, 0);
}

```
