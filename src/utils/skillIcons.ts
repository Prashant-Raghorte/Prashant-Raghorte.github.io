const DEVICON = 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons'
const SIMPLE = 'https://cdn.simpleicons.org'
const LOCAL = '/skill-icons'

/** Simple Icons CDN — optional hex when the default slug color is missing or monochrome. */
function si(slug: string, color?: string): string {
  return color ? `${SIMPLE}/${slug}/${color.replace('#', '')}` : `${SIMPLE}/${slug}`
}

const AWS_ICON = `${DEVICON}/amazonwebservices/amazonwebservices-original-wordmark.svg`

const SKILL_ICON_MAP: Record<string, string> = {
  // Backend
  Python: `${DEVICON}/python/python-original.svg`,
  Django: `${DEVICON}/django/django-plain.svg`,
  'Django REST Framework': `${DEVICON}/django/django-plain.svg`,
  'REST APIs': si('openapiinitiative', '6BA539'),
  'Rest API': si('openapiinitiative', '6BA539'),
  FastAPI: `${DEVICON}/fastapi/fastapi-original.svg`,
  'Django WebSockets': `${DEVICON}/django/django-plain.svg`,
  'OAuth 2.0': si('openid', 'F78C40'),
  JWT: si('jsonwebtokens', 'FB015B'),
  RBAC: si('auth0'),
  'API Security': si('auth0'),

  // Frontend
  HTML: `${DEVICON}/html5/html5-original.svg`,
  CSS: `${DEVICON}/css3/css3-original.svg`,
  Bootstrap: `${DEVICON}/bootstrap/bootstrap-original.svg`,
  React: `${DEVICON}/react/react-original.svg`,
  TypeScript: `${DEVICON}/typescript/typescript-original.svg`,
  Vite: `${DEVICON}/vitejs/vitejs-original.svg`,

  // Databases
  PostgreSQL: `${DEVICON}/postgresql/postgresql-original.svg`,
  MSSQL: `${DEVICON}/microsoftsqlserver/microsoftsqlserver-original.svg`,
  SQLite: `${DEVICON}/sqlite/sqlite-original.svg`,
  Elasticsearch: `${DEVICON}/elasticsearch/elasticsearch-original.svg`,
  Redis: `${DEVICON}/redis/redis-original.svg`,

  // Cloud & async
  AWS: AWS_ICON,
  'S3 Bucket': AWS_ICON,
  'AWS SNS': AWS_ICON,
  'AWS SES': AWS_ICON,
  Celery: si('celery'),
  Linux: `${DEVICON}/linux/linux-original.svg`,
  Windows: `${DEVICON}/windows11/windows11-original.svg`,

  // Integrations & tools
  Stripe: si('stripe'),
  'Zoho CRM': si('zoho'),
  'Gmail API': si('gmail'),
  Git: `${DEVICON}/git/git-original.svg`,
  GitHub: `${DEVICON}/github/github-original.svg`,
  Postman: `${DEVICON}/postman/postman-original.svg`,
  'DRF Localization': `${DEVICON}/django/django-plain.svg`,
  Resend: si('resend', 'FF6933'),

  // AI / LLM
  'OpenAI API': `${LOCAL}/openai.svg`,
  'Claude API': si('claude', 'D97757'),
  'Gemini API': si('googlegemini'),
  Cursor: si('cursor', '000000'),

  // Project tags
  DRF: `${DEVICON}/django/django-plain.svg`,
  LLM: `${LOCAL}/openai.svg`,
  Webhooks: si('zapier'),
  'GitHub Actions': `${DEVICON}/githubactions/githubactions-original.svg`,

  // Experience tags
  'Django ORM': `${DEVICON}/django/django-plain.svg`,
  'Django MVT': `${DEVICON}/django/django-plain.svg`,
  OpenAI: `${LOCAL}/openai.svg`,
  Claude: si('claude', 'D97757'),
  Gemini: si('googlegemini'),
  'AWS S3': AWS_ICON,
  'OAuth / SSO': si('openid', 'F78C40'),
  'JWT / RBAC': si('jsonwebtokens', 'FB015B'),
  i18n: si('googletranslate'),
  Microservices: `${DEVICON}/docker/docker-original.svg`,
}

export function getSkillIcon(name: string): string | undefined {
  return SKILL_ICON_MAP[name]
}
