import { type InputHTMLAttributes, forwardRef, useId } from 'react';
import { cn } from '@/lib/cn';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, id, className, ...props }, ref) => {
    const generatedId = useId();
    const inputId = id ?? generatedId;

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={inputId} className="text-text text-sm font-medium">
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${inputId}-error` : undefined}
          className={cn(
            'border-border bg-background text-text h-10 rounded-md border px-3 text-sm',
            'placeholder:text-muted',
            'focus-visible:ring-primary focus-visible:ring-2 focus-visible:outline-none',
            error && 'border-error focus-visible:ring-error',
            className,
          )}
          {...props}
        />
        {error && (
          <p id={`${inputId}-error`} className="text-error text-xs">
            {error}
          </p>
        )}
      </div>
    );
  },
);

Input.displayName = 'Input';
