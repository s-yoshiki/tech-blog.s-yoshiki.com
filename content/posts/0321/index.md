---
title: "画像補間とアフィン変換をCanvasで実装する【画像処理100本ノック】"
path: "/entry/321"
date: "2026-07-23 21:30"
coverImage: "../../../images/thumbnail/typescript-logo.png"
author: "s-yoshiki"
tags: ["typescript", "javascript", "canvas", "画像処理", "画像処理100本ノック"]
---

## 概要

画像の座標を変える処理として、Q.25〜27の画像補間とQ.28〜31のアフィン変換をまとめます。
どちらも出力画像の座標から元画像の参照位置を求める「逆写像」が共通の土台です。

## なぜ逆写像を使うのか

入力の各画素を変換先へ移す順写像では、丸めによって複数画素が同じ位置へ集まったり、
出力に未設定の穴ができたりします。出力の全画素を順に走査して入力座標を逆算すれば、
必ず各出力画素へ値を設定できます。

## 画像補間

逆算した入力座標は小数になるため、周囲の画素から値を決めます。

| 問題 | 参照する画素 | 特徴 |
| --- | --- | --- |
| Q.25 最近傍補間 | 最も近い1画素 | 高速だが輪郭が階段状になりやすい |
| Q.26 Bi-linear補間 | 周囲4画素 | 距離に応じた線形補間で滑らか |
| Q.27 Bi-cubic補間 | 周囲16画素 | 3次関数を使い輪郭を比較的保ちやすい |

Bi-linear補間では、座標の小数部分を重みとして左右を補間し、その結果を上下方向に補間します。

```ts
const top = (1 - dx) * p00 + dx * p10;
const bottom = (1 - dx) * p01 + dx * p11;
const value = (1 - dy) * top + dy * bottom;
```

- [Ans025.ts](https://github.com/s-yoshiki/Gasyori100knockJS/blob/master/src/questions/answers/Ans025.ts)
- [Ans026.ts](https://github.com/s-yoshiki/Gasyori100knockJS/blob/master/src/questions/answers/Ans026.ts)
- [Ans027.ts](https://github.com/s-yoshiki/Gasyori100knockJS/blob/master/src/questions/answers/Ans027.ts)

## アフィン変換

アフィン変換は2×3行列で座標を変換します。

```text
[ x' ]   [ a b tx ] [ x ]
[ y' ] = [ c d ty ] [ y ]
                    [ 1 ]
```

| 問題 | 変換 |
| --- | --- |
| Q.28 | `tx`と`ty`による平行移動 |
| Q.29 | `a`と`d`による拡大・縮小 |
| Q.30 | `sinθ`と`cosθ`による回転 |
| Q.31 | `b`または`c`によるせん断 |

回転では、画像中心を原点へ移動してから回し、最後に中心座標を戻します。左上を原点のまま
回転すると、画像がCanvasの外へ大きく移動するためです。

行列の逆変換で入力座標を求めた後、最近傍法などの補間を適用します。つまりアフィン変換は
「座標を求める部分」、画像補間は「小数座標の色を決める部分」として組み合わせられます。

- [Ans028.ts〜Ans031.ts](https://github.com/s-yoshiki/Gasyori100knockJS/tree/master/src/questions/answers)
- [Q.25〜31のデモ](https://s-yoshiki.github.io/Gasyori100knockJS/questions)

## まとめ

拡大、回転、せん断は見た目が異なりますが、逆行列で入力座標を探し、周囲の画素から値を補間する
という流れは共通です。座標変換と補間を別の処理として読むと実装を整理できます。
