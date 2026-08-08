import { SearchX } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { buttonStyles } from '@/components/ui';

export default async function NotFound() {
  const t = await getTranslations('NotFoundPage');

  const popularLinks = [
    { href: '/bootcamps', label: t('linkBootcamps') },
    { href: '/about', label: t('linkAbout') },
    { href: '/contact', label: t('linkContact') },
  ];

  return (
    <main className="mx-auto flex min-h-[70vh] max-w-md flex-col items-center justify-center px-6 text-center">
      <SearchX className="text-muted h-10 w-10" />
      <p className="font-heading mt-4 text-5xl font-bold">{t('title')}</p>
      <h1 className="font-heading mt-2 text-xl font-semibold">{t('heading')}</h1>
      <p className="text-muted mt-2 text-sm">{t('message')}</p>

      <Link href="/" className={buttonStyles('primary', 'md') + ' mt-6'}>
        {t('backHome')}
      </Link>

      <div className="mt-10 w-full">
        <p className="text-muted mb-3 text-xs font-medium">{t('popularPages')}</p>
        <div className="flex flex-wrap justify-center gap-3">
          {popularLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-primary text-sm font-medium hover:underline"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
