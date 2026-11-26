'use client';

import type { TableOfContentsItem } from '@repo/blog-content';
import { useActiveHeading } from 'hooks/use-active-heading';

interface Props {
  items: TableOfContentsItem[];
  variant?: 'inline' | 'sidebar';
}

const TableOfContents = ({ items, variant = 'sidebar' }: Props) => {
  const active = useActiveHeading(items);

  if (items.length === 0) return null;

  if (variant === 'inline') {
    return (
      <nav
        aria-label="記事内目次"
        className="mb-10 rounded-xl border border-border bg-card p-5 shadow-sm sm:p-6"
      >
        <h2 className="mb-4 font-bold text-lg tracking-tight">目次</h2>
        <ol className="grid gap-1 sm:grid-cols-2 sm:gap-x-8">
          {items.map((item) => {
            const isActive = item.id === active;
            return (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  aria-current={isActive ? 'location' : undefined}
                  className={`block rounded-md px-3 py-2 text-sm transition-colors ${
                    isActive
                      ? 'bg-accent font-medium text-accent-foreground'
                      : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                  }`}
                >
                  {item.label}
                </a>
              </li>
            );
          })}
        </ol>
      </nav>
    );
  }

  return (
    <aside className="hidden lg:block">
      <nav
        aria-label="サイドバー目次"
        className="sticky top-[calc(var(--header-height)+1.5rem)] max-h-[calc(100vh-var(--header-height)-3rem)] overflow-y-auto"
      >
        <h2 className="mb-3 font-medium text-muted-foreground text-xs uppercase tracking-wider">
          目次
        </h2>
        <ol className="space-y-px border-border border-l text-sm">
          {items.map((item) => {
            const isActive = item.id === active;
            return (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  aria-current={isActive ? 'location' : undefined}
                  className={`-ml-px block border-l-2 py-1.5 pl-3 transition-colors ${
                    isActive
                      ? 'border-primary font-medium text-primary'
                      : 'border-transparent text-muted-foreground hover:border-border-strong hover:text-foreground'
                  }`}
                >
                  {item.label}
                </a>
              </li>
            );
          })}
        </ol>
      </nav>
    </aside>
  );
};

export default TableOfContents;
