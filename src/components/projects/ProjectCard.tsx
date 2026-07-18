import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { siteCopy } from '@/config/copy'
import type { Project } from '@/types'
import { ReadMoreText } from '@/components/common/ReadMoreText'
import { NavTooltip } from '@/components/navbar/NavTooltip'
import { ProjectLogo } from '@/components/projects/ProjectLogo'
import { ProjectOverviewQuote } from '@/components/projects/ProjectOverviewQuote'
import { ArrowRightIcon, ExternalLinkIcon } from '@/components/ui/icons'
import { ShineBorderCard } from '@/components/ui/ShineBorderCard'
import { SocialIcon } from '@/components/ui/SocialIcon'
import { ROUTES } from '@/constants'
import { useProjectCardTagsLine } from '@/hooks/useHomeProjectsSpotlightLayout'
import { getProjectAnchorId } from '@/utils/projectHelpers'
import { getSkillIcon } from '@/utils/skillIcons'
import '@/components/navbar/NavTooltip.css'
import './ProjectLogo.css'
import './ProjectOverviewQuote.css'
import './ProjectCard.css'

const DESCRIPTION_MAX_LINES = 3
const HOME_HIGHLIGHT_PREVIEW = 2

type ProjectCardProps = {
  project: Project
  variant?: 'default' | 'home'
  featured?: boolean
}

type ProjectTagProps = {
  tag: string
}

function ProjectTag({ tag }: ProjectTagProps) {
  const icon = getSkillIcon(tag)

  return (
    <li className="project-card__tag">
      <span className="project-card__tag-surface">
        {icon ? (
          <img
            src={icon}
            alt=""
            className="project-card__tag-icon"
            loading="lazy"
            decoding="async"
          />
        ) : (
          <span className="project-card__tag-fallback" aria-hidden="true">
            {tag.charAt(0)}
          </span>
        )}
        <span className="project-card__tag-label">{tag}</span>
      </span>
    </li>
  )
}

export function ProjectCard({ project, variant = 'default', featured = false }: ProjectCardProps) {
  const isHome = variant === 'home'
  const tagsRef = useRef<HTMLUListElement>(null)
  const tagLimit = useProjectCardTagsLine(tagsRef, project.tags)
  const visibleTags = project.tags.slice(0, tagLimit)
  const hiddenTagCount = Math.max(project.tags.length - tagLimit, 0)
  const hasLinks = Boolean(project.repoUrl || project.url)
  const highlights = project.highlights ?? []
  const previewHighlights = isHome ? highlights.slice(0, HOME_HIGHLIGHT_PREVIEW) : []
  const remainingHighlights = Math.max(highlights.length - previewHighlights.length, 0)
  const projectHref = `${ROUTES.PROJECTS}#${getProjectAnchorId(project.id)}`
  const projectCopy = siteCopy.viewAll.projects

  return (
    <ShineBorderCard hoverOnly className="project-card-wrap">
      <article className={['project-card', isHome ? 'project-card--home' : ''].filter(Boolean).join(' ')}>
        <header className="project-card__head">
          <ProjectLogo project={project} size="md" />
          <div className="project-card__head-copy">
            <div className="project-card__title-row">
              <h3 className="project-card__title">{project.title}</h3>
              {featured ? (
                <NavTooltip
                  label="Primary featured project"
                  hint="Spotlight"
                  placement="bottom"
                  className="project-card__featured-tip"
                >
                  <span className="project-card__featured" tabIndex={0}>
                    Featured
                  </span>
                </NavTooltip>
              ) : null}
            </div>
          </div>
          {isHome && hasLinks ? (
            <div className="project-card__head-links">
              {project.repoUrl ? (
                <NavTooltip label="View on GitHub" placement="bottom">
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="project-card__link-btn"
                    aria-label={`View ${project.title} repository on GitHub`}
                  >
                    <SocialIcon name="github" className="project-card__link-icon" />
                  </a>
                </NavTooltip>
              ) : null}
              {project.url ? (
                <NavTooltip label="Live demo" placement="bottom">
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noreferrer"
                    className="project-card__link-btn"
                    aria-label={`Open ${project.title} live demo`}
                  >
                    <ExternalLinkIcon />
                  </a>
                </NavTooltip>
              ) : null}
            </div>
          ) : null}
        </header>
        <ProjectOverviewQuote className="project-card__quote">
          <ReadMoreText
            text={project.description}
            maxLines={DESCRIPTION_MAX_LINES}
            className="project-card__desc-wrap"
          />
        </ProjectOverviewQuote>

        {isHome && previewHighlights.length > 0 ? (
          <ul className="project-card__highlights" aria-label="Project highlights">
            {previewHighlights.map((highlight, index) => (
              <li key={`${project.id}-highlight-${index}`} className="project-card__highlight">
                <span className="project-card__highlight-index" aria-hidden="true">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <p className="project-card__highlight-text">{highlight}</p>
              </li>
            ))}
          </ul>
        ) : null}

        <ul
          ref={tagsRef}
          className="project-card__tags"
          aria-label={`${project.title} tech stack`}
        >
          {visibleTags.map((tag) => (
            <ProjectTag key={tag} tag={tag} />
          ))}
          {hiddenTagCount > 0 ? (
            <li className="project-card__tag project-card__tag-more">+{hiddenTagCount}</li>
          ) : null}
        </ul>

        {isHome ? (
          <footer className="project-card__footer project-card__footer--home">
            <div className="project-card__digest-foot">
              {remainingHighlights > 0 ? (
                <span className="project-card__more">{projectCopy.more(remainingHighlights)}</span>
              ) : (
                <span className="project-card__more" aria-hidden="true" />
              )}
              <Link
                to={projectHref}
                className="project-card__jump"
                aria-label={`${projectCopy.openProject}: ${project.title}`}
              >
                <span>{projectCopy.openProject}</span>
                <span className="project-card__jump-icon" aria-hidden="true">
                  <ArrowRightIcon />
                </span>
              </Link>
            </div>
          </footer>
        ) : hasLinks ? (
          <footer className="project-card__footer">
            <div className="project-card__links">
              {project.repoUrl ? (
                <NavTooltip label="View on GitHub" placement="top">
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="project-card__link-btn"
                    aria-label={`View ${project.title} repository on GitHub`}
                  >
                    <SocialIcon name="github" className="project-card__link-icon" />
                  </a>
                </NavTooltip>
              ) : null}
              {project.url ? (
                <NavTooltip label="Live demo" placement="top">
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noreferrer"
                    className="project-card__link-btn"
                    aria-label={`Open ${project.title} live demo`}
                  >
                    <ExternalLinkIcon />
                  </a>
                </NavTooltip>
              ) : null}
            </div>
          </footer>
        ) : null}
      </article>
    </ShineBorderCard>
  )
}
