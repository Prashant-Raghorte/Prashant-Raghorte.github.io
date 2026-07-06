import type { Experience } from '@/types'

/** Hosted domains whose favicons are generic platform branding, not the company. */
const LOGO_FALLBACK_DOMAINS = ['lovable.app'] as const

function shouldUseInitialsFallback(domain?: string): boolean {
  if (!domain) return false

  return LOGO_FALLBACK_DOMAINS.some(
    (blocked) => domain === blocked || domain.endsWith(`.${blocked}`),
  )
}

export function getCompanyDomain(companyUrl?: string): string | undefined {
  if (!companyUrl) return undefined

  try {
    return new URL(companyUrl).hostname.replace(/^www\./, '')
  } catch {
    return undefined
  }
}

export function getCompanyInitials(company: string): string {
  const cleaned = company.replace(/[()]/g, ' ').replace(/[^a-zA-Z0-9\s]/g, ' ')
  const words = cleaned.split(/\s+/).filter((word) => word.length > 0)

  if (words.length >= 2) {
    return `${words[0][0]}${words[1][0]}`.toUpperCase()
  }

  return company.slice(0, 2).toUpperCase()
}

export function getCompanyLogoSources(
  experience: Pick<Experience, 'company' | 'companyLogoUrl' | 'companyUrl'>,
): { primary?: string; fallback?: string } {
  const domain = getCompanyDomain(experience.companyUrl)

  if (shouldUseInitialsFallback(domain)) {
    return {}
  }

  if (experience.companyLogoUrl) {
    return { primary: experience.companyLogoUrl }
  }

  if (!domain) return {}

  return {
    primary: `https://www.google.com/s2/favicons?domain=${domain}&sz=128`,
    fallback: `https://icons.duckduckgo.com/ip3/${domain}.ico`,
  }
}
