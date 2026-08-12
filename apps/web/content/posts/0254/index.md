---
title: "homebrewでnodejsインストール&任意のバージョン利用"
path: "/entry/254"
date: "2021-11-30 01:00"
coverImage: "../../../images/thumbnail/javascript-logo.png"
author: "s-yoshiki"
tags: ["node.js","linux","javascript"]
---

## 初めに

homebrewでサクッとnodejsのインストールを行なった際のメモです。

環境はMacを対象としていますが、Linuxでも概ね同じ手順で実行できると思います。

また下記に記載している方法では、nvmやnodenvなどの管理ツールは利用しません。(ただし、多くの場合はこのようなツールを使うべきです)

その理由は、マイナバージョンまで固定せず「メジャーバージョンまで指定できれば良い」という手っ取り早く導入する目的があったからです。

## homebrewインストール

前提としてhomebrewのインストールが必要となります。

下記のリンクを参照して導入します。

[macOS（またはLinux）用パッケージマネージャー — Homebrew](https://brew.sh/index_ja)

## nodejsの検索

まずは `node` でパッケージを検索します。node関連の物が引っかかります。

```shell
$ brew search node
==> Formulae
libbitcoin-node
llnode
node
node-build
node-sass
node@10
node@12
node@14
node@16
node_exporter
nodebrew
nodeenv
nodenv
ode
```

これらのうち、

- node
- node@10
- node@12
- node@14
- node@16

が nodejs に該当します。

また、homebrewの仕組み的に `node` (@がついていないやつ) が最新のバージョン(17)となります。

## インストール

次のコマンドでインストールを行います。

最新版が欲しい場合は以下のコマンドで。

```
brew install node
```

14系が欲しい場合は以下のコマンドで。

```
brew install node@14
```

## nodejsの利用

ここでは `node`と`node@14`の両方をインストールしたものとして話をします。

`node`最新版は以下のパスにインストールされます。

またPATHが通っている場所へインストールされることが確認できます。

```shell
$ /usr/local/bin/node --version
v17.3.0
$ node --version
v17.3.0
```

`node@14`は以下のパスにインストールされます。

```
$ /usr/local/opt/node@14/bin/node --version
v14.18.2
```

パスを通せばprefixを省略して実施できます。

```shell
$ export PATH="/usr/local/opt/node@14/bin:$PATH"
$ node --version
v14.18.2
```

libディレクトリやヘッダファイルは次の場所となります。

```shell
$ export LDFLAGS="-L/usr/local/opt/node@14/lib"
$ export CPPFLAGS="-I/usr/local/opt/node@14/include"
```

## 現在利用する場合の注意

本文で扱っているNode.js 14と17はすでにEOLで、セキュリティ更新を受けられません。実際にインストールする版はNode.js公式のリリース一覧で確認し、Active LTSまたはMaintenance LTSを選んでください。

```shell
brew update
brew info node
brew search '/^node(@[0-9]+)?$/'
```

Homebrewのversioned formulaは通常keg-onlyです。`brew link --force` でシステム全体を切り替えるより、プロジェクトごとのバージョン管理にはVolta、fnm、nvm、miseなどを使うと衝突を減らせます。

```shell
# 例: Volta
volta install node@lts
volta pin node@24

# package.jsonへ利用バージョンが記録される
node --version
```

## どのnodeが実行されているか確認する

複数の導入方法を混ぜるとPATHの順序で意図しないnodeが選ばれます。

```shell
type -a node
which node
node --version
npm --version
brew --prefix node
```

Apple SiliconではHomebrewの既定prefixが `/opt/homebrew`、Intel Macでは `/usr/local` です。記事中の固定パスをコピーせず、`brew --prefix` で実環境の場所を取得してください。

## 参考

- [Node.js Releases](https://nodejs.org/en/about/previous-releases)
- [Node.js End-of-Life](https://nodejs.org/en/about/eol)
- [Homebrew node formula](https://formulae.brew.sh/formula/node)
