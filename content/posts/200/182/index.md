---
title: "Ansible で Docker に LAMP環境を構築するハンズオンを作った"
path: "/entry/182"
date: "2020-01-12 19:16:48"
coverImage: "../../../images/thumbnail/docker-logo.png"
author: "s-yoshiki"
tags: ["linux","docker","ansible"]
---

## 概要

ansibleでdocker上にApache MariaDB PHP 環境を構築する方法を簡単に紹介します。

## リポジトリ

利用するコードはこちらのリポジトリに登録しました。このリポジトリを例に説明します。

<!-- wp:embed {"url":"https://github.com/s-yoshiki/docker-ansible-handson"} -->
<figure class="wp-block-embed"><div class="wp-block-embed__wrapper">
https://github.com/s-yoshiki/docker-ansible-handson
</div></figure>
<!-- /wp:embed -->

<!-- wp:heading {"level":3} -->

### リポジトリ構成

```
docker-ansible-handson
├── README.md
├── docker-compose.yml   # docker構成
├── ansible
│   ├── Dockerfile
│   └── data   # ansible playbook を配置するディレクトリ
├── db
│   └── Dockerfile
└── web
    └── Dockerfile
```

## Docker構成

今回利用するdocker-composeの構成がこちらです

```yml
version: '3'
services:
  ansible:
    container_name: ansible 
    build: ansible
    tty: true
    privileged: true
    working_dir: "/var/data"
    volumes:
      - ./ansible/data:/var/data  
    networks:
      - my-network1
  web-0:
    container_name: web
    build: web
    tty: true
    privileged: true
    ports:
      - 8080:80
      - 8443:443
    networks:
      - my-network1
    command: "/sbin/init"
  db-0:
    container_name: db
    build: db
    tty: true
    privileged: true
    networks:
      - my-network1
    command: "/sbin/init"

networks:
  my-network1:
```

<!-- wp:list -->
<ul><li>ansibleコンテナ：ansibleを実行し各サーバのプロビジョニングを行う</li><li>web-0コンテナ：ベースはCentOS7。Apache PHPが設定されWebサーバとして振舞う</li><li>db-0コンテナ：ベースはCentOS7。MySQLサーバとして振舞う</li></ul>
<!-- /wp:list -->

## Ansible role の構成

ansible の roll は playbook の内容を分割して定義する事で再利用性を高める事ができる機能です。構成は次のようにしました。

```shell
ansible/data
└── roles
    ├── apache2 # apacheの設定
    ├── common # 共通の設定
    ├── mariadb # mariadb基本設定
    ├── mariadb-cli # mariadb (cliのみ)
    ├── mariadb-user # mariadb (ユーザごと設定) 
    ├── php # phpの設定
    └── wordpress # WordPressの設定
```

## プロビジョニングの実施

プロビジョニングはansibleコンテナにログインした上で、次のコマンドで行います。

```shell
docker-compose exec ansible /bin/bash # ansibleコンテナにログイン
ansible-playbook -i inventry.ini site-db.yml # dbサーバ プロビジョニング
ansible-playbook -i inventry.ini site-web.yml # webサーバ プロビジョニング
```

