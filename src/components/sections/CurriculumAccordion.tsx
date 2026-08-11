'use client';

import { CheckCircle2, ChevronDown, Circle, Clock } from 'lucide-react';
import { useState } from 'react';
import { Badge } from '@/components/ui';
import { cn } from '@/lib/cn';
import type { CurriculumModule } from '@/types';

export type ModuleStatus = 'completed' | 'in-progress' | 'upcoming';

export interface CurriculumAccordionProps {
  modules: CurriculumModule[];
  hoursLabel: string;
  /**
   * Opsiyonel: her modülün ilerleme durumu (dashboard'daki müfredat takibi
   * için). Verilmezse (bootcamp detay sayfasındaki mevcut kullanım gibi)
   * hiçbir durum rozeti gösterilmez — geriye dönük uyumlu.
   */
  moduleStatuses?: ModuleStatus[];
  statusLabels?: { completed: string; inProgress: string; upcoming: string };
}

const statusIcon: Record<ModuleStatus, typeof CheckCircle2> = {
  completed: CheckCircle2,
  'in-progress': Clock,
  upcoming: Circle,
};

const statusBadgeVariant: Record<ModuleStatus, 'success' | 'warning' | 'default'> = {
  completed: 'success',
  'in-progress': 'warning',
  upcoming: 'default',
};

/**
 * Açılır-kapanır müfredat listesi. Her modül bağımsız açılıp kapanabilir
 * (tek seferde sadece biri açık kalması gibi bir kısıt yok — kullanıcı
 * birden fazla modülü aynı anda karşılaştırmak isteyebilir).
 */
export function CurriculumAccordion({
  modules,
  hoursLabel,
  moduleStatuses,
  statusLabels,
}: CurriculumAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="border-border divide-border divide-y rounded-lg border">
      {modules.map((module, index) => {
        const isOpen = openIndex === index;
        const panelId = `curriculum-panel-${index}`;
        const status = moduleStatuses?.[index];
        const StatusIcon = status ? statusIcon[status] : null;

        return (
          <div key={module.title}>
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : index)}
              aria-expanded={isOpen}
              aria-controls={panelId}
              className="hover:bg-surface flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
            >
              <div className="flex items-center gap-3">
                {StatusIcon && status && (
                  <StatusIcon
                    className={cn(
                      'h-[18px] w-[18px] shrink-0',
                      status === 'completed' && 'text-success',
                      status === 'in-progress' && 'text-warning',
                      status === 'upcoming' && 'text-border',
                    )}
                  />
                )}
                <div>
                  <p className="font-medium">{module.title}</p>
                  <p className="text-muted text-xs">
                    {module.durationHours} {hoursLabel}
                  </p>
                </div>
              </div>

              <div className="flex shrink-0 items-center gap-3">
                {status && statusLabels && (
                  <Badge variant={statusBadgeVariant[status]}>
                    {status === 'completed' && statusLabels.completed}
                    {status === 'in-progress' && statusLabels.inProgress}
                    {status === 'upcoming' && statusLabels.upcoming}
                  </Badge>
                )}
                <ChevronDown
                  className={cn(
                    'text-muted h-4 w-4 shrink-0 transition-transform',
                    isOpen && 'rotate-180',
                  )}
                />
              </div>
            </button>

            {isOpen && (
              <div id={panelId} className="px-5 pb-4">
                <ul className="text-muted flex flex-col gap-1.5 text-sm">
                  {module.lessons.map((lesson) => (
                    <li key={lesson} className="flex items-start gap-2">
                      <span className="bg-muted mt-1.5 h-1 w-1 shrink-0 rounded-full" />
                      {lesson}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
