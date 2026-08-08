import type { MetadataRoute } from 'next';
import { siteUrl } from '@/lib/site-config';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // /styleguide ürünün bir parçası değil, sadece geliştirici referansı
      // (bkz. src/app/styleguide/layout.tsx'teki karar gerekçesi).
      disallow: '/styleguide',
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
