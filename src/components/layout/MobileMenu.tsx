'use client';

import { X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useEffect, useRef } from 'react';
import { Button } from '@/components/ui';
import { Link } from '@/i18n/navigation';

export interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  links: { href: string; label: string }[];
}

/**
 * Tam ekran mobil navigasyon paneli.
 *
 * Erişilebilirlik gereksinimleri (proje şartnamesi):
 * - Escape tuşu menüyü kapatır
 * - Focus trap: Tab ile gezinirken odak panelin dışına çıkmaz
 * - Kapandığında odak, menüyü açan hamburger butonuna geri döner
 */
export function MobileMenu({ isOpen, onClose, links }: MobileMenuProps) {
  const t = useTranslations('MobileMenu');
  const tHeader = useTranslations('Header');
  const panelRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    // Panel açılınca odağı kapatma butonuna taşı.
    closeButtonRef.current?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        onClose();
        return;
      }

      if (event.key !== 'Tab' || !panelRef.current) return;

      const focusableElements = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled])',
      );
      if (focusableElements.length === 0) return;

      const first = focusableElements[0];
      const last = focusableElements[focusableElements.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      ref={panelRef}
      role="dialog"
      aria-modal="true"
      aria-label="Mobil navigasyon"
      className="bg-background fixed inset-0 z-50 flex flex-col md:hidden"
    >
      <div className="border-border flex items-center justify-between border-b px-6 py-4">
        <span className="font-heading text-lg font-bold">{tHeader('logo')}</span>
        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          aria-label={t('closeMenu')}
          className="text-text hover:bg-surface focus-visible:ring-primary flex h-9 w-9 items-center justify-center rounded-md focus-visible:ring-2 focus-visible:outline-none"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <nav className="flex flex-1 flex-col gap-1 px-6 py-6">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={onClose}
            className="text-text hover:bg-surface focus-visible:ring-primary rounded-md px-3 py-3 text-lg font-medium focus-visible:ring-2 focus-visible:outline-none"
          >
            {link.label}
          </Link>
        ))}
      </nav>

      <div className="border-border border-t px-6 py-4">
        <Button className="w-full" onClick={onClose}>
          {t('cta')}
        </Button>
      </div>
    </div>
  );
}
