import type { HTMLAttributes } from 'react';
import { cn } from '@/lib/cn';

/** Loading state'lerinde içerik yerine gösterilen placeholder blok. */
export function Skeleton({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('bg-border animate-pulse rounded-md', className)}
      aria-hidden="true"
      {...props}
    />
  );
}
