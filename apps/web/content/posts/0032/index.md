---
title: "【JavaScript】AtCoderとかでも利用したい、ブラウザで動くエディタ + デバッグ環境を作る"
path: "/entry/32"
date: "2018-08-29 00:56:17"
coverImage: "../../../images/thumbnail/javascript-logo.png"
author: "s-yoshiki"
tags: ["javascript","semantic ui","競技プログラミング","atcoder","aceeditor"]
---

<blockquote class="twitter-tweet" data-lang="ja">

AtCoderとかで使いたいブラウザで動くJS用のエディタ + デバッグ環境を作りました。AceEditor とか使ってます。
来週からこれ使って頑張ります。<a href="https://t.co/KWI5MGDEnS">https://t.co/KWI5MGDEnS</a> <a href="https://t.co/xPXAV38YKk">pic.twitter.com/xPXAV38YKk</a>

— s-yoshiki | スクリプトカス (@s_yoshiki_dev) <a href="https://twitter.com/s_yoshiki_dev/status/1034472982901448704?ref_src=twsrc%5Etfw">2018年8月28日</a></blockquote>

<script async="" src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

## 概要

<del>AtCoder用の</del>自分用のJSデバッグ環境を作りました。
JSのみです。

<img src="https://pbs.twimg.com/media/DlsuIweUUAUWVOT.jpg">

## デモ

こちらから、

<script async="" src="//jsfiddle.net/s_yoshiki/g2pde37z/embed/result,js,html,css/dark/"></script>

<a href="//jsfiddle.net/s_yoshiki/g2pde37z/show">デモ ※外部ウィンドウが開きます。</a>

## ソース

これがソース。

```js
(() => {
  var src = document.getElementById('src');
  var dst = document.getElementById('dst');
  var run = document.getElementById('run');

  const editor = ace.edit('editor');
  editor.setTheme('ace/theme/monokai');
  editor.getSession().setMode('ace/mode/javascript');

  console.log = (v) => {
    dst.value += String(v) + '\n';
  };

  function getStdio() {
    return `
        let require = (arg)  => {
            return {
                readFileSync : (type, string_type) => {
                    return \`` + src.value + `\`
                }
            }
        }`;
  }

  run.addEventListener('click', () => {
    dst.value = '';

    let f = getStdio() + '\n';
    f += editor.getValue();
    try {
      let tmp = new Function(f);
      tmp();
    } catch (e) {
      dst.value = String(e);
    }
  });
})();
```

### 解説

簡単に解説すると、実行イベントが呼ばれるたびに、

```js
require.readFileSync;
```

の返り値を
テキストエリアの文字列を固定にした上で、入力したJSコードに埋め込んでいます。

さらに、

```js
let tmp = new Function(f);
```

の箇所でJS文字列を式として評価して実行しています。
Functionを使ってるコードってあんまりみたことがありませんが、
これを利用して、クロージャのようなもを作ったりすることができるそうです。

https://qiita.com/To_BB/items/bf4d6384f7dce47bb216

また、このソースに関してはFunctionではなくeval()でも問題ないと思います。

```js
console.log();
```

は強引に書き換えています。
引数が複数渡るとマズイ感じです。そのうち修正します。

エラーハンドリングに関してはかなり適切ではない気がしますが問題ないでしょう。

### AceEditor

また他の特徴として、<a href="https://ace.c9.io/">AceEditor</a>を使っています。

https://ace.c9.io/

### Semantic UI

CSSフレームワークとしてSemantic UIを使ってます。最近ハマってます。

https://semantic-ui.com/

## 追記 2019/05/04

改良版をGitHubで公開しました。

<a href="https://s-yoshiki.github.io/AtCoder-JsDebugger/#/">
https://s-yoshiki.github.io/AtCoder-JsDebugger/#/
</a>

## 背景

コードテストで毎回アップロードして数秒待たされるのも嫌だけど、ローカルサーバ立ててまで...
JSコードならブラウザで十分実行環境として成り立つのでは？？と思い作りました。
そもそもJSで参加してる人ってあんまりいない。
