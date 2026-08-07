import type { PricingPlan } from '@/types';

export const pricingPlans: PricingPlan[] = [
  {
    id: 'self-paced',
    name: 'Self-Paced',
    priceEUR: 49,
    period: 'month',
    description: 'Kendi hızında ilerlemek isteyenler için tüm kurs içeriğine sınırsız erişim.',
    features: [
      'Tüm kayıtlı derslere erişim',
      'Topluluk forumuna erişim',
      'Aylık iptal edilebilir',
      'Sertifika (self-paced)',
    ],
    highlighted: false,
  },
  {
    id: 'cohort',
    name: 'Cohort',
    priceEUR: 2900,
    period: null,
    description: 'Canlı derslerle, bir grup öğrenciyle birlikte, mentorluk destekli tam program.',
    features: [
      'Canlı, eğitmen eşliğinde dersler',
      'Haftalık 1:1 mentorluk',
      'Takım projeleri ve code review',
      'İş bulma desteği ve CV incelemesi',
      'Sertifika (cohort)',
    ],
    highlighted: true,
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    priceEUR: null,
    period: null,
    description: 'Şirket içi ekipler için özelleştirilmiş müfredat ve raporlama.',
    features: [
      'Özelleştirilmiş müfredat',
      'Özel kohort ve takvim',
      'İlerleme raporlama panosu',
      'Özel hesap yöneticisi',
    ],
    highlighted: false,
  },
];