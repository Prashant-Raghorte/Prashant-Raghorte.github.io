import { siteCopy } from '@/config/copy'
import { Section, ViewAllCard } from '@/components/common'
import { ProjectCard } from '@/components/projects/ProjectCard'
import { FEATURED_PROJECTS_LIMIT, ROUTES, SECTION_IDS } from '@/constants'
import { projects } from '@/data/portfolio'
import '@/components/common/PageHeader.css'
import '@/components/common/ViewAllCard.css'
import '@/components/projects/ProjectCard.css'

export function FeaturedProjectsSection() {
  const featuredProjects = projects.slice(0, FEATURED_PROJECTS_LIMIT)
  const hasMoreProjects = projects.length > FEATURED_PROJECTS_LIMIT

  return (
    <Section id={SECTION_IDS.PROJECTS} eyebrow="Work" title="Featured Projects">
      <p className="featured-section__subtitle">{siteCopy.sections.featuredProjects}</p>
      <div className="projects-grid">
        {featuredProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
      {hasMoreProjects && (
        <ViewAllCard to={ROUTES.PROJECTS} variant="projects" />
      )}
    </Section>
  )
}
