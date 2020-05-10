---
title: "OpenCVのチャンネルエラー対処: (-215:Assertion failed) (mtype == CV_8U || mtype == CV_8S) && _mask.sameSize(*psrc1) in function 'binary_op'"
path: "/entry/75"
date: "2018-11-25 22:16:31"
coverImage: "../../../images/thumbnail/opencv-logo.png"
author: "s-yoshiki"
tags: ["python","画像処理","opencv"]
---

## 概要

Python + OpenCVのスクリプトを書いていたところ、タイトルにあるようなエラーが出現しました。
結果的にはnumpyの配列のサイズが異なるのが原因だったようです。

## 詳細

下記のソースはPythonで読み込んだ画像にマスクをかける処理です。

```py
import cv2
import numpy as np

if __name__ == "__main__" :
    im = cv2.imread('img/lenna.png')

    height = im.shape[0]
    width = im.shape[1]

    im = cv2.resize(im, (width, height))

    contours = np.array(
        [
            [50,0],
            [65,40],
            [100, 40],
            [75, 60],
            [100,100],
            [50,80],
        ]
    )

    mask = np.tile(np.uint8([0,0,0]), (width, height, 1))
    cv2.fillConvexPoly(mask, points =contours, color=(255, 255, 255))

    img_masked = cv2.bitwise_and(im, im, mask=mask )

    cv2.imshow('result', img_masked)
    cv2.waitKey(0)
    cv2.destroyAllWindows()

```

これを実行した時のエラーがこちら、

```
Traceback (most recent call last):
  File "main4.py", line 46, in <module>
    img_masked = cv2.bitwise_and(im, im, mask=mask )
cv2.error: OpenCV(3.4.3) /tmp/opencv-20181001-41572-id0soo/opencv-3.4.3/modules/core/src/arithm.cpp:241: error: (-215:Assertion failed) (mtype == CV_8U || mtype == CV_8S) && _mask.sameSize(*psrc1) in function 'binary_op'

```

エラーコードから、チャンネル数の違いによりエラーが発生しているのではないかと推測しました。

そして色々試した結果、
結果的には、mask画像が3チャンネルになっていたことが原因だとわかりました。
CV_8UもしくはCV_8Sで渡す必要があるようです。

なのでmask作成の箇所を以下のように書き換え、無事解決することができました。

```py
mask = np.tile(np.uint8(0), (width, height, 1))
```

Mat型一覧について

https://tech-blog.s-yoshiki.com/2018/11/787/

## 参考

https://stackoverflow.com/questions/44019023/opencv-python-error-error-215-mtype-cv-8u-mtype-cv-8s-mask-s

https://teratail.com/questions/88341