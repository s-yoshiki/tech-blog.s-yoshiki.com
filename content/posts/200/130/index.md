---
title: "Macにdockerをインストール"
path: "/entry/130"
date: "2019-06-09 16:31:57"
coverImage: "../../../images/thumbnail/docker-logo.png"
author: "s-yoshiki"
tags: ["linux","mac","docker","docker-ce","docker-compose","homebrew"]
---

## 概要

Macにdockerをインストールします。

## インストール

homebrewを使ってインストールします。

<a href="https://brew.sh/index_ja">https://brew.sh/index_ja</a>

ターミナルから以下のコマンドで実行します。

```shell
$ brew install docker
==> Downloading https://homebrew.bintray.com/bottles/docker-18.09.6.mojave.bottle.tar.gz
==> Downloading from https://akamai.bintray.com/ee/eefe44ffb39bc0de3c88c3ef5bd7fedee6aded52eb1c4b4d07dc94158ba18b16?__gda__=exp=1559051212~hmac=b57eebef763ab7889d4c8173ff7a62597
######################################################################## 100.0%
==> Pouring docker-18.09.6.mojave.bottle.tar.gz
==> Caveats
Bash completion has been installed to:
  /usr/local/etc/bash_completion.d

zsh completions have been installed to:
  /usr/local/share/zsh/site-functions
==> Summary
?  /usr/local/Cellar/docker/18.09.6: 8 files, 72.3MB
$ brew cask install docker
Updating Homebrew...
==> Satisfying dependencies
==> Downloading https://download.docker.com/mac/stable/31259/Docker.dmg
######################################################################## 100.0%
==> Verifying SHA-256 checksum for Cask 'docker'.
==> Installing Cask docker
==> Moving App 'Docker.app' to '/Applications/Docker.app'.
?  docker was successfully installed!
```

```shell
$ docker -v       
Docker version 18.09.2, build 6247962
$ docker version   
Client: Docker Engine - Community
 Version:           18.09.2
 API version:       1.39
 Go version:        go1.10.8
 Git commit:        6247962
 Built:             Sun Feb 10 04:12:39 2019
 OS/Arch:           darwin/amd64
 Experimental:      false

Server: Docker Engine - Community
 Engine:
  Version:          18.09.2
  API version:      1.39 (minimum version 1.12)
  Go version:       go1.10.6
  Git commit:       6247962
  Built:            Sun Feb 10 04:13:06 2019
  OS/Arch:          linux/amd64
  Experimental:     false
```

```shell
$ docker-compose -v
docker-compose version 1.23.2, build 1110ad01
```

hellow world してみます。

```shell
docker run hello-world

Hello from Docker!
This message shows that your installation appears to be working correctly.

To generate this message, Docker took the following steps:
 1. The Docker client contacted the Docker daemon.
 2. The Docker daemon pulled the "hello-world" image from the Docker Hub.
    (amd64)
 3. The Docker daemon created a new container from that image which runs the
    executable that produces the output you are currently reading.
 4. The Docker daemon streamed that output to the Docker client, which sent it
    to your terminal.

To try something more ambitious, you can run an Ubuntu container with:
 $ docker run -it ubuntu bash

Share images, automate workflows, and more with a free Docker ID:
 https://hub.docker.com/

For more examples and ideas, visit:
 https://docs.docker.com/get-started/
```

問題なさそうです。