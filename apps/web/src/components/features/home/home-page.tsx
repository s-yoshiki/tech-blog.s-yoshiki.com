'use client';

import Author from 'components/author';
import PostsBand from 'components/posts-band';
import SectionHeading from 'components/section-heading';
import Tag from 'components/tag';
import { Button } from 'components/ui/button';
import YearMonthPosts from 'components/yesar-month-posts';
import {
  CalendarDays,
  Hash,
  Newspaper,
  TrendingUp,
  UserRound,
} from 'lucide-react';
import { useState } from 'react';
import type {
  IGroupByItems,
  IGroupByYearMonthItems,
  Posts,
} from 'types/entry.interface';

const PAGE_SIZE = 15;

interface Props {
  posts: Posts[];
  popular: Posts[];
  tags: IGroupByItems[];
  dates: IGroupByYearMonthItems[];
}

export default function HomePage({ posts, popular, tags, dates }: Props) {
  const [visiblePages, setVisiblePages] = useState(1);
  const pageCount = Math.ceil(posts.length / PAGE_SIZE);
  const visible = posts.slice(0, visiblePages * PAGE_SIZE);

  return (
    <>
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <SectionHeading
          icon={Newspaper}
          action={
            <span className="text-muted-foreground text-sm tabular-nums">
              {visible.length} / {posts.length}
            </span>
          }
        >
          新着記事
        </SectionHeading>
        <PostsBand posts={visible} />
        {visiblePages < pageCount && (
          <div className="mt-8 flex justify-center">
            <Button
              variant="outline"
              onClick={() => setVisiblePages((value) => value + 1)}
            >
              さらに記事を表示
            </Button>
          </div>
        )}
      </section>

      {popular.length > 0 && (
        <section className="border-border border-t bg-card">
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
            <SectionHeading icon={TrendingUp}>
              よく読まれている記事
            </SectionHeading>
            <PostsBand posts={popular} />
          </div>
        </section>
      )}

      <section className="border-border border-t">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div>
            <SectionHeading icon={Hash}>タグから探す</SectionHeading>
            <ul className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <li key={tag.name}>
                  <Tag keyword={tag.name} count={tag.counts} size="md" />
                </li>
              ))}
            </ul>
          </div>
          <div>
            <SectionHeading icon={CalendarDays}>アーカイブ</SectionHeading>
            <div className="rounded-xl border border-border bg-card p-2">
              <YearMonthPosts items={dates} />
            </div>
          </div>
        </div>
      </section>

      <section className="border-border border-t bg-card">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
          <SectionHeading icon={UserRound}>著者について</SectionHeading>
          <div className="max-w-xl rounded-xl border border-border bg-background p-6">
            <Author />
          </div>
        </div>
      </section>
    </>
  );
}
