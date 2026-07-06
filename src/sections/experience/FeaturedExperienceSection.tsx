import { siteCopy } from '@/config/copy'
import { Section } from '@/components/common'
import { HomeExperienceShowcase } from '@/sections/experience/HomeExperienceShowcase'
import { SECTION_IDS } from '@/constants'
import { experiences } from '@/data/portfolio'
import '@/components/common/PageHeader.css'
import '@/sections/experience/HomeExperienceShowcase.css'

export function FeaturedExperienceSection() {
  const featuredExperiences = experiences.slice(0, 3)

  return (
    <Section id={SECTION_IDS.EXPERIENCE} eyebrow="Career" title="Work Experience">
      <p className="featured-section__subtitle">{siteCopy.sections.featuredExperience}</p>
      <HomeExperienceShowcase items={featuredExperiences} />
    </Section>
  )
}
