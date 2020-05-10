---
title: "【Python】Apache + WSGI + Flask でWebアプリケーション構築"
path: "/entry/9"
date: "2018-05-13 13:49:25"
coverImage: "../../../images/thumbnail/python-logo.png"
author: "s-yoshiki"
tags: ["html5","python","flask","apache"]
---

## 概要

Apache + WSGI + Flask の構成でWebサーバを構築した時のメモ

## 環境

Ubuntu 16.04
Apache 2.4*
Python 3.4

## mod_wsgiの導入

```shell
sudo apt install libapache2-mod-wsgi-py3
```

Flaskも

```shell
pip3 install flask
```

## apacheの設定

app.localhost.comで動かせるようにする。
また、/var/www/app/をDocumentRootとする。

```xml
<VirtualHost *:80>
	ServerName app.localhost.com
	ServerAdmin webmaster@localhost
	DocumentRoot /var/www/app/
	ErrorLog ${APACHE_LOG_DIR}/error.log
	CustomLog ${APACHE_LOG_DIR}/access.log combined

	WSGIDaemonProcess app2 user=www-data group=www-data threads=5
	WSGIScriptAlias / /var/www/app/project/index.wsgi
</VirtualHost>

```

## 構成

ディレクトリ構成はこんな感じにした。

```shell
$ tree -N /var/www/app2/
```

```
/var/www/app2/
`-- project
    |-- app
    |   |-- controller
    |   |   `-- index.py
    |   `-- view
    |       `-- index.html
    `-- index.wsgi

```

## ソース

project/index.wsgi

```py
import sys, os
import logging

logging.basicConfig(stream = sys.stderr)
sys.path.insert(0, os.path.abspath(os.path.dirname(__file__)))

from app.controller.main import app as application
```

/project/controller/index.py

```py
import os
from flask import Flask, render_template
from jinja2 import FileSystemLoader

app = Flask(__name__)
app.jinja_loader = FileSystemLoader(os.path.join(os.path.abspath(os.path.dirname(__file__)), '../view'))

@app.route("/", methods=['GET'])
def index():
    return render_template('index.html')

if __name__ == "__main__":
    app.run()

```

/project/controller/view/index.htmlに適当に書いて動けばOK。