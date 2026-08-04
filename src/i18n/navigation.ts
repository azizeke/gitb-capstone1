import { createNavigation } from 'next-intl/navigation';
import { routing } from './routing';

/**
 * next/link ve next/navigation'ın locale bilincine sahip versiyonları.
 * Bunlar kullanıldığında dil geçişlerinde URL'ler otomatik olarak
 * /en veya /tr önekiyle üretilir; manuel prefix eklemeye gerek kalmaz.
 */
export const { Link, redirect, usePathname, useRouter, getPathname } = createNavigation(routing);
