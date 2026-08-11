import type { MetadataRoute } from 'next';
import { bootcampSlugs } from '@/data/bootcamps';
import { routing } from '@/i18n/routing';
import { siteUrl } from '@/lib/site-config';

const staticPaths = [
  '',
  '/bootcamps',
  '/schedule',
  '/about',
  '/contact',
  '/auth/login',
  '/auth/register',
];

/**
 * Her locale için (en, tr) tüm statik sayfaları ve her bootcamp'in detay
 * sayfasını içeren sitemap. /styleguide kasıtlı olarak dışarıda bırakıldı
 * (robots.ts'te de disallow edildi) — ürünün bir parçası değil.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of routing.locales) {
    for (const path of staticPaths) {
      entries.push({
        url: `${siteUrl}/${locale}${path}`,
        lastModified: new Date(),
      });
    }

    for (const slug of bootcampSlugs) {
      entries.push({
        url: `${siteUrl}/${locale}/bootcamps/${slug}`,
        lastModified: new Date(),
      });
    }
  }

  return entries;
}
