---
title: "深さ優先探索アルゴリズムを実装 部分和問題を解く"
path: "/entry/89"
date: "2018-12-25 00:03:57"
coverImage: "../../../images/thumbnail/no-image.png"
author: "s-yoshiki"
tags: ["javascript","アルゴリズム","競技プログラミング", "atcoder"]
---

## 深さ優先探索について

深さ優先探索(depth-first search)は探索手法の一つです。
DFS、バックトラック法とも呼ばれます。
探索する木の1番目のノードから、「目的のノードに着く」もしくは「子のないノードに着く」まで、縦に伸びる探索です。
性質上、再帰関数を使うと簡単に実装できるそうです。

<a href="https://upload.wikimedia.org/wikipedia/commons/5/5d/Depth-first-tree.png">
<img src="https://upload.wikimedia.org/wikipedia/commons/5/5d/Depth-first-tree.png">
</a>

状態遷移の様子

https://ja.wikipedia.org/wiki/%E6%B7%B1%E3%81%95%E5%84%AA%E5%85%88%E6%8E%A2%E7%B4%A2

より

## 部分和問題を解いてみる

部分和問題

https://ja.wikipedia.org/wiki/%E9%83%A8%E5%88%86%E5%92%8C%E5%95%8F%E9%A1%8C

ここから問題を借りてきます。

### 問題

{1,3,7,10,13} の部分和で、和が 21 になるものは存在するか？

※ 21 = 1 + 7 + 13 となるので存在します。

### サンプルコード

```js
main()

function main(arg) {
    const k = 21
    const a = [1,3,7,10,13]

    function dfs(i, sum) {
        if (i === a.length) {
            return sum === k
        }

        if (dfs(i + 1, sum)) {
            return true
        }

        if (dfs(i + 1, sum + a[i])) {
            return true
        }

        return false
    }

    if (dfs(0, 0)) {
        console.log("Yes")
    } else{
        console.log("No")
    }
}
```

Yesと出力されます。

```js
const k = 19
const a = [2,4,6,8,10]

```

とした時は「No」と出力されました。

### デバッグ

関数dfsにデバッグを入れて動きをみてみました。

```js
main()

function main(arg) {
    const k = 21
    const a = [1,3,7,10,13]

    function dfs(i, sum) {
        console.log([i, sum])
        if (i === a.length) {
            return sum === k
        }

        if (dfs(i + 1, sum)) {
            console.log(`dfs(${i}, ${sum})`)
            return true
        }

        if (dfs(i + 1, sum + a[i])) {
            console.log(`dfs(${i} + 1, ${sum} + a[i])`)
            return true
        }

        return false
    }

    if (dfs(0, 0)) {
        console.log("Yes")
    } else{
        console.log("No")
    }
}

```

以下のように出力されました。

```js
0,0
1,0
2,0
3,0
4,0
5,0
5,13
4,10
5,10
5,23
3,7
4,7
5,7
5,20
4,17
5,17
5,30
2,3
3,3
4,3
5,3
5,16
4,13
5,13
5,26
3,10
4,10
5,10
5,23
4,20
5,20
5,33
1,1
2,1
3,1
4,1
5,1
5,14
4,11
5,11
5,24
3,8
4,8
5,8
5,21
dfs(4 + 1, 8 + a[i])
dfs(3, 8)
dfs(2 + 1, 1 + a[i])
dfs(1, 1)
dfs(0 + 1, 0 + a[i])
Yes

```

## 例題: AtCoder ABC015 C

[https://atcoder.jp/contests/abc015/tasks/abc015_3](https://atcoder.jp/contests/abc015/tasks/abc015_3)

### 解説

<iframe src="//www.slideshare.net/slideshow/embed_code/key/w9yU2aLrUCN8QE?startSlide=14" width="595" height="485" frameborder="0" marginwidth="0" marginheight="0" scrolling="no" style="border:1px solid #CCC; border-width:1px; margin-bottom:5px; max-width: 100%;" allowfullscreen> </iframe> <div style="margin-bottom:5px"> <strong> <a href="//www.slideshare.net/chokudai/abc015" title="AtCoder Beginner Contest 015 解説" target="_blank">AtCoder Beginner Contest 015 解説</a> </strong> from <strong><a href="//www.slideshare.net/chokudai" target="_blank">AtCoder Inc.</a></strong> </div>

### ソースコード

```js
"use strict"
function main(arg) {
    let tmp = arg.trim().split("\n").map(e => e.split(" ").map(Number))
    let [N,K] = tmp.shift()
    let data = tmp.slice()
    function dfs(i, sum) {
        if (i + 1 === data.length) {
            return sum === 0
        }
        for (let j = 0; j < K; j++) {
            let t = dfs(i+1, data[i+1][j] ^ sum)
            if (t) {
                return true
            }
        }
        return false
    }
    for (let i = 0; i < K; i++) {
        let ans = dfs(0, data[0][i])
        if (ans) {
            console.log('Found')
            return
        }
    }
    console.log('Nothing')
}
main(require('fs').readFileSync('/dev/stdin', 'utf8'));
```

## おまけ : 2進数を利用して

こんな方法でも実装できました。

```js
main()

function main(arg) {
    const k = 21
    const a = [1,3,7,10,13]

    var ans = false

    for (var i = 0; i < 32; i++) {
        //2進数作成
        var bin = i.toString(2)
        for (var j = bin.length; j < a.length; j++) {
            bin += "0"
        }
        bin = bin.split("").map(e => Number(e))
        var sum = 0
        for (var j = 0; j < bin.length; j++) {
            if (bin[j] === 1) {
                sum += a[j]
            }
        }
        if (sum === k) {
            ans = true
            break
        }
    }

    if (ans) {
        console.log("Yes")
    } else {
        console.log("No")
    }
}

```
