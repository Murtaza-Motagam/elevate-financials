import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Control, useController } from 'react-hook-form';
import Button from '@/widgets/DefaultButton';
import { CalendarIcon } from '@radix-ui/react-icons';
import { dateTimeDisplay } from '@/lib/common';
import { Calendar } from '@/components/ui/calendar';
import { Label } from '@/components/ui/label';
import InfoIcon from '@/Icons/InfoIcon';

interface DatePickerProps {
  name: string;
  label?: string | undefined;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>;
  placeholder?: string;
  error?: string;
  mandatory?: boolean;
}

const DatePicker: React.FC<DatePickerProps> = ({
  name,
  label,
  control,
  mandatory = false,
  placeholder = 'Pick a date',
  error,
}) => {
  const {
    field: { value, onChange },
  } = useController({
    name,
    control,
  });

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
              className='w-full justify-start text-left font-normal'
              icon={<CalendarIcon />}
              title={value ? dateTimeDisplay(value as Date) : placeholder}
            />
          </PopoverTrigger>
        </div>
        <PopoverContent className='w-full' align='start'>
          <Calendar
            mode='single'
            selected={value as Date | undefined}
            onSelect={onChange as (date: Date | undefined) => void}
            initialFocus
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
