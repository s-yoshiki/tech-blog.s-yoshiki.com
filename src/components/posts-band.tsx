import { Posts } from '../types/entry.interface';
import Card from './card';

interface EntryBandProp {
  posts: Posts[];
}

const Band = (props: EntryBandProp) => {
  return (
    <div
      className="
      grid 
      grid-cols-1
      sm:grid-cols-2
      lg:grid-cols-3
      xl:grid-cols-4
      2xl:grid-cols-5
      gap-6
      p-4
      "
    >
      {props.posts.map((post, idx) => (
        <Card
          title={post.title}
          date={post.date}
          href={post.path}
          description={``}
          src={post.coverImage}
          tags={post.tags}
          key={idx}
        />
      ))}
    </div>
  );
};

export default Band;
