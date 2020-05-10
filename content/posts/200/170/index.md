---
title: "CentOS7 に Perl + CPAN 環境を構築"
path: "/entry/170"
date: "2019-11-17 14:43:25"
coverImage: "../../../images/thumbnail/perl-logo.jpeg"
author: "s-yoshiki"
tags: ["perl","centos7","cpan"]
---

## 概要

CentOS7  に Perl + CPAN 環境を構築する。\nPerl は CentOS7 標準 (5.16.3 ) を利用する。

## 環境

CentOS Linux release 7.7.1908 (Core)

## Perl関連rpmインストール

以下のコマンドでPerl関連のrpmをインストールします。\nこのコマンドにより、CPANも一緒にインストールされます。

```
$ yum install perl perl-core perl-local-lib
```

```
# インストールされるCPAN関連RPM
perl-CPAN-Meta-YAML-0.008-14.el7.noarch
perl-CPAN-Meta-Requirements-2.122-7.el7.noarch
perl-Parse-CPAN-Meta-1.4404-5.el7.noarch
perl-CPAN-1.9800-294.el7_6.noarch
perl-CPANPLUS-0.91.38-4.el7.noarch
perl-CPAN-Meta-2.120921-5.el7.noarch
perl-CPANPLUS-Dist-Build-0.70-3.el7.noarch
```

## CPANの起動と設定

インストールが完了したらCPANを起動します。

```
$ CPAN
```

いくつか質問が出るので任意の内容で回答します。

```
Would you like to configure as much as possible automatically? 
> yes
What approach do you want?  (Choose 'local::lib', 'sudo' or 'manual') 
> manual
```

各種設定が終わるとCPANが利用できるようになります。

```

cpan[1]> i MD5
Fetching with HTTP::Tiny:
http:&#47;&#47;cpan.mirror.cdnetworks.com/authors/01mailrc.txt.gz
Reading '/root/.cpan/sources/authors/01mailrc.txt.gz'
............................................................................DONE
Fetching with HTTP::Tiny:
http://cpan.mirror.cdnetworks.com/modules/02packages.details.txt.gz
Reading '/root/.cpan/sources/modules/02packages.details.txt.gz'
  Database was generated on Fri, 15 Nov 2019 20:55:24 GMT
  HTTP::Date not available
.............
  New CPAN.pm version (v2.27) available.
  [Currently running version is v1.9800]
  You might want to try
    install CPAN
    reload cpan
  to both upgrade CPAN.pm and run the new version without leaving
  the current session.

...............................................................DONE
Fetching with HTTP::Tiny:
http://cpan.mirror.cdnetworks.com/modules/03modlist.data.gz
Reading '/root/.cpan/sources/modules/03modlist.data.gz'
DONE
Writing /root/.cpan/Metadata
Module id = MD5
    CPAN_USERID  GAAS (Gisle Aas <gisle.aas@uib.no>)
    CPAN_VERSION 2.03
    CPAN_FILE    G/GA/GAAS/MD5-2.03.tar.gz
    INST_FILE    (not installed)

cpan[2]> exit
```

