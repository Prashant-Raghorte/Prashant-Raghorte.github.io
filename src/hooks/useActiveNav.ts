import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { ROUTES, SECTION_IDS } from '@/constants'

const HOME_SECTION_IDS = [
  SECTION_IDS.HOME,
  SECTION_IDS.EXPERIENCE,
  SECTION_IDS.SKILLS,
  SECTION_IDS.PROJECTS,
  SECTION_IDS.CONTACT,
]

const ROUTE_ACTIVE_MAP: Record<string, string> = {
  [ROUTES.ABOUT]: 'about',
  [ROUTES.EXPERIENCE]: 'experience',
  [ROUTES.PROJECTS]: 'projects',
  [ROUTES.CONTACT]: 'contact',
}

const SCROLL_OFFSET = 140

function resolveHomeNavSection(sectionId: string): string {
  if (sectionId === SECTION_IDS.EXPERIENCE) return 'experience'
  if (sectionId === SECTION_IDS.PROJECTS) return 'projects'
  if (sectionId === SECTION_IDS.CONTACT) return 'contact'
  return 'home'
}

function getActiveHomeSection(): string {
  const scrollPosition = window.scrollY + SCROLL_OFFSET

  let activeSection: string = SECTION_IDS.HOME

  for (const id of HOME_SECTION_IDS) {
    const element = document.getElementById(id)
    if (element && element.offsetTop <= scrollPosition) {
      activeSection = id
    }
  }

  return activeSection
}

export function useActiveNav() {
  const { pathname } = useLocation()
  const [homeSection, setHomeSection] = useState<string>(SECTION_IDS.HOME)

  useEffect(() => {
    if (pathname !== ROUTES.HOME) return

    const updateSection = () => {
      setHomeSection(getActiveHomeSection())
    }

    updateSection()
    window.addEventListener('scroll', updateSection, { passive: true })
    window.addEventListener('resize', updateSection)

    return () => {
      window.removeEventListener('scroll', updateSection)
      window.removeEventListener('resize', updateSection)
    }
  }, [pathname])

  if (pathname in ROUTE_ACTIVE_MAP) {
    return ROUTE_ACTIVE_MAP[pathname] ?? 'home'
  }

  if (pathname === ROUTES.HOME) {
    return resolveHomeNavSection(homeSection)
  }

  return 'home'
}
