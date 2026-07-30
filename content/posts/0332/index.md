---
title: "Hessian・Harrisコーナー検出をTypeScriptで実装する【画像処理100本ノック】"
path: "/entry/332"
date: "2026-07-23 23:20"
coverImage: "../../../images/thumbnail/typescript-logo.png"
author: "s-yoshiki"
tags: ["typescript", "javascript", "canvas", "画像処理", "画像処理100本ノック"]
---

## 概要

Q.81〜83では、画像中の角や交点を特徴点として抽出します。Hessian法は二階微分、Harris法は
一次微分から作る構造テンソルを利用します。

## Hessianによるコーナー検出（Q.81）

x方向・y方向の二階微分`Ixx`、`Iyy`と混合微分`Ixy`を求め、Hessian行列の行列式を
応答値とします。

```text
det(H) = Ixx Iyy - Ixy²
```

応答が閾値を超え、近傍で局所最大となる画素をコーナーとして描画します。

## Harris検出の構造テンソル（Q.82）

Sobelフィルタから`Ix`、`Iy`を求め、`Ix²`、`Iy²`、`IxIy`をガウシアンで平滑化します。
これらは局所領域でどの方向に輝度が変化しているかを表します。

## Harris応答（Q.83）

構造テンソル`M`から次の応答を計算します。

```text
R = det(M) - k trace(M)²
```

平坦領域では2方向とも変化が小さく、エッジでは一方向だけ、コーナーでは2方向とも変化が
大きくなります。大きな正の応答から局所最大点を選びます。

- [Q.81〜83のデモ](https://s-yoshiki.github.io/Gasyori100knockJS/questions)
- [Ans081.ts](https://github.com/s-yoshiki/Gasyori100knockJS/blob/master/src/questions/answers/Ans081.ts)
- [Ans082.ts](https://github.com/s-yoshiki/Gasyori100knockJS/blob/master/src/questions/answers/Ans082.ts)
- [Ans083.ts](https://github.com/s-yoshiki/Gasyori100knockJS/blob/master/src/questions/answers/Ans083.ts)

## エッジ検出との違い

エッジは一方向の大きな変化でも反応します。コーナーはx・yの両方向に変化するため、画像の
位置合わせや追跡で再検出しやすい点として利用できます。

## 固有値で応答を理解する

構造テンソルの2つの固有値を`λ1`、`λ2`とすると、両方が小さい場所は平坦、片方だけ大きい場所は
エッジ、両方が大きい場所はコーナーです。Harris応答は固有値分解を直接行わず、行列式とトレースで
この性質を近似します。

Hessianの行列式は2階微分から得られ、明るい・暗い塊状構造への応答に使えます。微分はノイズを
増幅するため、どちらもガウシアン平滑化のスケールと微分カーネルの大きさが結果へ強く影響します。

## コーナーを点として選ぶ

応答画像を閾値処理するだけでは、1つのコーナー周辺に多数の点が残ります。近傍で最大の応答だけを
残すNMSを行い、必要なら上位N点や最小距離を指定します。画像サイズが変わる場合は固定値ではなく、
最大応答に対する比率で閾値を決めると調整しやすくなります。

検証では画像を少し平行移動・回転し、同じ物理点が再検出されるかを確認します。単に点数が多い
検出器より、位置が安定し、点が画像全体へ適度に分散する設定がマッチングや追跡に向いています。
