---
title: "【JavaScript】K近傍法を可視化してみた【canvas】"
path: "/entry/16"
date: "2018-06-24 16:02:03"
coverImage: "../../../images/thumbnail/javascript-logo.png"
author: "s-yoshiki"
tags: ["javascript","canvas","アルゴリズム","機械学習","可視化","k-means","k近傍法","knn"]
---

## 概要

機械学習とかで用いられるK近傍法を
JavaScriptで実装しCanvasで可視化してみた。

あらかじめクラスタ化されたデータが必要となるので、
以前作成した、K-menasを用いて元となるデータを作成する。

## 処理のフロー

処理のフローとしては以下のようになる。

- データ生成(乱数を使って)
- K-menasでクラスタリング
- K近傍法で分類されるクラスタを計算

## デモ

デモのせつめい。

### 入力フィールド

- x : 対象データのx座標
- y : 対象データのx座標
- k : 計算対象に含む距離の上限

クリックすると計算データを生成する。

<script async src="//jsfiddle.net/s_yoshiki/dzv675o2/embed/result,js,html,css/dark/"></script>

<iframe width="100%" height="500" src="//jsfiddle.net/s_yoshiki/dzv675o2/embedded/result,js" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>
