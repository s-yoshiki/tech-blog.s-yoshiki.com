---
title: "WordPressに貼り付けたコードが等幅フォントで表示されないのでcssを適用して修正する。highlight.js"
path: "/entry/55"
date: "2018-09-27 18:47:08"
coverImage: "../../../images/thumbnail/wordpress-logo.png"
author: "s-yoshiki"
tags: ["css3","wordpress"]
---

## 概要

WordPressのコードハイライトにhighlight.jsを利用してますが、
なぜかフォントが等幅で表示されなかったので、カスタマイズ機能からcssを適用した話。

highlight.jsに関しては利用しているテーマ：<a href="https://wp-cocoon.com/">cocoon</a>の機能のものを利用。

https://wp-cocoon.com/

## 追加したcss

以下のようなcssを適用しています。
line-heightはこだわりがあったので、1.5としています。

ここで" .entry-content "はハイライトエリアに適用するclassとしています。

```css
.entry-content pre {	
    font: normal 10pt Consolas, Monaco, monospace;
    font-style: normal;
    font-variant-ligatures: normal;
    font-variant-caps: normal;
    font-variant-numeric: normal;
    font-variant-east-asian: normal;
    font-weight: normal;
    font-stretch: normal;
    font-size: 10pt;
    /* line-height: normal; */
    font-family: Consolas, Monaco, monospace;
    line-height: 1.5;
}
```

ビフォー
<img src="https://pbs.twimg.com/media/DoF18GXUwAQSgn2.jpg">

↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓

アフター
<img src="https://pbs.twimg.com/media/DoF18GYV4AE3_kD.jpg">

うまく適用出ているのがわかるかと思います。

余談ですが、highlight.jsのテーマはmonokaiを利用しています。
