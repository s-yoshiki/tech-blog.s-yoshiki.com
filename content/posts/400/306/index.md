---
title: "React/Next.jsでcanvasを利用する"
path: "/entry/306"
date: "2023-02-26 15:20"
coverImage: "../../../images/thumbnail/react-logo.png"
author: "s-yoshiki"
tags: ["react", "Next.js", "typescript", "canvas"]
---

## 概要

React(及び Next.js)で canvas を扱って絵を描いた際のメモです。

## 環境

- react 18.2.0

## ソース

```tsx
import React, { useEffect, useRef } from "react";

export const Index = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    if (!canvasRef.current) {
      throw new Error("objectがnull");
    }
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      throw new Error("context取得失敗");
    }
    // 黒い長方形を描画する
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, ctx.canvas.width / 2, ctx.canvas.height / 2);
  }, []);
  return (
    <div>
      <canvas ref={canvasRef} width={600} height={450} />
    </div>
  );
};

export default Index;
```

ポイントとしては`useRef`を利用しました。

※ useRef について

> useRef は、.current プロパティが渡された引数 (initialValue) に初期化されているミュータブルな ref オブジェクトを返します。返されるオブジェクトはコンポーネントの存在期間全体にわたって存在し続けます。
> [フック API リファレンス – React](https://ja.reactjs.org/docs/hooks-reference.html#useref)
