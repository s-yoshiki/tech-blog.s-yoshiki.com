---
title: "JavaScriptでUTF-16コードを文字列に変換"
path: "/entry/280"
date: "2022-06-18 21:00"
coverImage: "../../../images/thumbnail/javascript-logo.png"
author: "s-yoshiki"
tags: ["javascript", "node.js"]
---

## 概要

JavaScriptで UTF-16 を文字列に変換するサンプルコードのメモです。

## String.fromCharCode()

実装には `String.fromCharCode()` を利用します。

正確には

> String.fromCharCode() 静的メソッドは、指定された UTF-16 コードユニットの並びから生成された文字列を返します。

と MDNのサイトでは説明されています。


## 実装

ASCIIから文字列への変換は `String.fromCharCode` を利用します。

```js
console.log(String.fromCharCode(65)) // A
```

こんなこともできます。

```js
console.log(String.fromCharCode(65, 66, 67, 68, 69, 70, 71)) // ABCDEFG
```

## サンプル

サンプルコード

```js
for (let i = 32; i <= 126; i++) 
  console.log([i, String.fromCharCode(i)])
```

結果

```
32, 
33,!
34,"
35,#
36,$
37,%
38,&
39,'
40,(
41,)
42,*
43,+
44,,
45,-
46,.
47,/
48,0
49,1
50,2
51,3
52,4
53,5
54,6
55,7
56,8
57,9
58,:
59,;
60,<
61,=
62,>
63,?
64,@
65,A
66,B
67,C
68,D
69,E
70,F
71,G
72,H
73,I
74,J
75,K
76,L
77,M
78,N
79,O
80,P
81,Q
82,R
83,S
84,T
85,U
86,V
87,W
88,X
89,Y
90,Z
91,[
92,\
93,]
94,^
95,_
96,`
97,a
98,b
99,c
100,d
101,e
102,f
103,g
104,h
105,i
106,j
107,k
108,l
109,m
110,n
111,o
112,p
113,q
114,r
115,s
116,t
117,u
118,v
119,w
120,x
121,y
122,z
123,{
124,|
125,}
126,~
```

期待通りの結果となりました。


## 余談

「JavaScriptでASCIIコードを文字列に変換」というタイトルで投稿しようと思いましたが、
調べたところ、ASCIIとUTF-16は完全な互換性が無いためこのようなタイトルにしました。

[UTF-16 - Wikipedia](https://ja.wikipedia.org/wiki/UTF-16)

> UTF-8、UTF-32と比較して、一般的な日本語が主体の文章ではUnicode符号化方式の中では最小サイズとなる。追加面の文字が含まれる場合、バイト順にソートしても符号位置順とはならない。また、UTF-8と違いASCII互換ではない。


## 参考サイト

- [String.fromCharCode() - JavaScript | MDN](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/String/fromCharCode)