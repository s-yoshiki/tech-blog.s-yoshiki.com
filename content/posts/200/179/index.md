---
title: "DockerでMySQL5.1.73を利用する。docker-composeから起動"
path: "/entry/179"
date: "2019-12-19 00:20:37"
coverImage: "../../../images/thumbnail/mysql-logo.png"
author: "s-yoshiki"
tags: ["linux","mysql","docker","docker-compose"]
---

## 概要

Docker から MySQL 5.1.73 を利用する。

## Dockerのインストールから実行まで

docker imageの pull。 119MBあります。

```
$ docker pull vsamov/mysql-5.1.73
```

コンテナの起動

```
$ docker run -d --name mysql-5.1.73 -p 3307:3306 -e MYSQL_ROOT_PASSWORD=[password] vsamov/mysql-5.1.73:latest
```

## docker-compose から起動

公式で配布されているMySQLのイメージとほぼ同様のパラメータで起動する事ができます。

```
version: "3.5"
services:
  wordpress-db:
    image: vsamov/mysql-5.1.73
    volumes:
      - "./mysql/data:/var/lib/mysql"
    ports:
      - 3306:3306
    environment:
      MYSQL_ROOT_PASSWORD: ${root_password}
      MYSQL_DATABASE: ${mysql_database}
      MYSQL_USER: ${mysql_user}
      MYSQL_PASSWORD: ${mysql_password}
```

## 詳細

<!-- wp:embed {"url":"https://hub.docker.com/r/vsamov/mysql-5.1.73/"} -->
<figure class="wp-block-embed"><div class="wp-block-embed__wrapper">
https://hub.docker.com/r/vsamov/mysql-5.1.73/
</div></figure>
<!-- /wp:embed -->

<!-- wp:embed {"url":"https://github.com/vsamov/mysql-5.1.73"} -->
<figure class="wp-block-embed"><div class="wp-block-embed__wrapper">
https://github.com/vsamov/mysql-5.1.73
</div></figure>
<!-- /wp:embed -->