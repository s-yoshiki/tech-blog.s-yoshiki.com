import type { IGroupByItems, IGroupByYearMonthItems, Posts } from '@repo/blog-content';
import Container from 'components/container';
import { PostItem } from 'components/posts-band';
import SectionHeading from 'components/section-heading';
import AuthorSection from 'components/sections/author-section';
import BrowseSection from 'components/sections/browse-section';
import PostsSection from 'components/sections/posts-section';
import sectionStyles from 'components/sections/section.module.css';
import { Newspaper, TrendingUp } from 'lucide-react';
import LoadMore from './load-more';

const PAGE_SIZE = 15;

interface Props {
  posts: Posts[];
  popular: Posts[];
  tags: IGroupByItems[];
  dates: IGroupByYearMonthItems[];
}

export default function HomePage({ posts, popular, tags, dates }: Props) {
  return (
    <>
      <section className={sectionStyles.section} data-first="">
        <Container className={sectionStyles.inner}>
          <SectionHeading icon={Newspaper}>新着記事</SectionHeading>
          <LoadMore pageSize={PAGE_SIZE}>
            {posts.map((post) => (
              <PostItem key={post.path} post={post} />
            ))}
          </LoadMore>
        </Container>
      </section>
      <PostsSection title="よく読まれている記事" icon={TrendingUp} posts={popular} muted />
      <BrowseSection tags={tags} dates={dates} />
      <AuthorSection />
    </>
  );
}
