import type { Posts } from '@repo/blog-content';
import PostsBand from 'components/posts-band';
import SectionHeading from 'components/section-heading';
import { cn } from '@repo/ui';
import type { LucideIcon } from 'lucide-react';
import type { ReactNode } from 'react';

interface PostsSectionProps {
  title: string;
  icon: LucideIcon;
  posts: Posts[];
  /** alternate (card-coloured) background to separate stacked sections */
  muted?: boolean;
  /** first section on a page has no top divider */
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
    <section className={cn(!first && 'border-border border-t', muted && 'bg-card')}>
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <SectionHeading icon={icon} action={action}>
          {title}
        </SectionHeading>
        <PostsBand posts={posts} />
        {children}
      </div>
    </section>
  ) : null;

export default PostsSection;
