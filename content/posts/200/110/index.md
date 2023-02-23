---
title: "JavaScriptで画像処理100本ノックに挑戦してみた"
path: "/entry/110"
date: "2019-03-27 19:26:05"
coverImage: "../../../images/thumbnail/javascript-logo.png"
author: "s-yoshiki"
tags: ["javascript","canvas","アルゴリズム","画像処理","vue.js","画像処理100本ノック"]
---

画像処理100本ノックをJavaScriptで挑戦してみました。
Qiitaでバズってるのを見かけて作りたくなりました。
「ブラウザ上で完結したら面白いな」 & 「デモを共有できたら面白い」という動機ではじめました。
まだいくつか問題を残していますが、ここまで解いてみた所感を書きます。

## 画像処理100本ノックについて

<a href="https://github.com/yoyoyo-yo/Gasyori100knock">https://github.com/yoyoyo-yo/Gasyori100knock</a>

画像処理が初めての人のための問題集です。
あの「自然言語処理100本ノック」をリスペクトしているのでしょうか。
**Qiitaでの紹介記事**

<a href="https://qiita.com/yoyoyo_/items/2ef53f47f87dcf5d1e14">https://qiita.com/yoyoyo_/items/2ef53f47f87dcf5d1e14</a>

ソースは全てPythonです。C++版の制作も進んでいるようです。

何よりも解説が日本語で書かれているところがありがたいです。

## JavaScriptで挑戦してみる

この画像処理100本ノックをJavaScriptで挑戦してみました。
Canvasを使って画像配列を操作できるので基本的な実装は難しくありませんでした。

### デモサイト

<img src="https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/82419/8c282e87-e882-1c82-5c55-ba0814b0dea3.gif">

GitHub Pages に置きました。

<a href="https://s-yoshiki.github.io/Gasyori100knockJS/">https://s-yoshiki.github.io/Gasyori100knockJS/</a>

### GitHub

<a href="https://github.com/s-yoshiki/Gasyori100knockJS">https://github.com/s-yoshiki/Gasyori100knockJS</a>

現在(2019/03/26)、約2ヶ月かけて40問目までクリアしましたが、後半に重い問題が多く残っているため、
100本クリアにはこれまで以上に時間がかかりそうです。

## フロントの実装について

フレームワークにVueJSを使っています。VueRouterなども用いてSPAとして動かしています。

## 問題の解説

<a href="https://tech-blog.s-yoshiki.com/2019/04/1103/">https://tech-blog.s-yoshiki.com/2019/04/1103/</a>

<a href="https://tech-blog.s-yoshiki.com/2019/04/1111/">https://tech-blog.s-yoshiki.com/2019/04/1111/</a>

<a href="https://tech-blog.s-yoshiki.com/2019/04/1115/">https://tech-blog.s-yoshiki.com/2019/04/1115/</a>

<a href="https://tech-blog.s-yoshiki.com/2019/04/1120/">https://tech-blog.s-yoshiki.com/2019/04/1120/</a>

<a href="https://tech-blog.s-yoshiki.com/2019/04/1125/">https://tech-blog.s-yoshiki.com/2019/04/1125/</a>

<a href="https://tech-blog.s-yoshiki.com/2019/04/1142/">https://tech-blog.s-yoshiki.com/2019/04/1142/</a>

<a href="https://tech-blog.s-yoshiki.com/2019/05/1225/">https://tech-blog.s-yoshiki.com/2019/05/1225/</a>

<a href="https://tech-blog.s-yoshiki.com/2019/05/1245/">https://tech-blog.s-yoshiki.com/2019/05/1245/</a>

## JSで挑戦するメリット・デメリット

ブラウザ上で動かせるのがJSを使う最大のメリットだと思います。
加えて、チャート系のライブラリが豊富なので、matplotlibに比べ、グラフィカルな表現がしやすいのも良い点だと感じました。

一方で、行列演算に関してはJSではnumjsやmath.jsといったものはありますが、
Numpyほど簡潔に行列の処理を書くことはできません。

(※今回のデモではアフィン変換などの行列演算を多用する箇所で math.js を使いました。)

また、フーリエ変換を実装しようとした際に複素数を利用しますが、
Pythonは「j」で扱えるのに対し、JSの場合は実部と虚部をそれぞれ実装する必要がありました。

改めてPython、Numpyの偉大さには感謝したいと思います。

## 関連
