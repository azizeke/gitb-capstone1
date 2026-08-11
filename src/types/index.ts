export type Level = 'beginner' | 'intermediate' | 'advanced';
export type Format = 'online' | 'hybrid' | 'onsite';

/** Desteklenen diller (bkz. src/i18n/routing.ts). */
export type Locale = 'en' | 'tr' | 'nl';

/**
 * Mock data içindeki çevrilmiş metin alanları için (bootcamp açıklaması,
 * müfredat başlığı, eğitmen biyografisi vb.). `Bootcamp`, `Instructor` gibi
 * "çözülmüş" (resolved) tipler hâlâ düz string kullanıyor — bu tip sadece
 * `src/data/*.ts` dosyalarının içindeki HAM (raw) veri için, `getXxx(locale)`
 * fonksiyonları bunu ilgili dile çevirip düz string olarak döndürüyor.
 */
export interface LocalizedText {
  en: string;
  tr: string;
  nl: string;
}

export interface Category {
  slug: string;
  name: string;
  icon: string;
  courseCount: number;
}

export interface CurriculumModule {
  title: string;
  durationHours: number;
  lessons: string[];
}

export interface Instructor {
  slug: string;
  name: string;
  title: string;
  bio: string;
  avatar: string;
  company: string;
}

export interface Bootcamp {
  slug: string;
  title: string;
  categorySlug: string;
  level: Level;
  format: Format;
  durationWeeks: number;
  languages: string[];
  priceEUR: number;
  rating: number;
  studentCount: number;
  shortDescription: string;
  description: string;
  heroImage: string;
  tags: string[];
  curriculum: CurriculumModule[];
  instructorSlug: string;
  featured: boolean;
}

export interface Cohort {
  id: string;
  bootcampSlug: string;
  startDate: string;
  endDate: string;
  seatsTotal: number;
  seatsLeft: number;
  format: Format;
  timezone: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  quote: string;
  rating: number;
  bootcampSlug?: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  priceEUR: number | null;
  period: 'month' | 'year' | null;
  description: string;
  features: string[];
  highlighted: boolean;
}

/**
 * Bir öğrencinin belirli bir bootcamp'e kaydını ve o bootcamp'teki
 * ilerlemesini temsil eder. Gerçek bir kullanıcı/auth sistemi olmadığı
 * için (proje kapsamı dışı) tek bir mock öğrencinin (bkz. src/data/
 * enrollments.ts'teki `currentStudent`) birden fazla kaydı bulunabilir.
 */
export interface Enrollment {
  id: string;
  bootcampSlug: string;
  cohortId: string;
  enrolledAt: string;
  progressPercent: number;
  /** Bootcamp'in curriculum dizisindeki hangi modülde olunduğu (0 tabanlı). */
  currentModuleIndex: number;
}

export interface StudentProfile {
  name: string;
  email: string;
  avatarUrl: string;
}
