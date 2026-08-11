import { BookOpen } from 'lucide-react';
import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { CountdownTimer } from '@/components/sections/CountdownTimer';
import { Card, buttonStyles } from '@/components/ui';
import { getBootcamps } from '@/data/bootcamps';
import { cohorts } from '@/data/cohorts';
import { currentStudent, enrollments } from '@/data/enrollments';
import { Link } from '@/i18n/navigation';
import type { Locale } from '@/types';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Common.dashboard' });

  return { title: t('navOverview'), robots: { index: false, follow: false } };
}

const ASSUMED_START_TIME = 'T09:00:00';

export default async function DashboardOverviewPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations('Common.dashboard');
  const bootcamps = getBootcamps(locale as Locale);

  const enrichedEnrollments = enrollments
    .map((enrollment) => ({
      enrollment,
      bootcamp: bootcamps.find((b) => b.slug === enrollment.bootcampSlug),
      cohort: cohorts.find((c) => c.id === enrollment.cohortId),
    }))
    .filter((e) => e.bootcamp);

  // Tüm kayıtlar arasında en yakın (bugüne en yakın gelecekteki) oturumu bul.
  const today = new Date().toISOString().slice(0, 10);
  const sortedByDate = [...enrichedEnrollments]
    .filter((e) => e.cohort)
    .sort((a, b) => a.cohort!.startDate.localeCompare(b.cohort!.startDate));
  const nextSession =
    sortedByDate.find((e) => e.cohort!.startDate >= today) ?? sortedByDate[sortedByDate.length - 1];

  if (enrichedEnrollments.length === 0) {
    return (
      <div className="flex flex-col gap-8">
        <h1 className="font-heading text-2xl font-bold sm:text-3xl">
          {t('welcome', { name: currentStudent.name })}
        </h1>
        <Card className="flex flex-col items-center gap-3 py-12 text-center">
          <BookOpen className="text-muted h-8 w-8" />
          <p className="font-heading font-semibold">{t('emptyEnrollmentsTitle')}</p>
          <p className="text-muted text-sm">{t('emptyEnrollmentsDescription')}</p>
          <Link href="/bootcamps" className={buttonStyles('primary', 'md') + ' mt-2'}>
            {t('browseBootcamps')}
          </Link>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="font-heading text-2xl font-bold sm:text-3xl">
          {t('welcome', { name: currentStudent.name })}
        </h1>
        <p className="text-muted mt-1">{t('overviewSubtitle')}</p>
      </div>

      {nextSession && nextSession.cohort && (
        <Card className="flex flex-col items-center gap-4 py-8 text-center">
          <div>
            <p className="text-muted text-sm">{t('nextSessionTitle')}</p>
            <Link
              href={`/dashboard/bootcamps/${nextSession.bootcamp!.slug}`}
              className="font-heading hover:text-primary text-xl font-bold"
            >
              {nextSession.bootcamp!.title}
            </Link>
          </div>
          <CountdownTimer
            targetDate={`${nextSession.cohort.startDate}${ASSUMED_START_TIME}`}
            labels={{
              days: t('days'),
              hours: t('hours'),
              minutes: t('minutes'),
              seconds: t('seconds'),
            }}
            startedLabel={t('started')}
          />
        </Card>
      )}

      <section>
        <h2 className="font-heading mb-4 text-lg font-semibold">{t('yourProgramsTitle')}</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {enrichedEnrollments.map(({ enrollment, bootcamp }) => (
            <Card key={enrollment.id}>
              <h3 className="font-heading text-base font-semibold">{bootcamp!.title}</h3>
              <div className="mt-3">
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
              <Link
                href={`/dashboard/bootcamps/${bootcamp!.slug}`}
                className="text-primary mt-4 inline-block text-sm font-medium hover:underline"
              >
                {t('viewCurriculum')} →
              </Link>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
