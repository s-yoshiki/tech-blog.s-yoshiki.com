---
title: "[Next.js] Warning: Assign arrow function to a variable before exporting as module default の対応"
path: "/entry/259"
date: "2022-02-13 19:00"
coverImage: "../../../images/thumbnail/next-logo.png"
author: "s-yoshiki"
tags: ["javascript","typescript","next.js","react","vercel"]
---

## 概要

> ./pages/items/converters/date.tsx
> 32:1 Warning: Assign arrow function to a variable before exporting as module default import/no-anonymous-default-export
> 32:16 Error: Component definition is missing display name react/display-name

と出力されたので調査と修正を行なった際のメモです。

## 対応

`export default`周りのコーディングの問題によって引き起こされているようでした。

次のように変更したらエラーが解消されました。

**変更前**

```tsx
export default () => {
  return <>Hello</>;
};
```

**変更後**

```tsx
const Index = () => {
  return <>Hello</>;
};

export default Index;
```

## 原因の説明

stack overflow とかその辺を調べてたら解決策が出ていました。

[cannot export const arrow function](https://stackoverflow.com/questions/34676984/cannot-export-const-arrow-function)

> You're trying to export a default and declare a variable at the same time, which is invalid syntax.
>
> Consider the following, since we know that you can declare multiple variables using only one instance of the keyword, var a, b, c; the > export definition wouldn't make sense at all.
>
> ```js
> export default var a, b, c;
> ```
>
> What would that mean? What would get exported?
>
> Furthermore, using the export default syntax already creates a variable called default that needs to contain a value or reference.
>
> Export the variable instead if you want to make it a constant.
>
> ```js
> const Todo = () => {};
> ```
>
> export default Todo;
> There is a thread about this on ESDiscuss
