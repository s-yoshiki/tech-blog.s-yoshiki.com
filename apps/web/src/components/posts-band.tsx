import type { Posts } from '@repo/blog-content';
import { routes } from 'lib/routes';
import Card from './card';
import styles from './posts-band.module.css';

export const PostItem = ({ post }: { post: Posts }) => (
  <li className={styles.item}>
    <Card
      title={post.title}
      date={post.date}
      href={routes.post(post.path)}
      src={post.coverImage}
      tags={post.tags}
      aiGenerated={post.aiGenerated}
    />
  </li>
);

const Band = ({ posts }: { posts: Posts[] }) => (
  <ul className={styles.grid}>
    {posts.map((post) => (
      <PostItem key={post.path} post={post} />
    ))}
  </ul>
);

export default Band;
