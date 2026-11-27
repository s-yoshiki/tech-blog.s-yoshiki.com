import { cx, Heading, Stack } from '@repo/ui';
import type { LucideIcon } from 'lucide-react';
import type { ReactNode } from 'react';
import styles from './section-heading.module.css';

interface SectionHeadingProps {
  children: ReactNode;
  icon?: LucideIcon;
  /** rendered on the trailing edge, e.g. a count */
  action?: ReactNode;
  className?: string;
}

const SectionHeading = ({ children, icon: Icon, action, className }: SectionHeadingProps) => (
  <Stack
    direction="row"
    align="center"
    justify="between"
    gap={4}
    className={cx(styles.root, className)}
  >
    <Heading level={2} className={styles.title}>
      {Icon && <Icon aria-hidden="true" className={styles.icon} />}
      {children}
    </Heading>
    {action}
  </Stack>
);

export default SectionHeading;
