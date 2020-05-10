---
title: "ブラウザ上でIDE code-server を使ってみる"
path: "/entry/162"
date: "2019-08-29 00:34:15"
coverImage: "../../../images/thumbnail/console-image.png"
author: "s-yoshiki"
tags: ["開発環境","vscode","ソフトウェア","ide"]
---
ブラウザ上でコードの編集や、デバッグ、コマンドを実行することができるブラウザ版IDE、code-serverを使ってみました。

<img src="https://github.com/cdr/code-server/raw/master/doc/assets/ide.png">

## セットアップ

セットアップ方法はdockereを利用するものと、バイナリから立ち上げる2種類紹介されています。

### Dockerから利用する

Dockerから利用する場合はこちらのDockerfileを実行します。

<a href="https://github.com/cdr/code-server/blob/master/Dockerfile">https://github.com/cdr/code-server/blob/master/Dockerfile</a>

### バイナリから立ち上げる

code-serverのダウンロードはこちらから行います。利用する端末にあったものをダウンロードしてください。

<a href="https://github.com/cdr/code-server/releases">https://github.com/cdr/code-server/releases</a>

ファイルをダウンロードし解凍後、次のコマンドで初期ディレクトリを選択したcode-serverを立ち上げます。

```
./code-server /path/to/word_dir
```

## 参考

<a href="https://note.mu/erukiti/n/ne32e2b2ae44f">https://note.mu/erukiti/n/ne32e2b2ae44f</a>

<a href="https://qiita.com/MegaBlackLabel/items/bbec97db769667962bce">https://qiita.com/MegaBlackLabel/items/bbec97db769667962bce</a>