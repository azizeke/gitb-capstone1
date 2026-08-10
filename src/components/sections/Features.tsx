import {
  Briefcase,
  Code2,
  GraduationCap,
  Infinity as InfinityIcon,
  SlidersHorizontal,
  Users,
} from 'lucide-react';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/cn';
import { ScrollReveal } from './ScrollReveal';

/*
 * Her özellik kartının kendine ait bir vurgu rengi var; kart hover
 * edildiğinde ikon o renkle "yanıyor" (group-hover). Marka paletinin
 * dışında, kasıtlı olarak geniş bir palet kullanıldı — amaç 6 farklı
 * özelliği görsel olarak ayırt edilebilir kılmak. Tailwind'in derleme
 * zamanı tarayıcısı için class adları literal yazılmalı (dinamik string
 * birleştirme çalışmaz).
 */
const featureStyles: {
  icon: typeof Code2;
  hoverBorder: string;
  hoverIconBg: string;
  hoverIconText: string;
}[] = [
  {
    icon: Code2,
    hoverBorder: 'hover:border-indigo-500',
    hoverIconBg: 'group-hover:bg-indigo-500/10',
    hoverIconText: 'group-hover:text-indigo-600',
  },
  {
    icon: Users,
    hoverBorder: 'hover:border-sky-500',
    hoverIconBg: 'group-hover:bg-sky-500/10',
    hoverIconText: 'group-hover:text-sky-600',
  },
  {
    icon: GraduationCap,
    hoverBorder: 'hover:border-emerald-500',
    hoverIconBg: 'group-hover:bg-emerald-500/10',
    hoverIconText: 'group-hover:text-emerald-600',
  },
  {
    icon: Briefcase,
    hoverBorder: 'hover:border-amber-500',
    hoverIconBg: 'group-hover:bg-amber-500/10',
    hoverIconText: 'group-hover:text-amber-600',
  },
  {
    icon: SlidersHorizontal,
    hoverBorder: 'hover:border-purple-500',
    hoverIconBg: 'group-hover:bg-purple-500/10',
    hoverIconText: 'group-hover:text-purple-600',
  },
  {
    icon: InfinityIcon,
    hoverBorder: 'hover:border-rose-500',
    hoverIconBg: 'group-hover:bg-rose-500/10',
    hoverIconText: 'group-hover:text-rose-600',
  },
];

interface FeatureItem {
  title: string;
  description: string;
}

export function Features() {
  const t = useTranslations('HomePage.features');
  const items = t.raw('items') as FeatureItem[];

  return (
    <ScrollReveal>
      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="mb-10 text-center">
          <h2 className="font-heading text-3xl font-bold sm:text-4xl">{t('title')}</h2>
          <p className="text-muted mt-3 text-lg">{t('subtitle')}</p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, index) => {
            const style = featureStyles[index] ?? featureStyles[0];
            const Icon = style.icon;
            return (
              <div
                key={item.title}
                className={cn(
                  'border-border group rounded-lg border p-6 transition-colors',
                  style.hoverBorder,
                )}
              >
                <span
                  className={cn(
                    'bg-surface text-muted mb-4 flex h-11 w-11 items-center justify-center rounded-full transition-colors',
                    style.hoverIconBg,
                    style.hoverIconText,
                  )}
                >
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="font-heading text-base font-semibold">{item.title}</h3>
                <p className="text-muted mt-2 text-sm">{item.description}</p>
              </div>
            );
          })}
        </div>
      </section>
    </ScrollReveal>
  );
}