import { Button } from 'components/ui/button';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-xl flex-col items-center justify-center px-6 py-20 text-center">
      <span className="grid size-14 place-items-center rounded-2xl bg-primary font-mono text-primary-foreground text-sm">
        404
      </span>
      <h1 className="mt-6 font-bold text-2xl tracking-tight sm:text-3xl">
        ページが見つかりません
      </h1>
      <p className="mt-3 text-muted-foreground">
        URLが変更されたか、ページが削除された可能性があります。
      </p>
      <div className="mt-8 flex gap-2">
        <Button asChild>
          <Link href="/">トップへ戻る</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/#search">記事を検索</Link>
        </Button>
      </div>
    </div>
  );
}
