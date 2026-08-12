---
title: "【AtCoder】#110 反省会 C問題でLTEを連発。スクリプト言語でループゴリ押し計算はキツい"
path: "/entry/52"
date: "2018-09-24 00:11:15"
coverImage: "../../../images/thumbnail/no-image.png"
author: "s-yoshiki"
tags: ["競技プログラミング","atcoder"]
---

## 概要

AtCoder #110 に参加しました。
A、Bはいつも通り。10分程度でクリア。
Dも理解できそうな問題ではあったがパス。
問題はC。

問題内容自体は難しいと感じなかったが、いくつかのテストケースがどうしてもLTEとなってしまい、
それをズルズルと1時間以上はまり続け結局クリアできず。

## C問題

https://beta.atcoder.jp/contests/abc110/tasks/abc110_c

<blockquote>英小文字のみからなる文字列 S,Tが与えられます。
文字列 S に対して、次の操作を何度でも行うことができます。
操作: 2つの異なる英小文字
c1, c2 を選び、S に含まれる全ての c1 を c2 に、c2 を c1 に置き換える
0 回以上操作を行って、S を T に一致させられるか判定してください。</blockquote>

という問題である。

### LTEとなったコード

```js
function main(arg) {
  arg = arg.split('\n');
  var s = arg[0];
  var t = arg[1];

  for (var i = 0; i < t.length; i++) {
    var si = s[i].slice();
    var ti = t[i].slice();

    if (si === ti) {
      continue;
    }

    if (s === t) {
      break;
    }

    s = s.split(si).join(ti.toUpperCase());
    s = s.split(ti).join(si.toUpperCase());

    s = s.toLowerCase();
  }

  if (s.toLowerCase() === t) {
    console.log('Yes');
  } else {
    console.log('No');
  }
}
main(require('fs').readFileSync('/dev/stdin', 'utf8'));
```

全ての例題で与えられていたテストケースをクリアすることができたので、
問題ないだろうと提出。しかしながら、クリアできず。LTEとなる。
置換している部分のパフォーマンスがおそらく悪かったのだろう。そもそもYesかNoを出力するだけなので、配列操作自体が不要だった。

それに加え、大文字で置換した文字を小文字に倒している処理もありスマートではない。

JSじゃなかったらループゴリ押しで片付けられてたのかもしれないが。

### 解法

解説では、
「置換表を作った上で整合性が取れないものがあった場合、Noを出力するように実装する。文字列置換を愚直に行うな。」と言っている。

### 最速の解法 (?)

適当に調べていたら、こんなコードがあった。(元はPythonの提出の1つ)

```js
function main(arg) {
  arg = arg.split('\n');
  var s = arg[0];
  var t = arg[1];

  while (1) {
    if (s === '') {
      break;
    }

    s = s.split(s[0]).join('');
    t = t.split(t[0]).join('');

    if (s.length !== t.length) {
      console.log('No');
      return;
    }
  }
  console.log('Yes');
}
main(require('fs').readFileSync('/dev/stdin', 'utf8'));
```

なんていうか、目から鱗だった。
最良ではないかもしれないが、コードがシンプルで素敵。

## 結論

お算数力が足りない。ただそれだけ。以上。
