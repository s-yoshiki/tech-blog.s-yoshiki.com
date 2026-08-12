---
title: "DistrolessコンテナでPrismaを動かす"
path: "/entry/298"
date: "2023-01-14 16:00"
coverImage: "../../../images/thumbnail/prisma-logo.png"
author: "s-yoshiki"
tags:
  [
    "prisma",
    "javascript",
    "typescript",
    "node.js",
    "docker",
  ]
---

## 概要

Prismaを利用するアプリケーションをDistrolessコンテナで動作させようとした際に、
依存関係の調整を行うことで動作させました。
その際のノートです。

動作させるための要点は

- OpenSSLの導入
- シェルコマンド依存箇所の調整
- Primsaエンジンの調整

となります。

そして、結局のところPrismaをdistrolessで利用すべきではないと思ったので、
それについても話しています。

またPrismaアプリケーションの構築の話は割愛しています。

### Distrolessについて

[GoogleContainerTools/distroless: 🥑 Language focused docker images, minus the operating system.](https://github.com/GoogleContainerTools/distroless)

必要最低限のアプリケーションとそのランタイム依存関係のみが含まれるコンテナイメージです。

## Distroless+Prismaを構築するためのポイント

冒頭にも書いたとおり、Distrolessコンテナ+Prismaを動作させる際にポイントとなったのは

- OpenSSLの調整
- シェルコマンド依存箇所の調整
- Primsaエンジンの調整

でした。

ここの依存関係の調整がうまくいっていない場合、次のようなエラーが発生します。

```
/snapshot/app/node_modules/@prisma/client/runtime/index.js:27675
      throw new PrismaClientInitializationError(
            ^
Error: Unknown PRISMA_QUERY_ENGINE_LIBRARY linux-arm64-openssl-undefined. Possible binaryTargets: darwin, darwin-arm64, debian-openssl-1.0.x, debian-openssl-1.1.x, debian-openssl-3.0.x, rhel-openssl-1.0.x, rhel-openssl-1.1.x, rhel-openssl-3.0.x, linux-arm64-openssl-1.1.x, linux-arm64-openssl-1.0.x, linux-arm64-openssl-3.0.x, linux-arm-openssl-1.1.x, linux-arm-openssl-1.0.x, linux-arm-openssl-3.0.x, linux-musl, linux-musl-openssl-3.0.x, linux-nixos, windows, freebsd11, freebsd12, freebsd13, openbsd, netbsd, arm, native or a path to the query engine library.
You may have to run prisma generate for your changes to take effect.
```

## 動作不良の原因

Prismaのソースをデバッグすると、
`packages/engine-core/src/library/LibraryEngine.ts`
で例外が投げられていることがわかりました。

[prisma/LibraryEngine.ts at main · prisma/prisma](https://github.com/prisma/prisma/blob/main/packages/engine-core/src/library/LibraryEngine.ts)

さらに読んでいくと環境情報のチェックをおこなっていると思われる
`packages/get-platform/src/getPlatform.ts`
で、OpenSSLに関する情報の取得に失敗していることがわかりました。

[prisma/getPlatform.ts at main · prisma/prisma](https://github.com/prisma/prisma/blob/main/packages/get-platform/src/getPlatform.ts)

この部分を整理すると要因は次の関係と言えそうです。

```
OpenSSLの存在チェックに失敗
  ↓
OpenSSLの存在チェックを行うためのOSのコマンドの実行に失敗
  ↓
- nodeのexecを実行するためのシェル環境が存在しない
- zlib(libz.so)が存在しない
- 関連コマンドが存在しない
- OpenSSLが存在しない
```

またこれ以外にprismaエンジンの読み込みに失敗もしていました。

## 対策

上記のような問題がある中でどのような対応を行い動作させたかについて書きます。

実装の詳細について下記のDockerfileに記載しています。

### OpenSSLの存在チェック

上記で触れたOpenSSLの存在チェックは次の条件で行われていました。

1. `/usr/lib/{aarch64 or x86_64}-linux-gnu` or `/lib/${aarch64 or x86_64}-linux-gnu` に`libssl.so`が存在するか

- debian系以外のディストロでは`/lib`や`lib64`がチェックされます

1. `ldconfig -p` の結果に`ssl`が存在するか
1. `openssl version -v`の結果が返ってくるか

なので、これらのチェックの機能が動くように調整します。

<!--
下手に `/usr` や `/lib` の下を弄って依存関係を壊すのも怖いので、
`/opt`等の下に入れて、3番目のコマンドのチェックによる方式を利用する方法を試してみます。
-->

### zlib(libz.so)が存在しない

OpenSSLのみを何らかの形でインストールしたとしても依存関係でzlibが必要となります。
この場合、opensslが次の様なエラーを吐きます。

```
openssl: error while loading shared libraries: libz.so.1: cannot open shared object file: No such file or directory
```

なので、zlibもインストールを行います。

### 最低限のコマンド実行環境の用意

Distrolessはシェル(`/bin/sh`)が存在しません。
なのでなんとかしてシェルを動かす必要があります。

busyboxから`/bin/sh` を移すことで対応してみました。

### Prismaエンジンの読み込みに失敗する問題の対策

Prismaエンジンの読み込みに失敗すると次の様なエラーが出ます。

```
/app/index.js:42581
      throw new PrismaClientInitializationError(errorText, this.config.clientVersion);
            ^
Error: Query engine library for current platform "linux-arm64-openssl-3.0.x" could not be found.
You incorrectly pinned it to linux-arm64-openssl-3.0.x

This probably happens, because you built Prisma Client on a different platform.
(Prisma Client looked in "/app/libquery_engine-linux-arm64-openssl-3.0.x.so.node")

Searched Locations:

  /.prisma/client
  /app/node_modules/@prisma/client
  /
  /app
  /app
  /tmp/prisma-engines
  /app
```

この問題についてはソースをバンドルしてコンテナをビルドしたことによる影響だったので
環境の問題とは異なりますが、Prismaエンジンが正しく読み込めるよう解決させる必要がありました。

## Dockerfile

### gcr.io/distroless/nodejs18-debian11

gcr.io/distroless/nodejs18-debian11 の場合は次の内容のDockerfileを定義吸えうことで動作しました。

```Dockerfile
FROM node:18 as builder

# zlibの構築に必要なものを取得
RUN apt-get -y update && apt-get -y install -y wget perl gcc make

WORKDIR /tmp
# zlibを/optに入れて他の依存関係を壊さないようにインストールし、
# 最終的にアプリケーションコンテナにコピーする
RUN wget https://www.zlib.net/zlib-1.2.13.tar.gz &&\
  tar -xvf zlib-1.2.13.tar.gz &&\
  cd zlib-1.2.13 &&\
  ./configure  --prefix="/opt/local" &&\
  make &&\
  make install

# OpenSSL 3.0.xを利用したい場合
# RUN wget https://www.openssl.org/source/openssl-3.0.7.tar.gz &&\
#   tar -xvf openssl-3.0.7.tar.gz &&\
#   cd openssl-3.0.7 &&\
#   ./Configure \
#   shared zlib \
#   --with-zlib-include="/opt/local/include/" \
#   --with-zlib-lib="/opt/local/lib/" \
#   --prefix="/opt/local" &&\
#   make && make install_sw

ENV LD_LIBRARY_PATH /opt/local/lib:/$LD_LIBRARY_PATH
ENV PATH /opt/local/bin:/$PATH

WORKDIR /app
RUN mkdir -p /app
COPY . /app
RUN npm install
# バンドルにnccを利用しました。
# nccでコンパイルした場合、prismaエンジンがprisma実行時に参照できない場所に配置されるので
# 調整しています。
RUN npx ncc build src/main.ts -o dist/ && cp dist/client/libquery_engine-* dist

# busyboxのイメージから /bin/sh をコピーするために定義します。
FROM busybox:1.35.0-uclibc as busybox

FROM gcr.io/distroless/nodejs18-debian11 as app
COPY --from=builder /opt/local/lib /opt/local/lib
COPY --from=busybox /bin/sh /bin/sh
COPY --from=builder --chown=nonroot:nonroot /app/dist /app
ENV NODE_ENV production
ENV LD_LIBRARY_PATH /opt/local/lib:/lib:/$LD_LIBRARY_PATH
# /optの下に入れたopensslを利用する場合は有効にする。
# ENV PATH /opt/local/bin:/$PATH
# 任意のDBホスト
ENV DATABASE_URL "mysql://docker:docker@host.docker.internal:3306/app"
WORKDIR /app
USER nonroot
EXPOSE 3000
CMD [ "/app/index.js" ]
```

## 所感

強引な方法でDistrolessでPrismaを動かすことはできましたが、
シェル環境が必要だったことを考えるとdebianなどの通常のディレストリビューションのイメージの
方が良いのではと思いました。

## 参考にしたサイト

- [DistrolessイメージでPrismaを動かしてみた - ISID テックブログ](https://tech.isid.co.jp/entry/distrolessAndPrisma)
- [Read-only file system (os error 30) on distroless docker image · Discussion #4592 · prisma/prisma](https://github.com/prisma/prisma/discussions/4592)
- [Library may be corrupt (missing `libz.so.1`) when using distroless Docker images · Issue #16205 · prisma/prisma](https://github.com/prisma/prisma/issues/16205)
- [M1 MacのDocker上のNestJSでPrismaを動かすまでに詰まった点](https://zenn.dev/ishiki/articles/nest-prisma-docker-m1)
- [Error: Unknown binaryTarget linux-arm64-openssl-undefined and no custom engine files were provided · Issue #16232 · prisma/prisma](https://github.com/prisma/prisma/issues/16232)
- [Add shell or bash to a docker image (Distroless based on Debian GNU/Linux) - Stack Overflow](https://stackoverflow.com/questions/61039877/add-shell-or-bash-to-a-docker-image-distroless-based-on-debian-gnu-linux)
