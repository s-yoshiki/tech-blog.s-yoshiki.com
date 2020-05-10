---
title: "Python+OpenCVで任意の画像領域:ROIのみに処理 マスク画像を使って"
path: "/entry/77"
date: "2018-11-25 23:51:53"
coverImage: "../../../images/thumbnail/opencv-logo.png"
author: "s-yoshiki"
tags: ["python","画像処理","opencv"]
---

## 概要

Python + OpenCVで任意の画像領域のみに処理を加えるサンプルを1つ紹介します。

## やりたいこと(やったこと)

<img src="https://pbs.twimg.com/media/Ds2tgV-U0AAj--n.jpg" width="200px">
↓↓↓↓↓↓↓↓↓↓
<img src="https://pbs.twimg.com/media/Ds2tgVYUUAIV92D.jpg" width="200px">

こんな感じで、任意の画像領域(矩形でなくてもよい)のみをグレースケール、2値化、フィルタリングといったことを行いました。

## 実装方法

マスク画像を使って論理積を算出し処理対象ピクセルか判定するように実装しました。

<img src="https://pbs.twimg.com/media/Ds2tgV-U0AAj--n.jpg" width="150px">
↓↓↓↓↓↓↓↓↓↓
<img src="https://pbs.twimg.com/media/Ds2tgVNU8AEToUh.jpg" width="150px">
×
<img src="https://pbs.twimg.com/media/Ds2tgVNUcAA0xl0.jpg" width="150px">
↓↓↓↓↓↓↓↓↓↓
<img src="https://pbs.twimg.com/media/Ds2tgVYUUAIV92D.jpg" width="150px">

そしてソースがこちら。

```py
import cv2
import numpy as np

if __name__ == "__main__" :
    im = cv2.imread('img/lenna.png')

    height = im.shape[0]
    width = im.shape[1]

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

    mask = np.tile(np.uint8(0), (width, height, 1))
    cv2.fillConvexPoly(mask, points =contours, color=(255, 255, 255))

    gray = cv2.cvtColor(im, cv2.COLOR_BGR2GRAY)

    for i in range(mask.shape[0]) :
        for j in range(mask.shape[1]) :
            if mask[i][j] != 0 :
                im[i][j] = gray[i][j]

    
    cv2.imshow('result', im)
    cv2.waitKey(0)
    cv2.destroyAllWindows()

```

OpenCVではマスク画像を扱うためにbitwise_and(bitwise_and ...)が用意されていますが、ちょっと使い勝手が悪く好き勝手実装できるようにピクセル操作を行う方法を利用しました。

せっかくnumpyを利用しているのでforなんか使わず、便利なメソッドを叩きたいところでしたが苦戦したため、妥協しループ処理を行うようにしました。よりスマートな書き換えがあるなら誰か教えてほしい...

bitwise_andを使う場合は下記に書き換えます。

```py
    # 略
    mask = np.tile(np.uint8(0), (width, height, 1))
    cv2.fillConvexPoly(mask, points =contours, color=(255, 255, 255))
    img_masked = cv2.bitwise_and(im, im, mask=mask )

    # 略

```
