---
title: "Fisher-Yates shuffleで配列シャッフル [js/ts/php]"
path: "/entry/281"
date: "2022-06-19 21:00"
coverImage: "../../../images/thumbnail/typescript-logo.png"
author: "s-yoshiki"
tags: ["javascript", "node.js", "typescript", "php"]
---

## 概要

ts/js/php で配列をシャッフルする際の実装メモです。

配列のシャッフルには[Fisher-Yates shuffle](https://ja.wikipedia.org/wiki/%E3%83%95%E3%82%A3%E3%83%83%E3%82%B7%E3%83%A3%E3%83%BC%E2%80%93%E3%82%A4%E3%82%A7%E3%83%BC%E3%83%84%E3%81%AE%E3%82%B7%E3%83%A3%E3%83%83%E3%83%95%E3%83%AB)を利用しました。

## ソース

### typescript

```ts
const shuffleArr = (src: number[]): number[] => {
  const dst = src.slice();
  let i = src.length;
  while (i > 0) {
    i--;
    const j = Math.floor(Math.random() * (i + 1));
    [dst[i], dst[j]] = [dst[j], dst[i]];
  }
  return dst;
};
```

```js
console.log(shuffleArr([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]));
// [ 4, 8, 6, 0, 2, 1, 9, 7, 3, 5 ]
```

### js

```js
const shuffleArr = (src) => {
  const dst = src.slice();
  let i = src.length;
  while (i > 0) {
    i--;
    const j = Math.floor(Math.random() * (i + 1));
    [dst[i], dst[j]] = [dst[j], dst[i]];
  }
  return dst;
};
```

### php

```php
function shuffleArr(array $src)
{
  $i = count($src);
  while ($i > 0) {
    $i--;
    $j = random_int(0, $i + 1);
    [$src[$i], $src[$j]] = [$src[$j], $src[$i]];
  }
  return $src;
}
```

```php
echo(implode(",", shuffleArr([0,1,2,3,4,5,6,7,8,9])));
```

## 参考にしたサイト

- [世界最速の配列シャッフルアルゴリズム、Fisher-Yates アルゴリズム - Panda Noir](https://www.pandanoir.info/entry/2013/03/04/193704)
- [JavaScript：配列内の要素をシャッフル（ランダムソート）する方法 - NxWorld](https://www.nxworld.net/js-array-shuffle.html)
