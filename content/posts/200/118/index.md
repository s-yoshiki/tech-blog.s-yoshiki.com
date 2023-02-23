---
title: "ブラウザで動くAtCoder用のデバッガを作ってみた (JSのみ)"
path: "/entry/118"
date: "2019-05-02 14:06:03"
coverImage: "../../../images/thumbnail/javascript-logo.png"
author: "s-yoshiki"
tags: ["javascript","競技プログラミング","atcoder","monaco editor","vue.js","bootstrap"]
---

## 概要

ブラウザで完結するAtCoder用のデバッガを作ってみました。
対応言語は(JS)のみになっています。
というのも、書いたコードをブラウザ上でeval関数に突っ込んでいるだけの実装だからです。
ブラウザ上で他の言語をサポートする仕組みがあれば、対応言語を増やしたいと思っています。
※ローカルサーバを絡めるならJS以外の言語対応の実装も難しくないと思うので需要があったら作ります。

## AtCoder-JsDebugger

<a href="https://s-yoshiki.github.io/AtCoder-JsDebugger/#/">https://s-yoshiki.github.io/AtCoder-JsDebugger/#/</a>

## 説明

トップ(エディタ)ページの左側がエディタ、右側が標準入出力となっています。
テーマカラーやページの初期状態で表示でされるスニペットは設定から変更することができます。

## フレームワーク、ライブラリなど

JSフレームワークにVue、cssのフレームワークにBootstrap
エディタの部分のライブラリにMonaco Editorを使っています。
