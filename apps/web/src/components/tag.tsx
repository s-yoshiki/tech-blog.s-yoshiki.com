import { cx } from '@repo/ui';
import { getTagColor } from 'lib/tag-brand-colors';
import { routes } from 'lib/routes';
import Link from 'next/link';
import styles from './tag.module.css';

interface TagProps {
  keyword: string;
  /** shown after the label, e.g. the number of posts carrying this tag */
  count?: number;
  size?: 'sm' | 'md';
  className?: string;
}

/** A tag rendered as a native pill (no third-party badge images). */
export const TagPill = ({ keyword, count, size = 'sm', className }: TagProps) => {
  const color = getTagColor(keyword);
  return (
    <span data-size={size} className={cx(styles.pill, className)}>
      <span
        aria-hidden="true"
        className={styles.dot}
        style={color ? { backgroundColor: color } : undefined}
      />
      {keyword}
      {count !== undefined && <span className={styles.count}>{count}</span>}
    </span>
  );
};

/** A tag pill that links to the tag's archive. */
const Tag = ({ keyword, count, size, className }: TagProps) => (
  <Link href={routes.tag(keyword)} className={styles.link}>
    <TagPill keyword={keyword} count={count} size={size} className={className} />
  </Link>
);

export default Tag;
