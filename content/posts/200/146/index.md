---
title: "エンジニアなMacBookのセットアップ 開発環境の構築"
path: "/entry/146"
date: "2019-07-05 01:03:34"
coverImage: "../../../images/thumbnail/apple-logo.jpg"
author: "s-yoshiki"
tags: ["linux","python","node.js","mac","macos","homebrew","apple"]
---

## 概要

MacBookProを新調しました。
無の状態から開発ができるまでのセットアップを記したものです。

## ブラウザ関連

まずブラウザがなければ何も始まりません。

- <a href="https://www.google.com/intl/ja/chrome/"><img src="https://simpleicons.org/icons/googlechrome.svg" width="16"> Chrome</a>
- <a href="https://www.google.com/intl/ja/chrome/canary/"><img src="https://simpleicons.org/icons/googlechrome.svg" width="16"> Chrome Canary</a>
- <a href="https://www.mozilla.org/ja/firefox/new/"><img src="https://simpleicons.org/icons/mozillafirefox.svg" width="16"> Firefox</a>
- <a href="https://www.mozilla.org/ja/firefox/channel/desktop/"><img src="https://simpleicons.org/icons/mozillafirefox.svg" width="16"> Beta、 Nightly、 Developer Edition</a>

## Homebrewのインストール

macOS用のパッケージマネージャであるHomebrewをインストールします。

インストールは以下のコマンドをターミナルから実行します。

```shell
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

<a href="https://brew.sh/index_ja">https://brew.sh/index_ja</a>

5分ほど時間がかかります。
途中でXCodeのComand Line Tool をインストールするためにパスワードが要求されます。

次にcaskを有効にします。

```shell
brew update
brew install cask
```

これ以降のセットアップはhomebrewに依存する割合が高くなります。

## ターミナル環境系

### Hyper

Hyperはターミナル環境です。

```shell
brew cask install hyper
```

## エディタ

### VSCode

以下のコマンドを実行します。

```shell
brew cask install visual-studio-code
```

### typora

typoraはマークダウンエディタです。
導入は以下のコマンドで実行します。

```shell
brew cask install typora
```

## CLIツール

### Git

```shell
brew install git
wget \
gcc \
fish \
zsh \
nmap \
ffmpeg \
tree
```

## 言語系

### Python

pyenvでpythonのバージョンを管理します。

```shell
brew install pyenv
```

利用できるバージョン一覧を表示します。

```shell
brew install --list
```

任意のバージョンを選択してインストールします。

```shell
pyenv install 3.7.3
```

モジュールを管理するpipの管理を行うpipenvをインストールします。

```shell
brew install pipenv
```

```shell
pipenv install
```

### node.js

nパッケージを用いてバージョンを管理します。
homebrewでnodeのインストール

```shell
brew install node
```

nパッケージのインストール

```shell
npm install -g n
```

バージョンの一覧表示

```shell
n list
```

バージョンの切り替え

```shell
sudo n 12.6.0
node -v
```

v12.6.0に切り替わります。