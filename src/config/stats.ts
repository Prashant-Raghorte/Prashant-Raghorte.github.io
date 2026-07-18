import { siteConfig } from '@/config/site'
import { SECTION_IDS } from '@/constants'
import { projects } from '@/data/portfolio'

export const heroQuickStats = [
  {
    id: 'experience',
    value: '3.5+',
    label: 'Yrs exp.',
    sectionId: SECTION_IDS.EXPERIENCE,
    navLabel: 'View work experience',
  },
  {
    id: 'projects',
    value: String(projects.length),
    label: 'Projects',
    sectionId: SECTION_IDS.PROJECTS,
    navLabel: 'View featured projects',
  },
  {
    id: 'location',
    value: siteConfig.location.split(',')[0]?.trim() ?? siteConfig.location,
    label: siteConfig.location.split(',')[1]?.trim() ?? 'Based in',
    sectionId: SECTION_IDS.CONTACT,
    navLabel: 'View contact section',
  },
] as const
