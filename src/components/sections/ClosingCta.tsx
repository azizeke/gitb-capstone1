import { useTranslations } from 'next-intl';
import { buttonStyles } from '@/components/ui';
import { Link } from '@/i18n/navigation';

export function ClosingCta() {
  const t = useTranslations('HomePage.closingCta');

  return (
    <section className="bg-primary text-primary-foreground py-16">
      <div className="mx-auto max-w-2xl px-6 text-center">
        <h2 className="font-heading text-2xl font-bold sm:text-3xl">{t('title')}</h2>
        <p className="mt-2 opacity-90">{t('subtitle')}</p>
        <Link
          href="/auth/register"
          className={buttonStyles('secondary', 'lg') + ' mt-8 inline-flex'}
        >
          {t('cta')}
        </Link>
      </div>
    </section>
  );
}
