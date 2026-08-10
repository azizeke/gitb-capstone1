import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import DashboardPageClient from './DashboardPageClient';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'DashboardPage' });

  return { title: t('title'), robots: { index: false, follow: false } };
}

/**
 * Statik bir öğrenci dashboard mockup'ı ("Should" — proje şartnamesi).
 * Gerçek kullanıcı sistemi/auth proje kapsamı dışında olduğu için burada
 * gösterilen öğrenciler, ilerleme yüzdeleri ve müfredat durumları
 * tamamen sabit mock verilerdir; hiçbir gerçek hesaba bağlı değildir.
 * Asıl interaktif içerik (öğrenci seçici dropdown dahil) DashboardPageClient
 * içinde — bu dosya sadece sayfa metadata'sını (title, noindex) sağlıyor.
 */
export default function DashboardPage() {
  return <DashboardPageClient />;
}
