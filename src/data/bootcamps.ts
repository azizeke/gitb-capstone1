import type { Bootcamp } from '@/types';

export const bootcamps: Bootcamp[] = [
  {
    slug: 'full-stack-web-development',
    title: 'Full-Stack Web Development',
    categorySlug: 'full-stack',
    level: 'beginner',
    format: 'hybrid',
    durationWeeks: 16,
    languages: ['English', 'Turkish'],
    priceEUR: 3900,
    rating: 4.8,
    studentCount: 612,
    shortDescription:
      'React, Node.js ve PostgreSQL ile sıfırdan production-ready uygulamalar geliştirmeyi öğren.',
    description:
      'Bu program, hiç kod yazmamış birinin bile 16 hafta içinde tam donanımlı bir full-stack geliştirici olmasını hedefler. Frontend tarafında React ve TypeScript, backend tarafında Node.js ve Express, veritabanında PostgreSQL kullanarak gerçek dünya projeleri inşa edeceksin. Program boyunca üç takım projesi ve bir bireysel kapanış projesi tamamlanır.',
    heroImage:
      'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&h=675&fit=crop',
    tags: ['React', 'Node.js', 'PostgreSQL', 'TypeScript'],
    curriculum: [
      {
        title: 'Web Temelleri ve JavaScript',
        durationHours: 40,
        lessons: ['HTML & CSS ile semantik yapı', 'Modern JavaScript (ES2023)', 'DOM manipülasyonu', 'Git & GitHub iş akışı'],
      },
      {
        title: 'Frontend: React & TypeScript',
        durationHours: 60,
        lessons: ['Komponent mimarisi', 'State yönetimi (hooks)', 'TypeScript ile tip güvenliği', 'React Router ile sayfa yönlendirme'],
      },
      {
        title: 'Backend: Node.js & Express',
        durationHours: 50,
        lessons: ['REST API tasarımı', 'Kimlik doğrulama (JWT)', 'PostgreSQL ile veri modelleme', 'Hata yönetimi ve loglama'],
      },
      {
        title: 'Deploy ve Kapanış Projesi',
        durationHours: 30,
        lessons: ['CI/CD temelleri', 'Vercel & Railway ile deploy', 'Kod incelemesi pratikleri', 'Kapanış projesi sunumu'],
      },
    ],
    instructorSlug: 'elena-marchetti',
    featured: true,
  },
  {
    slug: 'frontend-engineering-react-typescript',
    title: 'Frontend Engineering with React & TypeScript',
    categorySlug: 'programming',
    level: 'intermediate',
    format: 'online',
    durationWeeks: 10,
    languages: ['English'],
    priceEUR: 2600,
    rating: 4.9,
    studentCount: 438,
    shortDescription:
      'Ölçeklenebilir komponent mimarisi, performans optimizasyonu ve modern test stratejileri.',
    description:
      'Zaten temel React bilgisine sahip geliştiriciler için tasarlanmış bu program, seni orta seviyeden ileri seviyeye taşır. Komponent tasarım desenlerini, state yönetim stratejilerini (Context, Zustand, React Query), performans profillemeyi ve Testing Library ile test yazmayı derinlemesine işleriz.',
    heroImage:
      'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=1200&h=675&fit=crop',
    tags: ['React', 'TypeScript', 'Testing', 'Performance'],
    curriculum: [
      {
        title: 'İleri Komponent Mimarisi',
        durationHours: 30,
        lessons: ['Compound components', 'Custom hooks tasarımı', 'Render optimizasyonu', 'Erişilebilirlik pratikleri'],
      },
      {
        title: 'State Yönetimi',
        durationHours: 25,
        lessons: ["React Query ile sunucu state'i", "Zustand ile istemci state'i", 'Form yönetimi ve validasyon'],
      },
      {
        title: 'Test ve Kalite',
        durationHours: 25,
        lessons: ['Testing Library ile birim test', 'Playwright ile uçtan uca test', 'Storybook ile komponent dokümantasyonu'],
      },
    ],
    instructorSlug: 'elena-marchetti',
    featured: true,
  },
  {
    slug: 'backend-engineering-nodejs',
    title: 'Backend Engineering with Node.js',
    categorySlug: 'programming',
    level: 'intermediate',
    format: 'online',
    durationWeeks: 12,
    languages: ['English', 'Turkish'],
    priceEUR: 2900,
    rating: 4.7,
    studentCount: 305,
    shortDescription:
      "Ölçeklenebilir API'ler, mikroservis mimarisi ve güvenli kimlik doğrulama sistemleri kur.",
    description:
      "Bu program, tek bir monolitik API'den mikroservis mimarisine geçişi, mesaj kuyruklarını (RabbitMQ), önbellekleme stratejilerini (Redis) ve güvenlik en iyi pratiklerini kapsar. Kapanışta gerçek trafik simülasyonuyla yük testi yapılan bir proje teslim edilir.",
    heroImage:
      'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=1200&h=675&fit=crop',
    tags: ['Node.js', 'Microservices', 'Redis', 'Security'],
    curriculum: [
      {
        title: 'API Tasarımı ve Mimari',
        durationHours: 35,
        lessons: ['RESTful ve GraphQL API tasarımı', 'Katmanlı mimari', 'Mikroservislere giriş'],
      },
      {
        title: 'Veri ve Önbellekleme',
        durationHours: 30,
        lessons: ['PostgreSQL ile ileri sorgular', 'Redis ile önbellekleme', 'Mesaj kuyrukları (RabbitMQ)'],
      },
      {
        title: 'Güvenlik ve Ölçeklendirme',
        durationHours: 30,
        lessons: ['OAuth2 & JWT', 'Rate limiting', 'Yük testi ve performans izleme'],
      },
    ],
    instructorSlug: 'marcus-lindqvist',
    featured: false,
  },
  {
    slug: 'data-engineering-fundamentals',
    title: 'Data Engineering Fundamentals',
    categorySlug: 'data-engineering',
    level: 'beginner',
    format: 'online',
    durationWeeks: 12,
    languages: ['English'],
    priceEUR: 3100,
    rating: 4.6,
    studentCount: 219,
    shortDescription:
      "Veri pipeline'ları kurmayı, ETL süreçlerini ve modern veri ambarlarını öğren.",
    description:
      'Ham veriyi güvenilir, ölçeklenebilir pipeline\'lara dönüştürmeyi öğreten bu program; Python, SQL, Apache Airflow ve bulut tabanlı veri ambarlarını (Snowflake/BigQuery) kapsar. Gerçek şirket veri setleriyle çalışarak pipeline hatalarını debug etmeyi öğrenirsin.',
    heroImage:
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=675&fit=crop',
    tags: ['Python', 'Airflow', 'SQL', 'ETL'],
    curriculum: [
      {
        title: 'Veri Mühendisliğine Giriş',
        durationHours: 25,
        lessons: ['Python ile veri işleme', 'SQL ile ileri sorgular', 'Veri modelleme temelleri'],
      },
      {
        title: 'Pipeline Orkestrasyon',
        durationHours: 35,
        lessons: ['Apache Airflow ile DAG tasarımı', 'Batch vs streaming işleme', 'Hata yönetimi ve yeniden deneme stratejileri'],
      },
      {
        title: 'Bulut Veri Ambarları',
        durationHours: 30,
        lessons: ['Snowflake temelleri', 'Veri ambarı modelleme (star schema)', 'Maliyet optimizasyonu'],
      },
    ],
    instructorSlug: 'jonas-weber',
    featured: false,
  },
  {
    slug: 'modern-data-warehousing-analytics-engineering',
    title: 'Modern Data Warehousing & Analytics Engineering',
    categorySlug: 'data-engineering',
    level: 'advanced',
    format: 'hybrid',
    durationWeeks: 8,
    languages: ['English'],
    priceEUR: 2400,
    rating: 4.5,
    studentCount: 134,
    shortDescription:
      "dbt ile analytics engineering ve modern veri ambarı mimarisinde uzmanlaş.",
    description:
      'Data Engineering Fundamentals mezunları veya deneyimli veri mühendisleri için tasarlanmış ileri seviye bir program. dbt ile modüler dönüşüm katmanları kurmayı, veri kalitesi testlerini otomatikleştirmeyi ve analitik ekiplerle etkili iş birliği yapmayı öğrenirsin.',
    heroImage:
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=675&fit=crop',
    tags: ['dbt', 'Data Warehouse', 'Analytics Engineering'],
    curriculum: [
      {
        title: 'dbt ile Dönüşüm Katmanları',
        durationHours: 28,
        lessons: ['dbt modelleri ve materializasyon', 'Veri kalitesi testleri', 'Dokümantasyon ve lineage'],
      },
      {
        title: 'İleri Modelleme',
        durationHours: 24,
        lessons: ['Slowly changing dimensions', 'Incremental modeller', 'Performans tuning'],
      },
    ],
    instructorSlug: 'jonas-weber',
    featured: false,
  },
  {
    slug: 'machine-learning-engineering',
    title: 'Machine Learning Engineering',
    categorySlug: 'ai-ml',
    level: 'intermediate',
    format: 'online',
    durationWeeks: 14,
    languages: ['English'],
    priceEUR: 3600,
    rating: 4.8,
    studentCount: 287,
    shortDescription:
      'Modelleri sadece eğitmeyi değil, üretime almayı ve izlemeyi öğren.',
    description:
      'Bu program, Jupyter defterinde çalışan bir modelden gerçek kullanıcılara hizmet veren bir production sistemine geçişi kapsar. PyTorch ile model geliştirme, MLflow ile deney takibi, model serving ve izleme (monitoring) konularını gerçek projelerle pekiştirirsin.',
    heroImage:
      'https://images.unsplash.com/photo-1555255707-c07966088b7b?w=1200&h=675&fit=crop',
    tags: ['PyTorch', 'MLOps', 'Python', 'Model Serving'],
    curriculum: [
      {
        title: 'Model Geliştirme',
        durationHours: 40,
        lessons: ['PyTorch temelleri', 'Özellik mühendisliği', 'Model değerlendirme metrikleri'],
      },
      {
        title: 'MLOps ve Deploy',
        durationHours: 35,
        lessons: ['MLflow ile deney takibi', 'Model serving (FastAPI)', 'Konteynerleştirme (Docker)'],
      },
      {
        title: 'İzleme ve Sürdürme',
        durationHours: 25,
        lessons: ['Model drift tespiti', 'A/B test tasarımı', 'Üretimde yeniden eğitim stratejileri'],
      },
    ],
    instructorSlug: 'priya-nair',
    featured: true,
  },
  {
    slug: 'applied-ai-large-language-models',
    title: 'Applied AI & Large Language Models',
    categorySlug: 'ai-ml',
    level: 'advanced',
    format: 'online',
    durationWeeks: 8,
    languages: ['English'],
    priceEUR: 2800,
    rating: 4.7,
    studentCount: 198,
    shortDescription:
      'LLM tabanlı uygulamalar tasarla: RAG sistemleri, ajanlar ve fine-tuning.',
    description:
      'Büyük dil modellerini gerçek ürünlere entegre etmeyi öğreten yoğun bir program. Retrieval-Augmented Generation (RAG) mimarileri, prompt mühendisliği, açık kaynak modellerin fine-tuning\'i ve maliyet/performans dengesini yönetmeyi kapsar.',
    heroImage:
      'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1200&h=675&fit=crop',
    tags: ['LLM', 'RAG', 'Prompt Engineering', 'Python'],
    curriculum: [
      {
        title: 'LLM Temelleri',
        durationHours: 20,
        lessons: ['Transformer mimarisine genel bakış', 'Prompt mühendisliği teknikleri', 'Tokenizasyon ve maliyet yönetimi'],
      },
      {
        title: 'RAG ve Ajanlar',
        durationHours: 28,
        lessons: ['Vektör veritabanları', 'RAG pipeline tasarımı', 'Çok adımlı ajan mimarileri'],
      },
    ],
    instructorSlug: 'priya-nair',
    featured: false,
  },
  {
    slug: 'cloud-devops-engineering',
    title: 'Cloud & DevOps Engineering',
    categorySlug: 'cloud-devops',
    level: 'intermediate',
    format: 'hybrid',
    durationWeeks: 12,
    languages: ['English', 'Turkish'],
    priceEUR: 3200,
    rating: 4.8,
    studentCount: 356,
    shortDescription:
      "AWS, Terraform ve CI/CD pipeline'ları ile altyapıyı kod olarak yönet.",
    description:
      'Bu program, geleneksel sistem yönetiminden modern DevOps pratiklerine geçişi hedefler. Infrastructure as Code (Terraform), konteynerleştirme, CI/CD pipeline tasarımı ve gözlemlenebilirlik (observability) araçlarını kapsayan uygulamalı bir müfredat sunar.',
    heroImage:
      'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=1200&h=675&fit=crop',
    tags: ['AWS', 'Terraform', 'CI/CD', 'Docker'],
    curriculum: [
      {
        title: 'Bulut Temelleri',
        durationHours: 30,
        lessons: ['AWS temel servisleri', 'Ağ ve güvenlik grupları', 'IAM ve erişim yönetimi'],
      },
      {
        title: 'Infrastructure as Code',
        durationHours: 35,
        lessons: ['Terraform ile altyapı tanımlama', 'Modüler Terraform yapıları', 'State yönetimi'],
      },
      {
        title: 'CI/CD ve Gözlemlenebilirlik',
        durationHours: 30,
        lessons: ['GitHub Actions ile pipeline kurulumu', 'Prometheus & Grafana', 'Log yönetimi'],
      },
    ],
    instructorSlug: 'daniel-osei',
    featured: true,
  },
  {
    slug: 'kubernetes-platform-engineering',
    title: 'Kubernetes & Platform Engineering',
    categorySlug: 'cloud-devops',
    level: 'advanced',
    format: 'online',
    durationWeeks: 8,
    languages: ['English'],
    priceEUR: 2700,
    rating: 4.6,
    studentCount: 172,
    shortDescription:
      'Kubernetes kümelerini tasarla, işlet ve ölçeklendir; kendi iç platformunu kur.',
    description:
      'Konteyner orkestrasyonunda derinleşmek isteyen mühendisler için. Kubernetes küme mimarisi, Helm ile paketleme, GitOps (ArgoCD) ve platform mühendisliği pratiklerini gerçek kümeler üzerinde uygulayarak öğrenirsin.',
    heroImage:
      'https://images.unsplash.com/photo-1667372393119-90ec2f753e73?w=1200&h=675&fit=crop',
    tags: ['Kubernetes', 'Helm', 'GitOps', 'Platform Engineering'],
    curriculum: [
      {
        title: 'Kubernetes Derinlemesine',
        durationHours: 30,
        lessons: ['Küme mimarisi', 'Workload yönetimi', 'Ağ ve servis mesh (Istio)'],
      },
      {
        title: 'Platform Mühendisliği',
        durationHours: 26,
        lessons: ['Helm ile paketleme', 'GitOps (ArgoCD)', 'Kendi iç geliştirici platformunu tasarlama'],
      },
    ],
    instructorSlug: 'daniel-osei',
    featured: false,
  },
  {
    slug: 'cybersecurity-ethical-hacking',
    title: 'Cybersecurity & Ethical Hacking',
    categorySlug: 'cybersecurity',
    level: 'intermediate',
    format: 'hybrid',
    durationWeeks: 10,
    languages: ['English', 'Turkish'],
    priceEUR: 3000,
    rating: 4.7,
    studentCount: 241,
    shortDescription:
      'Sızma testi, güvenlik denetimi ve olay müdahalesi konularında pratik beceriler kazan.',
    description:
      'Bu program, savunma ve saldırı güvenliğinin her iki tarafını da kapsar. Sızma testi metodolojileri, web uygulama güvenlik açıkları (OWASP Top 10), ağ güvenliği ve gerçek olay müdahale senaryolarıyla pratik yapılır. Kapanışta canlı bir "capture the flag" etkinliği düzenlenir.',
    heroImage:
      'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1200&h=675&fit=crop',
    tags: ['Penetration Testing', 'OWASP', 'Network Security'],
    curriculum: [
      {
        title: 'Güvenlik Temelleri',
        durationHours: 28,
        lessons: ['Tehdit modelleme', 'Ağ güvenliği temelleri', 'Kriptografiye giriş'],
      },
      {
        title: 'Sızma Testi',
        durationHours: 32,
        lessons: ['OWASP Top 10', 'Web uygulama sızma testi', 'Raporlama ve sorumlu ifşa'],
      },
      {
        title: 'Olay Müdahale',
        durationHours: 20,
        lessons: ['Olay müdahale süreci', 'Adli bilişim temelleri', 'Capture the flag etkinliği'],
      },
    ],
    instructorSlug: 'marcus-lindqvist',
    featured: false,
  },
  {
    slug: 'mobile-app-development-react-native',
    title: 'Mobile App Development with React Native',
    categorySlug: 'mobile-dev',
    level: 'beginner',
    format: 'online',
    durationWeeks: 10,
    languages: ['English'],
    priceEUR: 2500,
    rating: 4.6,
    studentCount: 203,
    shortDescription:
      "iOS ve Android için tek kod tabanından native performanslı uygulamalar geliştir.",
    description:
      "React Native ile sıfırdan App Store ve Google Play'e uygulama yayınlamayı öğreten kapsamlı bir program. Native modüller, push bildirimleri, offline veri senkronizasyonu ve performans optimizasyonu konularını kapsar.",
    heroImage:
      'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1200&h=675&fit=crop',
    tags: ['React Native', 'iOS', 'Android', 'TypeScript'],
    curriculum: [
      {
        title: 'React Native Temelleri',
        durationHours: 30,
        lessons: ['Komponent ve navigasyon yapıları', 'Native modüllere giriş', 'Platform bazlı stil yönetimi'],
      },
      {
        title: 'İleri Özellikler',
        durationHours: 28,
        lessons: ['Push bildirimleri', 'Offline veri senkronizasyonu', 'Performans profilleme'],
      },
      {
        title: 'Yayınlama',
        durationHours: 16,
        lessons: ['App Store & Google Play süreçleri', 'CodePush ile OTA güncellemeler'],
      },
    ],
    instructorSlug: 'sofia-alvarez',
    featured: false,
  },
  {
    slug: 'data-analytics-business-intelligence',
    title: 'Data Analytics & Business Intelligence',
    categorySlug: 'data-analytics',
    level: 'beginner',
    format: 'online',
    durationWeeks: 8,
    languages: ['English', 'Turkish'],
    priceEUR: 2100,
    rating: 4.5,
    studentCount: 276,
    shortDescription:
      "SQL, Python ve BI araçlarıyla veriden iş kararlarına giden yolu öğren.",
    description:
      "İş zekası ve veri analitiği alanına giriş yapmak isteyenler için tasarlanmış bu program; SQL, Python (pandas) ve Power BI / Tableau kullanarak veri setlerini analiz etmeyi, görselleştirmeyi ve paydaşlara sunmayı öğretir.",
    heroImage: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=1200&h=675&fit=crop&sat=-40',
    tags: ['SQL', 'Python', 'Power BI', 'Tableau'],
    curriculum: [
      {
        title: 'Veri Analizi Temelleri',
        durationHours: 24,
        lessons: ['SQL ile veri sorgulama', 'Python (pandas) ile veri temizleme', 'İstatistik temelleri'],
      },
      {
        title: 'Görselleştirme ve Sunum',
        durationHours: 22,
        lessons: ["Power BI ile dashboard tasarımı", 'Tableau temelleri', 'Veri hikayeleştirme (storytelling)'],
      },
    ],
    instructorSlug: 'jonas-weber',
    featured: false,
  },
];