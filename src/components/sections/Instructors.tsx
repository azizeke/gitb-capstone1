import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { instructors } from '@/data/instructors';

export function Instructors() {
  const t = useTranslations('HomePage.instructors');
  const featured = instructors.slice(0, 4);

  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <div className="mb-10 text-center">
        <h2 className="font-heading text-3xl font-bold sm:text-4xl">{t('title')}</h2>
        <p className="text-muted mt-3 text-lg">{t('subtitle')}</p>
      </div>

      <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
        {featured.map((instructor) => (
          <div key={instructor.slug} className="text-center">
            <div className="relative mx-auto h-32 w-32 overflow-hidden rounded-full sm:h-40 sm:w-40">
              <Image
                src={instructor.avatar}
                alt={instructor.name}
                fill
                className="object-cover"
                sizes="160px"
              />
            </div>
            <h3 className="font-heading mt-4 text-base font-semibold">{instructor.name}</h3>
            <p className="text-muted text-sm">{instructor.title}</p>
            <p className="text-muted mt-0.5 text-sm">{instructor.company}</p>
          </div>
        ))}
      </div>
    </section>
  );
}