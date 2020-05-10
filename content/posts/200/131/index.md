---
title: "dockerでオリジナルのイメージを作成 外部出力まで"
path: "/entry/131"
date: "2019-06-09 19:32:04"
coverImage: "../../../images/thumbnail/docker.jpg"
author: "s-yoshiki"
tags: ["linux","docker","docker-ce","centos","コンテナ"]
---

## 概要

既存のコンテナを拡張してオリジナルのdockerイメージを作成する方法の紹介。
イメージを作成するところから、ファイル出力するところまで。

## docker の 導入

dockerを導入します。
Macであればこの辺りを参考にしてください。

<a href="https://tech-blog.s-yoshiki.com/2019/06/1270/">https://tech-blog.s-yoshiki.com/2019/06/1270/</a>

検証するバージョンはこちらです。

```shell
$ docker -v       
Docker version 18.09.2, build 6247962
$ docker version   
Client: Docker Engine - Community
 Version:           18.09.2
 API version:       1.39
 Go version:        go1.10.8
 Git commit:        6247962
 Built:             Sun Feb 10 04:12:39 2019
 OS/Arch:           darwin/amd64
 Experimental:      false

Server: Docker Engine - Community
 Engine:
  Version:          18.09.2
  API version:      1.39 (minimum version 1.12)
  Go version:       go1.10.6
  Git commit:       6247962
  Built:            Sun Feb 10 04:13:06 2019
  OS/Arch:          linux/amd64
  Experimental:     false
```

## ベースのdockerイメージの導入

### イメージの検索

ベースとなるdockerイメージを導入します。
centosで試してみます。

docker searchで任意のイメージを検索します。

```shell
$ docker search centos 
NAME                               DESCRIPTION                                     STARS               OFFICIAL            AUTOMATED
centos                             The official build of CentOS.                   5395                [OK]                
ansible/centos7-ansible            Ansible on Centos7                              121                                     [OK]
jdeathe/centos-ssh                 CentOS-6 6.10 x86_64 / CentOS-7 7.5.1804 x86…   110                                     [OK]
consol/centos-xfce-vnc             Centos container with "headless" VNC session…   91                                      [OK]
imagine10255/centos6-lnmp-php56    centos6-lnmp-php56                              56                                      [OK]
centos/mysql-57-centos7            MySQL 5.7 SQL database server                   53                                      
tutum/centos                       Simple CentOS docker image with SSH access      44                                      
centos/postgresql-96-centos7       PostgreSQL is an advanced Object-Relational …   37                                      
kinogmt/centos-ssh                 CentOS with SSH                                 26                                      [OK]
guyton/centos6                     From official centos6 container with full up…   10                                      [OK]
pivotaldata/centos-gpdb-dev        CentOS image for GPDB development. Tag names…   10                                      
drecom/centos-ruby                 centos ruby                                     6                                       [OK]
mamohr/centos-java                 Oracle Java 8 Docker image based on Centos 7    3                                       [OK]
pivotaldata/centos                 Base centos, freshened up a little with a Do…   3                                       
darksheer/centos                   Base Centos Image -- Updated hourly             3                                       [OK]
pivotaldata/centos-mingw           Using the mingw toolchain to cross-compile t…   2                                       
miko2u/centos6                     CentOS6 日本語環境                                   2                                       [OK]
mcnaughton/centos-base             centos base image                               1                                       [OK]
indigo/centos-maven                Vanilla CentOS 7 with Oracle Java Developmen…   1                                       [OK]
pivotaldata/centos-gcc-toolchain   CentOS with a toolchain, but unaffiliated wi…   1                                       
blacklabelops/centos               CentOS Base Image! Built and Updates Daily!     1                                       [OK]
pivotaldata/centos7-dev            CentosOS 7 image for GPDB development           0                                       
fortinj66/centos7-s2i-nodejs       based off of ryanj/centos7-s2i-nodejs.  Bigg…   0                                       
smartentry/centos                  centos with smartentry                          0                                       [OK]
pivotaldata/centos6.8-dev          CentosOS 6.8 image for GPDB development         0
```

ありました。

### イメージのpull

次のコマンドでイメージをpullします。

```shell
# centos7のpull
$ docker pull centos:7
```

確認します。

```shell
# イメージ一覧の表示
$ docker images
REPOSITORY          TAG                 IMAGE ID            CREATED             SIZE
centos              7                   9f38484d220f        2 months ago        202MB
```

pullできているのが確認できました。
202MBほどあります。

## コンテナの起動からカスタマイズまで

### イメージの起動

イメージの起動をします。
ここではex-centos7という タグ をつけて起動します。

```shell
$ docker run --name ex-centos7 -i -t centos:7 /bin/bash
```

### コンテナ内の設定

コンテナにログインをするので
任意の設定を行ないます。

```shell
# 例
$ yum update
$ yum groupinstall -y "Development tools"
```

終了する場合はexitします。

```shell
exit
```

### イメージの確認

docker psで起動したコンテナを確認してみます。

```shell
docker ps -a
CONTAINER ID        IMAGE               COMMAND             CREATED             STATUS                     PORTS               NAMES
8c001d57034d        centos:7            "/bin/bash"         10 minutes ago      Exited (0) 5 seconds ago                       ex-centos7
```

## カスタムイメージの作成

### コンテナからカスタムイメージの作成

commitコマンドで作成したコンテナからカスタムイメージを作成します。
commitコマンドは次のように使います。

```shell
$ docker commit ${コンテナID} ${イメージ}:${タグ}
```

今回の条件であれば次のようになります。

```shell
$ docker commit 8c001d57034d centos:ex-centos7
sha256:74bb70d21c8f84809b1169f3a0f0fd990c92ad7df8810034dfbaf88b47cdc3c8
```

イメージを確認してみます。

```shell
$ docker images
REPOSITORY          TAG                 IMAGE ID            CREATED             SIZE
centos              ex-centos7          74bb70d21c8f        3 minutes ago       655MB
centos              7                   9f38484d220f        2 months ago        202MB
```

### カスタムイメージからコンテナの作成

runコマンドでカスタムイメージからコンテナを作成します。

```shell
docker run --name test-centos7 -i -t centos:ex-centos7 /bin/bash
```

### カスタムイメージの削除

rmiコマンドで作成したイメージを削除します。

```shell
$ docker rmi centos:ex-centos7
```

## イメージの save/load

### save

dockerのイメージに付属するメタ情報を含めたイメージを保存します。
docker saveは次のように使います。

```shell
$ docker save ${オプション} ${イメージ名}
```

実際に実行してみます。

```shell
docker save centos:ex-centos7 > saved-image.tar
```

docker imagesで確認した際にはイメージのサイズは655MBありましたが、
書き出してみると685MBになりました。

### load

saveされたイメージを読み込みます。

```shell
$ docker load <  saved-image.tar
```

## イメージの export/import

### export

コンテナを保存します。メタ情報などは除外されます。
コマンドは次のように使います。

```shell
$ docker export ${オプション} ${コンテナ名|コンテナID}
```

実際に実行します。

```shell
docker export ex-centos7 > exported-image.tar
```

こちらは、572MBで出力されました。

### import

imporは次のように使います。

```shell
$ docker import ${ファイル} - ${レポジトリ${:タグ}}
```

実際に使います。

```shell
$ cat exported-image.tar | docker import - centos7-ex:tag1
```

### save と exportの違い

save と exportの機能は上でも触れていますが、
docker hub を使わず、別のマシンにコンテナを渡したいのであれば、save/loadを使うのが良いのかもしれません。

<a href="https://tuhrig.de/difference-between-save-and-export-in-docker/">https://tuhrig.de/difference-between-save-and-export-in-docker/</a>

## 参考

<a href="https://training.play-with-docker.com/beginner-linux/">https://training.play-with-docker.com/beginner-linux/</a>

<a href="https://www.slideshare.net/zembutsu/docker-images-containers-and-lifecycle">https://www.slideshare.net/zembutsu/docker-images-containers-and-lifecycle</a>

<a href="https://uxmilk.jp/55512">https://uxmilk.jp/55512</a>