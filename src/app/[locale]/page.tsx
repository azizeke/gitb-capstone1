import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { CategoryGrid } from '@/components/sections/CategoryGrid';
import { ClosingCta } from '@/components/sections/ClosingCta';
import { FeaturedPrograms } from '@/components/sections/FeaturedPrograms';
import { Features } from '@/components/sections/Features';
import { Hero } from '@/components/sections/Hero';
import { HowItWorks } from '@/components/sections/HowItWorks';
import { Instructors } from '@/components/sections/Instructors';
import { Newsletter } from '@/components/sections/Newsletter';
import { Pricing } from '@/components/sections/Pricing';
import { StatsCounter } from '@/components/sections/StatsCounter';
import { Testimonials } from '@/components/sections/Testimonials';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'HomePage' });

  return {
    title: `${t('hero.titlePrefix')}${t('hero.titleHighlight')}${t('hero.titleSuffix')}`,
    description: t('hero.subtitle'),
  };
}

export default function HomePage() {
  return (
    <main>
      <Hero />
      <StatsCounter />
      <FeaturedPrograms />
      <CategoryGrid />
      <Features />
      <HowItWorks />
      <Instructors />
      <Testimonials />
      <Pricing />
      <Newsletter />
      <ClosingCta />
    </main>
  );
}