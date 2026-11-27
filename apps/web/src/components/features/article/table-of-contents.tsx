'use client';

import type { TableOfContentsItem } from '@repo/blog-content';
import { useActiveHeading } from 'hooks/use-active-heading';
import styles from './table-of-contents.module.css';

/** Sticky side TOC that highlights the heading currently in view (wide screens only). */
const TableOfContents = ({ items }: { items: TableOfContentsItem[] }) => {
  const active = useActiveHeading(items);

  if (items.length === 0) return null;

  return (
    <aside className={styles.aside}>
      <nav aria-label="サイドバー目次" className={styles.sticky}>
        <h2 className={styles.heading}>目次</h2>
        <ol className={styles.list}>
          {items.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                aria-current={item.id === active ? 'location' : undefined}
                className={styles.link}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ol>
      </nav>
    </aside>
  );
};

export default TableOfContents;
