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
      md:grid-cols-2
      lg:grid-cols-3
      gap-6
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
