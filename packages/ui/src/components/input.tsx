import { Input as BaseInput } from '@base-ui/react/input';
import { cx } from '../lib/cx';
import styles from './input.module.css';

export interface InputProps extends Omit<BaseInput.Props, 'className' | 'size'> {
  size?: 'md' | 'lg';
  className?: string;
}

export const Input = ({ size = 'md', className, ...props }: InputProps) => (
  <BaseInput {...props} data-size={size} className={cx(styles.input, className)} />
);
