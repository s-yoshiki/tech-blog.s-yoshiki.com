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

<table>
<thead>
<tr>
<th>Matタイプ</th>
<th>詳細</th>
<th>データの型</th>
</tr>
</thead>
<tbody>
<tr>
<td>CV_8U</td>
<td>符号なしの8ビット整数</td>
<td>unsigned char</td>
</tr>
<tr>
<td>CV_8S</td>
<td>符号付きの8ビット整数</td>
<td>signed char</td>
</tr>
<tr>
<td>CV_16U</td>
<td>符号なしの16ビット整数</td>
<td>unsigned short</td>
</tr>
<tr>
<td>CV_16S</td>
<td>符号付きの16ビット整数</td>
<td>short</td>
</tr>
<tr>
<td>CV_32S</td>
<td>符号付き32ビット整数</td>
<td>int</td>
</tr>
<tr>
<td>CV_32F</td>
<td>浮動小数点数，32ビット</td>
<td>float</td>
</tr>
<tr>
<td>CV_64F</td>
<td>浮動小数点数， 64ビット</td>
<td>double</td>
</tr>
<tr>
<td>CV_8UC1</td>
<td>1個のCV_8U モノクロ画像の初期値</td>
<td>unsigned char [1]</td>
</tr>
<tr>
<td>CV_8UC2</td>
<td>2個の CV_8U</td>
<td>unsigned char [2]</td>
</tr>
<tr>
<td>CV_8UC3</td>
<td>3個の CV_8U カラー画像の初期値</td>
<td>unsigned char [3]</td>
</tr>
<tr>
<td>CV_8UC4</td>
<td>4個の CV_8U</td>
<td>unsigned char [4]</td>
</tr>
<tr>
<td>CV_8UC(n)</td>
<td>n個の CV_8U，</td>
<td>unsigned char [n]</td>
</tr>
<tr>
<td>CV_8SC1</td>
<td>1個のCV_8S</td>
<td>signed char [1]</td>
</tr>
<tr>
<td>CV_8SC2</td>
<td>2個のCV_8S</td>
<td>signed char [2]</td>
</tr>
<tr>
<td>CV_8SC3</td>
<td>3個のCV_8S</td>
<td>signed char [3]</td>
</tr>
<tr>
<td>CV_8SC4</td>
<td>4個のCV_8S</td>
<td>signed char [4]</td>
</tr>
<tr>
<td>CV_8SC(n)</td>
<td>n個の CV_8S，</td>
<td>signed char [n]</td>
</tr>
<tr>
<td>CV_16UC1</td>
<td>1個のCV_16U</td>
<td>unsigned short [1]</td>
</tr>
<tr>
<td>CV_16UC2</td>
<td>2個のCV_16U</td>
<td>unsigned short [2]</td>
</tr>
<tr>
<td>CV_16UC3</td>
<td>3個のCV_16U</td>
<td>unsigned short [3]</td>
</tr>
<tr>
<td>CV_16U4C</td>
<td>4個のCV_16U</td>
<td>unsigned short [4]</td>
</tr>
<tr>
<td>CV_16UC(n)</td>
<td>n個の CV_16U，</td>
<td>unsigned short [n]</td>
</tr>
<tr>
<td>CV_16SC1</td>
<td>1個のCV_16S</td>
<td>short [1]</td>
</tr>
<tr>
<td>CV_16SC2</td>
<td>2個のCV_16S</td>
<td>short [2]</td>
</tr>
<tr>
<td>CV_16SC3</td>
<td>3個のCV_16S</td>
<td>short [3]</td>
</tr>
<tr>
<td>CV_16SC4</td>
<td>4個のCV_16S</td>
<td>short [4]</td>
</tr>
<tr>
<td>CV_16SC(n)</td>
<td>n個の CV_16S，</td>
<td>short [n]</td>
</tr>
<tr>
<td>CV_32SC1</td>
<td>1個のCV_32S</td>
<td>int [1]</td>
</tr>
<tr>
<td>CV_32SC2</td>
<td>1個のCV_32S</td>
<td>int [2]</td>
</tr>
<tr>
<td>CV_32SC3</td>
<td>1個のCV_32S</td>
<td>int [3]</td>
</tr>
<tr>
<td>CV_32SC4</td>
<td>1個のCV_32S</td>
<td>int [4]</td>
</tr>
<tr>
<td>CV_32SC(n)</td>
<td>n個の CV_32S，</td>
<td>int [n]</td>
</tr>
<tr>
<td>CV_32FC1</td>
<td>1個のCV_32F</td>
<td>float [1]</td>
</tr>
<tr>
<td>CV_32FC2</td>
<td>2個のCV_32F</td>
<td>float [2]</td>
</tr>
<tr>
<td>CV_32FC3</td>
<td>3個のCV_32F</td>
<td>float [3]</td>
</tr>
<tr>
<td>CV_32FC4</td>
<td>4個のCV_32F</td>
<td>float [4]</td>
</tr>
<tr>
<td>CV_32FC(n)</td>
<td>n個のCV_32F，</td>
<td>float [n]</td>
</tr>
<tr>
<td>CV_64FC1</td>
<td>1個のCV_64F</td>
<td>double [1]</td>
</tr>
<tr>
<td>CV_64FC2</td>
<td>2個のCV_64F</td>
<td>double [2]</td>
</tr>
<tr>
<td>CV_64FC3</td>
<td>3個のCV_64F</td>
<td>double [3]</td>
</tr>
<tr>
<td>CV_64FC4</td>
<td>4個のCV_64F</td>
<td>double [4]</td>
</tr>
<tr>
<td>CV_64FC(n)</td>
<td>n個の CV_64F，</td>
<td>double [n]</td>
</tr>
</tbody>
</table>
命名規則的は、

```
CV_{ビット数}{符号有無 (U|S|F)}C{チャンネル数}

```

という感じなんでしょうか。

## 参考

<a href="http://opencv.jp/cookbook/opencv_mat.html">http://opencv.jp/cookbook/opencv_mat.html</a>

<a href="http://d.hatena.ne.jp/arche_t/20090120/1232445728">http://d.hatena.ne.jp/arche_t/20090120/1232445728</a>

<a href="https://docs.opencv.org/java/2.4.9/org/opencv/core/CvType.html">https://docs.opencv.org/java/2.4.9/org/opencv/core/CvType.html</a>