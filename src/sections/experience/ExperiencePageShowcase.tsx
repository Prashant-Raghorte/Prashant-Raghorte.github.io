import type { Experience } from '@/types'
import { siteCopy } from '@/config/copy'
import { ExperienceHighlights } from '@/sections/experience/ExperienceHighlights'
import { ExperiencePageIntro } from '@/sections/experience/ExperiencePageIntro'
import { ExperiencePageJourney } from '@/sections/experience/ExperiencePageJourney'
import { useActiveExperience } from '@/hooks/useActiveExperience'
import { useInView } from '@/hooks/useInView'
import './ExperiencePageShowcase.css'
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
  const copy = siteCopy.sections.experiencePage
  const { ref, inView } = useInView<HTMLDivElement>({
    threshold: 0,
    rootMargin: '0px',
  })
  const activeId = useActiveExperience(items)

  return (
    <div
      ref={ref}
      className={['exp-showcase', inView ? 'exp-showcase--in-view' : ''].filter(Boolean).join(' ')}
    >
      <header className="exp-showcase__head">
        <span className="exp-showcase__accent" aria-hidden="true" />
        <div className="exp-showcase__head-copy">
          <h2 className="exp-showcase__title">{copy.showcaseWidgetTitle}</h2>
          <p className="exp-showcase__hint">{copy.showcaseWidgetHint}</p>
        </div>
      </header>

      <ExperiencePageIntro items={items} inView={inView} />
      <ExperiencePageJourney items={items} activeId={activeId} inView={inView} />
      <ExperienceHighlights items={items} inView={inView} />
    </div>
  )
}
