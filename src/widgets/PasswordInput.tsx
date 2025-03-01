'use client';
import { Label } from '@/components/ui/label';
import { Input as Inputs } from '@/components/ui/input';
import React, { useState } from 'react';
import EyeOpen from '@/icons/EyeOpen';
import EyeClose from '@/icons/EyeClose';
import InfoIcon from '@/icons/InfoIcon';

interface passwordProps {
  label?: string;
  placeholder?: string;
  error?: string;
  parentClassName?: string;
  rest?: Record<string, unknown>;
  mandatory?: boolean;
}

const PasswordInput: React.FC<passwordProps> = ({
  label,
  placeholder,
  error,
  parentClassName,
  mandatory,
  rest,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    setIsVisible((prev) => !prev);
  };

  return (
    <div className={`grid w-full items-center gap-1.5 ${parentClassName}`}>
      <Label className='dark:text-gray-300' htmlFor={label}>
        {label} {mandatory && <span className='text-red-600'>*</span>}
      </Label>
      <div className='relative'>
        <Inputs
          className={`${error ? 'border-2 border-red-500' : ''
            } text-sm focus:!outline-none focus:ring-0 focus:border-none`}
          placeholder={placeholder}
          type={isVisible ? 'text' : 'password'}
          {...rest}
        />
        <button
          type='button'
          onClick={toggleVisibility}
          className='absolute right-2 top-1/2 transform -translate-y-1/2'
        >
          {isVisible ? (
            <EyeOpen size={17} className='text-gray-500 hover:text-gray-800' />
          ) : (
            <EyeClose size={17} className='text-gray-500 hover:text-gray-800' />
          )}
        </button>
      </div>
      {error && (
        <div className='flex items-center justify-start'>
          <InfoIcon size={14} className='text-red-600' />
          <p className='!ml-1 text-red-600 text-xs'>{error}</p>
        </div>
      )}
    </div>
  );
};

export default PasswordInput;
