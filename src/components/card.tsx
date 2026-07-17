'use client';

import Link from 'next/link';
import Badge from './badge';
import { ArrowUpRight } from 'lucide-react';
import { Card as CardRoot, CardContent } from 'components/ui/card';

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
    <CardRoot className="group flex h-full flex-col overflow-hidden transition duration-300 hover:-translate-y-1 hover:border-primary/25 hover:shadow-lg">
      <Link href={props.href} className="block aspect-[16/9] overflow-hidden bg-muted">
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

      <CardContent className="flex flex-grow flex-col p-5">
        <div className="flex items-center gap-2 mb-2">
          <time className="text-xs font-medium text-muted-foreground">
            {getYMD(props.date)}
          </time>
        </div>

        <Link href={props.href} className="mb-5 flex items-start gap-2 transition-colors group-hover:text-primary">
          <h3 className="line-clamp-2 flex-1 text-lg font-bold leading-snug">
            {props.title}
          </h3>
          <ArrowUpRight className="mt-1 size-4 shrink-0 opacity-0 transition group-hover:opacity-100" />
        </Link>

        <div className="mt-auto flex flex-wrap gap-1.5 border-t pt-4">
          {tags.map((tag: string, idx: number) => (
            <Link href={`/tags/${tag}/1`} passHref key={idx} className="transition-opacity hover:opacity-80">
              <Badge keyword={tag} className="h-4" />
            </Link>
          ))}
        </div>
      </CardContent>
    </CardRoot>
  );
};

export default Card;
