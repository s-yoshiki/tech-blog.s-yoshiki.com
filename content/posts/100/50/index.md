---
title: "WebAssemblyのデモ。特に注目すべきデモを集めてみた。"
path: "/entry/50"
date: "2018-09-21 17:01:17"
coverImage: "../../../images/thumbnail/no-image.png"
author: "s-yoshiki"
tags: ["javascript","wasm","webassembly"]
---

## 概要

WebAssemblyのデモ。特に注目すべきデモを集めてみました。
基本的にはChromeかFireFox、safariでしか動かないものだと思います。

## SLコマンド

http://kjunichi.github.io/slwasm/sl.html

デモを開くと見慣れたアイツが走ってきます。

解説

https://abrakatabura.hatenablog.com/entry/2016/03/28/071449

## Qt

http://example.qt.io/qt-webassembly/opengl/hellowindow/hellowindow.html

このデモは読み込み(コンパイル?)にかなり時間がかかりました。
それにしても、まさかブラウザでQtを動かせるなんてスゴイですね。

解説記事には、他のQtの利用例もあります。

http://blog.qt.io/blog/2018/05/22/qt-for-webassembly/

## Vim

https://rhysd.github.io/vim.wasm/

VimをEmscriptenとBinaryenを利用してコンパイルしたもの。
詳しい解説がされている。

https://rhysd.hatenablog.com/entry/2018/07/09/090115

## OpenCV + knn matchデモ

https://quramy.github.io/opencv-wasm-knnmatch-demo/

OpenCVをWebAssemblyにコンパイルしたものを利用。
AKAZEを利用して特徴点マッチングしているもの。

解説記事

https://qiita.com/Quramy/items/5edf1318979b1f165a5a

## Unity

https://webassembly.org/demo/Tanks/

Unityに関しては、すでにWebGLを利用するものがありますが、
wasmを利用した方が速いという報告もあります。

http://d.hatena.ne.jp/nakamura001/20170421/1492751387