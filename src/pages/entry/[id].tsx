import RelationAds from 'components/ads/relations-ads';
import SidebarAds from 'components/ads/sidebar-ads';
import Author from 'components/author';
import Badge from 'components/badge';
import Layout from 'components/layout/layout';
import PostsBand from 'components/posts-band';
import Search from 'components/search';
import YearMonthPosts from 'components/yesar-month-posts';
import SectionHeading from 'components/section-heading';
import { search as searchEventHandler } from 'lib/inner-search';
import { InferGetStaticPropsType, NextPage } from 'next';
import Link from 'next/link';
import React from 'react';
import markdownToHtml from 'utils/md';
import PostsManager from 'utils/posts-manager';

type Props = InferGetStaticPropsType<typeof getStaticProps>;

export const getStaticPaths = async () => {
  const posts = PostsManager.getData();
  const result = {
    paths: posts.map((post: any) => {
      return {
        params: {
          id: post.path.split('/').pop(),
        },
      };
    }),
    fallback: false,
  };
  return result;
};

export const getStaticProps = async ({ params }: any) => {
  const allPosts = PostsManager.getData().slice(0, 15);
  const tags = PostsManager.getCountsGroupByTags().slice(0, 50);
  const dates = PostsManager.getCountsGroupYearMonth();
  const popular = PostsManager.getPopularPosts().slice(0, 10);
  const post = PostsManager.findByPath(`/entry/${params.id}`);
  const contentObj = await markdownToHtml({
    filepath: post.filepath,
    baseImagePath: post.path,
  });
  const recommends = PostsManager.getRecommendsPosts(post.tags, 15);
  return {
    props: {
      post: {
        ...post,
        content: contentObj.html,
        toc: contentObj.toc,
      },
      allPosts,
      popular,
      tags,
      dates,
      recommends,
    },
  };
};

const DateFormat = ({ value }: { value: string }) => {
  return <>{value.split(' ')[0]}</>;
};

const EstimatedReading = ({ value }: { value: string }) => {
  const min = Math.ceil(value.length / 2000);
  return <span>{min} min read</span>;
};

const Sidebar = ({ children }: any) => {
  return (
    <div className="w-full">
      <div className="sticky top-24">
        {children}
        <div className="pt-6">
          <SidebarAds />
        </div>
      </div>
    </div>
  );
};

const RightSidebar = ({ toc }: any) => {
  return (
    <Sidebar>
      <div className="rounded-2xl border bg-card p-6 shadow-sm">
        <h3 className="text-sm font-bold text-slate-800 mb-4 uppercase tracking-wider">目次</h3>
        <div className="max-h-[70vh] overflow-y-auto pr-2 custom-scrollbar">
          <ol className="space-y-2 text-sm">
            {toc?.map((tocItem: string, idx: number) => (
              <li key={idx} className="text-slate-600 hover:text-blue-600 transition-colors">
                <a href={`#${tocItem}`} className="block py-1 line-clamp-2">{tocItem}</a>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </Sidebar>
  );
};

const RelationContents = ({
  allPosts,
  tags,
  dates,
  popular,
  recommends,
}: any) => {
  return (
    <div className="mt-20">
      {recommends && (
        <div className="py-16 bg-slate-50 border-y border-slate-100">
          <div className="container mx-auto px-4">
            <div className="max-w-xl mx-auto mb-10">
              <Search onClick={searchEventHandler} />
            </div>
            <SectionHeading>Recommended for you</SectionHeading>
            <PostsBand posts={recommends} />
          </div>
        </div>
      )}
      {allPosts && (
        <div className="py-16 bg-white border-b border-slate-100">
          <div className="container mx-auto px-4">
            <SectionHeading>Latest Articles</SectionHeading>
            <PostsBand posts={allPosts} />
          </div>
        </div>
      )}
      {popular && (
        <div className="py-16 bg-slate-50 border-b border-slate-100">
          <div className="container mx-auto px-4">
            <SectionHeading>Popular Now</SectionHeading>
            <PostsBand posts={popular} />
          </div>
        </div>
      )}

      <div className="py-16 bg-white border-b border-slate-100">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-12">
            {dates && (
              <div className="md:w-1/3">
                <SectionHeading>Archive</SectionHeading>
                <div className="bg-slate-50 rounded-xl p-6">
                  <YearMonthPosts items={dates} />
                </div>
              </div>
            )}
            {tags && (
              <div className="md:w-2/3">
                <SectionHeading>Categories</SectionHeading>
                <div className="flex flex-wrap gap-2">
                  {tags.map((el: any, idx: number) => {
                    return (
                      <Link href={`/tags/${el.name}/1`} passHref key={idx}>
                        <div className="flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1.5 hover:bg-slate-200 transition-colors border border-slate-200">
                          <Badge keyword={el.name} className="h-4" />
                          <span className="text-xs font-semibold text-slate-600">{el.counts}</span>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="py-16 bg-slate-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <SectionHeading>About the Author</SectionHeading>
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
            <Author />
          </div>
        </div>
      </div>
    </div>
  );
};

const Post: NextPage<Props> = ({
  post,
  allPosts,
  tags,
  dates,
  popular,
  recommends,
}) => {
  return (
    <Layout title={post.title} image={post.coverImage} description={post.title}>
      <article className="pt-12 sm:pt-16">
        <div className="mx-auto mb-12 max-w-4xl px-4 text-center sm:px-6">
          <div className="flex flex-wrap justify-center gap-2 mb-6">
            {post.tags?.slice(0, 5).map((tag: string, idx: number) => (
              <Link href={`/tags/${tag}/1`} key={idx}>
                <Badge keyword={tag} className="h-5" />
              </Link>
            ))}
          </div>

          <h1 className="mb-8 text-3xl font-bold leading-tight tracking-tight text-foreground md:text-5xl">
            {post.title}
          </h1>

          <div className="flex items-center justify-center gap-6 text-slate-500 font-medium text-sm">
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <DateFormat value={post.date} />
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <EstimatedReading value={post.content} />
            </div>
          </div>
        </div>

        <div className="mx-auto mb-12 max-w-5xl px-4 sm:px-6">
          <img
            className="max-h-[540px] w-full rounded-2xl border object-cover shadow-xl shadow-slate-900/10"
            alt={post.title}
            src={post.coverImage}
            loading="eager"
          />
        </div>

        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,760px)_260px]">
            <main className="min-w-0">
              <div className="rounded-2xl border bg-card p-6 shadow-sm md:p-10 lg:p-12">
                <div className="markdown-body prose prose-slate max-w-none" dangerouslySetInnerHTML={{ __html: post.content }}></div>
              </div>
              <div className="mt-8">
                <RelationAds />
              </div>
            </main>

            <aside className="hidden lg:block">
              <RightSidebar toc={post.toc} />
            </aside>
          </div>
        </div>

        <RelationContents
          allPosts={allPosts}
          tags={tags}
          dates={dates}
          popular={popular}
          recommends={recommends}
        />
      </article>
    </Layout>
  );
};

export default Post;
