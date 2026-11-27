import Link from 'next/link';
import type { ReactNode } from 'react';
import Container from './container';
import styles from './page-header.module.css';

interface Props {
  title: string;
  /** a "← label" link back to the parent page */
  back?: { href: string; label: string };
  size?: 'wide' | 'narrow';
  /** rendered next to the title, e.g. a badge or a button */
  aside?: ReactNode;
  children?: ReactNode;
}

const PageHeader = ({ title, back, size = 'wide', aside, children }: Props) => (
  <header className={styles.header}>
    <Container size={size} className={styles.inner}>
      {back && (
        <nav aria-label="パンくずリスト" className={styles.back}>
          <Link href={back.href}>← {back.label}</Link>
        </nav>
      )}
      <div className={styles.row}>
        <h1 className={styles.title}>{title}</h1>
        {aside}
      </div>
      {children}
    </Container>
  </header>
);

export default PageHeader;
