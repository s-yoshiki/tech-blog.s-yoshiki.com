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
