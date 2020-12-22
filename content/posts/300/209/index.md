---
title: "CentOS8にDNFでPerl5.30のインストール"
path: "/entry/209"
date: "2020-12-22"
coverImage: "../../../images/thumbnail/centos-logo.png"
author: "s-yoshiki"
tags: ["centos","redhat","perl"]
---

## 概要

CentOS8 or CentOS Streamに Perl5.30をDNFでインストールする際の記録です。

検証は centos8.3.2011 の dockerイメージを用いて実施しました。

## Modularityについて

CentOS8 では Modularityという仕組みが導入されています。
これはアプリケーションのライフサイクルをある程度独立させるための仕組みです。

これについては、[こちら (RHEL 8/Fedora 28で導入されたModularity) ](https://rheb.hatenablog.com/entry/201812-modularity)で分かりやすく解説されています。

Perlの場合は `dnf module list perl` とコマンドを打つと利用できるパッケージが表示されます。

```shell
$ dnf module list perl
Failed to set locale, defaulting to C.UTF-8
Last metadata expiration check: 0:02:09 ago on Tue Dec 22 09:06:09 2020.
CentOS Linux 8 - AppStream
Name       Stream         Profiles                  Summary                                       
perl       5.24           common [d], minimal       Practical Extraction and Report Language      
perl       5.26 [d]       common [d], minimal       Practical Extraction and Report Language      
perl       5.30           common [d], minimal       Practical Extraction and Report Language 
Hint: [d]efault, [e]nabled, [x]disabled, [i]nstalled 
```

デフォルトでは5.26が設定されています。

## Perl5.30インストール

Perl5.30をインストールする場合は以下のコマンドを入力します。

```shell
$ dnf module install perl:5.30
```

これを実行すると依存するRPMもインストールされます。

```shell
$ which perl
/usr/bin/perl
$ perl --version
This is perl 5, version 30, subversion 1 (v5.30.1) built for x86_64-linux-thread-multi
(with 66 registered patches, see perl -V for more detail)

Copyright 1987-2019, Larry Wall

Perl may be copied only under the terms of either the Artistic License or the
GNU General Public License, which may be found in the Perl 5 source kit.

Complete documentation for Perl, including FAQ lists, should be found on
this system using "man perl" or "perldoc perl".  If you have access to the
Internet, point your browser at http://www.perl.org/, the Perl Home Page.
```

再度 module を確認。5.30がenableとなっています。

```shell
$ dnf module list perl
Name        Stream          Profiles                       Summary                                        
perl        5.24            common [d], minimal            Practical Extraction and Report Language       
perl        5.26 [d]        common [d], minimal            Practical Extraction and Report Language       
perl        5.30 [e]        common [d] [i], minimal        Practical Extraction and Report Language       
Hint: [d]efault, [e]nabled, [x]disabled, [i]nstalled
```


## dnf module でハマったところ

5.30に上げた状態、また5.30を上げた後に削除した状態で5.26や5.24に切り替えようとしたところ競合が発生し切り替えができなくなりました。
また、5.30に変更した場合依存関係でインストールできなくなるパッケージなども存在しました。

## その他

### Perl5.26の場合

```shell
$ dnf module install perl:5.26
```

### Perl5.24の場合

```shell
$ dnf module install perl:5.24
```