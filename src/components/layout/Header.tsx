'use client';

import { Menu } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { buttonStyles } from '@/components/ui';
import { Link } from '@/i18n/navigation';
import { LocaleSwitcher } from './LocaleSwitcher';
import { MobileMenu } from './MobileMenu';
import { ThemeToggle } from './ThemeToggle';

/**
 * Header davranışı: sticky (kaydırmada her zaman görünür kalır).
 * Alternatif olarak "scroll'da gizlenen" davranış da şartnamede kabul
 * ediliyor; sticky, navigasyona her an erişimi koruduğu için tercih
 * edildi (README'de gerekçelendirildi).
 */
export function Header() {
  const t = useTranslations('Header');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: '/bootcamps', label: t('nav.bootcamps') },
    { href: '/schedule', label: t('nav.schedule') },
    { href: '/about', label: t('nav.about') },
    { href: '/contact', label: t('nav.contact') },
    { href: '/dashboard', label: t('nav.dashboard') },
  ];

  return (
    <header className="border-border bg-background/80 sticky top-0 z-40 border-b backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link href="/" className="font-heading text-lg font-bold">
          {t('logo')}
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-muted hover:text-text text-sm font-medium transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <LocaleSwitcher />
          <ThemeToggle />
          <Link href="/auth/register" className={buttonStyles('primary', 'sm')}>
            {t('cta')}
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setIsMobileMenuOpen(true)}
          aria-label={t('openMenu')}
          className="text-text hover:bg-surface flex h-9 w-9 items-center justify-center rounded-md md:hidden"
        >
          <Menu className="h-5 w-5" />
        </button>
      </div>

      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        links={navLinks}
      />
    </header>
  );
}
