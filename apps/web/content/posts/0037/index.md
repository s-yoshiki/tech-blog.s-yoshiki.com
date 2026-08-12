---
title: "AtCoder 109反省会。C問題が比較的に楽だったのに落としてしまった。あぁレート落ちるわ。"
path: "/entry/37"
date: "2018-09-09 01:01:53"
coverImage: "../../../images/thumbnail/atcoder-logo.jpg"
author: "s-yoshiki"
tags: ["競技プログラミング","atcoder"]
---

<blockquote class="twitter-tweet" data-lang="ja">今日のABCは比較的に楽だったからレート落ちそう。最悪<a href="https://twitter.com/hashtag/atcoder?src=hash&ref_src=twsrc%5Etfw">#atcoder</a>
— s-yoshiki | スクリプトカス (@s_yoshiki_dev) <a href="https://twitter.com/s_yoshiki_dev/status/1038429484297244672?ref_src=twsrc%5Etfw">2018年9月8日</a>
</blockquote>
<script async="" src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

## 概要

ABはいつも通り通過。Dはまあいいや。問題はC。

今日こそ落とすような問題ではなかったのにも関わらず

1ケースがどうしても通らずREのまま終わった。

今日は参加数が多かったのでなんとも言えないが、

多くの人が正解してたっぽいのでレートが落ちるのは確実。

ひとまず振り返る。

## C問題

### C -Skip

数直線上に N 個の都市があり、i 番目の都市は座標 xi にあります。

あなたの目的は、これら全ての都市を 1 度以上訪れることです。あなたは、はじめに正整数 D を設定します。

その後、あなたは座標 X から出発し、以下の移動 1、移動 2 を好きなだけ行います。

<ul>
<li>移動 1: 座標 y から座標 y+D に移動する</li>
<li>移動 2: 座標 y から座標 y−D に移動する</li>
</ul>
全ての都市を 1 度以上訪れることのできる D の最大値を求めてください。

ここで、都市を訪れるとは、その都市のある座標に移動することです。

### 例

入力

```
3 3
1 7 11
```

出力

```
2
```

### 引用

https://beta.atcoder.jp/contests/abc109/tasks/abc109_c

## 問題の考察：最小公倍数

とりあえず数値を並べてみると

```
1 7 11
```

スタートの3を加えてソート

```
1 3 7 11
```

数列の差を取得して

```
2 4 4
```

最小公倍数を計算する

```
2
```

と求めれば解けるんじゃないかなと考えた。

結論から言うと、解答例を見る限り、考え方的には間違っていたわけではなさそうである。
<a href="https://img.atcoder.jp/abc109/editorial.pdf">解答例:editorial.pdf</a>

## 提出ソース

上記を実装したのがこちら

```js
function gcd(a, b) {
  if (b === 0) {
    return a;
  }

  return gcd(b, a % b);
}

function main(arg) {
  arg = arg.split('\n');
  var tmp = arg[0].split(' ');
  var N = tmp[0];
  var X = tmp[1];
  var xi = arg[1].split(' ');

  xi.push(X);
  xi = xi.map(function(e) {
    return parseInt(e, 10);
  });

  xi.sort(function(a, b) {
    if (a > b) {
      return 1;
    }
    return -1;
  });

  if (xi.length === 2) {
    console.log(xi[1] - xi[0]);
    return;
  }

  var result = [];

  for (var i = 1; i < xi.length; i++) {
    result.push(xi[i] - xi[i - 1]);
  }

  result = result.filter(function(x, i, self) {
    return self.indexOf(x) === i;
  });

  if (result.length === 1) {
    console.log(result[0]);
    return;
  } else {
    while (1) {
      var _tmp = [];
      for (var j = 1; j < result.length; j++) {
        _tmp.push(gcd(
          result[j],
          result[j - 1],
        ));
      }
      if (_tmp.length === 1) {
        break;
      } else {
        result = _tmp;
      }
    }
    console.log(result[0]);
  }
}
main(require('fs').readFileSync('/dev/stdin', 'utf8'));
```

で提出結果がこちら。

<img src="https://pbs.twimg.com/media/DmlQqvVUcAEzDbH.jpg">
hand_1のテストケースの内容はわからなかったず....こいつのせいで30分以上苦しんだ。
最終的に通過したケースはこちら。

```js
function gcd(a, b) {
    if (b === 0)
        return a;

    return gcd(b, a % b);
}

function main(arg) {
    arg = arg.split("
")
    var tmp = arg[0].split(" ")
    var N = tmp[0]
    var X = tmp[1]
    var xi = arg[1].split(" ")
    
    X = Number(X)
    xi = xi.map(function(e){return Math.abs(parseInt(e,10)-X)})
    
    xi.sort(function(a,b) {
        if (a > b) {
            return 1
        }
        return -1
    })
    
    if (xi.length === 2) {
        console.log(xi[1] - xi[0])
        return
    }
    
    
    var result = []
    
    for (var i = 1; i < xi.length; i++ ){
        result.push(xi[i] - xi[i-1])
    }
    
    result = result.filter(function (x, i, self) {
        return self.indexOf(x) === i;
    });
    
    if (result.length === 1) {
        console.log(result[0])
        return
    } else {
        while(1) {
            var _tmp = [];
            for (var j = 1; j < result.length;j++) {
                _tmp.push(gcd(
                    result[j],
                    result[j-1]
                ))
            }
            if (_tmp.length === 1) {
                break;
            } else{
                result = _tmp
            }
        }
        console.log(result[0])
    }
}
main(require('fs').readFileSync('/dev/stdin', 'utf8'));
```

最小公倍数あたりに目をつけられたのは良かった点である。

初期の行列を始点となるポイントXの座標の値でオフセットすれば問題なく通るようだった。
これだけの差か残念だ〜。

## 今回おぼえたこと

ある2つの整数の最小公倍数を求める関数はこれ。

```js
function gcd(a, b) {
  if (b === 0) {
    return a;
  }

  return gcd(b, a % b);
}
```

## 他

### ブラウザで動くエディタ + デバッグ環境

https://tech-blog.s-yoshiki.com/2018/08/435/

以前作ったこれを初めて実戦投入したところ思ったよりも使い勝手がよかった。

次はもう少し改良して臨みたい。
そろそろアリ本を買おうかな

<iframe style="width:120px;height:240px;" marginwidth="0" marginheight="0" scrolling="no" frameborder="0" src="https://rcm-fe.amazon-adsystem.com/e/cm?ref=qf_sp_asin_til&t=yoshiki037-22&m=amazon&o=9&p=8&l=as1&IS2=1&detail=1&asins=4839941068&linkId=f7efb67a2807433e0ac834a35d364f7b&bc1=000000&lt1=_blank&fc1=333333&lc1=0066c0&bg1=ffffff&f=ifr"><br />
    </iframe>
