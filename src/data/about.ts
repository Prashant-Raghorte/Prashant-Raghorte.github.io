export const aboutBioParagraphs = [
  'I am Prashant Raghorte, a results-driven Software Development Engineer focused on backend systems. I build and scale high-performance web applications using Python, Django, and Django REST Framework — with a strong emphasis on clean code, API security, and scalable architecture.',
  'Over 3.5+ years, I have shipped RESTful APIs, asynchronous pipelines with Celery and Redis, multi-database setups across PostgreSQL and MSSQL, and LLM integrations (Claude, Gemini, OpenAI) for AI-powered content and keyword workflows. I also work with OAuth 2.0, JWT, Elasticsearch, AWS (S3, SES, SNS), and integrations like Stripe, Zoho CRM, and Gmail API.',
  'I am open to full-time roles and freelance collaborations where I can contribute as a backend engineer — designing reliable APIs, improving system performance, and delivering production-ready features end to end.',
] as const

/** Focus labels used across the site (experience hero tech stack, etc.). */
export const aboutFocusAreas = [
  'Python & Django',
  'REST APIs & DRF',
  'LLM Integration',
  'Celery & Redis',
  'PostgreSQL & Elasticsearch',
  'API Security',
] as const

/**
 * Enriched focus entries for the About focus instrument.
 * Codes/details map 1:1 to real stack from bio + shipped work.
 * toneKey maps to --focus-tone-* theme variables.
 */
export const aboutFocusProfiles = [
  {
    label: 'Python & Django',
    code: 'PY',
    toneKey: 'py',
    lane: 'Core',
    method: 'BUILD',
    route: '/backend/django',
    detail:
      'High-performance Django backends with clean architecture, MVT patterns, and scalable ORM-driven systems built for production.',
    chips: ['Python', 'Django', 'ORM'],
    status: 'Live',
  },
  {
    label: 'REST APIs & DRF',
    code: 'API',
    toneKey: 'api',
    lane: 'Ship',
    method: 'GET',
    route: '/api/v1',
    detail:
      'Production DRF APIs with JWT auth, RBAC across 18+ roles, OAuth 2.0 SSO, and secure enterprise-ready endpoints.',
    chips: ['JWT', 'RBAC', 'OAuth 2.0'],
    status: '200 OK',
  },
  {
    label: 'LLM Integration',
    code: 'LLM',
    toneKey: 'llm',
    lane: 'AI',
    method: 'POST',
    route: '/ai/generate',
    detail:
      'Claude, Gemini, and OpenAI wired into live SEO workflows for titles, meta, and automated keyword research.',
    chips: ['OpenAI', 'Claude', 'Gemini'],
    status: 'Live',
  },
  {
    label: 'Celery & Redis',
    code: 'ASYNC',
    toneKey: 'async',
    lane: 'Scale',
    method: 'QUEUE',
    route: '/tasks/async',
    detail:
      'Async Celery and Redis pipelines for high-volume background jobs, outreach automation, and scalable task execution.',
    chips: ['Celery', 'Redis'],
    status: 'Running',
  },
  {
    label: 'PostgreSQL & Elasticsearch',
    code: 'DATA',
    toneKey: 'data',
    lane: 'Store',
    method: 'QUERY',
    route: '/data/search',
    detail:
      'Multi-database setups across PostgreSQL and MSSQL with Elasticsearch for real-time keyword analytics at scale.',
    chips: ['PostgreSQL', 'MSSQL', 'ES'],
    status: 'Indexed',
  },
  {
    label: 'API Security',
    code: 'SEC',
    toneKey: 'sec',
    lane: 'Trust',
    method: 'AUTH',
    route: '/auth/secure',
    detail:
      'OAuth 2.0 SSO, JWT authentication, and secure API design across enterprise roles and production platforms.',
    chips: ['OAuth 2.0', 'JWT', 'SSO'],
    status: 'Secured',
  },
] as const

/** Compact ship-proof metrics for the focus card (from bio + portfolio wins). */
export const aboutFocusProof = [
  { value: '3.5+', label: 'Years' },
  { value: '25+', label: 'Modules' },
  { value: '18+', label: 'RBAC roles' },
  { value: '3', label: 'LLMs live' },
] as const

export const aboutAvailability = [
  'Full-time roles',
  'Freelance projects',
  'Remote opportunities',
] as const

export const aboutAvailabilityShort = [
  { label: 'Full-time roles', short: 'Full-time' },
  { label: 'Freelance projects', short: 'Freelance' },
  { label: 'Remote opportunities', short: 'Remote' },
] as const
