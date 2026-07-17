'use client';

import { ArrowDown, BookOpen } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import Author from 'components/author';
import Badge from 'components/badge';
import PostsBand from 'components/posts-band';
import Search from 'components/search';
import SectionHeading from 'components/section-heading';
import { Button } from 'components/ui/button';
import YearMonthPosts from 'components/yesar-month-posts';
import { search } from 'lib/inner-search';
import type { IGroupByItems, IGroupByYearMonthItems, Posts } from 'types/entry.interface';

const PAGE_SIZE = 15;
interface Props { posts: Posts[]; popular: Posts[]; tags: IGroupByItems[]; dates: IGroupByYearMonthItems[] }

export default function HomePage({ posts, popular, tags, dates }: Props) {
  const [visiblePages, setVisiblePages] = useState(1);
  const pageCount = Math.ceil(posts.length / PAGE_SIZE);
  return <>
    <section className="border-b bg-card"><div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-3xl text-center"><div className="mb-5 inline-flex items-center gap-2 rounded-full border bg-background px-3 py-1 text-sm text-muted-foreground"><BookOpen className="size-4 text-primary" />Engineering notes & experiments</div><h1 className="text-4xl font-bold tracking-tight sm:text-6xl">つくって、壊して、<br className="hidden sm:block" /><span className="text-primary">わかったこと。</span></h1><p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">Web開発、クラウド、インフラを中心に、実装で得た知見を再現できる形で記録しています。</p></div>
      <div className="mx-auto mt-10 max-w-2xl"><Search onClick={search} /></div>
    </div></section>
    <section className="py-16 sm:py-20"><div className="mx-auto max-w-7xl px-4 sm:px-6"><SectionHeading>新着記事</SectionHeading><PostsBand posts={posts.slice(0, visiblePages * PAGE_SIZE)} />{visiblePages < pageCount && <div className="mt-10 text-center"><Button variant="outline" size="lg" onClick={() => setVisiblePages((value) => value + 1)}>さらに記事を表示 <ArrowDown className="size-4" /> ({visiblePages} / {pageCount})</Button></div>}</div></section>
    <section className="border-y bg-card py-16"><div className="mx-auto max-w-7xl px-4 sm:px-6"><SectionHeading>よく読まれている記事</SectionHeading><PostsBand posts={popular} /></div></section>
    <section className="py-16"><div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_2fr]"><div><SectionHeading>アーカイブ</SectionHeading><div className="rounded-2xl border bg-card p-6 shadow-sm"><YearMonthPosts items={dates} /></div></div><div><SectionHeading>タグから探す</SectionHeading><div className="flex flex-wrap gap-2">{tags.map((tag) => <Link href={`/tags/${tag.name}/1`} key={tag.name} className="flex items-center rounded-full border bg-card px-2 py-1"><Badge keyword={tag.name} /><span className="pr-2 text-xs text-muted-foreground">{tag.counts}</span></Link>)}</div></div></div></section>
    <section className="border-t bg-card py-16"><div className="mx-auto max-w-4xl px-4 sm:px-6"><SectionHeading>著者について</SectionHeading><div className="rounded-2xl border bg-background p-8"><Author /></div></div></section>
  </>;
}
