---
title: "JavaScriptでワーシャルフロイド法を実装"
path: "/entry/198"
date: "2020-06-21"
coverImage: "../../../images/thumbnail/javascript-logo.png"
author: "s-yoshiki"
tags: ["javascript", "アルゴリズム", "競技プログラミング"]
---

## 概要

AtCoder ABC012 の D問題でワーシャルフロイド法が利用できる問題が出てきたので、
JavaScriptで実装しました。

## AtCoder ABC012 D問題

### [D - バスと避けられない運命](https://atcoder.jp/contests/abc012/tasks/abc012_4)

問題内容を簡潔に表現すると

**ルール**

```
N M
a1 b1 t1
a2 b2 t2
:
aM bM tM
```

- N ( 2 <= N <= 300 )
- M ( N-1 <= M <= 44850 )
- ai,bi ( 1 <= ai,bi <= N )
- ti (1 <= ti <= 1000)
- ai != bi

ai と bi は座標を表しており、ti は ai と bi 間の距離である。

求めたいものは
ある一つの選択した座標から自身以外の他の全ての座標までの距離を求めその中から最長の物を選ぶ。
この最長の距離がM個の座標の中で最も小さくなるようなものを答えとして出力する。

**サンプル**

入力値が次の場合を考える。

```
3 2
1 2 10
2 3 10
```

1から2までの距離は10、1から3までの距離は20、2から3までの距離は10となる。

よって2を選択したときに最大の距離が10となるため、10を出力する。

### 解説

<iframe src="//www.slideshare.net/slideshow/embed_code/key/gBGKzx60ZPcNHu?startSlide=19" width="595" height="485" frameborder="0" marginwidth="0" marginheight="0" scrolling="no" style="border:1px solid #CCC; border-width:1px; margin-bottom:5px; max-width: 100%;" allowfullscreen> </iframe> <div style="margin-bottom:5px"> <strong> <a href="//www.slideshare.net/chokudai/abc012" title="AtCoder Beginner Contest 012 解説" target="_blank">AtCoder Beginner Contest 012 解説</a> </strong> from <strong><a href="//www.slideshare.net/chokudai" target="_blank">AtCoder Inc.</a></strong> </div>

## 実装

```js
'use strict';
function main(arg) {
  let tmp = arg.trim().split('\n').map(e => e.split(' ').map(Number));
  const V = tmp[0][0];
  const E = tmp[0][1];
  tmp.shift();
  let data = tmp;

  const MAX = 10e9;
  let graph = Array.from(new Array(V), () => new Array(V).fill(MAX));

  for (let i = 0; i < data.length; i++) {
    let a = data[i][0] - 1;
    let b = data[i][1] - 1;
    let t = data[i][2];
    graph[a][b] = t;
    graph[b][a] = t;
  }

  // ワーシャルフロイド
  for (let k = 0; k < V; k++) {
    for (let i = 0; i < V; i++) {
      for (let j = 0; j < V; j++) {
        graph[i][j] = Math.min(graph[i][j], graph[i][k] + graph[k][j]);
        if (i === j) {
          graph[i][j] = 0;
        }
      }
    }
  }

  // console.log(JSON.stringify(graph,null,' '));

  let ans = 10e9;
  let max_temp = 0;

  for (let i = 0; i < V; i++) {
    for (let j = 0; j < V; j++) {
      if (max_temp < graph[i][j]) {
        max_temp = graph[i][j];
      }
    }
    if (ans > max_temp) {
      ans = max_temp;
    }
    max_temp = 0;
  }

  console.log(ans);
}
main(require('fs').readFileSync('/dev/stdin', 'utf8'));
```

入力値が

```
3 2
1 2 10
2 3 10
```

だった場合、
ワーシャルフロイドで計算された変数`graph`は次のようになる。

```json
[[20, 10, 20], [10, 20, 10], [20, 10, 20]]
```

この2次元配列の行の中の最大値が一番小さいものを求めればOK
