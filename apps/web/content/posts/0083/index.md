---
title: "10進数からN進数に変換するプログラム"
path: "/entry/83"
date: "2018-12-06 01:37:22"
coverImage: "../../../images/thumbnail/javascript-logo.png"
author: "s-yoshiki"
tags: ["javascript","アルゴリズム"]
---

## 概要

ある任意の10進数からN進数に変換するプログラム(JavaScript)を紹介します。

## N進数を求めるプログラム

### ソース

ある任意の10進数xをn進数に変換した結果を返す関数convertBasedRepr。

```js
function convertBasedRepr(x, n) {
  var result = [];

  do {
    var t = x % n;
    result.push(t);
    var m = Math.floor(x / n);

    if (m < n) {
      if (m !== 0) {
        result.push(m);
      }
      break;
    }
    x = (x - t) / n;
  } while (1);

  return result;
}
```

### 実行すると...

```js
main(20);

function main(max) {
  for (var i = 0; i < max; i++) {
    console.log(JSON.stringify(convertBasedRepr(i, 2).reverse()));
  }
}
// 配列の0要素が1桁目と成るので反転して出力しています。
```

これを実行すると以下のように実行されます。

```js
[0][1][1, 0][1, 1][1, 0, 0][1, 0, 1][1, 1, 0][1, 1, 1][1, 0, 0, 0][1, 0, 0, 1][
  1, 0, 1, 0
][1, 0, 1, 1][1, 1, 0, 0][1, 1, 0, 1][1, 1, 1, 0][1, 1, 1, 1][1, 0, 0, 0, 0][
  1, 0, 0, 0, 1
][1, 0, 0, 1, 0][1, 0, 0, 1, 1];
```

これを応用し

```js
main(50);

function main(max) {
  var based_strings = '0123456789abcdefghijklmnoqrstuvwxyz'.split(''); // 0-zの文字列の配列
  for (var i = 0; i < max; i++) {
    var based_n = convertBasedRepr(i, 16);
    var dst = '';
    for (var j = 0; j < based_n.length; j++) {
      dst = based_strings[
        based_n[j]
      ] + dst;
    }
    console.log(dst);
  }
}
```

```
0
1
2
3
4
5
6
7
8
9
a
b
c
d
e
f
10
11
12
13
14
15
16
17
18
19
1a
1b
1c
1d
1e
1f
20
21
22
23
24
25
26
27
28
29
2a
2b
2c
2d
2e
2f
30
31
```

と出力されます。

100進数みたいなものも作れると思います。

## 参考

<a href="https://prev.net-newbie.com/tcpip/radix.html"> n 進数について </a>
<a href="https://chugaku-juken.com/n-sinnhou/">小学生でも納得！N進法のわかりやすい考え方</a>
