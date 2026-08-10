Global IT Bootcamp — Frontend Capstone
Referans ürünün (global-it.team-vit-devops.nl) frontend'inin Next.js App Router + TypeScript ile yeniden inşası. Backend, veritabanı ve gerçek kimlik doğrulama kapsam dışıdır; tüm veriler tiplenmiş mock data dosyalarından okunur.

Canlı URL: (Vercel deploy linkini buraya ekle)

(Buraya Landing, Bootcamps liste, Bootcamp detay ve Dashboard sayfalarından 2-4 ekran görüntüsü eklenmesi önerilir — açık ve koyu tema örnekleri dahil.)
İçindekiler
Kurulum
Kullanılabilir Script'ler
Klasör Yapısı
Tasarım Dosyası
Mimari Kararlar
Kullanılan Kütüphaneler
Lighthouse Sonuçları
Cross-Browser Test
Bilinen Eksikler ve Sınırlamalar
Takım
Kurulum
npm install

npm run dev

Uygulama http://localhost:3000 üzerinde çalışır ve otomatik olarak /en'e yönlendirir.
Kullanılabilir Script'ler
Script
Açıklama
npm run dev
Geliştirme sunucusunu başlatır
npm run build
Prodüksiyon derlemesi yapar
npm run start
Derlenmiş uygulamayı çalıştırır
npm run lint
ESLint kontrolü
npm run typecheck
TypeScript tip kontrolü (tsc --noEmit)
npm run format
Prettier ile kodu biçimlendirir
npm run format:check
Biçimlendirme kontrolü (CI için)

Klasör Yapısı
messages/                 # next-intl çeviri dosyaları (en.json, tr.json, nl.json)

src/

  app/

    [locale]/              # Yerelleştirilmiş ürün sayfaları (en/tr/nl)

      bootcamps/

        [slug]/             # Bootcamp detay (dinamik route)

      auth/

        login/, register/   # page.tsx (metadata) + XxxPageClient.tsx (interaktif form)

      dashboard/            # Statik öğrenci dashboard mockup'ı

      layout.tsx            # Header/Footer/tema/cookie consent içeren root layout

      error.tsx             # Segment geneli hata sınırı

      not-found.tsx         # Yerelleştirilmiş 404

    styleguide/             # [locale] DIŞINDA, ayrı root layout'lu geliştirici referansı

    sitemap.ts, robots.ts   # SEO

  components/

    ui/                    # Genel, projeye özgü olmayan UI komponentleri (Button, Card, Input...)

    layout/                 # Header, Footer, MobileMenu, tema/dil/cookie komponentleri

    sections/               # Sayfaya özgü, veriye bağlı bloklar (Hero, BootcampCard, Pricing...)

  data/                     # Tiplenmiş mock data (bootcamps.ts, categories.ts, cohorts.ts...)

  types/                    # Paylaşılan TypeScript tipleri

  i18n/                     # next-intl routing/navigation/request konfigürasyonu

  lib/                      # Yardımcı fonksiyonlar (cn, tema deposu, site config...)

proxy.ts                    # Locale middleware (Next.js 16'da "middleware.ts" yerine bu isim

                             # kullanılıyor; src/ dizini kullanıldığı için src/ içinde olmalı)

Neden bu ayrım? components/ui, hiçbir iş kuralı bilmeyen, genel/tekrar kullanılabilir parçalar içerir. components/sections ise belirli bir sayfaya ait, veriye bağlı büyük bloklardır. components/layout tüm sayfalarda ortak olan iskelet parçalarıdır. Bu ayrım, ui/layout katmanının, sayfa bazlı sections üretimini bloke etmeden bağımsız ilerlemesini sağlar.
Tasarım Dosyası
Proje için ayrı bir Figma dosyası kullanılmadı; bunun yerine wireframes/ klasöründe düşük çözünürlüklü SVG wireframe'ler bulunuyor (kutu/çizgi düzeyinde, gerçek metin/görsel içermeyen):

wireframes/01-landing.svg — Hero'dan Footer'a kadar tüm Landing bölümleri
wireframes/02-bootcamps-list.svg — filtre paneli + kart grid'i
wireframes/03-bootcamp-detail.svg — müfredat accordion + sticky sidebar
wireframes/04-dashboard.svg — öğrenci dashboard mockup'ı
Mimari Kararlar
Tailwind CSS + CSS custom properties (CSS Modules yerine)
Design token'lar (src/app/globals.css), Tailwind v4'ün @theme inline yönergesiyle CSS custom property'lere bağlanıyor. Bu sayede bg-primary, text-muted gibi class'lar otomatik olarak doğru light/dark değerini kullanıyor; hiçbir komponentte hardcoded hex kod yok. Tailwind, hızlı prototipleme ve tutarlı bir spacing/tipografi skalası sağladığı için CSS Modules'e tercih edildi.
next-intl (i18n)
next-intl, Next.js App Router ile native entegrasyon sunduğu, Server ve Client Component'lerde aynı API'yi (useTranslations / getTranslations) kullanabildiği ve ICU mesaj formatını (çoğul kurallar vb.) desteklediği için seçildi. Routing yapısı: [locale] segmenti altında en/tr/nl, localePrefix: 'always' ile URL'ler her zaman dil önekini taşıyor (paylaşılabilir linkler için).

/styleguide sayfası bilinçli olarak [locale] segmentinin dışında tutuldu ve kendi ayrı root layout'una sahip (Next.js'in "multiple root layouts" deseni). Gerekçe: styleguide ürünün bir parçası değil, sadece geliştiriciler için bir tasarım referansı; bu yüzden çevrilmiyor ve Header/Footer içermiyor. sitemap.ts'ten hariç tutuldu, robots.ts'te disallow edildi.
Tema sistemi: FOUC önleme
Tema tercihi (localStorage) sayfa boyanmadan önce okunup uygulanmalı, aksi halde kısa bir "yanlış renk" flaşı oluşuyor. next/script'in strategy="beforeInteractive"'i denendi ama geliştirme modunda (Turbopack) yeterince erken çalışmadığı gözlemlendi; bunun yerine <script dangerouslySetInnerHTML> (native HTML parsing sırasında, React hydration'ından önce çalışır) kullanıldı. Bilinen bedeli: React, geliştirme modunda bu deseni fark edip zararsız bir konsol uyarısı veriyor (Encountered a script tag...) — npm run build + npm run start ile doğrulandığı üzere bu uyarı yalnızca geliştirme modunda çıkıyor, production'da hiç görünmüyor.
useSyncExternalStore deseni (tema ve cookie consent)
Hem tema hem cookie consent durumu localStorage'da tutuluyor — bu, sunucu (SSR sırasında bilgisi olmayan) ile istemci arasında farklı olabilecek bir "dış" durum. Bu senaryo için React'in resmi çözümü useSyncExternalStore; bir useEffect içinde senkron setState çağırmaktan (React 19+'da ESLint tarafından işaretlenen, eski bir kalıp) daha doğru ve hydration uyumsuzluğu yaratmıyor. Bkz. src/lib/theme-store.ts ve src/components/layout/CookieConsent.tsx.
Server/Client sayfa ayrımı (Contact, Login, Register, Schedule)
Next.js'te bir sayfanın kendine özel title/description (SEO metadata) verebilmesi için o sayfanın bir Server Component olması gerekiyor. Ama bu dört sayfa interaktif form/state içerdiği için 'use client'. Çözüm: her biri page.tsx (Server Component, generateMetadata içerir) ve XxxPageClient.tsx (Client Component, asıl interaktif içerik) olarak ikiye ayrıldı — Bootcamps liste sayfasında zaten kullanılan desenle tutarlı.
clsx + tailwind-merge (cn() yardımcı fonksiyonu)
Tailwind class'larını çakışma olmadan birleştirmek için (src/lib/cn.ts). UI komponent kütüphanesi değil, sadece class string birleştirme yardımcıları; her komponentin className prop'unu güvenle override edebilmesini sağlıyor.
middleware.ts yerine proxy.ts
Next.js 16, src/ dizini kullanılan projelerde middleware dosyasının adını proxy.ts olarak değiştirdi ve dosyanın src/ içine taşınmasını istiyor. Bu proje sırasında keşfedilen, dokümante edilmemiş bir versiyon değişikliği.
Kullanılan Kütüphaneler
Kütüphane
Neden seçildi
Next.js 16 (App Router)
Proje şartnamesi
TypeScript (strict: true)
Proje şartnamesi
Tailwind CSS v4
Utility-first stil, design token'larla merkezi tema yönetimi
next-intl
App Router native i18n, Server+Client Component desteği, ICU mesaj formatı
lucide-react
Tutarlı, tree-shakeable ikon seti. Not: bu paketin güncel versiyonu marka/logo ikonlarını (Facebook, Instagram vb.) içermiyor — Footer'daki sosyal medya ikonları bu yüzden küçük, elle yazılmış inline SVG'ler
clsx + tailwind-merge
cn() yardımcı fonksiyonu için — Tailwind class çakışmalarını güvenle çözer
Prettier + eslint-config-prettier + prettier-plugin-tailwindcss
Biçimlendirme kurallarının ESLint ile çakışmaması, Tailwind class'larının otomatik sıralanması


Component kütüphanesi (shadcn/ui, Radix vb.) kullanılmadı — tüm UI komponentleri (src/components/ui) sıfırdan yazıldı, proje şartnamesindeki "Serbest" maddesi gereği bu bir tercih meselesiydi; küçük, öngörülebilir bir komponent seti için ekstra soyutlama katmanı gerekli görülmedi.
Lighthouse Sonuçları
Production build (npm run build + npm run start), gizli sekmede (tarayıcı eklentileri devre dışı), masaüstü profili, Landing sayfası (/en):

Kategori
Skor
Performance
98
Accessibility
100
Best Practices
100
SEO
100


(Ekran görüntüsü/PDF: docs/lighthouse-report.png — teslimden önce eklenmesi önerilir.)
Cross-Browser Test
Tarayıcı
Sonuç
Chrome
✅ Test edildi, sorun yok
Firefox
✅ Test edildi, sorun yok
Safari
⚠️ Geliştirme ortamı Windows olduğu için gerçek bir Mac/iOS cihazında test edilemedi. Proje standart CSS (Tailwind) ve yaygın desteklenen Web API'leri kullanıyor, WebKit'e özgü herhangi bir hack içermiyor; bu yüzden pratik risk düşük olarak değerlendirildi.

Bilinen Eksikler ve Sınırlamalar
Mock data çevrilmiyor: Bootcamp başlıkları, açıklamaları, eğitmen biyografileri ve yorumlar tek dilde (Türkçe/İngilizce karışık). Çevrilen kısım, uygulamanın kendi arayüz metinleri (buton, başlık, form etiketi vb.) — B-01'in "hiçbir kullanıcıya görünen metin JSX içine gömülü değil" kuralı bu kapsamda karşılanıyor. Mock veriyi de üç dilde tutmak, kapsam dışı bırakıldı.
Partner "logoları" gerçek marka görseli değil: About sayfasındaki işe alım ortağı isimleri (gerçek şirket isimleri) kalın bir "wordmark" tipografisiyle gösteriliyor; gerçek şirket logoları (görseller), gerçek bir iş ortaklığı olmadan telif/marka hakkı riski taşıdığı için kullanılmadı.
Öğrenci dashboard'u statik bir mockup: /dashboard sayfası gerçek bir hesaba bağlı değil, sabit mock veriyle "böyle görünecekti" gösterimi yapıyor (gerçek auth proje kapsamı dışı). Arama motorları tarafından indexlenmesin diye noindex işaretli. Header menüsünde link olarak duruyor ama herhangi bir gerçek girişe bağlı değil. Login/Register akışları bu sayfaya otomatik yönlendirme yapmıyor.
Kohort geri sayımı, saat bilgisi olmadan tarih üzerinden hesaplanıyor: mock veri sadece YYYY-MM-DD formatında tarih içeriyor; saat 09:00 (yerel saat) varsayılıyor.
Bootcamp detay sayfaları build zamanında statik üretiliyor (generateStaticParams); yeni bir kohort/fiyat değişikliği, yeniden deploy edilene kadar yansımaz (ISR kapsam dışı bırakıldı).
Takım
(Gerçek takım ataması yapıldığında doldurulacak: kim hangi rolde, kim neyi yaptı.)

Bu depo, capstone projesinin tamamının uçtan uca bireysel olarak inşa edilmesiyle oluşturuldu (tasarım kararlarından deploy'a kadar), amaç: takım çalışmasına daha hazırlıklı katılabilmek için tüm stack'i (frontend mimarisi, i18n, tema sistemi, erişilebilirlik, SEO) baştan sona deneyimlemek.
