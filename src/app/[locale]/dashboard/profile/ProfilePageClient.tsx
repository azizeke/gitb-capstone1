'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { type FormEvent, useState } from 'react';
import { Button, Card, Input } from '@/components/ui';
import { currentStudent } from '@/data/enrollments';

type Status = 'idle' | 'saving' | 'saved';

/**
 * Statik profil sayfası — issue'da belirtildiği gibi alanlar düzenlenebilir
 * ama "submit gerçek değil": hiçbir yere kalıcı kaydedilmiyor, sadece
 * 1 saniyelik bir mock gecikme + "kaydedildi" mesajı gösteriliyor
 * (projenin geri kalanındaki form mock deseniyle tutarlı).
 */
export default function ProfilePageClient() {
  const t = useTranslations('Common.dashboard');
  const [name, setName] = useState(currentStudent.name);
  const [email, setEmail] = useState(currentStudent.email);
  const [status, setStatus] = useState<Status>('idle');

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus('saving');
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setStatus('saved');
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-heading text-2xl font-bold sm:text-3xl">{t('profileTitle')}</h1>
        <p className="text-muted mt-1">{t('profileSubtitle')}</p>
      </div>

      <Card className="max-w-lg">
        <div className="mb-6 flex items-center gap-4">
          <div className="relative h-16 w-16 overflow-hidden rounded-full">
            <Image
              src={currentStudent.avatarUrl}
              alt={currentStudent.name}
              fill
              className="object-cover"
              sizes="64px"
            />
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            label={t('profileNameLabel')}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            type="email"
            label={t('profileEmailLabel')}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <div className="mt-2 flex items-center gap-3">
            <Button type="submit" loading={status === 'saving'}>
              {status === 'saving' ? t('savingButton') : t('saveButton')}
            </Button>
            {status === 'saved' && (
              <p className="text-success text-sm font-medium">{t('savedMessage')}</p>
            )}
          </div>
        </form>
      </Card>
    </div>
  );
}
