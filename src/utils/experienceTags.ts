export const CORE_EXPERIENCE_TAGS = [
  'Python',
  'Django',
  'DRF',
  'Django ORM',
  'REST APIs',
] as const

const CORE_TAG_SET = new Set<string>(CORE_EXPERIENCE_TAGS)

const TECH_PATTERNS: { pattern: RegExp; label: string }[] = [
  { pattern: /\bOpenAI\b/i, label: 'OpenAI' },
  { pattern: /\bClaude\b/i, label: 'Claude' },
  { pattern: /\bGemini\b/i, label: 'Gemini' },
  { pattern: /\bFastAPI\b/i, label: 'FastAPI' },
  { pattern: /\bElasticsearch\b/i, label: 'Elasticsearch' },
  { pattern: /\bPostgreSQL\b/i, label: 'PostgreSQL' },
  { pattern: /\bMSSQL\b/i, label: 'MSSQL' },
  { pattern: /\bSQLite\b/i, label: 'SQLite' },
  { pattern: /\bCelery\b/i, label: 'Celery' },
  { pattern: /\bRedis\b/i, label: 'Redis' },
  { pattern: /\bS3\b/i, label: 'AWS S3' },
  { pattern: /\bSES\b/i, label: 'AWS SES' },
  { pattern: /\bSNS\b/i, label: 'AWS SNS' },
  { pattern: /\bOAuth\b|\bSSO\b/i, label: 'OAuth / SSO' },
  { pattern: /\bJWT\b|\bRBAC\b/i, label: 'JWT / RBAC' },
  { pattern: /\bGmail API\b/i, label: 'Gmail API' },
  { pattern: /\bZoho\b/i, label: 'Zoho CRM' },
  { pattern: /\bStripe\b/i, label: 'Stripe' },
  { pattern: /\bmultilingual\b|\bLocalization\b|\bi18n\b/i, label: 'i18n' },
  { pattern: /\bMVT\b/i, label: 'Django MVT' },
  { pattern: /\bwebhooks?\b/i, label: 'Webhooks' },
  { pattern: /\bmicroservices?\b/i, label: 'Microservices' },
  { pattern: /\bDjango REST Framework\b|\bDRF\b/i, label: 'DRF' },
  { pattern: /\bDjango ORM\b/i, label: 'Django ORM' },
  { pattern: /\bREST(?:ful)?\s+APIs?\b|\bREST APIs?\b/i, label: 'REST APIs' },
  { pattern: /\bDjango\b/i, label: 'Django' },
  { pattern: /\bPython\b/i, label: 'Python' },
]

const TAG_PATTERN_MAP = new Map<string, RegExp>()
for (const { pattern, label } of TECH_PATTERNS) {
  if (!TAG_PATTERN_MAP.has(label)) {
    TAG_PATTERN_MAP.set(label, pattern)
  }
}

export const ALL_EXPERIENCE_TAG_LABELS = [
  ...new Set(TECH_PATTERNS.map(({ label }) => label)),
] as const

export function highlightMatchesTag(highlight: string, tag: string): boolean {
  const pattern = TAG_PATTERN_MAP.get(tag)
  return pattern ? pattern.test(highlight) : false
}

type ExtractExperienceTagsOptions = {
  includeCore?: boolean
}

export function extractExperienceTags(
  highlights: string[],
  limit = 6,
  options: ExtractExperienceTagsOptions = {},
): string[] {
  const { includeCore = false } = options
  const roleTags: string[] = []

  for (const { pattern, label } of TECH_PATTERNS) {
    if (roleTags.includes(label)) continue
    if (includeCore && CORE_TAG_SET.has(label)) continue

    const found = highlights.some((highlight) => pattern.test(highlight))
    if (found) roleTags.push(label)
  }

  if (!includeCore) {
    return roleTags.slice(0, limit)
  }

  const merged = [
    ...CORE_EXPERIENCE_TAGS,
    ...roleTags.filter((tag) => !CORE_TAG_SET.has(tag)),
  ]

  return merged.slice(0, limit)
}

const TAG_FOCUS_OVERLAP: Record<string, string[]> = {
  Django: ['python & django', 'django'],
  Python: ['python & django', 'python'],
  DRF: ['rest apis & drf', 'drf'],
  'REST APIs': ['rest apis & drf', 'rest'],
  Celery: ['celery & redis', 'celery'],
  Redis: ['celery & redis', 'redis'],
  PostgreSQL: ['postgresql & elasticsearch', 'postgresql'],
  Elasticsearch: ['postgresql & elasticsearch', 'elasticsearch'],
  OpenAI: ['llm integration', 'llm', 'openai'],
  Claude: ['llm integration', 'llm', 'claude'],
  Gemini: ['llm integration', 'llm', 'gemini'],
  'OAuth / SSO': ['api security', 'auth', 'oauth', 'sso'],
  'JWT / RBAC': ['api security', 'auth', 'jwt', 'rbac'],
}

function tagOverlapsFocus(tag: string, focusAreas: readonly string[]): boolean {
  const tagLower = tag.toLowerCase()

  for (const focus of focusAreas) {
    const focusLower = focus.toLowerCase()
    if (focusLower.includes(tagLower) || tagLower.includes(focusLower)) {
      return true
    }
  }

  const overlapKey = Object.keys(TAG_FOCUS_OVERLAP).find(
    (key) => key.toLowerCase() === tagLower,
  )
  if (!overlapKey) return false

  const patterns = TAG_FOCUS_OVERLAP[overlapKey]!
  return focusAreas.some((focus) =>
    patterns.some((pattern) => focus.toLowerCase().includes(pattern)),
  )
}

const FOCUS_AREA_SKILL_MAP: Record<string, readonly string[]> = {
  'Python & Django': ['Python', 'Django'],
  'REST APIs & DRF': ['REST APIs', 'DRF'],
  'LLM Integration': ['OpenAI', 'Claude', 'Gemini'],
  'Celery & Redis': ['Celery', 'Redis'],
  'PostgreSQL & Elasticsearch': ['PostgreSQL', 'Elasticsearch'],
  'API Security': ['OAuth / SSO', 'JWT / RBAC'],
}

const HERO_AWS_SERVICES = ['AWS S3', 'AWS SES', 'AWS SNS'] as const

function expandFocusAreaSkills(focusAreas: readonly string[]): string[] {
  const skills: string[] = []

  for (const area of focusAreas) {
    const expanded = FOCUS_AREA_SKILL_MAP[area]
    if (expanded) {
      for (const skill of expanded) {
        if (!skills.includes(skill)) skills.push(skill)
      }
      continue
    }

    for (const part of area.split(/\s*&\s*/)) {
      const label = part.trim()
      if (label && !skills.includes(label)) skills.push(label)
    }
  }

  return skills
}

export type HeroTechStackItem = {
  label: string
  variant: 'focus' | 'production'
}

export function buildHeroTechStack(
  focusAreas: readonly string[],
  highlights: string[],
  maxProduction = 5,
): HeroTechStackItem[] {
  const focusSkills = [
    ...expandFocusAreaSkills(focusAreas),
    ...HERO_AWS_SERVICES,
  ]

  const production = extractExperienceTags(highlights, 10)
    .filter((tag) => !tagOverlapsFocus(tag, focusAreas))
    .filter((tag) => !focusSkills.includes(tag))
    .slice(0, maxProduction)

  return [
    ...focusSkills.map((label) => ({ label, variant: 'focus' as const })),
    ...production.map((label) => ({ label, variant: 'production' as const })),
  ]
}
