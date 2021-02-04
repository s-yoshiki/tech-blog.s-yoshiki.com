---
title: "初めて参加したAtCoderで惨敗した話"
path: "/entry/21"
date: "2018-07-23 00:10:36"
coverImage: "../../../images/thumbnail/atcoder-logo.jpg"
author: "s-yoshiki"
tags: ["javascript","競技プログラミング","atcoder","node.js"]
---
<blockquote class="twitter-tweet" data-lang="ja">
<p lang="ja" dir="ltr">初めて参加したAtCoderで惨敗した話

「AtCoder Beginner Contest 103」<a href="https://t.co/nUS8TREsNG">https://t.co/nUS8TREsNG</a>

2018/07/21。初めてatcoderに軽いノリで参戦しました。
惨敗しました。

敗因と対策を書きます。<a href="https://twitter.com/hashtag/AtCoder?src=hash&ref_src=twsrc%5Etfw">#AtCoder</a> <a href="https://twitter.com/hashtag/%E3%83%97%E3%83%AD%E3%82%B0%E3%83%A9%E3%83%9F%E3%83%B3%E3%82%B0?src=hash&ref_src=twsrc%5Etfw">#プログラミング</a><a href="https://twitter.com/hashtag/javascript?src=hash&ref_src=twsrc%5Etfw">#javascript</a> <a href="https://t.co/klmEb4bDZq">https://t.co/klmEb4bDZq</a>

— s_yoshiki (@s_yoshiki_dev) <a href="https://twitter.com/s_yoshiki_dev/status/1021050983097368576?ref_src=twsrc%5Etfw">2018年7月22日</a></blockquote>
<script async="" src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

## 概要

2018/07/21。

特に事前調査もせず軽いノリで
AtCoderに初めて参戦しました。

そして惨敗しました。

敗因を書きます。

## 状況

今回、参戦したのは「AtCoder Beginner Contest 103」
<a href="https://beta.atcoder.jp/contests/abc103">https://beta.atcoder.jp/contests/abc103</a>
100分
言語は全4門ともJavaScript(nodejs)を選択。

そして....

## 結果

 - 順位 1810/2188 位
 - 得点 300/1000点
 - パフォーマンス 346
 - レーティング 17

 - A :100 :○
 - B :200 :○
 - C :300 :×
 - D :400 :×

2完。
しかもB問題に少し手間取ったため、レーティングも伸びず。
C問題がクリアできれば、半分より上の順位には入れそうであった。

## 敗因

ざっと思いつく敗因は以下の通り。

- 標準入出力に手間取りロジックを考える時間が奪われてしまったこと。
- 数学的な基礎知識の欠如
- 配列操作に手こずった

### 標準入出力に手間取りロジックを考える時間が奪われてしまったこと。

完全に標準入出力を忘れてました。
ここで数分ロスしてしまいました。

### 数学的な基礎知識の欠如

今回の問題は

入力値を a b c ... とした時

**
f(X) = (a mod X) + (b mod X) + (c mod X) + .....
**

で、f(X)が最大になる時のXを求める問題です。

頭では解けたつもりだったが、
どうしてもタイムオーバ(TLE)してしまいクリアできず。

**
X = (a + b + c + ....) - length(a + b + c + ....)
**

でクリアしている人がおり全く理解できなかった。
とにかく数学的な基礎知識が欠けているんだなと思った。

全探索のような実装でも解けるけど、問題の意図は、
効率的な方法を実装をしなければならないということだと感じました。

### データ操作に手こずった

標準入出力から受け取った文字列を任意のデータにするのに時間がかかってしまいました。
回答中に基本的な配列操作方法をググりだしてしまう始末。

そもそも
pop push shift unshift などは、実装時にパッと浮かばなきゃマズイと思いました。

と言うわけで

## 対策

### 標準入出力の処理をテンプレ化する

AtCoderの問題形式は必ず標準入出力で変数の受け取り、回答の出力を行うので
開始したらとりあえずこれをコピペする(言語でjsを選択した場合)。

まずは、このフォーマットに沿って書けば問題ないかと思います。

```js
function main(arg) {
    // 処理
    console.log(arg)
}
main(require('fs').readFileSync('/dev/stdin', 'utf8'));

```

### 配列操作等の基本操作を完璧にする

pop push shift unshift あたりの基本操作は完璧にする。
この辺を押さえてないとB問題すら解けるか怪しくなると思います

加えて、jsの場合

```js
arr.sort((a,b) => {
    if (a > b) {
        return 1
    } else {
        return -1
    }
})

```

で簡単にソートができます。

他にも配列操作のメソッドであれば、map、forEach、fillter、といった便利な機能が用意されています。

スクリプト言語を使うのであれば、標準で用意されている配列操作などのメソッドを覚えておくことで、自分でソートなどのロジックを書くことが省けると思います。

### スニペットを用意しておく

全加算、全乗算、素数判定、ソートとかの頻繁に出てきそうな処理はスニペットにすると良いかといます。

多分そうやってやっている人もいるんじゃないかな...
<a href="https://qiita.com/kyamuise/items/dad162a7360408c9332d">GolangでAtCoderの問題を解くためのスニペット集</a>

### 数をこなす / アルゴリズムの基礎知識の向上

細かいテクニックがどうであれ、基本的なアルゴリズムを押さえてないとそもそも太刀打ちできません。

http://osrehun.hatenadiary.jp/entry/2015/12/13/000716

↑ここでも書かれているように、
「探索」や「データ構造」といったアルゴリズムを一つづつ押さえていくことがC、D問題への最短経路になると思います。

まだまだ問題の傾向がつかめていないところもあるので、
まずは、ある程度ABCに参加して傾向を掴みたいと思います。

## AtCoderとかでも利用したい、ブラウザで動くエディタ + デバッグ環境を作る ※追記 2018/08

https://tech-blog.s-yoshiki.com/2018/09/585/

Microsoft謹製のエディタ「Visual Studio Code」でも使われているエディタ機能のJavascriptライブラリ「MonacoEditor」を使って自分専用のデバッグ環境を作りました。

## AtCoderで初めて色がつくまでの話(茶色) ※追記 2018/11

https://tech-blog.s-yoshiki.com/2018/11/778/

<img src="https://pbs.twimg.com/media/DsyINmHUcAAQsyU.jpg">

AtCoderで、ついに色がつきました。茶色になりました。
始めた当初は、はっきり言って茶色なんて大したことのないランクだと思っていました。
ここまで来るのに4ヶ月、回数にして10回目の参加での到達で想定よりも時間がかかってしまいました。

また、上記の改良版をGitHubで公開しました。

<a href="https://s-yoshiki.github.io/AtCoder-JsDebugger/#/">
https://s-yoshiki.github.io/AtCoder-JsDebugger/#/
</a>

## ※追記 | 【AtCoder】ABCで初めてC問題が解けました。 ※追記 2018/12

https://tech-blog.s-yoshiki.com/2018/12/830/

コンテスト内の順位は656位(/1736)。
出したパフォーマンスは1021。
レーティングは468→554(+86)となりました。

C問題を解いたユーザの中では遅い方でしたが、パフォーマンスは1000を超えました。
安定的にパフォーマンス1000を超えるのであればC問題を解くのは必須と言えそうです。

(※ABC問題)