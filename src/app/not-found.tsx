import { Button } from 'components/ui/button';
import { FileQuestion } from 'lucide-react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[65vh] max-w-xl flex-col items-center justify-center px-6 text-center">
      <FileQuestion className="mb-6 size-14 text-primary" />
      <p className="font-mono text-sm text-muted-foreground">404 NOT FOUND</p>
      <h1 className="mt-3 text-3xl font-bold">ページが見つかりません</h1>
      <p className="mt-4 text-muted-foreground">
        URLが変更されたか、ページが削除された可能性があります。
      </p>
      <Button asChild className="mt-8">
        <Link href="/">トップへ戻る</Link>
      </Button>
    </div>
  );
}
