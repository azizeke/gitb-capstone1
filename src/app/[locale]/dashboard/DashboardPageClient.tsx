'use client';

import { CheckCircle2, Circle, Clock, Trophy } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { Badge, Card, Select } from '@/components/ui';
import { bootcamps } from '@/data/bootcamps';
import { cohorts } from '@/data/cohorts';
import { Link } from '@/i18n/navigation';
import { cn } from '@/lib/cn';

const achievementKeys = [
  'achievementEnrolled',
  'achievementFirstProject',
  'achievementHalfway',
  'achievementTeamProject',
] as const;

interface MockStudentProfile {
  id: string;
  name: string;
  bootcampSlug: string;
  /** Bu index'ten önceki modüller "tamamlandı", bu index "devam ediyor" sayılır. */
  currentModuleIndex: number;
  /** achievementKeys dizisinden kaç tanesi "kazanılmış" gösterilsin (0-4). */
  unlockedAchievements: number;
}

/**
 * Birden fazla mock öğrenci profili — gerçek bir hesap sistemi olmadığı
 * için (proje kapsamı dışı) farklı ilerleme durumlarını göstermek amacıyla
 * elle tanımlandı. Sayfadaki dropdown ile aralarında geçiş yapılabilir.
 */
const mockStudents: MockStudentProfile[] = [
  {
    id: 'asli',
    name: 'Aslı Demir',
    bootcampSlug: 'frontend-engineering-react-typescript',
    currentModuleIndex: 1,
    unlockedAchievements: 3,
  },
  {
    id: 'mert',
    name: 'Mert Yılmaz',
    bootcampSlug: 'cloud-devops-engineering',
    currentModuleIndex: 0,
    unlockedAchievements: 1,
  },
  {
    id: 'zeynep',
    name: 'Zeynep Kaya',
    bootcampSlug: 'machine-learning-engineering',
    currentModuleIndex: 2,
    unlockedAchievements: 4,
  },
];

export default function DashboardPageClient() {
  const t = useTranslations('DashboardPage');
  const [selectedId, setSelectedId] = useState(mockStudents[0].id);

  const student = mockStudents.find((s) => s.id === selectedId) ?? mockStudents[0];
  const bootcamp = bootcamps.find((b) => b.slug === student.bootcampSlug)!;
  const nextCohort = cohorts
    .filter((c) => c.bootcampSlug === student.bootcampSlug)
    .sort((a, b) => a.startDate.localeCompare(b.startDate))[0];

  const moduleStatuses = bootcamp.curriculum.map((module, index) => ({
    ...module,
    status:
      index < student.currentModuleIndex
        ? 'completed'
        : index === student.currentModuleIndex
          ? 'in-progress'
          : 'upcoming',
  }));

  const completedCount = student.currentModuleIndex;
  const progressPercent = Math.round(((completedCount + 0.5) / moduleStatuses.length) * 100);

  return (
    <main className="mx-auto max-w-5xl px-6 py-16">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <Badge variant="warning">{t('mockNotice')}</Badge>

        <div className="w-48">
          <Select
            label={t('selectStudentLabel')}
            value={selectedId}
            onChange={(e) => setSelectedId(e.target.value)}
            options={mockStudents.map((s) => ({ value: s.id, label: s.name }))}
          />
        </div>
      </div>

      <div className="mb-10">
        <h1 className="font-heading text-2xl font-bold sm:text-3xl">
          {t('welcome', { name: student.name })}
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
                const isUnlocked = index < student.unlockedAchievements;
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
