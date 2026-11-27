import type {
  IGroupByItems,
  IGroupByYearMonthItems,
  Posts,
  TableOfContentsItem,
} from '@repo/blog-content';
import RelationAds from 'components/ads/relations-ads';
import AIGeneratedBadge from 'components/ai-generated-badge';
import Container from 'components/container';
import PostsBand from 'components/posts-band';
import AuthorSection from 'components/sections/author-section';
import BrowseSection from 'components/sections/browse-section';
import PostsSection from 'components/sections/posts-section';
import Search from 'components/search';
import SectionHeading from 'components/section-heading';
import Tag from 'components/tag';
import {
  Bot,
  CalendarDays,
  ChevronRight,
  Clock3,
  Newspaper,
  Sparkles,
  TrendingUp,
  TriangleAlert,
} from 'lucide-react';
import Link from 'next/link';
import type { ReactNode } from 'react';
import styles from './article-page.module.css';
import InlineTableOfContents from './inline-table-of-contents';
import TableOfContents from './table-of-contents';
import ReadingProgress from './reading-progress';
import XEmbeds from './x-embeds';

type Article = Posts & {
  content: ReactNode;
  contentHtml?: string;
  readingText: string;
  toc: TableOfContentsItem[];
};

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
  const text = html.replace(/<(script|style)[\s\S]*?<\/\1>/gi, '').replace(/<[^>]+>/g, '');
  return Math.max(1, Math.ceil(text.length / 500));
};

const isOlderThanTwoYears = (publishedOn: string): boolean => {
  const threshold = new Date();
  threshold.setUTCFullYear(threshold.getUTCFullYear() - 2);
  return new Date(`${publishedOn}T00:00:00Z`) < threshold;
};

export default function ArticlePage({ post, latest, popular, recommends, tags, dates }: Props) {
  const readingMinutes = estimateReadingMinutes(post.readingText);
  const publishedOn = post.date.split(' ')[0];
  const isOlderArticle = isOlderThanTwoYears(publishedOn);

  return (
    <article>
      <ReadingProgress targetId="article-content" />
      <header className={styles.header}>
        <Container className={styles.headerInner}>
          <nav aria-label="パンくずリスト">
            <ol className={styles.crumbs}>
              <li>
                <Link href="/">Articles</Link>
              </li>
              <ChevronRight aria-hidden="true" className={styles.crumbIcon} />
              <li aria-current="page">{post.title}</li>
            </ol>
          </nav>

          <div className={styles.titleRow}>
            <span className={styles.cover}>
              <img alt="" aria-hidden="true" src={post.coverImage} width={40} height={40} />
            </span>
            <div>
              <h1 className={styles.title}>{post.title}</h1>
              <div className={styles.meta}>
                <span className={styles.metaItem}>
                  <CalendarDays aria-hidden="true" className={styles.metaIcon} />
                  <time dateTime={publishedOn}>{publishedOn}</time>
                </span>
                <span className={styles.metaItem}>
                  <Clock3 aria-hidden="true" className={styles.metaIcon} />約 {readingMinutes} 分
                </span>
              </div>
              {post.aiGenerated && (
                <div className={styles.badge}>
                  <AIGeneratedBadge />
                </div>
              )}
            </div>
          </div>

          {post.tags.length > 0 && (
            <ul className={styles.tags}>
              {post.tags.slice(0, 8).map((tag) => (
                <li key={tag}>
                  <Tag keyword={tag} size="md" />
                </li>
              ))}
            </ul>
          )}
        </Container>
      </header>

      <Container className={styles.layout}>
        <div className={styles.main}>
          {post.aiGenerated && (
            <aside aria-label="AI生成記事についての説明" className={styles.notice} data-tone="ai">
              <Bot aria-hidden="true" className={styles.noticeIcon} />
              <p>
                この記事は生成AIを活用して作成されています。内容は公開時点の情報をもとにしているため、
                最新の仕様や重要な判断については公式ドキュメントも確認してください。
              </p>
            </aside>
          )}
          {isOlderArticle && (
            <aside
              aria-label="古い記事についての注意"
              className={styles.notice}
              data-tone="warning"
            >
              <TriangleAlert aria-hidden="true" className={styles.noticeIcon} />
              <p>
                この記事は公開から2年以上経過しています。画面、料金、ライブラリや
                サービスの仕様が現在と異なる可能性があるため、公式資料も併せて確認してください。
              </p>
            </aside>
          )}
          <InlineTableOfContents items={post.toc} />
          {post.contentHtml === undefined ? (
            <div id="article-content" className={`markdown-body ${styles.content}`}>
              {post.content}
            </div>
          ) : (
            <div
              id="article-content"
              className={`markdown-body ${styles.content}`}
              dangerouslySetInnerHTML={{ __html: post.contentHtml }}
            />
          )}
          <XEmbeds containerId="article-content" />
          <div className={styles.ads}>
            <RelationAds />
          </div>
        </div>
        <TableOfContents items={post.toc} />
      </Container>

      <section className={styles.recommend}>
        <Container className={styles.recommendInner}>
          <div className={styles.searchWrap}>
            <Search />
          </div>
          <SectionHeading icon={Sparkles}>おすすめの記事</SectionHeading>
          <PostsBand posts={recommends} />
        </Container>
      </section>

      <PostsSection title="最新の記事" icon={Newspaper} posts={latest} />
      <PostsSection title="よく読まれている記事" icon={TrendingUp} posts={popular} muted />
      <BrowseSection tags={tags} dates={dates} />
      <AuthorSection />
    </article>
  );
}
