---
title: "【JavaScript】K-meansを使って画像を減色する。全てフルスクラッチ【canvas】"
path: "/entry/17"
date: "2018-07-01 13:38:48"
coverImage: "../../../images/thumbnail/javascript-logo.png"
author: "s-yoshiki"
tags: ["html5","javascript","アルゴリズム","機械学習","可視化"]
---

## 概要

K-menasで画像を減色してみた。
JavaScript + canvasを使用。
OpenCVとかライブラリは使わず全てフルスクラッチ

## K-means

クラスタリングなどを行う際の定番なアルゴリズムです。
<a href="https://ja.wikipedia.org/wiki/K%E5%B9%B3%E5%9D%87%E6%B3%95">Wikipedia</a>

## 結果

うまく減色することができました。
ソースは後ほど紹介します。
数字は、k-meansのクラスタ数。
<img src="https://qiita-image-store.s3.amazonaws.com/0/82419/993a158b-6678-7bd6-6f3b-7c53ad97250f.png">

## 処理のフロー

処理のフローとしては、
1. canvasに画像を描画
2. 描画されたピクセルr,g,bを一つの配列に全てpushする
3. この配列をk-meansでクラスタリングする
4. 画像の各ピクセルが含まれるクラスタのrgb値を描画する。
といった流れです。

## デモ

クラスタ数を数字で入力し"run"を実行。
JSタブでソースが見れます。

<a href="//jsfiddle.net/s_yoshiki/ntoa92uw/show">デモ : リンク</a>

<iframe width="100%" height="500" src="//jsfiddle.net/s_yoshiki/ntoa92uw/embedded/result,js" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>

## 参考

<a href="https://tech-blog.s-yoshiki.com/2018/06/121/">【JavaScript】K-meansをアニメーション・可視化したら蜘蛛みたいな動きをした｜その1</a>

<a href="http://enakai00.hatenablog.com/entry/2015/04/14/181305">k-means法で画像を減色するサンプルコード - めもめも</a>