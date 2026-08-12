---
title: "【※サービス終了】TeamSQLでバインド変数を用いてMySQLのクエリを実行。"
path: "/entry/60"
date: "2018-10-08 23:29:58"
coverImage: "../../../images/thumbnail/mysql-logo.png"
author: "s-yoshiki"
tags: ["データベース"]
---

## 概要

以前、紹介したTeamSQLでバインド変数を利用したMySQLのクエリを実行してみた。

## バインド変数について

MySQLのバインド変数については、ここで詳しく解説されてます。

https://dev.mysql.com/doc/refman/5.6/ja/user-variables.html

## 実行してみる

簡単な変数宣言をしてみる。

```
SET @t1=1, @t2=2, @t3:=4;
SELECT @t1, @t2, @t3, @t4 := @t1+@t2+@t3;
```

<img src="https://pbs.twimg.com/media/Do_f9IJV4AAkuJ_.jpg">

WHERE句に使ってみる

```
set @value=100;

SELECT 
    post_date as date,
    CHAR_LENGTH(post_content) as content_length
FROM 
    `wp_sandbox`.`wp_posts`  posts
WHERE
    CHAR_LENGTH(post_content) > @value
    AND
    post_date > '2017-07-01'
    AND
    post_date < '2017-08-01'
ORDER BY 
    post_date ASC
```

<img src="https://pbs.twimg.com/media/Do_dv47UYAAXgkv.jpg">

問題なく動いているのが確認できました。
