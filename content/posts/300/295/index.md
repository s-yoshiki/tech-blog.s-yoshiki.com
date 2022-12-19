---
title: "[Node.js] ターミナルで回転する寿司を作る [Linux]"
path: "/entry/295"
date: "2022-12-18 16:00"
coverImage: "../../../images/thumbnail/linux-logo.png"
author: "s-yoshiki"
tags: ["node.js", "linux", "javascript", "typescript", "shell"]
---

## 概要

Linuxのターミナル上で回転する寿司を作りました。

発生プログラムターミナル上でフルーツが落下するコードも作りました。

## ターミナルで寿司を降らす

元ネタはこちらです。↓

[Macのターミナルに寿司を降らせる](https://gist.github.com/hokaccha/1cbe8da43ab254ac91b6)

rubyで書かれた寿司が落下するコードがありました。
こちらをNode.jsで実装してみます。

```js
const readline = require("readline");
const stdout = process.stdout;

const clear = () => stdout.write("\033[2J");
const print = (s) => stdout.write(s);
const sleep = (m) => new Promise((resolve) => setTimeout(resolve, m));

const sushi = String.fromCodePoint(0x1F363);

const main = async () => {
  const [w, h] = [stdout.columns, stdout.rows];
  const rand = (m) => Math.floor(Math.random() * m);
  const d = h * 3;
  const map = new Map();
  clear();
  while (true) {
    map.set(rand(w), 1);
    clear();
    for (const [x, y] of map) {
      if (y > d) {
        map.delete(x);
        continue;
      }
      map.set(x, y + 1);
      readline.cursorTo(stdout, x, y > h ? h : y);
      print(sushi);
    }
    readline.cursorTo(stdout, w, h);
    await sleep(100);
  }
};

main();
```

**説明**

まず、node.jsのreadlineモジュールとstdoutを読み込みます。
readlineモジュールは、ターミナルからの入力を受け付けるためのモジュールです。
stdoutは、ターミナル上に出力を行うためのものです。

clear関数、print関数、sleep関数について、
clear関数は、ターミナルの画面をクリアするための関数です。
print関数は、指定した文字列をターミナル上に出力するための関数です。
sleep関数は、指定した時間だけプログラムを一時停止するための関数です。

次に、`const sushi = String.fromCodePoint(0x1F363);` について
sushiという変数を定義しています。
この変数は、寿司マークを表す文字です。

最後に、main関数が定義されています。
この関数は、非同期処理を行うためにasyncを使っています。
main関数内では、ターミナルの画面サイズを取得し、whileループを使って、寿司マークを落下させる処理を繰り返します。

## ターミナルで果物を降らす

上記の寿司を降らすコードをベースに果物を降らすコードを実装しました。

```js
const readline = require("readline");
const stdout = process.stdout;

const clear = () => stdout.write("\033[2J");
const print = (s) => stdout.write(s);
const sleep = (m) => new Promise((resolve) => setTimeout(resolve, m));

const emoji = [
  0x1f347, 0x1f348, 0x1f349, 0x1f34a, 0x1f34e, 0x1f34c, 0x1f351, 0x1f352,
  0x1f353, 0x1fad0,
];

const main = async () => {
  const [w, h] = [stdout.columns, stdout.rows];
  const rand = (m) => Math.floor(Math.random() * m);
  const d = h * 3;
  const map = new Map();

  clear();
  while (true) {
    const q = [1, emoji[rand(emoji.length)]];
    map.set(rand(w), q);
    clear();
    for (const [x, [y, c]] of map) {
      if (y > d) {
        map.delete(x);
        continue;
      }
      map.set(x, [y + 1, c]);
      readline.cursorTo(stdout, x, y > h ? h : y);
      print(String.fromCodePoint(c));
    }
    readline.cursorTo(stdout, w, h);
    await sleep(100);
  }
};

main();
```


## ターミナルで回転寿司

ターミナル上で円周上を移動するように回転する寿司を描画するコードを実装してみました。

まずは寿司が1つだけ回転するコードです。

```js
const readline = require("readline");
const stdout = process.stdout;

const clear = () => stdout.write("\033[2J");
const print = (s) => stdout.write(s);
const sleep = (m) => new Promise((resolve) => setTimeout(resolve, m));

const sushi = String.fromCodePoint(0x1f363);

const main = async () => {
  const [w, h] = [stdout.columns, stdout.rows];
  const centerX = w / 2;
  const centerY = h / 2;
  let x = 0;
  let y = 0;
  let a = centerX * 0.95;
  let b = centerY * 0.95;
  let t = 0;
  while (true) {
    clear();
    x = Math.round((centerX + a * Math.cos(t)) % w);
    y = Math.round((centerY + b * Math.sin(t)) % h);
    readline.cursorTo(stdout, x, y);
    print(sushi);
    readline.cursorTo(stdout, w, h);
    await sleep(20);
    t += 0.05;
  }
};
```

これをベースに複数の寿司が回転するように、以下のように調整します。

```js
const readline = require("readline");
const stdout = process.stdout;

const clear = () => stdout.write("\033[2J");
const print = (s) => stdout.write(s);
const sleep = (m) => new Promise((resolve) => setTimeout(resolve, m));

const sushi = String.fromCodePoint(0x1f363);
const main = async () => {
  const [w, h] = [stdout.columns, stdout.rows];
  const centerX = w / 2;
  const centerY = h / 2;
  const k = 0.95;
  let s = Array.from(Array(64), (v, k) => k)
  let a = centerX * k;
  let b = centerY * k;
  while (true) {
    clear();
    for (let i in s) {
      let p = s[i];
      let x = Math.round((centerX + a * Math.cos(p)) % w);
      let y = Math.round((centerY + b * Math.sin(p)) % h);
      readline.cursorTo(stdout, x, y);
      s[i] += 0.05;
      print(sushi);
    }
    readline.cursorTo(stdout, w, h);
    await sleep(120);
  }
};
```

## 参考にさせていただいたサイト

- [Macのターミナルに寿司を降らせる](https://gist.github.com/hokaccha/1cbe8da43ab254ac91b6)
- [ANSIエスケープシーケンス チートシート - Qiita](https://qiita.com/PruneMazui/items/8a023347772620025ad6)