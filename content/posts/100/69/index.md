---
title: "ドロネー図を描画 Python + OpenCV"
path: "/entry/69"
date: "2018-11-17 12:27:24"
coverImage: "../../../images/thumbnail/opencv-logo.png"
author: "s-yoshiki"
tags: ["python","アルゴリズム","画像処理","opencv"]
---

## 概要

タイトルにもあるようにPython + OpenCVを用いてドロネー図を描画するサンプルを紹介します。

「<a href="https://tech-blog.s-yoshiki.com/2018/10/702/">顔のランドマークを検出 Python + OpenCV + dlib を使う</a>」で紹介した、
顔の特徴点を抽出と行く行くはマージさせようと思っています。

それにしてもPythonのサンプルが思ったより少ないこと...

## 環境

- Python 3.7.0
- OpenCV 3.4

## Subdiv2D

ドロネー三角形の分割の計算にはOpenCVのSubdiv2Dクラスを利用します。

<a href="https://docs.opencv.org/3.4/df/dbf/classcv_1_1Subdiv2D.html">Subdiv2Dのドキュメント</a>

## デモ

### サンプルソース

```py
import cv2
import numpy as np
import random

def rect_contains(rect, point) :
    if point[0] < rect[0] :
        return False
    elif point[1] < rect[1] :
        return False
    elif point[0] > rect[2] :
        return False
    elif point[1] > rect[3] :
        return False
    return True

def draw_delaunay(img, subdiv, delaunay_color ) :

    triangleList = subdiv.getTriangleList()
    size = img.shape
    r = (0, 0, size[1], size[0])

    for t in triangleList :

        pt1 = (t[0], t[1])
        pt2 = (t[2], t[3])
        pt3 = (t[4], t[5])

        if rect_contains(r, pt1) and rect_contains(r, pt2) and rect_contains(r, pt3) :

            cv2.line(img, pt1, pt2, delaunay_color, 1, 16, 0)
            cv2.line(img, pt2, pt3, delaunay_color, 1, 16, 0)
            cv2.line(img, pt3, pt1, delaunay_color, 1, 16, 0)

if __name__ == "__main__" :
    IMAGE_WIDTH = 500
    IMAGE_HEIGHT = 500
    N_POINTS = 500

    img = np.zeros(
        (IMAGE_WIDTH, IMAGE_HEIGHT, 3),
        dtype=np.uint8
    )

    rect = (0, 0, IMAGE_WIDTH, IMAGE_HEIGHT)

    subdiv = cv2.Subdiv2D(rect)

    for i in range(N_POINTS):
        points = (
            random.randint(0 + 1, IMAGE_WIDTH - 1),
            random.randint(0 + 1, IMAGE_HEIGHT - 1)
        )
        subdiv.insert(points)

    draw_delaunay(img, subdiv, (255, 255, 255))

    cv2.imshow('result', img)

    k = cv2.waitKey(0)

    cv2.destroyAllWindows()

```

#### 説明

簡単に説明するとsubdiv2dクラスのインスタンスを

```py
subdiv = cv2.Subdiv2D(rect)
```

で生成しています。

初期領域を与えなければ、他のどこかしらの処理でエラーになると思います。

次に、

```py
subdiv.insert(points)
```

で、点群の座標をセットしています。

floatだとエラーとなります。

また、サンプルソースにも記述されているように、
初期探索領域の範囲外の座標を渡すと

```
cv2.error: OpenCV(3.4.3) /path/to/subdivision2d.cpp:288: error: (-211:One of arguments' values is out of range)  in function 'locate'
```

となり、これもエラーとなります。

分割の計算自体は、

```py
triangleList = subdiv.getTriangleList()
```

で行われます。

### 実行結果

#### N = 100

<img src="https://pbs.twimg.com/media/DsLEFetVsAA2pY7.jpg">

#### N = 500

<img src="https://pbs.twimg.com/media/DsLEFeuVsAALWYd.jpg">

#### N = 1000

<img src="https://pbs.twimg.com/media/DsLEFeuUcAE5erG.jpg">

#### N = 5000

<img src="https://pbs.twimg.com/media/DsLEFevUUAA_MJl.jpg">

## 参考

https://docs.opencv.org/3.4/df/dbf/classcv_1_1Subdiv2D.html

https://tech-blog.s-yoshiki.com/2018/10/702/

http://opencv.jp/opencv-2.1/c/planar_subdivisions.html