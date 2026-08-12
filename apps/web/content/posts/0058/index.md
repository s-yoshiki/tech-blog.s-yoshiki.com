---
title: "【※サービス終了】イケてるSQLクライアント、TeamSQLを使ってみた！！簡単なグラフを作成してみる！"
path: "/entry/58"
date: "2018-09-28 02:50:02"
coverImage: "../../../images/thumbnail/mysql-logo.png"
author: "s-yoshiki"
tags: ["データベース"]
---

## 概要

<a href="https://tech-blog.s-yoshiki.com/2018/09/642/">イケてるSQLクライアント、TeamSQLを使ってみた！！接続から〜簡単なグラフ作成まで！</a>の続き。
簡単なSQLを実行したところからグラフ描画までをやって見ました。

## TeamSQLの導入

https://tech-blog.s-yoshiki.com/2018/09/642/

こちらから。

## データの用意

グラフに表示させるデータを用意します。

<img src="https://pbs.twimg.com/media/DoHeLNfU8AEhqxW.jpg">
今回の場合、ブログの「投稿日」と「投稿した文字列の長さ」を取得しています。
ここでオレンジ色のChartsボタンを押すとグラフ用の別ウィンドウが立ち上がります。

## グラフの設定

<img src="https://pbs.twimg.com/media/DoHeRvhU0AIW4yf.jpg">
ここでグラフの設定を行っていきます。

<img src="https://pbs.twimg.com/media/DoHgjcGUUAEt3hE.jpg">
このようにSOURCE に取得したデータのカラム名を設定し、
LABELなどには適当な値を設定します。

<img src="https://pbs.twimg.com/media/DoHg03tUYAEJfZC.jpg">
MEASUREとDIMENSIONに取得したデータをそれぞれ設定します。
Filterに関しては特に設定していません。

orderやwhereでフィルタをかけた方が早いと思います。

## グラフの表示

<img src="https://pbs.twimg.com/media/DoHhJbDUcAEKpb0.jpg">
APPLYボタンを押下するとグラフが描画されます。
これは棒グラフを選択した時の様子です。

<img src="https://pbs.twimg.com/media/DoHj1tAU8AA-F3p.jpg">
円グラフにするとこんな感じです。

<img src="https://pbs.twimg.com/media/DoHj2M3V4AESPJi.jpg">
これは何に使うのでしょうか。。。

他にも折れ線グラフなどが選択できます。

## 描画の設定

Chart Optionsから細かい設定を行うことができます。
<img src="https://pbs.twimg.com/media/DoHj28EV4AE-q72.jpg">
これは、グラフのラベルの設定などを変更してみました。

これがグラフ設定の一連の流れになると思います。

## 他

余談ですが操作中にアップデートの通知が来るとこんな感じになります。
<img src="https://pbs.twimg.com/media/DoHejSdUYAE6cpC.jpg">
とても邪魔ですが、Restart & Installを実行すると直前の作業の状態のまま復活します。

## 参考

https://tech-blog.s-yoshiki.com/2018/09/642/
