import { type InputHTMLAttributes, forwardRef, useId } from 'react';
import { cn } from '@/lib/cn';

export interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, id, className, ...props }, ref) => {
    const generatedId = useId();
    const checkboxId = id ?? generatedId;

    return (
      <div className="flex items-center gap-2">
        <input
          ref={ref}
          type="checkbox"
          id={checkboxId}
          className={cn(
            'border-border text-primary h-4 w-4 rounded',
            'focus-visible:ring-primary focus-visible:ring-2 focus-visible:outline-none',
            className,
          )}
          {...props}
        />
        <label htmlFor={checkboxId} className="text-text text-sm">
          {label}
        </label>
      </div>
    );
  },
);

Checkbox.displayName = 'Checkbox';
