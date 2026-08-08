import type { Metadata } from 'next';
import { inter, spaceGrotesk } from '@/lib/fonts';
import { themeInitScript } from '@/lib/theme-script';
import '../globals.css';

/**
 * /styleguide, [locale] segmentinin DIŞINDA kendi root layout'una sahip
 * (bkz. Next.js "multiple root layouts" deseni). Bu bilinçli bir tercih:
 * styleguide, üründe listelenen bir sayfa değil, sadece geliştiriciler
 * için bir tasarım referansı olduğu için çevrilmiyor ve Header/Footer
 * içermiyor.
 *
 * Tema init script'i burada da çalışıyor ki üründe (örn. /en sayfasında)
 * seçilen tema, /styleguide'a geçildiğinde de korunsun.
 */
export const metadata: Metadata = {
  title: 'Styleguide — Global IT Bootcamp',
  robots: 'noindex, nofollow',
};

export default function StyleguideLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="bg-background text-text min-h-full">
        <script suppressHydrationWarning dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        {children}
      </body>
    </html>
  );
}
