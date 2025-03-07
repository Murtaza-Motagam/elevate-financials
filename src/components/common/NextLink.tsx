import clsx from 'clsx';
import Link from 'next/link';
import React from 'react';

interface NextLinkProps extends React.ComponentProps<typeof Link> {
  href: string;
  className?: string;
  children: React.ReactNode;
}

const NextLink: React.FC<NextLinkProps> = ({ href, className, children, ...props }) => {
  return (
    <Link
      href={href}
      className={clsx('hover:text-primary dark:hover:text-white', className)}
      {...props}>
      {children}
    </Link>
  );
};

export default NextLink;
