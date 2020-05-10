---
title: "JavaScriptで幅優先探索 (bfs) を実装する"
path: "/entry/183"
date: "2020-01-13 19:08:32"
coverImage: "../../../images/thumbnail/javascript-logo.png"
author: "s-yoshiki"
tags: ["javascript","アルゴリズム","競技プログラミング","atcoder","bfs"]
---

## 概要

JavaScriptで幅優先探索 (bfs) を実装し簡単な最短経路の探索問題を解いてみました。

AtCoderの問題を参考にしています

<!-- wp:embed {"url":"https://atcoder.jp/contests/abc007/tasks/abc007_3"} -->
<figure class="wp-block-embed"><div class="wp-block-embed__wrapper">
https://atcoder.jp/contests/abc007/tasks/abc007_3
</div></figure>
<!-- /wp:embed -->

## bfsソースコード

<!-- wp:heading {"level":3} -->

### 前提

bfs 関数の定義について

引数 tableは、れぞれのマスが通行可能な空きマス(.)か通行不可能な壁マス(#) で定義されている2次元配列です。

引数 start は、探索のスタート一であり [y, x] の形式の配列で渡します。

引数 goal は、探索のスタート一であり [y, x] の形式の配列で渡します。

それぞれの引数の詳細はテストコードをご覧ください。

<!-- wp:heading {"level":3} -->

### bfs関数

```js
function bfs(table, start, goal) {
    const d = [[1, 0], [0, 1], [-1, 0], [0, -1]]
    const queue = [];
    const H = table.length
    const W = table[0].length
    const min = [...Array(H)].map(n => [...Array(W)].fill("*"));
    queue.push(start);
    min[start[0]][start[1]] = 0;
    // Queue に残りがある限りループする
    while (queue.length > 0) {
        const p = queue.shift();
        // ゴールに到着しているならbreak
        if (p[0] === goal[0] && p[1] === goal[1]) {
            break;
        }
        // 右、下、左、上の順でチェック
        for (let i = 0; i < d.length; i++) {
            const next_y = p[0] + d[i][0];
            const next_x = p[1] + d[i][1];
            // はみ出し、壁衝突を考慮する
            if (next_y < 0 || W <= next_x) continue;
            if (next_x < 0 || H <= next_y) continue;
            if (table[next_y][next_x] === '#') continue;
            if (min[next_y][next_x] !== '*') continue;
            // 新しいポジションへの移動は現地点への最短経路+1となる
            queue.push([next_y, next_x]);
            min[next_y][next_x] = min[p[0]][p[1]] + 1;
        }
    }
    return min[goal[0]][goal[1]];
}
```

<!-- wp:heading {"level":3} -->

### テストコード

```js
"use strict";
main()
function main() {
    const S = [1, 1] // start
    const G = [1, 3] // goal
    const T = [
        "########",
        "#.#....#",
        "#.###..#",
        "#......#",
        "########",
    ].map(n => n.split(""));
    const answer = bfs(T, S, G)
    console.log(answer) // 10
}
```

