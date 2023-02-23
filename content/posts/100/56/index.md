---
title: "MySQLで--skip-name-resolveとかいうエラーが発生。解決した時のメモ。"
path: "/entry/56"
date: "2018-09-27 21:54:39"
coverImage: "../../../images/thumbnail/wordpress-logo.png"
author: "s-yoshiki"
tags: ["データベース","mysql"]
---

## 概要

MySQLでデータベースを作成しようとすると、--skip-name-resolveとエラー。
なんとか解決できたので、その時の内容を記す。

## 環境

- Ubuntu 14.04
- MySQL 5.7.19

## エラー内容

```sql
GRANT ALL ON test_database.* TO user_name@localhost
```

を実行すると、

<blockquote>Query OK, 0 rows affected, 1 warning (0.00 sec)</blockquote>
と表示され、失敗した。

```sql
SHOW WARNINGS\G
```

でエラー内容を探すと、

<blockquote>MySQL is started in --skip-name-resolve mode; you must restart it without this switch for this grant to work</blockquote>
と表示された。

このエラーが出るときは名前解決が行われていないときに出現するという情報を見たので、localhostではなくIPに変更してコマンドを実行。

```sql
GRANT ALL ON test_database.* TO user_name@127.0.0.1
```

<blockquote>Query OK, 0 rows affected (0.00 sec)</blockquote>
できらっぁ！

## 参考

https://netcreates.jp/blog/2009/05/skip-name-resolvedb.html
