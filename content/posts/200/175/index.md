---
title: "docker-composeで起動したMySQLコンテナのmysqldumpを行うコマンド"
path: "/entry/175"
date: "2019-12-04 00:27:31"
coverImage: "../../../images/thumbnail/docker-logo.png"
author: "s-yoshiki"
tags: ["docker","mysql","mariadb"]
---

## 概要

docker-composeで起動したMySQLコンテナに対して、mysqldumpを行いdumpデータを取得する方法の紹介

## 環境

macOS catalina

## コマンド

```
docker exec -it $(docker-compose ps -q ${mysqlコンテナ名}) /usr/bin/mysqldump -u${MySQLユーザID} -h${MySQLホスト} -p${MySQLパスワード} ${データベース名} 2>/dev/null > ./mysqldump.sql
```

