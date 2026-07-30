---
title: "Macでも利用できるDBクライアント MySQL PostgreSQL Oracle など"
path: "/entry/180"
date: "2019-12-21 17:27:58"
coverImage: "../../../images/thumbnail/apple-logo.jpg"
author: "s-yoshiki"
tags: ["linux","データベース","mysql","mac","oracle","docker","mariadb","phpmyadmin","adminer"]
---

## 概要

Macで利用できるDB (MySQL PostgreSQL Oracle など) のクライアントツールの紹介です。

## デスクトップ系ツール

<!-- wp:heading {"level":3} -->

### TablePlus

<!-- wp:embed {"url":"https://tableplus.com"} -->
<figure class="wp-block-embed"><div class="wp-block-embed__wrapper">
https://tableplus.com
</div></figure>
<!-- /wp:embed -->

## 現在の選び方

この記事は2019年当時のツールを比較したものです。現在はOS対応、サポートDB、料金、ライセンスが変わっているため、製品名だけでなく用途から選び直してください。

| 重視すること | 候補 | 確認ポイント |
| :--- | :--- | :--- |
| 多種類のDB・Linux対応・無料 | DBeaver Community | JDBCドライバー、UIの重さ |
| macOS中心の軽快な操作 | TablePlus | 無料版の制限、必要DBの対応 |
| MySQL公式ツール | MySQL Workbench | 対応OS、MySQLバージョン |
| MySQL/MariaDBをmacOSで扱う | Sequel Ace | Sequel Proではなく後継の対応状況 |
| ブラウザから共同利用 | CloudBeaver等 | 認証、権限、公開範囲、監査 |
| 単一PHPファイルで臨時利用 | Adminer | 使用後の削除、アクセス制限 |

Sequel Proは長期間更新が止まっているため、新規導入では後継のSequel Aceなども比較対象にします。

## Web型DBクライアントの注意

phpMyAdminやAdminerは便利ですが、外部公開すると攻撃対象になります。

- インターネットへ直接公開せず、VPNやIP制限を使う
- HTTPSと多要素認証を組み合わせる
- DB管理者アカウントで常用しない
- 利用後にコンテナやファイルを停止・削除する
- バージョンを更新し、監査ログを確認する

デスクトップ型でも、本番DBは読み取り専用ユーザー、TLS、SSHトンネルを基本にし、接続先の色分けや自動コミット設定で誤操作を減らします。

## 公式リンク

- [DBeaver](https://dbeaver.io/)
- [TablePlus](https://tableplus.com/)
- [MySQL Workbench](https://www.mysql.com/products/workbench/)
- [Sequel Ace](https://sequel-ace.com/)
- [phpMyAdmin](https://www.phpmyadmin.net/)
- [Adminer](https://www.adminer.org/)

MySQL SQLite MariaDB PostgreSQL Oracle といった様々なデータベースに対応しており、多くの機能を備えております。有料版と無料版があり、無料版はいくつかの機能が制限されていますが、それでも十分使えるものです。

<!-- wp:image {"id":1613,"sizeSlug":"large"} -->
<figure class="wp-block-image size-large"><img src="https://tech-blog.s-yoshiki.com/wp-content/uploads/2019/12/image-1024x655.png" alt="" class="wp-image-1613"/></figure>
<!-- /wp:image -->

SSH越に接続する機能も備えています。

<!-- wp:core-embed/wordpress {"url":"https://tech-blog.s-yoshiki.com/2018/09/663/","type":"wp-embed","providerNameSlug":"404-motivation-not-found","className":""} -->
<figure class="wp-block-embed-wordpress wp-block-embed is-type-wp-embed is-provider-404-motivation-not-found"><div class="wp-block-embed__wrapper">
https://tech-blog.s-yoshiki.com/2018/09/663/
</div></figure>
<!-- /wp:core-embed/wordpress -->

<!-- wp:heading {"level":3} -->

### DBeaver

<!-- wp:embed {"url":"https://dbeaver.io"} -->
<figure class="wp-block-embed"><div class="wp-block-embed__wrapper">
https://dbeaver.io
</div></figure>
<!-- /wp:embed -->

DBeaverもTablePlusと同様に多くのDBに対応しています。Community Editionは、Apache Licenseの下で無料で配布されるています。EE (有料版) も商用ライセンスの下、配布されています。\nEclipseでサポートされているプラ​​ットフォーム（Windows、Linux、MacOS X、Solaris）で動作します。

<!-- wp:image -->
<figure class="wp-block-image"><img src="https://camo.githubusercontent.com/4d8aa54a7772be3934b69178e746b0ba0cee6126/68747470733a2f2f646265617665722e696f2f70726f647563742f646265617665722d73732d6d6f636b2e706e67" alt=""/></figure>
<!-- /wp:image -->

<!-- wp:embed {"url":"https://github.com/dbeaver/dbeaver"} -->
<figure class="wp-block-embed"><div class="wp-block-embed__wrapper">
https://github.com/dbeaver/dbeaver
</div></figure>
<!-- /wp:embed -->

CE版のソースはGitHubで公開されています。

<!-- wp:heading {"level":3} -->

### MySQL Workbench

<!-- wp:embed {"url":"https://www.mysql.com/jp/products/workbench"} -->
<figure class="wp-block-embed"><div class="wp-block-embed__wrapper">
https://www.mysql.com/jp/products/workbench
</div></figure>
<!-- /wp:embed -->

MySQL系DBのクライアントツールにMySQL Workbenchがあります。実際に触ってみましたが、Oracleが提供していると言うこともあり、動作は安定しているような気がしました。macOS・Windowsで利用可能です。

<!-- wp:image -->
<figure class="wp-block-image"><img src="https://www.mysql.com/common/images/products/MySQL_Workbench_Editor_General_Mac.png" alt="「mysqlworkbench」の画像検索結果"/></figure>
<!-- /wp:image -->

<!-- wp:heading {"level":3} -->

### Sequel pro

<!-- wp:embed {"url":"https://www.sequelpro.com"} -->
<figure class="wp-block-embed"><div class="wp-block-embed__wrapper">
https://www.sequelpro.com
</div></figure>
<!-- /wp:embed -->

Sequel Proは、MySQLデータベースを操作するためのツールです。

<!-- wp:image {"id":1629,"sizeSlug":"large"} -->
<figure class="wp-block-image size-large"><img src="https://tech-blog.s-yoshiki.com/wp-content/uploads/2019/12/image-1-1024x635.png" alt="" class="wp-image-1629"/></figure>
<!-- /wp:image -->

<!-- wp:embed {"url":"https://github.com/sequelpro/sequelpro"} -->
<figure class="wp-block-embed"><div class="wp-block-embed__wrapper">
https://github.com/sequelpro/sequelpro
</div></figure>
<!-- /wp:embed -->

## Webアプリケーション

以下で紹介するものはデスクトップアプリケーションではありませんが、dockerなどの仮想環境から動かすことによりローカル環境でも動かす事ができます。

<!-- wp:heading {"level":3} -->

### phpMyAdmin

<!-- wp:embed {"url":"https://www.phpmyadmin.net"} -->
<figure class="wp-block-embed"><div class="wp-block-embed__wrapper">
https://www.phpmyadmin.net
</div></figure>
<!-- /wp:embed -->

phpMyAdminはMySQLサーバーをウェブブラウザで管理するためのデータベース接続クライアントツールで、PHPで実装されています。

<!-- wp:image -->
<figure class="wp-block-image"><img src="https://upload.wikimedia.org/wikipedia/commons/e/ec/PhpMyAdmin-main-ja.png" alt="「phpmyadmin」の画像検索結果"/></figure>
<!-- /wp:image -->

<!-- wp:core-embed/wordpress {"url":"https://tech-blog.s-yoshiki.com/2019/12/1598/","type":"wp-embed","providerNameSlug":"404-motivation-not-found","className":""} -->
<figure class="wp-block-embed-wordpress wp-block-embed is-type-wp-embed is-provider-404-motivation-not-found"><div class="wp-block-embed__wrapper">
https://tech-blog.s-yoshiki.com/2019/12/1598/
</div></figure>
<!-- /wp:core-embed/wordpress -->

<!-- wp:embed {"url":"https://hub.docker.com/r/phpmyadmin/phpmyadmin"} -->
<figure class="wp-block-embed"><div class="wp-block-embed__wrapper">
https://hub.docker.com/r/phpmyadmin/phpmyadmin
</div></figure>
<!-- /wp:embed -->

<!-- wp:heading {"level":3} -->

### Adminer

<!-- wp:embed {"url":"https://www.adminer.org"} -->
<figure class="wp-block-embed"><div class="wp-block-embed__wrapper">
https://www.adminer.org
</div></figure>
<!-- /wp:embed -->

AdminerはphpMyAdminと同様にWebサーバ上で動かすアプリケーションですが、より軽量でphpMyAdminの代替としてこのツールは開発されました。

<!-- wp:image -->
<figure class="wp-block-image"><img src="https://upload.wikimedia.org/wikipedia/commons/2/20/Latest_Adminer_%E2%80%93_database_overview.png" alt="「adminer」の画像検索結果"/></figure>
<!-- /wp:image -->

<!-- wp:embed {"url":"https://hub.docker.com/_/adminer"} -->
<figure class="wp-block-embed"><div class="wp-block-embed__wrapper">
https://hub.docker.com/_/adminer
</div></figure>
<!-- /wp:embed -->

## 参考

<!-- wp:core-embed/wordpress {"url":"https://tech-blog.s-yoshiki.com/2018/09/663/","type":"wp-embed","providerNameSlug":"404-motivation-not-found","className":""} -->
<figure class="wp-block-embed-wordpress wp-block-embed is-type-wp-embed is-provider-404-motivation-not-found"><div class="wp-block-embed__wrapper">
https://tech-blog.s-yoshiki.com/2018/09/663/
</div></figure>
<!-- /wp:core-embed/wordpress -->

<!-- wp:embed {"url":"https://qiita.com/hiesiea/items/01dde88d8062c3d16910","type":"rich","providerNameSlug":"埋め込みハンドラー","className":""} -->
<figure class="wp-block-embed is-type-rich is-provider-埋め込みハンドラー"><div class="wp-block-embed__wrapper">
https://qiita.com/hiesiea/items/01dde88d8062c3d16910
</div></figure>
<!-- /wp:embed -->
