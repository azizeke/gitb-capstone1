import type { Metadata } from 'next';
import { inter, spaceGrotesk } from '@/lib/fonts';
import '../globals.css';

/**
 * /styleguide, [locale] segmentinin DIŞINDA kendi root layout'una sahip
 * (bkz. Next.js "multiple root layouts" deseni). Bu bilinçli bir tercih:
 * styleguide, üründe listelenen bir sayfa değil, sadece geliştiriciler
 * için bir tasarım referansı olduğu için çevrilmiyor ve Header/Footer
 * içermiyor.
 */
export const metadata: Metadata = {
  title: 'Styleguide — Global IT Bootcamp',
  robots: 'noindex, nofollow',
};

export default function StyleguideLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable} h-full antialiased`}>
      <body className="bg-background text-text min-h-full">{children}</body>
    </html>
  );
}
