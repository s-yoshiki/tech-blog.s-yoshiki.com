import type { Posts } from '@repo/blog-content';
import { Button, Stack, Text } from '@repo/ui';
import Container from 'components/container';
import PageHeader from 'components/page-header';
import PostsBand from 'components/posts-band';
import { TagPill } from 'components/tag';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import styles from './posts-index-page.module.css';

type PageItem = number | { type: 'gap'; after: number };

interface Props {
  title: string;
  posts: Posts[];
  badge?: string;
  pagination?: { current: number; total: number; basePath: string };
}

/** Window of numbered pages around the current one, with the ends always shown. */
const pageWindow = (current: number, total: number): PageItem[] => {
  if (total <= 7) return Array.from({ length: total }, (_, index) => index + 1);
  const pages = new Set([1, total, current - 1, current, current + 1]);
  const sorted = [...pages].filter((page) => page >= 1 && page <= total).toSorted((a, b) => a - b);
  return sorted.flatMap((page, index) => {
    const previousPage = sorted[index - 1];
    if (previousPage !== undefined && page - previousPage > 1) {
      return [{ type: 'gap' as const, after: previousPage }, page];
    }
    return [page];
  });
};

const Pagination = ({ current, total, basePath }: NonNullable<Props['pagination']>) => (
  <Stack
    as="nav"
    direction="row"
    align="center"
    justify="center"
    gap={1}
    className={styles.pagination}
    aria-label="ページネーション"
  >
    <Button
      variant="outline"
      size="icon"
      aria-label="前のページ"
      disabled={current <= 1}
      render={current > 1 ? <Link href={`${basePath}/${current - 1}/`} rel="prev" /> : undefined}
    >
      <ChevronLeft size={16} />
    </Button>

    <Stack as="ul" direction="row" align="center" gap={1}>
      {pageWindow(current, total).map((page) =>
        typeof page === 'object' ? (
          <li key={`gap-${page.after}`} className={styles.gap}>
            …
          </li>
        ) : (
          <li key={page}>
            <Button
              variant={page === current ? 'solid' : 'ghost'}
              size="icon"
              className={styles.pageLink}
              aria-label={`${page}ページ目`}
              render={
                <Link
                  href={`${basePath}/${page}/`}
                  aria-current={page === current ? 'page' : undefined}
                />
              }
            >
              {page}
            </Button>
          </li>
        ),
      )}
    </Stack>

    <Button
      variant="outline"
      size="icon"
      aria-label="次のページ"
      disabled={current >= total}
      render={
        current < total ? <Link href={`${basePath}/${current + 1}/`} rel="next" /> : undefined
      }
    >
      <ChevronRight size={16} />
    </Button>
  </Stack>
);

export default function PostsIndexPage({ title, posts, badge, pagination }: Props) {
  return (
    <>
      <PageHeader
        title={title}
        back={{ href: '/', label: 'Articles' }}
        aside={badge ? <TagPill keyword={badge} size="md" /> : undefined}
      >
        <Text tone="muted" size="sm" className={styles.count}>
          {posts.length} 件{pagination && ` ・ ${pagination.current} / ${pagination.total} ページ`}
        </Text>
      </PageHeader>

      <Container className={styles.body}>
        <PostsBand posts={posts} />
        {pagination && pagination.total > 1 && <Pagination {...pagination} />}
      </Container>
    </>
  );
}
