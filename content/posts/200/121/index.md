---
title: "VSCodeからSSHでリモートサーバ上のファイルを編集する"
path: "/entry/121"
date: "2019-05-06 15:55:12"
coverImage: "../../../images/thumbnail/vscode-logo-stable.png"
author: "s-yoshiki"
tags: ["linux","ubuntu","ssh","node.js","mac","開発環境","visual-studio-code"]
---

## 概要

VSCode(2019/05/05時点ではInsider版のみ)でリモートサーバ上のファイルをSSH経由で編集することができるようになりました。
ざっくり言うとリモート環境としてコンテナ、WSL、リモートサーバ上での編集が可能になり、拡張機能なども動かせるようになるそうです。
これをちょっとだけ試してみました。

また、初期のセットアップでハマったところがあったのでそれについても触れます。
<blockquote class="twitter-tweet" data-lang="ja">
<p dir="ltr" lang="en">Introducing Remote Development for <a href="https://twitter.com/code?ref_src=twsrc%5Etfw">@code</a> ???️

A new set of extensions that enable you to open any folder in a container, on a remote machine, or in the Windows Subsystem for Linux (WSL) and take advantage of VS Code's full feature set. <a href="https://twitter.com/hashtag/remote?src=hash&ref_src=twsrc%5Etfw">#remote</a>

? <a href="https://t.co/ChYGQ89Y5f">https://t.co/ChYGQ89Y5f</a>

— Visual Studio Code (@code) <a href="https://twitter.com/code/status/1124016109076799488?ref_src=twsrc%5Etfw">2019年5月2日</a></blockquote>
<script async="" src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

<a href="https://code.visualstudio.com/blogs/2019/05/02/remote-development">https://code.visualstudio.com/blogs/2019/05/02/remote-development</a>

## SSHによるリモート開発について

<a href="https://code.visualstudio.com/docs/remote/ssh">https://code.visualstudio.com/docs/remote/ssh</a>

### 機能の概要

<img src="https://code.visualstudio.com/assets/docs/remote/ssh/architecture-ssh.png" />

VSCodeのSSH拡張機能を利用するメリットは、リモート環境のディレクトリ・ファイルに対してVSCodeの便利な多くの機能を提供することにあります。また、これらのアクションはリモートマシン上のファイルに対しいて実行されるので、ローカルにファイルを置く必要がありません。

リモートサーバーだけでなく、 DockerやWSLについても対応しています。

### 機能要件

#### ローカル環境

VSCodeが導入されていること。加えてOpenSSH互換のSSHクライアントがあること。
※<a href="https://code.visualstudio.com/docs/supporting/requirements">こちら</a>の最小要件を参考にしてください。

#### リモート環境

x86_64 Debian 8以降、Ubuntu 16.04以降、CentOS / RHEL 7以降。
ARMv7l Raspbian 8+（32ビット）も実験的にサポート。

詳しくはこちらを参照

<a href="https://code.visualstudio.com/docs/remote/linux">https://code.visualstudio.com/docs/remote/linux</a>

## Macから試したてみた

とりあえずMacから試してみました。

### 環境

**ローカル**
<ul>
 	<li>macOS Mojava 10.14</li>
</ul>
**リモートサーバ**
<ul>
 	<li>Ubuntu 14.04</li>
</ul>

## VS Code Insider build

Insider build版については、こちらから手に入れることができます。

<a href="https://code.visualstudio.com/insiders/">https://code.visualstudio.com/insiders/</a>

## SSH:Remoteのインストール

<a href="https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers">https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers</a>

remote containerを検索します。

「remote」 と打てば上〜真ん中あたりに出てきます。

<a href="https://images-tech-blog.s-yoshiki.com/img/2019/05/20190506143900.jpg"><img src="https://images-tech-blog.s-yoshiki.com/img/2019/05/20190506143900.jpg" />
</a>

いこれをインストールすると、依存関係のいくつかの関連パッケージもインストールされました。

## ssh_configの設定

接続するSSHの設定を行います。
macの場合であれば~/.ssh/configに記述します。
**~/.ssh/config**

```
Host test.my-server1  # 任意のホスト名
    HostName my-server1.example.com  # host名
    User your_name  # ユーザネーム 
    Port 22  # ポート番号
    IdentityFile ~/.ssh/xxxx_key.pem  # 鍵のパス

```

## VSCodeからの接続

左下のターミナルのようなアイコンをクリックしRemote-SSH:COnnect to hostからssh_configに設定した接続先 (上記のサンプルであればtest.my-server1) を選択して接続することができます。

<a href="https://images-tech-blog.s-yoshiki.com/img/2019/05/20190506144000.jpg">
</a><a href="https://images-tech-blog.s-yoshiki.com/img/2019/05/20190506144000.jpg"><img src="https://images-tech-blog.s-yoshiki.com/img/2019/05/20190506144000.jpg" />
</a>

接続時の設定ファイルなどはリモートの~/.vscode-remote/に置かれます。

## 接続成功後

接続が成功したらOpen Folderから編集したいファイルを選ぶことができます。

<a href="https://images-tech-blog.s-yoshiki.com/img/2019/05/20190506152205.jpg">
<img src="https://images-tech-blog.s-yoshiki.com/img/2019/05/20190506152205.jpg" /></a>

このようにリモートサーバのディレクトリが表示されます。

<a href="https://images-tech-blog.s-yoshiki.com/img/2019/05/20190506152338.jpg">
<img src="https://images-tech-blog.s-yoshiki.com/img/2019/05/20190506152338.jpg" />
</a>

## 接続がうまくいかなかった時

上記の手順通りに試してもうまくいかない時がありました。

logを見ると、SSH接続後に行われるshellの実行に失敗していました。

~/.vscode-remote/bin/******/server.sh

```shell
#!/usr/bin/env sh
#
# Copyright (c) Microsoft Corporation. All rights reserved.
#

case "$1" in
        --inspect*) INSPECT="$1"; shift;;
esac

ROOT="$(dirname "$(realpath "$0")")"

"$ROOT/node" ${INSPECT:-} "$ROOT/out/remoteExtensionHostAgent.js" "$@"

```

リモート環境に realpath と node がなかったのでインストールしました。

```
sudo apt install realpath

```

aptでインストールしたnodejsは動かなかったのでこの辺りを参考にしました。

https://qiita.com/seibe/items/36cef7df85fe2cefa3ea

<iframe src="https://www.youtube.com/embed/rh1Ag41J6IA" width="560" height="315" frameborder="0" allowfullscreen="allowfullscreen"></iframe>

## 参考

<a href="https://qiita.com/yoskeoka/items/01c52c069123e0298660">https://qiita.com/yoskeoka/items/01c52c069123e0298660</a>

<a href="https://qiita.com/suzuki_sh/items/245b9817536eba808842">https://qiita.com/suzuki_sh/items/245b9817536eba808842</a>