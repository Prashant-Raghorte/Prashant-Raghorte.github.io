import { env } from '@/config/env'
import { siteCopy } from '@/config/copy'

export const siteConfig = {
  name: 'Prashant Raghorte',
  title: `Prashant Raghorte | ${siteCopy.role}`,
  description: siteCopy.description,
  role: siteCopy.role,
  tagline: siteCopy.tagline,
  url: env.siteUrl,
  resumeUrl: '/resume.pdf',
  profileImageUrl: '/profile.jpg',
  location: 'Pune, India',
  availability: {
    state: 'open' as const,
    label: 'Open to work',
    summary: 'Available for full-time roles, freelance collaborations, and remote opportunities.',
  },
  links: {
    github: 'https://github.com/Prashant-Raghorte',
    linkedin: 'https://www.linkedin.com/in/Prashant-Raghorte',
    instagram: 'https://www.instagram.com/Prashant-Raghorte',
    email: 'hello@prashantraghorte.dev',
    phone: '+91 9876543210',
  },
} as const

export type SiteConfig = typeof siteConfig
