'use client';

import { ChevronDown } from 'lucide-react';
import { useLocale } from 'next-intl';
import { useEffect, useRef, useState } from 'react';
import { Link, usePathname } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';
import { cn } from '@/lib/cn';
import { FlagIcon } from './FlagIcon';

const localeMeta: Record<(typeof routing.locales)[number], { label: string }> = {
  en: { label: 'English' },
  tr: { label: 'Türkçe' },
  nl: { label: 'Nederlands' },
};

/**
 * Aynı sayfada kalarak dil değiştirir (ana sayfaya atmaz). `usePathname()`
 * locale önekini içermeyen yolu döndürür; her seçenek kendi `locale`
 * prop'uyla o dile ait URL'i üretir.
 */
export function LocaleSwitcher() {
  const activeLocale = useLocale();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') setIsOpen(false);
    }

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        className="border-border hover:bg-surface flex items-center gap-1.5 rounded-md border px-2.5 py-1.5 text-sm font-medium"
      >
        <FlagIcon locale={activeLocale as keyof typeof localeMeta} />
        <span>{activeLocale.toUpperCase()}</span>
        <ChevronDown className={cn('h-3.5 w-3.5 transition-transform', isOpen && 'rotate-180')} />
      </button>

      {isOpen && (
        <div
          role="listbox"
          className="border-border bg-background absolute top-full right-0 z-50 mt-1 min-w-[160px] overflow-hidden rounded-md border shadow-lg"
        >
          {routing.locales.map((locale) => {
            const meta = localeMeta[locale];
            const isActive = locale === activeLocale;

            return (
              <Link
                key={locale}
                href={pathname}
                locale={locale}
                role="option"
                aria-selected={isActive}
                onClick={() => setIsOpen(false)}
                className={cn(
                  'hover:bg-surface flex items-center gap-2.5 px-3 py-2 text-sm',
                  isActive && 'bg-surface font-medium',
                )}
              >
                <FlagIcon locale={locale} />
                <span>{meta.label}</span>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}