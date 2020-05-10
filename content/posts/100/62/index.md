---
title: "Linux dateコマンドで日付を任意のフォーマットに加工して出力する。【LinuCお勉強】"
path: "/entry/62"
date: "2018-10-09 00:31:31"
coverImage: "../../../images/thumbnail/no-image.png"
author: "s-yoshiki"
tags: ["linux"]
---

## 概要

dateコマンドで日付を任意のフォーマットに加工して出力する。

## dateコマンド

Linuxでは現在の日時を設定、取得、および変更を行うにはdateコマンドを使用します。
日付の変更はrootユーザのみ可能です。

構文としては

```
date [オプション] [日付] [+表示形式]
```

となっており、

主なオプションとして「-u (UTC時間で日付を扱う)」があります。

## 実行例

以下は基本的な実行例です。

```
$ date
2018年 10月 9日 火曜日 00時05分32秒 JST
$ date +%A
火曜日
$ date +%B
10月
$ date +%Y
2018
$ date +%m
10
$ date +%d
09
$ date +%H
00
$ date +%M
05
$ date +%s
1539011483
$ date +%c
火 10/ 9 00:05:56 2018
$ date +%x
2018/10/09

```

## 任意のフォーマットで出力

以下のように、任意のフォーマットで出力することが可能です。

```
$ date "+%Y-%m-%d"
2018-10-09
$ date "+Date:%x Time:%H:%M"
Date:2018/10/09 Time:00:07
```
