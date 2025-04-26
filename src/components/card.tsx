import Link from 'next/link';
import Badge from './badge';

interface CardProps {
  src: string;
  title: string;
  date: string;
  description: string;
  href: string;
  tags: string[];
}

const getYMD = (arg: string) => {
  return arg.split(' ')[0];
};

const Card = (props: CardProps) => {
  const tags = props.tags.slice(0, 3);
  return (
    <div className="mx-auto bg-white shadow-md border border-gray-200 rounded-lg items-stretch w-full">
      <div
        className="
          hidden
          sm:hidden
          md:hidden
          lg:block
          xl:block"
      >
        <a href={props.href}>
          <img
            alt={props.title}
            className="
              rounded-tl-lg
              rounded-tr-lg
              h-28
              max-h-28
            "
            src={props.src}
            width={480}
            height={200}
            style={{ objectFit: 'cover' }}
            onError={() => '/images/thumbnail/no-image.png'}
          />
        </a>
      </div>
      <div className="p-2">
        <div
          className="
            flex
            flex-wrap
            max-h-14
            "
        >
          <a href={props.href}>
            <span
              className="
                text-gray-800 
                font-semibold
                text-sm
                tracking-tight
                mb-1"
            >
              {props.title.slice(0, 45)}
              {props.title.length > 45 && '...'}
            </span>
          </a>
        </div>
        <div className="text-sm text-slate-500">{getYMD(props.date)}</div>
        <div
          className="
            flex
            flex-wrap"
        >
          {tags.map((tag: string, idx) => (
            <Link href={`/tags/${tag}/1`} passHref key={idx}>
              <a>
                <Badge keyword={tag} />
              </a>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Card;
