import type { Enrollment, StudentProfile } from '@/types';

/**
 * Gerçek bir kullanıcı/auth sistemi olmadığı için (proje kapsamı dışı)
 * dashboard'un tamamı tek bir sabit mock öğrenci üzerinden çalışır.
 * `enrollments` dizisi, bu öğrencinin kayıtlı olduğu birden fazla
 * bootcamp'i ve her birindeki ilerlemesini temsil eder.
 */
export const currentStudent: StudentProfile = {
  name: 'Aslı Demir',
  email: 'asli.demir@example.com',
  avatarUrl:
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=128&h=128&fit=crop&crop=faces',
};

export const enrollments: Enrollment[] = [
  {
    id: 'enrollment-01',
    bootcampSlug: 'frontend-engineering-react-typescript',
    cohortId: 'cohort-03',
    enrolledAt: '2026-08-20',
    progressPercent: 62,
    currentModuleIndex: 1,
  },
  {
    id: 'enrollment-02',
    bootcampSlug: 'cloud-devops-engineering',
    cohortId: 'cohort-11',
    enrolledAt: '2026-07-15',
    progressPercent: 15,
    currentModuleIndex: 0,
  },
];
