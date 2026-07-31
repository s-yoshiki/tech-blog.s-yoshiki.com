---
title: "ブラウザから本物のシェルを操作する node-websh を作り直した"
path: "/entry/338"
date: "2026-07-31 13:00"
coverImage: "../../../images/thumbnail/nodejs-logo.webp"
author: "s-yoshiki"
tags: ["node.js", "typescript", "hono", "websocket", "xterm.js", "node-pty", "pnpm", "turborepo", "セキュリティ", "shell"]
---

## 概要

以前、[node-pty と xterm.js でブラウザからシェルを操作する記事](/entry/294)を書きました。
今回はその node-websh を、現行の Node.js と TypeScript を前提に作り直しました。

- [node-websh](https://github.com/s-yoshiki/node-websh)
- [ドキュメント](https://s-yoshiki.github.io/node-websh/)

ブラウザ上にターミナルを表示し、サーバー側で起動した実際のログインシェルへ接続します。
単なるコマンド実行 API ではなく、PTY（pseudo-terminal）を経由するため、`vim`、ジョブ制御、
カラー表示、カーソル移動、ターミナルのリサイズなども通常の端末に近い形で動作します。

用途は、開発マシンやホームサーバーなど、自分が管理するマシンへ一時的にブラウザからアクセス
することです。複数ユーザー向けの共有ターミナルや、信頼できない利用者へシェルを提供するための
サンドボックスではありません。

## 現在の構成

現行版は pnpm workspace と Turborepo を使った小さな monorepo です。

```text
node-websh/
├── apps/
│   ├── server/            Hono + node-pty + WebSocket
│   └── web/               React + Vite のブラウザアプリ
├── packages/
│   ├── protocol/          通信フレームと transport の抽象化
│   └── terminal-ui/       xterm.js を使う共有ターミナルコンポーネント
├── configs/               TypeScript と Biome の共通設定
└── scripts/               インストール処理と E2E smoke test
```

ブラウザとサーバーの間には WebSocket を置きます。サーバーは接続ごとに `node-pty` でシェルを
1つ起動し、シェルの標準入出力と WebSocket のフレームを相互に転送します。

```text
Browser
  React + xterm.js
       │ WebSocket (/ws)
       ▼
Hono server
       │ node-pty
       ▼
Pseudo terminal
       │
       ▼
Login shell
```

ビルド後は、同じ Node.js プロセスが API、WebSocket、ビルド済みフロントエンドをまとめて配信します。
そのため、通常のデプロイでは複数のサービスを用意する必要がありません。

## PTY を使う理由

`child_process.spawn()` でシェルを起動して標準入出力をつなぐだけでも、単純なコマンドの実行結果は
取得できます。しかし、それだけでは対話型プログラムが期待する端末の状態を再現できません。

PTY を使うと、シェルは端末へ接続されていると認識します。入力された文字列だけでなく、端末の
行・列数も子プロセスへ伝わるため、次のような操作が可能になります。

- `readline` による行編集
- `Ctrl-C` や `Ctrl-Z` などのシグナル操作
- `vim` や `top` のような画面を書き換えるプログラム
- ANSI エスケープシーケンスによる色、カーソル移動、進捗表示
- ブラウザの表示領域に合わせた端末サイズの変更

サーバー側ではシェルの起動時に `TERM=xterm-256color` と `COLORTERM=truecolor` を設定しています。
さらに、親プロセスにロケールが設定されていない環境では UTF-8 のロケールを補います。systemd
やデーモンとして起動したときに、日本語や絵文字の入力が突然壊れる問題を避けるためです。

## ブラウザとサーバーで通信プロトコルを共有する

WebSocket のメッセージは、ブラウザからサーバーへ送るものと、サーバーからブラウザへ送るものを
共有パッケージで定義しています。

```ts
// client -> server
type ClientMessage =
  | { type: "input"; data: string }
  | { type: "resize"; cols: number; rows: number }
  | { type: "ping"; at: number };

// server -> client
type ServerMessage =
  | { type: "ready"; protocolVersion: number; sessionId: string; shell: string; cols: number; rows: number }
  | { type: "output"; data: string }
  | { type: "exit"; exitCode: number }
  | { type: "error"; code: string; message: string }
  | { type: "pong"; at: number };
```

以前の実装では、クライアントとサーバーがそれぞれ似た型を持っていました。その結果、片方が
`resizer` と送っているのに、もう片方が `resize` を読んでいるような不一致が起きても、コンパイル時に
気づけませんでした。

現在は `packages/protocol` にフレームの型、エンコード・デコード、端末サイズの上限、WebSocket
close code をまとめています。ブラウザとサーバーが同じ定義を import するため、フィールド名の変更は
型チェックで検出できます。

ただし、TypeScript の型は実行時には存在しません。ネットワークから届いた値は信用せず、デコード時に
`type` や値の範囲を確認します。たとえば端末サイズは `1`〜`1000` の範囲へクランプし、クライアントが
極端に大きなバッファを要求できないようにしています。

## Terminal UI と transport を分離する

`packages/terminal-ui` の `TerminalView` は、xterm.js の描画と入力処理を担当します。一方、WebSocket
の接続や再接続は `TerminalTransport` というインターフェースの外へ出しています。

```ts
interface TerminalTransport {
  readonly state: TransportState;
  connect(): void;
  send(message: ClientMessage): void;
  onMessage(listener: (message: ServerMessage) => void): Unsubscribe;
  onStateChange(listener: (state: TransportState) => void): Unsubscribe;
  dispose(): void;
}
```

Web アプリケーションは `WebSocketTransport` を渡しますが、ターミナルコンポーネント自身は WebSocket
を知りません。この境界を作っておくと、接続の再試行やテスト用の transport を UI から切り離せます。
同じ考え方で、別のデスクトップクライアントからローカル IPC 経由で同じ UI を再利用する余地も残ります。

WebSocket が予期せず切断された場合は、指数バックオフで再接続します。一方、認証エラーを示す close
code を受け取った場合は再接続を続けず、ログイン画面へ戻します。認証できない状態で再試行し続けても
成功しないためです。

## 認証トークンをセッションへ交換する

シェルを操作できるアプリケーションでは、ターミナルの表示より先に認証を設計する必要があります。
node-websh は起動時にトークンを生成し、コンソールへ次のような URL を表示します。

```text
Open:  http://127.0.0.1:8999/#token=...
Token: ...
```

トークンは URL のクエリ文字列ではなく、`#` より後ろのフラグメントへ置いています。フラグメントは
ブラウザからの HTTP リクエストに送信されないため、サーバーやリバースプロキシのアクセスログへ
そのまま残りません。

ブラウザはフラグメントを読み取ると、`POST /api/auth/session` で一度だけトークンを送信します。
成功したらサーバーはランダムなセッション ID を `HttpOnly; SameSite=Strict` Cookie として返し、
ブラウザはアドレスバーからフラグメントを直ちに削除します。

```text
起動時に生成した token
        │ POST /api/auth/session
        ▼
メモリ上の session ID
        │ HttpOnly Cookie
        ▼
WebSocket /ws の Upgrade
```

トークン自体を WebSocket の URL に含めないことが重要です。URL はブラウザ履歴、プロキシログ、
`Referer` などへ伝播し得るため、シェルへのアクセス権を持つ値を置く場所として適していません。

セッションはプロセス内のメモリで管理します。サーバーを再起動するとセッションと子シェルがすべて
無効になる、という単純なライフサイクルにしています。常時稼働する大規模な認証基盤ではなく、個人が
管理するマシンへ一時的に接続するツールとしての選択です。

## WebSocket の接続前に確認すること

Cookie 認証だけに任せず、WebSocket の Upgrade 時点で次の確認を行います。

- `Origin` が現在の Host または明示的な許可リストに含まれているか
- セッション Cookie が存在し、有効期限内か
- 同時に開けるターミナル数を超えていないか

接続が閉じられたときは、PTY を kill し、アクティブなセッション数を減らします。ブラウザを閉じた
あともシェルが残り続けると、プロセスやリソースが回収されないためです。

レスポンスヘッダーには Content-Security-Policy、`X-Frame-Options: DENY`、`Referrer-Policy:
no-referrer` なども設定しています。ターミナルへ第三者スクリプトを混ぜないこと、依存パッケージを
不用意に増やさないことも、キーストロークを扱うアプリケーションでは重要です。

## ローカルで動かす

Node.js 20 以上と pnpm 11 以上を用意します。

```sh
git clone https://github.com/s-yoshiki/node-websh.git
cd node-websh
pnpm install
pnpm dev
```

開発モードでは、サーバーが `127.0.0.1:8999`、Vite のフロントエンドが `127.0.0.1:5173` で起動します。
サーバーが表示したトークンをブラウザのログイン画面へ貼り付けると接続できます。

トークンを固定したい場合は、ローカル開発用途に限って環境変数で指定できます。

```sh
WEBSH_TOKEN=local-development-token pnpm dev
```

本番相当のビルドは次のコマンドで実行します。

```sh
pnpm build
pnpm start
```

`pnpm build` の成果物には、バンドル済みのサーバーファイル、ビルド済みフロントエンド、実行時に
必要な `node-pty` が含まれます。別のホストへコピーする場合は、ネイティブモジュールを実行先の
OS と CPU アーキテクチャに合わせてインストールします。

## デプロイ時の注意点

デフォルトの bind address は `127.0.0.1` です。外部から到達できるアドレスへ変更するときは、
その時点で「ブラウザからログインシェルへ入力できるサービス」をインターネットへ公開することになります。

最低限、次の構成にします。

1. node-websh は root ではなく専用の非特権ユーザーで実行する
2. node-websh 自体はループバックに bind したまま、手前にリバースプロキシを置く
3. リバースプロキシで TLS を終端し、WebSocket Upgrade を転送する
4. 十分に長いランダムな `WEBSH_TOKEN` を設定する
5. ファイアウォール、VPN、プライベートネットワークなどで到達範囲を制限する
6. 必要に応じて `--max-sessions` と `--session-ttl-minutes` を小さくする

Caddy なら、たとえば次の設定でリバースプロキシにできます。

```caddyfile
websh.example.com {
    reverse_proxy 127.0.0.1:8999
}
```

TLS 終端を node-websh 自身は担当しないため、`http://` のまま外部へ公開しないでください。HTTPS の
リクエストをプロキシから受けた場合は、`X-Forwarded-Proto` を見て Cookie の `Secure` 属性も設定します。

認証を無効にする `--insecure-no-auth` もありますが、これは到達できる全員へシェルを渡す設定です。
信頼できる上流で認証とネットワーク制御を完全に行う場合以外は使わないようにします。

## Single Executable Application

実験的な機能として、Node.js の Single Executable Application（SEA）向けのビルドも用意しています。

```sh
pnpm build:sea
./apps/server/dist/node-websh
```

SEA ではサーバー、フロントエンド、Node.js ランタイムを 1 つの実行ファイルへまとめます。ただし、
`node-pty` はプラットフォーム固有のネイティブコードを含みます。そのまま実行ファイルへ埋め込むのではなく、
起動時に必要なファイルを一時ディレクトリへ展開してロードします。

実行ファイルは、ビルドに使った Node.js の OS と CPU アーキテクチャ専用です。別の環境へコピーして使う
場合は、その環境用に作り直します。単一バイナリに近い形で配布できる一方、通常の `pnpm build` よりも
プラットフォーム依存の条件が増えるため、まずは通常ビルドを基本にしています。

## テストで確認していること

シェルを扱うアプリケーションでは、画面が表示されるだけでなく、切断時の後始末や認証失敗時の状態を
確認する必要があります。node-websh では次のコマンドを用意しています。

```sh
pnpm lint
pnpm typecheck
pnpm test
pnpm test:e2e
```

テストでは、認証トークンの比較、セッションの有効期限、Origin チェック、PTY の起動と終了、WebSocket
フレームのエンコード・デコードなどを確認します。E2E smoke test ではビルドしたサーバーを起動して、
ログインから端末入力、レスポンス、切断までを通します。

## まとめ

ブラウザからシェルを操作する最小構成は、`node-pty`、xterm.js、WebSocket をつなぐだけでも作れます。
一方で、実用に近づけるには次の境界を先に決める必要がありました。

- PTY と通常の標準入出力を区別する
- ブラウザとサーバーの通信プロトコルを共有する
- UI と transport を分離する
- トークンとセッションを分け、トークンを URL クエリへ置かない
- Origin、CSP、接続数、プロセスの終了をサーバー側で管理する
- 外部公開時は TLS、低権限ユーザー、ネットワーク制限を組み合わせる

node-websh は、開発マシンや自宅サーバーへ「必要なときだけブラウザから入る」ための小さなツールです。
シェルの強い権限をそのままブラウザへ渡す性質は変わらないため、公開範囲と実行ユーザーを絞ったうえで
利用してください。

