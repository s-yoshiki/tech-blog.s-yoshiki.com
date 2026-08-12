---
title: "AtCoderで初めて色がつくまでの話(茶色) レートが中々上がらなかった原因"
path: "/entry/74"
date: "2018-11-25 02:11:50"
coverImage: "../../../images/thumbnail/no-image.png"
author: "s-yoshiki"
tags: ["アルゴリズム","競技プログラミング","雑談"]
---

<blockquote class="twitter-tweet" data-lang="ja">
<p lang="en" dir="ltr">Performances of yoshiki1123  (2018-07-21〜2018-11-24) <a href="https://t.co/CY3NktJtde">https://t.co/CY3NktJtde</a> <a href="https://twitter.com/hashtag/AtCoder_Performances?src=hash&ref_src=twsrc%5Etfw">#AtCoder_Performances</a> <a href="https://t.co/eXzYu4lVtm">pic.twitter.com/eXzYu4lVtm</a>

— s-yoshiki | スクリプトカス (@s_yoshiki_dev) <a href="https://twitter.com/s_yoshiki_dev/status/1066348147969060864?ref_src=twsrc%5Etfw">2018年11月24日</a></blockquote>

<script async="" src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

## はじめに

AtCoderで、ついに色がつきました。茶色になりました。
始めた当初は、はっきり言って茶色なんて大したことのないランクだと思っていました。

というのも、ある程度ランクが高い人のコンテスト成績表をみると、最初の2〜3回でだいたい灰色を卒業をしており、特に高い人は1回目で茶色に到達している人いたので...全くのプログラミング初心者ではない自分も、少し回を重ねるだけで到達する程度のものだと思ってました(謎の自信)。

しかし、ここまで来るのに4ヶ月、回数にして10回目の参加での到達で想定よりも時間がかかってしまいました。

## 初めての参加

https://tech-blog.s-yoshiki.com/2018/07/294/

初めての参加は、勢いで参加し、事前調査もせずぶっつけ本番で挑みました。
標準入出力から値を受け取るだけで、四苦八苦してしまい結果も散々でした。

## 3回目くらいで雰囲気を掴む

https://tech-blog.s-yoshiki.com/2018/08/421/

3回目の出場くらいで問題の雰囲気や傾向、コツがわかりました。
もちろん、しっかりと対策を立てた上で1回目から出場していれば最初の数回を棒に振ることもありませんでしたし、
低レートを叩き出すこともありませんでした。

## 苦戦した原因

ここまで時間がかかった要因は、単純な実力不足ですが、強いて他の理由をあげるのであれば、
上にも書いたように、最初の数回で連続で低スコアを出してしまい、レートが上がりづらい傾向が出ていたのではないかと思います。
まず、そもそもAtCoderの仕様として、リセマラ封じのためによっぽど成績が良くない限り、最初の数回は実力よりも低いレートになるようです。

<blockquote class="twitter-tweet" data-lang="ja">
<p lang="ja" dir="ltr">「AtCoderのレーティングは10回以上参加しないと信用できない」はちょっと嘘で、「10回程度までは低く出てる可能性が高い」という感じ。表示されるレーティングは常に「99%の確率でこのレーティング以上の実力がある」という基準なので、上側はともかく下側は気にしないでいいよ。

— chokudai(高橋 直大) (@chokudai) <a href="https://twitter.com/chokudai/status/829601624502919168?ref_src=twsrc%5Etfw">2017年2月9日</a></blockquote>

<script async="" src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
<blockquote class="twitter-tweet" data-lang="ja">
<p lang="ja" dir="ltr">AtCoderは、初回のレーティング補正が-1200とかかかってるから、かなり初回のレーティング厳しいサイトなんだけど、これくらい補正かけないと、リセマラみたいな手が有効になっちゃうのよね。（一応、100回に1回くらいはリセマラで本来の実力より高いレートが出せます）

— chokudai(高橋 直大) (@chokudai) <a href="https://twitter.com/chokudai/status/914048306661138433?ref_src=twsrc%5Etfw">2017年9月30日</a></blockquote>

<script async="" src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

## レートの上がり方について

<img src="https://pbs.twimg.com/media/DsyINmHUcAAQsyU.jpg" alt="">

最初の数回は、悪いスコアを連続で叩き出していたたため、上がり方が緩やかな感じでした。
何回かやっていくうちに、ABCのCD問題をクリアするのは厳しいと思い、AB問題に全力で取り組むことに集中しました。

具体的にはAB問題を5分前後で解くようにしました。

これだけでも、パフォーマンスを700〜1000程度出すことができました。

## 各問題の内容と必要になる思った知識 - ABCの場合

レベル感としては

A <= B <<< 壁 <<< C < D

のようだと感じています。

A問題に関しては、基本的な四則演算、プログラミング構文、

B問題は、上記の要素に加え、配列操作やソート、マップなどが使えること(FizzBuzz程度)、

C、D問題は、基本的なアルゴリズムを押さえておかないと解くのは厳しいかと思います。

## ツール

また、初期にレートが上がらなっかた要因として、開発しやすい環境を整えなかったことも一つだと思います。
AtCoder上にコードテストする機能があり、それを使って最初の数回はデバッグしていましたが、自分用の環境を整えてデバッグするようにしました。

https://tech-blog.s-yoshiki.com/2018/09/585/

## レート感の話

<blockquote class="twitter-tweet" data-lang="ja">

<p lang="ja" dir="ltr">AtCoderは、プログラミング入門者はまず茶色、初級者は緑、そこそこ出来る人は水色を目指しましょう、というのがオススメで、水色まで行けば十分すごいです。
（多分PaizaのSランクみたいにちょっと箔をつけてあげないとダメなんだろうなって思ってる）

— chokudai(高橋 直大) (@chokudai) <a href="https://twitter.com/chokudai/status/950891657007779840?ref_src=twsrc%5Etfw">2018年1月10日</a></blockquote>

<script async="" src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

プログラマとしては最低、緑くらいなきゃ厳しいのかな...がんばろ
終わり
