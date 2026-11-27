import type { ComponentPropsWithoutRef, ElementType } from 'react';
import { cx } from '../lib/cx';
import styles from './text.module.css';

type TextProps<T extends ElementType> = {
  as?: T;
  size?: 'xs' | 'sm' | 'base' | 'lg';
  tone?: 'default' | 'muted' | 'accent';
  weight?: 'regular' | 'medium' | 'semibold' | 'bold';
  /** tabular figures, for dates and counts */
  numeric?: boolean;
} & Omit<ComponentPropsWithoutRef<T>, 'as'>;

/** Body-level text: size, tone and weight come from the design tokens. */
export const Text = <T extends ElementType = 'p'>({
  as,
  size,
  tone,
  weight,
  numeric,
  className,
  ...props
}: TextProps<T>) => {
  const Component: ElementType = as ?? 'p';
  return (
    <Component
      {...props}
      data-size={size}
      data-tone={tone}
      data-weight={weight}
      data-numeric={numeric || undefined}
      className={cx(styles.text, className)}
    />
  );
};
