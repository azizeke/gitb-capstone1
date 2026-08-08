import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import LoginPageClient from './LoginPageClient';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'LoginPage' });

  return {
    title: t('title'),
    description: t('subtitle'),
  };
}

export default function LoginPage() {
  return <LoginPageClient />;
}
