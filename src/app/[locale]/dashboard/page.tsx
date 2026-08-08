import { CheckCircle2, Circle, Clock, Trophy } from 'lucide-react';
import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { Badge, Card } from '@/components/ui';
import { bootcamps } from '@/data/bootcamps';
import { cohorts } from '@/data/cohorts';
import { Link } from '@/i18n/navigation';
import { cn } from '@/lib/cn';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'DashboardPage' });

  return { title: t('title'), robots: { index: false, follow: false } };
}

/**
 * Statik bir öğrenci dashboard mockup'ı ("Should" — proje şartnamesi).
 * Gerçek kullanıcı sistemi/auth proje kapsamı dışında olduğu için burada
 * gösterilen öğrenci, ilerleme yüzdesi ve müfredat durumu tamamen sabit
 * mock verilerdir; hiçbir gerçek hesaba bağlı değildir.
 */
const MOCK_STUDENT_NAME = 'Aslı Demir';
const ENROLLED_BOOTCAMP_SLUG = 'frontend-engineering-react-typescript';

const achievementKeys = [
  'achievementEnrolled',
  'achievementFirstProject',
  'achievementHalfway',
  'achievementTeamProject',
] as const;

export default async function DashboardPage() {
  const t = await getTranslations('DashboardPage');

  const bootcamp = bootcamps.find((b) => b.slug === ENROLLED_BOOTCAMP_SLUG)!;
  const nextCohort = cohorts
    .filter((c) => c.bootcampSlug === ENROLLED_BOOTCAMP_SLUG)
    .sort((a, b) => a.startDate.localeCompare(b.startDate))[0];

  // Mock müfredat durumu: ilk modül tamamlandı, ikincisi devam ediyor,
  // geri kalanı henüz başlamadı.
  const moduleStatuses = bootcamp.curriculum.map((module, index) => ({
    ...module,
    status: index === 0 ? 'completed' : index === 1 ? 'in-progress' : 'upcoming',
  }));

  const completedCount = moduleStatuses.filter((m) => m.status === 'completed').length;
  const progressPercent = Math.round(((completedCount + 0.5) / moduleStatuses.length) * 100);

  // İlk 3 başarı "kazanılmış", geri kalanı henüz kazanılmamış (mock).
  const unlockedAchievements = 3;

  return (
    <main className="mx-auto max-w-5xl px-6 py-16">
      <div className="mb-2">
        <Badge variant="warning">{t('mockNotice')}</Badge>
      </div>

      <div className="mb-10">
        <h1 className="font-heading text-2xl font-bold sm:text-3xl">
          {t('welcome', { name: MOCK_STUDENT_NAME })}
        </h1>
        <p className="text-muted mt-1">{t('subtitle')}</p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Sol/ana kolon */}
        <div className="flex flex-col gap-6 lg:col-span-2">
          {/* Mevcut program + ilerleme */}
          <Card>
            <p className="text-muted text-xs font-medium">{t('currentProgram')}</p>
            <h2 className="font-heading mt-1 text-lg font-semibold">{bootcamp.title}</h2>

            <div className="mt-4">
              <div className="mb-1.5 flex items-center justify-between text-sm">
                <span className="text-muted">{t('progress')}</span>
                <span className="font-medium">{progressPercent}%</span>
              </div>
              <div className="bg-border h-2 w-full overflow-hidden rounded-full">
                <div
                  className="bg-primary h-full rounded-full transition-all"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            {nextCohort && (
              <p className="text-muted mt-4 text-sm">
                {t('nextCohort')}:{' '}
                <span className="text-text font-medium">
                  {new Date(nextCohort.startDate).toLocaleDateString(undefined, {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                </span>
              </p>
            )}
          </Card>

          {/* Müfredat ilerlemesi */}
          <Card>
            <h2 className="font-heading mb-4 text-lg font-semibold">{t('curriculumTitle')}</h2>
            <ul className="flex flex-col gap-3">
              {moduleStatuses.map((module) => (
                <li key={module.title} className="flex items-center gap-3">
                  {module.status === 'completed' && (
                    <CheckCircle2 className="text-success h-5 w-5 shrink-0" />
                  )}
                  {module.status === 'in-progress' && (
                    <Clock className="text-warning h-5 w-5 shrink-0" />
                  )}
                  {module.status === 'upcoming' && (
                    <Circle className="text-border h-5 w-5 shrink-0" />
                  )}

                  <span
                    className={cn('flex-1 text-sm', module.status === 'upcoming' && 'text-muted')}
                  >
                    {module.title}
                  </span>

                  <Badge
                    variant={
                      module.status === 'completed'
                        ? 'success'
                        : module.status === 'in-progress'
                          ? 'warning'
                          : 'default'
                    }
                  >
                    {module.status === 'completed' && t('statusCompleted')}
                    {module.status === 'in-progress' && t('statusInProgress')}
                    {module.status === 'upcoming' && t('statusUpcoming')}
                  </Badge>
                </li>
              ))}
            </ul>
          </Card>
        </div>

        {/* Sağ kolon */}
        <div className="flex flex-col gap-6">
          {/* Başarılar */}
          <Card>
            <h2 className="font-heading mb-4 text-lg font-semibold">{t('achievementsTitle')}</h2>
            <ul className="flex flex-col gap-3">
              {achievementKeys.map((key, index) => {
                const isUnlocked = index < unlockedAchievements;
                return (
                  <li key={key} className="flex items-center gap-3">
                    <Trophy
                      className={cn(
                        'h-5 w-5 shrink-0',
                        isUnlocked ? 'text-warning' : 'text-border',
                      )}
                    />
                    <span className={cn('text-sm', !isUnlocked && 'text-muted')}>{t(key)}</span>
                  </li>
                );
              })}
            </ul>
          </Card>

          {/* Hızlı bağlantılar */}
          <Card>
            <h2 className="font-heading mb-4 text-lg font-semibold">{t('quickLinksTitle')}</h2>
            <div className="flex flex-col gap-2 text-sm">
              <Link
                href={`/bootcamps/${bootcamp.slug}`}
                className="text-primary font-medium hover:underline"
              >
                {t('linkCurriculum')}
              </Link>
              <Link href="/schedule" className="text-primary font-medium hover:underline">
                {t('linkSchedule')}
              </Link>
              <Link href="/contact" className="text-primary font-medium hover:underline">
                {t('linkSupport')}
              </Link>
            </div>
          </Card>
        </div>
      </div>
    </main>
  );
}
