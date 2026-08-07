import { Check } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Badge, buttonStyles, Card } from '@/components/ui';
import { pricingPlans } from '@/data/pricing';
import { Link } from '@/i18n/navigation';
import { cn } from '@/lib/cn';

export function Pricing() {
  const t = useTranslations('HomePage.pricing');

  return (
    <section id="pricing" className="mx-auto max-w-6xl px-6 py-16">
      <div className="mb-10 text-center">
        <h2 className="font-heading text-2xl font-bold sm:text-3xl">{t('title')}</h2>
        <p className="text-muted mt-2">{t('subtitle')}</p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {pricingPlans.map((plan) => (
          <Card
            key={plan.id}
            className={cn(
              'relative flex flex-col gap-6',
              plan.highlighted && 'border-primary ring-primary ring-2',
            )}
          >
            {plan.highlighted && (
              <Badge className="absolute -top-3 left-1/2 -translate-x-1/2">
                {t('mostPopular')}
              </Badge>
            )}

            <div>
              <h3 className="font-heading text-lg font-semibold">{plan.name}</h3>
              <p className="text-muted mt-1 text-sm">{plan.description}</p>
            </div>

            <div>
              {plan.priceEUR === null ? (
                <span className="font-heading text-3xl font-bold">{t('custom')}</span>
              ) : (
                <>
                  <span className="font-heading text-3xl font-bold">
                    €{plan.priceEUR.toLocaleString()}
                  </span>
                  {plan.period && <span className="text-muted text-sm">{t('perMonth')}</span>}
                </>
              )}
            </div>

            <ul className="flex flex-1 flex-col gap-2.5">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2 text-sm">
                  <Check className="text-success mt-0.5 h-4 w-4 shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>

            <Link
              href={plan.priceEUR === null ? '/contact' : '/auth/register'}
              className={buttonStyles(plan.highlighted ? 'primary' : 'secondary', 'md')}
            >
              {plan.priceEUR === null ? t('contactSales') : t('getStarted')}
            </Link>
          </Card>
        ))}
      </div>
    </section>
  );
}
