---
title: "世界最悪のログイン処理のソースコードが見つかった。"
path: "/entry/26"
date: "2018-08-12 01:06:10"
coverImage: "../../../images/thumbnail/no-image.png"
author: "s-yoshiki"
tags: ["小ネタ"]
---

<blockquote class="twitter-tweet" data-lang="ja"><p lang="ja" dir="ltr">確かにこれは最悪だ。どんなサービスに使われてたのか気になる。<a href="https://t.co/vhSBieJ6EU">https://t.co/vhSBieJ6EU</a>
&mdash; s-yoshiki | スクリプトカス (@s_yoshiki_dev) <a href="https://twitter.com/s_yoshiki_dev/status/1028297331345485824?ref_src=twsrc%5Etfw">2018年8月11日</a></blockquote>

<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

そして、これがソースコード。
<img src="https://i.redd.it/auvi7ijfursy.png">
SELECT *...が目に入った瞬間に、「おおこれは...」と思ったが、他にも酷い部分がたくさんある。
SQL文を直接投げているの時点でもうアレだが、全件取得した上でループ処理を走らせているのがとても気になる。WHERE句使わんかったのかと...

apiServiceに関しても、もはやなんのAPIなのか。

Cookieも1秒でexpireされる上に、"yes"がセットされる...！？！？！？

if ("true" === "true") {はコードを読んでいて久々に感動した。

まあ、redditなんでネタなんだろうとは思いますが、
「todo: put this in a different file!!!」にもあるように正しいものが置かれることを期待してます。

## ソース

<a href="https://www.reddit.com/r/programminghorror/comments/66klvc/this_javascript_code_powers_a_1500_user_intranet/">https://www.reddit.com/r/programminghorror/comments/66klvc/this_javascript_code_powers_a_1500_user_intranet/</a>

<blockquote class="twitter-tweet" data-lang="ja"><p lang="ja" dir="ltr">世界最悪のログイン処理コード。\n実際のサービスで可動していたものだとか……<a href="https://t.co/C2bG93ZCkj">https://t.co/C2bG93ZCkj</a> <a href="https://t.co/EfVNAEslrn">pic.twitter.com/EfVNAEslrn</a>
&mdash; はっしー@海外プログラマ??元社畜 (@hassy_nz) <a href="https://twitter.com/hassy_nz/status/1027890455940198400?ref_src=twsrc%5Etfw">2018年8月10日</a></blockquote>

<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
