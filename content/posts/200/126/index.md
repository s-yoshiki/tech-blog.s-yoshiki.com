---
title: "VIEWの作成 ORACLE MySQL"
path: "/entry/126"
date: "2019-05-19 12:33:48"
coverImage: "../../../images/thumbnail/mysql-logo.png"
author: "s-yoshiki"
tags: ["データベース","mysql","oracle","sql","view"]
---

## 概要

VIEWの作成の基本文法。
SQLで毎回結合したクエリを生成するのが面倒だった場合VIEWを使います。

## VIEWの作成

OracelもMySQLも同じようです。

### 構文

```sql
CREATE VIEW V_TEST AS
SELECT
    tb1.col1 as col_a,
    tb1.col2 as col_b,
    tb2.col1 as col_c,
    tb2.col2 as col_d
FROM 
    table1 as tb1
    JOIN table2 as tb2
    ON tb1.id = tb2.id
```

### VIEWから抽出する

VIEWから項目を抽出する場合は通常のSELECTと同じように記述します

```sql
SELECT
    col_a,
    col_b,
    col_c,
    col_d
FROM
    V_TEST
```

## 参考

<a href="https://www.techscore.com/tech/sql/SQL9/09_01.html/">https://www.techscore.com/tech/sql/SQL9/09_01.html/</a>

<a href="https://www.atmarkit.co.jp/ait/articles/1703/01/news190.html">https://www.atmarkit.co.jp/ait/articles/1703/01/news190.html</a>

<a href="https://sql-oracle.com/?p=1206">https://sql-oracle.com/?p=1206</a>

<a href="https://www.dbonline.jp/mysql/view/index1.html">https://www.dbonline.jp/mysql/view/index1.html</a>