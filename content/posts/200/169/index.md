---
title: "CentOS7 に Perl環境を構築する"
path: "/entry/169"
date: "2019-11-16 16:58:02"
coverImage: "../../../images/thumbnail/perl-logo.jpeg"
author: "s-yoshiki"
tags: ["centos","perl","centos7","cpan"]
---

## 概要

Docker上のCentOS7 に Perl および 重要なrpm類を尾インストールしPerl環境を構築する。

## 環境

CentOS7\n\nPerl 5.16.3 (CentOS標準)

## Perlインストール

パッケージを最新に更新する。

```
$ yum update
```

perl perl-core perl-local-libのrpmのインストールを行います。

```
$ yum install perl perl-core perl-local-lib
```

完了すると以下のモジュールがインストールされます

```
========================================================================================================================================================================================================
 Package                                                      Arch                                   Version                                              Repository                               Size
========================================================================================================================================================================================================
Installing:
 perl                                                         x86_64                                 4:5.16.3-294.el7_6                                   base                                    8.0 M
 perl-core                                                    x86_64                                 5.16.3-294.el7_6                                     base                                     43 k
 perl-local-lib                                               noarch                                 1.008010-4.el7                                       base                                     64 k
Installing for dependencies:
 gdbm-devel                                                   x86_64                                 1.10-8.el7                                           base                                     47 k
 glibc-devel                                                  x86_64                                 2.17-292.el7                                         base                                    1.1 M
 glibc-headers                                                x86_64                                 2.17-292.el7                                         base                                    687 k
 groff-base                                                   x86_64                                 1.22.2-8.el7                                         base                                    942 k
 kernel-headers                                               x86_64                                 3.10.0-1062.4.3.el7                                  updates                                 8.7 M
 libdb-devel                                                  x86_64                                 5.3.21-25.el7                                        base                                     39 k
 perl-Archive-Extract                                         noarch                                 1:0.68-3.el7                                         base                                     28 k
 perl-Archive-Tar                                             noarch                                 1.92-3.el7                                           base                                     73 k
 perl-B-Lint                                                  noarch                                 1.17-3.el7                                           base                                     20 k
 perl-CGI                                                     noarch                                 3.63-4.el7                                           base                                    250 k
 perl-CPAN                                                    noarch                                 1.9800-294.el7_6                                     base                                    293 k
 perl-CPAN-Meta                                               noarch                                 2.120921-5.el7                                       base                                    113 k
 perl-CPAN-Meta-Requirements                                  noarch                                 2.122-7.el7                                          base                                     24 k
 perl-CPAN-Meta-YAML                                          noarch                                 0.008-14.el7                                         base                                     24 k
 perl-CPANPLUS                                                noarch                                 0.91.38-4.el7                                        base                                    307 k
 perl-CPANPLUS-Dist-Build                                     noarch                                 0.70-3.el7                                           base                                     28 k
 perl-Carp                                                    noarch                                 1.26-244.el7                                         base                                     19 k
 perl-Compress-Raw-Bzip2                                      x86_64                                 2.061-3.el7                                          base                                     32 k
 perl-Compress-Raw-Zlib                                       x86_64                                 1:2.061-4.el7                                        base                                     57 k
 perl-DBD-SQLite                                              x86_64                                 1.39-3.el7                                           base                                    1.3 M
 perl-DBI                                                     x86_64                                 1.627-4.el7                                          base                                    802 k
 perl-DBIx-Simple                                             noarch                                 1.35-7.el7                                           base                                     43 k
 perl-DB_File                                                 x86_64                                 1.830-6.el7                                          base                                     74 k
 perl-Data-Dumper                                             x86_64                                 2.145-3.el7                                          base                                     47 k
 perl-Digest                                                  noarch                                 1.17-245.el7                                         base                                     23 k
 perl-Digest-MD5                                              x86_64                                 2.52-3.el7                                           base                                     30 k
 perl-Digest-SHA                                              x86_64                                 1:5.85-4.el7                                         base                                     58 k
 perl-Encode                                                  x86_64                                 2.51-7.el7                                           base                                    1.5 M
 perl-Env                                                     noarch                                 1.04-2.el7                                           base                                     16 k
 perl-Exporter                                                noarch                                 5.68-3.el7                                           base                                     28 k
 perl-ExtUtils-CBuilder                                       noarch                                 1:0.28.2.6-294.el7_6                                 base                                     68 k
 perl-ExtUtils-Embed                                          noarch                                 1.30-294.el7_6                                       base                                     50 k
 perl-ExtUtils-Install                                        noarch                                 1.58-294.el7_6                                       base                                     75 k
 perl-ExtUtils-MakeMaker                                      noarch                                 6.68-3.el7                                           base                                    275 k
 perl-ExtUtils-Manifest                                       noarch                                 1.61-244.el7                                         base                                     31 k
 perl-ExtUtils-ParseXS                                        noarch                                 1:3.18-3.el7                                         base                                     77 k
 perl-FCGI                                                    x86_64                                 1:0.74-8.el7                                         base                                     42 k
 perl-File-CheckTree                                          noarch                                 4.42-3.el7                                           base                                     18 k
 perl-File-Fetch                                              noarch                                 0.42-2.el7                                           base                                     27 k
 perl-File-Path                                               noarch                                 2.09-2.el7                                           base                                     26 k
 perl-File-Temp                                               noarch                                 0.23.01-3.el7                                        base                                     56 k
 perl-Filter                                                  x86_64                                 1.49-3.el7                                           base                                     76 k
 perl-Getopt-Long                                             noarch                                 2.40-3.el7                                           base                                     56 k
 perl-HTTP-Tiny                                               noarch                                 0.033-3.el7                                          base                                     38 k
 perl-IO-Compress                                             noarch                                 2.061-2.el7                                          base                                    260 k
 perl-IO-Zlib                                                 noarch                                 1:1.10-294.el7_6                                     base                                     52 k
 perl-IPC-Cmd                                                 noarch                                 1:0.80-4.el7                                         base                                     34 k
 perl-JSON-PP                                                 noarch                                 2.27202-2.el7                                        base                                     55 k
 perl-Locale-Codes                                            noarch                                 3.26-2.el7                                           base                                    314 k
 perl-Locale-Maketext                                         noarch                                 1.23-3.el7                                           base                                     93 k
 perl-Locale-Maketext-Simple                                  noarch                                 1:0.21-294.el7_6                                     base                                     50 k
 perl-Log-Message                                             noarch                                 1:0.08-3.el7                                         base                                     29 k
 perl-Log-Message-Simple                                      noarch                                 0.10-2.el7                                           base                                     11 k
 perl-Module-Build                                            noarch                                 2:0.40.05-2.el7                                      base                                    281 k
 perl-Module-CoreList                                         noarch                                 1:2.76.02-294.el7_6                                  base                                     86 k
 perl-Module-Load                                             noarch                                 1:0.24-3.el7                                         base                                     11 k
 perl-Module-Load-Conditional                                 noarch                                 0.54-3.el7                                           base                                     18 k
 perl-Module-Loaded                                           noarch                                 1:0.08-294.el7_6                                     base                                     46 k
 perl-Module-Metadata                                         noarch                                 1.000018-2.el7                                       base                                     26 k
 perl-Module-Pluggable                                        noarch                                 1:4.8-3.el7                                          base                                     29 k
 perl-Net-Daemon                                              noarch                                 0.48-5.el7                                           base                                     51 k
 perl-Object-Accessor                                         noarch                                 1:0.42-294.el7_6                                     base                                     56 k
 perl-Package-Constants                                       noarch                                 1:0.02-294.el7_6                                     base                                     46 k
 perl-Params-Check                                            noarch                                 1:0.38-2.el7                                         base                                     18 k
 perl-Parse-CPAN-Meta                                         noarch                                 1:1.4404-5.el7                                       base                                     14 k
 perl-PathTools                                               x86_64                                 3.40-5.el7                                           base                                     82 k
 perl-Perl-OSType                                             noarch                                 1.003-3.el7                                          base                                     20 k
 perl-PlRPC                                                   noarch                                 0.2020-14.el7                                        base                                     36 k
 perl-Pod-Checker                                             noarch                                 1.60-2.el7                                           base                                     28 k
 perl-Pod-Escapes                                             noarch                                 1:1.04-294.el7_6                                     base                                     51 k
 perl-Pod-LaTeX                                               noarch                                 0.61-2.el7                                           base                                     35 k
 perl-Pod-Parser                                              noarch                                 1.61-2.el7                                           base                                    107 k
 perl-Pod-Perldoc                                             noarch                                 3.20-4.el7                                           base                                     87 k
 perl-Pod-Simple                                              noarch                                 1:3.28-4.el7                                         base                                    216 k
 perl-Pod-Usage                                               noarch                                 1.63-3.el7                                           base                                     27 k
 perl-Scalar-List-Utils                                       x86_64                                 1.27-248.el7                                         base                                     36 k
 perl-Socket                                                  x86_64                                 2.010-4.el7                                          base                                     49 k
 perl-Storable                                                x86_64                                 2.45-3.el7                                           base                                     77 k
 perl-Sys-Syslog                                              x86_64                                 0.33-3.el7                                           base                                     42 k
 perl-Term-UI                                                 noarch                                 0.36-2.el7                                           base                                     22 k
 perl-Test-Harness                                            noarch                                 3.28-3.el7                                           base                                    302 k
 perl-Test-Simple                                             noarch                                 0.98-243.el7                                         base                                    170 k
 perl-Text-ParseWords                                         noarch                                 3.29-4.el7                                           base                                     14 k
 perl-Text-Soundex                                            x86_64                                 3.04-4.el7                                           base                                     19 k
 perl-Text-Unidecode                                          noarch                                 0.04-20.el7                                          base                                    114 k
 perl-Thread-Queue                                            noarch                                 3.02-2.el7                                           base                                     17 k
 perl-Time-HiRes                                              x86_64                                 4:1.9725-3.el7                                       base                                     45 k
 perl-Time-Local                                              noarch                                 1.2300-2.el7                                         base                                     24 k
 perl-Time-Piece                                              x86_64                                 1.20.1-294.el7_6                                     base                                     69 k
 perl-Version-Requirements                                    noarch                                 0.101022-244.el7                                     base                                     21 k
 perl-autodie                                                 noarch                                 2.16-2.el7                                           base                                     77 k
 perl-constant                                                noarch                                 1.27-2.el7                                           base                                     19 k
 perl-devel                                                   x86_64                                 4:5.16.3-294.el7_6                                   base                                    453 k
 perl-libs                                                    x86_64                                 4:5.16.3-294.el7_6                                   base                                    688 k
 perl-macros                                                  x86_64                                 4:5.16.3-294.el7_6                                   base                                     44 k
 perl-parent                                                  noarch                                 1:0.225-244.el7                                      base                                     12 k
 perl-podlators                                               noarch                                 2.5.1-3.el7                                          base                                    112 k
 perl-threads                                                 x86_64                                 1.87-4.el7                                           base                                     49 k
 perl-threads-shared                                          x86_64                                 1.43-6.el7                                           base                                     39 k
 perl-version                                                 x86_64                                 3:0.99.07-3.el7                                      base                                     84 k
 pyparsing                                                    noarch                                 1.5.6-9.el7                                          base                                     94 k
 systemtap-sdt-devel                                          x86_64                                 4.0-10.el7_7                                         updates                                  76 k

Transaction Summary
========================================================================================================================================================================================================
Install  3 Packages (+102 Dependent packages)
```

 インストールが完了するとPerlが利用できるようになります。

```
$ perl --version

This is perl 5, version 16, subversion 3 (v5.16.3) built for x86_64-linux-thread-multi
(with 39 registered patches, see perl -V for more detail)

Copyright 1987-2012, Larry Wall

Perl may be copied only under the terms of either the Artistic License or the
GNU General Public License, which may be found in the Perl 5 source kit.

Complete documentation for Perl, including FAQ lists, should be found on
this system using "man perl" or "perldoc perl". If you have access to the
Internet, point your browser at http://www.perl.org/, the Perl Home Page.
```