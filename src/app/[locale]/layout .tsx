import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { CookieConsent } from '@/components/layout/CookieConsent';
import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { PageTransition } from '@/components/layout/PageTransition';
import { routing } from '@/i18n/routing';
import { inter, spaceGrotesk } from '@/lib/fonts';
import { siteUrl } from '@/lib/site-config';
import { themeInitScript } from '@/lib/theme-script';
import '../globals.css';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

/**
 * Kök metadata: her sayfa kendi title'ını `generateMetadata` ile
 * belirler (bkz. her page.tsx), buradaki `title.default` yalnızca hiçbir
 * sayfa metadata'sı olmayan durumlar için bir yedek. `title.template`
 * sayesinde her sayfa sadece kendi başlığını döndürür, " | Global IT
 * Bootcamp" eki otomatik eklenir.
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'HomePage' });

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: 'Global IT Bootcamp',
      template: '%s | Global IT Bootcamp',
    },
    description: t('hero.subtitle'),
    openGraph: {
      type: 'website',
      siteName: 'Global IT Bootcamp',
      locale,
    },
    twitter: {
      card: 'summary_large_image',
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Bilinmeyen bir locale segmenti gelirse (örn. /fr) 404 göster.
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
          <div className="flex-1">
            <PageTransition>{children}</PageTransition>
          </div>
          <Footer />
          <CookieConsent />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
