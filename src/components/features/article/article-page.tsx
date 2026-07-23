import RelationAds from 'components/ads/relations-ads';
import Author from 'components/author';
import PostsBand from 'components/posts-band';
import Search from 'components/search';
import SectionHeading from 'components/section-heading';
import Tag from 'components/tag';
import YearMonthPosts from 'components/yesar-month-posts';
import {
  CalendarDays,
  ChevronRight,
  Clock3,
  Hash,
  Newspaper,
  Sparkles,
  TrendingUp,
  UserRound,
} from 'lucide-react';
import Link from 'next/link';
import type {
  IGroupByItems,
  IGroupByYearMonthItems,
  Posts,
} from 'types/entry.interface';
import TableOfContents from './table-of-contents';

type Article = Posts & { content: string; toc: string[] };

interface Props {
  post: Article;
  latest: Posts[];
  popular: Posts[];
  recommends: Posts[];
  tags: IGroupByItems[];
  dates: IGroupByYearMonthItems[];
}

/**
 * ~500 Japanese characters per minute. The rendered HTML is stripped first —
 * counting it raw made markup-heavy posts read as several times longer than
 * they are.
 */
const estimateReadingMinutes = (html: string): number => {
  const text = html
    .replace(/<(script|style)[\s\S]*?<\/\1>/gi, '')
    .replace(/<[^>]+>/g, '');
  return Math.max(1, Math.ceil(text.length / 500));
};

const ArticleCollection = ({
  title,
  icon,
  posts,
  muted = false,
}: {
  title: string;
  icon: typeof Newspaper;
  posts: Posts[];
  muted?: boolean;
}) =>
  posts.length ? (
    <section className={`border-border border-t ${muted ? 'bg-card' : ''}`}>
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <SectionHeading icon={icon}>{title}</SectionHeading>
        <PostsBand posts={posts} />
      </div>
    </section>
  ) : null;

export default function ArticlePage({
  post,
  latest,
  popular,
  recommends,
  tags,
  dates,
}: Props) {
  const readingMinutes = estimateReadingMinutes(post.content);
  const publishedOn = post.date.split(' ')[0];

  return (
    <article>
      <header className="border-border border-b">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14">
          <nav aria-label="パンくずリスト" className="mb-6">
            <ol className="flex items-center gap-1 text-muted-foreground text-sm">
              <li>
                <Link href="/" className="rounded hover:text-foreground">
                  Articles
                </Link>
              </li>
              <ChevronRight aria-hidden="true" className="size-3.5" />
              <li aria-current="page" className="truncate">
                {post.title}
              </li>
            </ol>
          </nav>

          <div className="flex items-start gap-4">
            <span className="hidden size-14 shrink-0 place-items-center overflow-hidden rounded-xl border border-border bg-muted p-2 sm:grid">
              <img
                alt=""
                aria-hidden="true"
                className="size-full object-contain"
                src={post.coverImage}
              />
            </span>
            <div className="min-w-0">
              <h1 className="max-w-3xl font-bold text-2xl leading-tight tracking-tight sm:text-4xl">
                {post.title}
              </h1>
              <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-muted-foreground text-sm">
                <span className="flex items-center gap-1.5">
                  <CalendarDays aria-hidden="true" className="size-4" />
                  <time dateTime={publishedOn}>{publishedOn}</time>
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock3 aria-hidden="true" className="size-4" />約{' '}
                  {readingMinutes} 分
                </span>
              </div>
            </div>
          </div>

          {post.tags.length > 0 && (
            <ul className="mt-6 flex flex-wrap gap-2">
              {post.tags.slice(0, 8).map((tag) => (
                <li key={tag}>
                  <Tag keyword={tag} size="md" />
                </li>
              ))}
            </ul>
          )}
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_240px]">
          <div className="min-w-0">
            {/* The HTML must be the direct child of .markdown-body: the rule
                that hides remark-toc's duplicate inline "目次" block targets
                `.markdown-body > h2:first-child`. */}
            <div
              className="markdown-body max-w-none"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
            <div className="mt-10">
              <RelationAds />
            </div>
          </div>
          <TableOfContents items={post.toc} />
        </div>
      </div>

      <section className="border-border border-t bg-card">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
          <div className="mx-auto mb-10 max-w-xl">
            <Search />
          </div>
          <SectionHeading icon={Sparkles}>おすすめの記事</SectionHeading>
          <PostsBand posts={recommends} />
        </div>
      </section>

      <ArticleCollection title="最新の記事" icon={Newspaper} posts={latest} />
      <ArticleCollection
        title="よく読まれている記事"
        icon={TrendingUp}
        posts={popular}
        muted
      />

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
    </article>
  );
}
