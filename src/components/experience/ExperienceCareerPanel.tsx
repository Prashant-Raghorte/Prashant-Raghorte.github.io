import type { CSSProperties } from 'react'
import type { Experience } from '@/types'
import { CompanyLogo } from '@/components/experience/CompanyLogo'
import { ShineBorderCard } from '@/components/ui/ShineBorderCard'
import {
  getCareerStats,
  getCompanyShortName,
  getExperienceAnchorId,
  YEARS_EXPERIENCE,
} from '@/utils/experienceHelpers'
import { scrollToElement } from '@/utils/scroll'
import './ExperienceCareerPanel.css'

function CalendarIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3.5" y="5.5" width="17" height="15" rx="2.5" stroke="currentColor" strokeWidth="1.75" />
      <path d="M8 3.5v3M16 3.5v3M3.5 10h17" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
    </svg>
  )
}

function LocationIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 21s7-4.5 7-11a7 7 0 1 0-14 0c0 6.5 7 11 7 11Z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.75" />
    </svg>
  )
}

type ExperienceCareerPanelProps = {
  items: Experience[]
  activeId: string
  inView: boolean
}

export function ExperienceCareerPanel({ items, activeId, inView }: ExperienceCareerPanelProps) {
  const currentRole = items.find((item) => item.isCurrent) ?? items[0]
  const careerStats = getCareerStats(items)

  const handleNavClick = (id: string) => {
    const element = document.getElementById(getExperienceAnchorId(id))
    if (element) scrollToElement(element)
  }

  return (
    <aside
      className={['exp-panel', inView ? 'exp-panel--in-view' : ''].filter(Boolean).join(' ')}
      aria-label="Career overview"
    >
      <ShineBorderCard hoverOnly className="exp-panel__card">
        <div className="exp-panel__inner">
          <div className="exp-panel__orbit" aria-hidden="true">
            <span className="exp-panel__orbit-ring exp-panel__orbit-ring--outer" />
            <span className="exp-panel__orbit-ring exp-panel__orbit-ring--inner" />
            <span className="exp-panel__orbit-glow" />
            <span className="exp-panel__orbit-value">{YEARS_EXPERIENCE}</span>
          </div>
          <p className="exp-panel__orbit-label">Years building backends</p>

          {currentRole && (
            <div className="exp-panel__current">
              <span className="exp-panel__current-label">Currently</span>
              <div className="exp-panel__current-head">
                <CompanyLogo experience={currentRole} className="exp-panel__current-logo" />
                <div className="exp-panel__current-copy">
                  <p className="exp-panel__current-role">{currentRole.role}</p>
                  <p className="exp-panel__current-company">{currentRole.company}</p>
                </div>
              </div>

              <ul className="exp-panel__live-meta">
                <li className="exp-panel__live-item">
                  <span className="exp-panel__live-icon" aria-hidden="true">
                    <CalendarIcon />
                  </span>
                  <span className="exp-panel__live-copy">
                    <span className="exp-panel__live-label">Since</span>
                    <span className="exp-panel__live-value">{currentRole.period}</span>
                  </span>
                </li>
                <li className="exp-panel__live-item">
                  <span className="exp-panel__live-icon" aria-hidden="true">
                    <LocationIcon />
                  </span>
                  <span className="exp-panel__live-copy">
                    <span className="exp-panel__live-label">Based in</span>
                    <span className="exp-panel__live-value">{currentRole.location}</span>
                  </span>
                </li>
              </ul>
            </div>
          )}

          <ul className="exp-panel__stats" aria-label="Career highlights">
            {careerStats.map((stat, index) => (
              <li
                key={stat.id}
                style={{ '--exp-panel-delay': `${index * 70 + 120}ms` } as CSSProperties}
              >
                <span className="exp-panel__stat-value">{stat.value}</span>
                <span className="exp-panel__stat-label">{stat.label}</span>
              </li>
            ))}
          </ul>

          <nav className="exp-panel__nav" aria-label="Jump to role">
            <div className="exp-panel__nav-head">
              <span className="exp-panel__nav-accent" aria-hidden="true" />
              <h3 className="exp-panel__nav-title">Roles</h3>
            </div>
            <ol className="exp-panel__nav-list">
              {items.map((item, index) => {
                const isActive = item.id === activeId

                return (
                  <li key={item.id}>
                    <button
                      type="button"
                      className={[
                        'exp-panel__nav-btn',
                        isActive ? 'exp-panel__nav-btn--active' : '',
                        item.isCurrent ? 'exp-panel__nav-btn--current' : '',
                      ]
                        .filter(Boolean)
                        .join(' ')}
                      onClick={() => handleNavClick(item.id)}
                      aria-current={isActive ? 'true' : undefined}
                    >
                      <span className="exp-panel__nav-marker" aria-hidden="true">
                        <span className="exp-panel__nav-dot" />
                        {index < items.length - 1 && <span className="exp-panel__nav-connector" />}
                      </span>
                      <CompanyLogo experience={item} className="exp-panel__nav-logo" />
                      <span className="exp-panel__nav-copy">
                        <span className="exp-panel__nav-role">{item.role}</span>
                        <span className="exp-panel__nav-company">
                          {getCompanyShortName(item.company)}
                        </span>
                      </span>
                      <span className="exp-panel__nav-period">{item.period}</span>
                    </button>
                  </li>
                )
              })}
            </ol>
          </nav>
        </div>
      </ShineBorderCard>
    </aside>
  )
}
