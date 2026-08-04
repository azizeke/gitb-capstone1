import { Inter, Space_Grotesk } from 'next/font/google';

/**
 * [locale] ve /styleguide ayrı root layout'lara sahip (bkz. Next.js
 * "multiple root layouts" deseni), bu yüzden font tanımları burada
 * paylaşılıyor ki iki yerde de aynı font ayarları tekrar edilmesin.
 */
export const spaceGrotesk = Space_Grotesk({
  variable: '--font-space-grotesk',
  subsets: ['latin'],
  display: 'swap',
});

export const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
});
