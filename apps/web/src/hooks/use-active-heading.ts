'use client';

import type { TableOfContentsItem } from '@repo/blog-content';
import { useEffect, useState } from 'react';

/**
 * Returns the id of the heading currently in view. Uses IntersectionObserver
 * against a band just below the sticky header rather than scroll offsets, so it
 * stays correct regardless of section heights.
 */
export const useActiveHeading = (items: TableOfContentsItem[]): string | null => {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const headings = items
      .map(({ id }) => document.getElementById(id))
      .filter((element): element is HTMLElement => element !== null);
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .toSorted((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: '-15% 0px -70% 0px', threshold: 0 },
    );

    for (const heading of headings) observer.observe(heading);
    return () => observer.disconnect();
  }, [items]);

  return active;
};
