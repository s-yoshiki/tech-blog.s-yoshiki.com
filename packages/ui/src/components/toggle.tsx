import { Toggle as BaseToggle } from '@base-ui/react/toggle';
import { cx } from '../lib/cx';
import buttonStyles from './button.module.css';

export interface ToggleProps extends Omit<BaseToggle.Props, 'className'> {
  className?: string;
}

/** An icon-sized toggle button; reuses the ghost button look. */
export const Toggle = ({ className, ...props }: ToggleProps) => (
  <BaseToggle
    {...props}
    data-variant="ghost"
    data-size="icon"
    className={cx(buttonStyles.button, className)}
  />
);
