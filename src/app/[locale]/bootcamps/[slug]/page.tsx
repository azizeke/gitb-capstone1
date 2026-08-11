import { Clock, Globe2, Star, Users } from 'lucide-react';
import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { BootcampCard } from '@/components/sections/BootcampCard';
import { CurriculumAccordion } from '@/components/sections/CurriculumAccordion';
import { Badge, buttonStyles, Card } from '@/components/ui';
import { bootcampSlugs, getBootcampBySlug, getBootcamps } from '@/data/bootcamps';
import { categories } from '@/data/categories';
import { cohorts } from '@/data/cohorts';
import { instructors } from '@/data/instructors';
import { testimonials } from '@/data/testimonials';
import { Link } from '@/i18n/navigation';
import type { Locale } from '@/types';

export function generateStaticParams() {
  return bootcampSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const bootcamp = getBootcampBySlug(locale as Locale, slug);

  // Geçersiz slug'lar için jenerik bir başlık döndürülür; sayfanın
  // kendisi zaten notFound() ile 404'e düşecek, burada hata fırlatmaya
  // gerek yok.
  if (!bootcamp) {
    return { title: 'Bootcamp' };
  }

  return {
    title: bootcamp.title,
    description: bootcamp.shortDescription,
    openGraph: {
      title: bootcamp.title,
      description: bootcamp.shortDescription,
      images: [{ url: bootcamp.heroImage }],
    },
  };
}

function getNextCohort(bootcampSlug: string) {
  const today = new Date().toISOString().slice(0, 10);
  const bootcampCohorts = cohorts
    .filter((c) => c.bootcampSlug === bootcampSlug)
    .sort((a, b) => a.startDate.localeCompare(b.startDate));

  const upcoming = bootcampCohorts.find((c) => c.startDate >= today);
  return upcoming ?? bootcampCohorts[bootcampCohorts.length - 1] ?? null;
}

export default async function BootcampDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const bootcamp = getBootcampBySlug(locale as Locale, slug);

  if (!bootcamp) {
    notFound();
  }

  const t = await getTranslations('BootcampDetailPage');
  const tCommon = await getTranslations('Common');

  const category = categories.find((c) => c.slug === bootcamp.categorySlug);
  const instructor = instructors.find((i) => i.slug === bootcamp.instructorSlug);
  const relatedBootcamps = getBootcamps(locale as Locale)
    .filter((b) => b.categorySlug === bootcamp.categorySlug && b.slug !== bootcamp.slug)
    .slice(0, 3);
  const bootcampReviews = testimonials.filter((r) => r.bootcampSlug === bootcamp.slug);

  const nextCohort = getNextCohort(bootcamp.slug);
  const today = new Date().toISOString().slice(0, 10);
  const cohortHasStarted = nextCohort ? nextCohort.startDate < today : false;
  const cohortIsFull = nextCohort ? nextCohort.seatsLeft <= 0 : false;

  return (
    <main>
      {/* Hero */}
      <section className="border-border border-b">
        <div className="mx-auto max-w-6xl px-6 py-12">
          <Link href="/bootcamps" className="text-primary text-sm font-medium hover:underline">
            ← {t('backToBootcamps')}
          </Link>

          <div className="mt-4 flex flex-wrap items-center gap-2">
            <Badge>{category?.name ?? bootcamp.categorySlug}</Badge>
            <Badge variant="default">{tCommon(`levels.${bootcamp.level}`)}</Badge>
          </div>

          <h1 className="font-heading mt-4 text-3xl font-bold sm:text-4xl">{bootcamp.title}</h1>
          <p className="text-muted mt-3 max-w-2xl">{bootcamp.description}</p>

          <div className="text-muted mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm">
            <span className="flex items-center gap-1.5">
              <Clock className="h-4 w-4" />
              {tCommon('weeks', { count: bootcamp.durationWeeks })} ·{' '}
              {tCommon(`formats.${bootcamp.format}`)}
            </span>
            <span className="flex items-center gap-1.5">
              <Globe2 className="h-4 w-4" />
              {bootcamp.languages.join(', ')}
            </span>
            <span className="flex items-center gap-1.5">
              <Star className="h-4 w-4 fill-current text-amber-500" />
              {bootcamp.rating.toFixed(1)}
            </span>
            <span className="flex items-center gap-1.5">
              <Users className="h-4 w-4" />
              {bootcamp.studentCount} {t('students')}
            </span>
          </div>
        </div>
      </section>

      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-6 py-12 lg:grid-cols-[1fr_320px]">
        {/* Ana içerik */}
        <div className="flex flex-col gap-12">
          <div className="relative h-64 w-full overflow-hidden rounded-lg sm:h-96">
            <Image
              src={bootcamp.heroImage}
              alt={bootcamp.title}
              fill
              priority
              className="object-cover"
              sizes="(min-width: 1024px) 700px, 100vw"
            />
          </div>

          {/* Müfredat */}
          <section>
            <h2 className="font-heading mb-4 text-xl font-semibold">{t('curriculum')}</h2>
            <CurriculumAccordion modules={bootcamp.curriculum} hoursLabel={t('hours')} />
          </section>

          {/* Eğitmen */}
          {instructor && (
            <section>
              <h2 className="font-heading mb-4 text-xl font-semibold">{t('instructor')}</h2>
              <Card className="flex items-center gap-4">
                <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full">
                  <Image
                    src={instructor.avatar}
                    alt={instructor.name}
                    fill
                    className="object-cover"
                    sizes="64px"
                  />
                </div>
                <div>
                  <p className="font-heading font-semibold">{instructor.name}</p>
                  <p className="text-muted text-sm">{instructor.title}</p>
                  <p className="text-muted text-xs">{instructor.company}</p>
                </div>
              </Card>
              <p className="text-muted mt-3 text-sm">{instructor.bio}</p>
            </section>
          )}

          {/* Yorumlar */}
          <section>
            <h2 className="font-heading mb-4 text-xl font-semibold">{t('reviews')}</h2>
            {bootcampReviews.length === 0 ? (
              <p className="text-muted text-sm">{t('noReviews')}</p>
            ) : (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {bootcampReviews.map((review) => (
                  <Card key={review.id}>
                    <div className="mb-2 flex" role="img" aria-label={`${review.rating}/5`}>
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={
                            i < review.rating
                              ? 'h-3.5 w-3.5 fill-current text-amber-500'
                              : 'text-border h-3.5 w-3.5'
                          }
                        />
                      ))}
                    </div>
                    <p className="text-sm">&ldquo;{review.quote}&rdquo;</p>
                    <p className="text-muted mt-3 text-xs font-medium">
                      {review.name} · {review.role}
                    </p>
                  </Card>
                ))}
              </div>
            )}
          </section>

          {/* İlgili bootcamp'ler */}
          {relatedBootcamps.length > 0 && (
            <section>
              <h2 className="font-heading mb-4 text-xl font-semibold">{t('relatedPrograms')}</h2>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {relatedBootcamps.map((related) => (
                  <BootcampCard
                    key={related.slug}
                    bootcamp={related}
                    categoryName={category?.name ?? related.categorySlug}
                  />
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Sticky sidebar */}
        <aside className="lg:self-start">
          <Card className="sticky top-24 flex flex-col gap-4">
            <div>
              <span className="font-heading text-3xl font-bold">
                €{bootcamp.priceEUR.toLocaleString()}
              </span>
            </div>

            {nextCohort && (
              <div className="border-border border-t pt-4">
                <p className="text-muted text-xs font-medium">{t('nextCohort')}</p>
                <p className="mt-1 text-sm font-medium">
                  {new Date(nextCohort.startDate).toLocaleDateString(undefined, {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                </p>
                <p className="text-muted mt-1 text-xs">
                  {cohortHasStarted
                    ? t('alreadyStarted')
                    : cohortIsFull
                      ? t('cohortFull')
                      : t('seatsLeft', { count: nextCohort.seatsLeft })}
                </p>
              </div>
            )}

            <Link href="/auth/register" className={buttonStyles('primary', 'lg') + ' w-full'}>
              {t('enrollCta')}
            </Link>
          </Card>
        </aside>
      </div>
    </main>
  );
}
