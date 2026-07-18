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
  location: 'Mumbai, India',
  availability: {
    state: 'open' as const,
    label: 'Open to work',
    summary: 'Available for full-time roles, freelance collaborations, and remote opportunities.',
  },
  links: {
    github: 'https://github.com/Prashant-Raghorte',
    linkedin: 'https://www.linkedin.com/in/prashant-raghorte',
    instagram: 'https://www.instagram.com/being.sk_prashant/',
    email: 'raghorteprashant3@gmail.com',
    phone: '+91 9309764799',
  },
} as const

export type SiteConfig = typeof siteConfig
