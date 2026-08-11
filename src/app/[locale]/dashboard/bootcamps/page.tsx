import { BookOpen } from 'lucide-react';
import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { BootcampCard } from '@/components/sections/BootcampCard';
import { buttonStyles, Card } from '@/components/ui';
import { getBootcamps } from '@/data/bootcamps';
import { categories } from '@/data/categories';
import { enrollments } from '@/data/enrollments';
import { Link } from '@/i18n/navigation';
import type { Locale } from '@/types';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Common.dashboard' });

  return { title: t('navMyBootcamps'), robots: { index: false, follow: false } };
}

/**
 * "Bootcamplerim" — mock öğrencinin kayıtlı olduğu tüm programların kart
 * görünümü. Görsel kart için mevcut BootcampCard yeniden kullanılıyor
 * (sıfırdan yazılmadı); altına dashboard'a özel ilerleme çubuğu ve
 * müfredat takibi linki eklendi. BootcampCard'ın kendi "Programı Gör"
 * linki kasıtlı olarak dokunulmadan bırakıldı — halka açık detay
 * sayfasına gitmeye devam ediyor, iç içe link oluşturmamak için ayrı
 * bir "Müfredatı Gör" linki eklendi (dashboard'daki takip sayfasına).
 */
export default async function MyBootcampsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations('Common.dashboard');
  const bootcamps = getBootcamps(locale as Locale);

  const enrolled = enrollments
    .map((enrollment) => ({
      enrollment,
      bootcamp: bootcamps.find((b) => b.slug === enrollment.bootcampSlug),
    }))
    .filter(
      (
        e,
      ): e is {
        enrollment: (typeof enrollments)[number];
        bootcamp: NonNullable<typeof e.bootcamp>;
      } => Boolean(e.bootcamp),
    );

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="font-heading text-2xl font-bold sm:text-3xl">{t('myBootcampsTitle')}</h1>
        <p className="text-muted mt-1">{t('myBootcampsSubtitle')}</p>
      </div>

      {enrolled.length === 0 ? (
        <Card className="flex flex-col items-center gap-3 py-12 text-center">
          <BookOpen className="text-muted h-8 w-8" />
          <p className="font-heading font-semibold">{t('emptyEnrollmentsTitle')}</p>
          <p className="text-muted text-sm">{t('emptyEnrollmentsDescription')}</p>
          <Link href="/bootcamps" className={buttonStyles('primary', 'md') + ' mt-2'}>
            {t('browseBootcamps')}
          </Link>
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {enrolled.map(({ enrollment, bootcamp }, index) => {
            const category = categories.find((c) => c.slug === bootcamp.categorySlug);
            return (
              <div key={enrollment.id} className="flex flex-col gap-3">
                <BootcampCard
                  bootcamp={bootcamp}
                  categoryName={category?.name ?? bootcamp.categorySlug}
                  priority={index === 0}
                />
                <div>
                  <div className="mb-1.5 flex items-center justify-between text-xs">
                    <span className="text-muted">{t('progressLabel')}</span>
                    <span className="font-medium">{enrollment.progressPercent}%</span>
                  </div>
                  <div className="bg-border h-1.5 w-full overflow-hidden rounded-full">
                    <div
                      className="bg-primary h-full rounded-full transition-all"
                      style={{ width: `${enrollment.progressPercent}%` }}
                    />
                  </div>
                </div>
                <Link
                  href={`/dashboard/bootcamps/${bootcamp.slug}`}
                  className="text-primary text-sm font-medium hover:underline"
                >
                  {t('viewCurriculum')} →
                </Link>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
