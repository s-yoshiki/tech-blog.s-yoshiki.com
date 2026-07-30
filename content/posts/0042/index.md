---
title: "【JavaScript】角度を16方位に変換するソースコード"
path: "/entry/42"
date: "2018-09-11 14:36:46"
coverImage: "../../../images/thumbnail/javascript-logo.png"
author: "s-yoshiki"
tags: ["javascript","アルゴリズム","16方位"]
---

## 概要

与えられたある角度を16方位に変換する。

よくありがちな処理としてこんなものがあります。

```js
var dname = [
  'N',
  'NNE',
  'NE',
  'ENE',
  'E',
  'ESE',
  'SE',
  'SSE',
  'S',
  'SSW',
  'SW',
  'WSW',
  'W',
  'WNW',
  'NW',
  'NNW',
  'N',
];
var dindex = Math.round(degree / 22.5);

alert('方角は' + dname[dindex]);
```

JSの場合、

<a href="https://ja.wikipedia.org/wiki/IEEE_754">IEEE754</a>

というものがあり、浮動小数点数を利用した計算の場合、誤差が発生します。

なので、個人的には厳密な値を求める場合、浮動小数が含まれる計算はなるべく避けたいものです。

## ソース

上記を考慮して、なるべく少数が含まれる計算を排除したのがこれ↓です。

```js
function getAzimuth(degree) {
  var dname = [
    'N',
    'NNE',
    'NE',
    'ENE',
    'E',
    'ESE',
    'SE',
    'SSE',
    'S',
    'SSW',
    'SW',
    'WSW',
    'W',
    'WNW',
    'NW',
    'NNW',
    'N',
  ];
  var count = 0;
  for (var i = 11.25; i < (360 + 11.25); i += 22.5) {
    if (degree < i) {
      break;
    }
    count++;
  }
  return dname[count];
}
```
