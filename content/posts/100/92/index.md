---
title: "3次元の回転行列(オイラー角)で画像を回転させる (roll pitch yaw)【JS】"
path: "/entry/92"
date: "2019-01-02 00:28:05"
coverImage: "../../../images/thumbnail/javascript-logo.png"
author: "s-yoshiki"
tags: ["javascript","画像処理"]
---

## 概要

JavaScriptを用いて、3次元の回転行列で画像を回転させるサンプルを紹介します。

## 3次元の回転行列

任意の軸周りの回転行列は次の式で表すことができます。

各軸周りの回転行列は以下の式で表します。
<img src="https://wikimedia.org/api/rest_v1/media/math/render/svg/b2ac0ffc248c06b980f77fb9bc38518b9b621394">
<img src="https://wikimedia.org/api/rest_v1/media/math/render/svg/769f03a9eea685228b3b7b86c0d075924da7351a">
<img src="https://wikimedia.org/api/rest_v1/media/math/render/svg/d38d8c8c4e068ef8a0a397ae4a0f385d63246811">

回転行列 フリー百科事典『ウィキペディア（Wikipedia）』 より

<a href="https://ja.wikipedia.org/wiki/%E3%82%AA%E3%82%A4%E3%83%A9%E3%83%BC%E8%A7%92">https://ja.wikipedia.org/wiki/%E3%82%AA%E3%82%A4%E3%83%A9%E3%83%BC%E8%A7%92</a>

### 回転行列のサンプルコード

```js
const sin = (x) => {
  return Math.sin(x);
};
const cos = (x) => {
  return Math.cos(x);
};
const tan = (x) => {
  return Math.tan(x);
};

function rotation(x, y, z, a, b, c) {
  var R = [
    [
      cos(b) * cos(c) - sin(a) * sin(b) * sin(c),
      -cos(a) * sin(c),
      sin(b) * cos(c) + sin(a) * cos(b) * sin(c),
    ],
    [
      cos(b) * sin(c) + sin(a) * sin(b) * cos(c),
      cos(a) * cos(c),
      sin(c) * sin(b) - sin(c) * cos(b) * cos(c),
    ],
    [-cos(a) * sin(b), sin(a), cos(a) * cos(b)],
  ];

  var _x = x * R[0][0] + y * R[0][1] + z * R[0][2];
  var _y = x * R[1][0] + y * R[1][1] + z * R[1][2];
  var _z = x * R[2][0] + y * R[2][1] + z * R[2][2];

  return [_x, _y, _z];
}
```

## 画像を回転させるデモ

<script type="text/javascript" src="https://jsdo.it/blogparts/kdqZ/js"></script>

<a href="http://jsrun.it/s.yoshiki1123/kdqZ">外部リンクで開く</a>

### 結果

<img src="https://pbs.twimg.com/media/Dv1cH3eVAAES9DN.jpg">
<img src="https://pbs.twimg.com/media/Dv1cH3cVYAEv7ud.jpg">
<img src="https://pbs.twimg.com/media/Dv1cH3eVsAApoAG.jpg">

## 参考

<a href="https://ja.wikipedia.org/wiki/%E3%83%AD%E3%83%BC%E3%83%AA%E3%83%B3%E3%82%B0">https://ja.wikipedia.org/wiki/%E3%83%AD%E3%83%BC%E3%83%AA%E3%83%B3%E3%82%B0</a>

<a href="https://ja.wikipedia.org/wiki/%E3%82%AA%E3%82%A4%E3%83%A9%E3%83%BC%E8%A7%92">https://ja.wikipedia.org/wiki/%E3%82%AA%E3%82%A4%E3%83%A9%E3%83%BC%E8%A7%92</a>

<a href="https://ja.wikipedia.org/wiki/%E3%83%AD%E3%83%89%E3%83%AA%E3%82%B2%E3%82%B9%E3%81%AE%E5%9B%9E%E8%BB%A2%E5%85%AC%E5%BC%8F">https://ja.wikipedia.org/wiki/%E3%83%AD%E3%83%89%E3%83%AA%E3%82%B2%E3%82%B9%E3%81%AE%E5%9B%9E%E8%BB%A2%E5%85%AC%E5%BC%8F</a>

<a href="http://www.sanko-shoko.net/note.php?id=wghj">http://www.sanko-shoko.net/note.php?id=wghj</a>

<a href="http://camphor.wpblog.jp/2015/05/17/%E4%B8%89%E6%AC%A1%E5%85%83%E5%A7%BF%E5%8B%A2%E8%A1%A8%E7%8F%BE%EF%BC%88%E3%82%AA%E3%82%A4%E3%83%A9%E3%83%BC%E8%A7%92%EF%BC%89/">http://camphor.wpblog.jp/2015/05/17/%E4%B8%89%E6%AC%A1%E5%85%83%E5%A7%BF%E5%8B%A2%E8%A1%A8%E7%8F%BE%EF%BC%88%E3%82%AA%E3%82%A4%E3%83%A9%E3%83%BC%E8%A7%92%EF%BC%89/</a>
