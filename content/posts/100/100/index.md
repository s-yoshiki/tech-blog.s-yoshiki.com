---
title: "JPG画像を圧縮する OpenCV + Python"
path: "/entry/100"
date: "2019-01-20 19:30:34"
coverImage: "../../../images/thumbnail/opencv-logo.png"
author: "s-yoshiki"
tags: ["python","画像処理","opencv"]
---

## 概要

ブログなどにアップする画像を比較的簡単に圧縮する方法がないか探していたところ、
PythonとOpenCVで簡単に実装出来そうでした。

そこで、Python + OpenCVで画像を圧縮する方法を紹介します。

## 環境

- OpenCV 3.4.3
- Python 3.7.1
- Mac OS X

## 説明

実装では imencode と imdecode を組み合わせて、画像の圧縮を実現しています。
imencode と imdecode については以下のページで詳しく解説されています。

<a href="http://opencv.jp/opencv-2svn/cpp/reading_and_writing_images_and_video.html">http://opencv.jp/opencv-2svn/cpp/reading_and_writing_images_and_video.html</a>

## ソース

<a href="https://gist.github.com/s-yoshiki/467598f1d41f0d0611275eccc898f9c8">https://gist.github.com/s-yoshiki/467598f1d41f0d0611275eccc898f9c8</a>

```py
#!/usr/local/bin/python3

import cv2
import numpy as np
import argparse

def compress_image(src, quality=50):
    """
    param src 画像データ
    param quality 画像クオリティ 1~100 
    return 圧縮された画像
    """

    channel = 1

    (result, encimg) = cv2.imencode('.jpg', src, [
        int(cv2.IMWRITE_JPEG_QUALITY),
        quality
    ])

    if result == False:
        return (1)

    dst = cv2.imdecode(encimg, channel)
    return (0, dst)

if __name__ == "__main__" :
    parser = argparse.ArgumentParser(description='jpg encoder given images.')
    parser.add_argument("input", type=str, help='input file')
    parser.add_argument("-q", type=str, default='50', help='quality (0 to 100)')
    parser.add_argument("-o", type=str, default='a.jpg', help='output file (default=a.png)')

    args = parser.parse_args()

    img = cv2.imread(args.input)

    (status, img) = compress_image(img, int(args.q))

    if status == 0:
        cv2.imwrite(args.o, img)
        exit(0)
    else:
        print('could not encode image!')
        exit(1)
```

### セットアップ

上記のソースコード compress_image.py を適当なディレクトリに配置します。

以下のようにコマンドを叩くことで、圧縮された画像を生成することができます。

```shell
python3 compress_image.py ./path/to/src.jpg -o ./path/to/dst.jpg -q 80
```

この場合、 ./path/to/src.jpgを読み込み、80%のクオリティで ./path/to/dst.jpgに出力します。

## 実験

元画像サイズを527KBとした時

<table>
<tbody>
<tr>
<td>クオリティ</td>
<td>サイズ</td>
</tr>
<tr>
<td>100</td>
<td>516KB</td>
</tr>
<tr>
<td>80</td>
<td>499KB</td>
</tr>
<tr>
<td>50</td>
<td>360KB</td>
</tr>
<tr>
<td>30</td>
<td>321KB</td>
</tr>
<tr>
<td>10</td>
<td>194KB</td>
</tr>
<tr>
<td>1</td>
<td>89KB</td>
</tr>
</tbody>
</table>
といった具合になりました。
クオリティが30以下は正直使い物になるような品質ではありませんが、50くらいなら十分使えそうです。
