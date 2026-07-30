---
title: "Python+OpenCVでstitching　パノラマ画像生成をやってみた"
path: "/entry/36"
date: "2018-09-06 00:26:33"
coverImage: "../../../images/thumbnail/python-logo.png"
author: "s-yoshiki"
tags: ["python","画像処理","opencv","stiching"]
---

## 概要

PythonでOpenCVのstitchingを利用して複数の写真をつなぎ合わせる方法を紹介します。

いわゆるパノラマ画像と呼ばれるものを生成します。
OpenCVにSticherClassが用意されており、これを利用しました。

複数の画像を一度に読み込んでから計算しているので、何かしらのアプリケーションとして利用するのであれば、メモリとかを気にしなければならないと思います。
sticherクラスに関しては、こちらから

High level stitching API (Stitcher class)
https://docs.opencv.org/3.3.0/d8/d19/tutorial_stitcher.html
ググると公式のサンプルが見つかると思うので、これを参考にして実装しました。

## 出力

実行するとこのような感じになります。

<img src="https://pbs.twimg.com/media/DmVvd79VAAE2VY6.jpg" width="400px">

<img src="https://pbs.twimg.com/media/DmVvc4TUwAAAq2G.jpg" width="400px">

<img src="https://pbs.twimg.com/media/DmVvb4MVAAAnH-H.jpg" width="400px">
↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
<a href="https://pbs.twimg.com/media/DmVvHxwUYAAF7v1.jpg">

<img src="https://pbs.twimg.com/media/DmVvHxwUYAAF7v1.jpg">

</a>
できらぁっ！

## ソース

```py
import argparse
import cv2

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description='Stitch given images.')
    parser.add_argument("inputs", metavar='input', type=str, nargs='+', help='input file')
    parser.add_argument("--output", type=str, default='a.png', help='output file (default=a.png)')
    args = parser.parse_args()

    input_images = []
    for i in args.inputs:
        image = cv2.imread(i)
        if image is None:
            print(f'Error: Unable to open file "{i}".')
            exit()
        input_images.append(image)

    if len(input_images) == 1:
        cv2.imwrite(args.output, input_images[0])
    else:
        stitcher = cv2.createStitcher(True)
        stitched = stitcher.stitch(input_images)
        cv2.imwrite(args.output, stitched[1])
```

呼び出す場合のコマンド例

```
python3 main.py --output ./dst.jpg ./src1.jpg  ./src2.jpg ./src3.jpg
```

## 他の画像でも試してみた

### 生成に成功した画像

公園の広場の写真。明暗が別れている写真でも繋げることができました。

<a href="https://pbs.twimg.com/media/Dt0x_mqV4AAnshi.jpg">

<img src="https://pbs.twimg.com/media/Dt0x_mqV4AAnshi.jpg"></a>

構造物〜公園〜海の画像。

<a href="https://pbs.twimg.com/media/Dt0yDSAU8AI_e0j.jpg">

<img src="https://pbs.twimg.com/media/Dt0yDSAU8AI_e0j.jpg"></a>

<a href="https://pbs.twimg.com/media/Dt0yHz-VYAA0Xhn.jpg">

<img src="https://pbs.twimg.com/media/Dt0yHz-VYAA0Xhn.jpg"></a>
最大で7枚の画像から生成することができました。

<a href="https://pbs.twimg.com/media/Dt0yWynUwAAMHvp.jpg">

<img src="https://pbs.twimg.com/media/Dt0yWynUwAAMHvp.jpg"></a>

### 失敗した画像

以下の画像からの生成には失敗しました。被写体が海であったので特徴量が不足していたのかもしれません。
<img src="https://pbs.twimg.com/media/Dt01Q3CU8AAvfuI.jpg" width="400px">
<img src="https://pbs.twimg.com/media/Dt01RlhVsAETZM3.jpg" width="400px">
<img src="https://pbs.twimg.com/media/Dt01SZ7U8AAmUzr.jpg" width="400px">

## 環境

Python3.6X
OpenCV3.4.X
Mac OS X

## 参考

https://docs.opencv.org/3.3.0/d0/d33/tutorial_table_of_content_stitching.html
