# Tailwind CSS を廃止し CSS Modules と Base UI を使う

- Status: Accepted
- Date: 2026-11-27
- Supersedes: なし

## Context

スタイルは Tailwind のユーティリティクラスと shadcn/ui 由来の `Button`（Radix Slot、cva、tailwind-merge）で構成されていた。クラス文字列が約 170 箇所に散らばり、デザイントークンの変更箇所と見た目の対応が追いにくかった。デザインの方向はミニマル調を維持する。

## Decision

- Tailwind CSS（`tailwindcss`、`@tailwindcss/postcss`、PostCSS 設定）を廃止し、コンポーネントごとの CSS Modules（`*.module.css`）に移行する。
- 色・タイポグラフィ・余白・角丸・モーション・レイアウト幅は `apps/web/src/styles/tokens.css` に CSS 変数として集約する。パレット（生の値）とセマンティックな役割の 2 層とし、コンポーネントはセマンティックな変数だけを参照する。ダークモードは `:root.dark` で値を差し替える。
- カスケード順は `@layer reset, base, markdown` で固定する。CSS Modules はレイヤーを持たないため常にこれらより優先される。
- バリアントは `data-variant` / `data-size` などの `data-*` 属性で表現し、`cva`、`clsx`、`tailwind-merge` は使わない。クラスの連結は `@repo/ui` の `cx` で行う。
- 操作を伴うプリミティブ（`Button`、`Input`、`Toggle`）は `@repo/ui` に Base UI（`@base-ui/react`）で実装する。リンクをボタンの見た目にする場合は Radix の `asChild` ではなく `render` prop を使う。
- 開閉だけのUI（アーカイブ、記事内目次）はネイティブの `<details>` を使い、クライアント JavaScript を増やさない。

## Consequences

- `tailwindcss`、`@tailwindcss/postcss`、`tailwind-merge`、`class-variance-authority`、`clsx`、`@radix-ui/react-slot`、shadcn の `components.json` を削除する。
- 新しい UI は `tokens.css` の変数と CSS Modules で書き、Tailwind のクラス名は使わない。
- ホーム、ヘッダー、アーカイブ、記事内目次をサーバーコンポーネントにしたことで、タグ色データ（`tag-brand-colors.ts`）がクライアントバンドルに含まれなくなる。
- 読了プログレスは React の state を経由せず CSS 変数を直接更新し、スクロール時の再レンダリングを避ける。
