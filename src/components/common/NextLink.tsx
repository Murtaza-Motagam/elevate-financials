import Link from 'next/link';
import React from 'react';

const NextLink = ({ href = '', title = '', ...props }) => {
  return (
    <Link href={href} {...props}>
      {title}
    </Link>
  );
};

export default NextLink;
