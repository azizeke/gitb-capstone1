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

export default function HomePage() {
  return (
    <>
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
    </>
  );
}
