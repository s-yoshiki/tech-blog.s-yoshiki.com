---
title: "Pythonでソケット通信を実装しメッセージの送受信を行う"
path: "/entry/246"
date: "2021-07-25 23:00"
coverImage: "../../../images/thumbnail/python-logo.png"
author: "s-yoshiki"
tags: ["python","linux","ネットワーク"]
---

## 概要

Pythonでソケット通信を実現する方法です。

## ソース

### server.py

サーバ側のソースです。

```python
import socket

# ソケットオブジェクトの生成
# socket.AF_INET: IPv4の利用
# socket.SOCK_STREAM: TCPの利用
sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
# ホスト&ポートを指定
sock.bind(('127.0.0.1', 1235))
# キューの数を指定する
sock.listen(1)

while True:
    # 接続の受信を開始
    conn, address = sock.accept()
    try:
        # リクエスト内容を取得
        req = conn.recv(1024).decode()
        print(f"Connection: {address}")
        print(f"Request: {req}")
        # レスポンスする
        conn.send(bytes(f"response {address}", 'utf-8'))
    except:
        print("error")
    finally:
        # 接続を終了
        conn.close()
```

### client.py

クライアント側のソースです。

```python
import socket

def request(req):
    # ソケットオブジェクトの生成
    # socket.AF_INET: IPv4の利用
    # socket.SOCK_STREAM: TCPの利用
    sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    # ホスト&ポートを指定
    sock.connect(('127.0.0.1', 1235))
    # 接続オプション
    # socket.SOL_SOCKET: ソケット通信
    # socket.SO_REUSEADDR: 待ち状態中のポートが存在してもbindする
    sock.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
    # リクエストする
    sock.send(req.encode("UTF-8"))
    # レスポンス内容を取得
    msg = sock.recv(1024)
    print(msg.decode("utf-8"))

if __name__ == '__main__':
    for i in range(10):
        request(f"request: {i}")

```

## 動かしてみる

```
python server.py
```

でサーバ側を起動し

```
python client.py
```

でリクエストを実施します。

サーバ側では次のように表示されます。

```
Connection: ('127.0.0.1', 51263)
Request: request: 0
Connection: ('127.0.0.1', 51264)
Request: request: 1
Connection: ('127.0.0.1', 51265)
Request: request: 2
Connection: ('127.0.0.1', 51266)
Request: request: 3
Connection: ('127.0.0.1', 51267)
Request: request: 4
Connection: ('127.0.0.1', 51268)
Request: request: 5
Connection: ('127.0.0.1', 51269)
Request: request: 6
Connection: ('127.0.0.1', 51270)
Request: request: 7
Connection: ('127.0.0.1', 51271)
Request: request: 8
Connection: ('127.0.0.1', 51272)
Request: request: 9
```

クライアント側では次のように表示されます。

```
response ('127.0.0.1', 51263)
response ('127.0.0.1', 51264)
response ('127.0.0.1', 51265)
response ('127.0.0.1', 51266)
response ('127.0.0.1', 51267)
response ('127.0.0.1', 51268)
response ('127.0.0.1', 51269)
response ('127.0.0.1', 51270)
response ('127.0.0.1', 51271)
response ('127.0.0.1', 51272)
```


## 参考

[【Python3】Pythonでソケット通信を試してみた](https://dev.classmethod.jp/articles/python3socketserver/)

[ソケット](http://research.nii.ac.jp/~ichiro/syspro98/socket.html)

[TCPを使う(サーバ、SO_REUSEADDR)](https://www.geekpage.jp/programming/winsock/so_reuseaddr.php)

[知ったかぶりをしていたソケット通信の基礎を改めて学んでみる](https://qiita.com/megadreams14/items/32a3eed4661e55419e1c)

[Python ソケット通信のサンプル](https://itsakura.com/python-socket)