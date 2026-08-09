import { useTranslations } from 'next-intl';

interface Step {
  title: string;
  description: string;
}

export function HowItWorks() {
  const t = useTranslations('HomePage.howItWorks');
  const steps = t.raw('steps') as Step[];

  return (
    <section className="bg-surface py-16">
      <div className="mx-auto max-w-5xl px-6">
        <div className="mb-12 text-center">
          <h2 className="font-heading text-3xl font-bold sm:text-4xl">{t('title')}</h2>
          <p className="text-muted mt-3 text-lg">{t('subtitle')}</p>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <div key={step.title} className="relative text-center">
              <div className="bg-primary text-primary-foreground font-heading mx-auto flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold">
                {index + 1}
              </div>
              <h3 className="font-heading mt-4 text-base font-semibold">{step.title}</h3>
              <p className="text-muted mt-2 text-sm">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}