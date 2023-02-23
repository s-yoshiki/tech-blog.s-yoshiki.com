---
title: "inotify-tools rsync unison を利用してディレクトリを同期する"
path: "/entry/168"
date: "2019-11-03 19:41:26"
coverImage: "../../../images/thumbnail/centos-logo.png"
author: "s-yoshiki"
tags: ["linux","centos","rsync","unison","inotify-tools","inotifywait"]
---

## 概要

inotify-tools + rsync or inotify-tools + unison でディレクトリ間をリアルタイムで同期する方法の紹介です。

開発環境へのアップロードなどの場面で役立つでしょう。

## 環境・バージョン情報等

CentOS6上で検証しています。

<!-- wp:heading {"level":3} -->

### inotify-tools

<!-- wp:embed {"url":"https://github.com/rvoicilas/inotify-tools"} -->
<figure class="wp-block-embed"><div class="wp-block-embed__wrapper">
https://github.com/rvoicilas/inotify-tools
</div></figure>
<!-- /wp:embed -->

<!-- wp:heading {"level":3} -->

### バージョン情報

<!-- wp:list -->
<ul><li>CentOS6</li><li>inotify-tools (inotifywait, inotifywatch) 3.14</li><li>Rsync 3.0.6</li><li>unison 2.40.63</li></ul>
<!-- /wp:list -->

<!-- wp:heading {"level":3} -->

### インストール

**inotify-tools**

```shell
# 必要なモジュール類のインストール
$ yum -y install wget gcc gcc-c++ make
# inotify-toolsのインストール
$ cd /tmp
$ wget http://download-ib01.fedoraproject.org/pub/epel/6/x86_64/Packages/i/inotify-tools-3.14-2.el6.x86_64.rpm
$ yum -y localinstall inotify-tools-3.14-2.el6.x86_64.rpm
```

<!-- wp:embed {"url":"https://centos.pkgs.org/6/epel-x86_64/inotify-tools-3.14-2.el6.x86_64.rpm.html"} -->
<figure class="wp-block-embed"><div class="wp-block-embed__wrapper">
https://centos.pkgs.org/6/epel-x86_64/inotify-tools-3.14-2.el6.x86_64.rpm.html
</div></figure>
<!-- /wp:embed -->

**rsync**

```
$ yum -y install rsync
```

**unison**

```
$ cd /tmp
$ wget http://ftp.tu-chemnitz.de/pub/linux/dag/redhat/el6/en/x86_64/rpmforge/RPMS/unison-2.40.63-1.el6.rf.x86_64.rpm
$ yum -y localinstall unison-2.40.63-1.el6.rf.x86_64.rpm
```

<!-- wp:embed {"url":"https://centos.pkgs.org/6/repoforge-x86_64/unison-2.40.63-1.el6.rf.x86_64.rpm.html"} -->
<figure class="wp-block-embed"><div class="wp-block-embed__wrapper">
https://centos.pkgs.org/6/repoforge-x86_64/unison-2.40.63-1.el6.rf.x86_64.rpm.html
</div></figure>
<!-- /wp:embed -->

## inotifywait + rsync で同期する

ここで 作業ディレクトリ src1/ と src2/ を同期する方法を考えます。

fswatch + rsync を利用する方法は 例えばsrc1/ ディレクトリでファイルに変更があった場合 src2/ に同期するというものです。

```
$ inotifywait -m /path/to/src1 | xargs -I{} rsync -r /path/to/src1/ /path/to/src2/
```

inotifywait の -e オプションで監視するイベントの種類を絞る事ができます。また複数の操作を行うのであれば、whileで回した方が良いと思います。

```
#!/bin/bash

SRC_PATH=/path/to/src1/
DST_PATH=/path/to/src2/

while inotifywait -e CREATE -e MODIFY -e DELETE $SRC_PATH; do
    rsync -r $SRC_PATH $DST_PATH
    chown www-data:www-data -R $DST_PATH
    chmod 755 -R $DST_PATH
done
```

次は双方間のディレクトリ同期についてです。\n双方間の同期の実現は、rsyncよりunisonの方が向いています。

## inotifywait + unison で同期する

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
$ inotifywait -m /path/to/src1 /path/to/src2 | xargs -I{} unison -batch sync
```

## 参考

<!-- wp:embed {"url":"https://codeday.me/jp/qa/20190816/1457317.html"} -->
<figure class="wp-block-embed"><div class="wp-block-embed__wrapper">
https://codeday.me/jp/qa/20190816/1457317.html
</div></figure>
<!-- /wp:embed -->

[<a href="https://qiita.com/stc1988/items/464410382f8425681c20" target="_blank" rel="noreferrer noopener">https://qiita.com/stc1988/items/464410382f8425681c20</a>
