import {
  Briefcase,
  Code2,
  GraduationCap,
  Infinity as InfinityIcon,
  SlidersHorizontal,
  Users,
} from 'lucide-react';
import { useTranslations } from 'next-intl';

// Çeviri dosyasındaki `features.items` dizisiyle SIRA olarak eşleşir.
const featureIcons = [Code2, Users, GraduationCap, Briefcase, SlidersHorizontal, InfinityIcon];

interface FeatureItem {
  title: string;
  description: string;
}

export function Features() {
  const t = useTranslations('HomePage.features');
  const items = t.raw('items') as FeatureItem[];

  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <div className="mb-10 text-center">
        <h2 className="font-heading text-2xl font-bold sm:text-3xl">{t('title')}</h2>
        <p className="text-muted mt-2">{t('subtitle')}</p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item, index) => {
          const Icon = featureIcons[index] ?? Code2;
          return (
            <div key={item.title} className="border-border rounded-lg border p-6">
              <span className="bg-primary/10 text-primary mb-4 flex h-11 w-11 items-center justify-center rounded-full">
                <Icon className="h-5 w-5" />
              </span>
              <h3 className="font-heading text-base font-semibold">{item.title}</h3>
              <p className="text-muted mt-2 text-sm">{item.description}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
