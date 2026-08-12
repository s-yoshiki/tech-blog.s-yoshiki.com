import { cn } from 'lib/utils';
import type { LucideIcon } from 'lucide-react';
import type { ReactNode } from 'react';

interface SectionHeadingProps {
  children: ReactNode;
  icon?: LucideIcon;
  /** rendered on the trailing edge, e.g. a "see all" link */
  action?: ReactNode;
  className?: string;
}

/**
 * Section titles used to render as a <div>, which left every page with a single
 * <h1> and no intermediate landmarks for screen readers.
 */
const SectionHeading = ({
  children,
  icon: Icon,
  action,
  className,
}: SectionHeadingProps) => (
  <div
    className={cn('mb-5 flex items-center justify-between gap-4', className)}
  >
    <h2 className="flex items-center gap-2 font-semibold text-[15px] text-foreground tracking-tight">
      {Icon && <Icon aria-hidden="true" className="size-4 text-primary" />}
      {children}
    </h2>
    {action}
  </div>
);

export default SectionHeading;
