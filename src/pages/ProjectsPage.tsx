import { siteCopy } from '@/config/copy'
import { useCallback } from 'react'
import { useSearchParams } from 'react-router-dom'
import { PageHeader } from '@/components/common/PageHeader'
import { Section } from '@/components/common'
import { PageMeta } from '@/components/seo/PageMeta'
import { ProjectsPageShowcase } from '@/sections/projects/ProjectsPageShowcase'
import { getSkillsFromSearchParams, skillsToSearchParams } from '@/utils/projectRoutes'
import '@/components/common/PageHeader.css'

export function ProjectsPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const activeSkills = getSkillsFromSearchParams(searchParams)

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
        className="page-header--projects"
        title={siteCopy.pages.projects.title}
        subtitle={siteCopy.pages.projects.subtitle}
      />
      <Section>
        <ProjectsPageShowcase
          activeSkills={activeSkills}
          onSkillsChange={handleSkillsChange}
        />
      </Section>
    </>
  )
}
