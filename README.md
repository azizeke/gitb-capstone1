# Global IT Bootcamp — Frontend Capstone

Referans ürünün ([global-it.team-vit-devops.nl](https://global-it.team-vit-devops.nl/en)) frontend'inin
Next.js App Router + TypeScript ile yeniden inşası. Backend, veritabanı ve gerçek kimlik doğrulama
kapsam dışıdır; tüm veriler tiplenmiş mock data dosyalarından okunur.

## Kurulum

```bash
npm install
npm run dev
```

Uygulama `http://localhost:3000` üzerinde çalışır.

## Kullanılabilir Script'ler

| Script                 | Açıklama                                 |
| ---------------------- | ---------------------------------------- |
| `npm run dev`          | Geliştirme sunucusunu başlatır           |
| `npm run build`        | Prodüksiyon derlemesi yapar              |
| `npm run start`        | Derlenmiş uygulamayı çalıştırır          |
| `npm run lint`         | ESLint kontrolü                          |
| `npm run typecheck`    | TypeScript tip kontrolü (`tsc --noEmit`) |
| `npm run format`       | Prettier ile kodu biçimlendirir          |
| `npm run format:check` | Biçimlendirme kontrolü (CI için)         |

## Klasör Yapısı

```
src/
  app/                  # Next.js App Router — sayfalar ve layout'lar
  components/
    ui/                 # Temel, projeye özgü olmayan UI komponentleri (Button, Card, Input...)
    layout/              # Header, Footer, MobileMenu gibi sayfa iskeleti komponentleri
    sections/            # Sayfa bölümleri (Hero, PricingSection, TestimonialGrid...)
  data/                  # Tiplenmiş mock data dosyaları (bootcamps.ts, categories.ts...)
  types/                 # Paylaşılan TypeScript tipleri (Bootcamp, Cohort, Instructor...)
  lib/                   # Yardımcı fonksiyonlar (filtreleme, tarih formatlama, vb.)
```

**Neden bu ayrım?**
`components/ui` genel/tekrar kullanılabilir parçalar içerir ve hiçbir iş kuralı bilmez.
`components/sections` ise belirli bir sayfaya ait, veriye bağlı büyük bloklardır.
`components/layout` tüm sayfalarda ortak olan iskelet parçalarıdır. Bu ayrım, R1'in ürettiği
`ui` ve `layout` katmanının R2/R3'ün `sections` üretimini bloke etmeden paralel ilerlemesini sağlar.

## Mimari Kararlar

_(Proje ilerledikçe bu bölüm güncellenecek: Tailwind vs CSS Modules seçimi, i18n kütüphanesi,
animasyon kütüphanesi ve gerekçeleri buraya eklenecek.)_

## Kullanılan Kütüphaneler

- **Next.js 16 (App Router)** — proje şartnamesi
- **TypeScript (strict: true)** — proje şartnamesi
- **Tailwind CSS** — utility-first stil yaklaşımı, design token'larla merkezi tema yönetimi
- **Prettier + eslint-config-prettier** — biçimlendirme kurallarının ESLint ile çakışmaması için
- **prettier-plugin-tailwindcss** — Tailwind class'larının otomatik sıralanması

## Takım Üyeleri

_(Doldurulacak: kim hangi rolde, kim neyi yaptı.)_

## Bilinen Eksikler

_(Proje ilerledikçe güncellenecek.)_
