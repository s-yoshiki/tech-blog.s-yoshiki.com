---
title: "順列・組み合わせ のサンプルコード   JS [permutation] [combination]"
path: "/entry/144"
date: "2019-06-30 18:23:29"
coverImage: "../../../images/thumbnail/javascript-logo.png"
author: "s-yoshiki"
tags: ["javascript","アルゴリズム","競技プログラミング","順列","組み合わせ","permutation","combination"]
---

## 概要

順列(permutation) と 組み合わせ(combination) のサンプルコードをJavaScriptで実装してみました。

## 順列 - permutation

### サンプルコード

```js
const permutation = (nums, k) => {
  let ans = [];
  if (nums.length < k) {
    return [];
  }
  if (k === 1) {
    for (let i = 0; i < nums.length; i++) {
      ans[i] = [nums[i]];
    }
  } else {
    for (let i = 0; i < nums.length; i++) {
      let parts = nums.slice(0);
      parts.splice(i, 1)[0];
      let row = permutation(parts, k - 1);
      for (let j = 0; j < row.length; j++) {
        ans.push([nums[i]].concat(row[j]));
      }
    }
  }
  return ans;
};
```

### Usage

```js
let arr = permutation(['a', 'b', 'c'], 2);
console.log(JSON.stringify(arr));
// [["a","b"],["a","c"],["b","a"],["b","c"],["c","a"],["c","b"]]
```

## 組み合わせ - combination

### サンプルコード

```js
const combination = (nums, k) => {
  let ans = [];
  if (nums.length < k) {
    return [];
  }
  if (k === 1) {
    for (let i = 0; i < nums.length; i++) {
      ans[i] = [nums[i]];
    }
  } else {
    for (let i = 0; i < nums.length - k + 1; i++) {
      let row = combination(nums.slice(i + 1), k - 1);
      for (let j = 0; j < row.length; j++) {
        ans.push([nums[i]].concat(row[j]));
      }
    }
  }
  return ans;
};
```

### Usage

```js
let arr = combination(['a', 'b', 'c'], 2);
console.log(JSON.stringify(arr));
// [["a","b"],["a","c"],["b","c"]]
```
