---
title: "Python + OpenCVのfillConvexPolyで複雑なポリゴンを描画する"
path: "/entry/78"
date: "2018-11-27 23:57:30"
coverImage: "../../../images/thumbnail/opencv-logo.png"
author: "s-yoshiki"
tags: ["python","画像処理","opencv"]
---

## 概要

Python + OpenCVのfillConvexPolyで複雑なポリゴンを描画するサンプルを紹介します。

## サンプル

以下がサンプルになります。

```py
import cv2
import numpy as np

if __name__ == "__main__" :
    im = cv2.imread('img/lenna.png')

    # 任意の描画したいポリゴンの頂点を与える
    contours = np.array(
        [
            [200, 0],
            [260, 160],
            [400, 160],
            [300, 240],
            [400, 400],
            [200, 320],
        ]
    )

    cv2.fillConvexPoly(im, points =contours, color=(255, 25, 255))
    
    cv2.imshow('result', im)
    cv2.waitKey(0)
    cv2.destroyAllWindows()
```

このように複雑な形状に対してポリゴンを描画することができます。
<img src="https://pbs.twimg.com/media/Ds2tgV-U0AAj--n.jpg" width="300px">

**↓**

<img src="https://pbs.twimg.com/media/DtBCuQXUwAIZLmu.jpg" width="300px">

## fillPolyと何が違うのか

fillConvexPolyの方がfillPolyよりも高速で動くそうです。

<blockquote>
関数 fillConvexPoly は，塗りつぶされた凸ポリゴンを描きます．この関数は，関数 fillPoly よりも高速に動作します．また，凸ポリゴンだけでなく，その輪郭が水平なスキャンラインと2回以下しか交差しない（しかし，上下の境界線は水平でも良い）ようようなモノトーンポリゴンはすべて塗りつぶすことができます．

http://opencv.jp/opencv-2svn/cpp/drawing_functions.html より引用</blockquote>

## 参考

http://opencv.jp/opencv-2svn/cpp/drawing_functions.html
