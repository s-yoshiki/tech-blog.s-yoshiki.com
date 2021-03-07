---
title: "DBクライアントツールはDBeaverをおすすめしたい"
path: "/entry/233"
date: "2021-03-08 01:00"
coverImage: "../../../images/thumbnail/mysql-logo.png"
author: "s-yoshiki"
tags: ["oracle","mysql","sqlite","mariadb","postgresql"]
---

## 概要

今までいくつかのDBクライアントを利用しましたが、中でもDBeaverが無料で使いやすかったです。
なので導入から簡単な使い方を紹介したいと思います。

## DBeaver について

DBeaver についてです。

[https://dbeaver.io](https://dbeaver.io)

[github](https://github.com/dbeaver/dbeaver)

![](https://dbeaver.io/product/dbeaver-ss-mock.png)

![](https://dbeaver.io/product/dbeaver-ss-erd.png)

![](https://dbeaver.io/product/dbeaver-ss-classic-new.png)

![](https://dbeaver.io/product/dbeaver-ss-dark-new.png)

### 特徴

DBeaverは、開発者、SQLエンジニア、データベース管理者、アナリスト向けの無料のマルチプラットフォームデータベースツールを謳っています。
JDBCドライバーを備えたすべてのデータベースをサポートしており。80を超えるデータベースをサポートしています。

CE(無料版)とEE(有料版)があります。

### 対応DB

MySQL、PostgreSQL、SQLite、Oracle、DB2、SQL Server、Sybase、MS Access、Teradata、Firebird、Apache Hive、Phoenix、Prestoなどの一般的なすべてのデータベースをサポートしています。

EEバージョン(有償版)は、非JDBCデータソース（MongoDB、Cassandra、Couchbase、Redis、BigTable、DynamoDBなど）もサポートします。

### 対応OS

Windows / Mac / Linux でアプリケーションが提供されています。
また、Eclipseのプラグインとして動作させることも可能です。


### 利用環境

DBeaverを実行するにはJavaが必要です。Open JDK 11は、すべてのDBeaverディストリビューションに含まれています。（バージョン7.3.1以降）。dbeaverインストールフォルダの
ディレクトリjreを置き換えることで、デフォルトのJDKバージョンを変更できます。

### アーカイブ

過去のバージョンのアーカイブはこちらから取得できます。

[https://dbeaver.io/files/](https://dbeaver.io/files/)

## インストール

インストールに関する情報はこちらに記載されています。

[https://github.com/dbeaver/dbeaver/wiki/Installation](https://github.com/dbeaver/dbeaver/wiki/Installation)

### windows

Windowsの場合はMicrosoftStoreからインストール

[https://www.microsoft.com/ja-jp/p/dbeaver-ce/9pnkdr50694p?rtc=1#activetab=pivot:overviewtab](https://www.microsoft.com/ja-jp/p/dbeaver-ce/9pnkdr50694p?rtc=1#activetab=pivot:overviewtab)

zipでインストール

[https://dbeaver.io/files/dbeaver-ce-latest-win32.win32.x86_64.zip](https://dbeaver.io/files/dbeaver-ce-latest-win32.win32.x86_64.zip)

インストラーからインストール

[https://dbeaver.io/files/dbeaver-ce-latest-x86_64-setup.exe](https://dbeaver.io/files/dbeaver-ce-latest-x86_64-setup.exe)

もしくは chocolateyでインストールできます。

```shell
choco install dbeaver
```

### mac

Macの場合は

dmgからインストールする

[https://dbeaver.io/files/dbeaver-ce-latest-macos.dmg](https://dbeaver.io/files/dbeaver-ce-latest-macos.dmg)

tarを解答してインストール

[https://dbeaver.io/files/dbeaver-ce-latest-macosx.cocoa.x86_64.tar.gz](https://dbeaver.io/files/dbeaver-ce-latest-macosx.cocoa.x86_64.tar.gz)

もしくは homebrew or mac portsでインストールします。

```shell
brew install --cask dbeaver-community
# or
sudo port install dbeaver-community
```

### Linux

LinuxのDebianパッケージ版は

[https://dbeaver.io/files/dbeaver-ce_latest_amd64.deb](https://dbeaver.io/files/dbeaver-ce_latest_amd64.deb)

RPMパッケージ版は

[https://dbeaver.io/files/dbeaver-ce-latest-stable.x86_64.rpm](https://dbeaver.io/files/dbeaver-ce-latest-stable.x86_64.rpm)

https://dbeaver.io/download/

からパッケージを取得できます。

また debianでは

```shell
wget -O-https：//dbeaver.io/debs/dbeaver.gpg.key | sudo apt-keyadd-
echo "deb https://dbeaver.io/debs/dbeaver-ce /" | sudo tee /etc/apt/sources.list.d/dbeaver.list
sudo apt-get update && sudo apt-get install dbeaver-ce
```

Ubuntuでは

```shell
sudo add-apt-repository ppa：serge-rider / dbeaver-ce
sudo apt-get update
sudo apt-get install dbeaver-ce
```

snpaコマンドで実施する場合は

```shell
sudo snap install dbeaver-ce
```

## コネクションの作成

「New Connection Wizard」ボタンをクリックします。

![https://github.com/dbeaver/dbeaver/wiki/images/ug/Create-new-connection-button.png](https://github.com/dbeaver/dbeaver/wiki/images/ug/Create-new-connection-button.png)

Data Base -> New Connection を選択します。

![https://github.com/dbeaver/dbeaver/wiki/images/ug/Create-new-connection-menu-item.png](https://github.com/dbeaver/dbeaver/wiki/images/ug/Create-new-connection-menu-item.png)

メニューバーから  File -> New を選択します。

![https://github.com/dbeaver/dbeaver/wiki/images/ug/Create-new-connection-menu-item1.png](https://github.com/dbeaver/dbeaver/wiki/images/ug/Create-new-connection-menu-item1.png)

DataBase Connection を選択し次に進みます。

![https://github.com/dbeaver/dbeaver/wiki/images/ug/New-connection-option.png](https://github.com/dbeaver/dbeaver/wiki/images/ug/New-connection-option.png)

任意のデータベースを選択します。

![https://github.com/dbeaver/dbeaver/wiki/images/ug/Simple-mode-connection-view.png](https://github.com/dbeaver/dbeaver/wiki/images/ug/Simple-mode-connection-view.png)

詳細な接続情報を入力します。例えばMySQLの場合はホスト、ポート、データベース、ユーザ・パスワードを入力します。他の多くのDBも同じような接続情報を入力します。

![https://github.com/dbeaver/dbeaver/wiki/images/ug/Wizard-MySQL-settings.png](https://github.com/dbeaver/dbeaver/wiki/images/ug/Wizard-MySQL-settings.png)

SSHを利用した接続も可能です。

## SQLを実行する

エディタからスクリプトを流し込み実行することができます。

![https://github.com/dbeaver/dbeaver/wiki/images/ug/SQL-Editor.png](https://github.com/dbeaver/dbeaver/wiki/images/ug/SQL-Editor.png)

SQLエディターは、上部にスクリプトのパネル、下部に結果パネルで構成されています。

## その他

### CloudBeaverについて

CloudBeaver は2020年に公開された、Webインタフェースを提供するSQLデベロッパーツールです。

