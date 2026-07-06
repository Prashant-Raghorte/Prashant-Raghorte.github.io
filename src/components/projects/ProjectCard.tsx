import { useRef } from 'react'
import type { Project } from '@/types'
import { ReadMoreText } from '@/components/common/ReadMoreText'
import { NavTooltip } from '@/components/navbar/NavTooltip'
import { ProjectLogo } from '@/components/projects/ProjectLogo'
import { ExternalLinkIcon } from '@/components/ui/icons'
import { ShineBorderCard } from '@/components/ui/ShineBorderCard'
import { SocialIcon } from '@/components/ui/SocialIcon'
import { useProjectCardTagsLine } from '@/hooks/useHomeProjectsSpotlightLayout'
import { getSkillIcon } from '@/utils/skillIcons'
import '@/components/navbar/NavTooltip.css'
import './ProjectLogo.css'
import './ProjectCard.css'

const DESCRIPTION_MAX_LINES = 3

type ProjectCardProps = {
  project: Project
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

export function ProjectCard({ project }: ProjectCardProps) {
  const tagsRef = useRef<HTMLUListElement>(null)
  const tagLimit = useProjectCardTagsLine(tagsRef, project.tags)
  const visibleTags = project.tags.slice(0, tagLimit)
  const hiddenTagCount = Math.max(project.tags.length - tagLimit, 0)
  const hasLinks = Boolean(project.repoUrl || project.url)

  return (
    <ShineBorderCard hoverOnly className="project-card-wrap">
      <article className="project-card">
        <header className="project-card__head">
          <ProjectLogo project={project} size="md" />
          <div className="project-card__head-copy">
            <h3 className="project-card__title">{project.title}</h3>
          </div>
        </header>
        <ReadMoreText
          text={project.description}
          maxLines={DESCRIPTION_MAX_LINES}
          className="project-card__desc-wrap"
        />
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
        {hasLinks && (
          <footer className="project-card__footer">
            <div className="project-card__links">
              {project.repoUrl && (
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
              )}
              {project.url && (
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
              )}
            </div>
          </footer>
        )}
      </article>
    </ShineBorderCard>
  )
}
