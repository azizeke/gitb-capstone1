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
        <span className="inline-flex items-center rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-white">
          {t('badge')}
        </span>

        <h1 className="font-heading mt-8 text-5xl font-bold tracking-tight text-balance text-white sm:text-6xl md:text-7xl">
          {t('titlePrefix')}
          <span className="bg-gradient-to-r from-indigo-400 to-cyan-300 bg-clip-text text-transparent">
            {t('titleHighlight')}
          </span>
          {t('titleSuffix')}
        </h1>

        <p className="mx-auto mt-8 max-w-2xl text-xl text-balance text-white/90">{t('subtitle')}</p>

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
            className="inline-flex items-center justify-center gap-2 rounded-md border border-white/30 bg-white/10 px-8 py-4 text-base font-medium text-white transition-colors hover:bg-white/20"
          >
            {t('ctaSecondary')}
          </Link>
        </div>

        <div className="mt-16 grid grid-cols-3 gap-4 border-t border-white/20 pt-10 sm:gap-8">
          {miniStats.map((stat) => (
            <div key={stat.key}>
              <p className="font-heading text-3xl font-bold text-white sm:text-4xl">{stat.value}</p>
              <p className="mt-1.5 text-sm text-white/70 sm:text-base">{tStats(stat.key)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}