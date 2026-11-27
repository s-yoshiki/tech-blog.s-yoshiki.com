# UI プリミティブとドメインのプリミティブ型

- Status: Accepted
- Date: 2026-11-27
- Supersedes: なし

## Context

各 CSS Module が `display: flex; gap: …` や見出しの文字サイズを繰り返し書いていた。また、記事のパス・日付・年月は `string` のまま扱われ、`post.date.split(' ')[0]` や `/entry/${id}`、`/tags/${…}/` の組み立てが複数箇所に散っていた。存在しない記事のために、空の `EMPTY_POST` を返す仕組みもあった。

## Decision

### UI プリミティブ（`@repo/ui`）

- `Stack`（flex レイアウト）、`Text`（サイズ・トーン・太さ）、`Heading`（意味上のレベルと見た目のサイズを分離）を追加する。値はデザイントークンの段階（`gap` は `--space-N`）に対応させ、`data-*` 属性で切り替える。
- 個別コンポーネントの CSS Module には、プリミティブで表せない見た目だけを書く。

### ドメインのプリミティブ型（`@repo/blog-content`）

- `PostPath`（`/entry/${number}`）、`DateString`、`PostDate`、`YearKey`、`YearMonthKey` をテンプレートリテラル型で定義する。実行時は通常の文字列のままである。
- front matter やルートパラメータなど外部から入る文字列は `parse*` / `is*` で検証して型を絞る。記事の front matter が不正な場合は、該当ファイル名を含むエラーでビルドを失敗させる。
- 日付の年・年月は `Date` ではなく文字列の切り出しで求める。実行環境のタイムゾーンに依存しない。
- 記事が見つからない場合は `findByPath` が `undefined` を返す。空の `EMPTY_POST` は廃止する。
- 内部 URL は `apps/web/src/lib/routes.ts` に集約する。

## Consequences

- パス・年月の取り違えがコンパイル時に検出される。
- 新しい記事の `path` や `date` の形式を誤ると、ビルドが早い段階で失敗する。
- URL の形式やエンコードを変える場合は `routes.ts` だけを直せばよい。
