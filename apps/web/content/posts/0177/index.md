---
title: "Proxy環境下でcurlを実行する方法（オプション・環境変数・.curlrc）"
path: "/entry/177"
date: "2019-12-07 18:11:50"
coverImage: "../../../images/thumbnail/curl-logo.png"
author: "s-yoshiki"
tags: ["linux", "curl", "proxy"]
---

## 概要

Proxy（プロキシ）環境で`curl`を実行する方法を、用途別にまとめます。
1回だけ使うなら`--proxy`、シェル全体で使うなら環境変数、常に同じ設定を使うなら
`.curlrc`が基本です。

```bash
curl --proxy http://proxy.example.com:8080 https://example.com
```

`-x`は`--proxy`の短縮形です。

```bash
curl -x http://proxy.example.com:8080 https://example.com
```

## 設定方法の選び方

| 方法 | 適した用途 | 設定が影響する範囲 |
| --- | --- | --- |
| `-x` / `--proxy` | 1回だけ試す、スクリプトで明示する | そのコマンドだけ |
| `http_proxy`などの環境変数 | 複数のCLIツールで共有する | 現在のプロセスと子プロセス |
| `~/.curlrc` | curlで常に同じ設定を使う | そのユーザーのcurl |

トラブル時に設定元を切り分けやすいのは、コマンドで明示する方法です。

## コマンドオプションでProxyを指定する

HTTP Proxyを経由してHTTPSのURLへアクセスする例です。

```bash
curl --proxy http://proxy.example.com:8080 https://example.com
```

ProxyのURLにはスキーム、ホスト名、ポートを指定します。スキームを省略した場合、
curlはHTTP Proxyとして扱いますが、意図を明確にするため`http://`まで書くのがおすすめです。

### Proxy認証を指定する

ユーザー名とパスワードが必要なProxyでは`--proxy-user`（短縮形は`-U`）を使います。

```bash
curl \
  --proxy http://proxy.example.com:8080 \
  --proxy-user 'username:password' \
  https://example.com
```

認証方式を自動選択する場合は`--proxy-anyauth`を追加します。

```bash
curl \
  --proxy http://proxy.example.com:8080 \
  --proxy-anyauth \
  --proxy-user 'username:password' \
  https://example.com
```

パスワードをコマンドラインへ直接書くと、シェル履歴やプロセス情報から漏れる可能性があります。
実運用では組織のシークレット管理方法を使い、少なくとも履歴へ平文を残さないようにします。

### SOCKS Proxyを使う

SOCKS5 Proxyを使い、ホスト名の解決もProxy側で行う例です。

```bash
curl --proxy socks5h://proxy.example.com:1080 https://example.com
```

`socks5h://`の`h`は、接続先ホスト名をローカルではなくProxy側で解決する指定です。
同じ設定は`--socks5-hostname`でも指定できます。

## 環境変数でProxyを設定する

複数回実行する場合は環境変数が便利です。

```bash
export http_proxy=http://proxy.example.com:8080
export https_proxy=http://proxy.example.com:8080
export no_proxy=localhost,127.0.0.1,.example.internal
```

設定後は通常どおり実行します。

```bash
curl https://example.com
```

主な環境変数は次のとおりです。

| 環境変数 | 用途 |
| --- | --- |
| `http_proxy` | HTTP URL用のProxy |
| `https_proxy` | HTTPS URL用のProxy |
| `all_proxy` | プロトコル別設定がない場合の共通Proxy |
| `no_proxy` | Proxyを経由しない接続先 |

大文字の環境変数も多くの環境で使えますが、curlの`http_proxy`はセキュリティ上の理由から
小文字だけが有効です。大文字・小文字の両方が設定されている場合は小文字が優先されます。
表記を揃えるなら、上の例のように小文字へ統一すると混乱しにくくなります。

### `no_proxy`で社内・ローカル接続を除外する

カンマ区切りでホスト名、ドメイン、IPアドレスを指定します。

```bash
export no_proxy=localhost,127.0.0.1,.example.internal,192.168.0.0/16
```

- `localhost`はそのホストだけを除外
- `.example.internal`は配下のホストを除外
- `192.168.0.0/16`のCIDR表記はcurl 7.86.0以降で利用可能
- `*`だけを指定すると、すべての接続でProxyを無効化

一時的にProxyを通さない場合は、コマンドオプションでも指定できます。

```bash
curl --noproxy '*' https://example.com
```

### 環境変数を解除する

```bash
unset http_proxy https_proxy all_proxy no_proxy
unset HTTP_PROXY HTTPS_PROXY ALL_PROXY NO_PROXY
```

現在の設定を確認する場合は、値に認証情報が含まれていないことを確認してから表示します。

```bash
env | grep -i _proxy
```

### PowerShellで設定する

Windows PowerShellでは次のように設定します。

```powershell
$env:http_proxy = "http://proxy.example.com:8080"
$env:https_proxy = "http://proxy.example.com:8080"
$env:no_proxy = "localhost,127.0.0.1,.example.internal"
```

現在のPowerShellセッションから削除する例です。

```powershell
Remove-Item Env:http_proxy
Remove-Item Env:https_proxy
Remove-Item Env:no_proxy
```

## `.curlrc`に設定する

ユーザー単位の既定値は`~/.curlrc`へ記述します。

```text
proxy = "http://proxy.example.com:8080"
noproxy = "localhost,127.0.0.1,.example.internal"
```

既定の設定ファイルは、主に次の順で探索されます。

1. `$CURL_HOME/.curlrc`
2. `$XDG_CONFIG_HOME/curlrc`
3. `$HOME/.curlrc`

Windowsでは`%USERPROFILE%`や`%APPDATA%`なども探索対象です。`/etc/curlrc`はcurl標準の
自動探索対象ではありません。任意の設定ファイルを使う場合は`--config`（`-K`）で明示します。

```bash
curl --config /path/to/curl.conf https://example.com
```

認証情報を`.curlrc`へ平文で保存する場合は漏えいリスクがあります。やむを得ず保存する場合でも
ファイルの権限を所有者だけに制限します。

```bash
chmod 600 ~/.curlrc
```

`.curlrc`を読み込まずに実行する場合は、`-q`を最初の引数に指定します。

```bash
curl -q --proxy http://proxy.example.com:8080 https://example.com
```

## 設定の優先順位とProxyの無効化

`--proxy`はProxy用の環境変数を上書きします。コマンド単位でProxy設定を空にすることも
できます。

```bash
curl --proxy "" https://example.com
```

設定が競合しているときは、次の順で切り分けます。

1. `env | grep -i _proxy`で環境変数を確認する
2. `CURL_HOME`、`XDG_CONFIG_HOME`、`HOME`配下のcurl設定を確認する
3. `curl -q`で設定ファイルを無効にして再実行する
4. `--proxy`または`--noproxy`をコマンドで明示する

## Proxy経由になっているか確認する

`--verbose`（`-v`）を付けると、接続先、Proxyの利用、CONNECT処理、TLSハンドシェイクなどを
確認できます。

```bash
curl --verbose --head https://example.com
```

ログにはリクエストヘッダーや認証情報などの機密データが含まれる可能性があります。
共有する前に必ずマスキングしてください。

curl 8.7.0以降では、`proxy_used`を使ってProxy利用の有無だけを出力できます。

```bash
curl \
  --silent \
  --output /dev/null \
  --write-out 'proxy_used=%{proxy_used}\n' \
  https://example.com
```

`1`ならProxy経由、`0`なら直接接続です。

## よくあるエラーと対処

### `407 Proxy Authentication Required`

Proxy認証が必要です。`--proxy-user`で認証情報を指定し、Basic以外の方式を使う環境では
`--proxy-anyauth`、`--proxy-ntlm`、`--proxy-negotiate`など組織指定の方式を確認します。

### `Could not resolve proxy`

Proxyのホスト名が解決できていません。スペル、DNS、VPN接続、Proxy URLのスキームとポートを
確認します。

### `Failed to connect to ... port ...`

ProxyへTCP接続できていません。ポート番号、ファイアウォール、VPN、Proxyサービスの稼働状況を
確認します。

### 証明書エラー（`curl: (60)`）

社内ProxyがTLS通信を検査している場合、組織のCA証明書が必要になることがあります。
接続先サーバーの検証には`--cacert`、HTTPS Proxy自体の検証には`--proxy-cacert`を使います。

```bash
curl --cacert company-ca.pem https://example.com
```

`-k` / `--insecure`は証明書検証を無効化するため、恒久的な対処には使わないでください。

## まとめ

- 1回だけなら`curl --proxy URL 接続先URL`
- 継続利用なら`http_proxy`、`https_proxy`、`no_proxy`
- curl専用の既定値なら`~/.curlrc`
- 認証情報をコマンド履歴や設定ファイルへ平文で残さない
- `curl -q -v`で設定ファイルを除外しながら接続経路を確認する
- 社内CAが必要な環境では証明書を正しく登録し、`--insecure`で回避しない

## 参考資料

- [curl公式マニュアル](https://curl.se/docs/manpage.html)
- [curl公式チュートリアル: Proxy環境変数](https://curl.se/docs/tutorial.html#environment-variables)
- [curl公式: URL syntax](https://curl.se/docs/url-syntax.html)
- [CentOSでスマートにProxyを設定する](/entry/222)
