import type { MetadataRoute } from 'next';
import { siteUrl } from '@/lib/site-config';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      /*
       * /styleguide ürünün bir parçası değil, sadece geliştirici referansı.
       * /dashboard ise gerçek bir hesaba bağlı olmayan, sabit mock veri
       * gösteren bir önizleme sayfası — arama motorlarının bunu gerçek bir
       * kullanıcı paneliymiş gibi indexlememesi için hariç tutuluyor.
       */
      disallow: ['/styleguide', '/*/dashboard'],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
