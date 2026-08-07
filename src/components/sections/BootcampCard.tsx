import { Clock, Star } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Badge, Card } from '@/components/ui';
import { Link } from '@/i18n/navigation';
import type { Bootcamp } from '@/types';

export interface BootcampCardProps {
  bootcamp: Bootcamp;
  categoryName: string;
}

/**
 * Landing (öne çıkan programlar) ve Bootcamps liste sayfasında (EPIC D)
 * paylaşılan kart komponenti. Detay sayfası (/bootcamps/[slug]) henüz
 * EPIC D'de kurulacak; şimdilik link hedefi hazır ama sayfa yok, bu
 * normal ve beklenen bir ara durumdur.
 */
export function BootcampCard({ bootcamp, categoryName }: BootcampCardProps) {
  const t = useTranslations('Common');

  return (
    <Card className="flex flex-col overflow-hidden p-0">
      <div className="relative h-44 w-full">
        <Image
          src={bootcamp.heroImage}
          alt={bootcamp.title}
          fill
          className="object-cover"
          sizes="(min-width: 1024px) 320px, (min-width: 640px) 45vw, 90vw"
        />
        {bootcamp.featured && (
          <Badge variant="warning" className="absolute top-3 left-3">
            Featured
          </Badge>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-center gap-2">
          <Badge>{categoryName}</Badge>
          <Badge variant="default">{t(`levels.${bootcamp.level}`)}</Badge>
        </div>

        <Link href={`/bootcamps/${bootcamp.slug}`} className="hover:text-primary transition-colors">
          <h3 className="font-heading text-lg leading-snug font-semibold">{bootcamp.title}</h3>
        </Link>

        <p className="text-muted line-clamp-2 text-sm">{bootcamp.shortDescription}</p>

        <div className="text-muted mt-auto flex items-center gap-4 pt-2 text-xs">
          <span className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            {t('weeks', { count: bootcamp.durationWeeks })}
          </span>
          <span className="flex items-center gap-1">
            <Star className="h-3.5 w-3.5 fill-current text-amber-500" />
            {bootcamp.rating.toFixed(1)} ({bootcamp.studentCount})
          </span>
        </div>

        <div className="border-border flex items-center justify-between border-t pt-3">
          <div className="flex flex-col">
            <span className="font-heading text-lg font-bold">
              €{bootcamp.priceEUR.toLocaleString()}
            </span>
            <span className="text-muted text-xs">{t(`formats.${bootcamp.format}`)}</span>
          </div>
          <Link
            href={`/bootcamps/${bootcamp.slug}`}
            className="text-primary text-sm font-medium hover:underline"
          >
            {t('viewProgram')}
          </Link>
        </div>
      </div>
    </Card>
  );
}
