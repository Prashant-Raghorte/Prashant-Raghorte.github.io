import { useEffect, useState } from 'react'
import type { Project } from '@/types'
import { getProjectInitials, getProjectLogoSources } from '@/utils/projectLogos'
import './ProjectLogo.css'

type ProjectLogoSize = 'sm' | 'md' | 'lg'

type ProjectLogoProps = {
  project: Pick<Project, 'title' | 'logoUrl' | 'url' | 'repoUrl'>
  className?: string
  size?: ProjectLogoSize
  featured?: boolean
}

export function ProjectLogo({
  project,
  className = '',
  size = 'md',
  featured = false,
}: ProjectLogoProps) {
  const sources = getProjectLogoSources(project)
  const [sourceIndex, setSourceIndex] = useState(0)
  const initials = getProjectInitials(project.title)
  const logoSrc = sources[sourceIndex]
  const showFallback = !logoSrc || sourceIndex >= sources.length

  useEffect(() => {
    setSourceIndex(0)
  }, [project.title, project.logoUrl, project.url, project.repoUrl])

  const classes = [
    'project-logo',
    `project-logo--${size}`,
    featured ? 'project-logo--featured' : '',
    showFallback ? 'project-logo--fallback' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <span className={classes} aria-hidden="true">
      <span className="project-logo__ring" />
      <span className="project-logo__surface">
        {!showFallback ? (
          <img
            key={logoSrc}
            src={logoSrc}
            alt=""
            className="project-logo__image"
            loading="lazy"
            decoding="async"
            onError={() => setSourceIndex((current) => current + 1)}
          />
        ) : (
          <span className="project-logo__initials">{initials}</span>
        )}
      </span>
    </span>
  )
}
