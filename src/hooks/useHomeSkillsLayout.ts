import { useEffect, useState } from 'react'
import { ALL_SKILLS_PREVIEW_SKILL_COUNT } from '@/constants'

/** Preview skill tiles before the +more cell, tuned per viewport width. */
export function getHomeSkillsPreviewCount(width: number): number {
  if (width <= 480) return 5
  if (width <= 640) return 8
  if (width <= 960) return 11
  if (width <= 1200) return 20
  return ALL_SKILLS_PREVIEW_SKILL_COUNT
}

export function useHomeSkillsLayout() {
  const [previewCount, setPreviewCount] = useState(() =>
    typeof window !== 'undefined'
      ? getHomeSkillsPreviewCount(window.innerWidth)
      : ALL_SKILLS_PREVIEW_SKILL_COUNT,
  )

  useEffect(() => {
    const syncLayout = () => {
      setPreviewCount(getHomeSkillsPreviewCount(window.innerWidth))
    }

    syncLayout()
    window.addEventListener('resize', syncLayout)

    return () => window.removeEventListener('resize', syncLayout)
  }, [])

  return { previewCount }
}
