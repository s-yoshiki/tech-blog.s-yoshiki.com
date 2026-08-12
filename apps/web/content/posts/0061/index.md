---
title: "Linuxシェル変数と環境変数の違いと、基本的なコマンド 【LinuCお勉強】"
path: "/entry/61"
date: "2018-10-09 00:08:03"
coverImage: "../../../images/thumbnail/no-image.png"
author: "s-yoshiki"
tags: ["linux"]
---

## 概要

シェル変数と環境変数の話

キーワード:
bash set env export declare

## コマンド一覧

### シェル変数

設定されたシェルだけが使用する変数。子プロセスには引き継がれない。
setコマンドでシェル変数一覧を表示することができる。

削除するにはunsetコマンドを用いる。

例

```
$ test=123
$ set | grep test
test=123
```

主なシェル変数として以下のものが存在する。

<table>
<tbody>
<tr>
<td>PWD</td>
<td>カレントディレクトリの絶対パス</td>
</tr>
<tr>
<td>PATH</td>
<td>コマンド検索のパス</td>
</tr>
<tr>
<td>HOME</td>
<td>ユーザのホームディレクトリ</td>
</tr>
<tr>
<td>LANG</td>
<td>言語情報</td>
</tr>
</tbody>
</table>

### 環境変数

設定されたシェルとその起動したプログラムが使用する変数。
子プロセスに引き継がれる。

また、exportコマンドを用いてシェル変数を環境変数にセットする。

envコマンドまたはprintenvで一覧を表示することができる。

```
$ export test=123
$ env | grep test
test=123
```
