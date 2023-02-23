---
title: "CentOS8でEPELとPowerToolsリポジトリの有効化"
path: "/entry/206"
date: "2020-11-30"
coverImage: "../../../images/thumbnail/centos-logo.png"
author: "s-yoshiki"
tags: ["centos","red-hat", "EPEL", "PowerTools", "fedora"]
---

## 概要

CentOS8でEPELとPowerToolsリポジトリを有効化した際の記録です。

検証した環境は以下です。

```
$ cat /etc/redhat-release 
CentOS Linux release 8.3.2011
```

## EPELとPowerToolsについて

例えばImageMagickなどはEPELデフォルトで利用できるリポジトリでは提供されていません。
EPELを有効化することで利用できるようになります。

```
$ dnf install ImageMagick* 
===============================================================================================
 Package                                 Arch      Version                 Repository     Size
===============================================================================================
Installing:
 ImageMagick                             x86_64    6.9.10.86-1.el8         epel          195 k
 ImageMagick-c++                         x86_64    6.9.10.86-1.el8         epel          194 k
 ImageMagick-c++-devel                   x86_64    6.9.10.86-1.el8         epel          122 k
 ImageMagick-devel                       x86_64    6.9.10.86-1.el8         epel          126 k
 ImageMagick-doc                         x86_64    6.9.10.86-1.el8         epel          4.7 M
 ImageMagick-libs                        x86_64    6.9.10.86-1.el8         epel          2.3 M
 ImageMagick-perl                        x86_64    6.9.10.86-1.el8         epel          170 k
```

### EPEL

EPELについての説明はFedoraprojectに記載があったので引用します。

> エンタープライズ Linux 用の拡張パッケージ(EPEL) は、 Red Hat Enterprise Linux (RHEL) 向けの高品質なアドオンパッケージであり、CentOS や Scientific Linux (SL) のような RHEL からスピンオフしたディストリビューションと互換性のある、Fedora プロジェクトで有志によって作成されたパッケージになります。Fedora は RHEL のアップストリームであり、EPEL のアドオンパッケージは主に RHEL 向けにビルドされた Fedora リポジトリをソースとしています。

[EPEL/ja - Fedora Project Wiki](https://fedoraproject.org/wiki/EPEL/ja)

簡単に言うとFedoraの有志が開発・メンテナンスしているRHELやCentOSでも使えるリポジトリです。

### PowerTools

CentOS で利用できるリポジトリの1つです。
PowerTools リポジトリには、多くの EPEL パッケージに必要な開発ツールが含まれています。

## EPELとPowerToolsの有効化

### Powertoolsの有効化

PowerToolsはデフォルトで無効になっています。この設定は `/etc/yum.repos.d/CentOS-Linux-PowerTools.repo` に記載されているため変更します。

```shell
# デフォルト: 無効
enabled=0
```

↓

```shell
# 変更後: 有効
enabled=1
```

### epel-releaseのインストール

次のコマンドで epel-release をインストールします。インストール後リポジトリを更新します。

```
$ dnf install epel-release
$ dnf update
```

CentOS8でImageMagickなどはEPELで提供されています。

## 参考にしたサイト

[CentOS、RHEL、または Amazon Linux を実行している EC2 インスタンスの EPEL リポジトリを有効にする](https://aws.amazon.com/jp/premiumsupport/knowledge-center/ec2-enable-epel/)

[EPEL - Fedora Project Wiki](https://fedoraproject.org/wiki/EPEL)

[Enable PowerTools Repository on CentOS 8 / RHEL 8](https://computingforgeeks.com/enable-powertools-repository-on-centos-rhel-linux/)

[ヘルプ:dnf用リポジトリ追加(CentOS8)](https://sudachi.jp/wiki/%E3%83%98%E3%83%AB%E3%83%97:dnf%E7%94%A8%E3%83%AA%E3%83%9D%E3%82%B8%E3%83%88%E3%83%AA%E8%BF%BD%E5%8A%A0(CentOS8))

[CentOS 8 : 初期設定 : リポジトリを追加する : Server World](https://www.server-world.info/query?os=CentOS_8&p=initial_conf&f=7)

[EPEL8がリリースされました。使い始めましょう。 - 赤帽エンジニアブログ](https://rheb.hatenablog.com/entry/2019/08/16/EPEL8%E3%81%8C%E3%83%AA%E3%83%AA%E3%83%BC%E3%82%B9%E3%81%95%E3%82%8C%E3%81%BE%E3%81%97%E3%81%9F%E3%80%82%E4%BD%BF%E3%81%84%E5%A7%8B%E3%82%81%E3%81%BE%E3%81%97%E3%82%87%E3%81%86%E3%80%82)
