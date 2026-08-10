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

const VISIBLE_DURATION_MS = 5000;
const TRANSITION_DURATION_MS = 1000;

/**
 * Hero arka planında birkaç görsel arasında dönen slideshow. Geçiş iki
 * fazlı: önce ~1 saniyelik gri bir ara katman belirir, sonra bir sonraki
 * görsel devreye girer (düz opacity crossfade yerine bilinçli olarak bu
 * iki adımlı geçiş tercih edildi). `prefers-reduced-motion` tercih
 * edilmişse döngü hiç başlamıyor, sadece ilk görsel sabit kalıyor.
 */
export function HeroBackground() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    let timeoutId: ReturnType<typeof setTimeout>;

    function scheduleNext() {
      timeoutId = setTimeout(() => {
        setIsTransitioning(true);

        timeoutId = setTimeout(() => {
          setActiveIndex((prev) => (prev + 1) % heroImages.length);
          setIsTransitioning(false);
          scheduleNext();
        }, TRANSITION_DURATION_MS);
      }, VISIBLE_DURATION_MS);
    }

    scheduleNext();
    return () => clearTimeout(timeoutId);
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
            'object-cover transition-opacity duration-700',
            index === activeIndex ? 'opacity-100' : 'opacity-0',
          )}
        />
      ))}

      {/* Geçişin "grimsi ara adımı" — bir sonraki görsele geçmeden önce belirir */}
      <div
        className={cn(
          'absolute inset-0 bg-neutral-500 transition-opacity duration-500',
          isTransitioning ? 'opacity-50' : 'opacity-0',
        )}
      />

      {/*
       * Hero, tema ne olursa olsun (light/dark) her zaman koyu bir "ada"
       * gibi davranır — bu yüzden overlay bilinçli olarak design token'dan
       * DEĞİL, sabit bir koyu renkten geliyor. Amaç: metin (her zaman
       * beyaz) her koşulda net okunabilsin, referans sitedeki gibi.
       */}
      <div className="absolute inset-0 bg-slate-950/60" />
    </div>
  );
}