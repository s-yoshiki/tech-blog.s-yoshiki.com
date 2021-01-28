---
title: "shields.ioで技術系のアイコンをたくさん作ってみる"
path: "/entry/150"
date: "2019-07-08 23:42:04"
coverImage: "../../../images/thumbnail/shieldsio.png"
author: "s-yoshiki"
tags: ["小ネタ","雑談","shields.io"]
---

## 概要

shields.ioを用いてテック系アイコンを量産しました。
とりあえず完成したのがこちらです。
↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
<img src="https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/82419/70ce5a6d-17b5-fb8a-b7db-1cbcb2df5611.png" alt="skills.png">
これでスキルマップを作ってみたらいい感じになりました。

アイコンジェネレータも作りました。
<blockquote class="twitter-tweet" data-lang="ja">
<p lang="ja" dir="ltr"><a href="https://t.co/6Xv6XIuzRm">https://t.co/6Xv6XIuzRm</a> で技術系アイコンを作るジェネレータを作りました。

デモはここに置いてます。<a href="https://t.co/Xua8v7WEwi">https://t.co/Xua8v7WEwi</a> <a href="https://t.co/SYzZY6lejb">pic.twitter.com/SYzZY6lejb</a>

— s-yoshiki | スクリプトカス ? (@s_yoshiki_dev) <a href="https://twitter.com/s_yoshiki_dev/status/1150040884106285062?ref_src=twsrc%5Etfw">2019年7月13日</a></blockquote>
<script async="" src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

## shields.ioについて

<img src="https://img.shields.io/badge/shields-IO-cdCf71.svg?style=flat-square" height="50">
<a href="https://shields.io/">https://shields.io/</a>
GitHubのREADMEでよく見かけるアレです。
shields.ioはSVG形式のバッジサービスです。

### カスタムバッジを作る

特徴的な機能の1つとして
URLのパターンでカスタムバッジを作ることができます。

```shell
https://img.shields.io/badge/${subject}-${status}-${color}.svg

```

subject : バッジの左側に入る文言
status : バッジの右側に入る文言
color : 色

### Color

以下のようなものが用意されています。
<img width="456" alt="color.png" src="https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/82419/5a9af505-f601-ef58-6efc-7d77b7d6a6c4.png">

16進数形式で指定することも可能です。

### カスタムスタイル

いくつかのスタイルが用意されています。
?style=plastic&logo=appveyor
<img src="https://img.shields.io/badge/shields-IO-cdCf71.svg?style=plastic&logo=appveyor" height="30">
?style=flat&logo=appveyor
<img src="https://img.shields.io/badge/shields-IO-cdCf71.svg?style=flat&logo=appveyor" height="30">
?style=flat-square&logo=appveyor
<img src="https://img.shields.io/badge/shields-IO-cdCf71.svg?style=flat-square&logo=appveyor" height="30">
?style=for-the-badge&logo=appveyor
<img src="https://img.shields.io/badge/shields-IO-cdCf71.svg?style=for-the-badge&logo=appveyor" height="30">
?style=popout&logo=appveyor
<img src="https://img.shields.io/badge/shields-IO-cdCf71.svg?style=popout&logo=appveyor" height="60">
?style=popout-square&logo=appveyor
<img src="https://img.shields.io/badge/shields-IO-cdCf71.svg?style=popout-square&logo=appveyor" height="60">
?style=social&logo=appveyor
<img src="https://img.shields.io/badge/shields-IO-cdCf71.svg?style=social&logo=appveyor" height="30">

### simpleicons

バッジではいくつかのアイコンが使えます。
これについてはsimpleiconsを参考になります。
<a href="https://simpleicons.org/">https://simpleicons.org/</a>
そして一例がこれです。
<img width="1228" alt=" 2019-07-08 1.41.11.png" src="https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/82419/edf6c542-9c61-654c-3c18-03238fbd5869.png">

全部で数えたら648ありました。

## おすすめアイコンを作った

おすすめしたいアイコンを作りました。

### 言語系

<img src="https://img.shields.io/badge/PHP-ccc.svg?logo=php&style=flat" height="30"> <img src="https://img.shields.io/badge/Javascript-276DC3.svg?logo=javascript&style=flat" height="30"> <img src="https://img.shields.io/badge/-TypeScript-007ACC.svg?logo=typescript&style=flat" height="30"> <img src="https://img.shields.io/badge/-Python-F9DC3E.svg?logo=python&style=flat" height="30"> <img src="https://img.shields.io/badge/-CSS3-1572B6.svg?logo=css3&style=flat" height="30"> <img src="https://img.shields.io/badge/-HTML5-333.svg?logo=html5&style=flat" height="30">

### ライブラリ・フレームワーク

<img src="https://img.shields.io/badge/-CakePHP-D3DC43.svg?logo=cakephp&style=flat" height="30"> <img src="https://img.shields.io/badge/-Rails-CC0000.svg?logo=rails&style=flat" height="30"> <img src="https://img.shields.io/badge/-Django-092E20.svg?logo=django&style=flat" height="30"> <img src="https://img.shields.io/badge/-Flask-000000.svg?logo=flask&style=flat" height="30"> <img src="https://img.shields.io/badge/-Bootstrap-563D7C.svg?logo=bootstrap&style=flat" height="30"> <img src="https://img.shields.io/badge/-React-555.svg?logo=react&style=flat" height="30"> <img src="https://img.shields.io/badge/-jQuery-0769AD.svg?logo=jquery&style=flat" height="30">

### OS

<img src="https://img.shields.io/badge/-Linux-6C6694.svg?logo=linux&style=flat" height="30"> <img src="https://img.shields.io/badge/-Ubuntu-6F52B5.svg?logo=ubuntu&style=flat" height="30"> <img src="https://img.shields.io/badge/-Windows-0078D6.svg?logo=windows&style=flat" height="30"> <img src="https://img.shields.io/badge/-RedHat-EE0000.svg?logo=red-hat&style=flat" height="30">
<img src="https://img.shields.io/badge/-Debian-A81D33.svg?logo=debian&style=flat" height="30"> <img src="https://img.shields.io/badge/-Raspberry%20Pi-C51A4A.svg?logo=raspberry-pi&style=flat" height="30"> <img src="https://img.shields.io/badge/-Arch%20Linux-EEE.svg?logo=arch-linux&style=flat" height="30">

### ミドルウェア

<img src="https://img.shields.io/badge/-Apache-D22128.svg?logo=apache&style=flat" height="30"> <img src="https://img.shields.io/badge/-Nginx-bfcfcf.svg?logo=nginx&style=flat" height="30"> <img src="https://img.shields.io/badge/-Oracle-f80000.svg?logo=oracle&style=flat" height="30"> <img src="https://img.shields.io/badge/-Redis-D82C20.svg?logo=redis&style=flat" height="30"> <img src="https://img.shields.io/badge/-Elasticsearch-005571.svg?logo=elasticsearch&style=flat" height="30"> <img src="https://img.shields.io/badge/-PostgreSQL-336791.svg?logo=postgresql&style=flat" height="30">

### エディタ・IDE

<img src="https://img.shields.io/badge/-Visual%20Studio%20Code-007ACC.svg?logo=visual-studio-code&style=flat" height="30"> <img src="https://img.shields.io/badge/-Vim-019733.svg?logo=vim&style=flat" height="30"> <img src="https://img.shields.io/badge/-Emacs-EEE.svg?logo=spacemacs&style=flat" height="30"> <img src="https://img.shields.io/badge/-Atom-66595C.svg?logo=atom&style=flat" height="30"> <img src="https://img.shields.io/badge/-Xcode-EEE.svg?logo=xcode&style=flat" height="30"> <img src="https://img.shields.io/badge/-intellij%20IDEA-000.svg?logo=intellij-idea&style=flat" height="30">

### クラウド・他

<img src="https://img.shields.io/badge/-Amazon%20AWS-232F3E.svg?logo=amazon-aws&style=flat" height="30"> <img src="https://img.shields.io/badge/-Google%20Cloud-EEE.svg?logo=google-cloud&style=flat" height="30"> <img src="https://img.shields.io/badge/-Ansible-EE0000.svg?logo=ansible&style=flat" height="30"> <img src="https://img.shields.io/badge/-GitHub-181717.svg?logo=github&style=flat" height="30"> <img src="https://img.shields.io/badge/-Docker-EEE.svg?logo=docker&style=flat" height="30">

## アイコンジェネレータを作った。

アイコンジェネレータを作りました。
ロゴ名の設定などで一部自分で調整が必要なものがあります。

<iframe src="https://codesandbox.io/embed/icon-generator-shields-io-t8csp?fontsize=14" title="Icon generator -  shields io" allow="geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>

<a href="https://codesandbox.io/s/icon-generator-shields-io-t8csp?fontsize=14">
<img alt="Edit Icon generator -  shields io" src="https://codesandbox.io/static/img/play-codesandbox.svg"></a>

<a href="https://codesandbox.io/s/icon-generator-shields-io-t8csp?fontsize=14"></a>

## 参考

<a href="https://tech-blog.s-yoshiki.com/2019/07/1406/">https://tech-blog.s-yoshiki.com/2019/07/1406/</a>

<a href="https://qiita.com/s-yoshiki/items/436bbe1f7160b610b05c">https://qiita.com/s-yoshiki/items/436bbe1f7160b610b05c</a>

