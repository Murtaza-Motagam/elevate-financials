import React, { useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { Controller } from "react-hook-form";
import InfoIcon from "@/Icons/InfoIcon";

interface Option {
  value: string;
  label: string;
}

interface SingleSelectProps {
  name: string; // Form field name
  control: any; // React Hook Form control
  options: Option[];
  label?: string;
  placeholder?: string;
  error?: string;
  dropdownClasses?: string;
  searchError?: string;
}

const SingleSelect: React.FC<SingleSelectProps> = ({
  name,
  control,
  options,
  label,
  placeholder = "Select an option...",
  error,
  dropdownClasses,
  searchError,
}) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col mt-2">
      {label && <Label htmlFor={name} className='mb-2.5'>{label}</Label>}
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  className="w-full justify-between"
                >
                  {field.value
                    ? field.value // Directly show the selected label
                    : placeholder}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className={`w-[200px] p-0 ${dropdownClasses}`}>
                <Command>
                  <CommandInput placeholder="Search..." />
                  <CommandList>
                    <CommandEmpty>{searchError}</CommandEmpty>
                    <CommandGroup>
                      {options.map((option) => (
                        <CommandItem
                          key={option.value}
                          onSelect={() => {
                            field.onChange(option.label); // Set field value to the label
                            setOpen(false);
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              field.value === option.label ? "opacity-100" : "opacity-0" // Compare with the label
                            )}
                          />
                          {option.label}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
            {error && (
              <div className="flex items-center justify-start mt-1">
                <InfoIcon size={14} className="text-red-600" />
                <p className="!ml-1 text-red-600 text-xs">{error}</p>
              </div>
            )}
          </>
        )}
      />
    </div>
  );
};

export default SingleSelect;
