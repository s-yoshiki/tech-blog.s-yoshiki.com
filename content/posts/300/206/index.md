---
title: "CentOS8でEPELとPowerToolsリポジトリの有効化"
path: "/entry/206"
date: "2020-11-30"
coverImage: "../../../images/thumbnail/centos-logo.png"
author: "s-yoshiki"
tags: ["centos","redhat", "EPEL", "PowerTools", "fedora"]
---

## 概要

CentOS8でEPELとPowerToolsリポジトリを有効化した際の記録です。

検証した環境は以下です。

```
$ cat /etc/redhat-release 
CentOS Linux release 8.3.2011
```

## EPELとPowerToolsについて

### EPEL

EPELについての説明はFedoraprojectに記載があったので引用します。

>  エンタープライズ Linux 用の拡張パッケージ(EPEL) は、 Red Hat Enterprise Linux (RHEL) 向けの高品質なアドオンパッケージであり、CentOS や Scientific Linux (SL) のような RHEL からスピンオフしたディストリビューションと互換性のある、Fedora プロジェクトで有志によって作成されたパッケージになります。Fedora は RHEL のアップストリームであり、EPEL のアドオンパッケージは主に RHEL 向けにビルドされた Fedora リポジトリをソースとしています。


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


## 参考にしたサイト

[CentOS、RHEL、または Amazon Linux を実行している EC2 インスタンスの EPEL リポジトリを有効にする](https://aws.amazon.com/jp/premiumsupport/knowledge-center/ec2-enable-epel/)

[EPEL - Fedora Project Wiki](https://fedoraproject.org/wiki/EPEL)