---
title: "UNIXドメインソケット通信 vs INETドメインソケット通信 php-fpmで動作させる場合の違いについて"
path: "/entry/216"
date: "2021-01-10 18:00"
coverImage: "../../../images/thumbnail/linux-logo.png"
author: "s-yoshiki"
tags: ["php","apache","nginx","linux"]
---

## 概要

php-fpm の設定方法で調べた際にIPとポートで設定するパターンとUNIXソケットで設定するパターンの両方があったので
それぞれの特徴やメリットデメリットを踏まえつつ違いを整理してまとめたものを記載します。


※ ここで言うUNIXドメインソケット通信は php-fpmで例えると

```shell
/run/php-fpm/php-fpm.sock
```

みたいなやつで、INETドメイン

```shell
127.0.0.1:9000
```

です。

## 結論

先に結論を書きます。

ApacheやNginxなどのリクエストを受けるサーバ(フロントサーバ)と同じマシンにでphp-fpmを利用する場合はUNIXドメインソケットを利用することが理にかなっています。
INETドメインは、フロントサーバとFPMサーバを分離する場合、FPMサーバのみスケールアップするといった運用ができる点で意味があります。


## ソケット通信について

### ソケットについて

 - ソケットを使うとHTTPよりも下のレイヤーのプロトコルを扱える
   - TCPやUDP (L4 トランスポート層) で動作するアプリケーションを作成できる
 - 独自のプロトコル／フォーマットによる通信が可能

### ソケット通信の種類

ソケット通信は2種類あります。

 - INETドメイン(ネットワークソケット)
   - 自分とは異なるマシンに対してのプロセス間の通信を行うためのソケット
   - IP + ポートを利用する (127.0.0.1:9000)
 - UNIXドメイン
   - 同じマシン内でプロセス間の通信を行うためのソケット
   - ソケットファイルを利用する (/run/php-fpm/php-fpm.sock)

UNIXドメインソケットはさらに、「ファイルシステムパス名(pathname)」「無名(unnamed)」「抽象名前空間(abstract)」の3種類が存在する。

### UNIXドメインソケット通信を行う場合のメリット

UNIXドメインソケット通信はINETドメインに比べ、スループットが優れているというデータがあります。
しかしながら、INETドメインもUNIXドメインもどちらも実戦で利用されている実績がるため、実装や保守がコストの面で導入が容易なものを利用するべきです。


## 参考にしたサイト

[調べなきゃ寝れない！と調べたら余計に寝れなくなったソケットの話](https://qiita.com/kuni-nakaji/items/d11219e4ad7c74ece748)

[nginx と PHP-FPM の仕組みをちゃんと理解しながら PHP の実行環境を構築する](https://qiita.com/kotarella1110/items/634f6fafeb33ae0f51dc)

[What are the differences from running PHP-FPM over an Unix Socket vs a TCP/IP Socket?](https://stackoverflow.com/questions/42704763/what-are-the-differences-from-running-php-fpm-over-an-unix-socket-vs-a-tcp-ip-so)

[Performance Analysis of Various Mechanisms for Inter-process Communication](http://osnet.cs.binghamton.edu/publications/TR-20070820.pdf)

[INETドメインとUNIXドメイン](http://techtipshoge.blogspot.com/2016/08/inetunix.html)

[unix - sockets for local interprocess communication](https://man7.org/linux/man-pages/man7/unix.7.html)

[PHPで学ぶソケットプログラミング入門](http://slides.com/ryoutsunomiya/php-socket-programming)

[Nginx + PHP-FPM で unix ドメインソケットを使ったシンプルな docker-compose.yml を書きました。2](https://oki2a24.com/2018/11/14/useing-unix-domain-socket-to-nginx-php-fpm-in-docker-2/)