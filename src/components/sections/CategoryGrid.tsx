import * as Icons from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { categories } from '@/data/categories';
import { Link } from '@/i18n/navigation';
import { ScrollReveal } from './ScrollReveal';

export function CategoryGrid() {
  const t = useTranslations('HomePage.categories');

  return (
    <ScrollReveal>
      <section className="bg-surface py-16">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-10 text-center">
            <h2 className="font-heading text-2xl font-bold sm:text-3xl">{t('title')}</h2>
            <p className="text-muted mt-2">{t('subtitle')}</p>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
            {categories.map((category) => {
              // Kategori verisindeki `icon` alanı bir lucide-react ikon adı
              // string'idir (örn. "Code2"); burada dinamik olarak karşılık
              // gelen komponente çevriliyor. Bulunamazsa nötr bir yedek ikon
              // gösterilir, uygulama çökmez.
              const Icon =
                (Icons[category.icon as keyof typeof Icons] as LucideIcon) ?? Icons.Layers;

              return (
                <Link
                  key={category.slug}
                  href={`/bootcamps?category=${category.slug}`}
                  className="bg-background border-border hover:border-primary flex flex-col items-center gap-3 rounded-lg border p-6 text-center transition-colors"
                >
                  <span className="bg-primary/10 text-primary flex h-12 w-12 items-center justify-center rounded-full">
                    <Icon className="h-6 w-6" />
                  </span>
                  <span className="text-sm font-medium">{category.name}</span>
                  <span className="text-muted text-xs">
                    {category.courseCount} {t('coursesLabel')}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </ScrollReveal>
  );
}
