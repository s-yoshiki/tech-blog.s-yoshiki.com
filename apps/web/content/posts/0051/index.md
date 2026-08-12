---
title: "Monaco Editorを使ってブラウザ上で動くAtCoder用のデバッグアプリを作る【JS】"
path: "/entry/51"
date: "2018-09-23 14:52:57"
coverImage: "../../../images/thumbnail/javascript-logo.png"
author: "s-yoshiki"
tags: ["javascript","atcoder","monaco editor"]
---

## 概要

https://tech-blog.s-yoshiki.com/2018/08/435/

以前書いた「<a href="https://tech-blog.s-yoshiki.com/2018/08/435/">【JavaScript】AtCoderとかでも利用したい、ブラウザで動くエディタ + デバッグ環境を作る</a>」を流用して、エディタ機能に「Monaco Editor」を利用した、AtCoder用のデバッグ環境を作りました。

<a href="https://github.com/Microsoft/monaco-editor"> Monaco Editor </a>とはMicrosoft謹製のエディタ「VisualStudioCode」でも使われているエディタ機能のJavascriptライブラリです。

以前はAceEditorを利用して作成した機会があったので、それらを比較した感想も書きました。

## デモ

デモです。

<script async="" src="//jsfiddle.net/s_yoshiki/4mkj6fav/embed/result,js,html,css/dark/"></script>

https://jsfiddle.net/s_yoshiki/4mkj6fav/show

## 他のJavaScript製エディタと比べて

<script type="text/javascript" src="https://ssl.gstatic.com/trends_nrtr/1544_RC03/embed_loader.js"></script> <script type="text/javascript"> trends.embed.renderExploreWidget("TIMESERIES", {"comparisonItem":[{"keyword":"Ace Editor","geo":"","time":"today 5-y"},{"keyword":"CodeMirror","geo":"","time":"today 5-y"},{"keyword":"Monaco Editor","geo":"","time":"today 5-y"}],"category":0,"property":""}, {"exploreQuery":"date=today%205-y&q=Ace%20Editor,CodeMirror,Monaco%20Editor","guestPath":"https://trends.google.co.jp:443/trends/embed/"}); </script>

Ace Editor VS CodeMirror VS Monaco Editor

軽く触れた感想ですが、Monaco EditorはAce Editorなどと比べて特に優れていると感じた点は、

<ul>
 	<li>インテリセンス機能が強い</li>
 	<li>日本語入力が安定している</li>
</ul>
という点であると思います。

Visual Studio Codeを利用している人でればわかるかと思いますが、
インテリセンス機能が利用できます。
<img src="https://pbs.twimg.com/media/DnwYxNMU8AEYy1k.jpg">

また、AceEditorなどは日本語を入力した際のチラツキがとても気になりますが、
Monaco Editorにはありませんでした。

APIについてもたくさんの機能があるため、
もう少し使用してみたら記事にしてみようと思います。

## 追記 2019/05/04

改良版をGitHubで公開しました。

<a href="https://s-yoshiki.github.io/AtCoder-JsDebugger/#/">
https://s-yoshiki.github.io/AtCoder-JsDebugger/#/
</a>

## 参考

https://tech-blog.s-yoshiki.com/2018/08/435/

https://github.com/Microsoft/monaco-editor
