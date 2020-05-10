---
title: "【JavaScript】凸包(グラハムスキャン)を可視化・アニメーション【Canvas】"
path: "/entry/15"
date: "2018-06-21 16:15:12"
coverImage: "../../../images/thumbnail/javascript-logo.png"
author: "s-yoshiki"
tags: ["html5","css3","javascript","canvas","アルゴリズム","可視化","凸包"]
---

## 概要

<a href="https://tech-blog.s-yoshiki.com/2018/06/152/">前回</a>に引き続き
凸包(グラハムスキャン)のスキャンする様子をアニメーションにして可視化してみた。
ライブラリとかは使わず、Canvasにそのまま描画する。

## 凸包

<a href="https://ja.wikipedia.org/wiki/%E5%87%B8%E5%8C%85" >凸包 - WikiPedia</a>
凸包を解くためのアルゴリズムは様々なものが存在し、
代表的なものを上げると、

 - グラハムスキャン
 - 分割統治法
 - ギフト包装法

が、ある。

このうちのグラハムスキャンを実装してみることにした。

## DEMO

<script async src="//jsfiddle.net/s_yoshiki/wntshy3m/embed/result,js,html/dark/"></script>

<iframe width="100%" height="500" src="//jsfiddle.net/s_yoshiki/wntshy3m/embedded/result,js" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>

<a href="//jsfiddle.net/s_yoshiki/wntshy3m/" target="_blank">デモ Link</a>

## 参考

<a href="http://asa-no-blog.hatenablog.com/entry/2018/05/20/135516">凸包を求める（Grahamスキャン）</a>
<a href="https://qiita.com/keiskimu/items/dfd734eceb4236b66f7e">INTRODUCTION TO ALGORITHMS</a>
<a href="https://tech-blog.s-yoshiki.com/2018/06/152/">【JavaScript】凸包(ギフト包装法)を可視化・アニメーション【Canvas】</a>