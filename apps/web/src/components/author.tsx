import { Stack, Text } from '@repo/ui';
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
  <Stack gap={4}>
    <Stack direction="row" align="center" gap={3}>
      <span className={styles.avatar}>404</span>
      <div>
        <Text size="sm" weight="semibold">
          s-yoshiki
        </Text>
        <Text size="sm" tone="muted">
          ただの備忘録です。
        </Text>
      </div>
    </Stack>

    <Stack as="ul" direction="row" wrap gap={2}>
      {profiles.map((profile) => (
        <li key={profile.href}>
          <a href={profile.href} target="_blank" rel="noreferrer" className={styles.link}>
            {profile.label}
            <ExternalLink aria-hidden="true" className={styles.external} />
          </a>
        </li>
      ))}
    </Stack>

    <Text size="xs" tone="muted" className={styles.note}>
      <Link href="/terms/external-transmission/">※外部送信に関する公表事項</Link>
    </Text>
  </Stack>
);

export default Author;
