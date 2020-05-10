---
title: "Amazon Lightsailの半年間の利用料金が合計で3000円くらいで収まった。安い"
path: "/entry/35"
date: "2018-09-04 22:15:27"
coverImage: "../../../images/thumbnail/aws-logo.png"
author: "s-yoshiki"
tags: ["amazon-aws","amazon-lightsail"]
---

## 概要

Amazon Lightsailを半年利用して掛かった費用を算出してみました。
結論から言うと、小さいスペックのものを利用しているのも要因にはなりますが、
そんなにかかりませんでした。

## インスタンスの詳細

利用しているのは一番小さく安いインスタンス($5 USD)。

スペックは

```
512MB
1 vCPU
20GB SSD
1TB データ転送

```

<img src="https://media.amazonwebservices.com/blog/2016/ls_pricing_dots_2.png">
インスタンスの料金表

## 月々料金の明細

<table style="height: 340px;" width="574">
<thead>
<tr>
<td>月</td>
<td>金額</td>
<td>備考</td>
</tr>
</thead>
<tbody>
<tr>
<td>2月</td>
<td>０ JPY</td>
<td>初月無料</td>
</tr>
<tr>
<td>3月</td>
<td>579 JPY</td>
<td></td>
</tr>
<tr>
<td>4月</td>
<td>580 JPY</td>
<td></td>
</tr>
<tr>
<td>5月</td>
<td>598 JPY</td>
<td></td>
</tr>
<tr>
<td>6月</td>
<td>585 JPY</td>
<td></td>
</tr>
<tr>
<td>7月</td>
<td>608 JPY</td>
<td></td>
</tr>
<tr>
<td>8月</td>
<td>424 JPY</td>
<td>値下げ</td>
</tr>
</tbody>
</table>

合計：3376円

思っていた以上にか安かった。

ネットワーク利用料は課金制であるため、諸々含め結局は利用当初は1000円/月くらいいくんだろうな...と考えていた。
他社のVPSサービスがだいたい1500円/月くらいなので、
AWSの恩恵を受けつつ、この値段で実際に運用できるとは思っていませんでした。
個人的にとてもにコスパが良く運用できました。
加えて、8月から始まった値下げでさらに安く運用できることになりそうです。

※Con*Haを使ってた頃より圧倒的にパフォーマンスは良い気がします。