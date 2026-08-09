import { ArrowRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { buttonStyles } from '@/components/ui';
import { Link } from '@/i18n/navigation';
import { HeroBackground } from './HeroBackground';

const miniStats: { key: 'graduates' | 'employmentRate' | 'partners'; value: string }[] = [
  { key: 'graduates', value: '2,400+' },
  { key: 'employmentRate', value: '87%' },
  { key: 'partners', value: '120+' },
];

export function Hero() {
  const t = useTranslations('HomePage.hero');
  const tStats = useTranslations('HomePage.stats');

  return (
    <section className="relative overflow-hidden">
      <HeroBackground />

      <div className="mx-auto max-w-5xl px-6 py-24 text-center sm:py-32">
        <span className="bg-primary/10 text-primary inline-flex items-center rounded-full px-4 py-1.5 text-sm font-medium">
          {t('badge')}
        </span>

        <h1 className="font-heading mt-8 text-5xl font-bold tracking-tight text-balance sm:text-6xl md:text-7xl">
          {t('title')}
        </h1>

        <p className="text-muted mx-auto mt-8 max-w-2xl text-xl text-balance">{t('subtitle')}</p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/auth/register"
            className={buttonStyles('primary', 'lg') + ' px-8 py-4 text-base'}
          >
            {t('ctaPrimary')}
            <ArrowRight className="h-5 w-5" />
          </Link>
          <Link
            href="/bootcamps"
            className={buttonStyles('secondary', 'lg') + ' px-8 py-4 text-base'}
          >
            {t('ctaSecondary')}
          </Link>
        </div>

        <div className="border-border mt-16 grid grid-cols-3 gap-4 border-t pt-10 sm:gap-8">
          {miniStats.map((stat) => (
            <div key={stat.key}>
              <p className="font-heading text-3xl font-bold sm:text-4xl">{stat.value}</p>
              <p className="text-muted mt-1.5 text-sm sm:text-base">{tStats(stat.key)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}