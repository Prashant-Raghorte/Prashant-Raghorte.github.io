import type { Experience } from '@/types'

export const YEARS_EXPERIENCE = '3.5+'

export function getUniqueCities(items: Experience[]): string[] {
  return [
    ...new Set(
      items.map((item) => item.location.split(',')[0]?.trim() ?? item.location),
    ),
  ]
}

export function getUniqueCompanies(items: Experience[]): string[] {
  return [...new Set(items.map((item) => item.company))]
}

export function getCompanyShortName(company: string): string {
  const parenMatch = company.match(/\(([^)]+)\)/)
  if (parenMatch?.[1]) {
    return parenMatch[1].trim()
  }

  const withoutParens = company.replace(/\s*\([^)]*\)\s*/g, ' ').trim()
  return withoutParens.split(/\s+/)[0] ?? company
}

export function getStageCompanyDisplay(company: string): string {
  const parenMatch = company.match(/\(([^)]+)\)/)
  if (parenMatch?.[1]) {
    return parenMatch[1].trim()
  }

  return company.replace(/\s*\([^)]*\)\s*/g, ' ').trim()
}

export function getExperienceAnchorId(id: string): string {
  return `experience-${id}`
}

export function getCareerStats(items: Experience[]) {
  const uniqueCities = getUniqueCities(items)
  const uniqueCompanies = getUniqueCompanies(items)

  return [
    { id: 'years', value: YEARS_EXPERIENCE, label: 'Years' },
    { id: 'roles', value: String(items.length), label: 'Roles' },
    { id: 'companies', value: String(uniqueCompanies.length), label: 'Companies' },
    { id: 'cities', value: String(uniqueCities.length), label: 'Cities' },
  ] as const
}

export function getTotalHighlights(items: Experience[]): number {
  return items.reduce((sum, item) => sum + item.highlights.length, 0)
}

export function getActiveExperience(
  items: Experience[],
  activeId: string,
): Experience {
  return items.find((item) => item.id === activeId) ?? items[0]!
}
