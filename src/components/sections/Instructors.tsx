import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { instructors } from '@/data/instructors';

export function Instructors() {
  const t = useTranslations('HomePage.instructors');
  const featured = instructors.slice(0, 4);

  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <div className="mb-10 text-center">
        <h2 className="font-heading text-2xl font-bold sm:text-3xl">{t('title')}</h2>
        <p className="text-muted mt-2">{t('subtitle')}</p>
      </div>

      <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
        {featured.map((instructor) => (
          <div key={instructor.slug} className="text-center">
            <div className="relative mx-auto h-20 w-20 overflow-hidden rounded-full sm:h-24 sm:w-24">
              <Image
                src={instructor.avatar}
                alt={instructor.name}
                fill
                className="object-cover"
                sizes="96px"
              />
            </div>
            <h3 className="font-heading mt-3 text-sm font-semibold">{instructor.name}</h3>
            <p className="text-muted text-xs">{instructor.title}</p>
            <p className="text-muted mt-0.5 text-xs">{instructor.company}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
