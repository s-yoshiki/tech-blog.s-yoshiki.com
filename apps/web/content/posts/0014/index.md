---
title: "【JavaScript】凸包(ギフト包装法)を可視化・アニメーション【Canvas】"
path: "/entry/14"
date: "2018-06-16 13:59:42"
coverImage: "../../../images/thumbnail/javascript-logo.png"
author: "s-yoshiki"
tags: ["html5","javascript","canvas","可視化","凸包"]
---

## 概要

凸包(ギフト包装法)のスキャンする様子をアニメーションにして可視化してみた。
ライブラリとかは使わず、Canvasにそのまま描画する。

## 凸包

<a href="https://ja.wikipedia.org/wiki/%E5%87%B8%E5%8C%85" >凸包 - WikiPedia</a>
凸包を解くためのアルゴリズムは様々なものが存在し、
代表的なものを上げると、

- グラハムスキャン
- 分割統治法
- ギフト包装法

が、ある。

パフォーマンスが優れているのは、グラハムスキャンだが、
比較的にわかりやすいギフト包装法を可視化してみることにした。

## DEMO

<a href="//jsfiddle.net/s_yoshiki/sa9hqc1f" target="_blank">デモ Link</a>

<iframe width="100%" height="500" src="//jsfiddle.net/s_yoshiki/sa9hqc1f/1/embedded/result,js" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>

## 参考

<a href="http://asa-no-blog.hatenablog.com/entry/2018/05/20/135516">凸包を求める（Grahamスキャン）</a>
<a href="https://qiita.com/keiskimu/items/dfd734eceb4236b66f7e">Canvasで凸包を描画する</a>
