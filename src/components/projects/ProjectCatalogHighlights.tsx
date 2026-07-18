import { siteCopy } from '@/config/copy'
import './ProjectCatalogHighlights.css'

type ProjectCatalogHighlightsProps = {
  highlights: string[]
  className?: string
}

export function ProjectCatalogHighlights({ highlights, className }: ProjectCatalogHighlightsProps) {
  const copy = siteCopy.sections.projectsPage

  if (highlights.length === 0) {
    return null
  }

  return (
    <div className={['project-highlights', className].filter(Boolean).join(' ')}>
      <span className="project-highlights__label">{copy.catalogHighlightsLabel}</span>
      <ul className="project-highlights__list">
        {highlights.map((highlight, index) => (
          <li key={highlight} className="project-highlights__item">
            <span className="project-highlights__index" aria-hidden="true">
              {String(index + 1).padStart(2, '0')}
            </span>
            <span className="project-highlights__text">{highlight}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
