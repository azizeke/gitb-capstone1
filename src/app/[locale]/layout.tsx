import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { routing } from '@/i18n/routing';
import { inter, spaceGrotesk } from '@/lib/fonts';
import { themeInitScript } from '@/lib/theme-script';
import '../globals.css';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  title: 'Global IT Bootcamp',
  description: 'Kariyerini değiştirecek bootcamp programlarını keşfet.',
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const isValidLocale = routing.locales.includes(locale as (typeof routing.locales)[number]);
  if (!isValidLocale) {
    notFound();
  }

  return (
    <html
      lang={locale}
      className={`${spaceGrotesk.variable} ${inter.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="bg-background text-text flex min-h-full flex-col">

        <script suppressHydrationWarning dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <NextIntlClientProvider locale={locale}>
          <Header />
          <div className="flex-1">{children}</div>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}