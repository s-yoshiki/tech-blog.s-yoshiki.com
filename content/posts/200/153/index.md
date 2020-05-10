---
title: "SwitchHosts hostsの設定を変更するツール"
path: "/entry/153"
date: "2019-07-16 00:42:10"
coverImage: "../../../images/thumbnail/code.webp"
author: "s-yoshiki"
tags: ["mac","開発環境","ネットワーク","ツール","hosts","switchhosts"]
---
ローカル開発環境を利用して開発している際に、ローカルのIPに対してのホスト名をhostsファイルに設定するという作業をすることがあると思います。その際、環境や設定を切り替えるときにコメント化したりするのが手間になると思います。これを
解決するツールにSwitchHostsというものがありました。

これについて調べてみました。

## SwitchHosts

<a href="https://github.com/oldj/SwitchHosts">https://github.com/oldj/SwitchHosts</a>

<a href="https://images-tech-blog.s-yoshiki.com/img/2019/07/20190716002200.png"><img src="https://images-tech-blog.s-yoshiki.com/img/2019/07/20190716002200.png"></a>

Electron, React, Ant Design, CodeMirrorが使われているようです。
ソースコードのライセンスはMITライセンスです。

## インストールする

### homebrew

homebrewを使う場合は次のコマンドでインストールします。

```
brew cask install switchhosts
```

### scoop

scoopを利用する場合は次のコマンドでインストールします。

```
scoop install switchhosts
```

### それ以外

ここからパッケージを落としてきます。

<a href="https://github.com/oldj/SwitchHosts/releases">https://github.com/oldj/SwitchHosts/releases</a>

## 設定ファイル

設定ファイル次のディレクトリに格納されます。

```
~/.SwitchHosts
```

また、設定した情報などはJSONで保存されます。

## 参考

<a href="https://coliss.com/articles/build-websites/operation/work/hosts-management-app-switchhosts.html">https://coliss.com/articles/build-websites/operation/work/hosts-management-app-switchhosts.html</a>

<a href="https://www.moongift.jp/2019/07/switchhosts-hosts%e3%83%95%e3%82%a1%e3%82%a4%e3%83%ab%e3%81%ae%e8%a8%ad%e5%ae%9a%e3%82%92%e5%88%87%e3%82%8a%e6%9b%bf%e3%81%88/">https://www.moongift.jp/2019/07/switchhosts-hosts%e3%83%95%e3%82%a1%e3%82%a4%e3%83%ab%e3%81%ae%e8%a8%ad%e5%ae%9a%e3%82%92%e5%88%87%e3%82%8a%e6%9b%bf%e3%81%88/</a>