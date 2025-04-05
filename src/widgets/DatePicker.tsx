'use client';

import * as React from 'react';
import { format, getMonth, getYear, setMonth, setYear } from 'date-fns';
import { Control, useController } from 'react-hook-form';
import { Calendar as CalendarIcon } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import InfoIcon from '@/icons/InfoIcon';

interface DatePickerProps {
  name: string;
  label?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>;
  placeholder?: string;
  error?: string;
  mandatory?: boolean;
  startYear?: number;
  endYear?: number;
}

const DatePicker: React.FC<DatePickerProps> = ({
  name,
  label,
  control,
  mandatory = false,
  placeholder = 'Pick a date',
  error,
  startYear = getYear(new Date()) - 100,
  endYear = getYear(new Date()) + 100,
}) => {
  const {
    field: { value, onChange },
  } = useController({ name, control });

  const fallbackDate = new Date(endYear, 0, 1);
  const date = value ? new Date(value) : fallbackDate;

  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const years = Array.from({ length: endYear - startYear + 1 }, (_, i) => startYear + i);

  const handleMonthChange = (month: string) => {
    const newDate = setMonth(date, months.indexOf(month));
    onChange(newDate);
  };

  const handleYearChange = (year: string) => {
    const newDate = setYear(date, parseInt(year));
    onChange(newDate);
  };

  return (
    <div>
      <Popover>
        <div className='flex flex-col mt-2'>
          <Label className='mb-2.5'>
            {label}
            {mandatory && <span className='text-red-600 ml-1'>*</span>}
          </Label>
          <PopoverTrigger asChild>
            <Button
              variant='outline'
              className={cn(
                'w-full justify-start text-left font-normal',
                !value && 'text-muted-foreground',
              )}
            >
              <CalendarIcon className='mr-2 h-4 w-4' />
              {value ? format(date, 'PPP') : placeholder}
            </Button>
          </PopoverTrigger>
        </div>
        <PopoverContent className='w-auto p-0'>
          <div className='flex justify-between p-2'>
            <Select onValueChange={handleMonthChange} value={months[getMonth(date)]}>
              <SelectTrigger className='w-[110px]'>
                <SelectValue placeholder='Month' />
              </SelectTrigger>
              <SelectContent>
                {months.map((month) => (
                  <SelectItem key={month} value={month}>
                    {month}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select onValueChange={handleYearChange} value={getYear(date).toString()}>
              <SelectTrigger className='w-[110px]'>
                <SelectValue placeholder='Year' />
              </SelectTrigger>
              <SelectContent>
                {years.map((year) => (
                  <SelectItem key={year} value={year.toString()}>
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Calendar
            mode='single'
            selected={date}
            onSelect={onChange}
            initialFocus
            month={date}
            onMonthChange={onChange}
          />
        </PopoverContent>
      </Popover>
      {error && (
        <div className='flex items-center justify-start mt-1'>
          <InfoIcon size={14} className='text-red-600' />
          <p className='!ml-1 text-red-600 text-xs'>{error}</p>
        </div>
      )}
    </div>
  );
};

export default DatePicker;
