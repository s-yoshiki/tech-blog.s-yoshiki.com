---
title: "AWS EC2 + Bitnami で始める WordPress"
path: "/entry/157"
date: "2019-08-15 23:52:32"
coverImage: "../../../images/thumbnail/bitnami-logo.png"
author: "s-yoshiki"
tags: ["amazon-aws","wordpress","ubuntu","bitnami","ツール","ec2","apache"]
---
bitnamiはWebアプリケーションや開発ツールのインストラーやソフトウェアパッケージのライブラリです。
提供するスタックにはWordPress、Drupal、Joomla、Redmine、AbanteCart、PrestaShop、Magento、MediaWikiなどがあります。
ここではAWS EC2 のマーケットプレイスで公開されている Bitnami WordPress の AMI で WordPressサイトを構築するまでの方法と各種ツール・設定ファイルについて紹介します。

なおこの記事は、2019/08/15時点での情報です。

## Bitnami WordPressを使うメリット

### 個人的に感じた3つのメリット

これまで、自前で構築した環境 + WordPress→ Amazon Lightsail + Bitnami WordPress → AWS EC2 + Bitnami WordPressという形でWordPress環境を利用してきました。

パッと思いつくBitnamiの良い点は次の3つであると思います。
<ol>
 	<li>安い (無料!)</li>
 	<li>設定が簡単 & 拡張しやすい</li>
 	<li>便利設定ツールが用意されている</li>
</ol>
1の料金についてですが、AWSのBitnami AMIは0$で提供されています。よく比較されているAmimoto AMIは利用時間当たりの若干の課金を払わなければなりません。

2の「設定が簡単 & 拡張しやすい」は、ディレクトリ構成やApacheの設定が拡張しやすいような構成になっていたため、1つのインスタンスで複数サイトを動かす際にも環境を用意しやすいと感じました。

3つめの「便利設定ツールが用意されている」については、記事の後半でも詳しく触れますが、SSLの設定やApache、MySQLの管理をBitnamiで用意されているコマンドを用いて簡単に管理することができます。

つまり、自らモジュールを導入したり設定する際の負荷を低くすることができます。

### Amimoto AMI と比較して

Amimoto AMIを利用したことがないので、なんとも言えませんが Bitnami と Amimoto AMIと比較して Bitnami の方がパフォーマンス的に劣るという<a href="https://support.amimoto-ami.com/en/articles/934104-amimoto-ami-%E3%81%A8-bitnami-%E3%81%AE%E6%AF%94%E8%BC%83">データ</a>があります。

比較方法は負荷テスト時のパフォーマンスでありデータを見るとが Amimoto が負荷分散に強い Nginx で Bitnami で Apache を利用していることもあり妥当な比較方法だとは思えません。

(Bitnami は Nginx版の WordPress AMI も用意している。)

<a href="https://support.amimoto-ami.com/en/articles/934104-amimoto-ami-%E3%81%A8-bitnami-%E3%81%AE%E6%AF%94%E8%BC%83">https://support.amimoto-ami.com/en/articles/934104-amimoto-ami-%E3%81%A8-bitnami-%E3%81%AE%E6%AF%94%E8%BC%83</a>

また、環境がAWSということもあり CloudFront やS3を組み合わせることでレスポンスの向上や負荷分散は十分に行えると思います。

## Bitnami AMIについて

<img class="alignnone size-full wp-image-1463" src="https://tech-blog.s-yoshiki.com/wp-content/uploads/2019/08/bitnami_ami-e1565791030578.png" alt="" width="640" height="436" />

**AMIの選択画面でWordPressを検索した時の状態**

「WordPress」で検索し、AWS Marketplaceで絞り込むとBitnami WordPress の AMI が出てきます。

ここで一番上にある「WordPress Certified by Bitnami and Automattic」を選択してインスタンスを起動します。その他、セキュリティグループやEBS、ネットワーク関連の設定は任意とします。

## Bitnami WordPressの構成と設定

WordPress Certified by Bitnami and Automattic のAMI を例に構成と設定を紹介します。

### サーバの構成

AMIで設定されていた各種アプリケーションのバージョンは次のようになっています。
<ul>
 	<li>Ubutnu 16.04</li>
 	<li>Apache 2.4</li>
 	<li>PHP 7.3.6</li>
 	<li>MySQL 8.0.16</li>
</ul>

### 各種設定

次に各種設定状況やディレクトリ構成について説明します。

#### MySQL

このテーブルはデフォルトの状態でWordPressが利用しているテーブルです。
<ul>
 	<li>ユーザ: bn_wordpress</li>
 	<li>ホスト: localhost</li>
 	<li>テーブル: bitnami_wordpress</li>
 	<li>パスワード: /home/bitnami/apps/wordpress/htdocs/wp-config.php の DB_PASSWORD に定義</li>
 	<li>文字コード: UTF-8</li>
</ul>

#### WordPress

<ul>
 	<li>初期ユーザ: user</li>
 	<li>初期パスワード: /home/bitnami/bitnami_credentials に記載</li>
</ul>

#### Apache

ルートの設定ファイルが各種アプリケーションの設定を読み込むような配置となっています。

このApacheの設定がなかなか複雑なため次の章で詳細に見ていきます。
<ul>
 	<li>ルート
<ul>
 	<li>設定ファイル: /opt/bitnami/apache2/conf/*.conf</li>
</ul>
</li>
 	<li>WordPress
<ul>
 	<li>ドキュメントルート: /opt/bitnami/apps/wordpress/htdocs</li>
 	<li>設定ファイル: /opt/bitnami/apps/wordpress/conf/*.conf</li>
</ul>
</li>
 	<li>phpMyAdmin
<ul>
 	<li>ドキュメントルート: /opt/bitnami/apps/phpmyadmin/htdocs</li>
 	<li>設定ファイル: /opt/bitnami/apps/wordpress/conf/*.conf</li>
</ul>
</li>
</ul>

#### Linux

デフォルトの作業ユーザは「bitnami」となっています。また、bitnamiのホームディレクトリ以下に各種設定ファイルが配置されていたり、ドキュメントルートが設定されています。
<ul>
 	<li>ユーザ: bitnami</li>
 	<li>ホームディレクトリ: /home/bitnami</li>
</ul>
ホームディレクトリ以下は次のようになっています。

bitnami_credentials以外はエイリアスとなっています。

appsはドキュメントルートやアプリケーションの設定ファイルが置いてあるディレクトリへのエイリアス、

bitnami_credentialsはWordPressの初期ユーザの情報、

htdocsはデフォルトのドキュメントルート、

となっています。

```
/home/bitnami/
├── apps -> /opt/bitnami/apps
├── bitnami_credentials
├── htdocs -> /opt/bitnami/apache2/htdocs
└── stack -> /opt/bitnami
```

## Apacheの設定を読み解く

```shell
$ ls -la /opt/bitnami/apache2
total 8352
drwxr-xr-x 14 root    root    4096 Jun 21 06:41 .
drwxr-xr-x 18 root    root    4096 Jun 21 06:53 ..
drwxr-xr-x  2 root    root    4096 Jun 21 06:38 bin
-r-xr--r--  1 root    root 8493630 Jun 19 15:51 bnconfig
drwxr-xr-x  2 root    root    4096 Jun 21 06:38 build
drwxr-xr-x  2 root    root    4096 Jun 21 06:41 cgi-bin
drwxr-xr-x  5 bitnami root    4096 Aug 15 09:15 conf
drwxr-xr-x  3 root    root    4096 Jun 21 06:38 error
drwxr-xr-x  3 bitnami root    4096 Jun 21 06:38 htdocs
drwxr-xr-x  3 root    root    4096 Jun 21 06:38 icons
drwxr-xr-x  2 root    root    4096 Jun 21 06:38 include
drwxr-xr-x  3 root    root    4096 Aug 13 03:04 logs
drwxr-xr-x  2 root    root    4096 Jun 21 06:38 modules
drwxr-xr-x  2 root    root    4096 Jun 21 06:38 scripts
drwxr-xr-x  3 root    root    4096 Jun 21 06:38 var
```

WordPressを動かすapacheは/opt/bitnami/apache2にインストールされています。

### Apacheの基本設定ファイル

bitnamiアプリケーション全体で利用される設定ファイルは/opt/bitnami/apache2/conf以下に置かれています。

```shell
/opt/bitnami/apache2/conf
├── bitnami
│   ├── bitnami-apps-prefix.conf
│   ├── bitnami-apps-vhosts.conf
│   ├── bitnami.conf
│   ├── httpd-2xlarge.conf
│   ├── httpd.conf -> /opt/bitnami/apache2/conf/bitnami/httpd-micro.conf
│   ├── httpd-large.conf
│   ├── httpd-medium.conf
│   ├── httpd-micro.conf
│   ├── httpd-small.conf
│   └── httpd-xlarge.conf
├── deflate.conf
├── extra
│   ├── httpd-autoindex.conf
│   ├── httpd-dav.conf
│   ├── httpd-default.conf
│   ├── httpd-info.conf
│   ├── httpd-languages.conf
│   ├── httpd-manual.conf
│   ├── httpd-mpm.conf
│   ├── httpd-multilang-errordoc.conf
│   ├── httpd-ssl.conf
│   ├── httpd-userdir.conf
│   ├── httpd-vhosts.conf
│   └── proxy-html.conf
├── httpd.conf
├── magic
├── mime.types
├── modsecurity.conf
├── original
│   ├── extra
│   │   ├── httpd-autoindex.conf
│   │   ├── httpd-dav.conf
│   │   ├── httpd-default.conf
│   │   ├── httpd-info.conf
│   │   ├── httpd-languages.conf
│   │   ├── httpd-manual.conf
│   │   ├── httpd-mpm.conf
│   │   ├── httpd-multilang-errordoc.conf
│   │   ├── httpd-ssl.conf
│   │   ├── httpd-userdir.conf
│   │   ├── httpd-vhosts.conf
│   │   └── proxy-html.conf
│   └── httpd.conf
├── pagespeed.conf
├── pagespeed_libraries.conf
├── php-fpm-apache.conf
├── privkey.pem
├── server.crt
├── server.csr
├── server.key
├── ssi.conf
├── example.com.crt -> /opt/bitnami/letsencrypt/certificates/example.com.crt
└── example.com.key -> /opt/bitnami/letsencrypt/certificates/example.com.key
```

### アプリケーションごとの設定ファイル

```
/opt/bitnami/apps/wordpress/conf
├── banner.conf
├── certs
├── htaccess.conf
├── httpd-app.conf # デフォルトで読み込まれる
├── httpd-prefix.conf
├── httpd-vhosts.conf # デフォルトで読み込まれていない
└── php-fpm
    ├── php-settings.conf
    └── pool.conf
```

VirtualHostを使って管理したい場合は、「httpd-vhosts.conf」に設定を記述して読み込むようにします。

(例えば、サイトと管理画面のURLを変えたい場合やSSLか非SSLで制御を変えたい場合など)

## bnconfigコマンド

bnconfigコマンドを使うことでアプリケーションの様々な設定を変更することができます。

所有者がrootなのでsudoで実行する必要があります。

コマンド例では

```shell
sudo /home/bitnami/apps/wordpress/bnconfig
```

と書いてありますが wordpress の部分は任意のアプリケーション名に変えます。

### Helpをみる

```shell
sudo /home/bitnami/apps/wordpress/bnconfig --help
```

### Bitnamiロゴを消す

次のコマンドを実行することでBitnamiのロゴを消します。

```shell
sudo /opt/bitnami/apps/wordpress/bnconfig –disable_banner 1
```

### アプリケーションのホスト名を設定する

```shell
sudo /opt/bitnami/apps/wordpress/bnconfig --machine_hostname 0.0.0.0
```

### URL prefixを設定する

```shell
sudo /home/bitnami/apps/wordpress/bnconfig --appurl /
```

### デフォルト言語の設定

```shell
sudo /home/bitnami/apps/wordpress/bnconfig --installer-language ja
```

## bncert-tool によるSSL証明書の取得とHTTPS化

bncert-toolはLet's Encryptによる証明書の取得を行い、自動で設定するためのツールです。

またhttpからhttpsへのリダイレクトのルールなどを編集することもできます。

ツール呼び出しは次のコマンドで実行します。

```shell
sudo /opt/bitnami/bncert-tool
```

次のように聞かれるのでSSL化対象のURLを入力します。

複数入力する場合はスペースでつなぎます。

```
----------------------------------------------------------------------------
Welcome to the Bitnami HTTPS Configuration tool.

----------------------------------------------------------------------------
Domains

Please provide a valid space-separated list of domains for which you wish to 
configure your web server.

The web server name will be configured as the first provided domain name.

If you provide a non-www domain (e.g. example.com) but not its www subdomain 
(e.g. www.example.com), it will be added automatically, and viceversa.

Domain list []: test-exmaple.com   # ← SSL化するURL(複数可)を記述する
```

ドメインを入力すると自動的にhttpsへのリダイレクトのルールなども作られます。

「Do you agree to these changes?」に対して 「Y」 を入力すると表示されているルール通りにapacheの設定ファイルが書き換えられます。

「n」を入力すると自分でルールを編集できます。

```
----------------------------------------------------------------------------
Changes to perform

The following changes will be performed to your Bitnami installation:

1. Stop web server
2. Configure web server to use an existing Let's Encrypt certificate and renew: 
/opt/bitnami/letsencrypt/certificates/test-example.com.crt
3. Disable existing Let's Encrypt cron jobs configured with the tool
4. Configure a cron job to automatically renew the certificates each month
5. Configure web server name to: test-example.com
6. Enable HTTP to HTTPS redirection (example: redirect 
http://test-example.com to https://test-example.com)
7. Enable non-www to www redirection (example: redirect test-example.com 
to www.test-example.com)
8. Start web server once all changes have been performed

You can modify the list of changes to perform if you select 'No'

Do you agree to these changes? [Y/n]: n
```

nを選択した場合、次の質問を聞かれます。

```
----------------------------------------------------------------------------
Additional configuration

Please select the list of changes you wish to perform on your Bitnami 
installation.

Enable HTTP to HTTPS redirection [Y/n]: Y

Enable non-www to www redirection [Y/n]: n

Enable www to non-www redirection [y/N]: y
```

「Enable HTTP to HTTPS redirection」: httpsのリダイレクトを行う場合は Y そうでなければ n を入力します。

「Enable non-www to www redirection」: example.com から www.example.com へのリダイレクトです。

「Enable www to non-www redirection」: www.example.com から example.com へのリダイレクトです。「Enable non-www to www redirectionを有効にしている場合は「N」を選択しなければなりません。

```
----------------------------------------------------------------------------
Create a free HTTPS certificate with Let's Encrypt

Please provide a valid e-mail address for which to associate your Let's Encrypt 
certificate.

Domain list: test-example.com www.test-example.com

Server name: test-example.com

E-mail address []: example@gmail.com

The Let's Encrypt Subscriber Agreement can be found at:

https://letsencrypt.org/documents/LE-SA-v1.2-November-15-2017.pdf

Do you agree to the Let's Encrypt Subscriber Agreement? [Y/n]: Y
```

最後にメールアドレスを入力します。エラーがなければ無事にcrtファイルとkeyファイルが/opt/bitnami/letsencrypt/certificates/に生成されます。

エラーがあった場合でも割と丁寧なメッセージでエラー原因を教えてくれました。

## ctlscript.shで各種サービスの管理

サービスに必要な各種アプリケーションは/opt/bitnami/ctlscript.shで管理します。

### Apacheを起動・停止・再起動

次のコマンドでApacheを管理します。

各種設定を変更した後はapacheの再起動を行わないと設定が反映されない場合が多いです。

```shell
# 起動
sudo /opt/bitnami/ctlscript.sh start apache

# 停止
sudo /opt/bitnami/ctlscript.sh stop apache

# 再起動
sudo /opt/bitnami/ctlscript.sh restart apache

# ステータス確認
sudo /opt/bitnami/ctlscript.sh status apache
## apache already running</span>
```

mysql や php-fpm についても同様に ctlscript.sh で管理します。

```shell
sudo /opt/bitnami/ctlscript.sh restart php-fpm
sudo /opt/bitnami/ctlscript.sh restart mysql</span>
```

<a href="http://designhack.slashlab.net/how-to-setup-multiple-wordpress-without-multisite-with-bitnami/">http://designhack.slashlab.net/how-to-setup-multiple-wordpress-without-multisite-with-bitnami/</a>

<a href="https://docs.bitnami.com/installer/how-to/understand-bncert/">https://docs.bitnami.com/installer/how-to/understand-bncert/</a>

<a href="https://docs.bitnami.com/aws/apps/trac/administration/generate-configure-certificate-letsencrypt/">https://docs.bitnami.com/aws/apps/trac/administration/generate-configure-certificate-letsencrypt/</a>