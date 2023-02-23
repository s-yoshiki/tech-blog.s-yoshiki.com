---
title: "JS/TSのclassでclass名を取得する"
path: "/entry/241"
date: "2021-05-24 01:01"
coverImage: "../../../images/thumbnail/typescript-logo.png"
author: "s-yoshiki"
tags: ["javascript", "typescript"]
---

## 概要

JS/TSのconstructorを利用して自分自身のクラス名を取得する際のメモ。

## コード

```js
class BaseApp {
  constructor() {
    console.log('1:' + this.constructor.name);
    console.log('2:' + this.getClassName());
  }

  getClassName() {
    return this.constructor.name;
  }
}

class App extends BaseApp {
  constructor() {
    super();
    console.log('3:' + this.constructor.name);
    console.log('4:' + super.constructor.name);
  }
}

class ExApp extends App {
  constructor() {
    super();
    console.log('5:' + this.constructor.name);
    console.log('6:' + super.constructor.name);
  }
}

const app = new ExApp();
console.log('7:' + app.constructor.name);
```

このコードの結果は次のようになります。

```
1:ExApp
2:ExApp
3:ExApp
4:BaseApp
5:ExApp
6:App
7:ExApp
```
