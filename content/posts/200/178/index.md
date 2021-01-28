---
title: "phpMyAdminをDockerで起動する設定"
path: "/entry/178"
date: "2019-12-18 00:53:09"
coverImage: "../../../images/thumbnail/mysql-logo.png"
author: "s-yoshiki"
tags: ["データベース","mysql","docker","mariadb","phpmyadmin"]
---

## 概要

phpMyAdminはPHPで実装されているMySQLの管理ツールです。サーバに配置しブラウザから操作するのが特徴です。このphpMyAdminをdocker (docker-compose) を通して利用する方法の紹介です。

## docker-compose の設定

以下の設定でdocker-compose up -dを実行します。http://localhost:8080 をブラウザで開くとphpMyAdminを開始する事ができます。

```
version: "3.5"
services:
  mysql-db:
    image: mysql:5.7
    volumes:
      - "./mysql/data:/var/lib/mysql"
    ports:
      - 3306:3306
    environment:
      MYSQL_ROOT_PASSWORD: root
      MYSQL_DATABASE: foo_database
      MYSQL_USER: mysql_user
      MYSQL_PASSWORD: password

  phpmyadmin:
    image: phpmyadmin/phpmyadmin
    environment:
      - PMA_ARBITRARY=1
      - PMA_HOST=foo_database
      - PMA_USER=mysql_user
      - PMA_PASSWORD=password
    links:
      - mysql-db
    ports:
        - 8080:80
```

## phpMyAdminのコンテナイメージ

<!-- wp:embed {"url":"https://hub.docker.com/r/phpmyadmin/phpmyadmin"} -->
<figure class="wp-block-embed"><div class="wp-block-embed__wrapper">
https://hub.docker.com/r/phpmyadmin/phpmyadmin
</div></figure>
<!-- /wp:embed -->

pullする場合は以下のコマンドから

```
$ docker pull phpmyadmin/phpmyadmin
```

454MBありました。

```
REPOSITORY                              TAG                 IMAGE ID            CREATED             SIZE
phpmyadmin/phpmyadmin                   latest              5c0865e6f546        5 days ago          454MB
```

## GitHub

<!-- wp:embed {"url":"https://github.com/phpmyadmin/docker"} -->
<figure class="wp-block-embed"><div class="wp-block-embed__wrapper">
https://github.com/phpmyadmin/docker
</div></figure>
<!-- /wp:embed -->