---
title: "CentOS8とcpanm(cpanminus)によるPerlモジュールの導入・環境構築"
path: "/entry/205"
date: "2020-10-30"
coverImage: "../../../images/thumbnail/perl-logo.jpeg"
author: "s-yoshiki"
tags: ["perl","centos","cpan","cpanm"]
---

## 概要

cpanm(cpanminus)を利用してCentOS8上にPerl環境を構築した際の記録です。

## cpanmについて

[miyagawa/cpanminus - github](https://github.com/miyagawa/cpanminus)

[App::cpanminus - get, unpack, build and install modules from CPAN - metacpan.org](https://metacpan.org/pod/App::cpanminus)

CPANからモジュールの取得とビルド・インストールを行うライブラリです。

CPAN::shellでもモジュールのインストールはできますが、設定しやすさやパーフォマンス・権限等の問題からcpanmの方が扱いやすいと思いました。

## cpanmのインストール (DNFでインストール)

CentOS8の場合は標準でRPMパッケージが用意されているためDNFでインストールします。

```
$ dnf install perl-App-cpanminus
$ which cpanm
/usr/bin/cpanm
```

## cpanmのインストール (shell経由でインストール)

root権限が利用できない場合は次のような手順で設定していきます。

まずはcpanmをインストールします。環境変数`PERL_CPANM_OPT`はCPANモジュールがインストールされるディレクトリを指定します。

```
$ export PERL_CPANM_OPT="--local-lib=~/perl5"
$ curl -L -O http://xrl.us/cpanm
$ perl cpanm App::cpanminus
```

PATHを通します。

```
$ export PATH=$HOME/perl5/bin:$PATH;
$ which cpanm
~/perl5/bin/cpanm
```

## cpanmのインストール (cpan経由)

CPANが利用できる場合はCPANコマンドを利用してcpanmをインストールもできます。

```
$ cpan App::cpanminus
```

## cpanmでCPANモジュールをインストール

試しにJSONモジュールをインストールします。

```
$ cpanm JSON
--> Working on JSON
Fetching http://www.cpan.org/authors/id/I/IS/ISHIGAKI/JSON-4.02.tar.gz ... OK
Configuring JSON-4.02 ... OK
Building and testing JSON-4.02 ... OK
Successfully installed JSON-4.02
2 distributions installed
```

ローカルに配置したファイルもインストールできます。

```
$ cpanm /home/foo/YAML-1.30.tar.gz
```

インストールするディレクトリを指定してインストールもできます。以下のコマンドの場合は`~/test`にインストールされます。

```
$ cpanm YAML -L ~/test
```

## 参考にしたサイト

[cpanm - CPANからモジュールを取得、アンパック、インストールする](http://perldoc.jp/docs/modules/App-cpanminus-1.7001/lib/App/cpanminus/fatscript.pod)

[cpanmによるPerlのローカル環境構築](https://tutorial.perlzemi.com/blog/20101027127859.html)

[perlモジュールのinstallにcpanmを使う](http://www.omakase.org/perl/cpanm.html)

## おまけ cpanmのオプション

```
Options:
  -v,--verbose              Turns on chatty output
  -q,--quiet                Turns off the most output
  --interactive             Turns on interactive configure (required for Task:: modules)
  -f,--force                force install
  -n,--notest               Do not run unit tests
  --test-only               Run tests only, do not install
  -S,--sudo                 sudo to run install commands
  --installdeps             Only install dependencies
  --showdeps                Only display direct dependencies
  --reinstall               Reinstall the distribution even if you already have the latest version installed
  --mirror                  Specify the base URL for the mirror (e.g. http://cpan.cpantesters.org/)
  --mirror-only             Use the mirror's index file instead of the CPAN Meta DB
  -M,--from                 Use only this mirror base URL and its index file
  --prompt                  Prompt when configure/build/test fails
  -l,--local-lib            Specify the install base to install modules
  -L,--local-lib-contained  Specify the install base to install all non-core modules
  --self-contained          Install all non-core modules, even if they're already installed.
  --auto-cleanup            Number of days that cpanm's work directories expire in. Defaults to 7

Commands:
  --self-upgrade            upgrades itself
  --info                    Displays distribution info on CPAN
  --look                    Opens the distribution with your SHELL
  -U,--uninstall            Uninstalls the modules (EXPERIMENTAL)
  -V,--version              Displays software version

Examples:

  cpanm Test::More                                          # install Test::More
  cpanm MIYAGAWA/Plack-0.99_05.tar.gz                       # full distribution path
  cpanm http://example.org/LDS/CGI.pm-3.20.tar.gz           # install from URL
  cpanm ~/dists/MyCompany-Enterprise-1.00.tar.gz            # install from a local file
  cpanm --interactive Task::Kensho                          # Configure interactively
  cpanm .                                                   # install from local directory
  cpanm --installdeps .                                     # install all the deps for the current directory
  cpanm -L extlib Plack                                     # install Plack and all non-core deps into extlib
  cpanm --mirror http://cpan.cpantesters.org/ DBI           # use the fast-syncing mirror
  cpanm -M https://cpan.metacpan.org App::perlbrew          # use only this secure mirror and its index

You can also specify the default options in PERL_CPANM_OPT environment variable in the shell rc:

  export PERL_CPANM_OPT="--prompt --reinstall -l ~/perl --mirror http://cpan.cpantesters.org"

Type `man cpanm` or `perldoc cpanm` for the more detailed explanation of the options.
```
