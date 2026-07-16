import * as React from 'react';
import { cn } from 'lib/utils';

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<'input'>>(
  ({ className, type, ...props }, ref) => (
    <input
      type={type}
      className={cn('flex h-11 w-full rounded-xl border border-input bg-background px-4 py-2 text-sm shadow-sm outline-none transition focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50', className)}
      ref={ref}
      {...props}
    />
  ),
);
Input.displayName = 'Input';

export { Input };
