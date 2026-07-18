import { siteCopy } from '@/config/copy'
import { Section } from '@/components/common'
import { HomeProjectsShowcase } from '@/sections/projects/HomeProjectsShowcase'
import { SECTION_IDS } from '@/constants'
import { projects } from '@/data/portfolio'
import '@/components/common/PageHeader.css'
import '@/components/common/ViewAllCard.css'
import '@/components/projects/ProjectCard.css'
import '@/components/projects/ProjectLogo.css'
import '@/sections/projects/HomeProjectsShowcase.css'

export function FeaturedProjectsSection() {
  return (
    <Section id={SECTION_IDS.PROJECTS} eyebrow="Work" title="Featured Projects">
      <p className="featured-section__subtitle">{siteCopy.sections.featuredProjects}</p>
      <HomeProjectsShowcase projects={projects} />
    </Section>
  )
}
