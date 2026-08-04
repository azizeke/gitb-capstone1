'use client';

import { useState } from 'react';

const locales = ['TR', 'EN'] as const;

/**
 * Şimdilik yalnızca görsel: hangi dilin seçili olduğunu gösteriyor.
 * Gerçek /tr ve /en route'ları arasında geçiş yapma mantığı B-01'de
 * next-intl ile birlikte eklenecek.
 */
export function LocaleSwitcher() {
  const [active, setActive] = useState<(typeof locales)[number]>('TR');

  return (
    <div className="border-border flex items-center gap-0.5 rounded-md border p-0.5 text-xs font-medium">
      {locales.map((locale) => (
        <button
          key={locale}
          type="button"
          onClick={() => setActive(locale)}
          aria-pressed={active === locale}
          className={
            active === locale
              ? 'bg-primary text-primary-foreground rounded px-2 py-1'
              : 'text-muted hover:text-text rounded px-2 py-1'
          }
        >
          {locale}
        </button>
      ))}
    </div>
  );
}
