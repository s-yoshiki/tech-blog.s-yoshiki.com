'use client';

import type { IGroupByItems, IGroupByYearMonthItems, Posts } from '@repo/blog-content';
import { Button } from '@repo/ui';
import AuthorSection from 'components/sections/author-section';
import BrowseSection from 'components/sections/browse-section';
import PostsSection from 'components/sections/posts-section';
import { useLoadMore } from 'hooks/use-load-more';
import { Newspaper, TrendingUp } from 'lucide-react';

const PAGE_SIZE = 15;

interface Props {
  posts: Posts[];
  popular: Posts[];
  tags: IGroupByItems[];
  dates: IGroupByYearMonthItems[];
}

export default function HomePage({ posts, popular, tags, dates }: Props) {
  const { visible, hasMore, loadMore } = useLoadMore(posts, PAGE_SIZE);

  return (
    <>
      <PostsSection
        first
        title="新着記事"
        icon={Newspaper}
        posts={visible}
        action={
          <span className="text-muted-foreground text-sm tabular-nums" aria-live="polite">
            {visible.length} / {posts.length}
          </span>
        }
      >
        {hasMore && (
          <div className="mt-8 flex justify-center">
            <Button variant="outline" onClick={loadMore}>
              さらに記事を表示
            </Button>
          </div>
        )}
      </PostsSection>
      <PostsSection title="よく読まれている記事" icon={TrendingUp} posts={popular} muted />
      <BrowseSection tags={tags} dates={dates} />
      <AuthorSection />
    </>
  );
}
