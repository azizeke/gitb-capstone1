import type { Category } from '@/types';

export const categories: Category[] = [
  { slug: 'programming', name: 'Programming', icon: 'Code2', courseCount: 2 },
  { slug: 'data-engineering', name: 'Data Engineering', icon: 'Database', courseCount: 2 },
  { slug: 'ai-ml', name: 'AI & Machine Learning', icon: 'BrainCircuit', courseCount: 2 },
  { slug: 'cloud-devops', name: 'Cloud & DevOps', icon: 'Cloud', courseCount: 2 },
  { slug: 'cybersecurity', name: 'Cybersecurity', icon: 'ShieldCheck', courseCount: 1 },
  { slug: 'mobile-dev', name: 'Mobile Development', icon: 'Smartphone', courseCount: 1 },
  { slug: 'data-analytics', name: 'Data Analytics', icon: 'BarChart3', courseCount: 1 },
  { slug: 'full-stack', name: 'Full-Stack Development', icon: 'Layers', courseCount: 1 },
];