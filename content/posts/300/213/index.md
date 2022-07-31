---
title: "TypeScriptに入門した"
path: "/entry/213"
date: "2021-01-04"
coverImage: "../../../images/thumbnail/typescript-logo.png"
author: "s-yoshiki"
tags: ["javascript","typescript","npm","node.js"]
---


## 概要

## 初期作業

typescript環境を作っていきます。

```shell
$ mkdir ts-app
$ cd ts-app
$ npm init
$ npm install typescript
$ export PATH=`pwd`/node_modules/.bin:PATH
$ node_modules/.bin/tsc --version
# Version 4.1.3
```

`package.json`

```json
{
  "name": "ts-app",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "build": "tsc"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "typescript": "^4.1.3"
  }
}
```

## とりあえずHello World

まず、次のサンプルコードを作成します。

`main.ts`

```ts
const hello = (arg: string): void => {
    if (arg.length > 0) {
        for (let i=0; i<10; i++) {
            console.log(`Hello ${arg}`);
        }
    }
}

let world: string = "world";
hello(world);
```

typescriptファイルをビルドします。

```
npm run build main.ts
```

`main.js`

```js
var hello = function (arg) {
    if (arg.length > 0) {
        for (var i = 0; i < 10; i++) {
            console.log("Hello " + arg);
        }
    }
};
var world = "world";
hello(world);
```

