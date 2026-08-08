'use client';

import { Mail, MapPin, Phone } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { type FormEvent, useState } from 'react';
import { Button, Input, Textarea } from '@/components/ui';

interface FormValues {
  name: string;
  email: string;
  subject: string;
  message: string;
}

type FormErrors = Partial<Record<keyof FormValues, string>>;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_MESSAGE_LENGTH = 20;

export default function ContactPageClient() {
  const t = useTranslations('ContactPage');
  const [values, setValues] = useState<FormValues>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  function validate(current: FormValues): FormErrors {
    const next: FormErrors = {};

    if (!current.name.trim()) next.name = t('errors.nameRequired');

    if (!current.email.trim()) {
      next.email = t('errors.emailRequired');
    } else if (!EMAIL_PATTERN.test(current.email)) {
      next.email = t('errors.emailInvalid');
    }

    if (!current.subject.trim()) next.subject = t('errors.subjectRequired');

    if (!current.message.trim()) {
      next.message = t('errors.messageRequired');
    } else if (current.message.trim().length < MIN_MESSAGE_LENGTH) {
      next.message = t('errors.messageTooShort');
    }

    return next;
  }

  function updateField(field: keyof FormValues, value: string) {
    setValues((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const validationErrors = validate(values);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    setStatus('loading');
    // Gerçek bir backend olmadığı için (proje kapsamı dışı) submit
    // mock'lanıyor; 1 saniyelik gecikme gerçek bir ağ isteğini taklit ediyor.
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setStatus('success');
  }

  return (
    <main className="mx-auto max-w-5xl px-6 py-16">
      <div className="mb-12 text-center">
        <h1 className="font-heading text-3xl font-bold sm:text-4xl">{t('title')}</h1>
        <p className="text-muted mx-auto mt-3 max-w-xl">{t('subtitle')}</p>
      </div>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_360px]">
        {/* Form */}
        <div>
          {status === 'success' ? (
            <p className="bg-success/10 text-success rounded-md px-4 py-4 text-sm font-medium">
              {t('successMessage')}
            </p>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
              <Input
                label={t('nameLabel')}
                value={values.name}
                onChange={(e) => updateField('name', e.target.value)}
                error={errors.name}
              />
              <Input
                type="email"
                label={t('emailLabel')}
                value={values.email}
                onChange={(e) => updateField('email', e.target.value)}
                error={errors.email}
              />
              <Input
                label={t('subjectLabel')}
                value={values.subject}
                onChange={(e) => updateField('subject', e.target.value)}
                error={errors.subject}
              />
              <Textarea
                label={t('messageLabel')}
                rows={6}
                value={values.message}
                onChange={(e) => updateField('message', e.target.value)}
                error={errors.message}
              />
              <Button type="submit" loading={status === 'loading'} className="self-start">
                {status === 'loading' ? t('submitting') : t('submit')}
              </Button>
            </form>
          )}
        </div>

        {/* Alternatif iletişim + statik harita */}
        <aside className="flex flex-col gap-6">
          <div>
            <h2 className="font-heading mb-4 text-lg font-semibold">{t('altTitle')}</h2>
            <ul className="flex flex-col gap-3 text-sm">
              <li className="flex items-start gap-3">
                <Mail className="text-primary mt-0.5 h-4 w-4 shrink-0" />
                <div>
                  <p className="text-muted text-xs">{t('emailUsLabel')}</p>
                  <p>hello@globalit.dev</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="text-primary mt-0.5 h-4 w-4 shrink-0" />
                <div>
                  <p className="text-muted text-xs">{t('callUsLabel')}</p>
                  <p>+31 20 123 4567</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="text-primary mt-0.5 h-4 w-4 shrink-0" />
                <div>
                  <p className="text-muted text-xs">{t('visitUsLabel')}</p>
                  <p>{t('address')}</p>
                </div>
              </li>
            </ul>
          </div>

          <div>
            <div className="border-border relative h-48 w-full overflow-hidden rounded-lg border">
              <Image
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop"
                alt={t('mapCaption')}
                fill
                className="object-cover"
                sizes="360px"
              />
            </div>
            <p className="text-muted mt-2 text-xs">{t('mapCaption')}</p>
          </div>
        </aside>
      </div>
    </main>
  );
}
