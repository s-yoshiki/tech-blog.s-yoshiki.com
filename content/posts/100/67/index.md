---
title: "ffmpegでmovからmp4に変換する。macOS Mojava"
path: "/entry/67"
date: "2018-11-10 16:40:00"
coverImage: "../../../images/thumbnail/apple-logo.jpg"
author: "s-yoshiki"
tags: ["mac","ffmpeg"]
---

## 概要

ffmepgを用いてMacやiPhoneで撮影した.movファイル形式の動画を.mp4に変換する。

## 環境

macOS Mojava
ffmpeg 4.1

## ffmpegの準備

homebrewでffmpegをインストールします。

```shell
brew install ffmpeg --with-fdk-aac --with-ffplay --with-freetype \
  --with-libass --with-libquvi --with-libvorbis --with-libvpx --with-opus \
  --with-x265 --with-webp

```

brew install ffmpegでも問題ないとは思いますが、色々なオプションがあるのでとりあえずつけときました。

<a href="https://brew.sh/index_ja">(homebrewについて)</a>

## 変換実行

以下のコマンドを叩きます。

```shell
ffmpeg -i sample.mov -pix_fmt yuv420p sample.mp4
```

すると以下のようなメッセージが出てきます。

```
ffmpeg version 4.1 Copyright (c) 2000-2018 the FFmpeg developers
  built with Apple LLVM version 10.0.0 (clang-1000.11.45.5)
  configuration: --prefix=/usr/local/Cellar/ffmpeg/4.1 --enable-shared --enable-pthreads --enable-version3 --enable-hardcoded-tables --enable-avresample --cc=clang --host-cflags= --host-ldflags= --enable-ffplay --enable-gpl --enable-libmp3lame --enable-libopus --enable-libsnappy --enable-libtheora --enable-libvorbis --enable-libvpx --enable-libx264 --enable-libx265 --enable-libxvid --enable-lzma --enable-libfdk-aac --enable-libopencore-amrnb --enable-libopencore-amrwb --enable-opencl --enable-videotoolbox --enable-libopenjpeg --disable-decoder=jpeg2000 --extra-cflags=-I/usr/local/Cellar/openjpeg/2.3.0/include/openjpeg-2.3 --enable-nonfree
  libavutil      56. 22.100 / 56. 22.100
  libavcodec     58. 35.100 / 58. 35.100
  libavformat    58. 20.100 / 58. 20.100
  libavdevice    58.  5.100 / 58.  5.100
  libavfilter     7. 40.101 /  7. 40.101
  libavresample   4.  0.  0 /  4.  0.  0
  libswscale      5.  3.100 /  5.  3.100
  libswresample   3.  3.100 /  3.  3.100
  libpostproc    55.  3.100 / 55.  3.100
Input #0, mov,mp4,m4a,3gp,3g2,mj2, from 'sample.mov':
  Metadata:
    major_brand     : qt
    minor_version   : 0
    compatible_brands: qt
    creation_time   : 2018-02-06T03:17:01.000000Z
    com.apple.quicktime.make: Apple
    com.apple.quicktime.model: MacBookPro12,1
    com.apple.quicktime.software: Mac OS X 10.13.3 (17D47)
    com.apple.quicktime.creationdate: 2018-02-06T12:16:59+0900
  Duration: 00:00:44.42, start: 0.000000, bitrate: 2432 kb/s
    Stream #0:0(und): Video: h264 (Main) (avc1 / 0x31637661), yuv420p(tv, bt709), 576x1024 [SAR 1:1 DAR 9:16], 2263 kb/s, 59.80 fps, 60 tbr, 6k tbn, 12k tbc (default)
    Metadata:
      creation_time   : 2018-02-06T03:17:01.000000Z
      handler_name    : Core Media Video
      encoder         : H.264
    Stream #0:1(und): Audio: aac (LC) (mp4a / 0x6134706D), 44100 Hz, stereo, fltp, 2 kb/s (default)
    Metadata:
      creation_time   : 2018-02-06T03:17:01.000000Z
      handler_name    : Core Media Audio
Stream mapping:
  Stream #0:0 -> #0:0 (h264 (native) -> h264 (libx264))
  Stream #0:1 -> #0:1 (aac (native) -> aac (native))
Press [q] to stop, [?] for help
[libx264 @ 0x7ff9b98b0200] using SAR=1/1
[libx264 @ 0x7ff9b98b0200] using cpu capabilities: MMX2 SSE2Fast SSSE3 SSE4.2 AVX FMA3 BMI2 AVX2
[libx264 @ 0x7ff9b98b0200] profile High, level 3.2
[libx264 @ 0x7ff9b98b0200] 264 - core 152 r2854 e9a5903 - H.264/MPEG-4 AVC codec - Copyleft 2003-2017 - http://www.videolan.org/x264.html - options: cabac=1 ref=3 deblock=1:0:0analyse=0x3:0x113 me=hex subme=7 psy=1 psy_rd=1.00:0.00 mixed_ref=1 me_range=16 chroma_me=1 trellis=1 8x8dct=1 cqm=0 deadzone=21,11 fast_pskip=1 chroma_qp_offset=-2 threads=6 lookahead_threads=1 sliced_threads=0 nr=0 decimate=1 interlaced=0 bluray_compat=0 constrained_intra=0 bframes=3 b_pyramid=2 b_adapt=1 b_bias=0 direct=1 weightb=1 open_gop=0 weightp=2 keyint=250 keyint_min=25 scenecut=40 intra_refresh=0 rc_lookahead=40 rc=crf mbtree=1 crf=23.0 qcomp=0.60 qpmin=0 qpmax=69 qpstep=4 ip_ratio=1.40 aq=1:1.00
Output #0, mp4, to 'sample.mp4':
  Metadata:
    major_brand     : qt
    minor_version   : 0
    compatible_brands: qt
    com.apple.quicktime.creationdate: 2018-02-06T12:16:59+0900
    com.apple.quicktime.make: Apple
    com.apple.quicktime.model: MacBookPro12,1
    com.apple.quicktime.software: Mac OS X 10.13.3 (17D47)
    encoder         : Lavf58.20.100
    Stream #0:0(und): Video: h264 (libx264) (avc1 / 0x31637661), yuv420p(progressive), 576x1024 [SAR 1:1 DAR 9:16], q=-1--1, 60 fps, 15360 tbn, 60 tbc (default)
    Metadata:
      creation_time   : 2018-02-06T03:17:01.000000Z
      handler_name    : Core Media Video
      encoder         : Lavc58.35.100 libx264
    Side data:
      cpb: bitrate max/min/avg: 0/0/0 buffer size: 0 vbv_delay: -1
    Stream #0:1(und): Audio: aac (LC) (mp4a / 0x6134706D), 44100 Hz, stereo, fltp, 128 kb/s (default)
    Metadata:
      creation_time   : 2018-02-06T03:17:01.000000Z
      handler_name    : Core Media Audio
      encoder         : Lavc58.35.100 aac
frame= 2665 fps=186 q=-1.0 Lsize=    1885kB time=00:00:44.42 bitrate= 347.6kbits/s dup=8 drop=0 speed= 3.1x
video:1802kB audio:11kB subtitle:0kB other streams:0kB global headers:0kB muxing overhead: 3.941604%
[libx264 @ 0x7ff9b98b0200] frame I:13    Avg QP:17.69  size: 36922
[libx264 @ 0x7ff9b98b0200] frame P:846   Avg QP:20.81  size:  1347
[libx264 @ 0x7ff9b98b0200] frame B:1806  Avg QP:23.53  size:   125
[libx264 @ 0x7ff9b98b0200] consecutive B-frames:  6.7%  7.4%  4.6% 81.4%
[libx264 @ 0x7ff9b98b0200] mb I  I16..4: 45.0% 30.7% 24.3%
[libx264 @ 0x7ff9b98b0200] mb P  I16..4:  1.4%  1.8%  0.5%  P16..4:  3.6%  0.6%  0.3%  0.0%  0.0%    skip:91.6%
[libx264 @ 0x7ff9b98b0200] mb B  I16..4:  0.2%  0.1%  0.0%  B16..8:  2.7%  0.1%  0.0%  direct: 0.1%  skip:96.8%  L0:51.3% L1:47.6% BI: 1.1%
[libx264 @ 0x7ff9b98b0200] 8x8 transform intra:41.5% inter:58.0%
[libx264 @ 0x7ff9b98b0200] coded y,uvDC,uvAC intra: 17.3% 28.1% 21.7% inter: 0.3% 0.7% 0.3%
[libx264 @ 0x7ff9b98b0200] i16 v,h,dc,p: 57% 37%  4%  3%
[libx264 @ 0x7ff9b98b0200] i8 v,h,dc,ddl,ddr,vr,hd,vl,hu: 24% 13% 54%  2%  1%  1%  1%  1%  2%
[libx264 @ 0x7ff9b98b0200] i4 v,h,dc,ddl,ddr,vr,hd,vl,hu: 30% 23% 19%  5%  5%  5%  5%  4%  5%
[libx264 @ 0x7ff9b98b0200] i8c dc,h,v,p: 54% 26% 17%  3%
[libx264 @ 0x7ff9b98b0200] Weighted P-Frames: Y:1.9% UV:1.8%
[libx264 @ 0x7ff9b98b0200] ref P L0: 77.9%  7.1% 11.2%  3.8%  0.0%
[libx264 @ 0x7ff9b98b0200] ref B L0: 72.7% 25.3%  2.0%
[libx264 @ 0x7ff9b98b0200] ref B L1: 97.4%  2.6%
[libx264 @ 0x7ff9b98b0200] kb/s:332.30
[aac @ 0x7ff9b98b0e00] Qavg: 65536.000

```

無事sample.mp4が生成されました。

WindowsおよびMac(quicktime)で再生できることが確認できました。

また、
13MBの動画が2MBに圧縮されました。

めでたし。