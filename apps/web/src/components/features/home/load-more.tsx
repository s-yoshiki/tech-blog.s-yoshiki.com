'use client';

import { Button } from '@repo/ui';
import bandStyles from 'components/posts-band.module.css';
import { Children, type ReactNode, useState } from 'react';
import styles from './home-page.module.css';

interface Props {
  pageSize: number;
  /** server-rendered `<li>` items; only the visible slice is mounted */
  children: ReactNode;
}

export default function LoadMore({ pageSize, children }: Props) {
  const [pages, setPages] = useState(1);
  const items = Children.toArray(children);
  const visible = items.slice(0, pages * pageSize);
  const hasMore = visible.length < items.length;

  return (
    <>
      <ul className={bandStyles.grid}>{visible}</ul>
      {hasMore && (
        <div className={styles.more}>
          <Button variant="outline" onClick={() => setPages((value) => value + 1)}>
            さらに記事を表示 ({visible.length} / {items.length})
          </Button>
        </div>
      )}
    </>
  );
}
