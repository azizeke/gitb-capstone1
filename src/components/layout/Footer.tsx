import Link from 'next/link';
import type { SVGProps } from 'react';

/**
 * lucide-react marka/logo ikonlarını (Facebook, Instagram, LinkedIn, Twitter)
 * içermiyor — bu setler ayrı bir pakette. Sadece 4 ikon için ekstra bir
 * bağımlılık eklemek yerine küçük, sabit inline SVG'ler kullanıldı.
 */
function TwitterIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M18.9 3H21l-6.6 7.5L22.2 21H16l-4.9-6.4L5.4 21H3.3l7.1-8-7.1-10h6.3l4.4 5.9L18.9 3Zm-1.1 16.2h1.2L7.3 4.7H6l11.8 14.5Z" />
    </svg>
  );
}

function InstagramIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
    </svg>
  );
}

function LinkedinIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3V9Zm7 0h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1V21h-4v-5.6c0-1.34-.02-3.05-1.86-3.05-1.87 0-2.16 1.46-2.16 2.96V21h-4V9Z" />
    </svg>
  );
}

function FacebookIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M13.5 21v-7.5H16l.5-3.5h-3V7.8c0-1 .3-1.8 1.8-1.8H16.5V3c-.3 0-1.5-.1-2.9-.1-2.8 0-4.7 1.7-4.7 4.9v2.2H6v3.5h2.9V21h4.6Z" />
    </svg>
  );
}

const footerColumns = [
  {
    title: 'Ürün',
    links: [
      { href: '/bootcamps', label: 'Bootcamps' },
      { href: '/schedule', label: 'Schedule' },
      { href: '/#pricing', label: 'Fiyatlandırma' },
    ],
  },
  {
    title: 'Şirket',
    links: [
      { href: '/about', label: 'Hakkımızda' },
      { href: '/contact', label: 'İletişim' },
    ],
  },
  {
    title: 'Yasal',
    links: [
      { href: '/privacy', label: 'Gizlilik Politikası' },
      { href: '/terms', label: 'Kullanım Koşulları' },
    ],
  },
];

const socialLinks = [
  { href: 'https://twitter.com', label: 'Twitter', Icon: TwitterIcon },
  { href: 'https://instagram.com', label: 'Instagram', Icon: InstagramIcon },
  { href: 'https://linkedin.com', label: 'LinkedIn', Icon: LinkedinIcon },
  { href: 'https://facebook.com', label: 'Facebook', Icon: FacebookIcon },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-border bg-surface border-t">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
            <span className="font-heading text-lg font-bold">Global IT</span>
            <p className="text-muted mt-2 text-sm">Kariyerini değiştirecek bootcamp programları.</p>
          </div>

          {footerColumns.map((column) => (
            <div key={column.title}>
              <h3 className="text-text text-sm font-semibold">{column.title}</h3>
              <ul className="mt-3 space-y-2">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-muted hover:text-text text-sm transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-border mt-10 flex flex-col items-center justify-between gap-4 border-t pt-6 sm:flex-row">
          <p className="text-muted text-xs">
            &copy; {year} Global IT Bootcamp. Tüm hakları saklıdır.
          </p>
          <div className="flex items-center gap-3">
            {socialLinks.map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted hover:text-text flex h-8 w-8 items-center justify-center rounded-md transition-colors"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
