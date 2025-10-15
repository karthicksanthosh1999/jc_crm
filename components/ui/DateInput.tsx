"use client";

import * as React from "react";
import { ChevronDownIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface DateInputProps {
  label?: string;
  value?: Date;
  onChange?: (date: Date | undefined) => void;
  name?: string;
  className?: string;
  placeholder?: string;
}

export const DateInput = React.forwardRef<HTMLButtonElement, DateInputProps>(
  (
    {
      label,
      value,
      onChange,
      name,
      className = "w-48",
      placeholder = "Select date",
    },
    ref
  ) => {
    const [open, setOpen] = React.useState(false);

    return (
      <div className="flex flex-col gap-3">
        {label && <Label htmlFor={name}>{label}</Label>}
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              ref={ref}
              id={name}
              variant="outline"
              className={`${className} justify-between font-normal`}>
              {value ? value.toLocaleDateString() : placeholder}
              <ChevronDownIcon className="ml-2 h-4 w-4 opacity-70" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto overflow-hidden p-0" align="start">
            <Calendar
              mode="single"
              selected={value}
              captionLayout="dropdown"
              onSelect={(date) => {
                onChange?.(date);
                setOpen(false);
              }}
            />
          </PopoverContent>
        </Popover>
      </div>
    );
  }
);
DateInput.displayName = "DateInput";
