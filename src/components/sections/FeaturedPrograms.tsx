import { useLocale, useTranslations } from 'next-intl';
import { getBootcamps } from '@/data/bootcamps';
import { categories } from '@/data/categories';
import { Link } from '@/i18n/navigation';
import type { Locale } from '@/types';
import { BootcampCard } from './BootcampCard';
import { ScrollReveal } from './ScrollReveal';

export function FeaturedPrograms() {
  const t = useTranslations('HomePage.featuredPrograms');
  const locale = useLocale() as Locale;
  const featured = getBootcamps(locale)
    .filter((b) => b.featured)
    .slice(0, 4);

  return (
    <ScrollReveal>
      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="font-heading text-3xl font-bold sm:text-4xl">{t('title')}</h2>
            <p className="text-muted mt-3 text-lg">{t('subtitle')}</p>
          </div>
          <Link href="/bootcamps" className="text-primary text-sm font-medium hover:underline">
            {t('viewAll')} →
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((bootcamp, index) => {
            const category = categories.find((c) => c.slug === bootcamp.categorySlug);
            return (
              <BootcampCard
                key={bootcamp.slug}
                bootcamp={bootcamp}
                categoryName={category?.name ?? bootcamp.categorySlug}
                priority={index === 0}
              />
            );
          })}
        </div>
      </section>
    </ScrollReveal>
  );
}
