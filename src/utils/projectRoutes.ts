import { ROUTES } from '@/constants'

export const PROJECT_SKILLS_PARAM = 'skills'
/** @deprecated use PROJECT_SKILLS_PARAM */
export const PROJECT_SKILL_PARAM = 'skill'

export function buildProjectsUrl(skills: string[] = []): string {
  if (skills.length === 0) return ROUTES.PROJECTS
  return `${ROUTES.PROJECTS}?${PROJECT_SKILLS_PARAM}=${skills.map(encodeURIComponent).join(',')}`
}

export function getSkillsFromSearchParams(searchParams: URLSearchParams): string[] {
  const grouped = searchParams.get(PROJECT_SKILLS_PARAM)
  if (grouped) {
    return grouped
      .split(',')
      .map((skill) => decodeURIComponent(skill.trim()))
      .filter(Boolean)
  }

  const legacy = searchParams.get(PROJECT_SKILL_PARAM)
  if (legacy) return [legacy]

  return []
}

export function skillsToSearchParams(skills: string[]): Record<string, string> | {} {
  if (skills.length === 0) return {}
  return { [PROJECT_SKILLS_PARAM]: skills.join(',') }
}
