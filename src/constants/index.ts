import type { NavIconName } from '@/types'

export type NavItem = {
  id: string
  label: string
  icon: NavIconName
  to: string
  hash?: string
}

export const ROUTES = {
  HOME: '/',
  ABOUT: '/about',
  EXPERIENCE: '/experience',
  PROJECTS: '/projects',
  CONTACT: '/contact',
} as const

export type RoutePath = (typeof ROUTES)[keyof typeof ROUTES]

export const SECTION_IDS = {
  HOME: 'home',
  ABOUT: 'about',
  EXPERIENCE: 'experience',
  EDUCATION: 'education',
  SKILLS: 'skills',
  PROJECTS: 'projects',
  CONTACT: 'contact',
} as const

export type SectionId = (typeof SECTION_IDS)[keyof typeof SECTION_IDS]

export const FEATURED_PROJECTS_LIMIT = 3
export const FEATURED_EXPERIENCE_LIMIT = 3
/** Skill tiles shown before the +N more cell in the collapsed All tab (30 cells total). */
export const ALL_SKILLS_PREVIEW_SKILL_COUNT = 29
/** Skill tiles shown before the +N more cell on the About page (18th tile is +more). */
export const ABOUT_SKILLS_PREVIEW_SKILL_COUNT = 17
/** When expanded beyond this count, the About skills grid scrolls inside the stage. */
export const ABOUT_SKILLS_SCROLL_SKILL_COUNT = 18

export const mainNavItems: NavItem[] = [
  { id: 'home', label: 'Home', icon: 'home', to: ROUTES.HOME, hash: SECTION_IDS.HOME },
  { id: 'about', label: 'About', icon: 'about', to: ROUTES.ABOUT },
  { id: 'experience', label: 'Experience', icon: 'experience', to: ROUTES.EXPERIENCE },
  { id: 'projects', label: 'Projects', icon: 'projects', to: ROUTES.PROJECTS },
  { id: 'contact', label: 'Contact', icon: 'contact', to: ROUTES.CONTACT },
]
