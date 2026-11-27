import type { ComponentPropsWithoutRef, ElementType } from 'react';
import { cx } from '../lib/cx';
import styles from './stack.module.css';

/** Spacing steps, matching `--space-N` in the design tokens. */
export type Space = 1 | 2 | 3 | 4 | 5 | 6 | 7;

type StackProps<T extends ElementType> = {
  as?: T;
  /** `column` stacks vertically (default), `row` lays children out inline */
  direction?: 'column' | 'row';
  gap?: Space;
  align?: 'start' | 'center' | 'end' | 'baseline';
  justify?: 'start' | 'center' | 'end' | 'between';
  wrap?: boolean;
} & Omit<ComponentPropsWithoutRef<T>, 'as'>;

/**
 * Flex layout primitive. Replaces hand-written `display: flex; gap: …` blocks.
 * When rendered as `ul`/`ol` the list markers and padding are reset.
 */
export const Stack = <T extends ElementType = 'div'>({
  as,
  direction = 'column',
  gap,
  align,
  justify,
  wrap,
  className,
  ...props
}: StackProps<T>) => {
  const Component: ElementType = as ?? 'div';
  return (
    <Component
      {...props}
      data-direction={direction}
      data-gap={gap}
      data-align={align}
      data-justify={justify}
      data-wrap={wrap || undefined}
      className={cx(styles.stack, className)}
    />
  );
};
