---
title: "[JS]Intl.DateTimeFormatで和暦と西暦を変換"
path: "/entry/291"
date: "2022-08-18 21:00"
coverImage: "../../../images/thumbnail/javascript-logo.png"
author: "s-yoshiki"
tags: ["javascript"]
---

## Intl.DateTimeFormat について

`Intl.DateTimeFormat`は言語に応じた日付と時刻の書式化を可能にするオブジェクトです。

## サンプル

```js
let formatter = new Intl.DateTimeFormat('ja-JP-u-ca-japanese', {
  year: 'numeric',
});
console.log(formatter.format(new Date(2022, 0, 1)));
```

例えば次のコードは`令和4年`と出力されます。

## 元号一覧を出力

例えば、1800年以降の元号一覧を出力したい場合は、次のコードで出力できます。

```js
let formatter = new Intl.DateTimeFormat('ja-JP-u-ca-japanese', {
  year: 'numeric',
});
for (let i = 1800; i <= 2022; i += 1) {
  let era0 = formatter.format(new Date(i, 0, 1));
  let era1 = formatter.format(new Date(i, 11, 31));
  if (era1.endsWith('元年') && era0 !== era1) {
    console.log(
      [i, era0, era1],
    );
  }
}
```

```
1801,寛政13年,享和元年
1804,享和4年,文化元年
1818,文化15年,文政元年
1830,文政13年,天保元年
1844,天保15年,弘化元年
1848,弘化5年,嘉永元年
1854,嘉永7年,安政元年
1860,安政7年,万延元年
1861,万延2年,文久元年
1864,文久4年,元治元年
1865,元治2年,慶応元年
1868,慶応4年,明治元年
1912,明治45年,大正元年
1926,大正15年,昭和元年
1989,昭和64年,平成元年
2019,平成31年,令和元年
```

## 参考サイト

[Intl.DateTimeFormat](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat)
