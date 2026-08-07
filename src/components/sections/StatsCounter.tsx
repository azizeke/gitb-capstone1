'use client';

import { useTranslations } from 'next-intl';
import { useEffect, useRef, useState } from 'react';

interface CounterConfig {
  key: 'graduates' | 'employmentRate' | 'partners' | 'countries';
  target: number;
  suffix: string;
}

const counters: CounterConfig[] = [
  { key: 'graduates', target: 2400, suffix: '+' },
  { key: 'employmentRate', target: 87, suffix: '%' },
  { key: 'partners', target: 120, suffix: '+' },
  { key: 'countries', target: 34, suffix: '' },
];

const ANIMATION_DURATION_MS = 1600;

/**
 * Tek bir sayacın 0'dan hedefe animasyonu. `start` true olduğunda bir kez
 * çalışır (viewport'a giriş algılaması üst komponentteki IntersectionObserver
 * ile yapılıyor). requestAnimationFrame kullanılıyor çünkü setInterval'e
 * göre tarayıcının render döngüsüyle senkronize, daha akıcı bir animasyon
 * sağlıyor.
 */
function useCountUp(target: number, start: boolean) {
  const [value, setValue] = useState(0);
  const hasRun = useRef(false);

  useEffect(() => {
    if (!start || hasRun.current) return;
    hasRun.current = true;

    let frameId: number;
    const startTime = performance.now();

    function tick(now: number) {
      const progress = Math.min((now - startTime) / ANIMATION_DURATION_MS, 1);
      // ease-out: hızlı başlar, yavaşlayarak biter
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * target));

      if (progress < 1) {
        frameId = requestAnimationFrame(tick);
      }
    }

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [start, target]);

  return value;
}

function Counter({ config, start }: { config: CounterConfig; start: boolean }) {
  const t = useTranslations('HomePage.counters');
  const value = useCountUp(config.target, start);

  return (
    <div className="text-center">
      <p className="font-heading text-3xl font-bold sm:text-4xl">
        {value.toLocaleString()}
        {config.suffix}
      </p>
      <p className="text-muted mt-1 text-sm">{t(config.key)}</p>
    </div>
  );
}

export function StatsCounter() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="bg-surface py-16">
      <div className="mx-auto grid max-w-5xl grid-cols-2 gap-8 px-6 md:grid-cols-4">
        {counters.map((config) => (
          <Counter key={config.key} config={config} start={isVisible} />
        ))}
      </div>
    </section>
  );
}
