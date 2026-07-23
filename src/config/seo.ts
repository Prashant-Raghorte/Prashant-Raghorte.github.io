import { siteCopy } from '@/config/copy'
import { env } from '@/config/env'
import { siteConfig } from '@/config/site'
import { ROUTES } from '@/constants'

export type SeoPage = 'home' | 'about' | 'experience' | 'projects' | 'contact'

type PageSeoEntry = {
  title: string
  description: string
  path: string
}

const pageSeoEntries: Record<SeoPage, PageSeoEntry> = {
  home: {
    title: siteConfig.title,
    description: siteCopy.metaDescription,
    path: ROUTES.HOME,
  },
  about: {
    title: `${siteCopy.pages.about.title} | ${siteConfig.name}`,
    description: siteCopy.pages.about.subtitle,
    path: ROUTES.ABOUT,
  },
  experience: {
    title: `${siteCopy.pages.experience.title} | ${siteConfig.name}`,
    description: siteCopy.pages.experience.subtitle,
    path: ROUTES.EXPERIENCE,
  },
  projects: {
    title: `${siteCopy.pages.projects.title} | ${siteConfig.name}`,
    description: siteCopy.pages.projects.subtitle,
    path: ROUTES.PROJECTS,
  },
  contact: {
    title: `${siteCopy.pages.contact.title} | ${siteConfig.name}`,
    description: siteCopy.pages.contact.lede,
    path: ROUTES.CONTACT,
  },
}

export function getAbsoluteUrl(path: string): string {
  const base = env.siteUrl.replace(/\/$/, '')
  const normalizedPath = path.startsWith('/') ? path : `/${path}`
  return path === ROUTES.HOME ? base : `${base}${normalizedPath}`
}

export function getOgImageUrl(): string {
  return getAbsoluteUrl('/og-image.jpg')
}

export function getPageSeo(page: SeoPage): PageSeoEntry & { url: string; image: string } {
  const entry = pageSeoEntries[page]
  return {
    ...entry,
    url: getAbsoluteUrl(entry.path),
    image: getOgImageUrl(),
  }
}

export function getPersonJsonLd() {
  const { name, role, links, profileImageUrl } = siteConfig
  const sameAs = [links.github, links.linkedin, links.instagram].filter(Boolean)

  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name,
    jobTitle: role,
    url: getAbsoluteUrl(ROUTES.HOME),
    image: getAbsoluteUrl(profileImageUrl),
    email: links.email,
    address: {
      '@type': 'PostalAddress',
      addressLocality: siteConfig.location,
    },
    sameAs,
  }
}
