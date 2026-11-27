'use client';

import { Button } from '@repo/ui';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';

interface Props {
  href: string;
  children: ReactNode;
}

/** The only client piece of the header: it needs the pathname for aria-current. */
const NavLink = ({ href, children }: Props) => {
  const pathname = usePathname();
  const isCurrent = href === '/' ? pathname === '/' : pathname.startsWith(href);
  return (
    <Button
      variant="ghost"
      size="sm"
      data-current={isCurrent || undefined}
      render={<Link href={href} aria-current={isCurrent ? 'page' : undefined} />}
    >
      {children}
    </Button>
  );
};

export default NavLink;
