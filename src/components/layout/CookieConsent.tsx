'use client';

import { useTranslations } from 'next-intl';
import { useState, useSyncExternalStore } from 'react';
import { Button } from '@/components/ui';

const STORAGE_KEY = 'cookie-consent';
/** Sunucu render'ında localStorage okunamaz; bu sentinel ile ayırt ediliyor. */
const SSR_SENTINEL = '__ssr__';
const listeners = new Set<() => void>();

interface ConsentValue {
  necessary: true;
  analytics: boolean;
}

function getSnapshot(): string {
  try {
    return localStorage.getItem(STORAGE_KEY) ?? '';
  } catch {
    return '';
  }
}

function getServerSnapshot(): string {
  return SSR_SENTINEL;
}

function subscribe(callback: () => void) {
  listeners.add(callback);
  return () => listeners.delete(callback);
}

function writeConsent(value: ConsentValue) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
  } catch {
    // localStorage erişilemezse tercih kalıcı olmaz, ama banner o oturum
    // için yine de kapanır.
  }
  listeners.forEach((listener) => listener());
}

/**
 * Kabul/reddet/tercihler seçenekleri sunan, kalıcı (localStorage) bir
 * çerez bildirimi. Görünürlük durumu `useSyncExternalStore` ile okunuyor
 * (bkz. src/lib/theme-store.ts'teki aynı desen) — bu, sunucu ile istemci
 * arasında farklı olabilecek dış durumu (burada: localStorage'da kayıtlı
 * tercih olup olmadığı) hydration uyumsuzluğu yaratmadan okumanın doğru
 * yolu; bir useEffect içinde senkron setState çağırmaktan daha doğru.
 */
export function CookieConsent() {
  const t = useTranslations('CookieConsent');
  const stored = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const [showPreferences, setShowPreferences] = useState(false);
  const [analyticsEnabled, setAnalyticsEnabled] = useState(false);

  const isVisible = stored === '';

  if (!isVisible) return null;

  return (
    <div className="border-border bg-background fixed inset-x-0 bottom-0 z-50 border-t shadow-lg">
      <div className="mx-auto max-w-4xl px-6 py-5">
        {showPreferences ? (
          <div>
            <h2 className="font-heading mb-3 font-semibold">{t('preferencesTitle')}</h2>

            <div className="flex flex-col gap-3">
              <div className="border-border flex items-center justify-between rounded-md border p-3">
                <div>
                  <p className="text-sm font-medium">{t('necessaryLabel')}</p>
                  <p className="text-muted text-xs">{t('necessaryDescription')}</p>
                </div>
                <input
                  type="checkbox"
                  checked
                  disabled
                  className="h-4 w-4"
                  aria-label={t('necessaryLabel')}
                />
              </div>

              <div className="border-border flex items-center justify-between rounded-md border p-3">
                <div>
                  <p className="text-sm font-medium">{t('analyticsLabel')}</p>
                  <p className="text-muted text-xs">{t('analyticsDescription')}</p>
                </div>
                <input
                  type="checkbox"
                  checked={analyticsEnabled}
                  onChange={(e) => setAnalyticsEnabled(e.target.checked)}
                  className="h-4 w-4"
                  aria-label={t('analyticsLabel')}
                />
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-3">
              <Button
                size="sm"
                onClick={() => writeConsent({ necessary: true, analytics: analyticsEnabled })}
              >
                {t('savePreferences')}
              </Button>
              <Button size="sm" variant="ghost" onClick={() => setShowPreferences(false)}>
                {t('back')}
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-muted text-sm">{t('message')}</p>
            <div className="flex shrink-0 flex-wrap gap-2">
              <Button
                size="sm"
                variant="ghost"
                onClick={() => writeConsent({ necessary: true, analytics: false })}
              >
                {t('rejectAll')}
              </Button>
              <Button size="sm" variant="secondary" onClick={() => setShowPreferences(true)}>
                {t('managePreferences')}
              </Button>
              <Button size="sm" onClick={() => writeConsent({ necessary: true, analytics: true })}>
                {t('acceptAll')}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
