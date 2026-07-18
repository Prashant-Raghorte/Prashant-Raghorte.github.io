import { useEffect, useState } from 'react'
import { ABOUT_SKILLS_PREVIEW_SKILL_COUNT } from '@/constants'

const DESKTOP_NAV_QUERY = '(min-width: 961px)'

/** Preview skill tiles before the +more cell, tuned per viewport width. */
export function getAboutSkillsPreviewCount(width: number): number {
  if (width <= 480) return 5
  if (width <= 640) return 8
  if (width <= 960) return 11
  return ABOUT_SKILLS_PREVIEW_SKILL_COUNT
}

export function getAboutSkillsScrollCount(previewCount: number): number {
  return previewCount + 6
}

export function useAboutSkillsLayout() {
  const [previewCount, setPreviewCount] = useState(() =>
    typeof window !== 'undefined' ? getAboutSkillsPreviewCount(window.innerWidth) : ABOUT_SKILLS_PREVIEW_SKILL_COUNT,
  )
  const [useSidebarNav, setUseSidebarNav] = useState(() =>
    typeof window !== 'undefined'
      ? window.matchMedia(DESKTOP_NAV_QUERY).matches
      : true,
  )

  useEffect(() => {
    const desktopMedia = window.matchMedia(DESKTOP_NAV_QUERY)

    const syncLayout = () => {
      setPreviewCount(getAboutSkillsPreviewCount(window.innerWidth))
      setUseSidebarNav(desktopMedia.matches)
    }

    syncLayout()
    window.addEventListener('resize', syncLayout)
    desktopMedia.addEventListener('change', syncLayout)

    return () => {
      window.removeEventListener('resize', syncLayout)
      desktopMedia.removeEventListener('change', syncLayout)
    }
  }, [])

  return {
    previewCount,
    scrollCount: getAboutSkillsScrollCount(previewCount),
    useSidebarNav,
  }
}
