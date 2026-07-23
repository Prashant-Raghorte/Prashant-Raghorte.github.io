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
    id: 'hsc',
    institution:
      'Adarsha Science, Jairamdas Bhagchand Arts & Birla Commerce College',
    degree: 'Higher Secondary Certificate (12th)',
    period: '2014 – 2016',
    level: 'Higher Secondary',
    credentialCode: 'HSC',
    startYear: 2014,
    endYear: 2016,
    stream: 'Science',
    location: 'Dhamangaon Railway, Amravati, Maharashtra',
    board: 'MSBSHSE — Maharashtra State Board',
    highlight:
      'Science-stream foundation in physics, chemistry, and mathematics that prepared me for engineering.',
    focus: ['Physics', 'Chemistry', 'Mathematics'],
  },
  {
    id: 'degree',
    institution:
      "Dhamangaon Education Society's College of Engineering and Technology",
    degree: 'B.E. Computer Science and Engineering',
    period: '2016 – 2020',
    level: 'Undergraduate',
    credentialCode: 'B.E.',
    startYear: 2016,
    endYear: 2020,
    stream: 'Computer Science & Engineering',
    location: 'Dhamangaon Railway, Amravati, Maharashtra',
    affiliation: 'Sant Gadge Baba Amravati University',
    highlight:
      'Four-year engineering degree rooted locally, building software fundamentals and computing systems.',
    focus: ['Data structures', 'Software engineering', 'OOPs', 'Databases'],
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
    domain: 'SEO intelligence',
    description:
      'AI-powered SEO SaaS platform built for digital marketers and SEO teams — covering rank tracking, keyword research, competitor analysis, and automated audit reporting. Integrates LLM-driven title, meta description, and keyword generation using GPT, Claude, and Gemini. Delivers real-time keyword analytics through Elasticsearch with enterprise auth, workspace management, and multi-database support. Production modules span Rank Tracker, Keyword Research, SEO Audit, AI Overview, and forecasting dashboards used by marketing teams daily.',
    catalogSummary:
      'End-to-end SEO modules spanning rank tracking, keyword research, AI Overview, and forecasting — backed by Elasticsearch analytics, FastAPI microservices, and enterprise SSO across PostgreSQL and MSSQL.',
    spotlightQuote:
      'An AI-powered SEO intelligence platform — rank tracking, keyword research, and LLM-driven content generation shipped as a production Django backend with Elasticsearch analytics at enterprise scale.',
    modules: [
      'Rank Tracker',
      'Keyword Research',
      'SEO Audit',
      'AI Overview',
      'Forecasting',
      'Competitor Analysis',
      'LLM Content Generation',
      'Workspace Management',
      'Analytics Reporting',
    ],
    deliverySnapshot: {
      integrations: 5,
      dataStores: 3,
      aiIntegrations: 3,
    },
    tags: ['Python', 'Django', 'DRF', 'Rest API', 'PostgreSQL', 'MSSQL', 'Elasticsearch', 'FastAPI', 'OpenAI API', 'Claude API', 'Gemini API', 'Windows','Git', 'GitHub', 'Postman'],
    highlights: [
      'LLM-driven SEO content with GPT, Claude & Gemini',
      'Elasticsearch keyword analytics at scale',
      'Multi-database architecture (PostgreSQL + MSSQL)',
      'OAuth 2.0 SSO and RBAC for enterprise teams',
      'Rank Tracker, Keyword Research & SEO Audit modules',
      'FastAPI microservices alongside Django monolith',
    ],
    url: 'https://app.infigrowth.com/',
    logoUrl: 'https://infigrowth.com/favicon.ico',
  },
  {
    id: '2',
    title: 'Discovemail',
    domain: 'Email outreach',
    description:
      'Lead generation and email outreach platform that automates prospecting from LinkedIn scraping through verified contact delivery. Supports email and domain verification, drip campaign scheduling, list segmentation, and Stripe-powered subscription billing. Built with Celery and Redis for high-volume background jobs and AWS for storage, email, and event notifications. Teams use it to source leads, validate inboxes, launch Gmail campaigns, and track outreach performance end to end.',
    catalogSummary:
      'Outreach automation from LinkedIn lead capture through domain verification, Gmail campaign scheduling, and Stripe billing — with Celery pipelines and AWS notifications handling scale.',
    spotlightQuote:
      'A lead generation and outreach engine — from LinkedIn scraping and email verification through Gmail campaign automation and Stripe billing, orchestrated with Celery pipelines for production throughput.',
    modules: [
      'LinkedIn Lead Scraper',
      'Email Verification',
      'Domain Verification',
      'Campaign Scheduler',
      'List Segmentation',
      'Stripe Billing',
      'Gmail Outreach',
    ],
    deliverySnapshot: {
      integrations: 7,
      dataStores: 3,
      aiIntegrations: 0,
    },
    tags: ['Python', 'Django', 'DRF', 'Rest API', 'PostgreSQL', 'Celery', 'Redis', 'S3 Bucket', 'AWS SNS', 'AWS SES', 'Stripe', 'Gmail API', 'Git', 'GitHub', 'Postman', 'Linux'],
    highlights: [
      'LinkedIn scraping with email & domain verification',
      'Stripe billing and Gmail campaign automation',
      'Celery & Redis pipelines for outreach at scale',
      'AWS S3, SES & SNS for storage and notifications',
      'Campaign scheduling with list segmentation',
      'RBAC with JWT across multi-tier outreach teams',
    ],
    url: 'https://www.discovemail.com/',
    logoUrl: 'https://www.discovemail.com/favicon.ico',
  },
  {
    id: '3',
    title: 'Ciao Green',
    domain: 'Interior design',
    description:
      'Enterprise interior design operations platform for managing the full project lifecycle — from lead intake and client onboarding through vendor coordination, asset tracking, and BOQ generation. Supports 18+ user roles with granular RBAC, Zoho CRM sync via webhooks, and AWS-backed document storage with transactional notifications across distributed teams. Designers, vendors, and operations staff collaborate on leads, quotations, assets, and delivery milestones in one workspace.',
    catalogSummary:
      'Enterprise operations hub for interior design teams — coordinating leads, vendors, assets, and BOQ workflows with Zoho CRM webhooks and AWS-backed file storage.',
    spotlightQuote:
      'An enterprise interior design operations platform — RBAC across 18+ roles, lead and vendor management, BOQ generation, and Zoho CRM sync delivered as a unified Django backend.',
    modules: [
      'Lead Management',
      'Client Onboarding',
      'Vendor Coordination',
      'Asset Tracking',
      'BOQ Generation',
      'Zoho CRM Sync',
      'Project Lifecycle',
      'Quotations',
    ],
    deliverySnapshot: {
      integrations: 5,
      dataStores: 2,
      aiIntegrations: 0,
    },
    tags: ['Python', 'Django', 'DRF', 'Rest API', 'PostgreSQL', 'Zoho CRM', 'Webhooks', 'S3 Bucket', 'AWS SNS', 'AWS SES', 'JWT', 'OAuth 2.0', 'RBAC', 'Git', 'GitHub', 'Postman'],
    highlights: [
      'RBAC across 18+ enterprise user roles',
      'Zoho CRM sync with webhook-driven workflows',
      'Lead, vendor, asset & BOQ management',
      'AWS S3 asset storage with SNS notifications',
      'Project lifecycle from lead intake to delivery',
      'BOQ generation and vendor coordination workflows',
    ],
    url: 'https://myspace.ciaogreen.com/',
    logoUrl: '/project-logos/ciao-green.png',
  },
  {
    id: '4',
    title: 'Rapid One',
    domain: 'Compliance',
    description:
      'Workplace health, safety, and HR compliance platform for regulated enterprises — digitizing document workflows, safety audits, and employee verification. Features AI-assisted WHS audits, background checks, policy tracking, and real-time compliance dashboards. Async Celery pipelines handle document processing and verification at scale with role-based access for auditors, HR teams, and administrators. Built to replace paper-heavy compliance with traceable digital workflows.',
    catalogSummary:
      'Regulated workplace compliance delivered through digital document flows, AI-assisted safety audits, background checks, and Celery-driven verification pipelines.',
    spotlightQuote:
      'A workplace health, safety, and HR compliance platform — digital document workflows, AI-assisted safety audits, and real-time verification tracking built for regulated enterprise environments.',
    modules: [
      'Document Workflows',
      'WHS Audits',
      'Background Checks',
      'Policy Tracking',
      'Compliance Dashboard',
      'Verification Pipeline',
    ],
    deliverySnapshot: {
      integrations: 2,
      dataStores: 2,
      aiIntegrations: 0,
    },
    tags: ['Python', 'Django', 'DRF', 'Rest API', 'PostgreSQL', 'Celery', 'Redis', 'JWT', 'OAuth 2.0', 'RBAC', 'Git', 'GitHub', 'Postman'],
    highlights: [
      'WHS & HR compliance digital workflows',
      'AI-assisted workplace safety audits',
      'Real-time compliance and verification tracking',
      'Background verification and document workflows',
      'Policy management with audit trail logging',
      'Celery pipelines for async document processing',
    ],
    url: 'https://app.rapid.one/',
    logoUrl: '/project-logos/rapid-one.svg',
  },
  {
    id: '5',
    title: 'Apna Naukari',
    domain: 'Recruitment',
    description:
      'Dual-sided recruitment portal connecting job seekers and employers on a single platform — with JWT-secured authentication, role-based applicant management, and searchable job listings. Supports resume uploads, application tracking, employer dashboards, and AWS-integrated file storage with transactional email. Multilingual support via DRF localization enables regional hiring workflows across employer and candidate journeys.',
    catalogSummary:
      'Dual-sided hiring platform connecting employers and job seekers with role-based applicant pipelines, AWS storage, transactional email, and multilingual DRF localization.',
    spotlightQuote:
      'A dual-sided recruitment platform — connecting job seekers and employers through JWT-secured APIs, applicant management pipelines, AWS-backed storage and transactional email, and multilingual support via DRF localization.',
    modules: [
      'Job Listings',
      'Applicant Management',
      'Employer Dashboard',
      'Resume Upload',
      'Application Tracking',
    ],
    deliverySnapshot: {
      integrations: 1,
      dataStores: 1,
      aiIntegrations: 0,
    },
    tags: ['Python', 'Django', 'DRF', 'Rest API', 'PostgreSQL', 'AWS', 'JWT', 'RBAC', 'DRF Localization', 'Git', 'GitHub', 'Postman'],
    highlights: [
      'Dual-sided portal for job seekers and employers',
      'JWT auth with role-based applicant management',
      'AWS-backed storage and transactional email',
      'Multilingual support via DRF localization',
      'Resume upload with application tracking pipelines',
      'Employer dashboards with searchable job listings',
    ],
  },
  {
    id: '6',
    title: 'Developer Portfolio',
    domain: 'Engineering portfolio',
    description:
      'Personal engineering portfolio showcasing production SaaS backends and full-stack craft — built with React, TypeScript, and Vite. Features animated project showcases, an interactive experience timeline, skills constellation, dual light and dark themes, and a contact form. Deployed to GitHub Pages with client-side routing, automated CI/CD via GitHub Actions, and SEO-optimized meta tags across every route. Designed as a living product surface that mirrors the same polish applied to client-facing SaaS work.',
    catalogSummary:
      'Personal engineering site showcasing production SaaS work — React and TypeScript on Vite with animated sections, dual themes, contact workflows, and GitHub Actions CI/CD to GitHub Pages.',
    spotlightQuote:
      'A personal engineering portfolio — React and TypeScript on Vite with animated project showcases, an experience timeline, dual light and dark themes, a contact form, and GitHub Pages deployment with client-side routing and automated CI/CD.',
    modules: [
      'Project Showcase',
      'Experience Timeline',
      'Skills Constellation',
      'Contact Form',
      'Theme System',
      'SEO & Routing',
    ],
    deliverySnapshot: {
      integrations: 1,
      dataStores: 0,
      aiIntegrations: 0,
    },
    tags: ['React', 'TypeScript', 'Vite', 'GitHub Actions', 'Cursor', 'Git', 'GitHub'],
    highlights: [
      'Multi-theme React + TypeScript SPA',
      'Animated project showcase and experience timeline',
      'GitHub Pages deploy with client-side routing',
      'Contact form with GitHub Actions CI/CD deploy',
      'Skills constellation and product orbit interactions',
      'SEO-optimized meta tags across all routes',
    ],
    repoUrl: 'https://github.com/Prashant-Raghorte/Prashant-Raghorte.github.io',
    url: 'https://prashant-raghorte.github.io',
    logoUrl: '/project-logos/developer-portfolio.svg',
  },
]
