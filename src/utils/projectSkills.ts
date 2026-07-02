import { skillCategories, projects } from '@/data/portfolio'

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
    skills.some((skill) => project.tags.includes(skill)),
  )
}

export function getAllDefinedSkills(): string[] {
  return skillCategories.flatMap((category) => category.skills)
}
