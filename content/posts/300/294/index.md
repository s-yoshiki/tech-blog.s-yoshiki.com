---
title: "node-pty xterm.js websocket を利用したブラウザで動くShellの作成"
path: "/entry/294"
date: "2022-12-13 16:00"
coverImage: "../../../images/thumbnail/linux-logo.png"
author: "s-yoshiki"
tags: ["node.js", "linux", "javascript", "typescript"]
---

## 概要

node-pty xterm.js websocket を利用したブラウザで動くShellの作成をしてみました。

## 利用するモジュールの説明

### node-pty

[microsoft/node-pty: Fork pseudoterminals in Node.JS](https://github.com/microsoft/node-pty)

node-ptyは、Node.jsでターミナルエミュレータを実装するためのモジュールです。

OSのテキストベースの端末エミュレータ（例えば、xtermやgnome-terminalなど）をラップして、Node.jsから呼び出すことができるようにします。
そのため、Node.jsで書かれたアプリケーションからターミナルを実行したり、ターミナルからのデータを読み取ったりすることができます。

node-ptyは、コマンドを実行したり、ターミナルを操作したりするためのAPIを提供しています。
また、node-ptyはオープンソースのモジュールであり、GitHub上で開発されています。

### xterm.js

[xtermjs/xterm.js: A terminal for the web](https://github.com/xtermjs/xterm.js)

xterm.jsは、webブラウザ上で動作するターミナルエミュレータのライブラリです。
ターミナルエミュレータは、コンピュータでコマンドを入力し、その結果を表示するためのテキストベースの画面を提供するものです。
JavaScriptで書かれており、webブラウザ上で動作するようになっています。
xterm.jsを使用すると、webアプリケーションやサイトにターミナルエミュレータの機能を組み込むことができます。

### ws

[websockets/ws: Simple to use, blazing fast and thoroughly tested WebSocket client and server for Node.js](https://github.com/websockets/ws)

"ws"は、WebSocketを実装するためのJavaScriptライブラリです。

WebSocketは、クライアントとサーバー間でリアルタイムでデータをやり取りするためのプロトコルです。WebSocketを使用すると、サーバーからのイベントを受信したり、クライアントからのデータを送信したりすることができます。

"ws"ライブラリは、WebSocketを使用するためのAPIを提供しており、Node.jsでWebSocketを扱うためによく使われます。

## 大まかな構成

まず、node-ptyを使用してサーバーサイドでターミナルを起動し、xterm.jsを使用してクライアント側でターミナルのようなインターフェースを表示します。

次に、WebSocketを使用して、サーバーとクライアント間でデータをやり取りするようにします。
これにより、クライアントからサーバーへのコマンドを送信したり、サーバーからのターミナルの出力をクライアントに表示することができます。

具体的には、まずサーバーサイドでnode-ptyを使用してターミナルを起動します。
そして、WebSocketサーバーを起動します。次に、クライアント側でxterm.jsを使用してターミナルのようなインターフェースを表示し、WebSocketを使用してサーバーと通信するようにします。
クライアントからのコマンドを受け取ると、サーバーはnode-ptyを使用してそのコマンドを実行し、その結果をクライアントに送信します。
これを繰り返すことで、ブラウザ上で動作するシェルを実装することができます。

## ソース

**package.json**

```json
{
  "scripts": {
    "dev": "node index.js"
  },
  "dependencies": {
    "express": "^4.18.2",
    "node-pty": "^0.10.1",
    "ws": "^8.11.0",
    "xterm": "^5.0.0",
    "xterm-addon-fit": "^0.6.0",
    "xterm-addon-ligatures": "^0.6.0",
    "xterm-addon-search": "^0.10.0",
    "xterm-addon-serialize": "^0.8.0",
    "xterm-addon-unicode11": "^0.4.0",
    "xterm-addon-web-links": "^0.7.0"
  }
}
```

**index.html**

```html
<html>
  <head>
    <meta charset="utf-8">
    <style>
      html {
        height: 100%;
      }
      body {
        height: 100%;
        margin: 0;
      }
      .fullheight {
        height: 100%;
        background: black;
      }
    </style>
    <link rel="stylesheet" href="node_modules/xterm/css/xterm.css" />
    <script type="text/javascript" src="node_modules/xterm/lib/xterm.js" charset="utf-8"></script>
    <script type="text/javascript" src="node_modules/xterm-addon-fit/lib/xterm-addon-fit.js" charset="utf-8"></script>
    <script type="text/javascript" src="node_modules/xterm-addon-ligatures/lib/xterm-addon-ligatures.js" charset="utf-8"></script>
    <script type="text/javascript" src="node_modules/xterm-addon-search/lib/xterm-addon-search.js" charset="utf-8"></script>
    <script type="text/javascript" src="node_modules/xterm-addon-web-links/lib/xterm-addon-web-links.js" charset="utf-8"></script>
    <script type="text/javascript" src="node_modules/xterm-addon-unicode11/lib/xterm-addon-unicode11.js" charset="utf-8"></script>
    <script type="text/javascript" src="node_modules/xterm-addon-serialize/lib/xterm-addon-serialize.js" charset="utf-8"></script>
  </head>
  <body>
    <div class="fullheight" id="terminal"></div>
    <script type="text/javascript" src="cli.js" charset="utf-8"></script>
  </body>
</html>
```

**index.js**

```js
const express = require("express");
const app = express();
const server = require("http").Server(app);
const nodePty = require("node-pty");
const WebSocket = require("ws");

app.use("/", express.static("."));
const wss = new WebSocket.Server({ server });

wss.on("connection", (ws) => {
  let pty = nodePty.spawn("bash", ["--login"], {
    name: "xterm-color",
    cols: 80,
    rows: 24,
    cwd: process.env.HOME,
    env: process.env,
  });
  pty.onData((data) => {
    ws.send(JSON.stringify({ output: data }));
  });
  ws.on("message", (message) => {
    console.log("received: %s", message);
    m = JSON.parse(message);
    if (m.input) {
      pty.write(m.input);
    } else if (m.resize) {
      pty.resize(m.resize[0], m.resize[1]);
    }
  });
});

server.listen(process.env.PORT || 8999, () => {
  console.log(`Server started on port ${server.address().port} :)`);
});
```

**cli.js**

```js
const term = new Terminal({
  cols: 80,
  rows: 24,
  allowProposedApi: true,
});
term.open(document.getElementById("terminal"));

// addons
const fitAddon = new FitAddon.FitAddon();
// const ligaturesAddon = new LigaturesAddon.LigaturesAddon();
const searchAddon = new SearchAddon.SearchAddon(); 
const webLinksAddon = new WebLinksAddon.WebLinksAddon(); 
const unicode11Addon = new Unicode11Addon.Unicode11Addon(); 
const serializeAddon = new SerializeAddon.SerializeAddon(); 

[
  fitAddon,
  // ligaturesAddon,
  searchAddon,
  webLinksAddon,
  unicode11Addon,
  serializeAddon,
].map((e) => term.loadAddon(e));

term.unicode.activeVersion = '11';

const ws = new WebSocket(`ws://${location.hostname}:8999`);

ws.addEventListener("open", () => {
  console.info("WebSocket connected");
});
ws.addEventListener("message", (event) => {
  console.debug("Message from server ", event.data);
  try {
    let output = JSON.parse(event.data);
    term.write(output.output, () => {
      console.log(serializeAddon.serialize());
    });
  } catch (e) {
    console.error(e);
  }
});


term.onData((data) => ws.send(JSON.stringify({ input: data })));

window.addEventListener("resize", () => {
  fitAddon.fit();
});

fitAddon.fit();

term.onResize((size) => {
  console.debug("resize");
  const resizer = JSON.stringify({ resizer: [size.cols, size.rows] });
  ws.send(resizer);
});
```


JS版のソースです。

https://github.com/s-yoshiki/node-websh/tree/8528ff6d61a2100afefba662584b3d7c306d7408


## 参考にしたサイト

[dews/webssh: xterm + node-pty + websocket](https://github.com/dews/webssh)

[【Node.js + Express】WebSocketを使ってみる( + 全クライアントに一斉送信) - とある科学の備忘録](https://shizenkarasuzon.hatenablog.com/entry/2021/04/21/004132)

[xterm.jsでキーボード入力を受け付ける方法 - haku-maiのブログ](https://n-guitar.hatenablog.com/entry/2020/11/14/203521)

[Node.js Stream を使いこなす - Qiita](https://qiita.com/masakura/items/5683e8e3e655bfda6756)