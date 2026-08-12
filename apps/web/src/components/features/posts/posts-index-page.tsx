import PostsBand from 'components/posts-band';
import { TagPill } from 'components/tag';
import { Button } from 'components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import type { Posts } from 'types/entry.interface';

interface Props {
  title: string;
  posts: Posts[];
  badge?: string;
  pagination?: { current: number; total: number; basePath: string };
}

/** Window of numbered pages around the current one, with the ends always shown. */
const pageWindow = (current: number, total: number): (number | 'gap')[] => {
  if (total <= 7) return Array.from({ length: total }, (_, index) => index + 1);
  const pages = new Set([1, total, current - 1, current, current + 1]);
  const sorted = [...pages]
    .filter((page) => page >= 1 && page <= total)
    .sort((a, b) => a - b);
  return sorted.flatMap((page, index) =>
    index > 0 && page - sorted[index - 1] > 1 ? ['gap' as const, page] : [page],
  );
};

const Pagination = ({
  current,
  total,
  basePath,
}: NonNullable<Props['pagination']>) => (
  <nav
    className="flex items-center justify-center gap-1"
    aria-label="ページネーション"
  >
    {current > 1 ? (
      <Button variant="outline" size="icon" asChild>
        <Link
          href={`${basePath}/${current - 1}`}
          rel="prev"
          aria-label="前のページ"
        >
          <ChevronLeft className="size-4" />
        </Link>
      </Button>
    ) : (
      <Button variant="outline" size="icon" disabled aria-label="前のページ">
        <ChevronLeft className="size-4" />
      </Button>
    )}

    <ul className="flex items-center gap-1">
      {pageWindow(current, total).map((page, index) =>
        page === 'gap' ? (
          <li key={`gap-${index}`} className="px-1 text-muted-foreground">
            …
          </li>
        ) : (
          <li key={page}>
            <Button
              variant={page === current ? 'default' : 'ghost'}
              size="icon"
              asChild
            >
              <Link
                href={`${basePath}/${page}`}
                aria-current={page === current ? 'page' : undefined}
                aria-label={`${page}ページ目`}
                className="tabular-nums"
              >
                {page}
              </Link>
            </Button>
          </li>
        ),
      )}
    </ul>

    {current < total ? (
      <Button variant="outline" size="icon" asChild>
        <Link
          href={`${basePath}/${current + 1}`}
          rel="next"
          aria-label="次のページ"
        >
          <ChevronRight className="size-4" />
        </Link>
      </Button>
    ) : (
      <Button variant="outline" size="icon" disabled aria-label="次のページ">
        <ChevronRight className="size-4" />
      </Button>
    )}
  </nav>
);

export default function PostsIndexPage({
  title,
  posts,
  badge,
  pagination,
}: Props) {
  return (
    <>
      <div className="border-border border-b">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14">
          <nav aria-label="パンくずリスト" className="mb-5">
            <Link
              href="/"
              className="rounded text-muted-foreground text-sm hover:text-foreground"
            >
              ← Articles
            </Link>
          </nav>
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="font-bold text-2xl tracking-tight sm:text-3xl">
              {title}
            </h1>
            {badge && <TagPill keyword={badge} size="md" />}
          </div>
          <p className="mt-2 text-muted-foreground text-sm">
            {posts.length} 件
            {pagination &&
              ` ・ ${pagination.current} / ${pagination.total} ページ`}
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <PostsBand posts={posts} />
        {pagination && pagination.total > 1 && (
          <div className="mt-10">
            <Pagination {...pagination} />
          </div>
        )}
      </div>
    </>
  );
}
