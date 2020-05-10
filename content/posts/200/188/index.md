---
title: "GolangをCGIとして実行する"
path: "/entry/188"
date: "2020-02-11 21:46:04"
coverImage: "../../../images/thumbnail/golang-logo.png"
author: "s-yoshiki"
tags: ["go","cgi"]
---

## 概要

Golang を CGIとして実行する際のメモ

## 環境

<!-- wp:heading {"level":3} -->

### golang

```shell
$ go version
go version go1.13.7 darwin/amd64
```

<!-- wp:heading {"level":3} -->

### パッケージ

以下のモジュールを利用しています。

<!-- wp:list -->
<ul><li>net/http</li><li>net/http/cgi</li><li>github.com/gorilla/mux</li></ul>
<!-- /wp:list -->

github.com/gorilla/mux は利用している目的は特にありません。シンプルでgithubのstar数が多かったからです。ここのサンプルを流用する場合に別のフレームワークに置き換えても問題ないです。

<!-- wp:embed {"url":"https://github.com/gorilla/mux"} -->
<figure class="wp-block-embed"><div class="wp-block-embed__wrapper">
https://github.com/gorilla/mux
</div></figure>
<!-- /wp:embed -->

## ソースと実行

```go
package main

import (
	"fmt"
	"net/http"
	"net/http/cgi"
	"os"
	"github.com/gorilla/mux"
)

func viewHandler1(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "text/plain; charset=utf-8")
	fmt.Fprintln(w, "path1")
}

func viewHandler2(w http.ResponseWriter, r *http.Request) {
	param := mux.Vars(r)
	w.Header().Set("Content-Type", "text/plain; charset=utf-8")
	fmt.Fprintln(w, "path2")
	fmt.Fprintln(w, param["id"])
}

func main() {
	router := mux.NewRouter()
	rootPath := os.Getenv("SCRIPT_NAME")
	router.HandleFunc(rootPath+"/path1/", viewHandler1).Methods("GET")
	router.HandleFunc(rootPath+"/path2/{id}/", viewHandler2).Methods("GET")
	cgi.Serve(router)
}

```

ソースの説明は後で説明

<!-- wp:heading {"level":3} -->

### ビルドとサーバ実行

次のコマンドでファイルをsever.cgiという名前でビルドする。

```
$ go build -ldflags "-s -w" -o server.cgi server.go
```

実行バイナリをCGI実行環境下のディレクトリに配置する。\nディレクトリ構成は次のようにした。

```
./web
└── cgi-bin
    └── server.cgi
```

今回はPythonでCGIサーバを立てる。

```shell
$ pwd
/path/to/web
$ python -m http.server 8080 --cgi
Serving HTTP on 0.0.0.0 port 8080 (http://0.0.0.0:8080/) ...
```

"http://0.0.0.0:8080/cgi-bin/server.cgi/path1/" にアクセスする\n「path1」と表示されていればOK

**ここでソースの説明**

```go
rootPath := os.Getenv("SCRIPT_NAME")
```

でスクリプトのパスを取得する。今回の場合は /cgi-bin/server.cgi となる。

したがって、rootPath+"/path1/" は /cgi-bin/server.cgi/path1/ にルーティングされる。

## 標準ライブラリのみ

標準ライブラリのみで実行するならこう

```go
package main

import (
	"fmt"
	"net/http"
	"net/http/cgi"
)

func viewHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "text/plain; charset=utf-8")
	fmt.Fprintln(w, "Hello World")
}

func main() {
	http.HandleFunc("/", viewHandler)
	cgi.Serve(nil)
}

```

