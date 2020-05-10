---
title: "macOSにOpenCV4をインストール"
path: "/entry/159"
date: "2019-08-16 19:45:15"
coverImage: "../../../images/thumbnail/opencv-logo.png"
author: "s-yoshiki"
tags: ["opencv","mac","opencv4"]
---
macOS (MacBook Pro 2018 13 inchi)にhomebrewを用いてOpenCVをインストールする方法。

## パッケージの情報

まず、brew search と brew info でOpenCVのバージョンを検索します。

```
$ brew search opencv
==> Formulae
opencv                                                             opencv@2                                                           opencv@3

$ brew info opencv
opencv: stable 4.1.0 (bottled)
Open source computer vision library
https://opencv.org/
Not installed
From: https://github.com/Homebrew/homebrew-core/blob/master/Formula/opencv.rb
==> Dependencies
Build: cmake ✘, pkg-config ✔
Required: eigen ✘, ffmpeg ✘, glog ✘, harfbuzz ✔, jpeg ✘, libpng ✔, libtiff ✘, numpy ✘, openexr ✘, python ✘, python@2 ✘, tbb ✘
==> Analytics
install: 11,071 (30 days), 37,038 (90 days), 194,837 (365 days)
install_on_request: 10,328 (30 days), 34,395 (90 days), 180,099 (365 days)
build_error: 0 (30 days)
```

opencv が 4系、opencv@3 が 3系、opencv@2 が 2系となるようです。

## インストール

次のコマンドでOpenCV4をインストールします。

```
$ brew install opencv
```

依存関係があるものも一緒にインストールされます。昔は色々なビルドオプションがあったような気がしましたが、なくなったようで、簡単にインストールできました。

## 試す with Python3

```
$ python3
Python 3.7.4 (default, Jul  9 2019, 18:13:23) 
[Clang 10.0.1 (clang-1001.0.46.4)] on darwin
Type "help", "copyright", "credits" or "license" for more information.
>>> import cv2
>>>
```

問題なくimportできました。
これはPython3で使利用する例ですが、Python2で利用する場合は次のコマンドを実行する必要があります。

```
mkdir -p /Users/${USERNAME}/Library/Python/2.7/lib/python/site-packages
echo 'import sys; sys.path.insert(1, "/usr/local/lib/python3.7/site-packages")' >> /Users/${USERNAME}/Library/Python/2.7/lib/python/site-packages/homebrew.pth
```
