import type { Project } from '@/types'
import { siteCopy } from '@/config/copy'
import { ReadMoreText } from '@/components/common/ReadMoreText'
import { ProjectCatalogHighlights } from '@/components/projects/ProjectCatalogHighlights'
import { ProjectCatalogMobileFocus } from '@/components/projects/ProjectCatalogMobileFocus'
import { ProjectLogo } from '@/components/projects/ProjectLogo'
import { ProjectOverviewQuote } from '@/components/projects/ProjectOverviewQuote'
import { ExternalLinkIcon } from '@/components/ui/icons'
import { SocialIcon } from '@/components/ui/SocialIcon'
import { ShineBorderCard } from '@/components/ui/ShineBorderCard'
import './ProjectLogo.css'
import './ProjectOverviewQuote.css'
import './ProjectCatalogCard.css'
import './ProjectCatalogHighlights.css'
import './ProjectCatalogMobileFocus.css'

const DESCRIPTION_MAX_LINES = 4

type ProjectCatalogCardProps = {
  project: Project
  isActive?: boolean
}

export function ProjectCatalogCard({
  project,
  isActive = false,
}: ProjectCatalogCardProps) {
  const copy = siteCopy.sections.projectsPage
  const highlights = project.highlights ?? []
  const hasLiveUrl = Boolean(project.url)
  const hasRepoUrl = Boolean(project.repoUrl)
  const hasBothLinks = hasLiveUrl && hasRepoUrl

  return (
    <ShineBorderCard
      hoverOnly
      className={['catalog-card-wrap', isActive ? 'catalog-card-wrap--active' : ''].filter(Boolean).join(' ')}
    >
      <article
        className={['catalog-card', isActive ? 'catalog-card--active' : ''].filter(Boolean).join(' ')}
      >
        <span className="catalog-card__glow" aria-hidden="true" />
        <span className="catalog-card__rail" aria-hidden="true" />

        <ProjectCatalogMobileFocus project={project} isActive={isActive} />

        <header className="catalog-card__head catalog-card__head--desktop">
          <ProjectLogo project={project} size="md" />
          <div className="catalog-card__head-copy">
            <div className="catalog-card__title-row">
              <h3 className="catalog-card__title">{project.title}</h3>
              <span className="catalog-card__domain-tag">{project.domain}</span>
            </div>
          </div>
          <span className="catalog-card__status">
            {project.url ? copy.catalogLiveStatus : copy.catalogRepoStatus}
          </span>
        </header>

        <ReadMoreText
          text={project.description}
          maxLines={DESCRIPTION_MAX_LINES}
          className="catalog-card__desc catalog-card__body--mobile"
        />

        <div className="catalog-card__summary catalog-card__body--mobile">
          <span className="catalog-card__summary-label">{copy.catalogSummaryLabel}</span>
          <ProjectOverviewQuote>{project.catalogSummary}</ProjectOverviewQuote>
        </div>

        <ProjectCatalogHighlights
          highlights={highlights}
          className="catalog-card__highlights catalog-card__body--mobile"
        />

        {isActive && (hasLiveUrl || hasRepoUrl) ? (
          <div
            className={[
              'projects-catalog__focus-links',
              'catalog-card__mobile-links',
              hasBothLinks ? 'projects-catalog__focus-links--dual' : '',
            ]
              .filter(Boolean)
              .join(' ')}
          >
            {hasLiveUrl ? (
              <a
                href={project.url}
                target="_blank"
                rel="noreferrer"
                className="projects-catalog__focus-link projects-catalog__focus-link--live"
              >
                <ExternalLinkIcon />
                <span className="projects-catalog__focus-link-text">
                  {hasBothLinks ? copy.liveProductShort : copy.liveProduct}
                </span>
              </a>
            ) : null}
            {hasRepoUrl ? (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noreferrer"
                className="projects-catalog__focus-link projects-catalog__focus-link--repo"
              >
                <SocialIcon name="github" />
                <span className="projects-catalog__focus-link-text">
                  {hasBothLinks ? copy.viewRepoShort : copy.viewRepo}
                </span>
              </a>
            ) : null}
          </div>
        ) : null}
      </article>
    </ShineBorderCard>
  )
}
