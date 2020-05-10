---
title: "フランスからWordPressに悪意のあるリクエストが大量に届くので解析"
path: "/entry/27"
date: "2018-08-17 19:20:26"
coverImage: "../../../images/thumbnail/no-image.png"
author: "s-yoshiki"
tags: ["amazon-aws","amazon-lightsail","apache","セキュリティ"]
---
<blockquote class="twitter-tweet" data-lang="ja"><p lang="ja" dir="ltr">AWS Lightsail + WordPressで立てたサーバにフランスから謎のアクセスが定期的に来るのでログを調べてみた。\n\n色々と謎な部分があるが結構不穏な文字列が含まれていそうなのでアクセス制限を検討中。<a href="https://t.co/jZ2HiUyRUb">https://t.co/jZ2HiUyRUb</a>
&mdash; s-yoshiki | スクリプトカス (@s_yoshiki_dev) <a href="https://twitter.com/s_yoshiki_dev/status/1030399037072072704?ref_src=twsrc%5Etfw">2018年8月17日</a></blockquote>

<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

## 概要

以前紹介した、<a href="https://tech-blog.s-yoshiki.com/2018/02/27/">AWS Lightsail + WordPressサーバ</a>に
定期的に大量のアクセスが届くのでログを調べてみました。
<img width="993" alt="fr.png" src="https://qiita-image-store.s3.amazonaws.com/0/82419/e61bf150-1f22-416d-fa3a-4b38f37c9b9d.png">
↑写真はアクセスがあった時のGoogle Analyticsレポート。

## ログファイルの場所

aws lightsailでwordpress付きイメージを選択した場合、apacheのアクセスログ・エラーログは

```
/opt/bitnami/apache2/logs
```

以下に配置されます。

## アクセスログの内容

access_logファイルを見るとたくさんの不穏な文字列を含むリクエストがほぼ同時刻に投げられているようでした。
Google Analyticsによればプロバイダは<a href="https://en.wikipedia.org/wiki/Online_SAS">Online SAS (Wiki - en)</a>というホスティングサービスの会社となっておりました。
とりあえず気持ち悪いので、htaccessを設定するなど、何かしら設定をしておこうかと思います。
詳しいことがわかり次第追記します。

※追記:
以下にaccess_logのを貼り付けておきました。
一応IPは隠しております。
phpMyadminとか不穏なワードが含まれているのを確認できるかと思います。

## 実際のアクセスログ

```

120.*.*.35 - - [16/Aug/2018:07:43:59 +0000] "PROPFIND / HTTP/1.1" 302 202
120.*.*.35 - - [16/Aug/2018:07:44:01 +0000] "GET /webdav/ HTTP/1.1" 302 212
120.*.*.35 - - [16/Aug/2018:07:44:05 +0000] "GET /help.php HTTP/1.1" 302 213
120.*.*.35 - - [16/Aug/2018:07:44:05 +0000] "GET /java.php HTTP/1.1" 302 213
120.*.*.35 - - [16/Aug/2018:07:44:05 +0000] "GET /_query.php HTTP/1.1" 302 215
120.*.*.35 - - [16/Aug/2018:07:44:06 +0000] "GET /test.php HTTP/1.1" 302 213
120.*.*.35 - - [16/Aug/2018:07:44:06 +0000] "GET /db_cts.php HTTP/1.1" 302 215
120.*.*.35 - - [16/Aug/2018:07:44:06 +0000] "GET /db_pma.php HTTP/1.1" 302 215
120.*.*.35 - - [16/Aug/2018:07:44:07 +0000] "GET /logon.php HTTP/1.1" 302 214
120.*.*.35 - - [16/Aug/2018:07:44:08 +0000] "GET /help-e.php HTTP/1.1" 302 215
120.*.*.35 - - [16/Aug/2018:07:44:09 +0000] "GET /license.php HTTP/1.1" 302 216
120.*.*.35 - - [16/Aug/2018:07:44:09 +0000] "GET /log.php HTTP/1.1" 302 212
120.*.*.35 - - [16/Aug/2018:07:44:09 +0000] "GET /hell.php HTTP/1.1" 302 213
120.*.*.35 - - [16/Aug/2018:07:44:09 +0000] "GET /pmd_online.php HTTP/1.1" 302 219
120.*.*.35 - - [16/Aug/2018:07:44:10 +0000] "GET /x.php HTTP/1.1" 302 210
120.*.*.35 - - [16/Aug/2018:07:44:10 +0000] "GET /shell.php HTTP/1.1" 302 214
120.*.*.35 - - [16/Aug/2018:07:44:10 +0000] "GET /desktop.ini.php HTTP/1.1" 302 220
120.*.*.35 - - [16/Aug/2018:07:44:11 +0000] "GET /z.php HTTP/1.1" 302 210
120.*.*.35 - - [16/Aug/2018:07:44:13 +0000] "GET /lala.php HTTP/1.1" 302 213
120.*.*.35 - - [16/Aug/2018:07:44:13 +0000] "GET /lala-dpr.php HTTP/1.1" 302 217
120.*.*.35 - - [16/Aug/2018:07:44:13 +0000] "GET /wpo.php HTTP/1.1" 302 212
120.*.*.35 - - [16/Aug/2018:07:44:14 +0000] "GET /text.php HTTP/1.1" 302 213
120.*.*.35 - - [16/Aug/2018:07:44:14 +0000] "GET /wp-config.php HTTP/1.1" 302 218
120.*.*.35 - - [16/Aug/2018:07:44:14 +0000] "GET /muhstik.php HTTP/1.1" 302 216
120.*.*.35 - - [16/Aug/2018:07:44:15 +0000] "GET /muhstik2.php HTTP/1.1" 302 217
120.*.*.35 - - [16/Aug/2018:07:44:15 +0000] "GET /muhstiks.php HTTP/1.1" 302 217
120.*.*.35 - - [16/Aug/2018:07:44:15 +0000] "GET /muhstik-dpr.php HTTP/1.1" 302 220
120.*.*.35 - - [16/Aug/2018:07:44:15 +0000] "GET /lol.php HTTP/1.1" 302 212
120.*.*.35 - - [16/Aug/2018:07:44:16 +0000] "GET /uploader.php HTTP/1.1" 302 217
120.*.*.35 - - [16/Aug/2018:07:44:17 +0000] "GET /cmd.php HTTP/1.1" 302 212
120.*.*.35 - - [16/Aug/2018:07:44:17 +0000] "GET /cmx.php HTTP/1.1" 302 212
120.*.*.35 - - [16/Aug/2018:07:44:17 +0000] "GET /cmv.php HTTP/1.1" 302 212
120.*.*.35 - - [16/Aug/2018:07:44:18 +0000] "GET /cmdd.php HTTP/1.1" 302 213
120.*.*.35 - - [16/Aug/2018:07:44:18 +0000] "GET /knal.php HTTP/1.1" 302 213
120.*.*.35 - - [16/Aug/2018:07:44:19 +0000] "GET /cmd.php HTTP/1.1" 302 212
120.*.*.35 - - [16/Aug/2018:07:44:19 +0000] "GET /shell.php HTTP/1.1" 302 214
120.*.*.35 - - [16/Aug/2018:07:44:19 +0000] "GET /appserv.php HTTP/1.1" 302 216
120.*.*.35 - - [16/Aug/2018:07:44:23 +0000] "POST /xw.php HTTP/1.1" 302 211
120.*.*.35 - - [16/Aug/2018:07:44:23 +0000] "POST /xw1.php HTTP/1.1" 302 212
120.*.*.35 - - [16/Aug/2018:07:44:25 +0000] "POST /9678.php HTTP/1.1" 302 213
120.*.*.35 - - [16/Aug/2018:07:44:25 +0000] "POST /wc.php HTTP/1.1" 302 211
120.*.*.35 - - [16/Aug/2018:07:44:26 +0000] "POST /xx.php HTTP/1.1" 302 211
120.*.*.35 - - [16/Aug/2018:07:44:27 +0000] "POST /s.php HTTP/1.1" 302 210
120.*.*.35 - - [16/Aug/2018:07:44:28 +0000] "POST /w.php HTTP/1.1" 302 210
120.*.*.35 - - [16/Aug/2018:07:44:28 +0000] "POST /sheep.php HTTP/1.1" 302 214
120.*.*.35 - - [16/Aug/2018:07:44:31 +0000] "POST /db.init.php HTTP/1.1" 302 216
120.*.*.35 - - [16/Aug/2018:07:44:32 +0000] "POST /db_session.init.php HTTP/1.1" 302 224
120.*.*.35 - - [16/Aug/2018:07:44:32 +0000] "POST /db__.init.php HTTP/1.1" 302 218
120.*.*.35 - - [16/Aug/2018:07:44:34 +0000] "POST /wp-admins.php HTTP/1.1" 302 218
120.*.*.35 - - [16/Aug/2018:07:44:34 +0000] "POST /m.php?pbid=open HTTP/1.1" 302 220
120.*.*.35 - - [16/Aug/2018:07:44:35 +0000] "POST /db_dataml.php HTTP/1.1" 302 218
120.*.*.35 - - [16/Aug/2018:07:44:37 +0000] "POST /db_desql.php HTTP/1.1" 302 217
120.*.*.35 - - [16/Aug/2018:07:44:37 +0000] "POST /mx.php HTTP/1.1" 302 211
120.*.*.35 - - [16/Aug/2018:07:44:40 +0000] "POST /wshell.php HTTP/1.1" 302 215
120.*.*.35 - - [16/Aug/2018:07:44:41 +0000] "POST /xshell.php HTTP/1.1" 302 215
120.*.*.35 - - [16/Aug/2018:07:44:41 +0000] "POST /qq.php HTTP/1.1" 302 211
120.*.*.35 - - [16/Aug/2018:07:44:42 +0000] "POST /conflg.php HTTP/1.1" 302 215
120.*.*.35 - - [16/Aug/2018:07:44:43 +0000] "POST /lindex.php HTTP/1.1" 302 215
120.*.*.35 - - [16/Aug/2018:07:44:46 +0000] "POST /phpstudy.php HTTP/1.1" 302 217
120.*.*.35 - - [16/Aug/2018:07:44:46 +0000] "POST /phpStudy.php HTTP/1.1" 302 217
120.*.*.35 - - [16/Aug/2018:07:44:47 +0000] "POST /weixiao.php HTTP/1.1" 302 216
120.*.*.35 - - [16/Aug/2018:07:44:49 +0000] "POST /feixiang.php HTTP/1.1" 302 217
120.*.*.35 - - [16/Aug/2018:07:44:49 +0000] "POST /ak47.php HTTP/1.1" 302 213
120.*.*.35 - - [16/Aug/2018:07:44:50 +0000] "POST /ak48.php HTTP/1.1" 302 213
120.*.*.35 - - [16/Aug/2018:07:44:50 +0000] "POST /xiao.php HTTP/1.1" 302 213
120.*.*.35 - - [16/Aug/2018:07:44:51 +0000] "POST /yao.php HTTP/1.1" 302 212
120.*.*.35 - - [16/Aug/2018:07:44:51 +0000] "POST /defect.php HTTP/1.1" 302 215
120.*.*.35 - - [16/Aug/2018:07:44:54 +0000] "POST /webslee.php HTTP/1.1" 302 216
120.*.*.35 - - [16/Aug/2018:07:44:55 +0000] "POST /q.php HTTP/1.1" 302 210
120.*.*.35 - - [16/Aug/2018:07:44:56 +0000] "POST /pe.php HTTP/1.1" 302 211
120.*.*.35 - - [16/Aug/2018:07:44:57 +0000] "POST /hm.php HTTP/1.1" 302 211
120.*.*.35 - - [16/Aug/2018:07:44:57 +0000] "POST /cainiao.php HTTP/1.1" 302 216
120.*.*.35 - - [16/Aug/2018:07:44:59 +0000] "POST /zuoshou.php HTTP/1.1" 302 216
120.*.*.35 - - [16/Aug/2018:07:45:00 +0000] "POST /zuo.php HTTP/1.1" 302 212
120.*.*.35 - - [16/Aug/2018:07:45:00 +0000] "POST /aotu.php HTTP/1.1" 302 213
120.*.*.35 - - [16/Aug/2018:07:45:03 +0000] "POST /cmd.php HTTP/1.1" 302 212
120.*.*.35 - - [16/Aug/2018:07:45:04 +0000] "POST /bak.php HTTP/1.1" 302 212
120.*.*.35 - - [16/Aug/2018:07:45:04 +0000] "POST /system.php HTTP/1.1" 302 215
120.*.*.35 - - [16/Aug/2018:07:45:05 +0000] "POST /l7.php HTTP/1.1" 302 211
120.*.*.35 - - [16/Aug/2018:07:45:05 +0000] "POST /l8.php HTTP/1.1" 302 211
120.*.*.35 - - [16/Aug/2018:07:45:08 +0000] "POST /qaq.php HTTP/1.1" 302 212
120.*.*.35 - - [16/Aug/2018:07:45:09 +0000] "POST /q.php HTTP/1.1" 302 210
120.*.*.35 - - [16/Aug/2018:07:45:09 +0000] "POST /56.php HTTP/1.1" 302 211
120.*.*.35 - - [16/Aug/2018:07:45:12 +0000] "POST /mz.php HTTP/1.1" 302 211
120.*.*.35 - - [16/Aug/2018:07:45:13 +0000] "POST /xx.php HTTP/1.1" 302 211
120.*.*.35 - - [16/Aug/2018:07:45:13 +0000] "POST /qaq.php HTTP/1.1" 302 212
120.*.*.35 - - [16/Aug/2018:07:45:17 +0000] "POST /qaq.php HTTP/1.1" 302 212
120.*.*.35 - - [16/Aug/2018:07:45:17 +0000] "POST /yumo.php HTTP/1.1" 302 213
120.*.*.35 - - [16/Aug/2018:07:45:18 +0000] "POST /min.php HTTP/1.1" 302 212
120.*.*.35 - - [16/Aug/2018:07:45:18 +0000] "POST /wan.php HTTP/1.1" 302 212
120.*.*.35 - - [16/Aug/2018:07:45:20 +0000] "POST /wanan.php HTTP/1.1" 302 214
120.*.*.35 - - [16/Aug/2018:07:45:22 +0000] "POST /ssaa.php HTTP/1.1" 302 213
120.*.*.35 - - [16/Aug/2018:07:45:22 +0000] "POST /qq.php HTTP/1.1" 302 211
120.*.*.35 - - [16/Aug/2018:07:45:23 +0000] "POST /aw.php HTTP/1.1" 302 211
120.*.*.35 - - [16/Aug/2018:07:45:27 +0000] "POST /hh.php HTTP/1.1" 302 211
120.*.*.35 - - [16/Aug/2018:07:45:28 +0000] "POST /ak.php HTTP/1.1" 302 211
120.*.*.35 - - [16/Aug/2018:07:45:29 +0000] "POST /ip.php HTTP/1.1" 302 211
120.*.*.35 - - [16/Aug/2018:07:45:29 +0000] "POST /infoo.php HTTP/1.1" 302 214
120.*.*.35 - - [16/Aug/2018:07:45:30 +0000] "POST /qq.php HTTP/1.1" 302 211
120.*.*.35 - - [16/Aug/2018:07:45:31 +0000] "POST /qwe.php HTTP/1.1" 302 212
120.*.*.35 - - [16/Aug/2018:07:45:32 +0000] "POST /1213.php HTTP/1.1" 302 213
120.*.*.35 - - [16/Aug/2018:07:45:33 +0000] "POST /post.php HTTP/1.1" 302 213
120.*.*.35 - - [16/Aug/2018:07:45:34 +0000] "POST /h1.php HTTP/1.1" 302 211
120.*.*.35 - - [16/Aug/2018:07:45:35 +0000] "POST /test.php HTTP/1.1" 302 213
120.*.*.35 - - [16/Aug/2018:07:45:35 +0000] "POST /3.php HTTP/1.1" 302 210
120.*.*.35 - - [16/Aug/2018:07:45:36 +0000] "POST /phpinfi.php HTTP/1.1" 302 216
120.*.*.35 - - [16/Aug/2018:07:45:38 +0000] "POST /xiaoma.php HTTP/1.1" 302 215
120.*.*.35 - - [16/Aug/2018:07:45:38 +0000] "POST /xiaomae.php HTTP/1.1" 302 216
120.*.*.35 - - [16/Aug/2018:07:45:39 +0000] "POST /xiaomar.php HTTP/1.1" 302 216
120.*.*.35 - - [16/Aug/2018:07:45:39 +0000] "POST /qq.php HTTP/1.1" 302 211
120.*.*.35 - - [16/Aug/2018:07:45:40 +0000] "POST /data.php HTTP/1.1" 302 213
120.*.*.35 - - [16/Aug/2018:07:45:42 +0000] "POST /log.php HTTP/1.1" 302 212
120.*.*.35 - - [16/Aug/2018:07:45:43 +0000] "POST /fack.php HTTP/1.1" 302 213
120.*.*.35 - - [16/Aug/2018:07:45:44 +0000] "POST /angge.php HTTP/1.1" 302 214
120.*.*.35 - - [16/Aug/2018:07:45:45 +0000] "GET /phpmyadmin/index.php HTTP/1.1" 302 225
120.*.*.35 - - [16/Aug/2018:07:45:45 +0000] "GET /phpMyAdmin/index.php HTTP/1.1" 302 225
120.*.*.35 - - [16/Aug/2018:07:45:45 +0000] "GET /pmd/index.php HTTP/1.1" 302 218
120.*.*.35 - - [16/Aug/2018:07:45:46 +0000] "GET /pma/index.php HTTP/1.1" 302 218
120.*.*.35 - - [16/Aug/2018:07:45:46 +0000] "GET /PMA/index.php HTTP/1.1" 302 218
120.*.*.35 - - [16/Aug/2018:07:45:47 +0000] "GET /PMA2/index.php HTTP/1.1" 302 219
120.*.*.35 - - [16/Aug/2018:07:45:47 +0000] "GET /pmamy/index.php HTTP/1.1" 302 220
120.*.*.35 - - [16/Aug/2018:07:45:47 +0000] "GET /pmamy2/index.php HTTP/1.1" 302 221
120.*.*.35 - - [16/Aug/2018:07:45:47 +0000] "GET /mysql/index.php HTTP/1.1" 302 220
120.*.*.35 - - [16/Aug/2018:07:45:48 +0000] "GET /admin/index.php HTTP/1.1" 302 220
120.*.*.35 - - [16/Aug/2018:07:45:48 +0000] "GET /db/index.php HTTP/1.1" 302 217
120.*.*.35 - - [16/Aug/2018:07:45:48 +0000] "GET /dbadmin/index.php HTTP/1.1" 302 222
120.*.*.35 - - [16/Aug/2018:07:45:48 +0000] "GET /web/phpMyAdmin/index.php HTTP/1.1" 302 229
120.*.*.35 - - [16/Aug/2018:07:45:49 +0000] "GET /admin/pma/index.php HTTP/1.1" 302 224
120.*.*.35 - - [16/Aug/2018:07:45:49 +0000] "GET /admin/PMA/index.php HTTP/1.1" 302 224
120.*.*.35 - - [16/Aug/2018:07:45:49 +0000] "GET /admin/mysql/index.php HTTP/1.1" 302 226
120.*.*.35 - - [16/Aug/2018:07:45:53 +0000] "GET /admin/mysql2/index.php HTTP/1.1" 302 227
120.*.*.35 - - [16/Aug/2018:07:45:53 +0000] "GET /admin/phpmyadmin/index.php HTTP/1.1" 302 231
120.*.*.35 - - [16/Aug/2018:07:45:54 +0000] "GET /admin/phpMyAdmin/index.php HTTP/1.1" 302 231
120.*.*.35 - - [16/Aug/2018:07:45:54 +0000] "GET /admin/phpmyadmin2/index.php HTTP/1.1" 302 232
120.*.*.35 - - [16/Aug/2018:07:45:57 +0000] "GET /mysqladmin/index.php HTTP/1.1" 302 225
120.*.*.35 - - [16/Aug/2018:07:45:57 +0000] "GET /mysql-admin/index.php HTTP/1.1" 302 226
120.*.*.35 - - [16/Aug/2018:07:45:57 +0000] "GET /phpadmin/index.php HTTP/1.1" 302 223
120.*.*.35 - - [16/Aug/2018:07:45:58 +0000] "GET /phpmyadmin0/index.php HTTP/1.1" 302 226
120.*.*.35 - - [16/Aug/2018:07:45:58 +0000] "GET /phpmyadmin1/index.php HTTP/1.1" 302 226
120.*.*.35 - - [16/Aug/2018:07:45:58 +0000] "GET /phpmyadmin2/index.php HTTP/1.1" 302 226
120.*.*.35 - - [16/Aug/2018:07:45:58 +0000] "GET /myadmin/index.php HTTP/1.1" 302 222
120.*.*.35 - - [16/Aug/2018:07:45:59 +0000] "GET /myadmin2/index.php HTTP/1.1" 302 223
120.*.*.35 - - [16/Aug/2018:07:45:59 +0000] "GET /xampp/phpmyadmin/index.php HTTP/1.1" 302 231
120.*.*.35 - - [16/Aug/2018:07:45:59 +0000] "GET /phpMyadmin_bak/index.php HTTP/1.1" 302 229
120.*.*.35 - - [16/Aug/2018:07:46:00 +0000] "GET /www/phpMyAdmin/index.php HTTP/1.1" 302 229
120.*.*.35 - - [16/Aug/2018:07:46:01 +0000] "GET /tools/phpMyAdmin/index.php HTTP/1.1" 302 231
120.*.*.35 - - [16/Aug/2018:07:46:01 +0000] "GET /phpmyadmin-old/index.php HTTP/1.1" 302 229
120.*.*.35 - - [16/Aug/2018:07:46:01 +0000] "GET /phpMyAdminold/index.php HTTP/1.1" 302 228
120.*.*.35 - - [16/Aug/2018:07:46:01 +0000] "GET /phpMyAdmin.old/index.php HTTP/1.1" 302 229
120.*.*.35 - - [16/Aug/2018:07:46:02 +0000] "GET /pma-old/index.php HTTP/1.1" 302 222
120.*.*.35 - - [16/Aug/2018:07:46:02 +0000] "GET /claroline/phpMyAdmin/index.php HTTP/1.1" 302 235
120.*.*.35 - - [16/Aug/2018:07:46:02 +0000] "GET /typo3/phpmyadmin/index.php HTTP/1.1" 302 231
120.*.*.35 - - [16/Aug/2018:07:46:02 +0000] "GET /phpma/index.php HTTP/1.1" 302 220
120.*.*.35 - - [16/Aug/2018:07:46:03 +0000] "GET /phpmyadmin/phpmyadmin/index.php HTTP/1.1" 302 236
120.*.*.35 - - [16/Aug/2018:07:46:03 +0000] "GET /phpMyAdmin/phpMyAdmin/index.php HTTP/1.1" 302 236

```

## 参考

<a href="https://docs.bitnami.com/aws/apps/wordpress/">https://docs.bitnami.com/aws/apps/wordpress/</a>
<a href="https://docs.bitnami.com/aws/">https://docs.bitnami.com/aws/</a>
<a href="https://community.bitnami.com/">https://community.bitnami.com/</a>