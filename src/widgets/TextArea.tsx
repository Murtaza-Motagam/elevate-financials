import { Label } from '@/components/ui/label';
import { InfoIcon } from 'lucide-react';
import React from 'react';

interface TextAreaFieldProps {
  id?: string;
  label: string;
  error?: string;
  mandatory?: boolean;
  placeholder?: string;
  parentClass?: string;
  disabled?: boolean;
  inputIcon?: React.ReactNode;
  rest?: Record<string, unknown>;
}

const TextAreaField: React.FC<TextAreaFieldProps> = ({
  id,
  label,
  error,
  placeholder,
  parentClass = '',
  mandatory = false,
  disabled,
  inputIcon,
  rest,
}) => {
  return (
    <div className={`space-y-2 ${parentClass}`}>
      {/* Label */}
      <Label htmlFor={id} className='dark:text-gray-300'>
        {label}
        {mandatory && <span className='text-red-600 ml-1'>*</span>}
      </Label>

      {/* Input field */}
      <div className='relative'>
        {inputIcon && <div className='absolute top-2.5 left-2'>{inputIcon}</div>}
        <textarea
          id={id}
          placeholder={placeholder}
          disabled={disabled}
          className={`w-full px-4 py-2 text-sm ${inputIcon ? 'pl-7' : ''} bg-transparent border rounded-md focus:outline-none ${
            error ? 'border-red-500' : 'border-gray-300'
          } ${disabled && 'bg-gray-300 dark:bg-gray-600'}`}
          {...rest}
        />
      </div>

      {/* Error Message */}
      {error && (
        <div className='flex items-center justify-start'>
          <InfoIcon size={14} className='text-red-600' />
          <p className='!ml-1 text-red-600 text-xs'>{error}</p>
        </div>
      )}
    </div>
  );
};

export default TextAreaField;
