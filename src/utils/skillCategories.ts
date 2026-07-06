import { SKILL_CATEGORY_ORDER, skillCategories } from '@/data/portfolio'
import type { SkillCategory } from '@/types'

export const ALL_SKILLS_TAB_ID = 'all' as const

export type HomeSkillTabId = typeof ALL_SKILLS_TAB_ID | (typeof SKILL_CATEGORY_ORDER)[number]

export function getOrderedSkillCategories(): SkillCategory[] {
  return SKILL_CATEGORY_ORDER.map((id) =>
    skillCategories.find((category) => category.id === id),
  ).filter((category): category is SkillCategory => category !== undefined)
}

export function getAllSkills(): string[] {
  const seen = new Set<string>()
  const skills: string[] = []

  for (const category of getOrderedSkillCategories()) {
    for (const skill of category.skills) {
      if (!seen.has(skill)) {
        seen.add(skill)
        skills.push(skill)
      }
    }
  }

  return skills
}
