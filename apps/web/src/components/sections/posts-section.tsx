import type { Posts } from '@repo/blog-content';
import Container from 'components/container';
import PostsBand from 'components/posts-band';
import SectionHeading from 'components/section-heading';
import type { LucideIcon } from 'lucide-react';
import type { ReactNode } from 'react';
import styles from './section.module.css';

interface PostsSectionProps {
  title: string;
  icon: LucideIcon;
  posts: Posts[];
  /** alternate background to separate stacked sections */
  muted?: boolean;
  /** the first section on a page has no top divider and is never deferred */
  first?: boolean;
  action?: ReactNode;
  children?: ReactNode;
}

/** A titled grid of post cards. Renders nothing when there are no posts. */
const PostsSection = ({
  title,
  icon,
  posts,
  muted = false,
  first = false,
  action,
  children,
}: PostsSectionProps) =>
  posts.length ? (
    <section
      className={styles.section}
      data-first={first || undefined}
      data-muted={muted || undefined}
      data-deferred={first ? undefined : ''}
    >
      <Container className={styles.inner}>
        <SectionHeading icon={icon} action={action}>
          {title}
        </SectionHeading>
        <PostsBand posts={posts} />
        {children}
      </Container>
    </section>
  ) : null;

export default PostsSection;
