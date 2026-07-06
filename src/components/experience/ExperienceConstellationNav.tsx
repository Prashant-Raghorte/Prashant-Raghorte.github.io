import type { CSSProperties } from 'react'
import type { Experience } from '@/types'
import { siteCopy } from '@/config/copy'
import { CompanyLogo } from '@/components/experience/CompanyLogo'
import { getCompanyShortName, getExperienceAnchorId } from '@/utils/experienceHelpers'
import { scrollToElement } from '@/utils/scroll'
import './ExperienceConstellationNav.css'
import '@/components/experience/CompanyLogo.css'

type ExperienceConstellationNavProps = {
  items: Experience[]
  activeId: string
  inView: boolean
  showHead?: boolean
}

export function ExperienceConstellationNav({
  items,
  activeId,
  inView,
  showHead = true,
}: ExperienceConstellationNavProps) {
  const nodeCount = items.length
  const activeIndex = Math.max(
    0,
    items.findIndex((item) => item.id === activeId),
  )
  const progress = nodeCount <= 1 ? 1 : activeIndex / (nodeCount - 1)

  return (
    <nav
      className={[
        'exp-constellation',
        !showHead ? 'exp-constellation--compact' : '',
        inView ? 'exp-constellation--in-view' : '',
      ]
        .filter(Boolean)
        .join(' ')}
      aria-label={siteCopy.sections.experiencePage.constellationLabel}
    >
      {showHead ? (
        <div className="exp-constellation__head">
          <span className="exp-constellation__accent" aria-hidden="true" />
          <h2 className="exp-constellation__title">
            {siteCopy.sections.experiencePage.constellationLabel}
          </h2>
        </div>
      ) : null}

      <div className="exp-constellation__scroller">
        <div
          className="exp-constellation__track"
          style={
            {
              '--exp-rail-count': nodeCount,
              '--exp-rail-progress': progress,
            } as CSSProperties
          }
        >
          <div className="exp-constellation__line" aria-hidden="true">
            <span className="exp-constellation__line-fill" />
          </div>

          <ol className="exp-constellation__nodes">
            {items.map((item, index) => {
              const isActive = item.id === activeId
              const startYear =
                item.period.split('–')[0]?.trim() ?? item.period.split('-')[0]?.trim() ?? item.period

              return (
                <li
                  key={item.id}
                  className="exp-constellation__node-wrap"
                  style={{ '--exp-node-delay': `${index * 80}ms` } as CSSProperties}
                >
                  <button
                    type="button"
                    className={[
                      'exp-constellation__node',
                      isActive ? 'exp-constellation__node--active' : '',
                      item.isCurrent ? 'exp-constellation__node--current' : '',
                    ]
                      .filter(Boolean)
                      .join(' ')}
                    onClick={() => {
                      const element = document.getElementById(getExperienceAnchorId(item.id))
                      if (element) scrollToElement(element)
                    }}
                    aria-current={isActive ? 'true' : undefined}
                    aria-label={`${item.role} at ${item.company}`}
                  >
                    <span className="exp-constellation__marker" aria-hidden="true">
                      <CompanyLogo
                        experience={item}
                        isCurrent={item.isCurrent}
                        className="exp-constellation__logo"
                      />
                    </span>

                    <span className="exp-constellation__copy">
                      <span className="exp-constellation__node-label">
                        {getCompanyShortName(item.company)}
                      </span>
                      <span className="exp-constellation__node-period">{startYear}</span>
                    </span>
                  </button>
                </li>
              )
            })}
          </ol>
        </div>
      </div>
    </nav>
  )
}
