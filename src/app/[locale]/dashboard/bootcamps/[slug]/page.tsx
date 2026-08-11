import { AlertCircle } from 'lucide-react';
import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { CurriculumAccordion, type ModuleStatus } from '@/components/sections/CurriculumAccordion';
import { buttonStyles, Card } from '@/components/ui';
import { getBootcampBySlug } from '@/data/bootcamps';
import { enrollments } from '@/data/enrollments';
import { Link } from '@/i18n/navigation';
import type { Locale } from '@/types';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const t = await getTranslations({ locale, namespace: 'Common.dashboard' });
  const bootcamp = getBootcampBySlug(locale as Locale, slug);

  return {
    title: bootcamp
      ? `${bootcamp.title} — ${t('curriculumTrackingTitle')}`
      : t('curriculumTrackingTitle'),
    robots: { index: false, follow: false },
  };
}

/**
 * Bir bootcamp'in müfredatını, mock öğrencinin o programdaki kaydına göre
 * modül modül ilerleme durumuyla (tamamlandı/devam ediyor/yaklaşıyor)
 * gösterir. Öğrenci bu bootcamp'e kayıtlı değilse (enrollments'ta yoksa)
 * anlamlı bir "kayıtlı değilsin" durumu gösterilir — rastgele bir
 * bootcamp slug'ı yazılarak asıl müfredat sızdırılmaz.
 */
export default async function CurriculumTrackingPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const t = await getTranslations('Common.dashboard');

  const bootcamp = getBootcampBySlug(locale as Locale, slug);
  const enrollment = enrollments.find((e) => e.bootcampSlug === slug);

  if (!bootcamp || !enrollment) {
    return (
      <Card className="flex flex-col items-center gap-3 py-12 text-center">
        <AlertCircle className="text-muted h-8 w-8" />
        <p className="font-heading font-semibold">{t('notEnrolledTitle')}</p>
        <p className="text-muted text-sm">{t('notEnrolledDescription')}</p>
        <Link href="/dashboard/bootcamps" className={buttonStyles('primary', 'md') + ' mt-2'}>
          {t('backToMyBootcamps')}
        </Link>
      </Card>
    );
  }

  const moduleStatuses: ModuleStatus[] = bootcamp.curriculum.map((_, index) =>
    index < enrollment.currentModuleIndex
      ? 'completed'
      : index === enrollment.currentModuleIndex
        ? 'in-progress'
        : 'upcoming',
  );

  return (
    <div className="flex flex-col gap-6">
      <div>
        <Link
          href="/dashboard/bootcamps"
          className="text-primary text-sm font-medium hover:underline"
        >
          ← {t('backToMyBootcamps')}
        </Link>
        <h1 className="font-heading mt-2 text-2xl font-bold sm:text-3xl">{bootcamp.title}</h1>
        <p className="text-muted mt-1 text-sm">
          {t('enrolledOnLabel')}:{' '}
          {new Date(enrollment.enrolledAt).toLocaleDateString(undefined, {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          })}
        </p>
      </div>

      <div>
        <div className="mb-1.5 flex items-center justify-between text-sm">
          <span className="text-muted">{t('progressLabel')}</span>
          <span className="font-medium">{enrollment.progressPercent}%</span>
        </div>
        <div className="bg-border h-2 w-full overflow-hidden rounded-full">
          <div
            className="bg-primary h-full rounded-full transition-all"
            style={{ width: `${enrollment.progressPercent}%` }}
          />
        </div>
      </div>

      <CurriculumAccordion
        modules={bootcamp.curriculum}
        hoursLabel={t('hours')}
        moduleStatuses={moduleStatuses}
        statusLabels={{
          completed: t('statusCompleted'),
          inProgress: t('statusInProgress'),
          upcoming: t('statusUpcoming'),
        }}
      />
    </div>
  );
}
