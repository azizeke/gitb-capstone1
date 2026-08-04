'use client';

import { Moon, Sun } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

/**
 * Şimdilik yalnızca <html> üzerindeki "dark" class'ını açıp kapatıyor.
 * Tercihin kalıcı olması (localStorage/cookie), sayfa yenilenince flash
 * olmaması ve ilk yüklemede sistem tercihinin okunması B-02 görev
 * kartında eklenecek. Bu komponent o mantığın üzerine inşa edileceği
 * temel arayüzü sağlıyor.
 */
export function ThemeToggle() {
  const t = useTranslations('ThemeToggle');
  const [isDark, setIsDark] = useState(false);

  function toggleTheme() {
    document.documentElement.classList.toggle('dark');
    setIsDark((prev) => !prev);
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? t('switchToLight') : t('switchToDark')}
      className="text-text hover:bg-surface focus-visible:ring-primary flex h-9 w-9 items-center justify-center rounded-md transition-colors focus-visible:ring-2 focus-visible:outline-none"
    >
      {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
    </button>
  );
}
