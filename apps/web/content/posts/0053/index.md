---
title: "【WordPress】MySQLのバックアップ、不要コメント+投稿のリビジョンデータを削除。データベースのメンテナンスを行った。"
path: "/entry/53"
date: "2018-09-24 16:23:43"
coverImage: "../../../images/thumbnail/wordpress-logo.png"
author: "s-yoshiki"
tags: ["wordpress","データベース","mysql"]
---

## 概要

Amazon Lightsail上でWordPressを運用して数ヶ月経ちましたが、
ゴミデータが目立ってきたので、メンテすることにしました。

## バックアップ

作業の前にデータのバックアップを行います。
mysqldumpを使います。

```sql
mysqldump --single-transaction -uwp_username -hlocalhost -p wp_tablename > wp.20180924.dump
```

ここで、
wp_usernameはDBユーザ名、wp_tablenameは対象テーブル名、
wp.20180924.dumpは出力ファイル名(分かりやすいように日付を入れてます)
とします。

投稿データはリビジョン等を含め400件ありましたが、3MB程度で収まりました。

<!--
ちなみにWordPressのテーブル定義はこのようになってました。

```

+-----------------------------+
| Tables_in_wp_tablename      |
+-----------------------------+
| wp_aiowps_events            |
| wp_aiowps_failed_logins     |
| wp_aiowps_global_meta       |
| wp_aiowps_login_activity    |
| wp_aiowps_login_lockdown    |
| wp_aiowps_permanent_block   |
| wp_cocoon_accesses          |
| wp_cocoon_affiliate_tags    |
| wp_cocoon_function_texts    |
| wp_cocoon_item_rankings     |
| wp_cocoon_speech_balloons   |
| wp_commentmeta              |
| wp_comments                 |
| wp_links                    |
| wp_options                  |
| wp_postmeta                 |
| wp_posts                    |
| wp_term_relationships       |
| wp_term_taxonomy            |
| wp_termmeta                 |
| wp_terms                    |
| wp_usermeta                 |
| wp_users                    |
+-----------------------------+
```

-->

## 

## 不要コメント削除

大量のスパムコメントがあるので削除します。

```sql
DELETE FROM wp_comments WHERE comment_approved = 'spam'
```

WHERE句の条件をcomment_approved = 'spam'としていますが、
適当なものに変えてください。

## 不要なリビジョンデータの削除

投稿件数は100件程度にも関わらず、
wp_postsには400件以上のデータがあり、不要なリビジョンデータを削除します。

```sql
DELETE FROM wp_posts 
WHERE post_status = 'inherit'
```
