---
title: "HOGとニューラルネットワークで物体検出を実装する【画像処理100本ノック】"
path: "/entry/335"
date: "2026-07-23 23:50"
coverImage: "../../../images/thumbnail/typescript-logo.png"
author: "s-yoshiki"
tags: ["typescript", "javascript", "画像処理", "画像処理100本ノック", "機械学習", "物体検出"]
---

## 概要

Q.93〜100では、正解矩形の評価、学習データ作成、ニューラルネットワーク、HOG、
スライディングウィンドウ、NMSを組み合わせて簡単な物体検出を完成させます。

## IoUと学習データ作成（Q.93、Q.94）

2つの矩形の重なりをIntersection over Unionで表します。

```text
IoU = 共通部分の面積 / 和集合の面積
```

Q.94では画像から60×60の領域をランダムに200個切り出します。正解矩形とのIoUが0.5以上なら
正例、それ以外を負例とし、各領域からHOG特徴量を作ります。

## ニューラルネットワーク（Q.95、Q.96）

Q.95では2つの隠れ層を持つ全結合ネットワークを作り、XORで順伝播と誤差逆伝播を確認します。
Q.96では入力をランダムクロップのHOG特徴量へ替え、顔・非顔の2クラスを学習します。

実装は入力層、隠れ層、出力層の重みとバイアスを配列で持ち、勾配降下法で更新します。
ライブラリへ隠れがちな学習処理を数値計算として追える構成です。

## スライディングウィンドウ検出（Q.97、Q.98）

3種類の大きさの窓を画像上で4画素ずつ移動し、各領域を32×32へ縮小してHOGを計算します。
Q.98では特徴量を学習済みネットワークへ入力し、スコア0.7以上の矩形を検出候補にします。

```text
画像
  ↓ 複数サイズの窓を走査
32×32へリサイズ
  ↓
HOG特徴量
  ↓
ニューラルネットワーク
  ↓
候補矩形とスコア
```

## NMSで重複候補を除く（Q.99）

候補をスコアの高い順に並べます。高スコアの矩形とIoUが0.25以上の低スコア候補を削除し、
同じ物体の周囲に重なって出た複数の枠を1つへ絞ります。

## Recall・Precision・F-score・mAP（Q.100）

正解矩形とIoU 0.5以上の検出をTrue Positiveとして評価します。

| 指標 | 見ているもの |
| --- | --- |
| Recall | 正解物体をどれだけ見つけたか |
| Precision | 検出結果のうち正解がどれだけあるか |
| F-score | RecallとPrecisionの調和平均 |
| AP / mAP | スコア閾値を変えたときのPrecision-Recall全体 |

- [Q.93〜100のデモ](https://s-yoshiki.github.io/Gasyori100knockJS/questions)
- [Ans093.ts〜Ans100.ts](https://github.com/s-yoshiki/Gasyori100knockJS/tree/master/src/questions/answers)
- [物体検出の共通処理](https://github.com/s-yoshiki/Gasyori100knockJS/blob/master/src/questions/answers/objectDetection.ts)

## まとめ

最終8問は、それまでに実装した補間、HOG、距離・評価指標などを組み合わせる総合問題です。
検出器の精度だけでなく、候補生成、重複除去、評価まで含めて物体検出の一連の流れを確認できます。
