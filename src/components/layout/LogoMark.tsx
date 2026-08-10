import { Globe2 } from 'lucide-react';
import { cn } from '@/lib/cn';

export interface LogoMarkProps {
  className?: string;
}

/**
 * "Global IT" markasının küçük ikon rozeti — lucide-react'in ikon setinden
 * (sitenin geri kalanında kullandığımız aynı setten, tutarlılık için)
 * bir "globe" ikonu, gradient bir arka plan üzerinde. Marka/logo görseli
 * değil, tamamen kendi tasarımımız.
 */
export function LogoMark({ className }: LogoMarkProps) {
  return (
    <span
      className={cn(
        'from-primary to-secondary flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br text-white',
        className,
      )}
      aria-hidden="true"
    >
      <Globe2 className="h-[18px] w-[18px]" />
    </span>
  );
}