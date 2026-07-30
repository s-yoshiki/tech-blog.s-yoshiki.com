---
title: "OpenCVのMatのタイプ一覧表"
path: "/entry/76"
date: "2018-11-25 22:08:45"
coverImage: "../../../images/thumbnail/opencv-logo.png"
author: "s-yoshiki"
tags: ["画像処理","opencv"]
---

## 概要

OpenCVを触っているとよく出てくるCV_8UC3とかCV_8UC1。
どんなものがあるか一覧にしました。

## 型一覧表

| Matタイプ  | 詳細                            | データの型         |
| :--------- | :------------------------------ | :----------------- |
| CV_8U      | 符号なしの8ビット整数           | unsigned char      |
| CV_8S      | 符号付きの8ビット整数           | signed char        |
| CV_16U     | 符号なしの16ビット整数          | unsigned short     |
| CV_16S     | 符号付きの16ビット整数          | short              |
| CV_32S     | 符号付き32ビット整数            | int                |
| CV_32F     | 浮動小数点数，32ビット          | float              |
| CV_64F     | 浮動小数点数， 64ビット         | double             |
| CV_8UC1    | 1個のCV_8U モノクロ画像の初期値 | unsigned char [1]  |
| CV_8UC2    | 2個の CV_8U                     | unsigned char [2]  |
| CV_8UC3    | 3個の CV_8U カラー画像の初期値  | unsigned char [3]  |
| CV_8UC4    | 4個の CV_8U                     | unsigned char [4]  |
| CV_8UC(n)  | n個の CV_8U，                   | unsigned char [n]  |
| CV_8SC1    | 1個のCV_8S                      | signed char [1]    |
| CV_8SC2    | 2個のCV_8S                      | signed char [2]    |
| CV_8SC3    | 3個のCV_8S                      | signed char [3]    |
| CV_8SC4    | 4個のCV_8S                      | signed char [4]    |
| CV_8SC(n)  | n個の CV_8S，                   | signed char [n]    |
| CV_16UC1   | 1個のCV_16U                     | unsigned short [1] |
| CV_16UC2   | 2個のCV_16U                     | unsigned short [2] |
| CV_16UC3   | 3個のCV_16U                     | unsigned short [3] |
| CV_16U4C   | 4個のCV_16U                     | unsigned short [4] |
| CV_16UC(n) | n個の CV_16U，                  | unsigned short [n] |
| CV_16SC1   | 1個のCV_16S                     | short [1]          |
| CV_16SC2   | 2個のCV_16S                     | short [2]          |
| CV_16SC3   | 3個のCV_16S                     | short [3]          |
| CV_16SC4   | 4個のCV_16S                     | short [4]          |
| CV_16SC(n) | n個の CV_16S，                  | short [n]          |
| CV_32SC1   | 1個のCV_32S                     | int [1]            |
| CV_32SC2   | 1個のCV_32S                     | int [2]            |
| CV_32SC3   | 1個のCV_32S                     | int [3]            |
| CV_32SC4   | 1個のCV_32S                     | int [4]            |
| CV_32SC(n) | n個の CV_32S，                  | int [n]            |
| CV_32FC1   | 1個のCV_32F                     | float [1]          |
| CV_32FC2   | 2個のCV_32F                     | float [2]          |
| CV_32FC3   | 3個のCV_32F                     | float [3]          |
| CV_32FC4   | 4個のCV_32F                     | float [4]          |
| CV_32FC(n) | n個のCV_32F，                   | float [n]          |
| CV_64FC1   | 1個のCV_64F                     | double [1]         |
| CV_64FC2   | 2個のCV_64F                     | double [2]         |
| CV_64FC3   | 3個のCV_64F                     | double [3]         |
| CV_64FC4   | 4個のCV_64F                     | double [4]         |
| CV_64FC(n) | n個の CV_64F，                  | double [n]         |

命名規則的は、

```
CV_{ビット数}{符号有無 (U|S|F)}C{チャンネル数}
```

という感じなんでしょうか。

## 参考

<a href="http://opencv.jp/cookbook/opencv_mat.html">http://opencv.jp/cookbook/opencv_mat.html</a>

<a href="http://d.hatena.ne.jp/arche_t/20090120/1232445728">http://d.hatena.ne.jp/arche_t/20090120/1232445728</a>

<a href="https://docs.opencv.org/java/2.4.9/org/opencv/core/CvType.html">https://docs.opencv.org/java/2.4.9/org/opencv/core/CvType.html</a>
