---
title: "fswatch rsync unison を使ってリアルタイムで同期する"
path: "/entry/167"
date: "2019-11-03 13:32:02"
coverImage: "../../../images/thumbnail/apple-logo.jpg"
author: "s-yoshiki"
tags: ["linux","mac","開発環境","fswatch","rsync","unison"]
---

## 概要

fswatch + rsync or fswatch + unison でディレクトリ間をリアルタイムで同期する方法の紹介です。

開発環境へのアップロードなどの場面で役立つでしょう。

## 環境・バージョン情報等

mac上で検証しました。全てhomebrewでセットアップしています。

<!-- wp:heading {"level":3} -->

### fswatch 

<!-- wp:embed {"url":"https://github.com/emcrisostomo/fswatch"} -->
<figure class="wp-block-embed"><div class="wp-block-embed__wrapper">
https://github.com/emcrisostomo/fswatch
</div></figure>
<!-- /wp:embed -->

<!-- wp:heading {"level":3} -->

### バージョン情報

<!-- wp:list -->
<ul><li>macOS Catalina </li><li>fswatch 1.14.0</li><li>Rsync 3.1.3</li><li>unison 2.51.2 (ocaml 4.08.1)</li></ul>
<!-- /wp:list -->

<!-- wp:heading {"level":3} -->

### インストール

fswatch

```
$ brew install fswatch

```

rsync

```
$ brew install rsync

```

unison

```
$ brew install unison

```

## fswatch + rsync で同期する

ここで 作業ディレクトリ src1/ と src2/ を同期する方法を考えます。

fswatch + rsync を利用する方法は 例えばsrc1/ ディレクトリでファイルに変更があった場合 src2/ に同期するというものです。

```
$ fswatch -o /path/to/src1 | xargs -I{} rsync -r /path/to/src1/ /path/to/src2/

```

rsyncは双方間の同期に向いていません。双方間の同期を実現するにはunisonが必要になります。

## fswatch + unison で同期する

次に fswatch + unison を利用して src1/ と src2/ の双方向で同期する方法を紹介します。

<!-- wp:heading {"level":3} -->

### unisonの設定

unisonを容易に利用するために設定ファイルを記述します。

**~/.unison/sync.prf**

```
# タイムスタンプをコピーする
times = true

# 新しいファイルを優先
prefer = newer

# 同期する対象のルートパスの定義
root=/path/to/src1/
root=/path/to/src2/

# 同期するパスの定義
path=./

```

<!-- wp:heading {"level":3} -->

### 同期コマンド

```
$ fswatch -o /path/to/src1 /path/to/src2 | xargs -I{} unison -batch sync

```

上手くいくと次のようにログが出力されます。

```
Looking for changes
Reconciling changes
changed  <==== props      test.txt  
src1         : changed file       modified on 2019-11-02 at 18:53:30  size 20        rw-r--r--
src2         : changed props      modified on 2019-11-02 at 18:53:39  size 17        rw-r--r--
         <---- changed    .DS_Store  
src1         : unchanged file     modified on 2019-11-02 at 18:34:44  size 6148      rw-r--r--
src2         : changed file       modified on 2019-11-02 at 18:34:49  size 6148      rw-r--r--
         <---- changed    test2.txt  
src1         : unchanged file     modified on 2019-11-02 at 18:24:03  size 0         rw-r--r--
src2         : changed file       modified on 2019-11-02 at 18:35:02  size 1         rw-r--r--
Propagating updates
UNISON 2.51.2 (OCAML 4.08.1) started propagating changes at 18:56:19.92 on 02 Nov 2019
[BGN] Updating file test.txt from /path/to/src2 to /path/to/src1
[END] Updating file test.txt
[BGN] Updating file .DS_Store from /path/to/src2 to /path/to/src1
[END] Updating file .DS_Store
[BGN] Updating file test2.txt from /path/to/src2 to /path/to/src1
[END] Updating file test2.txt

```

## 参考

<a href="https://qiita.com/tukiyo3/items/98f582a7ed0227cfc564">https://qiita.com/tukiyo3/items/98f582a7ed0227cfc564</a>

<a href="https://qiita.com/m-hatano/items/4b458c4a49136f190c34">https://qiita.com/m-hatano/items/4b458c4a49136f190c34</a>

[https://qiita.com/nagais/items/7403411b4aa193d0fa0d](https://qiita.com/nagais/items/7403411b4aa193d0fa0d)