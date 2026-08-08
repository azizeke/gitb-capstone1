'use client';

import { AlertTriangle } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useEffect } from 'react';
import { buttonStyles } from '@/components/ui';
import { Link } from '@/i18n/navigation';

/**
 * Next.js App Router hata sınırı — bu segment ağacındaki (yani [locale]
 * altındaki tüm sayfalar) render sırasında fırlatılan yakalanmamış
 * hataları burada karşılar. Zorunlu olarak bir Client Component'tir.
 */
export default function LocaleError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations('ErrorBoundary');

  useEffect(() => {
    // Geliştirme sırasında hatayı konsolda görebilmek için; gerçek bir
    // hata izleme servisi (Sentry vb.) proje kapsamı dışında.
    console.error(error);
  }, [error]);

  return (
    <main className="mx-auto flex min-h-[70vh] max-w-md flex-col items-center justify-center px-6 text-center">
      <span className="bg-error/10 text-error flex h-12 w-12 items-center justify-center rounded-full">
        <AlertTriangle className="h-6 w-6" />
      </span>
      <h1 className="font-heading mt-4 text-xl font-semibold">{t('title')}</h1>
      <p className="text-muted mt-2 text-sm">{t('message')}</p>

      <div className="mt-6 flex gap-3">
        <button type="button" onClick={reset} className={buttonStyles('primary', 'md')}>
          {t('retry')}
        </button>
        <Link href="/" className={buttonStyles('secondary', 'md')}>
          {t('backHome')}
        </Link>
      </div>
    </main>
  );
}
