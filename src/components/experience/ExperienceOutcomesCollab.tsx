import type { CSSProperties, ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { siteConfig } from '@/config/site'
import { getResumeDownloadFilename, siteCopy } from '@/config/copy'
import { AvailabilityBadge } from '@/components/common'
import { Button } from '@/components/ui/Button'
import { DownloadIcon } from '@/components/ui/icons'
import { ROUTES } from '@/constants'
import { aboutAvailability } from '@/data/about'
import { YEARS_EXPERIENCE } from '@/utils/experienceHelpers'
import './ExperienceOutcomesCollab.css'

const experienceCopy = siteCopy.sections.experiencePage

type ExperienceOutcomesCollabProps = {
  title: string
  viewProjectsLabel: string
  getInTouchLabel: string
}

const COLLAB_STATS = [
  { value: YEARS_EXPERIENCE, label: 'Years building' },
  { value: '1–2 days', label: 'Typical reply' },
  { value: 'IST', label: 'Timezone' },
] as const

const MODE_LABELS: Record<string, string> = {
  'Full-time roles': 'Full-time',
  'Freelance projects': 'Freelance',
  'Remote opportunities': 'Remote',
}

const MODE_ICONS: Record<string, () => ReactNode> = {
  'Full-time roles': () => (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3.5" y="7.5" width="17" height="12" rx="2" stroke="currentColor" strokeWidth="1.75" />
      <path
        d="M8.5 7.5V6a3 3 0 0 1 3-3h1a3 3 0 0 1 3 3v1.5"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </svg>
  ),
  'Freelance projects': () => (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M7.5 8.5 12 4l4.5 4.5M12 4v11.5M5.5 20h13"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  'Remote opportunities': () => (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.75" />
      <path
        d="M3.5 12h17M12 3.5c2.2 2.6 3.5 5.7 3.5 8.5s-1.3 5.9-3.5 8.5c-2.2-2.6-3.5-5.7-3.5-8.5S9.8 6.1 12 3.5Z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </svg>
  ),
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="m5 12h14M13 6l6 6-6 6"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function PinIcon() {
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

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="m5.5 12.5 3.5 3.5L18.5 6.5"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function ExperienceOutcomesCollab({
  title,
  viewProjectsLabel,
  getInTouchLabel,
}: ExperienceOutcomesCollabProps) {
  return (
    <div className="exp-collab">
      <span className="exp-collab__mesh" aria-hidden="true" />
      <span className="exp-collab__rail" aria-hidden="true" />

      <p className="exp-collab__where">
        <span className="exp-collab__where-pin" aria-hidden="true">
          <PinIcon />
        </span>
        <span className="exp-collab__where-copy">
          <span className="exp-collab__where-city">{siteConfig.location}</span>
        </span>
      </p>

      <div className="exp-collab__meta">
        <AvailabilityBadge className="exp-collab__availability" />
      </div>

      <div className="exp-collab__hero">
        <p className="exp-collab__eyebrow">Collaboration</p>
        <h3 className="exp-collab__title">{title}</h3>
        <p className="exp-collab__lede">{experienceCopy.collabLede}</p>
      </div>

      <div className="exp-collab__body">
        <ul className="exp-collab__stats" aria-label="Collaboration snapshot">
          {COLLAB_STATS.map((stat, index) => (
            <li
              key={stat.label}
              className="exp-collab__stat"
              style={{ '--exp-collab-delay': `${index * 70 + 80}ms` } as CSSProperties}
            >
              <span className="exp-collab__stat-value">{stat.value}</span>
              <span className="exp-collab__stat-label">{stat.label}</span>
            </li>
          ))}
        </ul>

        <ul className="exp-collab__modes" aria-label="Open to">
          {aboutAvailability.map((item, index) => {
            const Icon = MODE_ICONS[item] ?? MODE_ICONS['Full-time roles']!
            const hint = experienceCopy.collabModeHints[item]

            return (
              <li
                key={item}
                className="exp-collab__mode"
                aria-label={item}
                style={{ '--exp-collab-delay': `${index * 80 + 180}ms` } as CSSProperties}
              >
                <span className="exp-collab__mode-icon" aria-hidden="true">
                  <Icon />
                </span>
                <span className="exp-collab__mode-copy">
                  <span className="exp-collab__mode-label">{MODE_LABELS[item] ?? item}</span>
                  {hint ? <span className="exp-collab__mode-hint">{hint}</span> : null}
                </span>
              </li>
            )
          })}
        </ul>

        <div className="exp-collab__strengths">
          <p className="exp-collab__strengths-label">{experienceCopy.collabStrengthsLabel}</p>
          <ul className="exp-collab__strengths-list">
            {experienceCopy.collabStrengths.map((item, index) => (
              <li
                key={item}
                className="exp-collab__strength"
                style={{ '--exp-collab-delay': `${index * 70 + 320}ms` } as CSSProperties}
              >
                <span className="exp-collab__strength-icon" aria-hidden="true">
                  <CheckIcon />
                </span>
                <span className="exp-collab__strength-text">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="exp-collab__dock">
        <Button
          variant="shine"
          href={siteConfig.resumeUrl}
          download={getResumeDownloadFilename(siteConfig.name)}
          icon={<DownloadIcon />}
          className="exp-collab__download"
        >
          {siteCopy.footer.downloadCv}
        </Button>

        <div className="exp-collab__channels">
          <Link className="exp-collab__channel" to={ROUTES.PROJECTS}>
            <span className="exp-collab__channel-copy">
              <span className="exp-collab__channel-label">{viewProjectsLabel}</span>
              <span className="exp-collab__channel-hint">See shipped work</span>
            </span>
            <span className="exp-collab__channel-arrow" aria-hidden="true">
              <ArrowIcon />
            </span>
          </Link>
          <Link className="exp-collab__channel" to={ROUTES.CONTACT}>
            <span className="exp-collab__channel-copy">
              <span className="exp-collab__channel-label">{getInTouchLabel}</span>
              <span className="exp-collab__channel-hint">Reply in 1–2 business days</span>
            </span>
            <span className="exp-collab__channel-arrow" aria-hidden="true">
              <ArrowIcon />
            </span>
          </Link>
        </div>
      </div>
    </div>
  )
}
