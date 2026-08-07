export type Level = 'beginner' | 'intermediate' | 'advanced';
export type Format = 'online' | 'hybrid' | 'onsite';

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