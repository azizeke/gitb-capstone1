import type { SVGProps } from 'react';

/**
 * Emoji bayraklar yerine kendi çizdiğimiz SVG'ler kullanılıyor çünkü
 * Windows'ta Chrome/Edge, bayrak emoji'lerini (Unicode "regional indicator"
 * karakterleri) render edecek bir emoji fontu içermiyor — bunun yerine
 * "GB", "TR" gibi düz metin kodları gösteriyor. SVG'ler her platformda
 * birebir aynı görünür.
 */

function GbFlag(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 60 30" {...props}>
      <rect width="60" height="30" fill="#00247d" />
      <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6" />
      <path d="M0,0 L60,30 M60,0 L0,30" stroke="#cf142b" strokeWidth="2" />
      <path d="M30,0 V30 M0,15 H60" stroke="#fff" strokeWidth="10" />
      <path d="M30,0 V30 M0,15 H60" stroke="#cf142b" strokeWidth="6" />
    </svg>
  );
}

function TrFlag(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 20 14" {...props}>
      <rect width="20" height="14" fill="#E30A17" />
      <circle cx="8" cy="7" r="3.5" fill="#fff" />
      <circle cx="9" cy="7" r="2.8" fill="#E30A17" />
      <path d="M13 5.8l1 1.2-1 1.2.2-1.2z" fill="#fff" />
    </svg>
  );
}

function NlFlag(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 20 14" {...props}>
      <rect y="0" width="20" height="4.67" fill="#AE1C28" />
      <rect y="4.67" width="20" height="4.67" fill="#FFFFFF" />
      <rect y="9.33" width="20" height="4.67" fill="#21468B" />
    </svg>
  );
}

const flagComponents = {
  en: GbFlag,
  tr: TrFlag,
  nl: NlFlag,
};

export interface FlagIconProps extends SVGProps<SVGSVGElement> {
  locale: keyof typeof flagComponents;
}

export function FlagIcon({ locale, className, ...props }: FlagIconProps) {
  const Component = flagComponents[locale];
  return (
    <Component
      className={className}
      width="18"
      height="13"
      role="img"
      aria-hidden="true"
      {...props}
    />
  );
}