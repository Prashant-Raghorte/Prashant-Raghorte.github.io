import type { Education, Experience, Project, SkillCategory } from '@/types'

export const experiences: Experience[] = [
  {
    id: '1',
    company: 'Infidigit',
    companyUrl: 'https://www.infidigit.com',
    role: 'SDE I — Backend',
    location: 'Mumbai, India',
    period: 'Nov 2024 – Present',
    isCurrent: true,
    highlights: [
      'Engineered scalable RESTful APIs using Django REST Framework (DRF) for SEO modules including Rank Tracker, Keyword Research, SEO Audit, Workspace, AI Overview, AI Insights, and SEO Forecasting.',
      'Integrated LLMs (OpenAI GPT, Claude, and Gemini) to enable AI-powered title generation, meta description generation, and automated keyword research, significantly reducing manual content creation effort.',
      'Optimized Elasticsearch indexing and search algorithms to deliver high-performance, real-time keyword analytics across large-scale datasets.',
      'Implemented Microsoft OAuth 2.0 Single Sign-On (SSO) for secure enterprise authentication and authorization.',
      'Configured multi-database architecture (PostgreSQL and MSSQL) within a Django application to support seamless cross-system data operations.',
      'Architected cross-repository Django ORM model sharing and integrated Django models into FastAPI microservices, improving modularity and code reuse.',
      'Strengthened backend security by validating and restricting external URL access, reducing the risk of unauthorized database access and malicious requests.',
    ],
  },
  {
    id: '2',
    company: 'Crossdev Technologies (Gloify)',
    companyUrl: 'https://www.gloify.com',
    role: 'Software Developer',
    location: 'Bengaluru, India',
    period: 'Jan 2023 – Oct 2024',
    highlights: [
      'Designed and developed scalable RESTful APIs using Django REST Framework (DRF), implementing JWT authentication and Role-Based Access Control (RBAC) for 18+ user roles.',
      'Integrated Stripe Payment Gateway for international payments and Zoho Bigin CRM using REST APIs and webhooks to automate real-time lead management.',
      'Integrated Gmail API to automate email workflows, campaign scheduling, and domain/email verification.',
      'Architected asynchronous task pipelines using Celery and Redis, improving background job execution and application scalability.',
      'Integrated AWS services including S3, SES, and SNS to support secure file storage, transactional emails, and event-driven notifications.',
      'Implemented multilingual support using DRF Localization and integrated exchange rate APIs to enable seamless internationalization.',
    ],
  },
  {
    id: '3',
    company: 'Percept Infosystem',
    companyUrl: 'https://perceptinfosystems.lovable.app/',
    role: 'Python/Django Intern',
    location: 'Nagpur, India',
    period: 'Jul 2022 – Dec 2022',
    highlights: [
      'Built and maintained Django web applications using MVT architecture, leveraging Django ORM, class-based views (CBVs), and template rendering.',
      'Designed relational database schemas using PostgreSQL and SQLite, writing optimized queries to ensure data integrity and efficient performance.',
      'Developed dynamic, data-driven web pages using Django templates, forms, and ORM, building a strong foundation in Python web application development.',
    ],
  },
]

export const experienceDomains = [
  {
    id: 'apis',
    title: 'REST APIs & DRF',
    description:
      'Production APIs with JWT, RBAC across 18+ roles, OAuth 2.0 SSO, and secure enterprise authentication.',
    metric: '25+ total modules',
  },
  {
    id: 'ai',
    title: 'AI & LLM Integration',
    description:
      'OpenAI, Claude, and Gemini for AI-powered content, keyword research, and automated SEO workflows.',
    metric: 'Live in production',
  },
  {
    id: 'async',
    title: 'Async & Scale',
    description:
      'Celery and Redis pipelines, Elasticsearch indexing, and multi-database architecture for high-throughput systems.',
    metric: 'PostgreSQL + MSSQL',
  },
  {
    id: 'integrations',
    title: 'Cloud & Integrations',
    description:
      'AWS (S3, SES, SNS), Stripe payments, Zoho CRM, Gmail API, and webhook-driven automation.',
    metric: 'End-to-end delivery',
  },
] as const

export const experienceKeyWins = [
  {
    id: 'llm',
    value: '3',
    label: 'LLM providers',
    detail: 'GPT, Claude & Gemini in production',
  },
  {
    id: 'rbac',
    value: '18+',
    label: 'RBAC roles',
    detail: 'JWT auth across user tiers',
  },
  {
    id: 'modules',
    value: '25+',
    label: 'Total modules',
    detail: 'Shipped across production platforms',
  },
  {
    id: 'integrations',
    value: '10+',
    label: 'Integrations',
    detail: 'Stripe, AWS, CRM & Gmail API',
  },
] as const

export const educationList: Education[] = [
  {
    id: 'degree',
    institution: 'Sant Gadge Baba Amravati University',
    degree: 'B.E. in Computer Science and Engineering',
    period: '2016 – 2020',
    details:
      'Bachelor of Engineering in Computer Science and Engineering from Sant Gadge Baba Amravati University, Amravati, Maharashtra.',
  },
]

export const SKILL_CATEGORY_ORDER = [
  'backend',
  'frontend',
  'databases',
  'devops',
  'dev-tools',
  'ai-tools',
] as const

export type SkillCategoryId = (typeof SKILL_CATEGORY_ORDER)[number]

export const skillCategories: SkillCategory[] = [
  {
    id: 'backend',
    title: 'Backend',
    skills: [
      'Python',
      'Django',
      'Django REST Framework',
      'REST APIs',
      'FastAPI',
      'Django WebSockets',
      'OAuth 2.0',
      'JWT',
      'RBAC',
      'API Security',
    ],
  },
  {
    id: 'frontend',
    title: 'Frontend',
    skills: ['HTML', 'CSS', 'Bootstrap'],
  },
  {
    id: 'databases',
    title: 'Databases',
    skills: ['PostgreSQL', 'MSSQL', 'SQLite', 'Elasticsearch', 'Redis'],
  },
  {
    id: 'devops',
    title: 'Cloud & Async',
    skills: ['AWS', 'Celery', 'Linux', 'Windows'],
  },
  {
    id: 'dev-tools',
    title: 'Integrations & Tools',
    skills: [
      'Cursor',
      'Stripe',
      'Zoho CRM',
      'Gmail API',
      'Git',
      'GitHub',
      'Postman',
      'DRF Localization',
      'Resend',
    ],
  },
  {
    id: 'ai-tools',
    title: 'AI / LLM',
    skills: ['OpenAI API', 'Claude API', 'Gemini API'],
  },
]

export const projects: Project[] = [
  {
    id: '1',
    title: 'Infigrowth',
    description:
      'AI-powered SEO SaaS platform with rank tracking, keyword research, LLM-driven title and meta description generation, and automated SEO audit reporting for digital marketers.',
    tags: ['Python', 'Django', 'DRF', 'Rest API', 'PostgreSQL', 'MSSQL', 'Elasticsearch', 'FastAPI', 'OpenAI API', 'Claude API', 'Gemini API'],
    url: 'https://app.infigrowth.com/',
    logoUrl: 'https://infigrowth.com/favicon.ico',
  },
  {
    id: '2',
    title: 'Discovemail',
    description:
      'Lead generation platform with LinkedIn scraping, email/domain verification, campaign scheduling, and Stripe-powered billing. Reduced outreach setup time through end-to-end automation.',
    tags: ['Python', 'Django', 'DRF', 'Celery', 'Redis', 'S3 Bucket', 'AWS SNS', 'AWS SES', 'Stripe', 'Gmail API'],
    url: 'https://www.discovemail.com/',
    logoUrl: 'https://www.discovemail.com/favicon.ico',
  },
  {
    id: '3',
    title: 'Ciao Green',
    description:
      'Enterprise interior design management system supporting 18+ user roles with RBAC, lead/project management, vendor coordination, asset tracking, BOQ generation, and Zoho CRM integration.',
    tags: ['Python', 'Django', 'DRF', 'PostgreSQL', 'Zoho CRM', 'Webhooks'],
    url: 'https://myspace.ciaogreen.com/',
    logoUrl: '/project-logos/ciao-green.png',
  },
  {
    id: '4',
    title: 'Rapid One',
    description:
      'Workplace health and safety (WHS) and HR compliance platform with digital document workflows, AI-assisted safety audits, background verification, and real-time compliance tracking.',
    tags: ['Python', 'Django', 'DRF', 'AWS', 'Celery', 'Redis'],
    url: 'https://app.rapid.one/',
    logoUrl: '/project-logos/rapid-one.svg',
  },
  {
    id: '5',
    title: 'Apna Naukari',
    description:
      'Role-based job search and recruitment portal for job seekers and employers with JWT auth, job listings, applicant management, and AWS-integrated storage and email.',
    tags: ['Python', 'Django', 'DRF', 'PostgreSQL', 'AWS', 'JWT'],
  },
  {
    id: '6',
    title: 'Developer Portfolio',
    description:
      'A multi-page portfolio built with React, TypeScript, and Vite — featuring dark and light themes, animated UI, a project showcase, experience timeline, contact form, and GitHub Pages deployment with SPA routing.',
    tags: ['React', 'TypeScript', 'Vite', 'GitHub Actions', 'Cursor'],
    repoUrl: 'https://github.com/Prashant-Raghorte/Prashant-Raghorte.github.io',
    url: 'https://prashant-raghorte.github.io',
    logoUrl: '/favicon.svg',
  },
]
