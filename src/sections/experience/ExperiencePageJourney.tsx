import type { Experience } from '@/types'
import { siteCopy } from '@/config/copy'
import { ExperienceConstellationNav } from '@/components/experience/ExperienceConstellationNav'
import { ExperienceImmersiveTimeline } from '@/components/experience/ExperienceImmersiveTimeline'
import { ExperienceRoleStage } from '@/components/experience/ExperienceRoleStage'
import './ExperiencePageJourney.css'

type ExperiencePageJourneyProps = {
  items: Experience[]
  activeId: string
  inView: boolean
}

export function ExperiencePageJourney({ items, activeId, inView }: ExperiencePageJourneyProps) {
  const copy = siteCopy.sections.experiencePage

  return (
    <section
      className={['exp-journey', inView ? 'exp-journey--in-view' : ''].filter(Boolean).join(' ')}
      aria-labelledby="exp-journey-title"
    >
      <header className="exp-journey__head">
        <span className="exp-journey__accent" aria-hidden="true" />
        <div className="exp-journey__head-copy">
          <h2 id="exp-journey-title" className="exp-journey__title">
            {copy.timelineTitle}
          </h2>
          <p className="exp-journey__hint">{copy.navHint}</p>
        </div>
      </header>

      <ExperienceConstellationNav
        items={items}
        activeId={activeId}
        inView={inView}
        showHead={false}
      />

      <div className="exp-journey__body">
        <aside className="exp-journey__spotlight" aria-label={copy.spotlightLabel}>
          <p className="exp-journey__section-label exp-journey__section-label--spotlight">
            {copy.stageLabel}
          </p>
          <ExperienceRoleStage items={items} activeId={activeId} inView={inView} />
        </aside>

        <div className="exp-journey__timeline">
          <p className="exp-journey__section-label exp-journey__section-label--timeline">
            {copy.timelineCardsLabel}
          </p>
          <ExperienceImmersiveTimeline items={items} activeId={activeId} inView={inView} />
        </div>
      </div>
    </section>
  )
}
