---
title: "TablePlusを使ってみる。シンプルでモダンなSQLクライアントツール"
path: "/entry/59"
date: "2018-09-30 21:13:53"
coverImage: "../../../images/thumbnail/mysql-logo.png"
author: "s-yoshiki"
tags: ["データベース"]
---

## 概要

<a href="https://tech-blog.s-yoshiki.com/2018/09/642/">イケてるSQLクライアント、TeamSQLを使ってみた！！接続から〜簡単なグラフ作成まで！</a>でも紹介した、SQLクライアント「TeamSQL」もよかったのですが、アプリケーションの作りが荒く、アプリケーションのサイズが530MBと大きく、動作もあまり軽快ではなかったので、TablePlusを試して見ることにしました。

## TablePlus

<a href="https://tableplus.io/"><br /><img src="https://pbs.twimg.com/media/DoVnfd0UwAIPnnf.jpg" /><br /></a>

https://tableplus.io/

WindowsおよびMacに対応しています。

ただし、Windows版はMac版に比べいくつかの機能が省かれているようです。

アプリケーションのサイズも65MBであり、<br />Electronで作られたデスクトップアプリケーションなどと比較すると小さい方なのかと思います。

## 対応データベース

<img src="https://pbs.twimg.com/media/DoVnfdwU8AA4wAU.jpg" />

<ul>
<li>PostgreSQL</li>
<li>MySQL / MariaDB</li>
<li>Oracle</li>
<li>Amazon Redshift</li>
<li>SQL Server</li>
<li>redis</li>
<li>SQLite</li>
</ul>
といったデータベースをサポートしています。

## 料金

基本的に無料です。有料版はアップグレードに $49 かかります。

制限はあるものの無料版でも多くの機能が使えました。

## ライセンス

有料ライセンス1つにつき1台のデバイスからのアクセスが可能です。

注意点として、ライセンスを買った場合、TablePlusを制限なく使用し続けることができますが、<br />最新のバージョンにアップグレードすることはできません。<br />アップグレードしたい場合は、ライセンスを更新する必要がありますが、更新料金は新しいものを購入するよりも安くなります。

## 使用感・感想

先ほども述べたとおり、TeamSQLやSequre Proの乗り換え先としてこのSQLクライアントを使ってみましたが、<br />基本的な操作である接続、SELECT、INSERT、DELETE、UPDATE等の処理で特に気になる点はありませんでした。

UIも今風でシンプルなものでした。

また、<a href="https://tech-blog.s-yoshiki.com/2018/09/642/"><br />イケてるSQLクライアント、TeamSQLを使ってみた！！接続から〜簡単なグラフ作成まで！<br /></a><br />で紹介したTeamSQLと比べても動作は比較的に軽いような感じがしました。

グラフ機能とかこだわりの機能がなければ、TablePlusで十分だと思います。

## 接続〜SQL実行

ひとまず、起動から接続してからSQL実行までのフローを紹介します。

### 起動

<img src="https://pbs.twimg.com/media/DoVnfeHUgAEUFWw.jpg" /><br />アプリケーションを起動した時の様子です。<br />「Create a new connection」から新しい接続先を作成します。

### 接続

<img src="https://pbs.twimg.com/media/DoVsHNLV4AAasba.jpg" /><br />接続先のダイアログからデータベースの種類を選択できます。<br />今回の場合はMySQLを試します。

<img class="" src="https://pbs.twimg.com/media/DoVsIYTV4AIaQBP.png" width="617" height="537" />

次に接続先の情報を入力します。<br />SSHトンネリングを利用した接続にも対応しています。

また、MySQL8に対応しているのも良いところ。

### SQL実行

<img src="https://pbs.twimg.com/media/DoVw9yPUgAEa1qk.jpg" /><br />エディタを利用してSQLを実行できます。<br />エディタも補完機能が働き、とても使いやすいです。

また、無料版では同時に開けるタブの数が2妻でと限られています。これは残念。

<img src="https://pbs.twimg.com/media/DoVwcaoU4AA1a5T.jpg" /><br />取得したSQLの値をこの画像のように直接書き換えることも可能です。

## おまけ：ショートカットキー一覧

TablePlusで利用できるショートカットキーを掲載しておきます。

```
⌘+ P：開く - ワークスペース
⌘+ S：変更保存 - ワークスペース
⌘+ N：新規接続 - グローバル
⌘+ W：タブ/ウィンドウを閉じる - ワークスペース
⌘+ Q：アプリを終了 - グローバル
⌘+ T：新しいタブを開く - ワークスペース
⌘+ R：ワークスペースの再読み込み - ワークスペース
⌘+ [：左のタブに移動 - ワークスペース
⌘+]：右のタブに移動 - ワークスペース
⌘+数字：数字のタブに移動 - ワークスペース
⌘+ Eまたはreturn：SQLクエリを開く - ワークスペース
⌘+ K - データベースの切り替え - ワークスペース
⌘+⇧+ K - スイッチ接続 - ワークスペース
⌘+ I または ^ + I：選択したSQLコードをインデントする - ワークスペース - SQLタブ、SQLビューア
⌘+ E：すべてのSQL文を実行 - ワークスペース - SQLタブ
⌘+⇧+ E：選択したSQL文を実行する - ワークスペース - SQLタブ
⌘+ O：ファイルを開くSQL - ワークスペース - SQLタブ
⌘+⇧+ O：SQLファイルを開く - グローバル
⌘+、：オープン嗜好 - グローバル
⌘+ Z：元に戻す - ワークスペース
⌘+⇧+ Z：やり直し - ワークスペース
スペース：行詳細表示の切り替え - ワークスペース
中マウス+アイテム：新しいタブで開く - ワークスペース
中マウス+セル：クイックルックを開く - ワークスペース
⌘+ shift + O：SQLクエリエディタを開く - ワークスペース
⌘+テーブルリストをクリック：新しいタブで開く - ワークスペース
⌥+フィールドをクリック：クイック編集メニューを開く - ワークスペース - テーブルデータ
タブ：編集中にフォーカスを移動する - ワークスペース - テーブルデータ
```

## その他

まだまだ開発が盛んなこともあり、新機能等に関してはGitHubの変更履歴をみてくださいとのこと。<br /><br />

<!-- wp:embed {"url":"https://github.com/TablePlus/TablePlus/issues"} -->
<figure class="wp-block-embed"><div class="wp-block-embed__wrapper">
https://github.com/TablePlus/TablePlus/issues
</div></figure>
<!-- /wp:embed -->
