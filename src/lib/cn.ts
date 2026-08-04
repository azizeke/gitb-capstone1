import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Tailwind class'larını güvenli şekilde birleştirir: çakışan utility'lerde
 * (örn. iki farklı "p-4" ve "p-6") sonuncusu kazanır, aksi halde ikisi de
 * class listesinde kalıp CSS'in kime uyacağı belirsizleşirdi.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
