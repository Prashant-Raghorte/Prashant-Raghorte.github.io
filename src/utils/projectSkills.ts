import { skillCategories, projects } from '@/data/portfolio'

/** Maps catalog skill labels to tags used on project cards. */
export const SKILL_FILTER_ALIASES: Record<string, readonly string[]> = {
  'Django REST Framework': ['DRF', 'Django REST Framework'],
  'REST APIs': ['Rest API', 'REST APIs'],
  AWS: ['AWS', 'S3 Bucket', 'AWS SNS', 'AWS SES'],
}

export function getTagsForSkillFilter(skill: string): string[] {
  return [...(SKILL_FILTER_ALIASES[skill] ?? [skill])]
}

export function projectMatchesSkill(projectTags: string[], skill: string): boolean {
  const matchTags = getTagsForSkillFilter(skill)
  return matchTags.some((tag) => projectTags.includes(tag))
}

export function getSkillProductCount(skill: string): number {
  return projects.filter((project) => projectMatchesSkill(project.tags, skill)).length
}

export function getProjectSkills(): string[] {
  const counts = new Map<string, number>()

  for (const project of projects) {
    for (const tag of project.tags) {
      counts.set(tag, (counts.get(tag) ?? 0) + 1)
    }
  }

  const categoryOrder = new Map<string, number>()
  skillCategories.forEach((category, index) => {
    category.skills.forEach((skill) => {
      if (!categoryOrder.has(skill)) {
        categoryOrder.set(skill, index)
      }
    })
  })

  return Array.from(counts.keys()).sort((a, b) => {
    const orderA = categoryOrder.get(a) ?? 99
    const orderB = categoryOrder.get(b) ?? 99
    if (orderA !== orderB) return orderA - orderB

    const countDiff = (counts.get(b) ?? 0) - (counts.get(a) ?? 0)
    return countDiff !== 0 ? countDiff : a.localeCompare(b)
  })
}

export function filterProjectsBySkills(skills: string[]) {
  if (skills.length === 0) return projects

  return projects.filter((project) =>
    skills.some((skill) => projectMatchesSkill(project.tags, skill)),
  )
}

export function getAllDefinedSkills(): string[] {
  return skillCategories.flatMap((category) => category.skills)
}

function getExtraProductSkills(): string[] {
  const catalogSkills = new Set(getAllDefinedSkills())
  const aliasTags = new Set(Object.values(SKILL_FILTER_ALIASES).flat())

  return getProjectSkills().filter(
    (tag) => !catalogSkills.has(tag) && !aliasTags.has(tag),
  )
}

export function getProjectSkillsByCategory() {
  const extraSkills = getExtraProductSkills()

  const groups = skillCategories.map((category) => ({
    categoryId: category.id,
    title: category.title,
    skills: [...category.skills],
  }))

  if (extraSkills.length > 0) {
    groups.push({
      categoryId: 'product-stack',
      title: 'In products',
      skills: extraSkills,
    })
  }

  return groups
}
