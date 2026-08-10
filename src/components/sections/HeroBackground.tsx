'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/cn';

/**
 * Sandbox'ta doğrulanmış (404 vermeyen), zaten projede kullanılan
 * Unsplash ID'lerinden seçildi — yeni, doğrulanmamış bir link riske
 * girmemek için eklenmedi.
 */
const heroImages = [
  'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1920&h=1080&fit=crop',
  'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1920&h=1080&fit=crop',
  'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=1920&h=1080&fit=crop',
  'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1920&h=1080&fit=crop',
];

const ROTATE_INTERVAL_MS = 6000;

/**
 * Hero arka planında birkaç görsel arasında yumuşak bir opacity
 * geçişiyle dönen slideshow. `prefers-reduced-motion` tercih edilmişse
 * otomatik döngü hiç başlatılmıyor, sadece ilk görsel sabit kalıyor
 * (F-01/F-02'deki aynı erişilebilirlik kuralı burada da geçerli).
 */
export function HeroBackground() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % heroImages.length);
    }, ROTATE_INTERVAL_MS);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 -z-10">
      {heroImages.map((src, index) => (
        <Image
          key={src}
          src={src}
          alt=""
          fill
          priority={index === 0}
          className={cn(
            'object-cover transition-opacity duration-1000',
            index === activeIndex ? 'opacity-100' : 'opacity-0',
          )}
        />
      ))}
      <div className="bg-background/80 absolute inset-0" />
    </div>
  );
}