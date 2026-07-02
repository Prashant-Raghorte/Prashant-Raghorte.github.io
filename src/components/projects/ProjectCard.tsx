import type { Project } from '@/types'
import { ReadMoreText } from '@/components/common/ReadMoreText'
import { ExternalLinkIcon } from '@/components/ui/icons'
import { ShineBorderCard } from '@/components/ui/ShineBorderCard'
import { SocialIcon } from '@/components/ui/SocialIcon'
import './ProjectCard.css'

const DESCRIPTION_MAX_LINES = 3

type ProjectCardProps = {
  project: Project
}

export function ProjectCard({ project }: ProjectCardProps) {
  const hasLinks = Boolean(project.repoUrl || project.url)

  return (
    <ShineBorderCard hoverOnly className="project-card-wrap">
      <article className="project-card">
        <h3 className="project-card__title">{project.title}</h3>
        <ReadMoreText
          text={project.description}
          maxLines={DESCRIPTION_MAX_LINES}
          className="project-card__desc-wrap"
        />
        <ul className="project-card__tags">
          {project.tags.map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>
        {hasLinks && (
          <footer className="project-card__footer">
            <div className="project-card__links">
              {project.repoUrl && (
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="project-card__link-btn"
                  aria-label={`View ${project.title} repository on GitHub`}
                  title="Repository"
                >
                  <SocialIcon name="github" className="project-card__link-icon" />
                </a>
              )}
              {project.url && (
                <a
                  href={project.url}
                  target="_blank"
                  rel="noreferrer"
                  className="project-card__link-btn"
                  aria-label={`Open ${project.title} live demo`}
                  title="Live demo"
                >
                  <ExternalLinkIcon />
                </a>
              )}
            </div>
          </footer>
        )}
      </article>
    </ShineBorderCard>
  )
}
