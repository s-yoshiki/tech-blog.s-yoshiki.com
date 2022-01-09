---
title: "RPMのspecファイルで利用するマクロ・変数"
path: "/entry/251"
date: "2022-01-09 01:00"
coverImage: "../../../images/thumbnail/linux-logo.png"
author: "s-yoshiki"
tags: ["centos","linux","red-hat","fedora"]
---

## はじめに

RPM(Fedora/CentOS系)を作成する際に利用するspecファイルで利用できるマクロについて調べた際のメモです。

## マクロ一覧

### 基本情報系

- `Name`

パッケージの名前を定義します。これはspecファイル名と一致する必要があります。

定義すると`%{name}`というマクロで参照できます。

詳細は[パッケージ命名ガイドライン](https://docs.fedoraproject.org/en-US/packaging-guidelines/Naming/)を参照してください。


- `Version`

アップストリームのバージョン番号を定義します。バージョンに数値以外のタグが含まれている場合は、`Release`タグに数値以外の文字を含める必要がある場合があります。

定義すると`%{version}`というマクロで参照できます。

詳細は、[バージョン管理ガイド](https://docs.fedoraproject.org/en-US/packaging-guidelines/Versioning/)を参照してください。

- `Release`

初期値を`1%\{?dist}`に設定します。

同じバージョンで新しいパッケージをリリースするたびに、カウントアップします。

新しいバージョンがリリースされたら、一致するように`Version`タグを変更し、`Release`を`1`にリセットします。

詳細については、[バージョン管理ガイド](https://docs.fedoraproject.org/en-US/packaging-guidelines/Versioning/)を参照してください。

- `Summary`

  パッケージの簡単な要約を入力します。
  
- `Group`

このタグは廃止されました。

- `License`

ライセンスを記載します。

詳細については、[ライセンスガイドラインを](https://docs.fedoraproject.org/en-US/packaging-guidelines/LicensingGuidelines/)参照してください。

`and` や `or`（例`GPLv2 and BSD`）と組み合わせて、複数のライセンスを定義できます。

- `URL`

例えばプロジェクトのWebサイトやGitHubのREADMEなどプログラムの詳細を説明しているサイトのURLを定義します。
  
※元のソースコードへのリンク(Web上に配置されたtarやzipのリンク)を追加しないでください。これは`Source0`タグにて定義します。

- `Source0`

アップストリームがリリースした元の元のソースコードを含む圧縮アーカイブの完全なURLを入力します。

「Source」でも同じ意味となります。

複数ソースがある場合はSource1,Source2...と定義できます。

可能であれば、Source0に`%{name}`で`%{version}`を埋め込んで、ファイル名やバージョン更新した際に変更が適切に行われるようにしておくのが良いです。

ソースファイルをダウンロードするときのタイムスタンプを利用することができ、
詳細については、[Fedora Packaging Guidelines(timestamps)](https://docs.fedoraproject.org/en-US/packaging-guidelines/#_timestamps)参照してください。


その他、特殊なケースについては、[Referencing Source](https://docs.fedoraproject.org/en-US/packaging-guidelines/SourceURL/)参照してください。

- `Patch0`

ソースコードに適用するパッチの名前を入力します。

複数パッチがある場合は Patch1,Patch2...と定義できます。

パッチは、`.patch`ファイルとして`~/rpmbuild/SOURCES`ディレクトリに保存します。



- `BuildArch`

shellscriptやデータファイルなど、アーキテクチャに依存しないファイルをパッケージ化する場合は、`BuildArch: noarch`を追加します。

バイナリRPMのアーキテクチャは次のようになり`noarch`ます。

- `BuildRoot`

仮想インストールのためのディレクトリ名を定義します。

※デフォルトでは、BuildRootは`%{_topdir}/BUILDROOT/`となります。

- `BuildRequires`

パッケージの**作成**について、依存関係で必要となるパッケージを記載します。

プログラムのコンパイルに必要なパッケージをコンマ区切りで追加します。

例えば、ocamlの3.08が必要な場合

```
BuildRequires: ocaml = 3.08
```

と定義します。


- `Requires`

パッケージの**動作**について、依存関係で必要となるパッケージを記載します。

例えば、ocamlの3.08以上が必要な場合

```
Requires: ocaml >= 3.08
```

### Body項目

- `%description`

より詳細なパッケージの説明を入力します。

- `%prep`

ビルド作業前に必要な「準備」するための処理をシェルスクリプトで記述します。

この項目では

```
rm -rf ${RPM_BUILD_ROOT}
```

などのクリーンアップ的な操作を行う場合が多いです。


※**RPM_BUILD_ROOT** : BuildRootで設定された仮想インストールのためのディレクトリ

- `%build`

スクリプトコマンドを追加してプログラムをコンパイルし、インストールの準備をします。

具体的には`configure`や`make`などを行います。

- `%install`

プログラムを「インストール」するスクリプトを定義します。

BuildRootで設定したディレクトリ(${RPM_BUILD_ROOT}) の下に全てのファイルがインストールされるよう調整する必要があります。

- `%check`

プログラムを「テスト」するためのスクリプトコマンドを追加します。

多くの場合、`make test`または`make check`などを定義します。

- `%clean`

通常、これには`rm -rf %{buildroot`などを定義しますs。

- `%files`

rpmに追加するファイルを定義します。

- `%changelog`

パッケージの変更履歴を記載します。

- `ExcludeArch`

パッケージが特定のアーキテクチャで正常にコンパイル、ビルドができない場合は、これらのアーキテクチャをこのタグの下にリストしてください。

## コメント

コメントについて

 - 先頭に`#`文字を付けてコメントを挿入します。
 - 複数行になる可能性のあるマクロ（`%`で始まる）に注意します。
 - 行をコメントアウトするとき`%%`は、の後に表示されるマクロのパーセント記号（`#`）を2つにします。
 - スクリプトコマンドと同じ行にインラインコメントを付けることは避けます。


## 参考文献

 - [Creating RPM packages :: Fedora Docs](https://docs.fedoraproject.org/en-US/quick-docs/creating-rpm-packages/index.html)
 - [SPECファイルの記述](https://vinelinux.org/docs/vine6/making-rpm/make-spec.html)
 - [3.4. SPEC ファイルの概要 Red Hat Enterprise Linux 8 | Red Hat Customer Portal](https://access.redhat.com/documentation/ja-jp/red_hat_enterprise_linux/8/html/packaging_and_distributing_software/what-is-a-spec-file_packaging-software)