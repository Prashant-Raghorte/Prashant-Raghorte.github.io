import type { Project } from '@/types'
import { getCompanyDomain } from '@/utils/companyLogos'

export function getProjectInitials(title: string): string {
  const words = title.replace(/[^a-zA-Z0-9\s]/g, ' ').split(/\s+/).filter(Boolean)

  if (words.length >= 2) {
    return `${words[0][0]}${words[1][0]}`.toUpperCase()
  }

  return title.slice(0, 2).toUpperCase()
}

export function getProjectDomain(
  project: Pick<Project, 'url' | 'repoUrl'>,
): string | undefined {
  return getCompanyDomain(project.url) ?? getCompanyDomain(project.repoUrl)
}

function getRootDomain(domain: string): string | undefined {
  const parts = domain.split('.').filter(Boolean)
  if (parts.length <= 2) return undefined

  return parts.slice(-2).join('.')
}

/** Domains to try for favicons — subdomain first, then marketing root. */
export function getProjectDomainCandidates(
  project: Pick<Project, 'url' | 'repoUrl'>,
): string[] {
  const primary = getProjectDomain(project)
  if (!primary) return []

  const candidates = [primary]
  const root = getRootDomain(primary)

  if (root && root !== primary) {
    candidates.push(root)
  }

  return [...new Set(candidates)]
}

function pushUnique(list: string[], value?: string) {
  if (!value || list.includes(value)) return
  list.push(value)
}

/** Ordered logo sources — DuckDuckGo and direct favicon tend to be more reliable than Google. */
export function getProjectLogoSources(
  project: Pick<Project, 'title' | 'logoUrl' | 'url' | 'repoUrl'>,
): string[] {
  const sources: string[] = []

  pushUnique(sources, project.logoUrl)

  if (project.logoUrl) {
    return sources
  }

  if (project.url) {
    try {
      const origin = new URL(project.url).origin
      pushUnique(sources, `${origin}/favicon.ico`)
      pushUnique(sources, `${origin}/favicon.svg`)
    } catch {
      /* ignore invalid url */
    }
  }

  for (const domain of getProjectDomainCandidates(project)) {
    pushUnique(sources, `https://icons.duckduckgo.com/ip3/${domain}.ico`)
    pushUnique(sources, `https://${domain}/favicon.ico`)
    pushUnique(sources, `https://www.google.com/s2/favicons?domain=${domain}&sz=128`)
  }

  return sources
}
