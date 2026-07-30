---
title: "画像を2値化する JavaScript + canvas 【画像処理】"
path: "/entry/114"
date: "2019-04-07 20:09:36"
coverImage: "../../../images/thumbnail/javascript-logo.png"
author: "s-yoshiki"
tags: ["javascript","canvas","画像処理","画像処理100本ノック"]
---

## 概要

JavaScriptで画像を2値化するサンプルコードの紹介。

## デモ

[Q.3 二値化のデモ](https://s-yoshiki.github.io/Gasyori100knockJS/questions/3)

実行すると以下のような画像が生成されます。

<a href="/img/2019/04/201904071958_njvf00.png"><img src="/img/2019/04/201904071958_njvf00.png"></a>

## サンプルソース

グレースケールに変換された画像の各画素の値が閾値未満であれば0、閾値以上であれば255に変換します。
ここでは閾値を128としています。

```js
const canvas = document.getElementById('canvas');
let image = new Image();
image.src = './path/to/image.png';
const THRESHOLD = 128;
let ctx = canvas.getContext('2d');
ctx.drawImage(image, 0, 0, image.width, image.height);
let src = ctx.getImageData(0, 0, image.width, image.height);
let dst = ctx.createImageData(image.width, image.height);
for (let i = 0; i < src.data.length; i += 4) {
  let y = 0.2126 * src.data[i] + 0.7152 * src.data[i + 1]
    + 0.0722 * src.data[i + 2];
  y = parseInt(y, 10);
  if (y > THRESHOLD) {
    y = 255;
  } else {
    y = 0;
  }
  dst.data[i] = y;
  dst.data[i + 1] = y;
  dst.data[i + 2] = y;
  dst.data[i + 3] = src.data[i + 3];
}
ctx.putImageData(dst, 0, 0);
```

グレースケールについてはこちらを参考にしてください。

[画像をグレースケールに変換する](/entry/113)

## 2026年版TypeScript実装

現在のソースは[Ans003.ts](https://github.com/s-yoshiki/Gasyori100knockJS/blob/master/src/questions/answers/Ans003.ts)
です。三項演算子で`gray > 128 ? 255 : 0`を選び、R、G、Bへ同じ値を設定しています。

固定閾値は処理が単純ですが、画像全体が暗い場合や明るい場合に前景と背景を適切に分離できません。
画像ごとに閾値を求める方法は[大津の二値化](/entry/115)で扱います。
