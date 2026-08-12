---
title: "うるう年を求めるプログラム JavaScript"
path: "/entry/142"
date: "2019-06-23 18:53:30"
coverImage: "../../../images/thumbnail/javascript-logo.png"
author: "s-yoshiki"
tags: ["javascript","アルゴリズム","うるう年"]
---

## 概要

うるう年を求める実装メモです。

## 閏年の条件

閏年の条件は以下の通りとなります。

<ul>
 	<li>4で割り切れる</li>
 	<li>100で割り切れない</li>
 	<li>400で割り切れる</li>
</ul>
国立天文台

<a href="https://www.nao.ac.jp/faq/a0306.html">https://www.nao.ac.jp/faq/a0306.html</a>

## サンプルコード

### 判定関数

```js
const isLeapYear = (year) => {
  return (year % 4 === 0) && (year % 100 !== 0) || (year % 400 === 0);
};
```

### 21世紀のうるう年を算出する

```js
const isLeapYear = (year) => {
  return (year % 4 === 0) && (year % 100 !== 0) || (year % 400 === 0);
};
for (let i = 2001; i < 2100; i++) {
  if (isLeapYear(i)) {
    console.log(i);
  }
}
```

```js
2004;
2008;
2012;
2016;
2020;
2024;
2028;
2032;
2036;
2040;
2044;
2048;
2052;
2056;
2060;
2064;
2068;
2072;
2076;
2080;
2084;
2088;
2092;
2096;
```
