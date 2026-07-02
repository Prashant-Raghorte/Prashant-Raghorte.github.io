import { siteCopy } from '@/config/copy'
import { Section, ViewAllCard } from '@/components/common'
import { ExperienceTimeline } from '@/components/experience/ExperienceTimeline'
import { FEATURED_EXPERIENCE_LIMIT, ROUTES, SECTION_IDS } from '@/constants'
import { experiences } from '@/data/portfolio'
import '@/components/common/PageHeader.css'
import '@/components/common/ViewAllCard.css'
import '@/components/experience/ExperienceTimeline.css'

export function FeaturedExperienceSection() {
  const featuredExperiences = experiences.slice(0, FEATURED_EXPERIENCE_LIMIT)
  const hasMoreExperiences = experiences.length > FEATURED_EXPERIENCE_LIMIT

  return (
    <Section id={SECTION_IDS.EXPERIENCE} eyebrow="Career" title="Work Experience">
      <p className="featured-section__subtitle">{siteCopy.sections.featuredExperience}</p>
      <ExperienceTimeline items={featuredExperiences} />
      {hasMoreExperiences && (
        <ViewAllCard to={ROUTES.EXPERIENCE} variant="experience" />
      )}
    </Section>
  )
}
