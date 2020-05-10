---
title: "tesseract.js + canvasを組み合わせてOCRを行う"
path: "/entry/39"
date: "2018-09-09 21:21:33"
coverImage: "../../../images/thumbnail/javascript-logo.png"
author: "s-yoshiki"
tags: ["javascript"]
---

## 概要

tesseract.jsはWebブラウザで動くOCRエンジンです。オフィシャルサイトからデモをみることができると思います。
フロントのjsで動かす場合、canvasと組み合わせると色々と都合が良いので、とりあえず組み合わせたシンプルなデモを作った。

オフィシャル

http://tesseract.projectnaptha.com/

## 実装

### imageDataオブジェクト

imageDataオブジェクトはcanvasで画像を利用する際に利用されるオブジェクトです。
またプロパティである、imageData.dataは縦x横x画像値(4)の配列です。
TesseractにはこのimageDataを渡すことができます。

他にもimageやfileオブジェクトなどをそのまま渡すことができます。

### DEMO

<iframe width="100%" height="300" src="//jsfiddle.net/s_yoshiki/4rvz0k5d/embedded/" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>
<a href="https://jsfiddle.net/s_yoshiki/4rvz0k5d/show/" target="_blank">外部ウィンドウで開く</a>