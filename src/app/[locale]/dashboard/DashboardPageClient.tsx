'use client';

import {
  CheckCircle2,
  Circle,
  Clock,
  ClipboardCheck,
  Send,
  TrendingDown,
  TrendingUp,
} from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
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
  currentModuleIndex: number;
  unlockedAchievements: number;
  assignmentsCompleted: number;
  assignmentsTotal: number;
  studyHoursThisWeek: string;
  quizzesPassedTrend: number;
  submissionsTrend: number;
  submitted: number;
  pending: number;
  progressTrend: { planned: number; actual: number }[];
  weeklyStudyHours: number[];
}

/**
 * Birden fazla mock öğrenci profili — gerçek bir hesap/analitik sistemi
 * olmadığı için (proje kapsamı dışı) elle tanımlandı. Grafiklerdeki
 * renkler Tailwind class'ı DEĞİL, doğrudan `var(--color-primary)` gibi
 * CSS custom property referanslarıdır — çünkü recharts, ham SVG
 * özniteliği (fill/stroke) beklediği için Tailwind class'ı kabul etmez.
 * Bu sayede grafikler de tema (açık/koyu) değişiminde otomatik doğru
 * renge geçiyor, ayrı bir JS mantığına gerek kalmıyor.
 */
const mockStudents: MockStudentProfile[] = [
  {
    id: 'asli',
    name: 'Aslı Demir',
    bootcampSlug: 'frontend-engineering-react-typescript',
    currentModuleIndex: 1,
    unlockedAchievements: 3,
    assignmentsCompleted: 9,
    assignmentsTotal: 14,
    studyHoursThisWeek: '12h 30m',
    quizzesPassedTrend: 12,
    submissionsTrend: 8,
    submitted: 9,
    pending: 2,
    progressTrend: [
      { planned: 10, actual: 8 },
      { planned: 22, actual: 20 },
      { planned: 35, actual: 34 },
      { planned: 48, actual: 44 },
      { planned: 60, actual: 58 },
      { planned: 72, actual: 66 },
      { planned: 84, actual: 74 },
      { planned: 100, actual: 82 },
    ],
    weeklyStudyHours: [2.5, 1, 3, 2, 1.5, 3.5, 0],
  },
  {
    id: 'mert',
    name: 'Mert Yılmaz',
    bootcampSlug: 'cloud-devops-engineering',
    currentModuleIndex: 0,
    unlockedAchievements: 1,
    assignmentsCompleted: 2,
    assignmentsTotal: 12,
    studyHoursThisWeek: '5h 00m',
    quizzesPassedTrend: 5,
    submissionsTrend: -10,
    submitted: 2,
    pending: 3,
    progressTrend: [
      { planned: 12, actual: 4 },
      { planned: 25, actual: 10 },
      { planned: 37, actual: 14 },
      { planned: 50, actual: 18 },
      { planned: 62, actual: 20 },
      { planned: 75, actual: 22 },
      { planned: 87, actual: 24 },
      { planned: 100, actual: 26 },
    ],
    weeklyStudyHours: [1, 0, 2, 1, 0, 1, 0],
  },
  {
    id: 'zeynep',
    name: 'Zeynep Kaya',
    bootcampSlug: 'machine-learning-engineering',
    currentModuleIndex: 2,
    unlockedAchievements: 4,
    assignmentsCompleted: 16,
    assignmentsTotal: 16,
    studyHoursThisWeek: '18h 45m',
    quizzesPassedTrend: 25,
    submissionsTrend: 15,
    submitted: 16,
    pending: 0,
    progressTrend: [
      { planned: 14, actual: 15 },
      { planned: 28, actual: 30 },
      { planned: 42, actual: 45 },
      { planned: 56, actual: 60 },
      { planned: 70, actual: 74 },
      { planned: 84, actual: 88 },
      { planned: 95, actual: 96 },
      { planned: 100, actual: 100 },
    ],
    weeklyStudyHours: [3, 4, 2, 3, 2.5, 3, 1.5],
  },
];

function GradientStatCard({
  title,
  value,
  icon: Icon,
  from,
  to,
}: {
  title: string;
  value: string;
  icon: typeof Clock;
  from: string;
  to: string;
}) {
  return (
    <Card
      className="text-white"
      style={{ background: `linear-gradient(135deg, ${from}, ${to})`, border: 'none' }}
    >
      <div className="mb-6 flex items-center justify-between">
        <span className="text-sm font-medium text-white/90">{title}</span>
        <Icon className="h-5 w-5 text-white/80" />
      </div>
      <p className="font-heading text-3xl font-bold">{value}</p>
    </Card>
  );
}

function TrendStatCard({
  title,
  value,
  trend,
  icon: Icon,
}: {
  title: string;
  value: string;
  trend: number;
  icon: typeof Send;
}) {
  const isPositive = trend >= 0;
  return (
    <Card className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <span className="bg-primary/10 text-primary flex h-10 w-10 items-center justify-center rounded-full">
          <Icon className="h-5 w-5" />
        </span>
        <div>
          <p className="text-muted text-xs">{title}</p>
          <p className="text-lg font-semibold">{value}</p>
        </div>
      </div>
      <span
        className={cn(
          'flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium',
          isPositive ? 'bg-success/10 text-success' : 'bg-error/10 text-error',
        )}
      >
        {isPositive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
        {isPositive ? '+' : ''}
        {trend}%
      </span>
    </Card>
  );
}

export default function DashboardPageClient() {
  const t = useTranslations('DashboardPage');
  const searchParams = useSearchParams();

  /*
   * /dashboard?view=student — Login/Register sonrası buraya yönlendirilir.
   * Bu görünümde öğrenci seçici GİZLENİR, her zaman ilk mock profil
   * "kendi" panelin olarak sabit gösterilir (gerçek auth olmadığı için
   * "hangi öğrenci giriş yaptı" bilgisini bilemeyiz, bu yüzden demo
   * amaçlı sabit bir profil kullanılıyor).
   *
   * Header'daki "Dashboard" linki ise düz /dashboard adresine gider —
   * bu genel/eğitimci görünümüdür, seçici görünür kalır, istediği
   * öğrencinin panelini inceleyebilir.
   */
  const isStudentView = searchParams.get('view') === 'student';

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

  const moduleStatusCounts = {
    completed: moduleStatuses.filter((m) => m.status === 'completed').length,
    inProgress: moduleStatuses.filter((m) => m.status === 'in-progress').length,
    upcoming: moduleStatuses.filter((m) => m.status === 'upcoming').length,
  };

  const weekdaysShort = t.raw('weekdaysShort') as string[];

  const progressChartData = student.progressTrend.map((point, index) => ({
    week: t('weekLabel', { number: index + 1 }),
    [t('plannedLabel')]: point.planned,
    [t('actualLabel')]: point.actual,
  }));

  const weekdayChartData = weekdaysShort.map((day, index) => ({
    day,
    hours: student.weeklyStudyHours[index] ?? 0,
  }));

  const moduleDonutData = [
    {
      name: t('statusCompleted'),
      value: moduleStatusCounts.completed,
      color: 'var(--color-success)',
    },
    {
      name: t('statusInProgress'),
      value: moduleStatusCounts.inProgress,
      color: 'var(--color-warning)',
    },
    {
      name: t('statusUpcoming'),
      value: moduleStatusCounts.upcoming,
      color: 'var(--color-border)',
    },
  ].filter((d) => d.value > 0);

  const submissionDonutData = [
    { name: t('submittedLabel'), value: student.submitted, color: 'var(--color-primary)' },
    { name: t('pendingLabel'), value: student.pending, color: 'var(--color-border)' },
  ].filter((d) => d.value > 0);

  return (
    <main className="mx-auto max-w-6xl px-6 py-16">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <Badge variant="warning">{t('mockNotice')}</Badge>
        {!isStudentView && (
          <div className="w-48">
            <Select
              label={t('selectStudentLabel')}
              value={selectedId}
              onChange={(e) => setSelectedId(e.target.value)}
              options={mockStudents.map((s) => ({ value: s.id, label: s.name }))}
            />
          </div>
        )}
      </div>

      <div className="mb-8">
        <h1 className="font-heading text-2xl font-bold sm:text-3xl">
          {t('welcome', { name: student.name })}
        </h1>
        <p className="text-muted mt-1">{t('subtitle')}</p>
      </div>

      {/* Üst istatistik kartları */}
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <GradientStatCard
          title={t('assignmentsCompletedLabel')}
          value={`${student.assignmentsCompleted}/${student.assignmentsTotal}`}
          icon={ClipboardCheck}
          from="var(--color-primary)"
          to="var(--color-secondary)"
        />
        <GradientStatCard
          title={t('studyHoursThisWeekLabel')}
          value={student.studyHoursThisWeek}
          icon={Clock}
          from="var(--color-secondary)"
          to="var(--color-success)"
        />
        <TrendStatCard
          title={t('quizzesPassedLabel')}
          value={`${Math.round((moduleStatusCounts.completed / moduleStatuses.length) * 100)}%`}
          trend={student.quizzesPassedTrend}
          icon={CheckCircle2}
        />
        <TrendStatCard
          title={t('submissionsLabel')}
          value={`${student.submitted}/${student.submitted + student.pending}`}
          trend={student.submissionsTrend}
          icon={Send}
        />
      </div>

      {/* Ana ilerleme grafiği + yan kart */}
      <div className="mb-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <h2 className="font-heading mb-4 text-lg font-semibold">{t('progressOverTimeTitle')}</h2>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={progressChartData}>
                <defs>
                  <linearGradient id="actualFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.35} />
                    <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="week" stroke="var(--color-muted)" fontSize={12} />
                <YAxis stroke="var(--color-muted)" fontSize={12} unit="%" />
                <Tooltip
                  contentStyle={{
                    background: 'var(--color-surface)',
                    border: '1px solid var(--color-border)',
                    borderRadius: 8,
                    fontSize: 13,
                  }}
                />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Area
                  type="monotone"
                  dataKey={t('plannedLabel')}
                  stroke="var(--color-muted)"
                  strokeDasharray="4 4"
                  fill="none"
                />
                <Area
                  type="monotone"
                  dataKey={t('actualLabel')}
                  stroke="var(--color-primary)"
                  fill="url(#actualFill)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="flex flex-col">
          <h2 className="font-heading mb-1 text-base font-semibold">
            {t('studyTimeThisWeekTitle')}
          </h2>
          <p className="font-heading text-primary text-2xl font-bold">
            {student.studyHoursThisWeek}
          </p>
          <div className="mt-2 h-24 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={weekdayChartData}>
                <defs>
                  <linearGradient id="miniFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--color-secondary)" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="var(--color-secondary)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <Area
                  type="monotone"
                  dataKey="hours"
                  stroke="var(--color-secondary)"
                  fill="url(#miniFill)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <Link
            href={`/bootcamps/${bootcamp.slug}`}
            className="text-primary mt-auto pt-4 text-sm font-medium hover:underline"
          >
            {t('linkCurriculum')} →
          </Link>
        </Card>
      </div>

      {/* Donut'lar + haftalık bar grafiği */}
      <div className="mb-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card>
          <h2 className="font-heading mb-4 text-base font-semibold">{t('modulesByStatusTitle')}</h2>
          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={moduleDonutData}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={45}
                  outerRadius={70}
                  paddingAngle={3}
                >
                  {moduleDonutData.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Pie>
                <Legend
                  layout="vertical"
                  verticalAlign="middle"
                  align="right"
                  wrapperStyle={{ fontSize: 12 }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card>
          <h2 className="font-heading mb-4 text-base font-semibold">
            {t('submissionsVsPendingTitle')}
          </h2>
          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={submissionDonutData}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={45}
                  outerRadius={70}
                  paddingAngle={3}
                >
                  {submissionDonutData.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Pie>
                <Legend
                  layout="vertical"
                  verticalAlign="middle"
                  align="right"
                  wrapperStyle={{ fontSize: 12 }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card>
          <h2 className="font-heading mb-4 text-base font-semibold">
            {t('studyHoursByWeekdayTitle')}
          </h2>
          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weekdayChartData}>
                <XAxis dataKey="day" stroke="var(--color-muted)" fontSize={12} />
                <YAxis stroke="var(--color-muted)" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    background: 'var(--color-surface)',
                    border: '1px solid var(--color-border)',
                    borderRadius: 8,
                    fontSize: 13,
                  }}
                />
                <Bar dataKey="hours" fill="var(--color-secondary)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Müfredat ilerlemesi + başarılar */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
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

        <Card>
          <h2 className="font-heading mb-4 text-lg font-semibold">{t('achievementsTitle')}</h2>
          <ul className="flex flex-col gap-3">
            {achievementKeys.map((key, index) => {
              const isUnlocked = index < student.unlockedAchievements;
              return (
                <li key={key} className="flex items-center gap-3">
                  <CheckCircle2
                    className={cn('h-5 w-5 shrink-0', isUnlocked ? 'text-warning' : 'text-border')}
                  />
                  <span className={cn('text-sm', !isUnlocked && 'text-muted')}>{t(key)}</span>
                </li>
              );
            })}
          </ul>
        </Card>
      </div>
    </main>
  );
}
