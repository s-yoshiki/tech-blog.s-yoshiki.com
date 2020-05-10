---
title: "JavaScriptによる画像処理と便利なライブラリ"
path: "/entry/98"
date: "2019-01-14 00:37:14"
coverImage: "../../../images/thumbnail/javascript-logo.png"
author: "s-yoshiki"
tags: ["javascript","canvas","画像処理","opencv","webassembly","fabric.js","clmtrackr","pico.js"]
---

## 概要

JavaScript + canvasによって行える様々な画像処理方法について紹介します。

### Canvas APIについて

<a href="https://developer.mozilla.org/ja/docs/Web/HTML/Canvas">https://developer.mozilla.org/ja/docs/Web/HTML/Canvas</a>

HTML5には画像等の処理が行える強力なAPIである「Canvas」が備わっています。
これによりJavascriptによって様々な画像・図形の描画や、グラデーション、動画のリアルタイム加工などが行えます。

### ImageDataについて

<a href="https://developer.mozilla.org/ja/docs/Web/API/ImageData">https://developer.mozilla.org/ja/docs/Web/API/ImageData</a>

ImageDataインタフェースによってcanvasに描画された画像をRGBAの画像配列として扱うことができます。
これにより様々な画像処理が可能となります。

## 基本的な画像変換

<img src="https://pbs.twimg.com/media/DmGXqiWUwAAFgu2.jpg">
**ブラウザ上でグレースケールや2値化などの処理を行った時の様子**

この画像のようにcanvasの簡単なメソッドを組み合わせることによって簡単な画像変換を行うことができます。
この程度の処理であれば数行で実装できます。

<script async="" src="//jsfiddle.net/s_yoshiki/uwvjL0ye/1/embed/result,js/dark"></script>

<a href="//jsfiddle.net/s_yoshiki/uwvjL0ye/1/embed/result,js/dark" target="_blank">別ウィンドウで開く</a>

<a href="https://tech-blog.s-yoshiki.com/2018/09/448/">https://tech-blog.s-yoshiki.com/2018/09/448/</a>

## 物体検出

### 顔検出

<a href="https://github.com/tehnokv/picojs">https://github.com/tehnokv/picojs</a>

canvasを用いて顔検出が行えるライブラリの一つに<a href="https://github.com/tehnokv/picojs">pico.js</a>があります。

わずか200行で実装されており、とても軽いようです。
また、WASM(※)版も用意されているようです。
※WASMについては「OpenCV と WebAssembly」の項目で紹介

デモではカメラからの入力画像から顔を検出し赤い円を描画しています。

YouTubeにもデモ動画が公開されています。

<iframe width="560" height="315" src="https://www.youtube.com/embed/9WiGC08_ZFY" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen=""></iframe>

<a href="https://tkv.io/posts/picojs-intro/demo/">デモ</a>

### 顔検出 + フィッティング

<a href="https://github.com/auduno/clmtrackr">https://github.com/auduno/clmtrackr</a>

顔検出と顔特徴点のフィッティングを行うライブラリにclmtrckrがあります。
clmtrackrは動画・画像から、顔やパーツの位置や傾きを検出することができます。

<img src="https://camo.githubusercontent.com/f230f53c6afb16982e888d11f40b073f577c3fc1/68747470733a2f2f617564756e6f2e6769746875622e696f2f636c6d747261636b722f6578616d706c65732f6d656469612f636c6d747261636b725f30332e6a7067">

<a href="https://www.auduno.com/clmtrackr/examples/clm_video.html">https://www.auduno.com/clmtrackr/examples/clm_video.html</a>
<a href="https://www.auduno.com/clmtrackr/examples/clm_video.html">デモ (外部リンク)</a>

<iframe src="https://player.vimeo.com/video/75659453" width="640" height="485" frameborder="0" webkitallowfullscreen="" mozallowfullscreen="" allowfullscreen=""></iframe>

<a href="https://vimeo.com/75659453">clmtrackr example</a> from <a href="https://vimeo.com/user12126655">Audun Mathias Øygard</a> on <a href="https://vimeo.com">Vimeo</a>.

## OpenCV と WebAssembly

画像処理や機械学習等の機能を持つ強力なライブラリであるOpenCVをWASMとしてビルドしブラウザ上で処理できるようにする方法があります。

以下のは2枚の画像から特徴点を検出し比較するデモと、その解説記事とレポジトリです。
<a href="https://quramy.github.io/opencv-wasm-knnmatch-demo/">デモ</a>

<a href="https://qiita.com/Quramy/items/5edf1318979b1f165a5a">https://qiita.com/Quramy/items/5edf1318979b1f165a5a</a>

<a href="https://github.com/Quramy/opencv-wasm-knnmatch-demo">https://github.com/Quramy/opencv-wasm-knnmatch-demo</a>

## fabric.js

<a href="https://github.com/fabricjs/fabric.js">https://github.com/fabricjs/fabric.js</a>

canvas内で画像をオブジェクトとして操作する場合に重宝するインタラクティブなライブラリです。
svgからcanvasへ(canvasからsvg)への出力にも対応しています。

<a href="http://fabricjs.com/">http://fabricjs.com/</a>

<iframe width="560" height="315" src="https://www.youtube.com/embed/fKoZaBiVOgY" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen=""></iframe>

随時更新中。