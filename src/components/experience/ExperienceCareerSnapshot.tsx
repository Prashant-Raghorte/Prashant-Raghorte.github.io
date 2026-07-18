import { Link } from 'react-router-dom'
import type { CSSProperties } from 'react'
import type { Experience } from '@/types'
import { siteCopy } from '@/config/copy'
import { ArrowRightIcon } from '@/components/ui/icons'
import { CompanyLogo } from '@/components/experience/CompanyLogo'
import { ShineBorderCard } from '@/components/ui/ShineBorderCard'
import { ROUTES } from '@/constants'
import { useInView } from '@/hooks/useInView'
import {
  getCareerStats,
  getCompanyShortName,
  getExperienceAnchorId,
  YEARS_EXPERIENCE,
} from '@/utils/experienceHelpers'
import '@/components/common/ViewAllCard.css'
import './ExperienceCareerSnapshot.css'
import '@/components/experience/CompanyLogo.css'

type ExperienceCareerSnapshotProps = {
  items: Experience[]
  variant?: 'home' | 'page'
  activeId?: string
}

export function ExperienceCareerSnapshot({
  items,
  variant = 'home',
  activeId,
}: ExperienceCareerSnapshotProps) {
  if (variant === 'page') {
    return <PageCareerNav items={items} activeId={activeId} />
  }

  return <HomeCareerSnapshot items={items} />
}

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

type PageCareerNavProps = {
  items: Experience[]
  activeId?: string
}

function PageCareerNav({ items, activeId }: PageCareerNavProps) {
  const { ref, inView } = useInView<HTMLElement>({ threshold: 0.12 })
  const copy = siteCopy.sections.experiencePage

  const handlePathClick = (id: string) => {
    document.getElementById(getExperienceAnchorId(id))?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }

  return (
    <aside
      ref={ref}
      className={['career-nav', inView ? 'career-nav--in-view' : ''].filter(Boolean).join(' ')}
      aria-label={copy.navTitle}
    >
      <ShineBorderCard hoverOnly className="career-nav__card">
        <div className="career-nav__inner">
          <header className="career-nav__head">
            <span className="career-nav__accent" aria-hidden="true" />
            <div className="career-nav__head-copy">
              <h3 className="career-nav__title">{copy.navTitle}</h3>
              <p className="career-nav__hint">{copy.navHint}</p>
            </div>
          </header>

          <ol className="career-nav__list">
            {items.map((item, index) => {
              const isActive = item.id === activeId

              return (
                <li
                  key={item.id}
                  style={{ '--career-nav-delay': `${index * 70 + 100}ms` } as CSSProperties}
                >
                  <button
                    type="button"
                    className={[
                      'career-nav__item',
                      item.isCurrent ? 'career-nav__item--current' : '',
                      isActive ? 'career-nav__item--active' : '',
                    ]
                      .filter(Boolean)
                      .join(' ')}
                    onClick={() => handlePathClick(item.id)}
                    aria-current={isActive ? 'true' : undefined}
                  >
                    <span className="career-nav__marker" aria-hidden="true">
                      <span
                        className={[
                          'career-nav__dot',
                          item.isCurrent ? 'career-nav__dot--current' : '',
                        ]
                          .filter(Boolean)
                          .join(' ')}
                      />
                      {index < items.length - 1 ? (
                        <span className="career-nav__connector" aria-hidden="true" />
                      ) : null}
                    </span>
                    <CompanyLogo experience={item} className="career-nav__logo" />
                    <span className="career-nav__copy">
                      <span className="career-nav__role">{item.role}</span>
                      <span className="career-nav__company">
                        {getCompanyShortName(item.company)}
                      </span>
                    </span>
                    <span className="career-nav__period">{item.period}</span>
                  </button>
                </li>
              )
            })}
          </ol>
        </div>
      </ShineBorderCard>
    </aside>
  )
}

type HomeCareerSnapshotProps = {
  items: Experience[]
}

function HomeCareerSnapshot({ items }: HomeCareerSnapshotProps) {
  const { ref, inView } = useInView<HTMLElement>({ threshold: 0.12 })
  const currentRole = items.find((item) => item.isCurrent) ?? items[0]
  const careerStats = getCareerStats(items)

  return (
    <aside
      ref={ref}
      className={[
        'career-snapshot',
        'career-snapshot--home',
        inView ? 'career-snapshot--in-view' : '',
      ]
        .filter(Boolean)
        .join(' ')}
      aria-label="Work experience snapshot"
    >
      <ShineBorderCard hoverOnly className="career-snapshot__card">
        <div className="career-snapshot__inner">
          <div className="career-snapshot__orbit career-snapshot__orbit--standalone" aria-hidden="true">
            <span className="career-snapshot__orbit-ring career-snapshot__orbit-ring--outer" />
            <span className="career-snapshot__orbit-ring career-snapshot__orbit-ring--inner" />
            <span className="career-snapshot__orbit-glow" />
            <span className="career-snapshot__orbit-value">{YEARS_EXPERIENCE}</span>
          </div>
          <p className="career-snapshot__snapshot-label">Years building backends</p>

          {currentRole ? (
            <div className="career-snapshot__current">
              <span className="career-snapshot__current-label">Currently</span>
              <div className="career-snapshot__current-head">
                <CompanyLogo experience={currentRole} className="career-snapshot__current-logo" />
                <div className="career-snapshot__current-copy">
                  <p className="career-snapshot__current-role">{currentRole.role}</p>
                  <p className="career-snapshot__current-company">{currentRole.company}</p>
                </div>
              </div>

              <ul className="career-snapshot__live-meta">
                <li className="career-snapshot__live-item">
                  <span className="career-snapshot__live-icon" aria-hidden="true">
                    <CalendarIcon />
                  </span>
                  <span className="career-snapshot__live-copy">
                    <span className="career-snapshot__live-item-label">Since</span>
                    <span className="career-snapshot__live-item-value">{currentRole.period}</span>
                  </span>
                </li>
                <li className="career-snapshot__live-item">
                  <span className="career-snapshot__live-icon" aria-hidden="true">
                    <LocationIcon />
                  </span>
                  <span className="career-snapshot__live-copy">
                    <span className="career-snapshot__live-item-label">Based in</span>
                    <span className="career-snapshot__live-item-value">{currentRole.location}</span>
                  </span>
                </li>
              </ul>
            </div>
          ) : null}

          <ul className="career-snapshot__stats" aria-label="Career highlights">
            {careerStats.map((stat, index) => (
              <li
                key={stat.id}
                style={{ '--career-snapshot-stat-delay': `${index * 55 + 120}ms` } as CSSProperties}
              >
                <span className="career-snapshot__stat-value">{stat.value}</span>
                <span className="career-snapshot__stat-label">{stat.label}</span>
              </li>
            ))}
          </ul>

          <section className="career-snapshot__path" aria-label="Career path">
            <div className="career-snapshot__path-head">
              <span className="career-snapshot__path-accent" aria-hidden="true" />
              <h3 className="career-snapshot__path-title">Career path</h3>
            </div>
            <ol className="career-snapshot__path-list">
              {items.map((item, index) => (
                <li key={item.id}>
                  <div
                    className={[
                      'career-snapshot__path-item',
                      item.isCurrent ? 'career-snapshot__path-item--current' : '',
                    ]
                      .filter(Boolean)
                      .join(' ')}
                  >
                    <div className="career-snapshot__path-marker" aria-hidden="true">
                      <span
                        className={[
                          'career-snapshot__path-indicator',
                          item.isCurrent ? 'career-snapshot__path-indicator--current' : '',
                        ]
                          .filter(Boolean)
                          .join(' ')}
                      />
                      {index < items.length - 1 ? (
                        <span className="career-snapshot__path-connector" aria-hidden="true" />
                      ) : null}
                    </div>
                    <CompanyLogo experience={item} className="career-snapshot__path-logo" />
                    <div className="career-snapshot__path-copy">
                      <span className="career-snapshot__path-role">{item.role}</span>
                      <span className="career-snapshot__path-company">
                        {getCompanyShortName(item.company)}
                        <span className="career-snapshot__path-sep" aria-hidden="true">
                          ·
                        </span>
                        {item.location.split(',')[0]?.trim() ?? item.location}
                      </span>
                    </div>
                    <span className="career-snapshot__path-period">{item.period}</span>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          <ShineBorderCard hoverOnly className="career-snapshot__cta-shine view-all-rail__shine">
            <Link
              to={ROUTES.EXPERIENCE}
              className="view-all-rail__pill career-snapshot__cta"
              aria-label={siteCopy.viewAll.experience.title}
            >
              <span className="view-all-rail__label">{siteCopy.viewAll.experience.title}</span>
              <span className="view-all-rail__arrow" aria-hidden="true">
                <ArrowRightIcon />
              </span>
            </Link>
          </ShineBorderCard>
        </div>
      </ShineBorderCard>
    </aside>
  )
}
