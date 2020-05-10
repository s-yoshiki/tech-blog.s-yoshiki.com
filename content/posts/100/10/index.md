---
title: "【Python】Django2.0 + Python3 + ApacheでWebアプリケーション構築"
path: "/entry/10"
date: "2018-05-19 17:01:15"
coverImage: "../../../images/thumbnail/python-logo.png"
author: "s-yoshiki"
tags: ["python","django","apache"]
---

## 概要

Django + Python3 + Apache + wsgi でWebサーバを構築した。
VirtualHost & デーモンモードの条件下で
<a href="https://docs.djangoproject.com/en/2.0/">公式</a>通りに作っていたらいくつかつまづくポイントがあったので、メモ。

## 環境

Django2.0
Python3.4
Apache2.4

## インストール

pipでDjangoとmod_wsgiを入れる

```shell
pip3 install mod-wsgi
pip3 install django
```

## Djangoプロジェクト作成

そして<a href="https://docs.djangoproject.com/ja/2.0/intro/tutorial01/">公式の手順</a>通りに作成し、
以下のような構成を作った。

```
/var/www/app1/
app
|-- app
|   |-- __init__.py
|   |-- settings.py
|   |-- urls.py
|   `-- wsgi.py
|-- db.sqlite3
|-- manage.py
`-- polls
    |-- admin.py
    |-- apps.py
    |-- __init__.py
    |-- migrations
    |   `-- __init__.py
    |-- models.py
    |-- tests.py
    |-- urls.py
    `-- views.py

```

ここで app/url.pyは

```py
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('', include('polls.urls')),
    path('polls/', include('polls.urls')),
    path('admin/', admin.site.urls),
]
```

polls/url.pyは

```py
from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
]
```

polls/views.pyは

```py
from django.shortcuts import render
from django.http import HttpResponse

def index(request):
    return HttpResponse("Hello, world. You're at the polls index.")

```

そして、許可するドメインをapp/settings.pyの28行目あたりに追加する。今回はapp1.localhost.comとして設定している。

```py
ALLOWED_HOSTS = [
    'app1.localhost.com'
]
```

## Apacheの設定

Python3を使いたいのでwsgi.confを次のように書き換える。

```xml
LoadModule mod_wsgi /usr/local/lib/python3.4/dist-packages/mod_wsgi/server/mod_wsgi-py34.cpython-34m.so
```

今回の場合、静的コンテンツをプロジェクト内ディレクトリに置きたくなかったので、/var/www/app1/indexに置くことにした。

WSGIDaemonProcessはpython-path=/var/www/app1/appを指定しないと、appモジュールが存在しないとエラーを吐き続けていたので記述した。これが分からず1時間くらい苦労した。

WSGIPythonPathは(デーモンモードの場合)必要がなかった。というかVirtualHost内に記述するとエラーとなった。

WSGIScriptAliasに関しては、もともとXXXX.wsgiしか許可できないようになっているっぽいので、プロジェクトファイル内のwsgi.pyをRequire all grantedとしている。

```xml
<VirtualHost *:80>
    ServerName app1.localhost.com
    ServerAdmin webmaster@localhost
    DocumentRoot /var/www/app1/index
    ErrorLog ${APACHE_LOG_DIR}/error.log
    CustomLog ${APACHE_LOG_DIR}/access.log combined

    WSGIScriptReloading On
    WSGIDaemonProcess app1.localhost.com user=www-data group=www-data threads=5 python-path=/var/www/app1/app
    WSGIProcessGroup app1.localhost.com
    WSGIScriptAlias / /var/www/app1/app/app/wsgi.py
    #WSGIPythonPath /var/www/app1/app/

    <Directory /var/www/app1/app/app/>
        <Files wsgi.py>
                Require all granted
        </Files>
    </Directory>

    Alias /static/ /var/www/app1/index/
    <Directory /var/www/app1/index>
        Require all granted
    </Directory>
</VirtualHost>
```

これで,http://app1.localhost.com/ http://app1.localhost.com/polls http://app1.localhost.com/admin に参照できるようになる。
また、/var/www/app1/index/に置いたファイルに対して、http://app1.localhost.com/static/****で参照できるようになる。
めでたし。

## 参考

<a href="https://torina.top/detail/289/">https://torina.top/detail/289/</a>

<a href="https://www.yoheim.net/blog.php?q=20170206">https://www.yoheim.net/blog.php?q=20170206</a>

<a href="https://qiita.com/roy29fuku/items/578de62fbdd65f8ffbaa">https://qiita.com/roy29fuku/items/578de62fbdd65f8ffbaa</a>