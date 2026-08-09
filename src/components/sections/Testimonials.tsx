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
            <h2 className="font-heading text-2xl font-bold sm:text-3xl">{t('title')}</h2>
            <p className="text-muted mt-2">{t('subtitle')}</p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((item) => (
              <Card key={item.id} className="flex flex-col gap-4">
                <div className="flex" role="img" aria-label={`${item.rating}/5`}>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={
                        i < item.rating
                          ? 'h-4 w-4 fill-current text-amber-500'
                          : 'text-border h-4 w-4'
                      }
                    />
                  ))}
                </div>

                <p className="text-text text-sm">&ldquo;{item.quote}&rdquo;</p>

                <div className="mt-auto flex items-center gap-3 pt-2">
                  <div className="relative h-10 w-10 overflow-hidden rounded-full">
                    <Image
                      src={item.avatar}
                      alt={item.name}
                      fill
                      className="object-cover"
                      sizes="40px"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{item.name}</p>
                    <p className="text-muted text-xs">
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
