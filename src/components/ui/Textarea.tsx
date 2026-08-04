import { type TextareaHTMLAttributes, forwardRef, useId } from 'react';
import { cn } from '@/lib/cn';

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, id, className, rows = 4, ...props }, ref) => {
    const generatedId = useId();
    const textareaId = id ?? generatedId;

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={textareaId} className="text-text text-sm font-medium">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          rows={rows}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${textareaId}-error` : undefined}
          className={cn(
            'border-border bg-background text-text rounded-md border px-3 py-2 text-sm',
            'placeholder:text-muted',
            'focus-visible:ring-primary focus-visible:ring-2 focus-visible:outline-none',
            error && 'border-error focus-visible:ring-error',
            className,
          )}
          {...props}
        />
        {error && (
          <p id={`${textareaId}-error`} className="text-error text-xs">
            {error}
          </p>
        )}
      </div>
    );
  },
);

Textarea.displayName = 'Textarea';
