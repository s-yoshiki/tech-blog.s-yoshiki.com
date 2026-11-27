'use client';

import { useState } from 'react';

/** Progressive disclosure of a list, `pageSize` items at a time. */
export const useLoadMore = <T>(items: T[], pageSize: number) => {
  const [pages, setPages] = useState(1);
  const visible = items.slice(0, pages * pageSize);
  return {
    visible,
    hasMore: visible.length < items.length,
    loadMore: () => setPages((value) => value + 1),
  };
};
