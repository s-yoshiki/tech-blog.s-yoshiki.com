---
title: "画像の拡張子を一括置換する コマンド Linux Mac WSL"
path: "/entry/97"
date: "2019-01-09 23:46:46"
coverImage: "../../../images/thumbnail/linux-logo.png"
author: "s-yoshiki"
tags: ["linux","mac","mime-type"]
---

## 概要

画像の拡張子を一括で置換するコマンドの紹介です。
ディレクトリ内で拡張子が大文字だったり小文字だったり統一されてない状態から全て同じ拡張子に統一することができます。

## 環境

Linux (Ubuntu18.04)

Mac OS X

Windows Subsystem Linux

## 前提条件

ディレクトリに以下のような画像ファイルが置かれているとします。

```shell
$ ls ./
0.JPG 1.jpg 2.PNG 3.png
```

また、各画像ファイルのMime-Typeは以下のようになっています。
以下のコマンドは任意のディレクトリ内のすべてのしてしたファイルのMime-Typeを洗い出すコマンドです。

```shell
$ find ./ -type f | sort | xargs file
.//0.JPG: JPEG image data, JFIF standard 1.01, aspect ratio, density 72x72, segment length 16, Exif Standard: [TIFF image data, big-endian, direntries=2, orientation=upper-left], baseline, precision 8, 884x492, frames 3
.//1.jpg: JPEG image data, JFIF standard 1.01, aspect ratio, density 72x72, segment length 16, Exif Standard: [TIFF image data, big-endian, direntries=2, orientation=upper-left], baseline, precision 8, 884x492, frames 3
.//2.PNG: PNG image data, 439 x 439, 8-bit/color RGBA, non-interlaced
.//3.png: PNG image data, 439 x 220, 8-bit/color RGBA, non-interlaced
```

## コマンド

PNGをpngに変換します。

```shell
$ for filename in *.PNG; do mv $filename ${filename%.PNG}.png; done
```

2.PNGが2.pngに変わります。

```
0.JPG 1.jpg 2.png 3.png
```

JPG→jpgであれば

```shell
$ for filename in *.JPG; do mv $filename ${filename%.JPG}.jpg; done
```

```
0.jpg 1.jpg 2.png 3.png
```

異なるMime-Typeのファイルに変更を行うと...

```shell
$ for filename in *.jpg; do mv $filename ${filename%.jpg}.png; done
```

```
0.png 1.png 2.png 3.png
```

このようになりますが、

```shell
$ find ./ -type f | sort | xargs file
.//0.png: JPEG image data, JFIF standard 1.01, aspect ratio, density 72x72, segment length 16, Exif Standard: [TIFF image data, big-endian, direntries=2, orientation=upper-left], baseline, precision 8, 884x492, frames 3
.//1.png: JPEG image data, JFIF standard 1.01, aspect ratio, density 72x72, segment length 16, Exif Standard: [TIFF image data, big-endian, direntries=2, orientation=upper-left], baseline, precision 8, 884x492, frames 3
.//2.png: PNG image data, 439 x 439, 8-bit/color RGBA, non-interlaced
.//3.png: PNG image data, 439 x 220, 8-bit/color RGBA, non-interlaced
```

Mime-Typeまでは変わらないようです。