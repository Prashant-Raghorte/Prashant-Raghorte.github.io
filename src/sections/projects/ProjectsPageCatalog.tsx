import { siteCopy } from '@/config/copy'
import type { Project } from '@/types'
import { ProjectCatalogCard } from '@/components/projects/ProjectCatalogCard'
import { ProjectLogo } from '@/components/projects/ProjectLogo'
import { ProjectCatalogTimeline } from '@/components/projects/ProjectCatalogTimeline'
import { ProjectSkillSidebar } from '@/components/projects/ProjectSkillSidebar'
import { ExternalLinkIcon } from '@/components/ui/icons'
import { ShineBorderCard } from '@/components/ui/ShineBorderCard'
import { SocialIcon } from '@/components/ui/SocialIcon'
import { useActiveProject } from '@/hooks/useActiveProject'
import { getProjectAnchorId, getProjectDeliveryStats, getSortedProjectTags } from '@/utils/projectHelpers'
import { getSkillIcon } from '@/utils/skillIcons'
import './ProjectsPageCatalog.css'
import '@/components/projects/ProjectCatalogCard.css'
import '@/components/projects/ProjectCatalogHighlights.css'
import '@/components/projects/ProjectLogo.css'
import '@/components/projects/ProjectSkillSidebar.css'
import '@/components/projects/ProjectCatalogTimeline.css'

type ProjectsPageCatalogProps = {
  projects: Project[]
  allProjects: Project[]
  activeSkills: string[]
  onSkillsChange: (skills: string[]) => void
  inView?: boolean
}

type ProjectFocusPanelProps = {
  project: Project
}

function ProjectFocusPanel({ project }: ProjectFocusPanelProps) {
  const copy = siteCopy.sections.projectsPage
  const sortedTags = getSortedProjectTags(project.tags)
  const deliveryStats = getProjectDeliveryStats(project, {
    stackSkills: copy.focusStackSkillLabel,
    modules: copy.focusModulesLabel,
    highlights: copy.focusHighlightsLabel,
    integrations: copy.focusIntegrationsLabel,
    dataStores: copy.focusDataStoresLabel,
    aiCount: copy.focusAiCountLabel,
  })

  const hasLiveUrl = Boolean(project.url)
  const hasRepoUrl = Boolean(project.repoUrl)
  const hasBothLinks = hasLiveUrl && hasRepoUrl

  return (
    <aside className="projects-catalog__focus" aria-label={copy.focusLabel}>
      <ShineBorderCard hoverOnly className="projects-catalog__focus-card">
        <div className="projects-catalog__focus-inner">
          <div className="projects-catalog__focus-head">
            <span className="projects-catalog__focus-label">{copy.focusLabel}</span>
            <p className="projects-catalog__focus-hint">{copy.focusHint}</p>
          </div>

          <div className="projects-catalog__focus-product">
            <ProjectLogo project={project} size="md" featured />
            <div className="projects-catalog__focus-product-copy">
              <div className="projects-catalog__focus-title-row">
                <h3 className="projects-catalog__focus-title">{project.title}</h3>
                <span className="projects-catalog__focus-domain-tag">{project.domain}</span>
              </div>
            </div>
          </div>

          <div className="projects-catalog__focus-snapshot">
            <span className="projects-catalog__focus-snapshot-label">{copy.focusSnapshotLabel}</span>
            <ul className="projects-catalog__focus-stats">
              {deliveryStats.map((stat) => (
                <li
                  key={stat.key}
                  className={[
                    'projects-catalog__focus-stat',
                    `projects-catalog__focus-stat--${stat.key}`,
                  ].join(' ')}
                >
                  <span className="projects-catalog__focus-stat-sheen" aria-hidden="true" />
                  <span className="projects-catalog__focus-stat-value">{stat.displayValue}</span>
                  <span className="projects-catalog__focus-stat-label">{stat.label}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="projects-catalog__focus-skills">
            <span className="projects-catalog__focus-skills-label">{copy.spotlightStackLabel}</span>
            <ul className="projects-catalog__focus-tags" aria-label={`${project.title} tech stack`}>
              {sortedTags.map((tag) => {
                const icon = getSkillIcon(tag)

                return (
                  <li key={tag} className="projects-catalog__focus-tag">
                    {icon ? (
                      <img
                        src={icon}
                        alt=""
                        className="projects-catalog__focus-tag-icon"
                        loading="lazy"
                        decoding="async"
                      />
                    ) : null}
                    {tag}
                  </li>
                )
              })}
            </ul>
          </div>

          {(hasLiveUrl || hasRepoUrl) && (
            <div
              className={[
                'projects-catalog__focus-links',
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
          )}
        </div>
      </ShineBorderCard>
    </aside>
  )
}

type ProjectRailItemProps = {
  project: Project
  index: number
  isActive: boolean
  showConnector: boolean
}

function ProjectRailItem({
  project,
  index,
  isActive,
  showConnector,
}: ProjectRailItemProps) {
  return (
    <article
      id={getProjectAnchorId(project.id)}
      className={['projects-catalog__item', isActive ? 'projects-catalog__item--active' : '']
        .filter(Boolean)
        .join(' ')}
    >
      <div className="projects-catalog__marker" aria-hidden="true">
        <span className="projects-catalog__index">{String(index + 1).padStart(2, '0')}</span>
        {showConnector ? <span className="projects-catalog__connector" /> : null}
      </div>
      <ProjectCatalogCard project={project} isActive={isActive} />
    </article>
  )
}

export function ProjectsPageCatalog({
  projects,
  allProjects,
  activeSkills,
  onSkillsChange,
  inView = false,
}: ProjectsPageCatalogProps) {
  const copy = siteCopy.sections.projectsPage
  const activeId = useActiveProject(projects)
  const activeProject = projects.find((project) => project.id === activeId) ?? projects[0]

  const catalogContent =
    projects.length === 0 ? (
      <div className="projects-catalog__empty">
        <p>
          {activeSkills.length === 1
            ? siteCopy.projects.emptySingle(activeSkills[0])
            : siteCopy.projects.emptyMultiple(activeSkills)}
        </p>
        <button
          type="button"
          className="projects-catalog__clear"
          onClick={() => onSkillsChange([])}
        >
          {siteCopy.projects.clearFilters}
        </button>
      </div>
    ) : (
      <div className="projects-catalog">
        <div className="projects-catalog__sidebar">
          <ProjectSkillSidebar
            activeSkills={activeSkills}
            onSkillsChange={onSkillsChange}
            resultCount={projects.length}
            totalCount={allProjects.length}
          />
        </div>

        <div className="projects-catalog__rail" aria-label={copy.railLabel}>
          {projects.map((project, index) => (
            <ProjectRailItem
              key={project.id}
              project={project}
              index={index}
              isActive={project.id === activeId}
              showConnector={index < projects.length - 1}
            />
          ))}
        </div>

        {activeProject ? <ProjectFocusPanel project={activeProject} /> : null}
      </div>
    )

  return (
    <section
      className={[
        'projects-catalog-widget',
        inView ? 'projects-catalog-widget--in-view' : '',
      ]
        .filter(Boolean)
        .join(' ')}
      aria-labelledby="projects-catalog-widget-title"
    >
      <header className="projects-catalog-widget__head">
        <span className="projects-catalog-widget__accent" aria-hidden="true" />
        <div className="projects-catalog-widget__head-copy">
          <h2 id="projects-catalog-widget-title" className="projects-catalog-widget__title">
            {copy.catalogWidgetTitle}
          </h2>
          <p className="projects-catalog-widget__hint">{copy.catalogWidgetHint}</p>
        </div>
      </header>

      {projects.length > 0 ? (
        <ProjectCatalogTimeline projects={projects} activeId={activeId} inView={inView} />
      ) : null}

      {catalogContent}
    </section>
  )
}
