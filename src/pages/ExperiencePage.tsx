import { siteCopy } from '@/config/copy'
import { PageHeader } from '@/components/common/PageHeader'
import { Section } from '@/components/common'
import { ExperienceTimeline } from '@/components/experience/ExperienceTimeline'
import { PageMeta } from '@/components/seo/PageMeta'
import { experiences } from '@/data/portfolio'
import '@/components/common/PageHeader.css'
import '@/components/experience/ExperienceTimeline.css'

export function ExperiencePage() {
  return (
    <>
      <PageMeta page="experience" />
      <PageHeader
        title={siteCopy.pages.experience.title}
        subtitle={siteCopy.pages.experience.subtitle}
      />
      <Section eyebrow="Career" title="All Roles">
        <ExperienceTimeline items={experiences} />
      </Section>
    </>
  )
}
