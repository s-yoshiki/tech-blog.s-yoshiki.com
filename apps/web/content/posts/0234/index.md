---
title: "php-fpmのステータスページを表示 Apache & htaccess"
path: "/entry/234"
date: "2021-03-24 01:00"
coverImage: "../../../images/thumbnail/php-logo.jpg"
author: "s-yoshiki"
tags: ["php","php-fpm","apache","centos"]
---

## 概要

Apache環境で php-fpm のステータスページを htaccess で制御して表示する方法を試した際の記録です。

### 当時試した環境

- CentOS 8
- php7.4
- Apache 2.4

### php-fpm の pm.status_path について

`pm.status_path` はFPMの情報をみるためのパスを設定する項目です。

[https://www.php.net/manual/ja/install.fpm.configuration.php#pm.status-path](https://www.php.net/manual/ja/install.fpm.configuration.php#pm.status-path)

## php-fpmのconfの設定

php-fpm には次のパラメータを設定します。他のパラメータについては省略します。

- `listen`: FastCGIの待ち受け先。TCPとUNIXドメインソケットのどちらも利用できる
- pm.status_path: ステータスを表示するページ。このドキュメントでは phpfpm_status として進める

```conf
listen = 9000
pm.status_path = /fpm_status
# 他のパラメータについては省略
```

現在のPHP公式マニュアルには、UNIXドメインソケットを使うApache設定例も掲載されています。Apacheとphp-fpmが同じホストにあるなら、ソケットを使う構成も選択肢です。

```apache
<LocationMatch "^/fpm_status$">
    Require local
    ProxyPass "unix:/run/php-fpm/www.sock|fcgi://localhost/fpm_status"
</LocationMatch>
```

ソケットの実際のパスはOSやパッケージ設定によって異なります。

## .htaccess の設定

.htaccess は 次のように設定します。

```xml
<FilesMatch fpm_status$>
    SetHandler "proxy:fcgi://127.0.0.1:9000/fpm_status"

    # 必要に応じてIP制限などを実施
    Require all denied
    Require ip X.X.X.X
</FilesMatch>
```

Apache 2.4では `Order` / `Allow` / `Deny` ではなく `Require` を使います。ステータスページにはリクエストURLやワーカー数など運用情報が含まれるため、公開せず、`Require local`、管理ネットワークのCIDR、VPNなどで必ず制限してください。`.htaccess` を使えるかは `AllowOverride` の設定にも依存するため、管理権限があるならVirtualHost側へ記述する方が設定箇所を明確にできます。

## アクセスしてみる

[http://localhost/fpm_status](http://localhost/fpm_status) でアクセスすることができます。 (※ localhost の部分は任意のホスト名に変更する。)

パラメータを次のようにすることでjsonで受け取れます。

http://localhost/fpm_status?json&full

レスポンス例

```json
{
  "pool": "www",
  "process manager": "dynamic",
  "start time": 1616509794,
  "start since": 2852,
  "accepted conn": 59,
  "listen queue": 0,
  "max listen queue": 0,
  "listen queue len": 128,
  "idle processes": 1,
  "active processes": 1,
  "total processes": 2,
  "max active processes": 1,
  "max children reached": 0,
  "slow requests": 0,
  "processes": [
    {
      "pid": 35,
      "state": "Idle",
      "start time": 1616509794,
      "start since": 2852,
      "requests": 29,
      "request duration": 532,
      "request method": "GET",
      "request uri": "/fpm_status?json&full",
      "content length": 0,
      "user": "-",
      "script": "-",
      "last request cpu": 0.00,
      "last request memory": 2097152
    },
    {
      "pid": 36,
      "state": "Running",
      "start time": 1616509794,
      "start since": 2852,
      "requests": 30,
      "request duration": 517,
      "request method": "GET",
      "request uri": "/fpm_status?json&full",
      "content length": 0,
      "user": "-",
      "script": "-",
      "last request cpu": 0.00,
      "last request memory": 0
    }
  ]
}
```

現在は `html`、`json`、`openmetrics`、`xml` の出力形式も選択できます。

```text
/fpm_status
/fpm_status?full
/fpm_status?json
/fpm_status?openmetrics
```

監視では特に次の値を確認します。

| 項目 | 見方 |
| :--- | :--- |
| `listen queue` | 0より大きい状態が続くと、処理待ちが発生している可能性 |
| `max children reached` | 増加していると `pm.max_children` の上限到達 |
| `active processes` | 実行中のワーカー数 |
| `idle processes` | 待機中のワーカー数 |
| `slow requests` | slowlog対象になったリクエスト数 |

生存確認だけが目的なら `ping.path` を設定できます。また `pm.status_listen` を使うと、メインプールが長時間処理で詰まった場合にも独立したステータス用リスナーから状態を取得できます。

## 参考にしたサイト

[PHP Manual: FPM Status Page](https://www.php.net/manual/en/fpm.status.php)

[PHP Manual: FPM Configuration](https://www.php.net/manual/en/install.fpm.configuration.php)

[Apache HTTP Server 2.4: Access Control](https://httpd.apache.org/docs/2.4/howto/access.html)

[Real-time PHP-FPM Status](https://gist.github.com/Jiab77/a9428050ab9bb3f17c5e33343da94fd8)

[[Apache] php-fpmのステータスページを表示する](https://www.84kure.com/blog/2019/02/13/apache-php-fpm%E3%81%AE%E3%82%B9%E3%83%86%E3%83%BC%E3%82%BF%E3%82%B9%E3%83%9A%E3%83%BC%E3%82%B8%E3%82%92%E8%A1%A8%E7%A4%BA%E3%81%99%E3%82%8B/)

[Set up php-fpm status page with php7 and apache](https://stackoverflow.com/questions/39144450/set-up-php-fpm-status-page-with-php7-and-apache)
