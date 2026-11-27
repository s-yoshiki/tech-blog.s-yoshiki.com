import { cx } from '@repo/ui';
import { Bot } from 'lucide-react';
import styles from './ai-generated-badge.module.css';

interface Props {
  compact?: boolean;
  className?: string;
}

/** A consistent disclosure for posts whose front matter has aiGenerated: true. */
export default function AIGeneratedBadge({ compact = false, className }: Props) {
  return (
    <span data-compact={compact || undefined} className={cx(styles.badge, className)}>
      <Bot aria-hidden="true" className={styles.icon} />
      <span>{compact ? 'AI生成' : 'AIで生成された記事'}</span>
    </span>
  );
}
