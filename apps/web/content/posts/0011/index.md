---
title: "【JavaScript】K-meansをアニメーション・可視化したら蜘蛛みたいな動きをした｜その1"
path: "/entry/11"
date: "2018-06-10 15:41:43"
coverImage: "../../../images/thumbnail/javascript-logo.png"
author: "s-yoshiki"
tags: ["html5","css3","javascript","canvas","アルゴリズム","機械学習","可視化","k-means"]
---

<blockquote class="twitter-tweet" data-lang="ja"><p lang="ja" dir="ltr">K-meansをアニメーション・可視化したら蜘蛛みたいな動きをした｜その1 <a href="https://t.co/VoMuCoq5sd">https://t.co/VoMuCoq5sd</a>\n\nJS + canavsの勉強も兼ねて\n機械学習とかで使われるk-meansによるクラスタリングを可視化してみた\nそしたら、ちょっと気持ち悪い蜘蛛みたいな動きをするようになった<a href="https://twitter.com/hashtag/javascript?src=hash&ref_src=twsrc%5Etfw">#javascript</a> <a href="https://twitter.com/hashtag/MachineLearning?src=hash&ref_src=twsrc%5Etfw">#MachineLearning</a> <a href="https://t.co/JnPq5mDSml">pic.twitter.com/JnPq5mDSml</a>
&mdash; s_yoshiki (@s_yoshiki_dev) <a href="https://twitter.com/s_yoshiki_dev/status/1023131943741751296?ref_src=twsrc%5Etfw">2018年7月28日</a></blockquote>

<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

## 概要

canavsの勉強も兼ねて、機械学習とかで使われるk-meansによるクラスタリングを可視化してみた。
そしたら、ちょっと気持ち悪い蜘蛛みたいな動きをするようになった。

環境は、
JavaScript
Canvas API
特にライブラリとかは使っていません。

<a href="https://ja.wikipedia.org/wiki/K%E5%B9%B3%E5%9D%87%E6%B3%95">k-menas(K平均法)</a>

## デモ

<iframe width="100%" height="300" src="//jsfiddle.net/s_yoshiki/Lxdbfey3/8/embedded/result,js" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>
クラスタ数、ノード数、アニメーションフレームを変更することができます。
ブラウザを起動したまま、3日くらい放置するとメチャメチャ重くなるので注意。(どこかでメモリを食っている...)
<a href="//jsfiddle.net/s_yoshiki/Lxdbfey3/8/" target="_blank">デモ1 : Link</a>

\n\n
こんなバージョンも作った

<iframe width="100%" height="300" src="//jsfiddle.net/s_yoshiki/Lxdbfey3/7/embedded/result,js" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>
まだ、ソースが汚いままなので、時間があるときにアップデートしたい。

<a href="//jsfiddle.net/s_yoshiki/Lxdbfey3/7/" target="_blank">デモ2 : Link</a>

## 他

<a href="https://tech-blog.s-yoshiki.com/2018/06/121/">【JavaScript】K-meansをアニメーション・可視化したら蜘蛛みたいな動きをした｜その1</a>
<a href="https://tech-blog.s-yoshiki.com/2018/06/138/">【JavaScript】K-meansをアニメーション・可視化したら蜘蛛みたいな動きをした｜その2</a>
<a href="https://tech-blog.s-yoshiki.com/2018/06/147/">【JavaScript】K-meansをアニメーション・可視化したら蜘蛛みたいな動きをした｜その3</a>
