'use client';

import { usePathname } from '@/i18n/navigation';

/**
 * Her rota değişiminde `key={pathname}` sayesinde React alt ağacı yeniden
 * mount eder, bu da `.page-transition` CSS animasyonunun (globals.css)
 * her seferinde baştan çalışmasını sağlar. 250ms süre proje şartnamesinin
 * "300ms'i geçmeyen" kuralına uyar.
 */
export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div key={pathname} className="page-transition">
      {children}
    </div>
  );
}
