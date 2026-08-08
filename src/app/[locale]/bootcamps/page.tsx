import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { Suspense } from 'react';
import { Skeleton } from '@/components/ui';
import { BootcampsPageClient } from './BootcampsPageClient';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'BootcampsPage' });

  return {
    title: t('title'),
    description: t('subtitle'),
  };
}

function BootcampsPageFallback() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-16">
      <div className="mb-10 text-center">
        <Skeleton className="mx-auto h-9 w-64" />
        <Skeleton className="mx-auto mt-3 h-5 w-80" />
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-80 w-full" />
        ))}
      </div>
    </main>
  );
}

export default function BootcampsPage() {
  return (
    <Suspense fallback={<BootcampsPageFallback />}>
      <BootcampsPageClient />
    </Suspense>
  );
}
