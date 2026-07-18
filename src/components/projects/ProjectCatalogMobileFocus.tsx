import { siteCopy } from '@/config/copy'
import type { Project } from '@/types'
import { ProjectLogo } from '@/components/projects/ProjectLogo'
import { getProjectDeliveryStats, getSortedProjectTags } from '@/utils/projectHelpers'
import { getSkillIcon } from '@/utils/skillIcons'
import './ProjectCatalogMobileFocus.css'
import './ProjectLogo.css'

type ProjectCatalogMobileFocusProps = {
  project: Project
  isActive: boolean
}

export function ProjectCatalogMobileFocus({ project, isActive }: ProjectCatalogMobileFocusProps) {
  if (!isActive) return null

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

  return (
    <>
      <div className="catalog-mobile-focus catalog-mobile-focus--active">
        <div className="catalog-mobile-focus__spotlight">
          <div className="catalog-mobile-focus__top">
            <span className="catalog-mobile-focus__live">
              <span className="catalog-mobile-focus__live-dot" aria-hidden="true" />
              {copy.focusLabel}
            </span>
            <span className="catalog-mobile-focus__status">
              {project.url ? copy.catalogLiveStatus : copy.catalogRepoStatus}
            </span>
          </div>

          <div className="catalog-mobile-focus__identity">
            <ProjectLogo project={project} size="md" featured className="catalog-mobile-focus__logo" />
            <div className="catalog-mobile-focus__primary">
              <div className="catalog-mobile-focus__title-row">
                <h3 className="catalog-mobile-focus__title">{project.title}</h3>
                <span className="catalog-mobile-focus__domain-tag">{project.domain}</span>
              </div>
            </div>
          </div>

          <div className="projects-catalog__focus-snapshot catalog-mobile-focus__snapshot">
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

          <div className="projects-catalog__focus-skills catalog-mobile-focus__skills">
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
        </div>
      </div>

      <div className="catalog-mobile-focus__divider" aria-hidden="true" />
    </>
  )
}
