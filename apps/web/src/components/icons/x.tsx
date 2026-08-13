import type { SVGProps } from 'react';

/** lucide-react no longer ships brand marks, so the X logo is inlined. */
const XIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 16 16"
    fill="currentColor"
    aria-hidden="true"
    focusable="false"
    {...props}
  >
    <path d="M9.53 6.85 15.17 0h-1.34l-4.9 5.95L5.02 0H0l5.92 8.9L0 16h1.34l5.18-6.28L10.98 16H16L9.53 6.85Zm-1.83 2.22-.6-.87L1.83 1.04h2.06l3.85 5.58.6.87 5.01 7.26h-2.06L7.7 9.07Z" />
  </svg>
);

export default XIcon;
