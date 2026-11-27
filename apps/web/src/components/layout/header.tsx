import { Button } from '@repo/ui';
import Container from 'components/container';
import GithubIcon from 'components/icons/github';
import XIcon from 'components/icons/x';
import Search from 'components/search';
import { Search as SearchIcon } from 'lucide-react';
import Link from 'next/link';
import styles from './header.module.css';
import NavLink from './nav-link';
import ThemeToggle from './theme-toggle';

interface HeaderProp {
  title: string;
}

const navItems = [
  { href: '/', label: 'Articles' },
  { href: '/about/', label: 'About' },
];

const Header = ({ title }: HeaderProp) => (
  <header className={styles.header}>
    <Container className={styles.inner}>
      <Link href="/" className={styles.brand}>
        <span className={styles.logo}>404</span>
        <span className={styles.title}>{title}</span>
      </Link>

      <Search variant="compact" className={styles.search} />

      <nav className={styles.nav} aria-label="メインナビゲーション">
        {navItems.map((item) => (
          <NavLink key={item.href} href={item.href}>
            {item.label}
          </NavLink>
        ))}
        {/* The inline field is hidden on small screens, so keep a way in. */}
        <Button
          variant="ghost"
          size="icon"
          className={styles.mobileSearch}
          render={<Link href="/#search" aria-label="記事を検索" />}
        >
          <SearchIcon size={16} />
        </Button>
        <ThemeToggle />
        <Button
          variant="ghost"
          size="icon"
          className={styles.hideOnMobile}
          render={
            <a
              href="https://x.com/s_yoshiki_dev"
              target="_blank"
              rel="noreferrer"
              aria-label="X (新しいタブで開く)"
            />
          }
        >
          <XIcon width={16} height={16} />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          render={
            <a
              href="https://github.com/s-yoshiki"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub (新しいタブで開く)"
            />
          }
        >
          <GithubIcon width={16} height={16} />
        </Button>
      </nav>
    </Container>
  </header>
);

export default Header;
