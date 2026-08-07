import type { Metadata } from 'next';
import { inter, spaceGrotesk } from '@/lib/fonts';
import { themeInitScript } from '@/lib/theme-script';
import '../globals.css';

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
        {/* eslint-disable-next-line react/no-danger */}
        <script suppressHydrationWarning dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        {children}
      </body>
    </html>
  );
}