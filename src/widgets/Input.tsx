import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { InfoIcon } from 'lucide-react';
import React from 'react';

interface InputFieldProps {
  id?: string;
  label: string;
  error?: string;
  mandatory?: boolean;
  placeholder?: string;
  type?: string;
  parentClass?: string;
  disabled?: boolean;
  rest?: Record<string, unknown>;
}

const InputField: React.FC<InputFieldProps> = ({
  id,
  label,
  error,
  placeholder,
  parentClass = '',
  mandatory = false,
  type,
  disabled,
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
      <Input
        id={id}
        type={type}
        placeholder={placeholder}
        disabled={disabled}
        className={`w-full px-4 py-2 text-sm border rounded-md focus:outline-none ${
          error ? 'border-red-500' : 'border-gray-300'
        } ${disabled && 'bg-gray-300 dark:bg-gray-600'}`}
        {...rest}
      />

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

export default InputField;
