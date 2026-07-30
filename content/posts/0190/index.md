---
title: "ハイフンとかマイナスとかダッシュとか"
path: "/entry/190"
date: "2020-03-23 01:07:30"
coverImage: "../../../images/thumbnail/wordpress-logo.png"
author: "s-yoshiki"
tags: ["小ネタ","雑談"]
---

ソースコードを読んでいたら、既存処理にとある文字列変換処理があった。

例 (ソースはイメージです)

```js
const convert = (arg) => {
  return arg.split('ー').join('‐');
};
```

いざテストをしようと思って、「—」を入力したら期待値が出なかった。

なぜならば、この処理は「ー（全角長音）」を「‐（全角ハイフン）」に変換しているので、「—(全角ダッシュ)」はスルーされるからだ。

## ハイフンに似た文字

気になったので色々調べたら、少なくとも以下の文字があることがわかった。

```
－（全角ハイフンマイナス）
-（半角ハイフンマイナス）
‐（全角ハイフン）
−（全角マイナス）
‒（フィギュアダッシュ）
—（全角ダッシュ(emダッシュ)）
–（二分ダッシュ(enダッシュ)）
―（ホリゾンタルバー）
ー（全角長音）
ｰ（半角長音）
─（罫線）
━（罫線） 
ㅡ(ウ(ハングルの字母))
ـ(カシーダ)
⁻(上付きマイナス)
₋(下付きマイナス)
⸺(2emダッシュ)
⸻(3emダッシュ)
```

※これらの文字のうち
「フィギュアダッシュ」「全角ダッシュ」「二分ダッシュ」「ウ(ハングルの字母)」「カシーダ」「上付きマイナス」「下付きマイナス」「2emダッシュ」「3emダッシュ」
はサロゲートペア

## 参考

<a href="https://ja.wikipedia.org/wiki/%E3%83%80%E3%83%83%E3%82%B7%E3%83%A5_(%E8%A8%98%E5%8F%B7)">ダッシュ (記号) - wikipedia</a>

<a href="https://ja.wikipedia.org/wiki/%E3%82%BD%E3%83%95%E3%83%88%E3%83%8F%E3%82%A4%E3%83%95%E3%83%B3">ソフトハイフン - wikipedia</a>

<a href="https://github.com/yuru7/HackGen/issues/6">ハイフンと似た記号の区別が付きやすくしてほしい · Issue #6 · yuru7/HackGen</a>

<!-- wp:embed {"className":"twitter-tweet"} -->
<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">－（全角ハイフンマイナス）
-（半角ハイフンマイナス）
‐（全角ハイフン）
−（全角マイナス）
‒（フィギュアダッシュ）
—（全角ダッシュ）
–（二分ダッシュ）
―（ホリゾンタルバー）
ー（全角長音）
ｰ（半角長音）
─（罫線）
━（罫線）
一（いち）
&mdash; kenmaz (@kenmaz) <a href="https://twitter.com/kenmaz/status/1231429228769378305?ref_src=twsrc%5Etfw">February 23, 2020</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
<!-- /wp:embed -->

<!-- wp:embed /-->
