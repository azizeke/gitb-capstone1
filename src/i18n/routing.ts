import { defineRouting } from 'next-intl/routing';

/**
 * Referans ürün (global-it.team-vit-devops.nl/en) varsayılan olarak /en
 * yolunu kullanıyor, bu yüzden defaultLocale 'en' seçildi. localePrefix:
 * 'always' ile hem /en hem /tr her zaman URL'de görünür oluyor — bu,
 * dilin paylaşılabilir linklerde de korunmasını sağlıyor.
 */
export const routing = defineRouting({
  locales: ['en', 'tr'],
  defaultLocale: 'en',
  localePrefix: 'always',
});
