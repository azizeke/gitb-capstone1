import { ArrowRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { buttonStyles } from '@/components/ui';
import { Link } from '@/i18n/navigation';

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
      <div className="absolute inset-0 -z-10">
        <Image
          src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1920&h=1080&fit=crop"
          alt=""
          fill
          priority
          className="object-cover opacity-10"
        />
      </div>

      <div className="mx-auto max-w-4xl px-6 py-20 text-center sm:py-28">
        <span className="bg-primary/10 text-primary inline-flex items-center rounded-full px-3 py-1 text-xs font-medium">
          {t('badge')}
        </span>

        <h1 className="font-heading mt-6 text-4xl font-bold tracking-tight text-balance sm:text-5xl md:text-6xl">
          {t('title')}
        </h1>

        <p className="text-muted mx-auto mt-6 max-w-2xl text-lg text-balance">{t('subtitle')}</p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link href="/auth/register" className={buttonStyles('primary', 'lg')}>
            {t('ctaPrimary')}
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link href="/bootcamps" className={buttonStyles('secondary', 'lg')}>
            {t('ctaSecondary')}
          </Link>
        </div>

        <div className="border-border mt-14 grid grid-cols-3 gap-4 border-t pt-8 sm:gap-8">
          {miniStats.map((stat) => (
            <div key={stat.key}>
              <p className="font-heading text-2xl font-bold sm:text-3xl">{stat.value}</p>
              <p className="text-muted mt-1 text-xs sm:text-sm">{tStats(stat.key)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
