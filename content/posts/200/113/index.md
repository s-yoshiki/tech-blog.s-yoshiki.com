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

[Q.2 グレースケールのデモ](https://s-yoshiki.github.io/Gasyori100knockJS/questions/2)

変換後の画像は次のようになります。

<a href="/img/2019/04/201904071946_398cds.png">
<img src="/img/2019/04/201904071946_398cds.png">
</a>

## サンプルソース

```js
const canvas = document.getElementById('canvas');
let image = new Image();
image.src = './path/to/image.png';
let ctx = canvas.getContext('2d');
ctx.drawImage(image, 0, 0, image.width, image.height);

let src = ctx.getImageData(0, 0, image.width, image.height);
let dst = ctx.createImageData(image.width, image.height);

for (let i = 0; i < src.data.length; i += 4) {
  let y = 0.2126 * src.data[i] + 0.7152 * src.data[i + 1]
    + 0.0722 * src.data[i + 2];
  y = parseInt(y, 10);
  dst.data[i] = y;
  dst.data[i + 1] = y;
  dst.data[i + 2] = y;
  dst.data[i + 3] = src.data[i + 3];
}
ctx.putImageData(dst, 0, 0);
```

ソースはgithubにもあげてあります

[Ans002.ts](https://github.com/s-yoshiki/Gasyori100knockJS/blob/master/src/questions/answers/Ans002.ts)

## 2026年版TypeScript実装

現在の実装はTypeScriptへ移行しています。計算した輝度`Y`をR、G、Bの3チャンネルへ同じ値で
設定し、アルファ値は入力画像から引き継ぎます。

単純平均ではなく、人の視覚が緑へ強く反応することを考慮した係数を使う点が重要です。この
グレースケール関数は、二値化やエッジ検出など後続問題の前処理でも繰り返し利用します。
