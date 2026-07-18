import { projects } from '@/data/portfolio'
import { siteCopy } from '@/config/copy'
import { useInView } from '@/hooks/useInView'
import { filterProjectsBySkills } from '@/utils/projectSkills'
import { ProjectsPageCatalog } from '@/sections/projects/ProjectsPageCatalog'
import { ProjectsPageIntro } from '@/sections/projects/ProjectsPageIntro'
import { ProjectsPageOutcomes } from '@/sections/projects/ProjectsPageOutcomes'
import './ProjectsPageShowcase.css'
import '@/sections/projects/ProjectsPageIntro.css'
import '@/sections/projects/ProjectsPageCatalog.css'
import '@/sections/projects/ProjectsPageOutcomes.css'

type ProjectsPageShowcaseProps = {
  activeSkills: string[]
  onSkillsChange: (skills: string[]) => void
}

export function ProjectsPageShowcase({
  activeSkills,
  onSkillsChange,
}: ProjectsPageShowcaseProps) {
  const copy = siteCopy.sections.projectsPage
  const { ref, inView } = useInView<HTMLDivElement>({
    threshold: 0,
    rootMargin: '0px',
  })
  const filteredProjects = filterProjectsBySkills(activeSkills)

  return (
    <div
      ref={ref}
      className={['projects-showcase', inView ? 'projects-showcase--in-view' : ''].filter(Boolean).join(' ')}
    >
      <header className="projects-showcase__head">
        <span className="projects-showcase__accent" aria-hidden="true" />
        <div className="projects-showcase__head-copy">
          <h2 className="projects-showcase__title">{copy.showcaseWidgetTitle}</h2>
          <p className="projects-showcase__hint">{copy.showcaseWidgetHint}</p>
        </div>
      </header>

      <ProjectsPageIntro projects={projects} inView={inView} />
      <ProjectsPageCatalog
        projects={filteredProjects}
        allProjects={projects}
        activeSkills={activeSkills}
        onSkillsChange={onSkillsChange}
        inView={inView}
      />
      <ProjectsPageOutcomes projects={projects} inView={inView} />
    </div>
  )
}
