---
title: "CentOS6(Docker)でyum update できなくなった"
path: "/entry/240"
date: "2021-05-20 23:59"
coverImage: "../../../images/thumbnail/centos-logo.png"
author: "s-yoshiki"
tags: ["docker", "centos"]
---

## 概要

CentOS6.10 で yum update しようとしたところエラーが出てアップデートできなかったので対応した時の記録

## エラー内容

以下のようなエラーが出ました。

```
yum update
Loaded plugins: fastestmirror, ovl
Setting up Update Process
YumRepo Error: All mirror URLs are not using ftp, http[s] or file.
 Eg. Invalid release/repo/arch combination/
removing mirrorlist with no valid mirrors: /var/cache/yum/x86_64/6/base/mirrorlist.txt
Error: Cannot retrieve repository metadata (repomd.xml) for repository: base. Please verify its path and try again
```

## 対応

`/etc/yum.repos.d/CentOS-Base.repo` を以下のように変更したところ解決しました。

```ini
[base]
name=CentOS-6.10 - Base
baseurl=https://vault.centos.org/centos/6.10/os/$basearch/
gpgcheck=1
gpgkey=file:///etc/pki/rpm-gpg/RPM-GPG-KEY-CentOS-6

#released updates
[updates]
name=CentOS-6.10 - Updates
baseurl=https://vault.centos.org/centos/6.10/updates/$basearch/
gpgcheck=1
gpgkey=file:///etc/pki/rpm-gpg/RPM-GPG-KEY-CentOS-6

[extras]
name=CentOS-6.10 - Extras
baseurl=https://vault.centos.org/centos/6.10/extras/$basearch/
gpgcheck=1
gpgkey=file:///etc/pki/rpm-gpg/RPM-GPG-KEY-CentOS-6

[centosplus]
name=CentOS-6.10 - Plus
baseurl=https://vault.centos.org/centos/6.10/centosplus/$basearch/
gpgcheck=1
enabled=0
gpgkey=file:///etc/pki/rpm-gpg/RPM-GPG-KEY-CentOS-6

[contrib]
name=CentOS-6.10 - Contrib
baseurl=https://vault.centos.org/centos/6.10/contrib/$basearch/
gpgcheck=1
enabled=1
gpgkey=file:///etc/pki/rpm-gpg/RPM-GPG-KEY-CentOS-6
```
