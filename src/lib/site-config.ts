/**
 * Vercel'e deploy ettikten sonra bu değeri kendi gerçek URL'inle
 * (örn. https://gitb-capstone1.vercel.app) değiştir, ya da Vercel proje
 * ayarlarında NEXT_PUBLIC_SITE_URL adında bir environment variable
 * tanımla — o zaman burayı hiç değiştirmene gerek kalmaz.
 */
export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://gitb-capstone1.vercel.app';
