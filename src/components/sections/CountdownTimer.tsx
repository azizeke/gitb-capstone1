'use client';

import { useEffect, useState } from 'react';

export interface CountdownTimerProps {
  targetDate: string;
  labels: { days: string; hours: string; minutes: string; seconds: string };
  startedLabel: string;
}

interface Remaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isStarted: boolean;
}

function calculateRemaining(targetDate: string): Remaining {
  const diff = new Date(targetDate).getTime() - Date.now();

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isStarted: true };
  }

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
    isStarted: false,
  };
}

/**
 * Saniye başına güncellenen canlı geri sayım. `setInterval` burada gerçek
 * bir "canlı saat" için gerekli — sayfa açık kaldığı sürece her saniye
 * yeniden hesaplanır. Süre dolduğunda interval durdurulur (gereksiz yere
 * çalışmaya devam etmesin diye) ve "başladı" durumu gösterilir.
 */
export function CountdownTimer({ targetDate, labels, startedLabel }: CountdownTimerProps) {
  const [remaining, setRemaining] = useState<Remaining>(() => calculateRemaining(targetDate));

  useEffect(() => {
    if (remaining.isStarted) return;

    const interval = setInterval(() => {
      setRemaining(calculateRemaining(targetDate));
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate, remaining.isStarted]);

  if (remaining.isStarted) {
    return <p className="font-heading text-lg font-semibold">{startedLabel}</p>;
  }

  const units: { value: number; label: string }[] = [
    { value: remaining.days, label: labels.days },
    { value: remaining.hours, label: labels.hours },
    { value: remaining.minutes, label: labels.minutes },
    { value: remaining.seconds, label: labels.seconds },
  ];

  return (
    <div className="flex gap-4 sm:gap-6" role="timer" aria-live="polite">
      {units.map((unit) => (
        <div key={unit.label} className="text-center">
          <span
            suppressHydrationWarning
            className="font-heading block text-3xl font-bold tabular-nums sm:text-4xl"
          >
            {String(unit.value).padStart(2, '0')}
          </span>
          <span className="text-muted text-xs">{unit.label}</span>
        </div>
      ))}
    </div>
  );
}
