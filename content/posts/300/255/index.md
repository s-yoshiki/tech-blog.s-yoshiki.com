---
title: "AutotoolsでconfigureやMakefileの作成"
path: "/entry/255"
date: "2022-01-10 17:00"
coverImage: "../../../images/thumbnail/linux-logo.png"
author: "s-yoshiki"
tags: ["centos","linux","red-hat", "cplusplus", "gnu"]
---

## はじめに

C/C++で作成したプログラムをLinuxサーバにインストールするためのパッケージ化するために、
Autotoolsを利用して配布形式のパッケージを作成した際のメモです。

### Autotools

makeは、C/C++のコンパイルやインストールにおいて依存関係を解決することができるツールです。
AutotoolsはMakefileそのものを自動的に生成するフレームワークです。

Linuxのソフトウェアのインストールでよく行う `./configure && make && make install` の `configure` を生成します。

### 環境

以下の環境で実施します。

 - CentOS 8.4

## 準備

### ツール類のインストール

autoconf や automake をインストールします。

```
dnf -y group install 'Development Tools'
```

### ソースコードの作成

test_appという名前でアプリケーションを作っていきます。

```shell
# ホームディレクトリの下にディレクトリを作成
mkdir -p ~/test_app/src
# Cファイルを作成
touch ~/test_app/src/test_app.c
```

正しく実行すると以下の様な状態になると思います。

```
~/test_app
└── src
    └── test_app.c
```

次に`~/test_app/src/test_app.c`を編集します。

```c
#include <stdio.h>

int main() {
    printf("Hello world!\n");
    return 0;
}
```

一応、gccでコンパイルできるか確認しておきます。
「Hello world!」と表示されれば問題ないです。

```
cd ~/test_app/src
gcc test_app.c -o test_app
./test_app
```

## configure.ac と Makefile.am

次に configure.ac と Makefile.am を作成します。

```
touch ~/test_app/configure.ac
touch ~/test_app/Makefile.am
touch ~/test_app/src/Makefile.am
```

実行後は以下の様になります。

```
~/test_app
├── configure.ac
├── Makefile.am
└── src
    ├── Makefile.am
    └── test_app.c
```

各ファイルを編集します。

**~/test_app/configure.ac**

```shell
# 第一引数はプロジェクト名、第二引数はバージョン
AC_INIT([test_app], [1.0])

# Makefileを作成する定義。
AM_INIT_AUTOMAKE
# foreignが無いとGNUプロジェクトとして作成される
# AM_INIT_AUTOMAKE([foreign]) 

# Cコンパイラを利用する定義
AC_PROG_CC

# 出力ファイルの定義
AC_OUTPUT([Makefile
                 src/Makefile])
```

**~/test_app/Makefile.am**

```
SUBDIRS = src
```

**~/test_app/src/Makefile.am**

```
bin_PROGRAMS = test_app
```

READMEなどのファイルを作成しておきます。

```shell
cd ~/test_app
touch NEWS README AUTHORS ChangeLog
```

## configure Makeの生成

次のコマンドでconfigureやmakeに必要なファイルが生成されます。

```shell
autoreconf -vi
# viオプションの意味
# i, --initialization        also trace Autoconf's initialization process
# -v, --verbose             verbosely report processing
```

これを実行後、ディレクトリ構成は次の様になります。

```
test_app
├── aclocal.m4
├── AUTHORS
├── autom4te.cache
│   ├── output.0
│   ├── output.1
│   ├── requests
│   ├── traces.0
│   └── traces.1
├── ChangeLog
├── compile
├── configure
├── configure.ac
├── COPYING
├── depcomp
├── INSTALL
├── install-sh
├── Makefile.am
├── Makefile.in
├── missing
├── NEWS
├── README
└── src
    ├── Makefile.am
    ├── Makefile.in
    └── test_app.c
```



これでconfigureファイルが生成されます。

```shell
./configure
# デフォルトだと/usr/localにインストールされる。場所を変更するなら以下
# ./configure --prefix=/path/to/hoge

make
make install
```

## その他 makeオプション

```
make clean
```

実行ファイルや中間生成物を削除

```
make distclean
```

Makefileなどのconfigureによって生成された生成物を削除

```
make dist
```

配布用のソースコード一式であるtarボールを作成する。

## autoreconf について

autoreconfは以下の処理をまとめてやってくれる機能と理解。
 
 - autoscan
 - aclocal
 - automake
 - autoconf


## Perlの場合

余談ですが、Perl系のパッケージはconfigureの代わりにMakefile.PLを利用してMakefileを生成します。

これは [ExtUtils::MakeMaker](https://perldoc.jp/docs/modules/ExtUtils-MakeMaker-6.17/ExtUtils/MakeMaker.pod)
で生成することができます。

## リンク

 - [Autotools - Wikipedia](https://ja.wikipedia.org/wiki/Autotools)
 - [Autotoolsについてのメモ](http://loto.sourceforge.net/feram/Autotools-memo.ja.html)
 - [GNU C/C++ - autoconf, automake で make！ - mk-mode BLOG](https://www.mk-mode.com/blog/2012/12/03/03002034/)
 - [configureファイルの書き方 - ごろねこ日記](https://hiroe-orz17.hatenadiary.org/entry/20131006/1381040379)
 - [autoreconfを使って簡単にビルド環境を作る - にたまごほうれん草アーカイブ](https://nitamago-archive.hatenablog.com/entry/20081106/1225896312)
 - [autoconf, automake - Heavy Watal](https://heavywatal.github.io/dev/autotools.html)
 - [ cやc++をビルドしたいので ./configureスクリプトの作り方調べた - Qiita](https://qiita.com/hadashiA/items/9da2b424965952707a6d)
 - [/configure,makeの流れを作るアレ - Qiita](https://qiita.com/awakia/items/e0ceeabd8faf95020cbd)
 - [autotools  CapmNetwork](http://capm-network.com/?tag=autotools)
