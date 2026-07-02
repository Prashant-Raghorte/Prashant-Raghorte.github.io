import { SKILL_CATEGORY_ORDER, skillCategories } from '@/data/portfolio'
import type { SkillCategory } from '@/types'

export function getOrderedSkillCategories(): SkillCategory[] {
  return SKILL_CATEGORY_ORDER.map((id) =>
    skillCategories.find((category) => category.id === id),
  ).filter((category): category is SkillCategory => category !== undefined)
}

export type SkillCategoryDensity = 'compact' | 'standard' | 'dense'

/** Maps skill count to layout density so cards stay balanced as lists grow. */
export function getSkillCategoryDensity(skillCount: number): SkillCategoryDensity {
  if (skillCount <= 3) return 'compact'
  if (skillCount <= 8) return 'standard'
  return 'dense'
}
