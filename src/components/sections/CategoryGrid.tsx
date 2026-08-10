import * as Icons from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { categories } from '@/data/categories';
import { Link } from '@/i18n/navigation';
import { cn } from '@/lib/cn';
import { ScrollReveal } from './ScrollReveal';

/*
 * Kategorileri görsel olarak birbirinden ayırmak için her birine ayrı bir
 * renk atanıyor. Bu renkler marka renk paletimizin (primary/secondary/vb.)
 * bir parçası DEĞİL — kasıtlı olarak daha geniş bir palet kullanıldı, çünkü
 * amaç marka kimliği değil, 8 farklı kategoriyi ilk bakışta ayırt edilebilir
 * kılmak. Tailwind'in derleme zamanı tarayıcısının bu class'ları
 * bulabilmesi için (dinamik string birleştirme yerine) tam class adları
 * burada literal olarak yazılmalı.
 */
const categoryColors: Record<string, { iconBg: string; iconText: string; hoverBorder: string }> = {
  programming: {
    iconBg: 'bg-indigo-500/10',
    iconText: 'text-indigo-600',
    hoverBorder: 'hover:border-indigo-500',
  },
  'data-engineering': {
    iconBg: 'bg-cyan-500/10',
    iconText: 'text-cyan-600',
    hoverBorder: 'hover:border-cyan-500',
  },
  'ai-ml': {
    iconBg: 'bg-purple-500/10',
    iconText: 'text-purple-600',
    hoverBorder: 'hover:border-purple-500',
  },
  'cloud-devops': {
    iconBg: 'bg-sky-500/10',
    iconText: 'text-sky-600',
    hoverBorder: 'hover:border-sky-500',
  },
  cybersecurity: {
    iconBg: 'bg-rose-500/10',
    iconText: 'text-rose-600',
    hoverBorder: 'hover:border-rose-500',
  },
  'mobile-dev': {
    iconBg: 'bg-emerald-500/10',
    iconText: 'text-emerald-600',
    hoverBorder: 'hover:border-emerald-500',
  },
  'data-analytics': {
    iconBg: 'bg-amber-500/10',
    iconText: 'text-amber-600',
    hoverBorder: 'hover:border-amber-500',
  },
  'full-stack': {
    iconBg: 'bg-teal-500/10',
    iconText: 'text-teal-600',
    hoverBorder: 'hover:border-teal-500',
  },
};

const defaultCategoryColor = {
  iconBg: 'bg-primary/10',
  iconText: 'text-primary',
  hoverBorder: 'hover:border-primary',
};

export function CategoryGrid() {
  const t = useTranslations('HomePage.categories');

  return (
    <ScrollReveal>
      <section className="bg-surface py-16">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-10 text-center">
            <h2 className="font-heading text-3xl font-bold sm:text-4xl">{t('title')}</h2>
            <p className="text-muted mt-3 text-lg">{t('subtitle')}</p>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
            {categories.map((category) => {
              // Kategori verisindeki `icon` alanı bir lucide-react ikon adı
              // string'idir (örn. "Code2"); burada dinamik olarak karşılık
              // gelen komponente çevriliyor. Bulunamazsa nötr bir yedek ikon
              // gösterilir, uygulama çökmez.
              const Icon =
                (Icons[category.icon as keyof typeof Icons] as LucideIcon) ?? Icons.Layers;
              const colors = categoryColors[category.slug] ?? defaultCategoryColor;

              return (
                <Link
                  key={category.slug}
                  href={`/bootcamps?category=${category.slug}`}
                  className={cn(
                    'bg-background border-border flex flex-col items-center gap-3 rounded-lg border p-6 text-center transition-colors',
                    colors.hoverBorder,
                  )}
                >
                  <span
                    className={cn(
                      'flex h-12 w-12 items-center justify-center rounded-full',
                      colors.iconBg,
                      colors.iconText,
                    )}
                  >
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