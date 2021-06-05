---
title: "[Perl] CentOS8 に plenv をインストール"
path: "/entry/224"
date: "2021-06-05 21:00"
coverImage: "../../../images/thumbnail/perl-logo.png"
author: "s-yoshiki"
tags: ["perl", "plenv", "centos"]
---

## 概要

CentOS8 に plenv をインストールした際のメモです。

https://github.com/tokuhirom/plenv

**環境**

 - CentOS8.3


## インストール

### Step1 事前準備

事前準備としてgccなどの必要なパッケージが入っている `Development Tools` をインストールします。

```shell
dnf groupinstall "Development Tools"
```

github から plenv と Perl-Build をインストールします。

```shell
cd ~
git clone git://github.com/tokuhirom/plenv.git ~/.plenv
git clone git://github.com/tokuhirom/Perl-Build.git ~/.plenv/plugins/perl-build/
```

### Step2 PATHを通す (README通りにインストール)

以下の手順でパスを通します。
README通りにインストールする場合、`$HOME/.plenv`以下に設定されます。

```shell
echo 'export PATH="$HOME/.plenv/bin:$PATH"' >> ~/.bash_profile
echo 'eval "$(plenv init -)"' >> ~/.bash_profile
exec $SHELL -l
```

### Step2 PATHを通す ($HOME以外にplenvをインストール)

`$HOME/.plenv`以外の任意のディレクトリで管理したい場合は上記の手順はスキップし次の手順でパスを通します。

```shell
mv ~/.plenv /path/to/plenv
export PATH="/path/to/plenv/bin:$PATH"
export PLENV_ROOT=/path/to/plenv
```

### Step3 Perlインストール

`plenv install -l` でインストール可能なバージョンを確認します。

```shell
$ plenv install -l
Available versions:
 5.35.0
 5.34.0
 5.34.0-RC2
 5.34.0-RC1
 5.33.9
# 略
```

次の操作でPerlをインストールします。

```shell
plenv install 5.35.0
```

別バージョン名でインストールすることも可能です。

```shell
plenv install 5.35.0 --as 5.35
```

バージョンを確認します。

```shell
$ plenv versions      
* system (set by /path/tp/plenv/version)
  5.35.0
```

バージョンを変更します。

```shell
$ plenv global 5.35.0
$ plenv versions
  system
* 5.35.0 (set by /path/tp/plenv/version)
```

## Step4 cpanmインストール

cpanm をインストールします。

```
plenv install-cpanm
```

試しに `DBD::mysql` をインストールします。

```
cpanm DBD::mysql
```