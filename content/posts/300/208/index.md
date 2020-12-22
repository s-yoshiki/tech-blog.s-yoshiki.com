---
title: "homebrew-core is a shallow clone. 対処法"
path: "/entry/208"
date: "2020-12-19"
coverImage: "../../../images/thumbnail/apple-logo.jpg"
author: "s-yoshiki"
tags: ["mac","homebrew","linux"]
---

## homebrew で homebrew-core is a shallow clone.と

homebrewでupdateしようとしたら`homebrew で homebrew-core is a shallow clone.`とエラーが表示されアップデートできなかったので対処した。

事象が発生したバージョン。

```
Homebrew 2.6.2
```

### 表示されたエラー

```sh
$ brew update 
Error: 
  homebrew-core is a shallow clone.
  homebrew-cask is a shallow clone.
To `brew update`, first run:
  git -C /usr/local/Homebrew/Library/Taps/homebrew/homebrew-core fetch --unshallow
  git -C /usr/local/Homebrew/Library/Taps/homebrew/homebrew-cask fetch --unshallow
This restriction has been made on GitHub's request because updating shallow
clones is an extremely expensive operation due to the tree layout and traffic of
Homebrew/homebrew-core and Homebrew/homebrew-cask. We don't do this for you
automatically to avoid repeatedly performing an expensive unshallow operation in
CI systems (which should instead be fixed to not use shallow clones). Sorry for
the inconvenience!
$ brew --version
Homebrew 2.6.2
Homebrew/homebrew-core (git revision 842bf; last commit 2020-12-19)
Homebrew/homebrew-cask (git revision 5f9079; last commit 2020-12-19)
```

## 対処法

表示されていたコマンドをそのまま叩きました。

```sh
git -C /usr/local/Homebrew/Library/Taps/homebrew/homebrew-core fetch --unshallow
git -C /usr/local/Homebrew/Library/Taps/homebrew/homebrew-cask fetch --unshallow
```

```sh
$ git -C /usr/local/Homebrew/Library/Taps/homebrew/homebrew-core fetch --unshallow
remote: Enumerating objects: 606188, done.
remote: Counting objects: 100% (606143/606143), done.
remote: Compressing objects: 100% (211292/211292), done.
remote: Total 597182 (delta 388575), reused 591642 (delta 383039), pack-reused 0
Receiving objects: 100% (597182/597182), 237.78 MiB | 8.40 MiB/s, done.
Resolving deltas: 100% (388575/388575), completed with 4057 local objects.
From https://github.com/Homebrew/homebrew-core
   842bf32214..f089a94551  master     -> origin/master
$ git -C /usr/local/Homebrew/Library/Taps/homebrew/homebrew-cask fetch --unshallow
remote: Enumerating objects: 374720, done.
remote: Counting objects: 100% (374697/374697), done.
remote: Compressing objects: 100% (109259/109259), done.
remote: Total 368361 (delta 262964), reused 363940 (delta 258546), pack-reused 0
Receiving objects: 100% (368361/368361), 159.96 MiB | 8.12 MiB/s, done.
Resolving deltas: 100% (262964/262964), completed with 2778 local objects.
From https://github.com/Homebrew/homebrew-cask
   5f907917bc..ab89656927  master     -> origin/master
```