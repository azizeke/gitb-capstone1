'use client';

import { useTranslations } from 'next-intl';
import { type FormEvent, useEffect, useMemo, useState } from 'react';
import { Button, Checkbox, Input } from '@/components/ui';
import { Link, useRouter } from '@/i18n/navigation';
import { cn } from '@/lib/cn';

interface FormErrors {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  terms?: string;
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_PASSWORD_LENGTH = 8;

type Strength = 'weak' | 'medium' | 'strong';

function getPasswordStrength(password: string): Strength | null {
  if (!password) return null;

  let score = 0;
  if (password.length >= MIN_PASSWORD_LENGTH) score += 1;
  if (/[A-Z]/.test(password) && /[a-z]/.test(password)) score += 1;
  if (/\d/.test(password)) score += 1;
  if (/[^A-Za-z0-9]/.test(password)) score += 1;

  if (score <= 1) return 'weak';
  if (score <= 3) return 'medium';
  return 'strong';
}

const strengthStyles: Record<Strength, string> = {
  weak: 'bg-error w-1/3',
  medium: 'bg-warning w-2/3',
  strong: 'bg-success w-full',
};

export default function RegisterPageClient() {
  const t = useTranslations('RegisterPage');
  const router = useRouter();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const strength = useMemo(() => getPasswordStrength(password), [password]);

  useEffect(() => {
    if (status !== 'success') return;
    const timeout = setTimeout(() => router.push('/dashboard'), 1200);
    return () => clearTimeout(timeout);
  }, [status, router]);

  function validate(): FormErrors {
    const next: FormErrors = {};

    if (!name.trim()) next.name = t('errors.nameRequired');

    if (!email.trim()) {
      next.email = t('errors.emailRequired');
    } else if (!EMAIL_PATTERN.test(email)) {
      next.email = t('errors.emailInvalid');
    }

    if (password.length < MIN_PASSWORD_LENGTH) next.password = t('errors.passwordTooShort');

    if (confirmPassword !== password) next.confirmPassword = t('errors.passwordMismatch');

    if (!acceptedTerms) next.terms = t('errors.termsRequired');

    return next;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setStatus('loading');
    // Mock kayıt: gerçek backend yok (proje kapsamı dışı).
    await new Promise((resolve) => setTimeout(resolve, 800));
    setStatus('success');
  }

  return (
    <main className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-6 py-16">
      <div className="mb-8 text-center">
        <h1 className="font-heading text-2xl font-bold">{t('title')}</h1>
        <p className="text-muted mt-2 text-sm">{t('subtitle')}</p>
      </div>

      {status === 'success' ? (
        <p className="bg-success/10 text-success rounded-md px-4 py-4 text-center text-sm font-medium">
          {t('success')}
        </p>
      ) : (
        <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
          <Input
            label={t('nameLabel')}
            value={name}
            onChange={(e) => setName(e.target.value)}
            error={errors.name}
            autoComplete="name"
          />

          <Input
            type="email"
            label={t('emailLabel')}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={errors.email}
            autoComplete="email"
          />

          <div>
            <Input
              type="password"
              label={t('passwordLabel')}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={errors.password}
              autoComplete="new-password"
            />
            {strength && (
              <div className="mt-2">
                <div className="bg-border h-1.5 w-full overflow-hidden rounded-full">
                  <div
                    className={cn('h-full rounded-full transition-all', strengthStyles[strength])}
                  />
                </div>
                <p className="text-muted mt-1 text-xs">
                  {strength === 'weak' && t('strengthWeak')}
                  {strength === 'medium' && t('strengthMedium')}
                  {strength === 'strong' && t('strengthStrong')}
                </p>
              </div>
            )}
          </div>

          <Input
            type="password"
            label={t('confirmPasswordLabel')}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            error={errors.confirmPassword}
            autoComplete="new-password"
          />

          <div>
            <Checkbox
              label={t('termsLabel')}
              checked={acceptedTerms}
              onChange={(e) => setAcceptedTerms(e.target.checked)}
            />
            {errors.terms && <p className="text-error mt-1 text-xs">{errors.terms}</p>}
          </div>

          <Button type="submit" loading={status === 'loading'} className="w-full">
            {status === 'loading' ? t('submitting') : t('submit')}
          </Button>
        </form>
      )}

      <p className="text-muted mt-6 text-center text-sm">
        {t('hasAccount')}{' '}
        <Link href="/auth/login" className="text-primary font-medium hover:underline">
          {t('loginLink')}
        </Link>
      </p>
    </main>
  );
}
