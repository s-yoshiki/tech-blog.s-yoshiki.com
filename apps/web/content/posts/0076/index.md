---
title: "OpenCVのMatのタイプ一覧表"
path: "/entry/76"
date: "2018-11-25 22:08:45"
coverImage: "../../../images/thumbnail/opencv-logo.png"
author: "s-yoshiki"
tags: ["画像処理","opencv"]
---

## 概要

OpenCVを触っているとよく出てくる `CV_8UC3` や `CV_8UC1` が何を表すのかを、深度・符号・チャンネル数に分けて整理します。

先に結論を書くと、`CV_8UC3` は「符号なし8ビット整数（`uint8`）を3チャンネル持つMat」です。一般的なカラー画像はこの型になります。

## 型名の読み方

```text
CV_<1チャンネルあたりの深度><値の種類>C<チャンネル数>
```

- `8` / `16` / `32` / `64`: 1チャンネルあたりのビット数
- `U`: unsigned（符号なし整数）
- `S`: signed（符号付き整数）
- `F`: floating point（浮動小数点数）
- `C3`: 3チャンネル。`C1` は省略可能

たとえば `CV_32FC2` は、32ビット浮動小数点数を2チャンネル持つ型です。

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
| CV_16UC4   | 4個のCV_16U                     | unsigned short [4] |
| CV_16UC(n) | n個の CV_16U，                  | unsigned short [n] |
| CV_16SC1   | 1個のCV_16S                     | short [1]          |
| CV_16SC2   | 2個のCV_16S                     | short [2]          |
| CV_16SC3   | 3個のCV_16S                     | short [3]          |
| CV_16SC4   | 4個のCV_16S                     | short [4]          |
| CV_16SC(n) | n個の CV_16S，                  | short [n]          |
| CV_32SC1   | 1個のCV_32S                     | int [1]            |
| CV_32SC2   | 2個のCV_32S                     | int [2]            |
| CV_32SC3   | 3個のCV_32S                     | int [3]            |
| CV_32SC4   | 4個のCV_32S                     | int [4]            |
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

命名規則は、

```
CV_{ビット数}{符号有無 (U|S|F)}C{チャンネル数}
```

です。

## よく使う型

| 用途 | 代表的な型 | 補足 |
| :--- | :--- | :--- |
| グレースケール画像 | `CV_8UC1` | 0〜255の1チャンネル |
| BGRカラー画像 | `CV_8UC3` | OpenCVの標準的な並びはRGBではなくBGR |
| BGRA画像 | `CV_8UC4` | 4番目のチャンネルはアルファ |
| ラベル画像・インデックス | `CV_32SC1` | 負数を含む整数を保持できる |
| 座標・勾配・機械学習入力 | `CV_32FC1` など | 小数を扱う処理でよく使う |
| 高精度な計算結果 | `CV_64FC1` など | メモリ使用量は大きい |

## C++で型を確認する

`Mat::type()` は深度とチャンネル数を組み合わせた値を返します。深度とチャンネル数を分けて確認したい場合は `depth()` と `channels()` を使います。

```cpp
cv::Mat image = cv::imread("image.png");

std::cout << image.type() << std::endl;
std::cout << image.depth() << std::endl;
std::cout << image.channels() << std::endl;

if (image.type() == CV_8UC3) {
    std::cout << "8-bit BGR image" << std::endl;
}
```

## Python / NumPyとの対応

Python版OpenCVでは型名を直接指定するより、NumPyの `dtype` と配列形状で判断することが多いです。

```python
import cv2

image = cv2.imread("image.png")
print(image.dtype)  # uint8
print(image.shape)  # (height, width, 3)
```

`dtype == uint8` かつ末尾の次元が3なら、C++でいう `CV_8UC3` に相当します。型変換では、単に `astype()` するだけでなく、値域が変わる場合にスケール変換が必要かも確認してください。

## 注意点

- チャンネル数は色空間を保証しません。`CV_8UC3` がBGRかHSVかは、型だけでは区別できません。
- `convertTo()` は深度を変更できますが、チャンネル数は変更しません。
- 画像のバイト数は概ね `rows × cols × elemSize()` で確認できます。
- `CV_16F` と `CV_16FCn` は比較的新しい半精度浮動小数点型です。利用可否はOpenCVのバージョンと処理APIを確認してください。

## 参考

<a href="http://opencv.jp/cookbook/opencv_mat.html">http://opencv.jp/cookbook/opencv_mat.html</a>

<a href="http://d.hatena.ne.jp/arche_t/20090120/1232445728">http://d.hatena.ne.jp/arche_t/20090120/1232445728</a>

- [OpenCV 4.x: cv::Mat Class Reference](https://docs.opencv.org/4.x/d3/d63/classcv_1_1Mat.html)
- [OpenCV 4.x: DataType Class Reference](https://docs.opencv.org/4.x/d0/d3a/classcv_1_1DataType.html)
