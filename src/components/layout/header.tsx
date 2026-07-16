import { Github, Search } from 'lucide-react';
import Link from 'next/link';
import { Button } from 'components/ui/button';

interface HeaderProp { title: string }

const Header = ({ title }: HeaderProp) => (
  <header className="sticky top-0 z-50 border-b border-border/70 bg-background/90 backdrop-blur-xl">
    <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
      <Link href="/" className="flex items-center gap-3 font-bold tracking-tight">
        <span className="grid size-9 place-items-center rounded-xl bg-primary font-mono text-sm text-primary-foreground shadow-sm">404</span>
        <span className="hidden sm:inline">{title}</span>
      </Link>
      <nav className="flex items-center gap-1" aria-label="メインナビゲーション">
        <Button variant="ghost" size="sm" asChild><Link href="/">Articles</Link></Button>
        <Button variant="ghost" size="sm" asChild><Link href="/about/profile">About</Link></Button>
        <Button variant="ghost" size="icon" asChild>
          <a href="https://github.com/s-yoshiki" target="_blank" rel="noreferrer" aria-label="GitHub"><Github className="size-4" /></a>
        </Button>
        <Button variant="outline" size="icon" asChild><Link href="/#search" aria-label="記事を検索"><Search className="size-4" /></Link></Button>
      </nav>
    </div>
  </header>
);

export default Header;
