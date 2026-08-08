import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import { Badge } from '@/components/ui';
import { instructors } from '@/data/instructors';
import { testimonials } from '@/data/testimonials';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'AboutPage' });

  return {
    title: t('title'),
    description: t('subtitle'),
  };
}

interface TimelineItem {
  year: string;
  title: string;
  description: string;
}

export default async function AboutPage() {
  const t = await getTranslations('AboutPage');
  const timeline = t.raw('timeline') as TimelineItem[];

  // Yorumlardaki şirket isimlerinden, tekrarsız bir "işe alım ortağı" listesi
  // türetiliyor. Gerçek marka logoları (telif/marka hakkı riski taşıdığı
  // için) kullanılmıyor; sadece şirket adı metinleri gösteriliyor.
  const partnerCompanies = Array.from(new Set(testimonials.map((t) => t.company))).sort();

  const stats = [
    { label: t('statsGraduates'), value: '2,400+' },
    { label: t('statsHiringRate'), value: '87%' },
    { label: t('statsPartners'), value: '120+' },
    { label: t('statsFounded'), value: '2019' },
  ];

  return (
    <main>
      {/* Hero */}
      <section className="border-border border-b px-6 py-16 text-center">
        <h1 className="font-heading text-3xl font-bold sm:text-4xl">{t('title')}</h1>
        <p className="text-muted mx-auto mt-4 max-w-2xl">{t('subtitle')}</p>
      </section>

      {/* Misyon + istatistikler */}
      <section className="bg-surface px-6 py-16">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-heading text-2xl font-bold">{t('missionTitle')}</h2>
          <p className="text-muted mt-4">{t('missionText')}</p>
        </div>

        <div className="mx-auto mt-12 grid max-w-3xl grid-cols-2 gap-6 sm:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="font-heading text-2xl font-bold sm:text-3xl">{stat.value}</p>
              <p className="text-muted mt-1 text-xs sm:text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Ekip */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="mb-10 text-center">
          <h2 className="font-heading text-2xl font-bold sm:text-3xl">{t('teamTitle')}</h2>
          <p className="text-muted mt-2">{t('teamSubtitle')}</p>
        </div>

        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6">
          {instructors.map((instructor) => (
            <div key={instructor.slug} className="text-center">
              <div className="relative mx-auto h-16 w-16 overflow-hidden rounded-full sm:h-20 sm:w-20">
                <Image
                  src={instructor.avatar}
                  alt={instructor.name}
                  fill
                  className="object-cover"
                  sizes="80px"
                />
              </div>
              <h3 className="font-heading mt-3 text-xs font-semibold sm:text-sm">
                {instructor.name}
              </h3>
              <p className="text-muted text-xs">{instructor.title}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Zaman çizelgesi */}
      <section className="bg-surface px-6 py-16">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-heading mb-10 text-center text-2xl font-bold sm:text-3xl">
            {t('timelineTitle')}
          </h2>

          <div className="border-border relative flex flex-col gap-10 border-l pl-6">
            {timeline.map((item) => (
              <div key={item.year} className="relative">
                <span className="bg-primary absolute top-1 -left-[27px] h-3 w-3 rounded-full" />
                <Badge>{item.year}</Badge>
                <h3 className="font-heading mt-2 font-semibold">{item.title}</h3>
                <p className="text-muted mt-1 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partnerler */}
      <section className="mx-auto max-w-4xl px-6 py-16 text-center">
        <h2 className="font-heading mb-8 text-2xl font-bold sm:text-3xl">{t('partnersTitle')}</h2>
        {/*
         * Gerçek şirket isimleri (mezunların çalıştığı şirketler) metin
         * olarak gösteriliyor; gerçek marka logoları (görseller) telif/marka
         * hakkı riski taşıdığı için kullanılmıyor. "Wordmark" tipografisi
         * (kalın, geniş harf aralığı, başlık fontu) bir logo şeridi hissi
         * vermek için tercih edildi.
         */}
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-8">
          {partnerCompanies.map((company) => (
            <span
              key={company}
              className="font-heading text-text/70 hover:text-text text-2xl font-extrabold tracking-tight transition-colors sm:text-3xl"
            >
              {company}
            </span>
          ))}
        </div>
      </section>
    </main>
  );
}
