---
title: "CentOS8/RHEL8でのRPM管理における検討事項"
path: "/entry/252"
date: "2021-12-01 01:00"
coverImage: "../../../images/thumbnail/linux-logo.png"
author: "s-yoshiki"
tags: ["centos","linux","redhat","fedora"]
---

## 初めに

CentOS8/RHEL8環境にてRPMを導入・検討・調査・構築を行なった際のメモです。

## 前提

事前準備として、まずRPMや各種関連用語について簡単に触れておきます。

**rpm**

RHEL, CentOS, Fedoraで利用されているパッケージ管理システムであり、
従来のアーカイブファイルを配信する方法と比べてソフトウェアを配布、管理、更新、検証が容易となります。

またパッケージはバイナリパッケージとソースパッケージの2種類に分類できます。

**rpm yum dnf コマンド**

rpmコマンドはパッケージ単体の導入・更新を行うためのコマンドです。

dnf/yumはパッケージの導入や更新を包括的に行い依存関係の解決を行うための管理コマンドです。
※また、dnfはyumの実質的な後継バージョンのパッケージ管理ソフトです。

**リポジトリ**

リポジトリとは、あらゆるユーザー・ベンダが開発したパッケージを管理している貯蔵庫のようなものです。

例えばCentOSでは標準のリポジトリ以外の拡張リポジトリとして、Fedora プロジェクトで有志によって作成されているepelや、PHPに関する新しいモジュールが提供されているremiがあります。

詳細は次のリンクで紹介されています。

[Available Repositories for CentOS](https://wiki.centos.org/AdditionalResources/Repositories)

## リポジトリとライフサイクル

### AppStream

RHEL8及びCentOS8ではApplication Streams(AppStream)が導入され、BaseOSとともに2つの方式で配信されています。

特徴は以下のような物があります。

 - BaseOS
   - OSの動作に不可欠であり、安定性が重視される
   - 10年間サポートされる
 - AppStream
   - app開発に用いるパッケージ群
   - 段階的にバージョンアップされる
   - 10年間のサポートは受けられない
   - 異なるバージョンは共存出来ない

### Compatibility Level について

元々RHELではCompatibility Level(CL)と呼ばれる、パッケージを段階的に管理する仕組みがあります。

詳しくは以下の記事に記載されています。

> RHEL 7までは、以下のようになっていました。
> 
> Compatibility Level (以下CL) 1は3つのメジャーバージョンに渡ってAPI/ABIの互換性を維持
> CL 2では1つのメジャーバージョン内でAPI/ABIの互換性を維持
> CL 3は将来のため未使用
> CL 4は互換性を維持しません。
>
> RHEL 8では、CL 3が新しく登場し、以下のように変わります。
> 
> CL 1は3つのメジャーバージョンに渡ってAPI/ABIの互換性を維持
> CL 2では1つのメジャーバージョン内でAPI/ABIの互換性を維持
> CL 3は各コンポーネントについてあらかじめ定義された期間維持し、期間が終了する前に新しいバージョンを継続的に提供
> CL 4は互換性を維持しません
>
> 出典 [Red Hat Enterprise Linux 8 で 10年維持されるパッケージはどれ? - 赤帽エンジニアブログ](https://rheb.hatenablog.com/entry/rhel8lifecycle)

このうちCL3、CL4がAppStreamとなります。

さらに詳しい情報については [Red Hat Enterprise Linux 8: Application Compatibility GUIDE - Red Hat Customer Portal](https://access.redhat.com/articles/rhel8-abi-compatibility#Appendix) に記載されています。


### AppStreamのサポート期間

[Red Hat Enterprise Linux 8 Application Streams  Life Cycle - Red Hat Customer Portal](https://access.redhat.com/support/policy/updates/rhel8-app-streams-life-cycle)

ここで紹介されている表をもとに各種コンポーネントの保守期間は次の通りとなります。(2022/01時点での情報)

**nodejs**

| Application Stream | Release Date | Retirement Date | Release |
| :----------------- | :----------- | :-------------- | :------ |
| nodejs 16          | Nov 2021     | Apr 2024        | 8.5     |
| nodejs 14          | Nov 2020     | Apr 2023        | 8.3     |
| nodejs 12          | Nov 2019     | Apr 2022        | 8.1.0   |
| nodejs 10          | May 2019     | Apr 2021        | 8.0.0   |

**python**

| Application Stream | Release Date | Retirement Date | Release |
| :----------------- | :----------- | :-------------- | :------ |
| python 3.9         | May 2021     | May 2024        | 8.4     |
| python 3.8         | Apr 2020     | May 2023        | 8.2.0   |
| python 2.7         | May 2019     | Jun 2024        | 8.0.0   |


**ruby**

| Application Stream | Release Date | Retirement Date | Release |
| :----------------- | :----------- | :-------------- | :------ |
| ruby 3.0           | Nov 2021     | Mar 2024        | 8.5     |
| ruby 2.7           | Nov 2020     | Mar 2023        | 8.3     |
| ruby 2.6           | Nov 2019     | Mar 2022        | 8.1.0   |
| ruby 2.5           | May 2019     | May 2029        | 8.0.0   |

**php**

| Application Stream | Release Date | Retirement Date | Release |
| :----------------- | :----------- | :-------------- | :------ |
| php 7.4            | Nov 2020     | May 2029        | 8.3     |
| php 7.3            | Nov 2019     | Nov 2021        | 8.1.0   |
| php 7.2            | May 2019     | May 2021        | 8.0.0   |

**perl**

| Application Stream | Release Date | Retirement Date | Release |
| :----------------- | :----------- | :-------------- | :------ |
| perl 5.30          | Nov 2020     | Nov 2023        | 8.3     |
| perl 5.26          | May 2019     | May 2029        | 8.0.0   |
| perl 5.24          | May 2019     | May 2021        | 8.0.0   |

**postgresql**

| Application Stream | Release Date | Retirement Date | Release |
| :----------------- | :----------- | :-------------- | :------ |
| postgresql 13      | May 2021     | May 2026        | 8.4     |
| postgresql 12      | Feb 2020     | May 2029        | 8.1.1   |
| postgresql 10      | May 2019     | May 2024        | 8.0.0   |
| postgresql 9.6     | May 2019     | Nov 2021        | 8.0.0   |

**nginx**

| Application Stream | Release Date | Retirement Date | Release |
| :----------------- | :----------- | :-------------- | :------ |
| nginx 1.20         | Nov 2021     | Nov 2023        | 8.5     |
| nginx 1.18         | Nov 2020     | Nov 2022        | 8.3     |
| nginx 1.16         | Nov 2019     | Nov 2021        | 8.1.0   |
| nginx 1.14         | May 2019     | May 2021        | 8.0.0   |


**redis**

| Application Stream | Release Date | Retirement Date | Release |
| :----------------- | :----------- | :-------------- | :------ |
| redis 6            | May 2021     | May 2024        | 8.4     |
| redis 5            | May 2019     | May 2022        | 8.0.0   |

## Yum v3 -> Yum v4

RHEL8ではYym(v4)が導入されました。
v3からの変更点は次の記事に記載されています。

[Changes in DNF CLI compared to YUM &mdash; dnf latest documentation](https://dnf.readthedocs.io/en/latest/cli_vs_yum.html)

## リンク

 - [RHEL 8 の導入における検討事項 Red Hat Enterprise Linux 8 | Red Hat Customer Portal](https://access.redhat.com/documentation/ja-jp/red_hat_enterprise_linux/8/html-single/considerations_in_adopting_rhel_8/index)
 - [Red Hat Enterprise Linux 8 で 10年維持されるパッケージはどれ? - 赤帽エンジニアブログ](https://rheb.hatenablog.com/entry/rhel8lifecycle)
 - [Fedora/CentOS Stream/CentOS/RHELの関係性 - 赤帽エンジニアブログ](https://rheb.hatenablog.com/entry/202007-fedora-distribution)
 - [Changes in DNF CLI compared to YUM &mdash; dnf latest documentation](https://dnf.readthedocs.io/en/latest/cli_vs_yum.html)