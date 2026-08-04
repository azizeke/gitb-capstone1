import { cn } from '@/lib/cn';

type SpinnerSize = 'sm' | 'md' | 'lg';

export interface SpinnerProps {
  size?: SpinnerSize;
  className?: string;
}

const sizeStyles: Record<SpinnerSize, string> = {
  sm: 'h-4 w-4 border-2',
  md: 'h-6 w-6 border-2',
  lg: 'h-10 w-10 border-[3px]',
};

export function Spinner({ size = 'md', className }: SpinnerProps) {
  return (
    <span
      role="status"
      aria-label="Yükleniyor"
      className={cn(
        'text-primary inline-block animate-spin rounded-full border-current border-t-transparent',
        sizeStyles[size],
        className,
      )}
    />
  );
}
