import type { Experience } from '@/types'
import { ExperienceHighlights } from '@/sections/experience/ExperienceHighlights'
import { ExperiencePageIntro } from '@/sections/experience/ExperiencePageIntro'
import { ExperiencePageJourney } from '@/sections/experience/ExperiencePageJourney'
import { useActiveExperience } from '@/hooks/useActiveExperience'
import { useInView } from '@/hooks/useInView'
import '@/sections/experience/ExperiencePageIntro.css'
import '@/sections/experience/ExperiencePageJourney.css'
import '@/sections/experience/ExperienceHighlights.css'
import '@/components/experience/ExperienceConstellationNav.css'
import '@/components/experience/ExperienceRoleStage.css'
import '@/components/experience/ExperienceImmersiveTimeline.css'
import '@/components/experience/ExperienceRoleSkillFocus.css'

type ExperiencePageShowcaseProps = {
  items: Experience[]
}

export function ExperiencePageShowcase({ items }: ExperiencePageShowcaseProps) {
  const { ref, inView } = useInView<HTMLDivElement>({
    threshold: 0,
    rootMargin: '0px',
  })
  const activeId = useActiveExperience(items)

  return (
    <div ref={ref}>
      <ExperiencePageIntro items={items} inView={inView} />
      <ExperiencePageJourney items={items} activeId={activeId} inView={inView} />
      <ExperienceHighlights items={items} inView={inView} />
    </div>
  )
}
