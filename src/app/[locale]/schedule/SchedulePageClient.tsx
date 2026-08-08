'use client';

import { useLocale, useTranslations } from 'next-intl';
import { useMemo, useState } from 'react';
import { CountdownTimer } from '@/components/sections/CountdownTimer';
import { Card, Select } from '@/components/ui';
import { bootcamps } from '@/data/bootcamps';
import { cohorts } from '@/data/cohorts';
import { Link } from '@/i18n/navigation';

/**
 * Kohort başlangıç saati veride tutulmuyor (sadece tarih var), bu yüzden
 * geri sayım için 09:00 yerel saat varsayılıyor. Bu, ürünün gerçek bir
 * backend'i olmadığı için (proje kapsamı dışı) makul bir mock kararı.
 */
const ASSUMED_START_TIME = 'T09:00:00';

export default function SchedulePageClient() {
  const t = useTranslations('SchedulePage');
  const tCommon = useTranslations('Common');
  const locale = useLocale();
  const [selectedMonth, setSelectedMonth] = useState('all');

  const today = new Date().toISOString().slice(0, 10);

  const enrichedCohorts = useMemo(() => {
    return cohorts
      .map((cohort) => ({
        ...cohort,
        bootcamp: bootcamps.find((b) => b.slug === cohort.bootcampSlug),
      }))
      .filter((c) => c.bootcamp)
      .sort((a, b) => a.startDate.localeCompare(b.startDate));
  }, []);

  const nextCohort = enrichedCohorts.find((c) => c.startDate >= today);

  const monthFormatter = useMemo(
    () => new Intl.DateTimeFormat(locale, { month: 'long', year: 'numeric' }),
    [locale],
  );

  const monthOptions = useMemo(() => {
    const seen = new Map<string, string>();
    for (const cohort of enrichedCohorts) {
      const key = cohort.startDate.slice(0, 7); // "YYYY-MM"
      if (!seen.has(key)) {
        seen.set(key, monthFormatter.format(new Date(`${key}-01`)));
      }
    }
    return Array.from(seen.entries());
  }, [enrichedCohorts, monthFormatter]);

  const filteredCohorts =
    selectedMonth === 'all'
      ? enrichedCohorts
      : enrichedCohorts.filter((c) => c.startDate.slice(0, 7) === selectedMonth);

  return (
    <main className="mx-auto max-w-6xl px-6 py-16">
      <div className="mb-10 text-center">
        <h1 className="font-heading text-3xl font-bold">{t('title')}</h1>
        <p className="text-muted mt-2">{t('subtitle')}</p>
      </div>

      {/* Öne çıkan canlı geri sayım */}
      {nextCohort && nextCohort.bootcamp && (
        <Card className="mb-12 flex flex-col items-center gap-4 py-10 text-center">
          <div>
            <p className="text-muted text-sm">{t('nextCohortTitle')}</p>
            <Link
              href={`/bootcamps/${nextCohort.bootcamp.slug}`}
              className="font-heading hover:text-primary text-xl font-bold"
            >
              {nextCohort.bootcamp.title}
            </Link>
          </div>
          <CountdownTimer
            targetDate={`${nextCohort.startDate}${ASSUMED_START_TIME}`}
            labels={{
              days: t('days'),
              hours: t('hours'),
              minutes: t('minutes'),
              seconds: t('seconds'),
            }}
            startedLabel={t('statusStarted')}
          />
        </Card>
      )}

      {/* Ay filtresi */}
      <div className="mb-6 max-w-xs">
        <Select
          label={t('filterByMonth')}
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
          options={[
            { value: 'all', label: t('allMonths') },
            ...monthOptions.map(([key, label]) => ({ value: key, label })),
          ]}
        />
      </div>

      {/* Kohort tablosu */}
      {filteredCohorts.length === 0 ? (
        <p className="text-muted py-12 text-center text-sm">{t('noResults')}</p>
      ) : (
        <div className="border-border overflow-x-auto rounded-lg border">
          <table className="w-full text-left text-sm">
            <thead className="bg-surface text-muted text-xs">
              <tr>
                <th className="px-4 py-3 font-medium">{t('program')}</th>
                <th className="px-4 py-3 font-medium">{t('startDate')}</th>
                <th className="px-4 py-3 font-medium">{t('endDate')}</th>
                <th className="px-4 py-3 font-medium">{t('seats')}</th>
                <th className="px-4 py-3 font-medium">{t('format')}</th>
                <th className="px-4 py-3 font-medium">{t('status')}</th>
              </tr>
            </thead>
            <tbody className="divide-border divide-y">
              {filteredCohorts.map((cohort) => {
                const hasStarted = cohort.startDate < today;
                const isFull = cohort.seatsLeft <= 0;

                return (
                  <tr key={cohort.id}>
                    <td className="px-4 py-3">
                      <Link
                        href={`/bootcamps/${cohort.bootcamp!.slug}`}
                        className="hover:text-primary font-medium"
                      >
                        {cohort.bootcamp!.title}
                      </Link>
                    </td>
                    <td className="px-4 py-3">
                      {new Date(cohort.startDate).toLocaleDateString(locale, {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </td>
                    <td className="px-4 py-3">
                      {new Date(cohort.endDate).toLocaleDateString(locale, {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </td>
                    <td className="px-4 py-3">
                      {isFull ? t('statusFull') : t('seatsLeft', { count: cohort.seatsLeft })}
                    </td>
                    <td className="px-4 py-3">{tCommon(`formats.${cohort.format}`)}</td>
                    <td className="px-4 py-3">
                      {hasStarted ? (
                        <span className="text-muted">{t('statusStarted')}</span>
                      ) : isFull ? (
                        <span className="text-error">{t('statusFull')}</span>
                      ) : (
                        <span className="text-success">{t('statusUpcoming')}</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}
