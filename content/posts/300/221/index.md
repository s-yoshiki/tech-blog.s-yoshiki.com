---
title: "MySQL8.0 で利用できるパラメータを表示する方法"
path: "/entry/221"
date: "2021-01-27 23:00"
coverImage: "../../../images/thumbnail/mysql-logo.png"
author: "s-yoshiki"
tags: ["mysql","mariadb","centos","linux"]
---

## 概要

mysql8.0でmy.cnfなどで利用できるパラメータ一覧を出す方法。

## オプションの表示

オプションの表示は次のコマンドで実施できます

```shell
$ mysqld --verbose --help
```

[mysqld — The MySQL Server](https://dev.mysql.com/doc/refman/8.0/en/mysqld.html)

[【MySQLパラメーター比較資料】MySQL 5.5、5.6、5.7、8.0のパラメーターを比較したExcelファイル](https://www.mysql.com/jp/why-mysql/presentations/mysql-variables-comparison-ja/)
