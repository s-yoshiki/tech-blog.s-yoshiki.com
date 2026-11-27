import Container from 'components/container';
import Link from 'next/link';
import styles from './footer.module.css';

interface FooterProp {
  title: string;
}

const links = {
  サイト: [
    { href: '/', label: 'Articles' },
    { href: '/about/', label: 'About' },
    { href: '/about/portfolio/', label: 'Portfolio' },
    { href: '/terms/external-transmission/', label: '外部送信に関する公表事項' },
  ],
  リンク: [
    { href: 'https://github.com/s-yoshiki', label: 'GitHub', external: true },
    { href: 'https://x.com/s_yoshiki_dev', label: 'X', external: true },
    { href: 'https://zenn.dev/s_yoshiki', label: 'Zenn', external: true },
    { href: 'https://qiita.com/s-yoshiki', label: 'Qiita', external: true },
  ],
};

const Footer = ({ title }: FooterProp) => (
  <footer className={styles.footer}>
    <Container className={styles.grid}>
      <div className={styles.brandCell}>
        <Link href="/" className={styles.brand}>
          <span className={styles.logo}>404</span>
          <span>{title}</span>
        </Link>
      </div>

      {Object.entries(links).map(([heading, items]) => (
        <nav key={heading} aria-label={heading}>
          <h2 className={styles.heading}>{heading}</h2>
          <ul className={styles.list}>
            {items.map((item) => (
              <li key={item.href}>
                {'external' in item ? (
                  <a href={item.href} target="_blank" rel="noreferrer">
                    {item.label}
                  </a>
                ) : (
                  <Link href={item.href}>{item.label}</Link>
                )}
              </li>
            ))}
          </ul>
        </nav>
      ))}
    </Container>

    <div className={styles.bottom}>
      <Container>
        <p className={styles.copyright}>© {new Date().getFullYear()} s-yoshiki</p>
      </Container>
    </div>
  </footer>
);

export default Footer;
