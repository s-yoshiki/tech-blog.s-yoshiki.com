---
title: "Python + OpenCVで顕著性 (saliecy) マップを実装"
path: "/entry/86"
date: "2018-12-14 00:36:39"
coverImage: "../../../images/thumbnail/python-logo.png"
author: "s-yoshiki"
tags: ["python","画像処理","opencv"]
---

## 概要

Python + OpenCV の saliencymap で顕著性マップを表示するサンプルを紹介します。

## 顕著性マップ

ざっくり言うと、
<blockquote>
人が視覚的注意の仕組からすると、画像・映像の中でどの部分を注視しやすいかを画像情報から計算するもの</blockquote>
です。
<a href="https://news.mynavi.jp/article/computer_vision-44/">自動作成を行うために用いられることの多い3つの重要度マップ手法 | https://news.mynavi.jp/article/computer_vision-44/</a>

## OpenCVに用意されている3つの顕著性検出アルゴリズム

<a href="https://docs.opencv.org/3.4.2/saliency.png">
<img src="https://docs.opencv.org/3.4.2/saliency.png">
OpenCVに用意されているsaliency機能　※ 画像をクリックで拡大</a>

OpenCVのsaliencyモジュールには3つの形態があります。
<ul>
 	<li>Static saliency : 画像から検出するもの</li>
 	<li>Motion saliency : 動画のフレームに依存するもの</li>
 	<li>Objectness</li>
</ul>
<a href="https://docs.opencv.org/3.4.2/d8/d65/group__saliency.html">https://docs.opencv.org/3.4.2/d8/d65/group__saliency.html</a>

## Static saliency

上記で触れた「Static saliency」うちの以下の２つを紹介します。

```
cv2.saliency.StaticSaliencySpectralResidual_create()
```

```
cv2.saliency.StaticSaliencyFineGrained_create()
```

### StaticSaliencySpectralResidual_create()

```py
import cv2

if __name__ == "__main__" :
    image = cv2.imread("./img/src.jpg")
    
    saliency = cv2.saliency.StaticSaliencySpectralResidual_create()
    (success, saliencyMap) = saliency.computeSaliency(image)
    saliencyMap = (saliencyMap * 255).astype("uint8")

    if success is True:
        cv2.imshow("Image", image)
        cv2.imshow("Output", saliencyMap)
        cv2.waitKey(0)

```

<img src="https://pbs.twimg.com/media/DuTndZgUwAAXdxt.jpg">

### StaticSaliencyFineGrained_create()

```py
import cv2

if __name__ == "__main__" :
    image = cv2.imread("./img/src.jpg")

    saliency = cv2.saliency.StaticSaliencyFineGrained_create()
    (success, saliencyMap) = saliency.computeSaliency(image)

    if success is True:
        cv2.imshow("Image", image)
        cv2.imshow("Output", saliencyMap)
        cv2.waitKey(0)

```

<img src="https://pbs.twimg.com/media/DuTn2_1V4AcyspK.jpg">

## 注意点

上記の実装はOpenCV3.4系のものです。3.3系の不具合があるようです。

## 参考

https://www.pyimagesearch.com/2018/07/16/opencv-saliency-detection/

https://docs.opencv.org/3.4.2/d8/d65/group__saliency.html