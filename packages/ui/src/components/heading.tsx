import type { ComponentPropsWithoutRef } from 'react';
import { cx } from '../lib/cx';
import styles from './heading.module.css';

type HeadingProps = {
  /** Document outline level; independent of the visual `size`. */
  level: 1 | 2 | 3;
  /** Visual size. Defaults to the usual size for the level. */
  size?: 'sm' | 'lg' | 'xl';
} & ComponentPropsWithoutRef<'h1'>;

const defaultSize = { 1: 'xl', 2: 'sm', 3: 'sm' } as const;

/** Keeps the heading level (semantics) and its look (size) separate. */
export const Heading = ({ level, size, className, ...props }: HeadingProps) => {
  const Component = `h${level}` as const;
  return (
    <Component
      {...props}
      data-size={size ?? defaultSize[level]}
      className={cx(styles.heading, className)}
    />
  );
};
