---
title: "PostfixでメールリレーしてMailHogで受信する開発用Dockerコンテナの構築"
path: "/entry/239"
date: "2021-05-19 23:59"
coverImage: "../../../images/thumbnail/docker-logo.png"
author: "s-yoshiki"
tags: ["docker", "postfix", "centos", "php", "telnet"]
---

## 概要

Postfixのリレーを介して送信されたメールをMailHog(開発用SMTPサーバ)でキャッチするDocker開発環境を構築した際のメモです。

### 環境

 - Docker
   - CentOS:8.3



## Dockerイメージ作成

Dockerイメージ作成に必要なファイルの用意を行います。


リポジトリの構成はこのようにします。

```
├── app
│   ├── Dockerfile
│   └── conf
│       ├── entrypoint.sh
│       └── main.cf
└── docker-compose.yml
```

**app/Dockerfile**

```dockerfile
FROM centos:8.3.2011

RUN dnf -y install postfix

# おまけ: 送信テストのためにphpとtelnetをインストール
RUN dnf -y install telnet php php-mbstring

COPY conf/entrypoint.sh /entrypoint.sh
COPY conf/main.cf /etc/postfix/main.cf

RUN chmod 700 /entrypoint.sh
ENTRYPOINT [ "/entrypoint.sh" ]
CMD ["/sbin/init"]
```

**conf/main.cf**

```ini
# relayhost = [host.docker.internal]:1025
compatibility_level = 2
queue_directory = /var/spool/postfix
command_directory = /usr/sbin
daemon_directory = /usr/libexec/postfix
data_directory = /var/lib/postfix
mail_owner = postfix
mydomain = example.com
myorigin = $mydomain
inet_interfaces = localhost
inet_protocols = ipv4
mydestination = $myhostname, localhost.$mydomain, localhost
unknown_local_recipient_reject_code = 550
mynetworks = localhost
alias_maps = hash:/etc/aliases
alias_database = hash:/etc/aliases
home_mailbox = Maildir/
debug_peer_level = 2
debugger_command =
         PATH=/bin:/usr/bin:/usr/local/bin:/usr/X11R6/bin
         ddd $daemon_directory/$process_name $process_id & sleep 5
sendmail_path = /usr/sbin/sendmail.postfix
newaliases_path = /usr/bin/newaliases.postfix
mailq_path = /usr/bin/mailq.postfix
setgid_group = postdrop
html_directory = no
manpage_directory = /usr/share/man
sample_directory = /usr/share/doc/postfix/samples
readme_directory = /usr/share/doc/postfix/README_FILES
smtpd_tls_cert_file = /etc/pki/tls/certs/postfix.pem
smtpd_tls_key_file = /etc/pki/tls/private/postfix.key
smtpd_tls_security_level = may
smtp_tls_CApath = /etc/pki/tls/certs
smtp_tls_CAfile = /etc/pki/tls/certs/ca-bundle.crt
smtp_tls_security_level = may
meta_directory = /etc/postfix
shlib_directory = /usr/lib64/postfix

```

**conf/entrypoint.sh**

```shell
#!/bin/bash

set -e

# リレーホストの設定
echo "relayhost = $MAIL_SERVICE" >> /etc/postfix/main.cf

# Postfixを起動
/usr/sbin/postfix -c /etc/postfix start

exec "$@"
```

**docker-compose.yml**

```yml
version: '3'
services:
  app:
    container_name: "app"
    build: ./app
    tty: true
    environment: 
      - MAIL_SERVICE=[mail]:1025
    networks:
      - my-network1
  mail:
    image: mailhog/mailhog:latest
    ports:
      - "8025:8025"
      - "1025:1025"
    networks:
      - my-network1

networks:
  my-network1:
```

この設定でアプリケーションを動かすコンテナと開発用のメール受信コンテナ(MailHog)を作成できました。

## コンテナの起動

次のコマンドでコンテナを起動します。

```shell
docker-compose up -d --build
```

MailHogは http://localhost:8025 からアクセスできます。

コンテナにシェルで入ります。

```shell
docker exec -it app bash
```


## telnetで送信テスト

telnetでローカルホストのSMTPサーバに繋ぎに行きます。

```
telnet localhost 25
```

次のようにメッセージを入れることでメール送信を確認することができます。

```
Trying 127.0.0.1...
Connected to localhost.
Escape character is '^]'.
220 90f3e3d03e27.example.com ESMTP Postfix
HELO foo@example.com
250 90f3e3d03e27.example.com
MAIL FROM: <foo@example.com>
250 2.1.0 Ok
RCPT TO: <bar@example.com>
250 2.1.5 Ok
DATA
354 End data with <CR><LF>.<CR><LF>
Subject: test 

Hello World!
.
250 2.0.0 Ok: queued as B6DD13210E4
quit
221 2.0.0 Bye
Connection closed by foreign host.
```


## phpで送信テスト

次のようにPHPファイルを作成し実行することでメールの送信を確認することができると思います。

```
<?php
$to = "to@example.com";
$subject = "TEST";
$message = "Hello World!";
$headers = "From: from@example.com";
mb_send_mail($to, $subject, $message, $headers); 
```