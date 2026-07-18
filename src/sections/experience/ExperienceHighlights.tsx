import type { CSSProperties } from 'react'
import type { Experience } from '@/types'
import { siteCopy } from '@/config/copy'
import { ExperienceCareerImpactMap } from '@/components/experience/ExperienceCareerImpactMap'
import { ExperienceOutcomesCollab } from '@/components/experience/ExperienceOutcomesCollab'
import { ShineBorderCard } from '@/components/ui/ShineBorderCard'
import { useSpotlight } from '@/hooks/useSpotlight'
import { buildImpactProfile } from '@/utils/experienceImpactProfile'
import './ExperienceHighlights.css'
import '@/components/experience/ExperienceCareerImpactMap.css'
import '@/components/experience/ExperienceOutcomesCollab.css'

type ExperienceHighlightsProps = {
  items: Experience[]
  inView: boolean
}

export function ExperienceHighlights({ items, inView }: ExperienceHighlightsProps) {
  const { spotlight, handleMouseMove, handleMouseLeave } = useSpotlight<HTMLDivElement>()
  const copy = siteCopy.sections.experiencePage
  const careerThemes = buildImpactProfile(items.flatMap((item) => item.highlights))

  return (
    <section
      className={['exp-outcomes', inView ? 'exp-outcomes--in-view' : ''].filter(Boolean).join(' ')}
      aria-labelledby="exp-outcomes-title"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={
        {
          '--exp-outcomes-spot-x': `${spotlight.x}%`,
          '--exp-outcomes-spot-y': `${spotlight.y}%`,
        } as CSSProperties
      }
    >
      <span
        className={[
          'exp-outcomes__spotlight',
          spotlight.active ? 'exp-outcomes__spotlight--active' : '',
        ]
          .filter(Boolean)
          .join(' ')}
        aria-hidden="true"
      />

      <header className="exp-outcomes__head">
        <span className="exp-outcomes__accent" aria-hidden="true" />
        <div className="exp-outcomes__head-copy">
          <p className="exp-outcomes__eyebrow">{copy.highlightsEyebrow}</p>
          <h2 id="exp-outcomes-title" className="exp-outcomes__title">
            {copy.highlightsTitle}
          </h2>
          <p className="exp-outcomes__subtitle">{copy.highlightsSubtitle}</p>
        </div>
      </header>

      <div className="exp-outcomes__body">
        <ShineBorderCard hoverOnly className="exp-outcomes__spectrum-wrap">
          <div className="exp-outcomes__map-panel">
            <ExperienceCareerImpactMap
              themes={careerThemes}
              title={copy.careerImpactTitle}
              hint={copy.careerImpactHint}
            />
          </div>
        </ShineBorderCard>

        <ShineBorderCard hoverOnly className="exp-outcomes__cta-wrap">
          <ExperienceOutcomesCollab
            title={copy.ctaTitle}
            viewProjectsLabel={copy.viewProjects}
            getInTouchLabel={copy.getInTouch}
          />
        </ShineBorderCard>
      </div>
    </section>
  )
}
