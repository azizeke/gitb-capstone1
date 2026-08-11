// TESTMARKER123
'use client';

import { Search, X } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import { useMemo, useTransition } from 'react';
import { BootcampCard } from '@/components/sections/BootcampCard';
import { Input, Select, Skeleton } from '@/components/ui';
import { getBootcamps } from '@/data/bootcamps';
import { categories } from '@/data/categories';
import { useRouter, usePathname } from '@/i18n/navigation';
import type { Level, Locale } from '@/types';

type SortOption = 'popular' | 'price' | 'duration';

/**
 * Filtre durumu URL query param'larında tutulur (?q=&category=&level=&sort=)
 * böylece link paylaşıldığında filtreler korunur (proje şartnamesi D-02).
 *
 * "Loading state" (skeleton kartlar) `useTransition` ile elde ediliyor:
 * `router.replace` çağrıları bir transition içine sarılınca React, o
 * navigasyon tamamlanana kadar `isPending`'i otomatik true tutuyor. Bu,
 * elle bir zamanlayıcı (setTimeout) kurup senkron `setState` çağırmaktan
 * (React'in artık önermediği bir kalıp) daha doğru bir yöntem.
 */
export function BootcampsPageClient() {
  const t = useTranslations('BootcampsPage');
  const tCommon = useTranslations('Common');
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const query = searchParams.get('q') ?? '';
  const selectedCategories = useMemo(
    () => searchParams.get('category')?.split(',').filter(Boolean) ?? [],
    [searchParams],
  );
  const level = (searchParams.get('level') as Level | null) ?? null;
  const sort = (searchParams.get('sort') as SortOption | null) ?? 'popular';

  function updateParams(updates: Record<string, string | null>) {
    const params = new URLSearchParams(searchParams.toString());
    for (const [key, value] of Object.entries(updates)) {
      if (value === null || value === '') {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    }
    startTransition(() => {
      router.replace(`${pathname}?${params.toString()}`);
    });
  }

  function toggleCategory(slug: string) {
    const next = selectedCategories.includes(slug)
      ? selectedCategories.filter((c) => c !== slug)
      : [...selectedCategories, slug];
    updateParams({ category: next.length > 0 ? next.join(',') : null });
  }

  function clearFilters() {
    startTransition(() => {
      router.replace(pathname);
    });
  }

  const filtered = useMemo(() => {
    let result = getBootcamps(locale);

    if (query.trim()) {
      const q = query.trim().toLowerCase();
      result = result.filter(
        (b) =>
          b.title.toLowerCase().includes(q) || b.tags.some((tag) => tag.toLowerCase().includes(q)),
      );
    }

    if (selectedCategories.length > 0) {
      result = result.filter((b) => selectedCategories.includes(b.categorySlug));
    }

    if (level) {
      result = result.filter((b) => b.level === level);
    }

    const sorted = [...result];
    if (sort === 'popular') {
      sorted.sort((a, b) => b.studentCount - a.studentCount);
    } else if (sort === 'price') {
      sorted.sort((a, b) => a.priceEUR - b.priceEUR);
    } else if (sort === 'duration') {
      sorted.sort((a, b) => a.durationWeeks - b.durationWeeks);
    }

    return sorted;
  }, [query, selectedCategories, level, sort, locale]);

  const hasActiveFilters = query !== '' || selectedCategories.length > 0 || level !== null;

  return (
    <>
      {/* Hero bandı: başlık + açıklama + arama kutusu tek bir birim olarak */}
      <section className="border-border bg-surface border-b px-6 py-16 text-center">
        <h1 className="font-heading text-3xl font-bold">{t('title')}</h1>
        <p className="text-muted mx-auto mt-2 max-w-xl">{t('subtitle')}</p>

        <div className="mx-auto mt-6 max-w-lg">
          <Input
            type="search"
            placeholder={t('searchPlaceholder')}
            defaultValue={query}
            onChange={(e) => updateParams({ q: e.target.value || null })}
            aria-label={t('searchPlaceholder')}
          />
        </div>
      </section>

      <main className="mx-auto max-w-6xl px-6 py-16">
        <div className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-[240px_1fr]">
          {/* Filtreler */}
          <aside className="flex flex-col gap-6">
            <div>
              <p className="mb-2 text-sm font-medium">{t('categoryLabel')}</p>
              <div className="flex flex-col gap-2">
                {categories.map((category) => (
                  <label key={category.slug} className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(category.slug)}
                      onChange={() => toggleCategory(category.slug)}
                      className="border-border text-primary h-4 w-4 rounded"
                    />
                    {category.name}
                  </label>
                ))}
              </div>
            </div>

            <Select
              label={t('levelLabel')}
              value={level ?? ''}
              onChange={(e) => updateParams({ level: e.target.value || null })}
              options={[
                { value: '', label: t('allLevels') },
                { value: 'beginner', label: tCommon('levels.beginner') },
                { value: 'intermediate', label: tCommon('levels.intermediate') },
                { value: 'advanced', label: tCommon('levels.advanced') },
              ]}
            />

            <Select
              label={t('sortLabel')}
              value={sort}
              onChange={(e) => updateParams({ sort: e.target.value })}
              options={[
                { value: 'popular', label: t('sortPopular') },
                { value: 'price', label: t('sortPriceAsc') },
                { value: 'duration', label: t('sortDuration') },
              ]}
            />

            {hasActiveFilters && (
              <button
                type="button"
                onClick={clearFilters}
                className="text-muted hover:text-text flex items-center gap-1 text-sm"
              >
                <X className="h-3.5 w-3.5" />
                {t('clearFilters')}
              </button>
            )}
          </aside>

          {/* Sonuçlar */}
          <div>
            <p className="text-muted mb-4 text-sm">
              {t('resultsCount', { count: filtered.length })}
            </p>

            {isPending ? (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {Array.from({ length: 6 }).map((_, i) => (
                  <Skeleton key={i} className="h-80 w-full" />
                ))}
              </div>
            ) : filtered.length === 0 ? (
              <div className="border-border flex flex-col items-center gap-3 rounded-lg border border-dashed p-12 text-center">
                <Search className="text-muted h-8 w-8" />
                <p className="font-heading font-semibold">{t('emptyTitle')}</p>
                <p className="text-muted text-sm">{t('emptyDescription')}</p>
                <button
                  type="button"
                  onClick={clearFilters}
                  className="text-primary text-sm font-medium hover:underline"
                >
                  {t('clearFilters')}
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {filtered.map((bootcamp, index) => {
                  const category = categories.find((c) => c.slug === bootcamp.categorySlug);
                  return (
                    <BootcampCard
                      key={bootcamp.slug}
                      bootcamp={bootcamp}
                      categoryName={category?.name ?? bootcamp.categorySlug}
                      priority={index === 0}
                    />
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}