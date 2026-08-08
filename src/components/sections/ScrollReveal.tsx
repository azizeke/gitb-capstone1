'use client';

import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/cn';

export interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delayMs?: number;
}

/**
 * Bir element viewport'a girdiğinde hafif bir "fade + yukarı kayma"
 * animasyonu tetikler (globals.css'teki `.scroll-reveal` class'ı, bkz.
 * F-01'deki prefers-reduced-motion notu — aynı kural burada da geçerli).
 *
 * Performansı düşürmemek için:
 * - IntersectionObserver bir kez tetiklenip hemen disconnect ediliyor
 *   (element görünür kaldığı sürece tekrar tekrar hesaplama yapılmıyor)
 * - Sadece seçili birkaç Landing bölümünde kullanılıyor, sayfanın her
 *   elemanında değil ("abartısız" kabul kriteri).
 */
export function ScrollReveal({ children, className, delayMs = 0 }: ScrollRevealProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={cn(isVisible && 'scroll-reveal', !isVisible && 'opacity-0', className)}
      style={isVisible && delayMs > 0 ? { animationDelay: `${delayMs}ms` } : undefined}
    >
      {children}
    </div>
  );
}
