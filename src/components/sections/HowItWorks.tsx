import { Briefcase, ClipboardCheck, Hammer, NotebookPen } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { ScrollReveal } from './ScrollReveal';

interface Step {
  title: string;
  description: string;
}

/*
 * Her adımın kendine ait bir renkli ikon karesi var (referans sitedeki
 * tasarıma göre). Marka paletinin dışında, adımları görsel olarak ayırt
 * etmek için kasıtlı olarak farklı renkler seçildi.
 */
const stepStyles = [
  { icon: ClipboardCheck, bg: 'bg-indigo-500' },
  { icon: NotebookPen, bg: 'bg-cyan-500' },
  { icon: Hammer, bg: 'bg-emerald-500' },
  { icon: Briefcase, bg: 'bg-purple-500' },
];

export function HowItWorks() {
  const t = useTranslations('HomePage.howItWorks');
  const steps = t.raw('steps') as Step[];

  return (
    <ScrollReveal>
      <section className="bg-surface py-16">
        <div className="mx-auto max-w-5xl px-6">
          <div className="mb-16 text-center">
            <h2 className="font-heading text-3xl font-bold sm:text-4xl">{t('title')}</h2>
            <p className="text-muted mt-3 text-lg">{t('subtitle')}</p>
          </div>

          <div className="relative grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {/* Bağlantı çizgisi: sadece geniş ekranda, ikonların dikey ortasından geçer */}
            <div className="border-border absolute top-7 right-0 left-0 hidden border-t lg:block" />

            {steps.map((step, index) => {
              const style = stepStyles[index] ?? stepStyles[0];
              const Icon = style.icon;

              return (
                <div key={step.title} className="relative text-center">
                  <div className="relative mx-auto w-fit">
                    <div
                      className={`relative z-10 flex h-14 w-14 items-center justify-center rounded-xl text-white shadow-md ${style.bg}`}
                    >
                      <Icon className="h-6 w-6" />
                    </div>
                    <span className="border-border bg-background text-text absolute -top-2 -right-2 z-20 flex h-6 w-6 items-center justify-center rounded-full border text-xs font-bold">
                      {index + 1}
                    </span>
                  </div>
                  <h3 className="font-heading mt-4 text-base font-semibold">{step.title}</h3>
                  <p className="text-muted mt-2 text-sm">{step.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </ScrollReveal>
  );
}