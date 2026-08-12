import { getTagColor } from 'lib/tag-brand-colors';
import { cn } from 'lib/utils';
import Link from 'next/link';

interface TagProps {
  keyword: string;
  /** shown after the label, e.g. the number of posts carrying this tag */
  count?: number;
  size?: 'sm' | 'md';
  className?: string;
}

const sizes = {
  sm: 'h-6 gap-1.5 px-2 text-[11px]',
  md: 'h-7 gap-2 px-2.5 text-xs',
} as const;

/**
 * A tag rendered as a native pill. Previously these were <img> badges served by
 * img.shields.io, which meant one third-party request per tag (~45 on the home
 * page), no dark-mode support and layout shift while they loaded.
 */
export const TagPill = ({
  keyword,
  count,
  size = 'sm',
  className,
}: TagProps) => {
  const color = getTagColor(keyword);
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-md border border-border bg-muted font-medium text-muted-foreground transition-colors',
        sizes[size],
        className,
      )}
    >
      <span
        aria-hidden="true"
        className="size-1.5 shrink-0 rounded-full bg-current"
        style={color ? { backgroundColor: color } : undefined}
      />
      {keyword}
      {count !== undefined && (
        <span className="tabular-nums opacity-60">{count}</span>
      )}
    </span>
  );
};

/** A tag pill that links to the tag's archive. */
const Tag = ({ keyword, count, size, className }: TagProps) => (
  <Link
    href={`/tags/${encodeURIComponent(keyword)}/1`}
    className="inline-flex rounded-md"
  >
    <TagPill
      keyword={keyword}
      count={count}
      size={size}
      className={cn(
        'hover:border-border-strong hover:text-foreground',
        className,
      )}
    />
  </Link>
);

export default Tag;
