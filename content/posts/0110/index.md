---
title: "TypeScriptとCanvasで画像処理100本ノックに挑戦した"
path: "/entry/110"
date: "2019-03-27 19:26:05"
coverImage: "../../../images/thumbnail/javascript-logo.png"
author: "s-yoshiki"
tags: ["typescript", "javascript", "canvas", "アルゴリズム", "画像処理", "画像処理100本ノック"]
---

## 概要

[画像処理100本ノック](https://github.com/ryoppippi/Gasyori100knock)を、TypeScriptと
Canvas APIで実装しました。画像処理ライブラリを使わず、Q.1〜Q.100をブラウザ上で実行できます。

- [Gasyori100knockJSのデモ](https://s-yoshiki.github.io/Gasyori100knockJS/)
- [s-yoshiki/Gasyori100knockJS](https://github.com/s-yoshiki/Gasyori100knockJS)

この記事は2019年に、JavaScriptとVueで40問まで実装した時点の記録として公開しました。
2026年に100問すべての実装とReact・TypeScriptへの移行が完了したため、現在の構成と
アルゴリズム別の解説記事一覧へ更新しました。

## 実装の特徴

Canvas 2D Contextの`getImageData`でRGBAの画素配列を取得し、各アルゴリズムを適用した結果を
`putImageData`でCanvasへ戻します。

```ts
const src = context.getImageData(0, 0, width, height);
const dst = context.createImageData(width, height);

for (let i = 0; i < src.data.length; i += 4) {
  // src.data[i + 0] = R
  // src.data[i + 1] = G
  // src.data[i + 2] = B
  // src.data[i + 3] = A
}

context.putImageData(dst, 0, 0);
```

OpenCVなどの画像処理ライブラリは使用していません。行列演算、ヒストグラム描画、HOG、
IoU、NMSもプロジェクト内で実装しています。

## 基礎的な画素操作

Q.1〜8は、個別の既存記事を現在のTypeScript実装へ合わせて更新しています。

| 問題 | 解説 |
| --- | --- |
| Q.1 チャンネル入れ替え | [画像のRGBチャンネルを入れ替える](/entry/112) |
| Q.2 グレースケール | [画像をグレースケールに変換する](/entry/113) |
| Q.3 二値化 | [固定閾値で画像を二値化する](/entry/114) |
| Q.4 大津の二値化 | [大津の方法で閾値を自動決定する](/entry/115) |
| Q.5 HSV変換 | [RGBとHSVを相互変換する](/entry/116) |
| Q.6 減色 | [固定した代表値へ減色する](/entry/117) |
| Q.7、Q.8 プーリング | [平均・Maxプーリングを実装する](/entry/123) |

## アルゴリズム別の解説

問題番号を10問ずつ区切るのではなく、処理の目的とアルゴリズムの系統で分類しています。

### 画素値・空間・座標を扱う処理

| 分類 | 対象 | 解説 |
| --- | --- | --- |
| 空間フィルタ | Q.9〜19 | [平滑化とエッジ検出](/entry/319) |
| ヒストグラム・濃度変換 | Q.20〜24 | [正規化、平坦化、ガンマ補正](/entry/320) |
| 補間・幾何変換 | Q.25〜31 | [画像補間とアフィン変換](/entry/321) |
| 周波数解析 | Q.32〜35 | [2次元フーリエ変換と周波数フィルタ](/entry/322) |
| 画像圧縮 | Q.36〜40 | [DCT、量子化、YCbCrとJPEG](/entry/323) |

### 形状・領域・特徴を扱う処理

| 分類 | 対象 | 解説 |
| --- | --- | --- |
| エッジから直線を検出 | Q.41〜46 | [CannyとHough変換](/entry/324) |
| 形態学的変換 | Q.47〜55 | [膨張・収縮とモルフォロジー処理](/entry/325) |
| 照合・領域分割 | Q.56〜60 | [テンプレートマッチングとラベリング](/entry/326) |
| 二値図形の骨格 | Q.61〜65 | [連結数と細線化](/entry/327) |
| 勾配特徴 | Q.66〜69 | [HOG特徴量](/entry/328) |
| 色による領域抽出 | Q.70〜72 | [HSVカラートラッキングとマスク](/entry/329) |
| マルチスケール処理 | Q.73〜76 | [画像ピラミッドと顕著性マップ](/entry/330) |
| 方向・周波数特徴 | Q.77〜80 | [ガボールフィルタ](/entry/331) |
| 特徴点 | Q.81〜83 | [Hessian・Harrisコーナー検出](/entry/332) |

### 認識・学習・検出

| 分類 | 対象 | 解説 |
| --- | --- | --- |
| 教師あり画像分類 | Q.84〜87 | [色ヒストグラムとk-NN](/entry/333) |
| 教師なし学習・減色 | Q.88〜92 | [k-meansクラスタリング](/entry/334) |
| 物体検出 | Q.93〜100 | [HOG、ニューラルネットワーク、NMSと評価](/entry/335) |

## アルゴリズムのつながり

100問は独立したサンプルの集合ではなく、前半で作った処理を後半で再利用する構成です。

```text
グレースケール・平滑化
  ├─ 勾配 → Canny → Hough直線検出
  ├─ 勾配 → HOG ─┐
  └─ 二値化 → 形態学・細線化
                  │
補間 → 画像ピラミッド
                  │
色ヒストグラム → k-NN / k-means
                  │
IoU + HOG + NN + NMS → 物体検出
```

たとえばHOGはQ.66〜69で作成し、Q.96以降の顔・非顔分類と物体検出で再利用します。
IoUは学習用クロップのラベル付け、NMS、最終評価でそれぞれ異なる役割を持ちます。

## ローカルで動かす

```sh
git clone https://github.com/s-yoshiki/Gasyori100knockJS.git
cd Gasyori100knockJS
pnpm install
pnpm dev
```

型検査、Lint、フォーマット検査、テストは次のコマンドでまとめて実行できます。

```sh
pnpm check
```

## まとめ

ブラウザで結果を確認しながら、画素操作、周波数解析、特徴抽出、分類、物体検出までを
段階的に追えるようにしました。解説記事は問題番号の区切りではなく、同じ考え方や共通処理を
持つアルゴリズム単位でまとめています。
