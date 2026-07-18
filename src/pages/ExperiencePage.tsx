import { siteCopy } from '@/config/copy'
import { Section } from '@/components/common'
import { PageHeader } from '@/components/common/PageHeader'
import { PageMeta } from '@/components/seo/PageMeta'
import { experiences } from '@/data/portfolio'
import { ExperiencePageShowcase } from '@/sections/experience/ExperiencePageShowcase'
import '@/components/common/PageHeader.css'

export function ExperiencePage() {
  return (
    <>
      <PageMeta page="experience" />
      <PageHeader
        title={siteCopy.pages.experience.title}
        subtitle={siteCopy.pages.experience.subtitle}
      />
      <Section>
        <ExperiencePageShowcase items={experiences} />
      </Section>
    </>
  )
}
