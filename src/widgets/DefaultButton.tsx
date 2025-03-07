import { Button } from '@/components/ui/button';
import clsx from 'clsx';
import React from 'react';

interface DefaultBtnProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  title: string | undefined;
  loading?: boolean;
  className?: string;
  icon?: React.ReactNode;
  iconAlign?: string;
  variant?:
    | 'default'
    | 'destructive'
    | 'outline'
    | 'secondary'
    | 'ghost'
    | 'link'
    | null
    | undefined;
}

const DefaultButton: React.FC<DefaultBtnProps> = ({
  title = '',
  className = '',
  variant,
  icon,
  iconAlign,
  loading,
  ...rest
}) => {
  return (
    <Button
      variant={variant}
      className={clsx(
        'text-center',
        icon && 'flex items-center gap-x-1',
        loading && '!cursor-not-allowed',
        className,
      )}
      {...rest}
    >
      {iconAlign === 'right' ? (
        <>
          {title}
          {icon}
        </>
      ) : (
        <>
          {icon}
          {title}
        </>
      )}
    </Button>
  );
};

export default DefaultButton;
