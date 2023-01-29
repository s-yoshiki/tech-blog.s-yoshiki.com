---
title: "VSCode+zshで _arguments:comparguments:409: not enough arguments の対処"
path: "/entry/302"
date: "2022-01-29 16:00"
coverImage: "../../../images/thumbnail/linux-logo.png"
author: "s-yoshiki"
tags: ["linux", "vscode", "mac"]
---

## はじめに

VSCodeのターミナルでzshを利用して`rm`等を実行した際に「_arguments:comparguments:409: not enough arguments」と表示され、操作ができない事象がありました。

iTerm2では発生しませんでした。

## 環境

- M1Mac
- zplugなどのプラグインを利用しています

## 要因

SHELLの状態を確認すると以下のような状態となっていました。

```shell
$ echo $SHELL
/bin/zsh
$ which zsh
/usr/local/bin/zsh
$ /bin/zsh --version
zsh 5.8.1 (x86_64-apple-darwin21.0)
$ /usr/local/bin/zsh --version
zsh 5.9 (x86_64-apple-darwin21.3.0)
```

## 対処

とりあえず

```sh
/bin/zsh
```

を実行すると、解消されていることが確認できました。

調査をすると homebrew で zsh がインストールされていたことがわかったので消すことにしました。
VSCodeを再起動した後、事象が解決されていることを確認できました。

## 参考にしたサイト

- [`_arguments:comparguments:409: not enough arguments` on the integrated terminal · Issue #161159 · microsoft/vscode](https://github.com/microsoft/vscode/issues/161159)
