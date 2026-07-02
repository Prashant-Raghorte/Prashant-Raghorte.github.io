import { siteCopy } from '@/config/copy'
import { useCallback } from 'react'
import { useSearchParams } from 'react-router-dom'
import { PageHeader } from '@/components/common/PageHeader'
import { Section } from '@/components/common'
import { ProjectCard } from '@/components/projects/ProjectCard'
import { ProjectSkillFilter } from '@/components/projects/ProjectSkillFilter'
import { PageMeta } from '@/components/seo/PageMeta'
import { filterProjectsBySkills } from '@/utils/projectSkills'
import { getSkillsFromSearchParams, skillsToSearchParams } from '@/utils/projectRoutes'
import '@/components/common/PageHeader.css'
import '@/components/projects/ProjectCard.css'
import '@/components/projects/ProjectSkillFilter.css'

export function ProjectsPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const activeSkills = getSkillsFromSearchParams(searchParams)
  const filteredProjects = filterProjectsBySkills(activeSkills)

  const handleSkillsChange = useCallback(
    (skills: string[]) => {
      setSearchParams(skillsToSearchParams(skills))
    },
    [setSearchParams],
  )

  return (
    <>
      <PageMeta page="projects" />
      <PageHeader
        title={siteCopy.pages.projects.title}
        subtitle={siteCopy.pages.projects.subtitle}
      />
      <Section eyebrow="Work" title="Projects">
        <ProjectSkillFilter
          activeSkills={activeSkills}
          onSkillsChange={handleSkillsChange}
        />

        {filteredProjects.length > 0 ? (
          <div className="projects-grid">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        ) : (
          <div className="projects-page__empty">
            <p>
              {activeSkills.length === 1
                ? siteCopy.projects.emptySingle(activeSkills[0])
                : siteCopy.projects.emptyMultiple(activeSkills)}
            </p>
            <button
              type="button"
              className="projects-page__clear"
              onClick={() => handleSkillsChange([])}
            >
              {siteCopy.projects.clearFilters}
            </button>
          </div>
        )}
      </Section>
    </>
  )
}
