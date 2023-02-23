---
title: "画像のチャンネル(RGB)を入れ替えるJavaScript + canvas【画像処理】"
path: "/entry/112"
date: "2019-04-07 19:37:44"
coverImage: "../../../images/thumbnail/no-image.png"
author: "s-yoshiki"
tags: ["javascript","canvas","画像処理","画像処理100本ノック"]
---

## 概要

JavaScriptで画像のチャンネルを入れ替えるコードについての紹介。
やりたいことは、通常、RGBで並んでいる画像の配列をBGRに変換するというもの。
変換すると以下のような画像になります。
環境はJavaScript + Canvas

## 実行イメージ

<a href="https://images-tech-blog.s-yoshiki.com/img/2019/04/201904071915_glixj8.png">
<img src="https://images-tech-blog.s-yoshiki.com/img/2019/04/201904071915_glixj8.png">
</a>
左が入力画像、右が変換後の画像です。

## デモ

こちらから試すことができます。

<a href="https://s-yoshiki.github.io/Gasyori100knockJS/#/questions/ans1">https://s-yoshiki.github.io/Gasyori100knockJS/#/questions/ans1</a>

## ソース

RGBからBGRに変換する場合のソースコード

```js
const canvas = document.getElementById('canvas');
let image = new Image();
image.src = './path/to/image.png';
let ctx = canvas.getContext('2d');
ctx.drawImage(image, 0, 0, image.width, image.height);

let src = ctx.getImageData(0, 0, image.width, image.height);
let dst = ctx.createImageData(image.width, image.height);

for (let i = 0; i < src.data.length; i += 4) {
  dst.data[i] = src.data[i + 2];
  dst.data[i + 1] = src.data[i + 1];
  dst.data[i + 2] = src.data[i];
  dst.data[i + 3] = src.data[i + 3];
}
ctx.putImageData(dst, 0, 0);
```

簡単に説明するとsrcに入力画像の情報が配列として格納されています。またこの配列にはr,g,b,aの4つごとに値が格納されています。これらの順番を入れ替えて再びcanvasにセットすることでチャンネルを入れ替えることができます。

github

<a href="https://github.com/s-yoshiki/Gasyori100knockJS/blob/master/src/components/questions/answers/Ans1.js">https://github.com/s-yoshiki/Gasyori100knockJS/blob/master/src/components/questions/answers/Ans1.js</a>
