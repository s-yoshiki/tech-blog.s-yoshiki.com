---
title: "【Python】3分でOCR環境を立ち上げ Google Colaboratory"
path: "/entry/22"
date: "2018-07-23 23:55:51"
coverImage: "../../../images/thumbnail/python-logo.png"
author: "s-yoshiki"
tags: ["python","機械学習","可視化","画像処理","opencv"]
---

## 概要

3分くらいでOCRができる環境を立ち上ます。
Google Colaboratoryを使います。もちろんpython。

## Google Colaboratory

Jupyter Notebook環境を無償で利用できる上、Google Driveとの連携が可能。
同様な機能を提供するサービスにAzure Notebooksがありますが、
apt・pipコマンドが叩ける点、GPUが用意されている点などから
Google Colaboratoryを使っています。

## pyocr

PyOcrを動かせる環境を作ります。
tesseractと関連パッケージ + 日本語の特徴量を導入します。
ノートブックでこのコマンドを叩きます。

```
!apt install tesseract-ocr libtesseract-dev tesseract-ocr-jpn
!pip install pyocr

```

これでだけで環境が完成

## ファイルアップロード

ローカルの画像をノートブックにアップロードします。

```py
from google.colab import files
uploaded = files.upload()

```

このコマンドを叩くとファイルアップロードのダイアログが出現します。
アップロードした画像は適当な名前をつけて保存します。

## OCR実行

OCR自体は

```py
import pyocr
import pyocr.builders
from PIL import Image

img = Image.open('string_sample.png')
txt = tool.image_to_string(
  img,
  lang="eng+jpn",
  builder=pyocr.builders.TextBuilder(tesseract_layout=6)
)

```

これで実行可能です。
もう少し精度を上げるためにOpenCVで最適化していきます。

```py
import sys
import pyocr
import pyocr.builders
import cv2
from PIL import Image
import matplotlib.pyplot as plt

tools = pyocr.get_available_tools()

im = cv2.imread('text.png')
im_gray = cv2.cvtColor(im, cv2.COLOR_BGR2GRAY)
im_blur = cv2.GaussianBlur(im_gray, (5, 5), 0)
th1 = cv2.adaptiveThreshold(im_blur, 255, cv2.ADAPTIVE_THRESH_GAUSSIAN_C, cv2.THRESH_BINARY, 11, 2)

txt = tool.image_to_string(
  Image.fromarray(im_gray),
  lang = 'eng+jpn'
)

print(txt)

```

## 参考

<a href="https://qiita.com/it__ssei/items/fd804dcb10997566593b">https://qiita.com/it__ssei/items/fd804dcb10997566593b</a>