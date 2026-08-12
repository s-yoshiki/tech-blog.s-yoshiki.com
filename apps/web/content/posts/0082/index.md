---
title: "【AtCoder】ABCで初めてC問題が解けました。【ABC114】"
path: "/entry/82"
date: "2018-12-03 00:11:23"
coverImage: "../../../images/thumbnail/no-image.png"
author: "s-yoshiki"
tags: ["競技プログラミング"]
---

## はじめに AtCoderについて

http://osrehun.hatenadiary.jp/entry/2015/12/13/000716

AtCoder Beginner Contest、 通称ABCはAtCoderのコンテストの1つで初級〜中級者を対象としており、A、B、C、Dの4つの問題で構成されています。

ABCDの問題を難易度順に並べると、

```
A < B <<< 壁 <<< C <= D
```

といった難易度じゃないかと思います。

AB問題に関しては、基本的なプログラミングの文法を試されていますが、
C以降の問題は、数学的な考え方が要求されプログラムの文法だけでは戦えなくなるためAtCoder初心者の壁に成ると思います。

## はじめてC問題が解けました

https://beta.atcoder.jp/users/yoshiki1123

AtCoder Beginner Contest 114 (ABC114)で初めてC問題が解けました。
毎回C問題がギリギリのところで解けず、モヤモヤしていたのでとても嬉しいです。

ただ、いつものC問題よりも若干簡単なのかなとも思いました。

## C問題を解いた時のパフォーマンス

今回のレーティングのグラフです。
<img src="https://pbs.twimg.com/media/Dta4UZNV4AA3IVJ.jpg">
コンテスト内の順位は656位。
出したパフォーマンスは1021。
レーティングは468→554(+86)となりました。

C問題を解いたユーザの中では遅い方でしたが、パフォーマンスは1000を超えました。
安定的にパフォーマンス1000を超えるのであればC問題を解くのは必須と言えそうです。

緑までの道のりはまだ長そうです。以上。

## おまけ：解いた問題 C - 755

ちなみに今回提出してACとなった回答を紹介しておこうと思います。

### 問題

<blockquote>https://beta.atcoder.jp/contests/abc114/tasks/abc114_c

整数 Nが与えられます。
1以上N以下の整数のうち、七五三数 は何個あるでしょうか？

ここで、七五三数とは以下の条件を満たす正の整数です。
十進法で表記したとき、数字 7, 5, 3 がそれぞれ 1回以上現れ、これら以外の数字は現れない。

AtCoder ABC C - 755</blockquote>
という問題。

### 計算例

入力例

```
575
```

出力例

```
4
```

575以下の七五三数は、357,375,537,573の4個。

### 回答ソース JavaScript

```js
function main(arg) {
  arg = Number(arg.split('\n')[0]);

  var master = [0, 3, 5, 7];
  var counter = 0;

  for (var i = 0;; i++) {
    var tmp = String(i.toString(4));
    var _tmp = '';

    if (tmp.length < 3) {
      continue;
    }

    if (tmp.indexOf('0') !== -1) {
      continue;
    }

    var b = tmp.split('').filter(function(x, i, self) {
      return self.indexOf(x) === i;
    });

    if (b.length < 3) {
      continue;
    }

    for (var j = 0; j < tmp.length; j++) {
      _tmp += master[tmp[j]];
    }

    if (_tmp > arg) {
      break;
    }
    counter++;
  }
  console.log(counter);
}
main(require('fs').readFileSync('/dev/stdin', 'utf8'));
```

考え方的には、3,5,7から成り立つ3進数に変換して総当たりで解くという方法を考えました。
無事、ACとなりました。

## おまけ2

<blockquote class="twitter-tweet" data-lang="ja">
<p lang="ja" dir="ltr">AtCoderの時間(21:00)になったからAtCoderやろうと思って、臨戦態勢で待ってたら開始が24時間後だった

— s-yoshiki | スクリプトカス (@s_yoshiki_dev) <a href="https://twitter.com/s_yoshiki_dev/status/1068837979437690881?ref_src=twsrc%5Etfw">2018年12月1日</a></blockquote>

<script async="" src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
