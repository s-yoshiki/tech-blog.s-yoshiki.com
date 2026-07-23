import type { Posts } from 'types/entry.interface';
import Card from './card';

interface EntryBandProp {
  posts: Posts[];
}

const Band = ({ posts }: EntryBandProp) => (
  <ul className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
    {posts.map((post) => (
      <li key={post.path} className="flex">
        <Card
          title={post.title}
          date={post.date}
          href={post.path}
          src={post.coverImage}
          tags={post.tags}
        />
      </li>
    ))}
  </ul>
);

export default Band;
