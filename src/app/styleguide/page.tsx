'use client';

import { useState } from 'react';
import {
  Badge,
  Button,
  Card,
  Checkbox,
  Input,
  Select,
  Skeleton,
  Spinner,
  Textarea,
} from '@/components/ui';

/**
 * /styleguide
 *
 * Design token'ların canlı referansı. A-02 kabul kriterini karşılar.
 *
 * Buradaki dark/light geçiş butonu SADECE bu sayfada token'ları önizlemek
 * içindir; kalıcı değildir ve <html> class'ını doğrudan değiştirir. Gerçek
 * tema sistemi (localStorage/cookie kalıcılığı, FOUC önleme, sistem tercihi
 * okuma) B-02 görev kartında kurulacak.
 */

const colorTokens: { name: string; className: string; description: string }[] = [
  { name: 'background', className: 'bg-background', description: 'Sayfa arka planı' },
  { name: 'surface', className: 'bg-surface', description: 'Kart / panel yüzeyi' },
  { name: 'text', className: 'bg-text', description: 'Ana metin rengi' },
  { name: 'muted', className: 'bg-muted', description: 'İkincil / soluk metin' },
  { name: 'border', className: 'bg-border', description: 'Kenarlık rengi' },
  { name: 'primary', className: 'bg-primary', description: 'Birincil marka rengi' },
  { name: 'secondary', className: 'bg-secondary', description: 'İkincil marka rengi' },
  { name: 'accent', className: 'bg-accent', description: 'Vurgu rengi' },
  { name: 'success', className: 'bg-success', description: 'Başarı durumu' },
  { name: 'warning', className: 'bg-warning', description: 'Uyarı durumu' },
  { name: 'error', className: 'bg-error', description: 'Hata durumu' },
];

const typeScale = [
  { label: 'text-xs', className: 'text-xs' },
  { label: 'text-sm', className: 'text-sm' },
  { label: 'text-base', className: 'text-base' },
  { label: 'text-lg', className: 'text-lg' },
  { label: 'text-xl', className: 'text-xl' },
  { label: 'text-2xl', className: 'text-2xl' },
  { label: 'text-3xl', className: 'text-3xl' },
  { label: 'text-4xl', className: 'text-4xl' },
];

const spacingScale = [1, 2, 3, 4, 6, 8, 12, 16];

const radiusScale = [
  { label: 'sm', className: 'rounded-sm' },
  { label: 'md', className: 'rounded-md' },
  { label: 'lg', className: 'rounded-lg' },
  { label: 'full', className: 'rounded-full' },
];

const shadowScale = [
  { label: 'sm', className: 'shadow-sm' },
  { label: 'md', className: 'shadow-md' },
  { label: 'lg', className: 'shadow-lg' },
];

export default function StyleguidePage() {
  const [isDark, setIsDark] = useState(false);

  function toggleDemoTheme() {
    document.documentElement.classList.toggle('dark');
    setIsDark((prev) => !prev);
  }

  return (
    <main className="mx-auto max-w-5xl px-6 py-16">
      <div className="mb-12 flex items-center justify-between">
        <div>
          <h1 className="font-heading text-3xl font-bold">Design Token Styleguide</h1>
          <p className="text-muted mt-2">
            Renk, tipografi, boşluk, radius ve gölge token&apos;larının canlı referansı.
          </p>
        </div>
        <button
          onClick={toggleDemoTheme}
          className="border-border bg-surface hover:bg-border shrink-0 rounded-md border px-4 py-2 text-sm font-medium"
        >
          {isDark ? '☀️ Light önizle' : '🌙 Dark önizle'}
        </button>
      </div>

      {/* Renkler */}
      <section className="mb-16">
        <h2 className="font-heading mb-4 text-xl font-semibold">Renk Token&apos;ları</h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {colorTokens.map((token) => (
            <div key={token.name} className="border-border overflow-hidden rounded-md border">
              <div className={`h-16 w-full ${token.className}`} />
              <div className="bg-surface p-3">
                <p className="font-mono text-sm font-medium">{token.name}</p>
                <p className="text-muted text-xs">{token.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Tipografi */}
      <section className="mb-16">
        <h2 className="font-heading mb-4 text-xl font-semibold">Tipografi</h2>
        <div className="border-border bg-surface mb-6 space-y-1 rounded-md border p-4">
          <p className="font-heading text-2xl">Başlık fontu: Space Grotesk</p>
          <p className="font-body">
            Gövde fontu: Inter — uzun paragraflar için okunabilirlik önceliği.
          </p>
        </div>
        <div className="border-border bg-surface space-y-2 rounded-md border p-4">
          {typeScale.map((size) => (
            <p key={size.label} className={size.className}>
              <span className="text-muted mr-3 font-mono text-xs">{size.label}</span>
              Bootcamp&apos;e katılmaya hazır mısın?
            </p>
          ))}
        </div>
      </section>

      {/* Spacing */}
      <section className="mb-16">
        <h2 className="font-heading mb-4 text-xl font-semibold">Spacing (4px taban)</h2>
        <div className="border-border bg-surface space-y-2 rounded-md border p-4">
          {spacingScale.map((step) => (
            <div key={step} className="flex items-center gap-3">
              <span className="text-muted w-16 font-mono text-xs">
                {step} ({step * 4}px)
              </span>
              <div className={`bg-primary h-4`} style={{ width: `${step * 4}px` }} />
            </div>
          ))}
        </div>
      </section>

      {/* Radius */}
      <section className="mb-16">
        <h2 className="font-heading mb-4 text-xl font-semibold">Radius</h2>
        <div className="flex flex-wrap gap-4">
          {radiusScale.map((r) => (
            <div key={r.label} className="text-center">
              <div className={`bg-primary h-16 w-16 ${r.className}`} />
              <p className="text-muted mt-2 font-mono text-xs">{r.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Shadow */}
      <section>
        <h2 className="font-heading mb-4 text-xl font-semibold">Gölge</h2>
        <div className="flex flex-wrap gap-6">
          {shadowScale.map((s) => (
            <div key={s.label} className="text-center">
              <div className={`bg-surface h-16 w-16 rounded-md ${s.className}`} />
              <p className="text-muted mt-2 font-mono text-xs">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Komponentler (A-03 önizleme) */}
      <section className="mt-16">
        <h2 className="font-heading mb-4 text-xl font-semibold">Temel Komponentler</h2>
        <Card className="space-y-8">
          <div>
            <p className="text-muted mb-2 text-xs font-medium">Button</p>
            <div className="flex flex-wrap items-center gap-3">
              <Button variant="primary">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="ghost">Ghost</Button>
              <Button size="sm">Small</Button>
              <Button size="lg">Large</Button>
              <Button loading>Yükleniyor</Button>
            </div>
          </div>

          <div>
            <p className="text-muted mb-2 text-xs font-medium">Badge</p>
            <div className="flex flex-wrap gap-2">
              <Badge>Default</Badge>
              <Badge variant="success">Success</Badge>
              <Badge variant="warning">Warning</Badge>
              <Badge variant="error">Error</Badge>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <Input label="Ad Soyad" placeholder="Örn. Ayşe Yılmaz" />
            <Input label="E-posta" placeholder="ornek@mail.com" error="Geçerli bir e-posta girin" />
            <Select
              label="Seviye"
              options={[
                { value: 'beginner', label: 'Beginner' },
                { value: 'intermediate', label: 'Intermediate' },
                { value: 'advanced', label: 'Advanced' },
              ]}
            />
            <div className="flex items-end">
              <Checkbox label="Kullanım koşullarını kabul ediyorum" />
            </div>
          </div>

          <Textarea label="Mesaj" placeholder="Mesajınızı yazın..." />

          <div>
            <p className="text-muted mb-2 text-xs font-medium">Skeleton & Spinner</p>
            <div className="flex flex-wrap items-center gap-4">
              <Skeleton className="h-10 w-32" />
              <Skeleton className="h-10 w-10 rounded-full" />
              <Spinner size="sm" />
              <Spinner size="md" />
              <Spinner size="lg" />
            </div>
          </div>
        </Card>
      </section>
    </main>
  );
}