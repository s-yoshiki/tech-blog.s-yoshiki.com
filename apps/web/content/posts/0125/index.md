---
title: "SQLを分けると DML DDL DCL の3種類"
path: "/entry/125"
date: "2019-05-19 11:48:48"
coverImage: "../../../images/thumbnail/mysql-logo.png"
author: "s-yoshiki"
tags: ["データベース","mysql","oracle","sql","dml","ddl","dcl"]
---

## SQLとは

データベースの問い合わせ言語です。
大きく分けると3種類あります。

### DML

レコードの操作 (追加、検索、更新、削除) などを行います。
SELECT INSERT UPDATE DELETE
など

### DDL

テーブルの操作 (作成、削除、変更) などを行います。
CREATE DROP
など

### DCL

データベースの権限の設定や生合成の制御 (トランザクションなど) を行います。
GRANT COMMIT ROLLBACK
