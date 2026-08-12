'use client';

import GithubIcon from 'components/icons/github';
import Search from 'components/search';
import { Button } from 'components/ui/button';
import { Search as SearchIcon } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import ThemeToggle from './theme-toggle';

interface HeaderProp {
  title: string;
}

const navItems = [
  { href: '/', label: 'Articles' },
  { href: '/about', label: 'About' },
];

const Header = ({ title }: HeaderProp) => {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-border border-b bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-(--header-height) max-w-7xl items-center gap-3 px-4 sm:px-6">
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2.5 rounded-lg font-semibold tracking-tight"
        >
          <span className="grid size-7 place-items-center rounded-lg bg-primary font-mono text-[11px] text-primary-foreground">
            404
          </span>
          <span className="hidden truncate text-sm sm:inline">{title}</span>
        </Link>

        <Search
          variant="compact"
          className="mx-auto hidden max-w-sm md:block"
        />

        <nav
          className="ml-auto flex items-center gap-0.5 md:ml-0"
          aria-label="メインナビゲーション"
        >
          {navItems.map((item) => {
            const isCurrent =
              item.href === '/'
                ? pathname === '/'
                : pathname.startsWith(item.href);
            return (
              <Button
                key={item.href}
                variant="ghost"
                size="sm"
                asChild
                className={isCurrent ? 'text-foreground' : undefined}
              >
                <Link
                  href={item.href}
                  aria-current={isCurrent ? 'page' : undefined}
                >
                  {item.label}
                </Link>
              </Button>
            );
          })}
          {/* The inline field is hidden below md, so keep a way in from mobile. */}
          <Button variant="ghost" size="icon" asChild className="md:hidden">
            <Link href="/#search" aria-label="記事を検索">
              <SearchIcon className="size-4" />
            </Link>
          </Button>
          <ThemeToggle />
          <Button variant="ghost" size="icon" asChild>
            <a
              href="https://github.com/s-yoshiki"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub (新しいタブで開く)"
            >
              <GithubIcon className="size-4" />
            </a>
          </Button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
