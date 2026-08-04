import { useTranslations } from 'next-intl';

/**
 * Gerçek Landing içeriği (hero, sosyal kanıt, fiyatlandırma vb.) EPIC C'de
 * gelecek. Bu, i18n altyapısının çalıştığını doğrulamak için geçici bir
 * yer tutucudur.
 */
export default function HomePage() {
  const t = useTranslations('HomePage');

  return (
    <main className="mx-auto max-w-3xl px-6 py-24 text-center">
      <h1 className="font-heading text-3xl font-bold">{t('title')}</h1>
    </main>
  );
}
