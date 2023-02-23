---
title: "素因数分解を行うプログラム　サンプルコード JS/PHP"
path: "/entry/88"
date: "2018-12-24 00:36:17"
coverImage: "../../../images/thumbnail/javascript-logo.png"
author: "s-yoshiki"
tags: ["javascript","php","アルゴリズム","atcoder"]
---

## 概要

ある任意の正の整数の素因数を配列で返すサンプルコードを紹介します。

## サンプルコード

### JavaScript

パターン1 : 純粋な素因数分解

```js
function pf(n) {
  var result = [];

  if (n === 1) {
    return [1];
  }

  var init = 2;

  while (n !== 1) {
    var i = init;
    while (i < Number.MAX_SAFE_INTEGER) {
      if (n % i == 0) {
        result.push(i);
        n /= i;
        break;
      }
      i++;
    }
    init = i;
  }
  return result;
}
```

デバッグ

```js
console.log(JSON.stringify(pf(1)));
console.log(JSON.stringify(pf(4)));
console.log(JSON.stringify(pf(27)));
console.log(JSON.stringify(pf(972439611840)));
// [1]
// [2,2]
// [3,3,3]
// [2,2,2,2,2,2,3,3,3,5,103,103,103,103]
```

パターン2 : 指数部と仮数部に分ける

```js
function pf(n) {
  var result = {};

  if (n === 1) {
    return { '1': 1 };
  }

  var init = 2;

  while (n !== 1) {
    var i = init;
    while (i < Number.MAX_SAFE_INTEGER) {
      if (n % i === 0) {
        n /= i;
        if (!(result[i] > 0)) {
          result[i] = 0;
        }
        result[i]++;
        break;
      }
      i++;
    }
    init = i;
  }
  return result;
}
```

デバッグ

```js
console.log(JSON.stringify(pf(1)));
console.log(JSON.stringify(pf(4)));
console.log(JSON.stringify(pf(27)));
console.log(JSON.stringify(pf(972439611840)));
// {"1":1}
// {"2":2}
// {"3":3}
// {"2":6,"3":3,"5":1,"103":4}
```

### PHP

```php
function pf($n) {
    $result = array();

    if ($n === 1) {
        return [1];
    }

    $init = 2;

    while ( $n !== 1 ) {
        $i = $init;
        while ($i < 0xFFFFFF) {
            if ($n % $i == 0) {
                $result[] = $i;
                $n /= $i;
                break;
            }
            $i++;
        }
        $init = $i;
    }
    return $result;
}
```
