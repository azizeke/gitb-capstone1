'use client';

import { Eye, EyeOff } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { type FormEvent, useEffect, useState } from 'react';
import { Button, Input } from '@/components/ui';
import { Link, useRouter } from '@/i18n/navigation';

interface FormErrors {
  email?: string;
  password?: string;
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Gerçek backend olmadığı için (proje kapsamı dışı) sabit demo kimlik bilgileri kullanılıyor. */
const DEMO_EMAIL = 'demo@globalit.dev';
const DEMO_PASSWORD = 'demo1234';

export default function LoginPageClient() {
  const t = useTranslations('LoginPage');
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'invalid'>('idle');

  useEffect(() => {
    if (status !== 'success') return;
    const timeout = setTimeout(() => router.push('/'), 1200);
    return () => clearTimeout(timeout);
  }, [status, router]);

  function validate(): FormErrors {
    const next: FormErrors = {};
    if (!email.trim()) {
      next.email = t('errors.emailRequired');
    } else if (!EMAIL_PATTERN.test(email)) {
      next.email = t('errors.emailInvalid');
    }
    if (!password) next.password = t('errors.passwordRequired');
    return next;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setStatus('loading');
    // Mock kimlik doğrulama: gerçek backend yok (proje kapsamı dışı).
    await new Promise((resolve) => setTimeout(resolve, 800));

    if (email === DEMO_EMAIL && password === DEMO_PASSWORD) {
      setStatus('success');
    } else {
      setStatus('invalid');
    }
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
          {status === 'invalid' && (
            <p className="bg-error/10 text-error rounded-md px-4 py-3 text-sm">
              {t('invalidCredentials')}
            </p>
          )}

          <Input
            type="email"
            label={t('emailLabel')}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={errors.email}
            autoComplete="email"
          />

          <div className="relative">
            <Input
              type={showPassword ? 'text' : 'password'}
              label={t('passwordLabel')}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={errors.password}
              autoComplete="current-password"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              aria-label={showPassword ? t('hidePassword') : t('showPassword')}
              className="text-muted hover:text-text absolute top-9 right-3"
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>

          <div className="flex justify-end">
            <Link href="/contact" className="text-primary text-xs font-medium hover:underline">
              {t('forgotPassword')}
            </Link>
          </div>

          <Button type="submit" loading={status === 'loading'} className="w-full">
            {status === 'loading' ? t('submitting') : t('submit')}
          </Button>

          <p className="text-muted text-center text-xs">{t('demoHint')}</p>
        </form>
      )}

      <p className="text-muted mt-6 text-center text-sm">
        {t('noAccount')}{' '}
        <Link href="/auth/register" className="text-primary font-medium hover:underline">
          {t('registerLink')}
        </Link>
      </p>
    </main>
  );
}
