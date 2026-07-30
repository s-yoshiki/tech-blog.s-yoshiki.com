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

公式インストーラーにはOpenJDKが同梱されるため、通常はJavaを別途インストールする必要はありません。対応OSや同梱Javaのバージョンは更新されるため、導入時に公式Installationページを確認してください。

### アーカイブ

過去のバージョンのアーカイブはこちらから取得できます。

[https://dbeaver.io/files/](https://dbeaver.io/files/)

## インストール

インストールに関する情報はこちらに記載されています。

[DBeaver公式 Installation](https://dbeaver.com/docs/dbeaver/Installation/)

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

ダウンロードしたパッケージを使う場合は次のようにインストールできます。

```shell
# Debian / Ubuntu
sudo dpkg -i dbeaver-<version>.deb

# RPM系
sudo rpm -ivh dbeaver-<version>.rpm
```

Snapで実施する場合は

```shell
sudo snap install dbeaver-ce
```

## コネクションの作成

「New Connection Wizard」ボタンをクリックします。

![https://github.com/dbeaver/dbeaver/wiki/images/ug/Create-new-connection-button.png](https://github.com/dbeaver/dbeaver/wiki/images/ug/Create-new-connection-button.png)

Data Base -> New Connection を選択します。

![https://github.com/dbeaver/dbeaver/wiki/images/ug/Create-new-connection-menu-item.png](https://github.com/dbeaver/dbeaver/wiki/images/ug/Create-new-connection-menu-item.png)

メニューバーから File -> New を選択します。

![https://github.com/dbeaver/dbeaver/wiki/images/ug/Create-new-connection-menu-item1.png](https://github.com/dbeaver/dbeaver/wiki/images/ug/Create-new-connection-menu-item1.png)

DataBase Connection を選択し次に進みます。

![https://github.com/dbeaver/dbeaver/wiki/images/ug/New-connection-option.png](https://github.com/dbeaver/dbeaver/wiki/images/ug/New-connection-option.png)

任意のデータベースを選択します。

![https://github.com/dbeaver/dbeaver/wiki/images/ug/Simple-mode-connection-view.png](https://github.com/dbeaver/dbeaver/wiki/images/ug/Simple-mode-connection-view.png)

詳細な接続情報を入力します。例えばMySQLの場合はホスト、ポート、データベース、ユーザ・パスワードを入力します。他の多くのDBも同じような接続情報を入力します。

![https://github.com/dbeaver/dbeaver/wiki/images/ug/Wizard-MySQL-settings.png](https://github.com/dbeaver/dbeaver/wiki/images/ug/Wizard-MySQL-settings.png)

SSHを利用した接続も可能です。

## 安全な接続設定

- 本番DBへは可能なら読み取り専用ユーザーで接続する
- パスワードを共有せず、ユーザーごとに監査できる認証情報を使う
- インターネットへDBポートを直接公開せず、VPNやSSHトンネルを使う
- TLSを有効化し、サーバー証明書を検証する
- 接続名に `production` など環境を明記し、色分けして誤操作を減らす
- 自動コミットの状態を確認し、更新系SQLはトランザクション内で実行する

DBeaverは接続ごとにConnection typeを設定でき、開発・テスト・本番を色で区別できます。SQL実行前に接続先ホストとデータベース名も確認してください。

## SQLを実行する

エディタからスクリプトを流し込み実行することができます。

![https://github.com/dbeaver/dbeaver/wiki/images/ug/SQL-Editor.png](https://github.com/dbeaver/dbeaver/wiki/images/ug/SQL-Editor.png)

SQLエディターは、上部にスクリプトのパネル、下部に結果パネルで構成されています。

複数文を含むスクリプト全体の実行と、カーソル位置にある1文だけの実行はショートカットが異なります。意図しないUPDATEやDELETEを避けるため、実行対象のハイライトと件数条件を確認してください。最初にSELECTで対象を確認し、必要ならトランザクションを開始してから更新します。

## よくあるトラブル

### ドライバーを取得できない

初回接続時にJDBCドライバーがダウンロードされます。社内Proxy環境では、DBeaverのNetwork Connections設定にProxyを登録するか、社内で許可されたドライバー配布方法を利用します。

### タイムゾーンや文字コードがずれる

クライアント、JDBCドライバー、DBサーバー、セッションの設定が一致しているか確認します。接続プロパティで一時的に回避する前に、どの層で変換されたかを切り分けます。

### 接続できない

ホスト名、ポート、データベース名、認証方式に加えて、DNS、ファイアウォール、セキュリティグループ、VPN、TLS証明書を順に確認します。SSHトンネル利用時は、DBのホスト名が「手元から見た名前」ではなく「SSH接続先から見た名前」になる点にも注意します。

## その他

### CloudBeaverについて

CloudBeaver は2020年に公開された、Webインタフェースを提供するSQLデベロッパーツールです。

## 参考

- [DBeaver Documentation](https://dbeaver.com/docs/)
- [DBeaver Installation](https://dbeaver.com/docs/dbeaver/Installation/)
- [DBeaver Community](https://dbeaver.io/)
