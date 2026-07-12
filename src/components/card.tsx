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
    <div className="group h-full bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 flex flex-col">
      <Link href={props.href} className="block aspect-video overflow-hidden">
        <img
          alt={props.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          src={props.src || '/images/thumbnail/no-image.png'}
          loading="lazy"
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/images/thumbnail/no-image.png';
          }}
        />
      </Link>

      <div className="p-4 flex flex-col flex-grow">
        <div className="flex items-center gap-2 mb-2">
          <time className="text-xs font-medium text-slate-500">
            {getYMD(props.date)}
          </time>
        </div>

        <Link href={props.href} className="block group-hover:text-blue-600 transition-colors mb-3">
          <h3 className="text-base font-bold text-slate-800 line-clamp-2 leading-snug">
            {props.title}
          </h3>
        </Link>

        <div className="mt-auto pt-3 border-t border-slate-50 flex flex-wrap gap-1">
          {tags.map((tag: string, idx: number) => (
            <Link href={`/tags/${tag}/1`} passHref key={idx} className="transition-opacity hover:opacity-80">
              <Badge keyword={tag} className="h-4" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Card;
