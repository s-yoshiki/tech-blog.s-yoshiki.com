---
title: "github-markdown-cssを無理やりWordPressにねじ込んだ話"
path: "/entry/68"
date: "2018-11-10 17:27:00"
coverImage: "../../../images/thumbnail/github-logo.png"
author: "s-yoshiki"
tags: ["css3","github"]
---

## 概要

github-markdown-cssを既存のWordpressのテーマに組み込んだ話。
CSSとかあんまりわかってないけど、とりあえずキレイに動きました。

## github-markdown-cssについて

github-markdown-css

https://github.com/sindresorhus/github-markdown-css

## やったこと

<ul>
 	<li>
        github-markdown-cssのCDNをheadタグに埋め込む</li>
 	<li>
        bodyタグのclassに追加する</li>
 	<li>
        細かい調整。一部CSSの削除</li>
</ul>

### github-markdown-cssのCDNをheadタグに埋め込む

link属性として
`https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/2.10.0/github-markdown.css`
をheadタグに追加しました。

### bodyタグのclassに追加する

当たり前ですが、要素のclassにmarkdown-bodyが無いと適用されません。
wordpressのテーマを見るとベタで書くのが厳しかったので、JSで動的に属性を追加することにしました。

```js
(function(){document.body.classList.add("markdown-body");})();
```

これによってgithub-markdown-cssが反映されます。

### 細かい調整。一部CSSの削除

上記の方法は元のデザイン上書きしているため、おかしな箇所が出てくるかと思います。

特にhタグの中のaタグが青く表示されてしまっていたため、これを無効化しました。

例

```css
.markdown-body a{color:#000}
```

## ビフォーアフター

### ビフォー

<img src="https://pbs.twimg.com/media/DroIuyVVsAEjgl7.jpg">

<img src="https://pbs.twimg.com/media/DroIux2V4AAMjg5.png">

### アフター

<img src="https://pbs.twimg.com/media/DroIux4VYAA5Kzo.jpg">

<img src="https://pbs.twimg.com/media/DroIux2U0AE3N2V.png">

若干、原色を柔らかい色にする補正が入っているのは気のせいでしょうか...?

まあ、キレイになったのでよし

## 関連

https://qiita.com/__mick/items/c80fab6c185a41882880