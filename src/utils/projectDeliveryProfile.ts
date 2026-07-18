import type { Project } from '@/types'

export type BuildPattern = {
  id: string
  label: string
  hint: string
  productCount: number
  score: number
}

export type DeliverySegment = {
  id: string
  label: string
  value: number
  color: string
}

export type ProductDeliveryRow = {
  id: string
  title: string
  domain: string
  logoUrl?: string
  url?: string
  repoUrl?: string
  rank: number
  total: number
  share: number
  barScore: number
  segments: DeliverySegment[]
}

export type AggregateSegment = DeliverySegment & {
  share: number
}

export type RingSegment = {
  id: string
  color: string
  startDeg: number
  spanDeg: number
}

export type ProductDeliveryLedger = {
  rows: ProductDeliveryRow[]
  portfolioTotal: number
  productCount: number
  legend: Array<{ id: string; label: string; color: string }>
  aggregateSegments: AggregateSegment[]
  ringSegments: RingSegment[]
}

const DELIVERY_SEGMENT_META = [
  {
    id: 'modules',
    label: 'Modules',
    color: '#a78bfa',
    getValue: (project: Project) => project.modules.length,
  },
  {
    id: 'integrations',
    label: 'Integrations',
    color: '#22d3ee',
    getValue: (project: Project) => project.deliverySnapshot.integrations,
  },
  {
    id: 'data',
    label: 'Data stores',
    color: '#34d399',
    getValue: (project: Project) => project.deliverySnapshot.dataStores,
  },
  {
    id: 'ai',
    label: 'AI surfaces',
    color: '#60a5fa',
    getValue: (project: Project) => project.deliverySnapshot.aiIntegrations,
  },
] as const

function buildRingSegments(segments: AggregateSegment[]): RingSegment[] {
  let cursor = 0

  return segments.map((segment) => {
    const spanDeg = segment.share * 3.6
    const ringSegment = {
      id: segment.id,
      color: segment.color,
      startDeg: cursor,
      spanDeg,
    }
    cursor += spanDeg
    return ringSegment
  })
}

function scoreCounts(counts: number[]): number[] {
  const peak = Math.max(...counts, 1)
  return counts.map((count) => Math.round((count / peak) * 100))
}

const BUILD_PATTERN_CHECKS = [
  {
    id: 'cloud-messaging',
    label: 'Event notifications',
    hint: 'SNS/SES fanout for alerts and delivery',
    matches: (project: Project) => project.tags.some((tag) => ['AWS SNS', 'AWS SES'].includes(tag)),
  },
  {
    id: 'object-storage',
    label: 'Object storage workflows',
    hint: 'S3-backed assets, exports, and uploads',
    matches: (project: Project) => project.tags.includes('S3 Bucket'),
  },
  {
    id: 'async',
    label: 'Async job pipelines',
    hint: 'Celery and Redis for background throughput',
    matches: (project: Project) => project.tags.some((tag) => ['Celery', 'Redis'].includes(tag)),
  },
  {
    id: 'multidb',
    label: 'Multi-database architecture',
    hint: 'Coordinated data across multiple stores',
    matches: (project: Project) =>
      project.deliverySnapshot.dataStores >= 2 ||
      (project.tags.includes('PostgreSQL') && project.tags.includes('MSSQL')),
  },
  {
    id: 'webhooks',
    label: 'Webhook automation',
    hint: 'Event-driven partner and CRM sync',
    matches: (project: Project) =>
      project.tags.some((tag) => ['Webhooks', 'Zoho CRM'].includes(tag)),
  },
  {
    id: 'email-automation',
    label: 'Email automation',
    hint: 'Gmail + SES workflows and verification',
    matches: (project: Project) =>
      project.tags.some((tag) => ['Gmail API', 'AWS SES'].includes(tag)),
  },
  {
    id: 'payments',
    label: 'Subscription billing',
    hint: 'Stripe-powered payment flows',
    matches: (project: Project) => project.tags.includes('Stripe'),
  },
  {
    id: 'search',
    label: 'Search and analytics',
    hint: 'Elasticsearch-backed realtime insights',
    matches: (project: Project) => project.tags.includes('Elasticsearch'),
  },
  {
    id: 'llm-integrations',
    label: 'LLM product surfaces',
    hint: 'OpenAI / Claude / Gemini integrations',
    matches: (project: Project) =>
      project.tags.some((tag) => ['OpenAI API', 'Claude API', 'Gemini API'].includes(tag)),
  },
  {
    id: 'api-platform',
    label: 'API platform',
    hint: 'DRF + FastAPI service surfaces',
    matches: (project: Project) => project.tags.some((tag) => ['DRF', 'FastAPI'].includes(tag)),
  },
  {
    id: 'enterprise-auth',
    label: 'Enterprise access control',
    hint: 'OAuth, JWT, and role-based permissions',
    matches: (project: Project) =>
      project.tags.some((tag) => ['OAuth 2.0', 'JWT', 'RBAC'].includes(tag)),
  },
  {
    id: 'ci-delivery',
    label: 'CI delivery pipeline',
    hint: 'Release automation with GitHub Actions',
    matches: (project: Project) => project.tags.includes('GitHub Actions'),
  },
] as const

export function buildArchitecturePatterns(projects: readonly Project[]): BuildPattern[] {
  const prepared = BUILD_PATTERN_CHECKS.map((pattern) => ({
    id: pattern.id,
    label: pattern.label,
    hint: pattern.hint,
    productCount: projects.filter((project) => pattern.matches(project)).length,
  })).filter((pattern) => pattern.productCount > 0)

  const scores = scoreCounts(prepared.map((pattern) => pattern.productCount))

  return prepared.map((pattern, index) => ({
    ...pattern,
    score: scores[index]!,
  }))
}

export function buildProductDeliveryLedger(projects: readonly Project[]): ProductDeliveryLedger {
  const prepared = projects
    .map((project) => {
      const segments = DELIVERY_SEGMENT_META.map((meta) => ({
        id: meta.id,
        label: meta.label,
        value: meta.getValue(project),
        color: meta.color,
      })).filter((segment) => segment.value > 0)

      const total = segments.reduce((sum, segment) => sum + segment.value, 0)

      return {
        id: project.id,
        title: project.title,
        domain: project.domain,
        logoUrl: project.logoUrl,
        url: project.url,
        repoUrl: project.repoUrl,
        rank: 0,
        total,
        share: 0,
        barScore: 0,
        segments,
      }
    })
    .filter((row) => row.total > 0)
    .sort((a, b) => b.total - a.total || a.title.localeCompare(b.title))

  const portfolioTotal = prepared.reduce((sum, row) => sum + row.total, 0)
  const peakTotal = Math.max(...prepared.map((row) => row.total), 1)

  const aggregateTotals = DELIVERY_SEGMENT_META.map((meta) => ({
    id: meta.id,
    label: meta.label,
    color: meta.color,
    value: projects.reduce((sum, project) => sum + meta.getValue(project), 0),
  })).filter((segment) => segment.value > 0)

  const aggregateTotalValue = aggregateTotals.reduce((sum, segment) => sum + segment.value, 0)
  const aggregateSegments = aggregateTotals.map((segment) => ({
    ...segment,
    share: aggregateTotalValue > 0 ? Math.round((segment.value / aggregateTotalValue) * 100) : 0,
  }))

  return {
    rows: prepared.map((row, index) => ({
      ...row,
      rank: index + 1,
      share: portfolioTotal > 0 ? Math.round((row.total / portfolioTotal) * 100) : 0,
      barScore: Math.round((row.total / peakTotal) * 100),
    })),
    portfolioTotal,
    productCount: prepared.length,
    legend: DELIVERY_SEGMENT_META.map((meta) => ({
      id: meta.id,
      label: meta.label,
      color: meta.color,
    })),
    aggregateSegments,
    ringSegments: buildRingSegments(aggregateSegments),
  }
}
