import type { TableOfContentsItem } from '@repo/blog-content';
import styles from './inline-table-of-contents.module.css';

/** Collapsible in-article TOC. A server component: <details> needs no JavaScript. */
const InlineTableOfContents = ({ items }: { items: TableOfContentsItem[] }) => {
  if (items.length === 0) return null;

  return (
    <nav aria-label="記事内目次" className={styles.nav}>
      <details open className={styles.details}>
        <summary className={styles.summary}>目次</summary>
        <ol className={styles.list}>
          {items.map((item) => (
            <li key={item.id}>
              <a href={`#${item.id}`} className={styles.link}>
                {item.label}
              </a>
            </li>
          ))}
        </ol>
      </details>
    </nav>
  );
};

export default InlineTableOfContents;
