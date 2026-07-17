import { CalendarDays, Clock3 } from 'lucide-react';
import Link from 'next/link';
import RelationAds from 'components/ads/relations-ads';
import Author from 'components/author';
import Badge from 'components/badge';
import PostsBand from 'components/posts-band';
import Search from 'components/search';
import SectionHeading from 'components/section-heading';
import YearMonthPosts from 'components/yesar-month-posts';
import type { IGroupByItems, IGroupByYearMonthItems, Posts } from 'types/entry.interface';

type Article = Posts & { content: string; toc: string[] };
interface Props { post: Article; latest: Posts[]; popular: Posts[]; recommends: Posts[]; tags: IGroupByItems[]; dates: IGroupByYearMonthItems[] }

const TableOfContents = ({ items }: { items: string[] }) => <aside className="hidden lg:block"><div className="sticky top-24 rounded-2xl border bg-card p-6 shadow-sm"><h2 className="mb-4 text-sm font-bold uppercase tracking-wider">目次</h2><ol className="space-y-2 border-l text-sm">{items.map((item) => <li key={item}><a className="block border-l-2 border-transparent py-1 pl-4 text-muted-foreground transition hover:border-primary hover:text-primary" href={`#${item}`}>{item}</a></li>)}</ol></div></aside>;

const ArticleCollection = ({ title, posts, muted = false }: { title: string; posts: Posts[]; muted?: boolean }) => posts.length ? <section className={`border-t py-16 ${muted ? 'bg-card' : ''}`}><div className="mx-auto max-w-7xl px-4 sm:px-6"><SectionHeading>{title}</SectionHeading><PostsBand posts={posts} /></div></section> : null;

export default function ArticlePage({ post, latest, popular, recommends, tags, dates }: Props) {
  const readingMinutes = Math.ceil(post.content.length / 2000);
  return <article className="pt-12 sm:pt-16">
    <header className="mx-auto mb-12 max-w-4xl px-4 text-center sm:px-6"><div className="mb-6 flex flex-wrap justify-center gap-2">{post.tags.slice(0, 5).map((tag) => <Link href={`/tags/${tag}/1`} key={tag}><Badge keyword={tag} /></Link>)}</div><h1 className="mb-8 text-3xl font-bold leading-tight tracking-tight md:text-5xl">{post.title}</h1><div className="flex justify-center gap-6 text-sm text-muted-foreground"><span className="flex items-center gap-2"><CalendarDays className="size-4" />{post.date.split(' ')[0]}</span><span className="flex items-center gap-2"><Clock3 className="size-4" />{readingMinutes} min read</span></div></header>
    <div className="mx-auto mb-12 max-w-5xl px-4 sm:px-6"><img className="max-h-[540px] w-full rounded-2xl border object-cover shadow-xl shadow-slate-900/10" alt={post.title} src={post.coverImage} /></div>
    <div className="mx-auto max-w-7xl px-4 sm:px-6"><div className="grid items-start gap-10 lg:grid-cols-[minmax(0,900px)_280px]"><main className="min-w-0"><div className="rounded-2xl border bg-card p-6 shadow-sm md:p-10 lg:p-12"><div className="markdown-body max-w-none" dangerouslySetInnerHTML={{ __html: post.content }} /></div><div className="mt-8"><RelationAds /></div></main><TableOfContents items={post.toc} /></div></div>
    <div className="mt-20"><section className="border-t bg-card py-16"><div className="mx-auto max-w-7xl px-4 sm:px-6"><div className="mx-auto mb-10 max-w-xl"><Search /></div><SectionHeading>おすすめの記事</SectionHeading><PostsBand posts={recommends} /></div></section><ArticleCollection title="最新の記事" posts={latest} /><ArticleCollection title="よく読まれている記事" posts={popular} muted /><section className="border-t py-16"><div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 md:grid-cols-[1fr_2fr]"><div><SectionHeading>アーカイブ</SectionHeading><div className="rounded-2xl border bg-card p-6"><YearMonthPosts items={dates} /></div></div><div><SectionHeading>カテゴリー</SectionHeading><div className="flex flex-wrap gap-2">{tags.map((tag) => <Link href={`/tags/${tag.name}/1`} key={tag.name} className="flex items-center rounded-full border bg-card px-2 py-1"><Badge keyword={tag.name} /><span className="pr-2 text-xs text-muted-foreground">{tag.counts}</span></Link>)}</div></div></div></section><section className="border-t bg-card py-16"><div className="mx-auto max-w-4xl px-4 sm:px-6"><SectionHeading>著者について</SectionHeading><div className="rounded-2xl border bg-background p-8"><Author /></div></div></section></div>
  </article>;
}
