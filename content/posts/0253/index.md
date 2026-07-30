---
title: "RPMパッケージ作成 Dockerを利用して"
path: "/entry/253"
date: "2022-01-10 00:30"
coverImage: "../../../images/thumbnail/linux-logo.png"
author: "s-yoshiki"
tags: ["centos","linux","red-hat"]
---

## はじめに

Dockerを利用してRPM開発環境を用意し、実際にRPM作成を行った際の操作や作業をメモしたものです。

## RPMパッケージ

RPMパッケージについて簡単に触れておきます。

**特徴**

- コンポーネントが必要なファイルやメタデータ(RPMヘッダー)をパッケージ化したもの
- cpioアーカイブで構成されている

**パッケージの種類**

- ソースRPM(SRPM): ソースコードと SPEC ファイルが含まれる
- バイナリRPM: ソースおよびパッチから構築されたバイナリーが含まれる

## step1.環境構築からRPMパッケージングまで

"Hello World" と出力する簡単なshellscriptをrpmにパッケージングするまでを説明します。

### 事前準備

**ツール類の準備**

rpmの作成にはrpmbuildなどの構築ツールが必要となります。

```shell
dnf install rpmdevtools
```

**ユーザ追加**

```shell
# useradd ${任意の一般ユーザ}
useradd rpmbuild
```

### ワークスペースの作成

以下のコマンドでワークスペースをセットアップします。

```shell
cd ~
rpmdev-setuptree
```

```
/home/rpmbuild/
`-- rpmbuild
    |-- BUILD
    |-- RPMS
    |-- SOURCES
    |-- SPECS
    `-- SRPMS
```

各ディレクトリの役割は以下の通りとなります。

- BUILD
  - パッケージを構築すると、ここにさまざまな `%buildroot` ディレクトリーが作成されます。これは、ログ出力で十分な情報を得られない場合に、失敗したビルドを調べるのに場合に便利です
- RPMS
  - バイナリー RPM は、さまざまなアーキテクチャーのサブディレクトリー (例: `x86_64` および `noarch`) に作成されます
- SOURCES
  - ここでは、このパッケージャーは、圧縮したソースコードアーカイブとパッチを配置します。`rpmbuild` コマンドは、これらを検索します
- SPECS
  - SPECファイルを配置
- SRPMS
  - `rpmbuild` を使用してバイナリー RPM の代わりに SRPM を構築すると、生成される SRPM がここに作成されます

### プログラム配置

`/home/rpmbuild/rpmbuild/SOURCES/helloworld`ディレクトリを作成し `helloworld`という名前のshellscriptを作成します。

```shell
#!/bin/bash
echo "Hello World!"
```

### specファイル

specファイルにrpmの構成を記述します。

このファイルは`/home/rpmbuild/rpmbuild/SPECS/`に配置します。

**helloworld.spec**

```shell
Name:    helloworld
Version: 1.0.0
Release: 1%{?dist}
BuildArch: noarch
License: No License
Summary: "hello world"
Source0: %{name}

%description
"helloworld" command!!

%install
mkdir -p %{buildroot}/%{_bindir}
cp %{SOURCE0}/%{name} %{buildroot}/%{_bindir}
chmod 755 -R %{buildroot}/%{_bindir}

%files
%{_bindir}/%{name}
```

詳細なspecの記述については、[こちらを参照してください](/entry/251)

### rpmbuild

次のコマンドでbuildを行います。

```
rpmbuild --bb /home/rpmbuild/rpmbuild/SPECS/helloworld.spec
```

上記実行後、`RPMS/noarch`ディレクトリに`/helloworld-1.0.0-1.el8.noarch.rpm` が作成されます。

これでrpmの作成は完了です。

#### インストール

次のコマンドでインストールを行います。

```
rpm -ivh helloworld-1.0.0-1.el8.noarch.rpm
```

インストール完了後、動作確認を行います。

以下のような動作をすれば成功です。

```
$ helloworld
Hello World!
$ rpm -qa | grep helloworld
helloworld-1.0.0-1.el8.noarch
$ which helloworld
/usr/bin/helloworld
```

## リンク

- [RPM（Red Hat Package Manager）とは - IT用語辞典 e-Words](https://e-words.jp/w/RPM-2.html)
- [Available Repositories for CentOS](https://wiki.centos.org/AdditionalResources/Repositories)
- [Packaging/Guidelines/ja - Fedora Project Wiki](https://fedoraproject.org/wiki/Packaging/Guidelines/ja)
- [ソフトウェアのパッケージ化および配布 Red Hat Enterprise Linux 8 | Red Hat Customer Portal](https://access.redhat.com/documentation/ja-jp/red_hat_enterprise_linux/8/html/packaging_and_distributing_software/index)
- [Write toolchain-agnostic RPM spec files for GCC and Clang | Red Hat Developer](https://developers.redhat.com/articles/2021/07/28/write-toolchain-agnostic-rpm-spec-files-gcc-and-clang)
