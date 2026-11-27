import { cx } from '@repo/ui';
import type { ComponentPropsWithoutRef, ElementType } from 'react';
import styles from './container.module.css';

type Props<T extends ElementType> = {
  as?: T;
  /** `wide` for index pages, `narrow` for long-form reading */
  size?: 'wide' | 'narrow';
} & Omit<ComponentPropsWithoutRef<T>, 'as'>;

/** Centred, gutter-padded page column. */
const Container = <T extends ElementType = 'div'>({
  as,
  size = 'wide',
  className,
  ...props
}: Props<T>) => {
  const Component: ElementType = as ?? 'div';
  return <Component {...props} data-size={size} className={cx(styles.container, className)} />;
};

export default Container;
