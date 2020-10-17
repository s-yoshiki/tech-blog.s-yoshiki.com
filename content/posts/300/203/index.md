---
title: "ファイルの1行目を表示 Linuxコマンド head"
path: "/entry/203"
date: "2020-08-31"
coverImage: "../../../images/thumbnail/linux-logo.png"
author: "s-yoshiki"
tags: ["centos", "linux", "ubuntu"]
---

## 概要

headコマンドでファイルの 1行目もしくは指定した行数だけ表示する方法。

## head

利用できるオプション

```
usage: head [-n lines | -c bytes] [file ...]
```

## コマンド例

`./path/to/file.txt` の 1行目だけを表示

```shell
$ head -n 1 ./path/to/file.txt
```

`./path/to/file.txt` の 5行目までを表示


```shell
$ head -n 5 ./path/to/file.txt
```

カレントディレクトリ以下の全てのtxtファイルの1行目を表示

```shell
$ find ./ -type f -name "*.txt" | xargs head -n 1
```