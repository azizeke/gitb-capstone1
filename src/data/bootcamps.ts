import type { Bootcamp, CurriculumModule, LocalizedText, Locale } from '@/types';

/*
 * Bu dosyadaki veri, EN/TR/NL çevirilerini bir arada tutan "ham" (raw)
 * bir yapı kullanıyor (`LocalizedText` alanları). Bileşenler bu ham
 * diziyi DOĞRUDAN import etmiyor — bunun yerine aşağıdaki `getBootcamps(locale)`
 * / `getBootcampBySlug(locale, slug)` fonksiyonlarını çağırıyor, bu
 * fonksiyonlar ilgili dile göre düz string'lere "çözülmüş" (resolved)
 * bir `Bootcamp[]` döndürüyor. Böylece `Bootcamp` tipi (ve onu tüketen
 * tüm komponentler — BootcampCard, CurriculumAccordion vb.) hiç
 * değişmeden kalıyor.
 */

interface CurriculumModuleRaw {
  title: LocalizedText;
  durationHours: number;
  lessons: LocalizedText[];
}

interface BootcampRaw {
  slug: string;
  title: LocalizedText;
  categorySlug: string;
  level: Bootcamp['level'];
  format: Bootcamp['format'];
  durationWeeks: number;
  languages: string[];
  priceEUR: number;
  rating: number;
  studentCount: number;
  shortDescription: LocalizedText;
  description: LocalizedText;
  heroImage: string;
  tags: LocalizedText[];
  curriculum: CurriculumModuleRaw[];
  instructorSlug: string;
  featured: boolean;
}

const bootcampsRaw: BootcampRaw[] = [
  {
    slug: 'full-stack-web-development',
    title: {
      en: 'Full-Stack Web Development',
      tr: 'Full-Stack Web Geliştirme',
      nl: 'Full-Stack Webontwikkeling',
    },
    categorySlug: 'full-stack',
    level: 'beginner',
    format: 'hybrid',
    durationWeeks: 16,
    languages: ['English', 'Turkish'],
    priceEUR: 3900,
    rating: 4.8,
    studentCount: 612,
    shortDescription: {
      en: 'Learn to build production-ready applications from scratch with React, Node.js, and PostgreSQL.',
      tr: 'React, Node.js ve PostgreSQL ile sıfırdan production-ready uygulamalar geliştirmeyi öğren.',
      nl: 'Leer productieklare applicaties vanaf nul bouwen met React, Node.js en PostgreSQL.',
    },
    description: {
      en: "This program aims to take even complete beginners to a well-rounded full-stack developer in 16 weeks. You'll build real-world projects using React and TypeScript on the frontend, Node.js and Express on the backend, and PostgreSQL for the database. Three team projects and one individual capstone project are completed throughout the program.",
      tr: 'Bu program, hiç kod yazmamış birinin bile 16 hafta içinde tam donanımlı bir full-stack geliştirici olmasını hedefler. Frontend tarafında React ve TypeScript, backend tarafında Node.js ve Express, veritabanında PostgreSQL kullanarak gerçek dünya projeleri inşa edeceksin. Program boyunca üç takım projesi ve bir bireysel kapanış projesi tamamlanır.',
      nl: 'Dit programma is erop gericht om zelfs volledige beginners in 16 weken tot een veelzijdige full-stack developer te maken. Je bouwt praktijkprojecten met React en TypeScript aan de frontend, Node.js en Express aan de backend, en PostgreSQL als database. Gedurende het programma rond je drie teamprojecten en één individueel afstudeerproject af.',
    },
    heroImage: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&h=675&fit=crop',
    tags: [
      { en: 'React', tr: 'React', nl: 'React' },
      { en: 'Node.js', tr: 'Node.js', nl: 'Node.js' },
      { en: 'PostgreSQL', tr: 'PostgreSQL', nl: 'PostgreSQL' },
      { en: 'TypeScript', tr: 'TypeScript', nl: 'TypeScript' },
    ],
    curriculum: [
      {
        title: {
          en: 'Web Fundamentals & JavaScript',
          tr: 'Web Temelleri ve JavaScript',
          nl: 'Webbasis en JavaScript',
        },
        durationHours: 40,
        lessons: [
          {
            en: 'Semantic structure with HTML & CSS',
            tr: 'HTML & CSS ile semantik yapı',
            nl: 'Semantische structuur met HTML & CSS',
          },
          {
            en: 'Modern JavaScript (ES2023)',
            tr: 'Modern JavaScript (ES2023)',
            nl: 'Moderne JavaScript (ES2023)',
          },
          { en: 'DOM manipulation', tr: 'DOM manipülasyonu', nl: 'DOM-manipulatie' },
          {
            en: 'Git & GitHub workflow',
            tr: 'Git & GitHub iş akışı',
            nl: 'Git & GitHub-workflow',
          },
        ],
      },
      {
        title: {
          en: 'Frontend: React & TypeScript',
          tr: 'Frontend: React & TypeScript',
          nl: 'Frontend: React & TypeScript',
        },
        durationHours: 60,
        lessons: [
          { en: 'Component architecture', tr: 'Komponent mimarisi', nl: 'Componentarchitectuur' },
          {
            en: 'State management (hooks)',
            tr: 'State yönetimi (hooks)',
            nl: 'State management (hooks)',
          },
          {
            en: 'Type safety with TypeScript',
            tr: 'TypeScript ile tip güvenliği',
            nl: 'Typeveiligheid met TypeScript',
          },
          {
            en: 'Page routing with React Router',
            tr: 'React Router ile sayfa yönlendirme',
            nl: 'Paginanavigatie met React Router',
          },
        ],
      },
      {
        title: {
          en: 'Backend: Node.js & Express',
          tr: 'Backend: Node.js & Express',
          nl: 'Backend: Node.js & Express',
        },
        durationHours: 50,
        lessons: [
          { en: 'REST API design', tr: 'REST API tasarımı', nl: 'REST API-ontwerp' },
          { en: 'Authentication (JWT)', tr: 'Kimlik doğrulama (JWT)', nl: 'Authenticatie (JWT)' },
          {
            en: 'Data modeling with PostgreSQL',
            tr: 'PostgreSQL ile veri modelleme',
            nl: 'Datamodellering met PostgreSQL',
          },
          {
            en: 'Error handling and logging',
            tr: 'Hata yönetimi ve loglama',
            nl: 'Foutafhandeling en logging',
          },
        ],
      },
      {
        title: {
          en: 'Deployment & Capstone Project',
          tr: 'Deploy ve Kapanış Projesi',
          nl: 'Deployment & Afstudeerproject',
        },
        durationHours: 30,
        lessons: [
          { en: 'CI/CD fundamentals', tr: 'CI/CD temelleri', nl: 'CI/CD-basis' },
          {
            en: 'Deploying with Vercel & Railway',
            tr: 'Vercel & Railway ile deploy',
            nl: 'Deployen met Vercel & Railway',
          },
          {
            en: 'Code review practices',
            tr: 'Kod incelemesi pratikleri',
            nl: 'Code review-praktijken',
          },
          {
            en: 'Capstone project presentation',
            tr: 'Kapanış projesi sunumu',
            nl: 'Presentatie van het afstudeerproject',
          },
        ],
      },
    ],
    instructorSlug: 'elena-marchetti',
    featured: true,
  },
  {
    slug: 'frontend-engineering-react-typescript',
    title: {
      en: 'Frontend Engineering with React & TypeScript',
      tr: 'React & TypeScript ile Frontend Mühendisliği',
      nl: 'Frontend Engineering met React & TypeScript',
    },
    categorySlug: 'programming',
    level: 'intermediate',
    format: 'online',
    durationWeeks: 10,
    languages: ['English'],
    priceEUR: 2600,
    rating: 4.9,
    studentCount: 438,
    shortDescription: {
      en: 'Scalable component architecture, performance optimization, and modern testing strategies.',
      tr: 'Ölçeklenebilir komponent mimarisi, performans optimizasyonu ve modern test stratejileri.',
      nl: 'Schaalbare componentarchitectuur, performance-optimalisatie en moderne teststrategieën.',
    },
    description: {
      en: 'Designed for developers who already know the basics of React, this program takes you from intermediate to advanced level. We go deep into component design patterns, state management strategies (Context, Zustand, React Query), performance profiling, and writing tests with Testing Library.',
      tr: 'Zaten temel React bilgisine sahip geliştiriciler için tasarlanmış bu program, seni orta seviyeden ileri seviyeye taşır. Komponent tasarım desenlerini, state yönetim stratejilerini (Context, Zustand, React Query), performans profillemeyi ve Testing Library ile test yazmayı derinlemesine işleriz.',
      nl: 'Dit programma is ontworpen voor developers die de basis van React al beheersen en tilt je van gemiddeld naar gevorderd niveau. We duiken diep in componentontwerppatronen, state management-strategieën (Context, Zustand, React Query), performance profiling en het schrijven van tests met Testing Library.',
    },
    heroImage: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=1200&h=675&fit=crop',
    tags: [
      { en: 'React', tr: 'React', nl: 'React' },
      { en: 'TypeScript', tr: 'TypeScript', nl: 'TypeScript' },
      { en: 'Testing', tr: 'Testing', nl: 'Testen' },
      { en: 'Performance', tr: 'Performance', nl: 'Performance' },
    ],
    curriculum: [
      {
        title: {
          en: 'Advanced Component Architecture',
          tr: 'İleri Komponent Mimarisi',
          nl: 'Geavanceerde Componentarchitectuur',
        },
        durationHours: 30,
        lessons: [
          { en: 'Compound components', tr: 'Compound components', nl: 'Compound components' },
          {
            en: 'Designing custom hooks',
            tr: 'Custom hooks tasarımı',
            nl: 'Custom hooks ontwerpen',
          },
          { en: 'Render optimization', tr: 'Render optimizasyonu', nl: 'Render-optimalisatie' },
          {
            en: 'Accessibility practices',
            tr: 'Erişilebilirlik pratikleri',
            nl: 'Toegankelijkheidspraktijken',
          },
        ],
      },
      {
        title: { en: 'State Management', tr: 'State Yönetimi', nl: 'State Management' },
        durationHours: 25,
        lessons: [
          {
            en: 'Server state with React Query',
            tr: "React Query ile sunucu state'i",
            nl: 'Server state met React Query',
          },
          {
            en: 'Client state with Zustand',
            tr: "Zustand ile istemci state'i",
            nl: 'Client state met Zustand',
          },
          {
            en: 'Form management and validation',
            tr: 'Form yönetimi ve validasyon',
            nl: 'Formulierbeheer en validatie',
          },
        ],
      },
      {
        title: { en: 'Testing & Quality', tr: 'Test ve Kalite', nl: 'Testen & Kwaliteit' },
        durationHours: 25,
        lessons: [
          {
            en: 'Unit testing with Testing Library',
            tr: 'Testing Library ile birim test',
            nl: 'Unit tests met Testing Library',
          },
          {
            en: 'End-to-end testing with Playwright',
            tr: 'Playwright ile uçtan uca test',
            nl: 'End-to-end tests met Playwright',
          },
          {
            en: 'Component documentation with Storybook',
            tr: 'Storybook ile komponent dokümantasyonu',
            nl: 'Componentdocumentatie met Storybook',
          },
        ],
      },
    ],
    instructorSlug: 'elena-marchetti',
    featured: true,
  },
  {
    slug: 'backend-engineering-nodejs',
    title: {
      en: 'Backend Engineering with Node.js',
      tr: 'Node.js ile Backend Mühendisliği',
      nl: 'Backend Engineering met Node.js',
    },
    categorySlug: 'programming',
    level: 'intermediate',
    format: 'online',
    durationWeeks: 12,
    languages: ['English', 'Turkish'],
    priceEUR: 2900,
    rating: 4.7,
    studentCount: 305,
    shortDescription: {
      en: 'Build scalable APIs, microservice architecture, and secure authentication systems.',
      tr: "Ölçeklenebilir API'ler, mikroservis mimarisi ve güvenli kimlik doğrulama sistemleri kur.",
      nl: 'Bouw schaalbare API\u2019s, microservice-architectuur en veilige authenticatiesystemen.',
    },
    description: {
      en: 'This program covers the transition from a single monolithic API to microservice architecture, message queues (RabbitMQ), caching strategies (Redis), and security best practices. You finish with a project that\u2019s load-tested with a real traffic simulation.',
      tr: "Bu program, tek bir monolitik API'den mikroservis mimarisine geçişi, mesaj kuyruklarını (RabbitMQ), önbellekleme stratejilerini (Redis) ve güvenlik en iyi pratiklerini kapsar. Kapanışta gerçek trafik simülasyonuyla yük testi yapılan bir proje teslim edilir.",
      nl: 'Dit programma behandelt de overstap van een enkele monolithische API naar microservice-architectuur, message queues (RabbitMQ), cachingstrategieën (Redis) en security best practices. Je sluit af met een project dat via een realistische verkeerssimulatie wordt belast getest.',
    },
    heroImage: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=1200&h=675&fit=crop',
    tags: [
      { en: 'Node.js', tr: 'Node.js', nl: 'Node.js' },
      { en: 'Microservices', tr: 'Microservices', nl: 'Microservices' },
      { en: 'Redis', tr: 'Redis', nl: 'Redis' },
      { en: 'Security', tr: 'Security', nl: 'Beveiliging' },
    ],
    curriculum: [
      {
        title: {
          en: 'API Design & Architecture',
          tr: 'API Tasarımı ve Mimari',
          nl: 'API-ontwerp & Architectuur',
        },
        durationHours: 35,
        lessons: [
          {
            en: 'RESTful and GraphQL API design',
            tr: 'RESTful ve GraphQL API tasarımı',
            nl: 'RESTful en GraphQL API-ontwerp',
          },
          { en: 'Layered architecture', tr: 'Katmanlı mimari', nl: 'Gelaagde architectuur' },
          {
            en: 'Introduction to microservices',
            tr: 'Mikroservislere giriş',
            nl: 'Introductie tot microservices',
          },
        ],
      },
      {
        title: { en: 'Data & Caching', tr: 'Veri ve Önbellekleme', nl: 'Data & Caching' },
        durationHours: 30,
        lessons: [
          {
            en: 'Advanced PostgreSQL queries',
            tr: 'PostgreSQL ile ileri sorgular',
            nl: 'Geavanceerde PostgreSQL-query\u2019s',
          },
          { en: 'Caching with Redis', tr: 'Redis ile önbellekleme', nl: 'Caching met Redis' },
          {
            en: 'Message queues (RabbitMQ)',
            tr: 'Mesaj kuyrukları (RabbitMQ)',
            nl: 'Message queues (RabbitMQ)',
          },
        ],
      },
      {
        title: {
          en: 'Security & Scaling',
          tr: 'Güvenlik ve Ölçeklendirme',
          nl: 'Beveiliging & Schalen',
        },
        durationHours: 30,
        lessons: [
          { en: 'OAuth2 & JWT', tr: 'OAuth2 & JWT', nl: 'OAuth2 & JWT' },
          { en: 'Rate limiting', tr: 'Rate limiting', nl: 'Rate limiting' },
          {
            en: 'Load testing and performance monitoring',
            tr: 'Yük testi ve performans izleme',
            nl: 'Load testing en performance monitoring',
          },
        ],
      },
    ],
    instructorSlug: 'marcus-lindqvist',
    featured: false,
  },
  {
    slug: 'data-engineering-fundamentals',
    title: {
      en: 'Data Engineering Fundamentals',
      tr: 'Veri Mühendisliği Temelleri',
      nl: 'Grondbeginselen van Data Engineering',
    },
    categorySlug: 'data-engineering',
    level: 'beginner',
    format: 'online',
    durationWeeks: 12,
    languages: ['English'],
    priceEUR: 3100,
    rating: 4.6,
    studentCount: 219,
    shortDescription: {
      en: 'Learn to build data pipelines, ETL processes, and modern data warehouses.',
      tr: "Veri pipeline'ları kurmayı, ETL süreçlerini ve modern veri ambarlarını öğren.",
      nl: 'Leer datapipelines, ETL-processen en moderne datawarehouses bouwen.',
    },
    description: {
      en: 'This program teaches you to turn raw data into reliable, scalable pipelines. It covers Python, SQL, Apache Airflow, and cloud-based data warehouses (Snowflake/BigQuery). You\u2019ll work with real company datasets and learn to debug pipeline failures.',
      tr: "Ham veriyi güvenilir, ölçeklenebilir pipeline'lara dönüştürmeyi öğreten bu program; Python, SQL, Apache Airflow ve bulut tabanlı veri ambarlarını (Snowflake/BigQuery) kapsar. Gerçek şirket veri setleriyle çalışarak pipeline hatalarını debug etmeyi öğrenirsin.",
      nl: 'Dit programma leert je ruwe data om te zetten in betrouwbare, schaalbare pipelines. Het behandelt Python, SQL, Apache Airflow en cloudgebaseerde datawarehouses (Snowflake/BigQuery). Je werkt met echte bedrijfsdatasets en leert pipelinefouten te debuggen.',
    },
    heroImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=675&fit=crop',
    tags: [
      { en: 'Python', tr: 'Python', nl: 'Python' },
      { en: 'Airflow', tr: 'Airflow', nl: 'Airflow' },
      { en: 'SQL', tr: 'SQL', nl: 'SQL' },
      { en: 'ETL', tr: 'ETL', nl: 'ETL' },
    ],
    curriculum: [
      {
        title: {
          en: 'Introduction to Data Engineering',
          tr: 'Veri Mühendisliğine Giriş',
          nl: 'Introductie tot Data Engineering',
        },
        durationHours: 25,
        lessons: [
          {
            en: 'Data processing with Python',
            tr: 'Python ile veri işleme',
            nl: 'Data verwerken met Python',
          },
          {
            en: 'Advanced SQL queries',
            tr: 'SQL ile ileri sorgular',
            nl: 'Geavanceerde SQL-query\u2019s',
          },
          {
            en: 'Data modeling fundamentals',
            tr: 'Veri modelleme temelleri',
            nl: 'Grondbeginselen van datamodellering',
          },
        ],
      },
      {
        title: {
          en: 'Pipeline Orchestration',
          tr: 'Pipeline Orkestrasyon',
          nl: 'Pipeline-orkestratie',
        },
        durationHours: 35,
        lessons: [
          {
            en: 'DAG design with Apache Airflow',
            tr: 'Apache Airflow ile DAG tasarımı',
            nl: 'DAG-ontwerp met Apache Airflow',
          },
          {
            en: 'Batch vs. streaming processing',
            tr: 'Batch vs streaming işleme',
            nl: 'Batch vs. streaming-verwerking',
          },
          {
            en: 'Error handling and retry strategies',
            tr: 'Hata yönetimi ve yeniden deneme stratejileri',
            nl: 'Foutafhandeling en retry-strategieën',
          },
        ],
      },
      {
        title: {
          en: 'Cloud Data Warehouses',
          tr: 'Bulut Veri Ambarları',
          nl: 'Cloud Datawarehouses',
        },
        durationHours: 30,
        lessons: [
          {
            en: 'Snowflake fundamentals',
            tr: 'Snowflake temelleri',
            nl: 'Grondbeginselen van Snowflake',
          },
          {
            en: 'Data warehouse modeling (star schema)',
            tr: 'Veri ambarı modelleme (star schema)',
            nl: 'Datawarehouse-modellering (star schema)',
          },
          { en: 'Cost optimization', tr: 'Maliyet optimizasyonu', nl: 'Kostenoptimalisatie' },
        ],
      },
    ],
    instructorSlug: 'jonas-weber',
    featured: false,
  },
  {
    slug: 'modern-data-warehousing-analytics-engineering',
    title: {
      en: 'Modern Data Warehousing & Analytics Engineering',
      tr: 'Modern Veri Ambarı ve Analitik Mühendisliği',
      nl: 'Moderne Data Warehousing & Analytics Engineering',
    },
    categorySlug: 'data-engineering',
    level: 'advanced',
    format: 'hybrid',
    durationWeeks: 8,
    languages: ['English'],
    priceEUR: 2400,
    rating: 4.5,
    studentCount: 134,
    shortDescription: {
      en: 'Master analytics engineering and modern data warehouse architecture with dbt.',
      tr: 'dbt ile analytics engineering ve modern veri ambarı mimarisinde uzmanlaş.',
      nl: 'Beheers analytics engineering en moderne datawarehouse-architectuur met dbt.',
    },
    description: {
      en: 'An advanced program designed for graduates of Data Engineering Fundamentals or experienced data engineers. You\u2019ll learn to build modular transformation layers with dbt, automate data quality tests, and collaborate effectively with analytics teams.',
      tr: 'Data Engineering Fundamentals mezunları veya deneyimli veri mühendisleri için tasarlanmış ileri seviye bir program. dbt ile modüler dönüşüm katmanları kurmayı, veri kalitesi testlerini otomatikleştirmeyi ve analitik ekiplerle etkili iş birliği yapmayı öğrenirsin.',
      nl: 'Een gevorderd programma voor afgestudeerden van Data Engineering Fundamentals of ervaren data engineers. Je leert modulaire transformatielagen bouwen met dbt, datakwaliteitstests automatiseren en effectief samenwerken met analytics-teams.',
    },
    heroImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=675&fit=crop',
    tags: [
      { en: 'dbt', tr: 'dbt', nl: 'dbt' },
      { en: 'Data Warehouse', tr: 'Data Warehouse', nl: 'Datawarehouse' },
      { en: 'Analytics Engineering', tr: 'Analytics Engineering', nl: 'Analytics Engineering' },
    ],
    curriculum: [
      {
        title: {
          en: 'Transformation Layers with dbt',
          tr: 'dbt ile Dönüşüm Katmanları',
          nl: 'Transformatielagen met dbt',
        },
        durationHours: 28,
        lessons: [
          {
            en: 'dbt models and materialization',
            tr: 'dbt modelleri ve materializasyon',
            nl: 'dbt-modellen en materialisatie',
          },
          {
            en: 'Data quality tests',
            tr: 'Veri kalitesi testleri',
            nl: 'Datakwaliteitstests',
          },
          {
            en: 'Documentation and lineage',
            tr: 'Dokümantasyon ve lineage',
            nl: 'Documentatie en lineage',
          },
        ],
      },
      {
        title: { en: 'Advanced Modeling', tr: 'İleri Modelleme', nl: 'Geavanceerd Modelleren' },
        durationHours: 24,
        lessons: [
          {
            en: 'Slowly changing dimensions',
            tr: 'Slowly changing dimensions',
            nl: 'Slowly changing dimensions',
          },
          {
            en: 'Incremental models',
            tr: 'Incremental modeller',
            nl: 'Incrementele modellen',
          },
          { en: 'Performance tuning', tr: 'Performans tuning', nl: 'Performance tuning' },
        ],
      },
    ],
    instructorSlug: 'jonas-weber',
    featured: false,
  },
  {
    slug: 'machine-learning-engineering',
    title: {
      en: 'Machine Learning Engineering',
      tr: 'Makine Öğrenmesi Mühendisliği',
      nl: 'Machine Learning Engineering',
    },
    categorySlug: 'ai-ml',
    level: 'intermediate',
    format: 'online',
    durationWeeks: 14,
    languages: ['English'],
    priceEUR: 3600,
    rating: 4.8,
    studentCount: 287,
    shortDescription: {
      en: 'Learn not just to train models, but to put them into production and monitor them.',
      tr: 'Modelleri sadece eğitmeyi değil, üretime almayı ve izlemeyi öğren.',
      nl: 'Leer modellen niet alleen trainen, maar ook in productie nemen en monitoren.',
    },
    description: {
      en: 'This program covers the transition from a model running in a Jupyter notebook to a production system serving real users. You\u2019ll reinforce model development with PyTorch, experiment tracking with MLflow, model serving, and monitoring through real projects.',
      tr: 'Bu program, Jupyter defterinde çalışan bir modelden gerçek kullanıcılara hizmet veren bir production sistemine geçişi kapsar. PyTorch ile model geliştirme, MLflow ile deney takibi, model serving ve izleme (monitoring) konularını gerçek projelerle pekiştirirsin.',
      nl: 'Dit programma behandelt de overstap van een model dat draait in een Jupyter-notebook naar een productiesysteem dat echte gebruikers bedient. Je verstevigt modelontwikkeling met PyTorch, experiment tracking met MLflow, model serving en monitoring aan de hand van echte projecten.',
    },
    heroImage: 'https://images.unsplash.com/photo-1555255707-c07966088b7b?w=1200&h=675&fit=crop',
    tags: [
      { en: 'PyTorch', tr: 'PyTorch', nl: 'PyTorch' },
      { en: 'MLOps', tr: 'MLOps', nl: 'MLOps' },
      { en: 'Python', tr: 'Python', nl: 'Python' },
      { en: 'Model Serving', tr: 'Model Serving', nl: 'Model Serving' },
    ],
    curriculum: [
      {
        title: {
          en: 'Model Development',
          tr: 'Model Geliştirme',
          nl: 'Modelontwikkeling',
        },
        durationHours: 40,
        lessons: [
          {
            en: 'PyTorch fundamentals',
            tr: 'PyTorch temelleri',
            nl: 'Grondbeginselen van PyTorch',
          },
          { en: 'Feature engineering', tr: 'Özellik mühendisliği', nl: 'Feature engineering' },
          {
            en: 'Model evaluation metrics',
            tr: 'Model değerlendirme metrikleri',
            nl: 'Modelevaluatiemetrieken',
          },
        ],
      },
      {
        title: { en: 'MLOps & Deployment', tr: 'MLOps ve Deploy', nl: 'MLOps & Deployment' },
        durationHours: 35,
        lessons: [
          {
            en: 'Experiment tracking with MLflow',
            tr: 'MLflow ile deney takibi',
            nl: 'Experiment tracking met MLflow',
          },
          {
            en: 'Model serving (FastAPI)',
            tr: 'Model serving (FastAPI)',
            nl: 'Model serving (FastAPI)',
          },
          {
            en: 'Containerization (Docker)',
            tr: 'Konteynerleştirme (Docker)',
            nl: 'Containerisatie (Docker)',
          },
        ],
      },
      {
        title: {
          en: 'Monitoring & Maintenance',
          tr: 'İzleme ve Sürdürme',
          nl: 'Monitoring & Onderhoud',
        },
        durationHours: 25,
        lessons: [
          { en: 'Model drift detection', tr: 'Model drift tespiti', nl: 'Model drift-detectie' },
          { en: 'A/B test design', tr: 'A/B test tasarımı', nl: 'A/B-testontwerp' },
          {
            en: 'Retraining strategies in production',
            tr: 'Üretimde yeniden eğitim stratejileri',
            nl: 'Retraining-strategieën in productie',
          },
        ],
      },
    ],
    instructorSlug: 'priya-nair',
    featured: true,
  },
  {
    slug: 'applied-ai-large-language-models',
    title: {
      en: 'Applied AI & Large Language Models',
      tr: 'Uygulamalı Yapay Zeka ve Büyük Dil Modelleri',
      nl: 'Toegepaste AI & Large Language Models',
    },
    categorySlug: 'ai-ml',
    level: 'advanced',
    format: 'online',
    durationWeeks: 8,
    languages: ['English'],
    priceEUR: 2800,
    rating: 4.7,
    studentCount: 198,
    shortDescription: {
      en: 'Design LLM-based applications: RAG systems, agents, and fine-tuning.',
      tr: 'LLM tabanlı uygulamalar tasarla: RAG sistemleri, ajanlar ve fine-tuning.',
      nl: 'Ontwerp op LLM gebaseerde applicaties: RAG-systemen, agents en fine-tuning.',
    },
    description: {
      en: 'An intensive program that teaches you to integrate large language models into real products. It covers Retrieval-Augmented Generation (RAG) architectures, prompt engineering, fine-tuning open-source models, and managing the cost/performance trade-off.',
      tr: "Büyük dil modellerini gerçek ürünlere entegre etmeyi öğreten yoğun bir program. Retrieval-Augmented Generation (RAG) mimarileri, prompt mühendisliği, açık kaynak modellerin fine-tuning'i ve maliyet/performans dengesini yönetmeyi kapsar.",
      nl: 'Een intensief programma dat je leert grote taalmodellen te integreren in echte producten. Het behandelt Retrieval-Augmented Generation (RAG)-architecturen, prompt engineering, het fine-tunen van open-source modellen en het beheren van de kosten/performance-balans.',
    },
    heroImage: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1200&h=675&fit=crop',
    tags: [
      { en: 'LLM', tr: 'LLM', nl: 'LLM' },
      { en: 'RAG', tr: 'RAG', nl: 'RAG' },
      { en: 'Prompt Engineering', tr: 'Prompt Engineering', nl: 'Prompt Engineering' },
      { en: 'Python', tr: 'Python', nl: 'Python' },
    ],
    curriculum: [
      {
        title: {
          en: 'LLM Fundamentals',
          tr: 'LLM Temelleri',
          nl: 'Grondbeginselen van LLM\u2019s',
        },
        durationHours: 20,
        lessons: [
          {
            en: 'Overview of transformer architecture',
            tr: 'Transformer mimarisine genel bakış',
            nl: 'Overzicht van transformer-architectuur',
          },
          {
            en: 'Prompt engineering techniques',
            tr: 'Prompt mühendisliği teknikleri',
            nl: 'Prompt engineering-technieken',
          },
          {
            en: 'Tokenization and cost management',
            tr: 'Tokenizasyon ve maliyet yönetimi',
            nl: 'Tokenisatie en kostenbeheer',
          },
        ],
      },
      {
        title: { en: 'RAG & Agents', tr: 'RAG ve Ajanlar', nl: 'RAG & Agents' },
        durationHours: 28,
        lessons: [
          { en: 'Vector databases', tr: 'Vektör veritabanları', nl: 'Vectordatabases' },
          { en: 'RAG pipeline design', tr: 'RAG pipeline tasarımı', nl: 'RAG-pipelineontwerp' },
          {
            en: 'Multi-step agent architectures',
            tr: 'Çok adımlı ajan mimarileri',
            nl: 'Multi-step agentarchitecturen',
          },
        ],
      },
    ],
    instructorSlug: 'priya-nair',
    featured: false,
  },
  {
    slug: 'cloud-devops-engineering',
    title: {
      en: 'Cloud & DevOps Engineering',
      tr: 'Bulut ve DevOps Mühendisliği',
      nl: 'Cloud & DevOps Engineering',
    },
    categorySlug: 'cloud-devops',
    level: 'intermediate',
    format: 'hybrid',
    durationWeeks: 12,
    languages: ['English', 'Turkish'],
    priceEUR: 3200,
    rating: 4.8,
    studentCount: 356,
    shortDescription: {
      en: 'Manage infrastructure as code with AWS, Terraform, and CI/CD pipelines.',
      tr: "AWS, Terraform ve CI/CD pipeline'ları ile altyapıyı kod olarak yönet.",
      nl: 'Beheer infrastructuur als code met AWS, Terraform en CI/CD-pipelines.',
    },
    description: {
      en: 'This program aims to guide you from traditional system administration to modern DevOps practices. It offers a hands-on curriculum covering Infrastructure as Code (Terraform), containerization, CI/CD pipeline design, and observability tools.',
      tr: 'Bu program, geleneksel sistem yönetiminden modern DevOps pratiklerine geçişi hedefler. Infrastructure as Code (Terraform), konteynerleştirme, CI/CD pipeline tasarımı ve gözlemlenebilirlik (observability) araçlarını kapsayan uygulamalı bir müfredat sunar.',
      nl: 'Dit programma is erop gericht je te begeleiden van traditioneel systeembeheer naar moderne DevOps-praktijken. Het biedt een praktijkgericht curriculum met Infrastructure as Code (Terraform), containerisatie, CI/CD-pipelineontwerp en observability-tools.',
    },
    heroImage: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=1200&h=675&fit=crop',
    tags: [
      { en: 'AWS', tr: 'AWS', nl: 'AWS' },
      { en: 'Terraform', tr: 'Terraform', nl: 'Terraform' },
      { en: 'CI/CD', tr: 'CI/CD', nl: 'CI/CD' },
      { en: 'Docker', tr: 'Docker', nl: 'Docker' },
    ],
    curriculum: [
      {
        title: { en: 'Cloud Fundamentals', tr: 'Bulut Temelleri', nl: 'Cloud-basis' },
        durationHours: 30,
        lessons: [
          {
            en: 'Core AWS services',
            tr: 'AWS temel servisleri',
            nl: 'Kern AWS-services',
          },
          {
            en: 'Networking and security groups',
            tr: 'Ağ ve güvenlik grupları',
            nl: 'Netwerk- en beveiligingsgroepen',
          },
          {
            en: 'IAM and access management',
            tr: 'IAM ve erişim yönetimi',
            nl: 'IAM en toegangsbeheer',
          },
        ],
      },
      {
        title: {
          en: 'Infrastructure as Code',
          tr: 'Infrastructure as Code',
          nl: 'Infrastructure as Code',
        },
        durationHours: 35,
        lessons: [
          {
            en: 'Defining infrastructure with Terraform',
            tr: 'Terraform ile altyapı tanımlama',
            nl: 'Infrastructuur definiëren met Terraform',
          },
          {
            en: 'Modular Terraform structures',
            tr: 'Modüler Terraform yapıları',
            nl: 'Modulaire Terraform-structuren',
          },
          { en: 'State management', tr: 'State yönetimi', nl: 'State management' },
        ],
      },
      {
        title: {
          en: 'CI/CD & Observability',
          tr: 'CI/CD ve Gözlemlenebilirlik',
          nl: 'CI/CD & Observability',
        },
        durationHours: 30,
        lessons: [
          {
            en: 'Setting up pipelines with GitHub Actions',
            tr: 'GitHub Actions ile pipeline kurulumu',
            nl: 'Pipelines opzetten met GitHub Actions',
          },
          { en: 'Prometheus & Grafana', tr: 'Prometheus & Grafana', nl: 'Prometheus & Grafana' },
          { en: 'Log management', tr: 'Log yönetimi', nl: 'Logbeheer' },
        ],
      },
    ],
    instructorSlug: 'daniel-osei',
    featured: true,
  },
  {
    slug: 'kubernetes-platform-engineering',
    title: {
      en: 'Kubernetes & Platform Engineering',
      tr: 'Kubernetes ve Platform Mühendisliği',
      nl: 'Kubernetes & Platform Engineering',
    },
    categorySlug: 'cloud-devops',
    level: 'advanced',
    format: 'online',
    durationWeeks: 8,
    languages: ['English'],
    priceEUR: 2700,
    rating: 4.6,
    studentCount: 172,
    shortDescription: {
      en: 'Design, operate, and scale Kubernetes clusters; build your own internal platform.',
      tr: 'Kubernetes kümelerini tasarla, işlet ve ölçeklendir; kendi iç platformunu kur.',
      nl: 'Ontwerp, beheer en schaal Kubernetes-clusters; bouw je eigen interne platform.',
    },
    description: {
      en: 'For engineers who want to go deep on container orchestration. You\u2019ll learn Kubernetes cluster architecture, packaging with Helm, GitOps (ArgoCD), and platform engineering practices by applying them on real clusters.',
      tr: 'Konteyner orkestrasyonunda derinleşmek isteyen mühendisler için. Kubernetes küme mimarisi, Helm ile paketleme, GitOps (ArgoCD) ve platform mühendisliği pratiklerini gerçek kümeler üzerinde uygulayarak öğrenirsin.',
      nl: 'Voor engineers die zich willen verdiepen in container-orkestratie. Je leert Kubernetes-clusterarchitectuur, packaging met Helm, GitOps (ArgoCD) en platform engineering-praktijken door ze toe te passen op echte clusters.',
    },
    heroImage:
      'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=1200&h=675&fit=crop&sat=-40',
    tags: [
      { en: 'Kubernetes', tr: 'Kubernetes', nl: 'Kubernetes' },
      { en: 'Helm', tr: 'Helm', nl: 'Helm' },
      { en: 'GitOps', tr: 'GitOps', nl: 'GitOps' },
      { en: 'Platform Engineering', tr: 'Platform Engineering', nl: 'Platform Engineering' },
    ],
    curriculum: [
      {
        title: {
          en: 'Kubernetes in Depth',
          tr: 'Kubernetes Derinlemesine',
          nl: 'Kubernetes in de Diepte',
        },
        durationHours: 30,
        lessons: [
          { en: 'Cluster architecture', tr: 'Küme mimarisi', nl: 'Clusterarchitectuur' },
          { en: 'Workload management', tr: 'Workload yönetimi', nl: 'Workloadbeheer' },
          {
            en: 'Networking and service mesh (Istio)',
            tr: 'Ağ ve servis mesh (Istio)',
            nl: 'Netwerk en service mesh (Istio)',
          },
        ],
      },
      {
        title: {
          en: 'Platform Engineering',
          tr: 'Platform Mühendisliği',
          nl: 'Platform Engineering',
        },
        durationHours: 26,
        lessons: [
          { en: 'Packaging with Helm', tr: 'Helm ile paketleme', nl: 'Packaging met Helm' },
          { en: 'GitOps (ArgoCD)', tr: 'GitOps (ArgoCD)', nl: 'GitOps (ArgoCD)' },
          {
            en: 'Designing your own internal developer platform',
            tr: 'Kendi iç geliştirici platformunu tasarlama',
            nl: 'Je eigen interne developer platform ontwerpen',
          },
        ],
      },
    ],
    instructorSlug: 'daniel-osei',
    featured: false,
  },
  {
    slug: 'cybersecurity-ethical-hacking',
    title: {
      en: 'Cybersecurity & Ethical Hacking',
      tr: 'Siber Güvenlik ve Etik Hacking',
      nl: 'Cybersecurity & Ethical Hacking',
    },
    categorySlug: 'cybersecurity',
    level: 'intermediate',
    format: 'hybrid',
    durationWeeks: 10,
    languages: ['English', 'Turkish'],
    priceEUR: 3000,
    rating: 4.7,
    studentCount: 241,
    shortDescription: {
      en: 'Gain practical skills in penetration testing, security audits, and incident response.',
      tr: 'Sızma testi, güvenlik denetimi ve olay müdahalesi konularında pratik beceriler kazan.',
      nl: 'Doe praktische vaardigheden op in penetratietesten, security-audits en incident response.',
    },
    description: {
      en: 'This program covers both defensive and offensive security. You practice with penetration testing methodologies, web application vulnerabilities (OWASP Top 10), network security, and real incident response scenarios. It closes with a live capture-the-flag event.',
      tr: 'Bu program, savunma ve saldırı güvenliğinin her iki tarafını da kapsar. Sızma testi metodolojileri, web uygulama güvenlik açıkları (OWASP Top 10), ağ güvenliği ve gerçek olay müdahale senaryolarıyla pratik yapılır. Kapanışta canlı bir "capture the flag" etkinliği düzenlenir.',
      nl: 'Dit programma behandelt zowel defensieve als offensieve security. Je oefent met penetratietestmethodologieën, kwetsbaarheden in webapplicaties (OWASP Top 10), netwerkbeveiliging en realistische incident response-scenario\u2019s. Het wordt afgesloten met een live capture-the-flag-evenement.',
    },
    heroImage: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1200&h=675&fit=crop',
    tags: [
      { en: 'Penetration Testing', tr: 'Penetration Testing', nl: 'Penetratietesten' },
      { en: 'OWASP', tr: 'OWASP', nl: 'OWASP' },
      { en: 'Network Security', tr: 'Network Security', nl: 'Netwerkbeveiliging' },
    ],
    curriculum: [
      {
        title: { en: 'Security Fundamentals', tr: 'Güvenlik Temelleri', nl: 'Security-basis' },
        durationHours: 28,
        lessons: [
          { en: 'Threat modeling', tr: 'Tehdit modelleme', nl: 'Threat modeling' },
          {
            en: 'Network security fundamentals',
            tr: 'Ağ güvenliği temelleri',
            nl: 'Grondbeginselen van netwerkbeveiliging',
          },
          {
            en: 'Introduction to cryptography',
            tr: 'Kriptografiye giriş',
            nl: 'Introductie tot cryptografie',
          },
        ],
      },
      {
        title: { en: 'Penetration Testing', tr: 'Sızma Testi', nl: 'Penetratietesten' },
        durationHours: 32,
        lessons: [
          { en: 'OWASP Top 10', tr: 'OWASP Top 10', nl: 'OWASP Top 10' },
          {
            en: 'Web application penetration testing',
            tr: 'Web uygulama sızma testi',
            nl: 'Penetratietesten van webapplicaties',
          },
          {
            en: 'Reporting and responsible disclosure',
            tr: 'Raporlama ve sorumlu ifşa',
            nl: 'Rapportage en responsible disclosure',
          },
        ],
      },
      {
        title: { en: 'Incident Response', tr: 'Olay Müdahale', nl: 'Incident Response' },
        durationHours: 20,
        lessons: [
          {
            en: 'Incident response process',
            tr: 'Olay müdahale süreci',
            nl: 'Incident response-proces',
          },
          {
            en: 'Digital forensics fundamentals',
            tr: 'Adli bilişim temelleri',
            nl: 'Grondbeginselen van digitale forensics',
          },
          {
            en: 'Capture the flag event',
            tr: 'Capture the flag etkinliği',
            nl: 'Capture the flag-evenement',
          },
        ],
      },
    ],
    instructorSlug: 'marcus-lindqvist',
    featured: false,
  },
  {
    slug: 'mobile-app-development-react-native',
    title: {
      en: 'Mobile App Development with React Native',
      tr: 'React Native ile Mobil Uygulama Geliştirme',
      nl: 'Mobiele App-ontwikkeling met React Native',
    },
    categorySlug: 'mobile-dev',
    level: 'beginner',
    format: 'online',
    durationWeeks: 10,
    languages: ['English'],
    priceEUR: 2500,
    rating: 4.6,
    studentCount: 203,
    shortDescription: {
      en: 'Build native-performance apps for iOS and Android from a single codebase.',
      tr: 'iOS ve Android için tek kod tabanından native performanslı uygulamalar geliştir.',
      nl: 'Bouw apps met native performance voor iOS en Android vanuit één codebase.',
    },
    description: {
      en: 'A comprehensive program that teaches you to publish apps to the App Store and Google Play with React Native, starting from scratch. It covers native modules, push notifications, offline data sync, and performance optimization.',
      tr: "React Native ile sıfırdan App Store ve Google Play'e uygulama yayınlamayı öğreten kapsamlı bir program. Native modüller, push bildirimleri, offline veri senkronizasyonu ve performans optimizasyonu konularını kapsar.",
      nl: 'Een uitgebreid programma dat je vanaf nul leert apps te publiceren op de App Store en Google Play met React Native. Het behandelt native modules, pushmeldingen, offline datasynchronisatie en performance-optimalisatie.',
    },
    heroImage: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1200&h=675&fit=crop',
    tags: [
      { en: 'React Native', tr: 'React Native', nl: 'React Native' },
      { en: 'iOS', tr: 'iOS', nl: 'iOS' },
      { en: 'Android', tr: 'Android', nl: 'Android' },
      { en: 'TypeScript', tr: 'TypeScript', nl: 'TypeScript' },
    ],
    curriculum: [
      {
        title: {
          en: 'React Native Fundamentals',
          tr: 'React Native Temelleri',
          nl: 'Grondbeginselen van React Native',
        },
        durationHours: 30,
        lessons: [
          {
            en: 'Component and navigation structures',
            tr: 'Komponent ve navigasyon yapıları',
            nl: 'Component- en navigatiestructuren',
          },
          {
            en: 'Introduction to native modules',
            tr: 'Native modüllere giriş',
            nl: 'Introductie tot native modules',
          },
          {
            en: 'Platform-specific styling',
            tr: 'Platform bazlı stil yönetimi',
            nl: 'Platformspecifieke styling',
          },
        ],
      },
      {
        title: { en: 'Advanced Features', tr: 'İleri Özellikler', nl: 'Geavanceerde Features' },
        durationHours: 28,
        lessons: [
          { en: 'Push notifications', tr: 'Push bildirimleri', nl: 'Pushmeldingen' },
          {
            en: 'Offline data sync',
            tr: 'Offline veri senkronizasyonu',
            nl: 'Offline datasynchronisatie',
          },
          { en: 'Performance profiling', tr: 'Performans profilleme', nl: 'Performance profiling' },
        ],
      },
      {
        title: { en: 'Publishing', tr: 'Yayınlama', nl: 'Publiceren' },
        durationHours: 16,
        lessons: [
          {
            en: 'App Store & Google Play processes',
            tr: 'App Store & Google Play süreçleri',
            nl: 'App Store & Google Play-processen',
          },
          {
            en: 'OTA updates with CodePush',
            tr: 'CodePush ile OTA güncellemeler',
            nl: 'OTA-updates met CodePush',
          },
        ],
      },
    ],
    instructorSlug: 'sofia-alvarez',
    featured: false,
  },
  {
    slug: 'data-analytics-business-intelligence',
    title: {
      en: 'Data Analytics & Business Intelligence',
      tr: 'Veri Analitiği ve İş Zekası',
      nl: 'Data-analyse & Business Intelligence',
    },
    categorySlug: 'data-analytics',
    level: 'beginner',
    format: 'online',
    durationWeeks: 8,
    languages: ['English', 'Turkish'],
    priceEUR: 2100,
    rating: 4.5,
    studentCount: 276,
    shortDescription: {
      en: 'Learn the path from data to business decisions with SQL, Python, and BI tools.',
      tr: 'SQL, Python ve BI araçlarıyla veriden iş kararlarına giden yolu öğren.',
      nl: 'Leer de weg van data naar bedrijfsbeslissingen met SQL, Python en BI-tools.',
    },
    description: {
      en: 'Designed for those looking to break into business intelligence and data analytics, this program teaches you to analyze, visualize, and present datasets to stakeholders using SQL, Python (pandas), and Power BI / Tableau.',
      tr: 'İş zekası ve veri analitiği alanına giriş yapmak isteyenler için tasarlanmış bu program; SQL, Python (pandas) ve Power BI / Tableau kullanarak veri setlerini analiz etmeyi, görselleştirmeyi ve paydaşlara sunmayı öğretir.',
      nl: 'Ontworpen voor wie wil instromen in business intelligence en data-analyse; dit programma leert je datasets analyseren, visualiseren en presenteren aan stakeholders met SQL, Python (pandas) en Power BI / Tableau.',
    },
    heroImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=675&fit=crop',
    tags: [
      { en: 'SQL', tr: 'SQL', nl: 'SQL' },
      { en: 'Python', tr: 'Python', nl: 'Python' },
      { en: 'Power BI', tr: 'Power BI', nl: 'Power BI' },
      { en: 'Tableau', tr: 'Tableau', nl: 'Tableau' },
    ],
    curriculum: [
      {
        title: {
          en: 'Data Analysis Fundamentals',
          tr: 'Veri Analizi Temelleri',
          nl: 'Grondbeginselen van Data-analyse',
        },
        durationHours: 24,
        lessons: [
          {
            en: 'Querying data with SQL',
            tr: 'SQL ile veri sorgulama',
            nl: 'Data bevragen met SQL',
          },
          {
            en: 'Data cleaning with Python (pandas)',
            tr: 'Python (pandas) ile veri temizleme',
            nl: 'Data opschonen met Python (pandas)',
          },
          {
            en: 'Statistics fundamentals',
            tr: 'İstatistik temelleri',
            nl: 'Grondbeginselen van statistiek',
          },
        ],
      },
      {
        title: {
          en: 'Visualization & Presentation',
          tr: 'Görselleştirme ve Sunum',
          nl: 'Visualisatie & Presentatie',
        },
        durationHours: 22,
        lessons: [
          {
            en: 'Dashboard design with Power BI',
            tr: 'Power BI ile dashboard tasarımı',
            nl: 'Dashboardontwerp met Power BI',
          },
          {
            en: 'Tableau fundamentals',
            tr: 'Tableau temelleri',
            nl: 'Grondbeginselen van Tableau',
          },
          {
            en: 'Data storytelling',
            tr: 'Veri hikayeleştirme (storytelling)',
            nl: 'Data storytelling',
          },
        ],
      },
    ],
    instructorSlug: 'jonas-weber',
    featured: false,
  },
];

function resolveText(text: LocalizedText, locale: Locale): string {
  return text[locale] ?? text.en;
}

function resolveModule(module: CurriculumModuleRaw, locale: Locale): CurriculumModule {
  return {
    title: resolveText(module.title, locale),
    durationHours: module.durationHours,
    lessons: module.lessons.map((lesson) => resolveText(lesson, locale)),
  };
}

function resolveBootcamp(raw: BootcampRaw, locale: Locale): Bootcamp {
  return {
    slug: raw.slug,
    title: resolveText(raw.title, locale),
    categorySlug: raw.categorySlug,
    level: raw.level,
    format: raw.format,
    durationWeeks: raw.durationWeeks,
    languages: raw.languages,
    priceEUR: raw.priceEUR,
    rating: raw.rating,
    studentCount: raw.studentCount,
    shortDescription: resolveText(raw.shortDescription, locale),
    description: resolveText(raw.description, locale),
    heroImage: raw.heroImage,
    tags: raw.tags.map((tag) => resolveText(tag, locale)),
    curriculum: raw.curriculum.map((module) => resolveModule(module, locale)),
    instructorSlug: raw.instructorSlug,
    featured: raw.featured,
  };
}

/** Verilen dile göre çözülmüş (düz string) bootcamp listesini döndürür. */
export function getBootcamps(locale: Locale): Bootcamp[] {
  return bootcampsRaw.map((raw) => resolveBootcamp(raw, locale));
}

/** Verilen dilde, tek bir bootcamp'i slug'a göre bulur. */
export function getBootcampBySlug(locale: Locale, slug: string): Bootcamp | undefined {
  const raw = bootcampsRaw.find((b) => b.slug === slug);
  return raw ? resolveBootcamp(raw, locale) : undefined;
}

/** Sadece slug listesi gerektiğinde (örn. generateStaticParams, sitemap). */
export const bootcampSlugs: string[] = bootcampsRaw.map((b) => b.slug);
