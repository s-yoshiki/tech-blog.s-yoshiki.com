---
title: "[JS]ラジアンから度数に度数からラジアンに変換する"
path: "/entry/244"
date: "2021-06-13 23:00"
coverImage: "../../../images/thumbnail/javascript-logo.png"
author: "s-yoshiki"
tags: ["javascript","typescript"]
---

## 概要

ラジアンから度数に度数からラジアンに変換する際のスニペット。

## コード

### 度数からラジアンへ

```js
const deg2rad = (deg) => deg * ( Math.PI / 180 )
```

### ラジアンから度数へ

```js
const rad2deg = (rad) => rad * ( 180 / Math.PI )
```

### サンプル

```js
const deg2rad = (deg) => deg * ( Math.PI / 180 )
const rad2deg = (rad) => rad * ( 180 / Math.PI )

console.log(deg2rad(180))
console.log(deg2rad(45))
console.log(deg2rad(360))
console.log(rad2deg(deg2rad(180)))
console.log(rad2deg(deg2rad(45)))
console.log(rad2deg(deg2rad(360)))
// 3.141592653589793
// 0.7853981633974483
// 6.283185307179586
// 180
// 45
// 360
```

