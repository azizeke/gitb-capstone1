'use client';

import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/cn';
import type { CurriculumModule } from '@/types';

export interface CurriculumAccordionProps {
  modules: CurriculumModule[];
  hoursLabel: string;
}

/**
 * Açılır-kapanır müfredat listesi. Her modül bağımsız açılıp kapanabilir
 * (tek seferde sadece biri açık kalması gibi bir kısıt yok — kullanıcı
 * birden fazla modülü aynı anda karşılaştırmak isteyebilir).
 */
export function CurriculumAccordion({ modules, hoursLabel }: CurriculumAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="border-border divide-border divide-y rounded-lg border">
      {modules.map((module, index) => {
        const isOpen = openIndex === index;
        const panelId = `curriculum-panel-${index}`;

        return (
          <div key={module.title}>
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : index)}
              aria-expanded={isOpen}
              aria-controls={panelId}
              className="hover:bg-surface flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
            >
              <div>
                <p className="font-medium">{module.title}</p>
                <p className="text-muted text-xs">
                  {module.durationHours} {hoursLabel}
                </p>
              </div>
              <ChevronDown
                className={cn(
                  'text-muted h-4 w-4 shrink-0 transition-transform',
                  isOpen && 'rotate-180',
                )}
              />
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
