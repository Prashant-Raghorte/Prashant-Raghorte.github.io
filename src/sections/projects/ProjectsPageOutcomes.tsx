import type { CSSProperties } from 'react'
import type { Project } from '@/types'
import { siteCopy } from '@/config/copy'
import { ProjectBuildPatternsPanel } from '@/components/projects/ProjectBuildPatternsPanel'
import { ProjectDeliveryLedgerPanel } from '@/components/projects/ProjectDeliveryLedgerPanel'
import { ShineBorderCard } from '@/components/ui/ShineBorderCard'
import { useSpotlight } from '@/hooks/useSpotlight'
import {
  buildArchitecturePatterns,
  buildProductDeliveryLedger,
} from '@/utils/projectDeliveryProfile'
import './ProjectsPageOutcomes.css'
import '@/components/projects/ProjectDeliveryLedgerPanel.css'
import '@/components/projects/ProjectBuildPatternsPanel.css'

type ProjectsPageOutcomesProps = {
  projects: Project[]
  inView: boolean
}

export function ProjectsPageOutcomes({ projects, inView }: ProjectsPageOutcomesProps) {
  const { spotlight, handleMouseMove, handleMouseLeave } = useSpotlight<HTMLDivElement>()
  const copy = siteCopy.sections.projectsPage
  const deliveryLedger = buildProductDeliveryLedger(projects)
  const buildPatterns = buildArchitecturePatterns(projects)

  return (
    <section
      className={['projects-outcomes', inView ? 'projects-outcomes--in-view' : ''].filter(Boolean).join(' ')}
      aria-labelledby="projects-outcomes-title"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={
        {
          '--projects-outcomes-spot-x': `${spotlight.x}%`,
          '--projects-outcomes-spot-y': `${spotlight.y}%`,
        } as CSSProperties
      }
    >
      <span
        className={[
          'projects-outcomes__spotlight',
          spotlight.active ? 'projects-outcomes__spotlight--active' : '',
        ]
          .filter(Boolean)
          .join(' ')}
        aria-hidden="true"
      />

      <header className="projects-outcomes__head">
        <span className="projects-outcomes__accent" aria-hidden="true" />
        <div className="projects-outcomes__head-copy">
          <p className="projects-outcomes__eyebrow">{copy.outcomesEyebrow}</p>
          <h2 id="projects-outcomes-title" className="projects-outcomes__title">
            {copy.outcomesTitle}
          </h2>
          <p className="projects-outcomes__subtitle">{copy.outcomesSubtitle}</p>
        </div>
      </header>

      <div className="projects-outcomes__body">
        <ShineBorderCard hoverOnly className="projects-outcomes__card-wrap projects-outcomes__ledger-wrap">
          <ProjectDeliveryLedgerPanel
            ledger={deliveryLedger}
            title={copy.deliveryLedgerTitle}
            hint={copy.deliveryLedgerHint}
            legendLabel={copy.deliveryLedgerLegendLabel}
            totalLabel={copy.deliveryLedgerTotalLabel}
            shareLabel={copy.deliveryLedgerShareLabel}
          />
        </ShineBorderCard>

        <ShineBorderCard hoverOnly className="projects-outcomes__card-wrap projects-outcomes__patterns-wrap">
          <ProjectBuildPatternsPanel
            patterns={buildPatterns}
            title={copy.patternsTitle}
            hint={copy.patternsHint}
            productsLabel={copy.patternsProductsLabel}
          />
        </ShineBorderCard>
      </div>
    </section>
  )
}
