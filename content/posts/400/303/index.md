---
title: "[Unicode]スペース以外の見えない空白文字の一覧"
path: "/entry/303"
date: "2022-02-18 16:00"
coverImage: "../../../images/thumbnail/linux-logo.png"
author: "s-yoshiki"
tags: ["javascript"]
---

## はじめに

スペースや全角スペース以外にもいくつか存在する目に見えない Unicode 文字の一覧です。

## スペースや全角スペースのような空白文字一覧

ブラウザや環境によっては表示されない場合があると思います。

| Unicode | 実体 | 説明                                       | description                  |
| ------- | --- | ------------------------------------------ | ---------------------------- |
| U+0009  | `	` | 水平タブ(長い空白)                         | CHARACTER TABULATION         |
| U+0020  | ` ` | スペース                                   | SPACE                        |
| U+00A0  | ` ` | 自動改行を防ぐ固定スペース                 | NO-BREAK SPACE               |
| U+00AD  | `­` | ソフトハイフン                             | SOFT HYPHEN                  |
| U+034F  | `͏` | 結合文字の作成                             | COMBINING GRAPHEME JOINER    |
| U+061C  | `؜` | アラビア文字のテキスト方向                 | ARABIC LETTER MARK           |
| U+115F  | `ᅟ` | ハングル朝鮮語フィラー                     | HANGUL CHOSEONG FILLER       |
| U+1160  | `ᅠ` | ハングル中文フィラー                       | HANGUL JUNGSEONG FILLER      |
| U+17B4  | `឴` | クメール語の母音固有の aq                  | KHMER VOWEL INHERENT AQ      |
| U+17B5  | `឵` | クメール語の母音固有の aa                  | KHMER VOWEL INHERENT AA      |
| U+180E  | `᠎` | モンゴル語の母音セパレータ                 | MONGOLIAN VOWEL SEPARATOR    |
| U+2000  | ` ` | en クワッド(2 分の 1em)                    | EN QUAD                      |
| U+2001  | ` ` | em クワッド(em は現在のフォントの高さ)     | EM QUAD                      |
| U+2002  | ` ` | en スペース                                | EN SPACE                     |
| U+2003  | ` ` | em スペース                                | EM SPACE                     |
| U+2004  | ` ` | 3 分の 1em 幅のスペース                    | THREE-PER-EM SPACE           |
| U+2005  | ` ` | 4 分の 1em 幅のスペース                    | FOUR-PER-EM SPACE            |
| U+2006  | ` ` | 6 分の 1em 幅のスペース                    | SIX-PER-EM SPACE             |
| U+2007  | ` ` | 固定幅の数字と同じ幅のスペース             | FIGURE SPACE                 |
| U+2008  | ` ` | ピリオドと同じ幅のスペース                 | PUNCTUATION SPACE            |
| U+2009  | ` ` | 6 分の 1em ～ 4 分の 1em のシンスペース    | THIN SPACE                   |
| U+200A  | ` ` | シンスペースよりさらに狭いヘアスペース     | HAIR SPACE                   |
| U+200B  | `​` | ゼロ幅スペース                             | ZERO WIDTH SPACE             |
| U+200C  | `‌` | ゼロ幅ノンジョイナー                       | ZERO WIDTH NON-JOINER        |
| U+200D  | `‍` | ゼロ幅ジョイナー                           | ZERO WIDTH JOINER            |
| U+200E  | `‎` | 左から右へのマーク                         | LEFT-TO-RIGHT MARK           |
| U+200F  | `‏` | 右から左へのマーク                         | RIGHT-TO-LEFT MARK           |
| U+202F  | ` ` | 狭い改行無しスペース                       | NARROW NO-BREAK SPACE        |
| U+205F  | ` ` | 中程度の数学的(18 分の 4em)スペース        | MEDIUM MATHEMATICAL SPACE    |
| U+2060  | `⁠` | ワードジョイナー(ゼロ幅の改行無しスペース) | WORD JOINER                  |
| U+2061  | `⁡` | 関数の適用                                 | FUNCTION APPLICATION         |
| U+2062  | `⁢` | 2 項の乗算を示す                           | INVISIBLE TIMES              |
| U+2063  | `⁣` | 2 項のセパレータ                           | INVISIBLE SEPARATOR          |
| U+2064  | `⁤` | 2 項の加算を示す                           | INVISIBLE PLUS               |
| U+206A  | `⁪` | 対称的なスワッピングを禁止する             | INHIBIT SYMMETRIC SWAPPING   |
| U+206B  | `⁫` | 対称的なスワッピングを有効にする           | ACTIVATE SYMMETRIC SWAPPING  |
| U+206C  | `⁬` | アラビア語のフォームシェーピング(オフ)     | INHIBIT ARABIC FORM SHAPING  |
| U+206D  | `⁭` | アラビア語のフォームシェーピング(オン)     | ACTIVATE ARABIC FORM SHAPING |
| U+206E  | `⁮` | ナショナル数字シェーピング                 | NATIONAL DIGIT SHAPES        |
| U+206F  | `⁯` | 名目上の数字のシェーピング                 | NOMINAL DIGIT SHAPES         |
| U+3000  | `　` | 表意文字スペース                           | IDEOGRAPHIC SPACE            |
| U+2800  | `⠀` | 点字パターンの空白                         | BRAILLE PATTERN BLANK        |
| U+3164  | `ㅤ` | ハングルフィラー                           | HANGUL FILLER                |
| U+FEFF  |　`*1` | ゼロ幅改行なしスペース                     | ZERO WIDTH NO-BREAK SPACE    |
| U+FFA0  | `ﾠ` | 半角ハングルフィラー                       | HALFWIDTH HANGUL FILLER      |
| U+1D159 | `𝅙` | 音楽記号の「符頭(なし)」                   | MUSICAL SYMBOL NULL NOTEHEAD |
| U+1D173 | `𝅳` | 音楽記号「ビーム(開始)」                   | MUSICAL SYMBOL BEGIN BEAM    |
| U+1D174 | `𝅴` | 音楽記号「ビーム(終わり)」                 | MUSICAL SYMBOL END BEAM      |
| U+1D175 | `𝅵` | 音楽記号「タイ(開始)」                     | MUSICAL SYMBOL BEGIN TIE     |
| U+1D176 | `𝅶` | 音楽記号「タイ(終わり)」                   | MUSICAL SYMBOL END TIE       |
| U+1D177 | `𝅷` | 音楽記号「スラー(開始)」                   | MUSICAL SYMBOL BEGIN SLUR    |
| U+1D178 | `𝅸` | 音楽記号「スラー(終わり)」                 | MUSICAL SYMBOL END SLUR      |
| U+1D179 | `𝅹` | 音楽記号「開始フレーズ」                   | MUSICAL SYMBOL BEGIN PHRASE  |
| U+1D17A | `𝅺` | 音楽記号「終了フレーズ」                   | MUSICAL SYMBOL END PHRASE    |

- `*1`: `U+FEFF` は表示不可能な文字列

## 参考にしたサイト

[Unicode characters you can not see](https://invisible-characters.com/)
