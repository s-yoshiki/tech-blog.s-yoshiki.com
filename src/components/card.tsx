import Tag from 'components/tag';
import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

interface CardProps {
  src: string;
  title: string;
  date: string;
  href: string;
  tags: string[];
}

const getYMD = (arg: string) => arg.split(' ')[0];

/**
 * The cover images in this blog are technology logos, not photographs, so they
 * are shown contained in a small tile rather than cropped into a 16:9 banner —
 * a wide logo on a white background just rendered as an empty grey rectangle.
 */
const Card = ({ src, title, date, href, tags }: CardProps) => (
  <article className="group relative flex w-full gap-3.5 rounded-xl border border-border bg-card p-4 transition-colors hover:border-border-strong hover:bg-muted/40">
    <span className="grid size-11 shrink-0 place-items-center overflow-hidden rounded-lg border border-border bg-muted p-1.5">
      <img
        alt=""
        aria-hidden="true"
        className="size-full object-contain"
        src={src}
        loading="lazy"
        decoding="async"
      />
    </span>

    <div className="flex min-w-0 flex-1 flex-col">
      <div className="flex items-start justify-between gap-2">
        <time
          dateTime={getYMD(date)}
          className="text-muted-foreground text-xs tabular-nums"
        >
          {getYMD(date)}
        </time>
        <ArrowUpRight
          aria-hidden="true"
          className="size-3.5 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100"
        />
      </div>

      <h3 className="mt-1 font-semibold text-[15px] leading-snug tracking-tight">
        {/* Stretched so the whole card is the click target; the tag links below
            sit on a higher stacking context to stay independently clickable. */}
        <Link
          href={href}
          className="line-clamp-2 after:absolute after:inset-0 after:rounded-xl group-hover:text-primary"
        >
          {title}
        </Link>
      </h3>

      {tags.length > 0 && (
        <ul className="relative z-10 mt-3 flex flex-wrap gap-1.5">
          {tags.slice(0, 3).map((tag) => (
            <li key={tag}>
              <Tag keyword={tag} />
            </li>
          ))}
        </ul>
      )}
    </div>
  </article>
);

export default Card;
