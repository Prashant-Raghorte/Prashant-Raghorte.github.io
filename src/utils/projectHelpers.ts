import type { Project } from '@/types'
import { skillCategories } from '@/data/portfolio'

export function getProjectAnchorId(id: string): string {
  return `project-${id}`
}

export function getUniqueTechCount(items: Project[]): number {
  return new Set(items.flatMap((project) => project.tags)).size
}

export function getLiveDemoCount(items: Project[]): number {
  return items.filter((project) => project.url).length
}

export function getOpenSourceCount(items: Project[]): number {
  return items.filter((project) => project.repoUrl).length
}

export function getAiBuildCount(items: Project[]): number {
  return items.filter((project) =>
    project.tags.some((tag) =>
      ['LLM', 'OpenAI API', 'Claude API', 'Gemini API'].includes(tag),
    ),
  ).length
}

export function getPythonBuildCount(items: Project[]): number {
  return items.filter((project) => project.tags.includes('Python')).length
}

export type PortfolioSkill = {
  skill: string
  count: number
  maxCount: number
}

export function getAllPortfolioSkills(items: Project[]): PortfolioSkill[] {
  const counts = new Map<string, number>()

  for (const project of items) {
    for (const tag of project.tags) {
      counts.set(tag, (counts.get(tag) ?? 0) + 1)
    }
  }

  const maxCount = Math.max(...counts.values(), 1)

  return getSortedProjectTags([...counts.keys()]).map((skill) => ({
    skill,
    count: counts.get(skill) ?? 0,
    maxCount,
  }))
}

export function getStackNodePosition(index: number, total: number) {
  const ringSizes = [
    { rx: 24, ry: 19 },
    { rx: 34, ry: 27 },
    { rx: 44, ry: 35 },
  ] as const
  const ringCount = ringSizes.length
  const perRing = Math.ceil(total / ringCount)
  const ringIndex = Math.min(Math.floor(index / perRing), ringCount - 1)
  const ringStart = ringIndex * perRing
  const ringTotal = Math.min(perRing, total - ringStart)
  const indexInRing = index - ringStart
  const { rx, ry } = ringSizes[ringIndex] ?? ringSizes[ringSizes.length - 1]
  const angleDeg = (indexInRing / ringTotal) * 360 - 90
  const angleRad = (angleDeg * Math.PI) / 180

  return {
    x: 50 + rx * Math.cos(angleRad),
    y: 50 + ry * Math.sin(angleRad),
    ringIndex,
  }
}

export type ProjectDeliveryStatKey =
  | 'stackSkills'
  | 'modules'
  | 'highlights'
  | 'integrations'
  | 'dataStores'
  | 'aiIntegrations'

export type ProjectDeliveryStat = {
  key: ProjectDeliveryStatKey
  value: number
  displayValue: string
  label: string
}

export function formatProjectDeliveryStatValue(key: ProjectDeliveryStatKey, value: number): string {
  if (key === 'modules' || key === 'integrations') {
    return `${value}+`
  }

  return String(value)
}

export function getProjectDeliveryStats(project: Project, labels: {
  stackSkills: string
  modules: string
  highlights: string
  integrations: string
  dataStores: string
  aiCount: string
}): ProjectDeliveryStat[] {
  const { integrations, dataStores, aiIntegrations } = project.deliverySnapshot
  const moduleCount = project.modules.length
  const highlightCount = project.highlights?.length ?? 0
  const stackSkillCount = project.tags.length

  const rows: Array<{ key: ProjectDeliveryStatKey; value: number; label: string }> = [
    { key: 'stackSkills', value: stackSkillCount, label: labels.stackSkills },
    { key: 'modules', value: moduleCount, label: labels.modules },
    { key: 'highlights', value: highlightCount, label: labels.highlights },
    { key: 'integrations', value: integrations, label: labels.integrations },
    { key: 'dataStores', value: dataStores, label: labels.dataStores },
    { key: 'aiIntegrations', value: aiIntegrations, label: labels.aiCount },
  ]

  return rows.map((row) => ({
    key: row.key,
    value: row.value,
    label: row.label,
    displayValue: formatProjectDeliveryStatValue(row.key, row.value),
  }))
}

export function getPortfolioModuleCount(items: Project[]): number {
  return items.reduce((sum, project) => sum + project.modules.length, 0)
}

export function getPortfolioIntegrationCount(items: Project[]): number {
  return items.reduce((sum, project) => sum + project.deliverySnapshot.integrations, 0)
}

export type PortfolioPulseMetric = {
  key: string
  label: string
  value: number
  max: number
  display: string
}

export function getPortfolioPulseMetrics(projects: Project[]): {
  hero: PortfolioPulseMetric
  companions: PortfolioPulseMetric[]
} {
  const total = Math.max(projects.length, 1)
  const liveCount = getLiveDemoCount(projects)
  const liveCoverage = Math.round((liveCount / total) * 100)
  const moduleCount = getPortfolioModuleCount(projects)
  const integrationCount = getPortfolioIntegrationCount(projects)

  return {
    hero: {
      key: 'live',
      label: 'Live coverage',
      value: liveCoverage,
      max: 100,
      display: `${liveCoverage}%`,
    },
    companions: [
      {
        key: 'modules',
        label: 'Modules',
        value: moduleCount,
        max: Math.max(moduleCount, 1),
        display: formatProjectDeliveryStatValue('modules', moduleCount),
      },
      {
        key: 'integrations',
        label: 'Integrations',
        value: integrationCount,
        max: Math.max(integrationCount, 1),
        display: formatProjectDeliveryStatValue('integrations', integrationCount),
      },
    ],
  }
}

export function getSortedProjectTags(tags: string[]): string[] {
  const categoryOrder = new Map<string, number>()

  skillCategories.forEach((category, index) => {
    category.skills.forEach((skill) => {
      if (!categoryOrder.has(skill)) {
        categoryOrder.set(skill, index)
      }
    })
  })

  return [...tags].sort((a, b) => {
    const orderA = categoryOrder.get(a) ?? 99
    const orderB = categoryOrder.get(b) ?? 99
    if (orderA !== orderB) return orderA - orderB
    return a.localeCompare(b)
  })
}
