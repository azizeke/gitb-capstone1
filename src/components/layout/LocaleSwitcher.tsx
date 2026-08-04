'use client';

import { useLocale } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';

/**
 * Aynı sayfada kalarak dil değiştirir (ana sayfaya atmaz). `usePathname()`
 * locale önekini içermeyen yolu döndürür; her <Link> kendi `locale`
 * prop'uyla o dile ait URL'i üretir.
 */
export function LocaleSwitcher() {
  const activeLocale = useLocale();
  const pathname = usePathname();

  return (
    <div className="border-border flex items-center gap-0.5 rounded-md border p-0.5 text-xs font-medium">
      {routing.locales.map((locale) => (
        <Link
          key={locale}
          href={pathname}
          locale={locale}
          aria-pressed={activeLocale === locale}
          className={
            activeLocale === locale
              ? 'bg-primary text-primary-foreground rounded px-2 py-1'
              : 'text-muted hover:text-text rounded px-2 py-1'
          }
        >
          {locale.toUpperCase()}
        </Link>
      ))}
    </div>
  );
}
