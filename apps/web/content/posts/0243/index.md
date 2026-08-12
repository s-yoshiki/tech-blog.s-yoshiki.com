---
title: "CentOS8 に Python + OpenCV をインストール"
path: "/entry/243"
date: "2021-06-05 22:00"
coverImage: "../../../images/thumbnail/opencv-logo.png"
author: "s-yoshiki"
tags: ["python", "opencv", "centos"]
---

## 概要

CentOS8 で標準で提供されているパッケージで Python + OpenCV 環境を構築する方法です。

検証した環境は CentOS8.3 (Docker) です。

## インストール

まず opencv のパッケージを探します。

```shell
$ dnf search opencv
# Failed to set locale, defaulting to C.UTF-8
# Last metadata expiration check: 0:01:06 ago on Sat Jun  5 06:33:27 2021.
# ============================== Name & Summary Matched: opencv ==============================
# frei0r-plugins-opencv.x86_64 : Frei0r plugins using OpenCV
# opencv-contrib.i686 : OpenCV contributed functionality
# opencv-contrib.x86_64 : OpenCV contributed functionality
# opencv-core.i686 : OpenCV core libraries
# opencv-core.x86_64 : OpenCV core libraries
```

`opencv-core` と `opencv-contrib` をインストールします。

```shell
dnf install opencv-core opencv-contrib
```

続いてPython 3.9 をインストールします。

```shell
dnf module enable python39
dnf install python39
```

```shell
$ python3 --version
# Python 3.9.2
```

opencvのPythonラッパーをインストールします。numpyなどの関連パッケージもインストールされます。

```shell
pip3 install opencv-python
```

```shell
$ python3
>>> import cv2
>>> cv2.__version__
'4.5.2'
>>>
```

## テスト

適当にコードを作って動かしてみます。赤い画像が出力されればOKです。

```py
import cv2

# src.png を用意しておく
im = cv2.imread('src.png')
im[:, :, (0, 1)] = 0
cv2.imwrite('dst.png', im)
```
