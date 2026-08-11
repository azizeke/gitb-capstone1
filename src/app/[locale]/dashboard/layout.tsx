'use client';

import { useTranslations } from 'next-intl';
import { Badge } from '@/components/ui';
import { Link, usePathname } from '@/i18n/navigation';
import { cn } from '@/lib/cn';

const navItems = [
  { href: '/dashboard', key: 'navOverview' },
  { href: '/dashboard/bootcamps', key: 'navMyBootcamps' },
  { href: '/dashboard/profile', key: 'navProfile' },
] as const;

/**
 * Dashboard'un ortak "shell"i: sol tarafta (masaüstünde) dikey bir
 * navigasyon, dar ekranda ise üstte yatay kaydırılabilir bir sekme
 * çubuğuna "daralıyor" (collapse). Bu üç sayfanın (özet, bootcamplerim,
 * profil) hepsini sarar.
 */
export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const t = useTranslations('Common.dashboard');
  const pathname = usePathname();

  function isActive(href: string) {
    if (href === '/dashboard') return pathname === '/dashboard';
    return pathname.startsWith(href);
  }

  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      <div className="mb-6">
        <Badge variant="warning">{t('mockNotice')}</Badge>
      </div>

      <div className="flex flex-col gap-8 lg:flex-row">
        <nav
          aria-label={t('sidebarLabel')}
          className="border-border flex gap-2 overflow-x-auto border-b pb-3 lg:w-56 lg:shrink-0 lg:flex-col lg:gap-1 lg:border-r lg:border-b-0 lg:pr-6 lg:pb-0"
        >
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'shrink-0 rounded-md px-3 py-2 text-sm font-medium whitespace-nowrap transition-colors',
                isActive(item.href)
                  ? 'bg-primary/10 text-primary'
                  : 'text-muted hover:bg-surface hover:text-text',
              )}
            >
              {t(item.key)}
            </Link>
          ))}
        </nav>

        <div className="min-w-0 flex-1">{children}</div>
      </div>
    </main>
  );
}
