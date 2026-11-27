import { ExternalLink } from 'lucide-react';
import Link from 'next/link';
import styles from './author.module.css';

const profiles = [
  { label: 'GitHub', href: 'https://github.com/s-yoshiki' },
  { label: 'X', href: 'https://x.com/s_yoshiki_dev' },
  { label: 'Zenn', href: 'https://zenn.dev/s_yoshiki' },
  { label: 'Qiita', href: 'https://qiita.com/s-yoshiki' },
];

const Author = () => (
  <div className={styles.root}>
    <div className={styles.identity}>
      <span className={styles.avatar}>404</span>
      <div>
        <p className={styles.name}>s-yoshiki</p>
        <p className={styles.bio}>ただの備忘録です。</p>
      </div>
    </div>

    <ul className={styles.links}>
      {profiles.map((profile) => (
        <li key={profile.href}>
          <a href={profile.href} target="_blank" rel="noreferrer" className={styles.link}>
            {profile.label}
            <ExternalLink aria-hidden="true" className={styles.external} />
          </a>
        </li>
      ))}
    </ul>

    <p className={styles.note}>
      <Link href="/terms/external-transmission/">※外部送信に関する公表事項</Link>
    </p>
  </div>
);

export default Author;
