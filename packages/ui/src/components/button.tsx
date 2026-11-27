import { Button as BaseButton } from '@base-ui/react/button';
import { cx } from '../lib/cx';
import styles from './button.module.css';

export type ButtonVariant = 'solid' | 'outline' | 'ghost' | 'link';
export type ButtonSize = 'sm' | 'md' | 'lg' | 'icon';

export interface ButtonProps extends Omit<BaseButton.Props, 'className'> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
}

/**
 * Pass `render={<Link href="…" />}` to render a link that looks like a button;
 * the native-button semantics are switched off automatically in that case.
 */
export const Button = ({
  variant = 'solid',
  size = 'md',
  className,
  render,
  nativeButton,
  ...props
}: ButtonProps) => (
  <BaseButton
    {...props}
    render={render}
    nativeButton={nativeButton ?? render === undefined}
    data-variant={variant}
    data-size={size}
    className={cx(styles.button, className)}
  />
);
