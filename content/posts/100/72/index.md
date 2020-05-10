---
title: "iOSかAndroidかの判定 UserAgentを利用する 【JavaScript】"
path: "/entry/72"
date: "2018-11-18 17:10:26"
coverImage: "../../../images/thumbnail/javascript-logo.png"
author: "s-yoshiki"
tags: ["javascript"]
---

## 概要

JSでiOSかAndroidかの判定を行う方法。

## サンプルソース

```js
document.getElementById("result").innerHTML = getUserType()

function getUserType() {
	var ua = [
		"iPod",
		"iPad",
		"iPhone",
		"Android"
	]
	
	for (var i = 0; i < ua.length; i++) {
		if (navigator.userAgent.indexOf(ua[i]) > 0) {
			return ua[i]
		}
	}
	return "Other"
}

```

やっていることは、UAに特定の文字列が含まれているかどうかという方法で端末を判断しています。

```js
navigator.userAgent.indexOf("iPhone")
```

で返り値が1以上であれば、iPhoneということにしています。
※以下のUAのサンプルのようにiPodの場合もUAにiPhoneが含まれているので文字列検索時に考慮する必要があります。

### UAのサンプル

```shell
#iPhone
Mozilla/5.0 (iPhone; CPU iPhone OS 6_0 like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) Version/6.0 Mobile/10A403 Safari/8536.25

#iPod
Mozilla/5.0 (iPod; CPU iPhone OS 5_0_1 like Mac OS X) AppleWebKit/534.46 (KHTML, like Gecko) Version/5.1 Mobile/9A405 Safari/7534.48.3

#iPad
Mozilla/5.0 (iPad; U; CPU OS 4_2 like Mac OS X; zh-cn) AppleWebKit/533.17.9 (KHTML, like Gecko) Mobile/8C134

# Android (Nexus7)
Mozilla/5.0 (Linux; Android 4.1.1; Nexus 7 Build/JRO03S) AppleWebKit/535.19 (KHTML, like Gecko) Chrome/18.0.1025.166 Safari/535.19

```

## 参考

https://qiita.com/s-yoshiki/items/9cab4e73dd677442469a

https://qiita.com/tonkotsuboy_com/items/5c703c601de6179e3ce1