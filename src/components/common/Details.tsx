import React from 'react';

const Details = ({
  title = '',
  text = '',
  icon,
  className = '',
  innerClass = '',
}: {
  title: string;
  text: string;
  icon?: React.ReactNode;
  className?: string;
  innerClass?: string;
}) => {
  return (
    <div
      className={`flex flex-col items-start space-y-0.5 p-3 rounded-[5px] bg-gray-200 dark:bg-gray-900 ${className}`}
    >
      <p className={` ${icon && 'flex items-center gap-x-1'} text-xs text-primary font-bold`}>
        {icon} {title}
      </p>
      <h2 className={`text-sm font-medium ml-4 ${innerClass}`}>{text}</h2>
    </div>
  );
};

export default Details;
