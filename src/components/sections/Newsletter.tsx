'use client';

import { useTranslations } from 'next-intl';
import { type FormEvent, useState } from 'react';
import { Button, Input } from '@/components/ui';
import { ScrollReveal } from './ScrollReveal';

type Status = 'idle' | 'loading' | 'success';

export function Newsletter() {
  const t = useTranslations('HomePage.newsletter');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<Status>('idle');

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus('loading');

    // Gerçek bir backend olmadığı için (proje kapsamı dışı) submit
    // mock'lanıyor; 1 saniyelik gecikme gerçek bir ağ isteğini taklit
    // ediyor (proje şartnamesinin "1 sn gecikmeli mock" kuralı).
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setStatus('success');
  }

  return (
    <ScrollReveal>
      <section className="mx-auto max-w-2xl px-6 py-16 text-center">
        <h2 className="font-heading text-3xl font-bold sm:text-4xl">{t('title')}</h2>
        <p className="text-muted mt-3 text-lg">{t('subtitle')}</p>

        {status === 'success' ? (
          <p className="bg-success/10 text-success mt-6 rounded-md px-4 py-3 text-sm font-medium">
            {t('success')}
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-3 sm:flex-row">
            <div className="flex-1">
              <Input
                type="email"
                required
                placeholder={t('placeholder')}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                aria-label={t('placeholder')}
              />
            </div>
            <Button type="submit" loading={status === 'loading'}>
              {t('submit')}
            </Button>
          </form>
        )}
      </section>
    </ScrollReveal>
  );
}