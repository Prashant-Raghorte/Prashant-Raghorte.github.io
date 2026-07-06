import type { CSSProperties } from 'react'
import type { Experience } from '@/types'
import { siteConfig } from '@/config/site'
import { siteCopy } from '@/config/copy'
import { AvailabilityBadge } from '@/components/common'
import { CompanyLogo } from '@/components/experience/CompanyLogo'
import { ShineBorderCard } from '@/components/ui/ShineBorderCard'
import { useSpotlight } from '@/hooks/useSpotlight'
import { aboutFocusAreas } from '@/data/about'
import {
  getTotalHighlights,
  getUniqueCompanies,
  getExperienceAnchorId,
  YEARS_EXPERIENCE,
} from '@/utils/experienceHelpers'
import { buildHeroTechStack } from '@/utils/experienceTags'
import { experienceKeyWins } from '@/data/portfolio'
import './ExperiencePageIntro.css'
import '@/components/experience/CompanyLogo.css'

type ExperiencePageIntroProps = {
  items: Experience[]
  inView: boolean
}

export function ExperiencePageIntro({ items, inView }: ExperiencePageIntroProps) {
  const { spotlight, handleMouseMove, handleMouseLeave } = useSpotlight<HTMLDivElement>()
  const copy = siteCopy.sections.experiencePage
  const currentRole = items.find((item) => item.isCurrent)
  const techStack = buildHeroTechStack(
    aboutFocusAreas,
    items.flatMap((item) => item.highlights),
  )

  const heroStats = [
    { id: 'years', value: YEARS_EXPERIENCE, label: 'Years' },
    { id: 'roles', value: String(items.length), label: 'Roles' },
    { id: 'impacts', value: String(getTotalHighlights(items)), label: 'Impacts' },
    { id: 'companies', value: String(getUniqueCompanies(items).length), label: 'Companies' },
  ]

  const scrollToRole = (id: string) => {
    document.getElementById(getExperienceAnchorId(id))?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }

  return (
    <section
      className={['career-hero', inView ? 'career-hero--in-view' : ''].filter(Boolean).join(' ')}
      aria-label={copy.snapshotTitle}
    >
      <ShineBorderCard hoverOnly className="career-hero__card">
        <div
          className="career-hero__inner"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={
            {
              '--career-hero-spot-x': `${spotlight.x}%`,
              '--career-hero-spot-y': `${spotlight.y}%`,
            } as CSSProperties
          }
        >
          <span className="career-hero__mesh" aria-hidden="true" />
          <span
            className={[
              'career-hero__spotlight',
              spotlight.active ? 'career-hero__spotlight--active' : '',
            ]
              .filter(Boolean)
              .join(' ')}
            aria-hidden="true"
          />

          <header className="career-hero__head">
            <div className="career-hero__head-main">
              <p className="career-hero__eyebrow">{copy.snapshotTitle}</p>
              <h2 className="career-hero__title">{copy.introTitle}</h2>
            </div>
            <div className="career-hero__head-badges">
              {currentRole ? (
                <span className="career-hero__live">
                  <span className="career-hero__live-dot" aria-hidden="true" />
                  {copy.snapshotLive}
                </span>
              ) : null}
              <AvailabilityBadge className="career-hero__availability" />
            </div>
          </header>

          <div className="career-hero__bento">
            <div className="career-hero__intro">
            <div className="career-hero__orbit-panel">
              <div className="career-hero__orbit-visual" aria-hidden="true">
                <div className="career-hero__orbit-wrap">
                  <svg className="career-hero__arc" viewBox="0 0 100 100" aria-hidden="true">
                    <circle className="career-hero__arc-track" cx="50" cy="50" r="44" fill="none" />
                    <circle className="career-hero__arc-fill" cx="50" cy="50" r="44" fill="none" />
                  </svg>
                  <div className="career-hero__orbit">
                    <span className="career-hero__orbit-ring career-hero__orbit-ring--outer" />
                    <span className="career-hero__orbit-ring career-hero__orbit-ring--inner" />
                    <span className="career-hero__orbit-glow" />
                    <span className="career-hero__orbit-value">{YEARS_EXPERIENCE}</span>
                  </div>
                </div>
              </div>
              <div className="career-hero__orbit-copy">
                <p className="career-hero__orbit-label">Years building backends</p>
                <p className="career-hero__location">{siteConfig.location}</p>
              </div>
              <aside className="career-hero__orbit-highlight" aria-label={copy.craftLabel}>
                <span className="career-hero__orbit-highlight-label">{copy.craftLabel}</span>
                <ul className="career-hero__orbit-highlight-list">
                  <li>{copy.craftTitle}</li>
                  <li>{copy.craftAi}</li>
                </ul>
              </aside>
            </div>

            <div className="career-hero__story">
              <p className="career-hero__lede text-fluid-sm">{copy.lede}</p>

              <div className="career-hero__stack">
                <span className="career-hero__stack-label">{copy.stackLabel}</span>
                <ul className="career-hero__stack-chips" aria-label={copy.stackLabel}>
                  {techStack.map((item) => (
                    <li
                      key={item.label}
                      className={
                        item.variant === 'production' ? 'career-hero__stack-chip--production' : ''
                      }
                    >
                      {item.label}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            </div>

            <ul className="career-hero__stats" aria-label="Career metrics">
              {heroStats.map((stat, index) => (
                <li
                  key={stat.id}
                  style={{ '--career-hero-stat-delay': `${index * 70 + 100}ms` } as CSSProperties}
                >
                  <span className="career-hero__stat-value">{stat.value}</span>
                  <span className="career-hero__stat-label">{stat.label}</span>
                </li>
              ))}
            </ul>

            <nav className="career-hero__path" aria-label={copy.pathLabel}>
              <div className="career-hero__path-head">
                <span className="career-hero__path-accent" aria-hidden="true" />
                <div className="career-hero__path-copy">
                  <h3 className="career-hero__path-title">{copy.pathLabel}</h3>
                  <p className="career-hero__path-hint">{copy.pathHint}</p>
                </div>
              </div>
              <div className="career-hero__path-scroll">
                <ol className="career-hero__path-track">
                  {items.map((item, index) => (
                    <li
                      key={item.id}
                      style={{ '--career-hero-path-delay': `${index * 80 + 140}ms` } as CSSProperties}
                    >
                      <button
                        type="button"
                        className={[
                          'career-hero__path-step',
                          item.isCurrent ? 'career-hero__path-step--current' : '',
                        ]
                          .filter(Boolean)
                          .join(' ')}
                        onClick={() => scrollToRole(item.id)}
                      >
                        <CompanyLogo experience={item} className="career-hero__path-logo" />
                        <span className="career-hero__path-role">{item.role}</span>
                        <span className="career-hero__path-period">{item.period}</span>
                        {item.isCurrent ? (
                          <span className="career-hero__path-badge">Now</span>
                        ) : null}
                      </button>
                      {index < items.length - 1 ? (
                        <span className="career-hero__path-connector" aria-hidden="true" />
                      ) : null}
                    </li>
                  ))}
                </ol>
              </div>
            </nav>

            <div className="career-hero__wins">
              <div className="career-hero__wins-head">
                <span className="career-hero__wins-accent" aria-hidden="true" />
                <h3 className="career-hero__wins-title">{copy.winsLabel}</h3>
              </div>
              <ul className="career-hero__wins-grid">
                {experienceKeyWins.map((win, index) => (
                  <li
                    key={win.id}
                    style={{ '--career-hero-win-delay': `${index * 75 + 160}ms` } as CSSProperties}
                  >
                    <article className="career-hero__win">
                      <span className="career-hero__win-value">{win.value}</span>
                      <span className="career-hero__win-label">{win.label}</span>
                      <span className="career-hero__win-detail">{win.detail}</span>
                    </article>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </ShineBorderCard>
    </section>
  )
}
