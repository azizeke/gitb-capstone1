import { Star } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Card } from '@/components/ui';
import { testimonials } from '@/data/testimonials';
import { ScrollReveal } from './ScrollReveal';

export function Testimonials() {
  const t = useTranslations('HomePage.testimonials');
  const featured = testimonials.slice(0, 6);

  return (
    <ScrollReveal>
      <section className="bg-surface py-16">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-10 text-center">
            <h2 className="font-heading text-3xl font-bold sm:text-4xl">{t('title')}</h2>
            <p className="text-muted mt-3 text-lg">{t('subtitle')}</p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((item) => (
              <Card key={item.id} className="flex flex-col gap-5 p-6">
                <div className="flex" role="img" aria-label={`${item.rating}/5`}>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={
                        i < item.rating
                          ? 'h-5 w-5 fill-current text-amber-500'
                          : 'text-border h-5 w-5'
                      }
                    />
                  ))}
                </div>

                <p className="text-text text-base">&ldquo;{item.quote}&rdquo;</p>

                <div className="mt-auto flex items-center gap-4 pt-2">
                  <div className="relative h-14 w-14 overflow-hidden rounded-full">
                    <Image
                      src={item.avatar}
                      alt={item.name}
                      fill
                      className="object-cover"
                      sizes="56px"
                    />
                  </div>
                  <div>
                    <p className="text-base font-medium">{item.name}</p>
                    <p className="text-muted text-sm">
                      {item.role} · {item.company}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </ScrollReveal>
  );
}