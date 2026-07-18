import { ALL_EXPERIENCE_TAG_LABELS, highlightMatchesTag } from '@/utils/experienceTags'

export type ImpactTheme = {
  id: string
  label: string
  count: number
  score: number
}

export type SkillCategoryFocus = {
  id: string
  label: string
  skills: string[]
  skillCount: number
  impactCount: number
  score: number
}

const SKILL_CATEGORIES = [
  {
    id: 'core',
    label: 'Core backend',
    tags: [
      'Python',
      'Django',
      'DRF',
      'Django ORM',
      'REST APIs',
      'Django MVT',
      'FastAPI',
      'Microservices',
    ],
  },
  {
    id: 'ai',
    label: 'AI & automation',
    tags: ['OpenAI', 'Claude', 'Gemini'],
  },
  {
    id: 'data',
    label: 'Data & search',
    tags: ['PostgreSQL', 'MSSQL', 'SQLite', 'Elasticsearch'],
  },
  {
    id: 'security',
    label: 'Auth & security',
    tags: ['OAuth / SSO', 'JWT / RBAC'],
  },
  {
    id: 'async',
    label: 'Async & scale',
    tags: ['Celery', 'Redis'],
  },
  {
    id: 'cloud',
    label: 'Cloud & integrations',
    tags: [
      'AWS S3',
      'AWS SES',
      'AWS SNS',
      'Stripe',
      'Zoho CRM',
      'Gmail API',
      'i18n',
      'Webhooks',
    ],
  },
] as const

const TAG_TO_CATEGORY = new Map<string, string>()
for (const category of SKILL_CATEGORIES) {
  for (const tag of category.tags) {
    TAG_TO_CATEGORY.set(tag, category.id)
  }
}

if (import.meta.env.DEV) {
  const uncategorized = ALL_EXPERIENCE_TAG_LABELS.filter((tag) => !TAG_TO_CATEGORY.has(tag))
  if (uncategorized.length > 0) {
    console.warn('[experienceImpactProfile] Uncategorized tags:', uncategorized.join(', '))
  }
}

function getTagCategory(tag: string): string | undefined {
  return TAG_TO_CATEGORY.get(tag)
}

function groupTagsByCategory(tags: readonly string[]): Map<string, string[]> {
  const grouped = new Map<string, string[]>()

  for (const tag of tags) {
    const categoryId = getTagCategory(tag)
    if (!categoryId) continue

    const skills = grouped.get(categoryId) ?? []
    if (!skills.includes(tag)) {
      skills.push(tag)
      grouped.set(categoryId, skills)
    }
  }

  return grouped
}

/** Distinct category tags evidenced across career highlights (not bullet count). */
function countDistinctTagsInHighlights(
  highlights: readonly string[],
  tags: readonly string[],
): number {
  if (tags.length === 0) return 0

  return tags.filter((tag) =>
    highlights.some((highlight) => highlightMatchesTag(highlight, tag)),
  ).length
}

function scoreImpactCounts(counts: number[]): number[] {
  const peak = Math.max(...counts, 1)
  return counts.map((count) => Math.round((count / peak) * 100))
}

export function buildSkillCategoryFocus(
  tags: readonly string[],
  highlights: readonly string[],
): SkillCategoryFocus[] {
  const grouped = groupTagsByCategory(tags)

  const prepared = SKILL_CATEGORIES.map((category) => {
    const skills = grouped.get(category.id) ?? []
    const impactCount = countDistinctTagsInHighlights(highlights, skills)

    return {
      id: category.id,
      label: category.label,
      skills,
      skillCount: skills.length,
      impactCount,
    }
  }).filter((category) => category.skills.length > 0)

  const scores = scoreImpactCounts(prepared.map((category) => category.skillCount))

  return prepared.map((category, index) => ({
    ...category,
    score: scores[index]!,
  }))
}

export function buildImpactProfile(highlights: readonly string[]): ImpactTheme[] {
  const prepared = SKILL_CATEGORIES.map((category) => {
    const count = countDistinctTagsInHighlights(highlights, category.tags)
    return {
      id: category.id,
      label: category.label,
      count,
    }
  }).filter((category) => category.count > 0)

  const scores = scoreImpactCounts(prepared.map((category) => category.count))

  return prepared.map((category, index) => ({
    ...category,
    score: scores[index]!,
  }))
}
