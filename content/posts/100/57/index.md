---
title: "【※サービス終了】イケてるSQLクライアント、TeamSQLを使ってみた！！接続から〜簡単なグラフ作成まで！"
path: "/entry/57"
date: "2018-09-28 02:10:17"
coverImage: "../../../images/thumbnail/mysql-logo.png"
author: "s-yoshiki"
tags: ["データベース","mysql"]
---

## 追記: 2019/06/24 「サービス終了したみたいです。」

サービス終了したみたいです。
こちらをお勧めしときます。

<a href="https://tech-blog.s-yoshiki.com/2018/09/663/">https://tech-blog.s-yoshiki.com/2018/09/663/</a>

## 概要

Qiitaで少し話題になってたイケてるSQLクライアント、TeamSQLを使ってみました。
とりあえず、接続するところから簡単なグラフの作成までを行ってみました。

ちなみにTeamSQLは2016年にはリリースしていたようです。

## TeamSQL?

https://teamsql.io

### 目的

<blockquote>Why Choose TEAMSQL
Cloud Storage & Saved SQL Queries
When you save your TeamSQL queries, they are then available to you no matter where you are. Powerful search functionality means that searching in the cloud is as easy as searching on your computer.

TeamSQL allows you to save and manage Oracle, MySQL, PostgreSQL, Microsoft SQL Server, Amazon Redshift SQL files or Redis commands using the Cloud Storage area.

- https://teamsql.io/</blockquote>
と言っています。

チームでSQLを共有するために、実行したSQLがクラウドに保存されるということなのでしょうか。
その辺はもう少し調べて見ます。

### 対応データベース

Oracle、MySQL、PostgreSQL、Microsoft SQL Server、Amazon Redshift SQL、Redis　に対応

将来的にはMonogoDB、Elastic、SQLiteにも対応するようです。

### 対応OS

Windows、Mac、Linux

## How to use?

### SQL接続

<img src="https://pbs.twimg.com/media/DoHVpiWVAAA8-6b.jpg">
アプリケーションを起動した時の様子です。
Create a connectionから接続先の情報を作成します。

<img src="https://pbs.twimg.com/media/DoHVaQhV4AAQRyn.jpg">
こんな感じに入力します。

### SSHトンネリング

<img src="https://pbs.twimg.com/media/DoHVfADUUAIBWpz.jpg">
オプションの設定でSSHトンネリングを利用した接続を行うこともできます。

## SQLを実行する

とりあえずWordPressのDBに接続して遊んでみました。

<img src="https://pbs.twimg.com/media/DoHZ9R9VsAAh0ac.jpg">
接続が成功するとこんな画面になります。
サイドバーに表示されているのが選択したデータベースの情報です。
真ん中に見えるエディタからSQLを入力し実行します。

<a><img src="https://pbs.twimg.com/media/DoHXpVkUwAEMTbT.jpg">
エディタのUIも優秀です。補完機能が働きます。MonacoEditorぽいですね。
</a><a href="https://tech-blog.s-yoshiki.com/2018/09/585/">Monaco Editorを使ってブラウザ上で動くAtCoder用のデバッグアプリを作る【JS】</a>

<img src="https://pbs.twimg.com/media/DoHX1qvUYAAOnaf.jpg">
SQLの実行に失敗した時はこんな感じになります。

## グラフの描画

https://tech-blog.s-yoshiki.com/2018/09/645/

↑長くなったのでこちらに移しました。↑

こんな感じでグラフを作ることができます。

<img src="https://pbs.twimg.com/media/DoHj28EV4AE-q72.jpg">

## その他の機能

### 拡張機能の導入

<img src="https://pbs.twimg.com/media/DoHXrM7UcAA6RJ3.jpg">
VScodeみたいに拡張機能を追加できるようです。

### 履歴

<img src="https://pbs.twimg.com/media/DoHVl_gUcAA0ENT.jpg">
いつどんなSQLが実行されたかをこんな感じで確認することができます。

## 参考

https://tech-blog.s-yoshiki.com/2018/09/645/

https://qiita.com/shunichi_com/items/b07ae8c678aa7c0e2ff6

http://www.ksakae1216.com/entry/2018/09/24/073000