---
title: "顔のランドマークを検出 Python + OpenCV + dlib を使う"
path: "/entry/65"
date: "2018-10-28 23:38:58"
coverImage: "../../../images/thumbnail/opencv-logo.png"
author: "s-yoshiki"
tags: ["python","機械学習","画像処理","opencv"]
---

## 概要

Python + OpenCV + dlib で顔のランドマークの検出を行う。
具体的には、「dlib」と呼ばれるオープンソースの機械学習ライブラリで顔の輪郭および各器官の検出を行う。

## セットアップ & 環境

### OS

macOS 10.13
(まぁ、Linuxで下記と同様にセットアップした場合でも動くと思います。)

### OpenCV

「homebrew」か「ソースビルド」かなんかで導入します。

今回のデモで 3.4.3を利用しています。

また、顔形状の推定の初期探索領域をdlibに渡すのに、Haar-likeを利用しました。

### 顔形状の推定モデル

学習済みモデルはこちらを利用しました。
<a href="http://dlib.net/files/shape_predictor_68_face_landmarks.dat.bz2">http://dlib.net/files/shape_predictor_68_face_landmarks.dat.bz2</a>

ダウンロードしたらbz2を解凍して任意のディレクトリに配置します。

## デモ

### ソース

```py
#!/usr/bin/python
import cv2
import dlib
import numpy

PREDICTOR_PATH = "./data/shape_predictor_68_face_landmarks.dat"
predictor = dlib.shape_predictor(PREDICTOR_PATH)

cascade_path='/usr/local/opt/opencv/share/OpenCV/haarcascades/haarcascade_frontalface_default.xml'
cascade = cv2.CascadeClassifier(cascade_path)

def get_landmarks(im):
    rects = cascade.detectMultiScale(im, 1.3,5)
    (x,y,w,h) = rects[0]
    rect = dlib.rectangle(x,y,x+w,y+h)
    return numpy.matrix([[p.x, p.y] for p in predictor(im, rect).parts()])

def annotate_landmarks(im, landmarks):
    im = im.copy()
    for idx, point in enumerate(landmarks):
        pos = (point[0, 0], point[0, 1])
        cv2.putText(im, str(idx), pos,
            fontFace=cv2.FONT_HERSHEY_SCRIPT_SIMPLEX,
            fontScale=0.4,
            color=(255, 0, 0))
        cv2.circle(im, pos, 2, color=(255, 255, 0))
    return im

if __name__ == "__main__" :
    im=cv2.imread('img/lenna.png')
    cv2.imshow('result',annotate_landmarks(im,get_landmarks(im)))
    cv2.waitKey(0)
    cv2.destroyAllWindows()

```

### 検出結果

<img src="https://pbs.twimg.com/media/DqmhQ5mVYAAEHWW.jpg">

このように各特徴点にポイントを描画できているのが確認できます。

### おまけ 〜 カメラから読み込み - リアルタイムで検出

以下のソースはリアルタイムでカメラから取り込んだ画像を処理するというもの。

```py
if __name__ == "__main__" :
    cap = cv2.VideoCapture(0)

    while(True):
        try:
            ret, im = cap.read()

            height = round(im.shape[0] / 2)
            width = round(im.shape[1] / 2)

            im = cv2.resize(im, (width, height))
            im = annotate_landmarks(im, get_landmarks(im))
            
        except:
            print('error!')

        cv2.imshow('Result',im)

        if cv2.waitKey(0) & 0xFF == ord('q'):
            break

    cap.release()
    cv2.destroyAllWindows()

```

## 他

OpenCV 3.X〜には顔のランドマーク検出に関するクラスがいくつか用意されているようである。
しかしPythonを用いた具体的な実装例が無く困惑。。

もう少し話が出てくるまで待ってみようかな。

https://docs.opencv.org/3.4.3/d4/d48/namespacecv_1_1face.html

## 参考

https://stackoverflow.com/questions/37210655/opencv-detect-face-landmarks-ear-chin-ear-line

https://cppx.hatenablog.com/entry/2017/12/25/231121