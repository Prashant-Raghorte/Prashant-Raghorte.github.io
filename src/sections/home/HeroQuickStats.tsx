import type { CSSProperties } from 'react'
import { heroQuickStats } from '@/config/stats'
import { useHomeSectionNav } from '@/hooks/useHomeSectionNav'
import './HeroQuickStats.css'

function ExperienceIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M4 9h16v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V9Z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function ProjectsIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M4 7.5 12 3l8 4.5-8 4.5-8-4.5ZM4 12.5l8 4.5 8-4.5M4 17.5l8 4.5 8-4.5"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function LocationIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 21s6-5.2 6-10a6 6 0 1 0-12 0c0 4.8 6 10 6 10Z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="11" r="2.25" stroke="currentColor" strokeWidth="1.75" />
    </svg>
  )
}

const STAT_ICONS = {
  experience: ExperienceIcon,
  projects: ProjectsIcon,
  location: LocationIcon,
} as const

export function HeroQuickStats() {
  const goToSection = useHomeSectionNav()

  return (
    <div className="hero-stats-shell hero-stats-shell--hover">
      <span className="hero-stats-shine" aria-hidden="true" />

      <dl className="hero-stats">
        {heroQuickStats.map((stat, index) => {
          const Icon = STAT_ICONS[stat.id]

          return (
            <div key={stat.id} className="hero-stats__item-wrap">
              <button
                type="button"
                className="hero-stats__item"
                style={{ '--hero-stats-delay': `${0.12 + index * 0.1}s` } as CSSProperties}
                onClick={() => goToSection(stat.sectionId)}
                aria-label={`${stat.value} ${stat.label} — ${stat.navLabel}`}
              >
                <span className="hero-stats__glow" aria-hidden="true" />
                <span className={`hero-stats__icon hero-stats__icon--${stat.id}`} aria-hidden="true">
                  <Icon />
                </span>
                <span className="hero-stats__copy">
                  <span className="hero-stats__value">{stat.value}</span>
                  <span className="hero-stats__label">{stat.label}</span>
                </span>
              </button>
            </div>
          )
        })}
      </dl>
    </div>
  )
}
