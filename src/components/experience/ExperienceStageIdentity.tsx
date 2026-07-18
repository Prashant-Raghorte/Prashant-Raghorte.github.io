import type { Experience } from '@/types'
import { CompanyLogo } from '@/components/experience/CompanyLogo'
import { getStageCompanyDisplay } from '@/utils/experienceHelpers'
import './ExperienceStageIdentity.css'

type ExperienceStageIdentityProps = {
  experience: Experience
}

function CalendarIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" className="exp-stage-id__line-icon">
      <rect x="2" y="3" width="12" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.25" />
      <path d="M2 6.5h12M5.25 1.75V4M10.75 1.75V4" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
    </svg>
  )
}

function LocationIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" className="exp-stage-id__line-icon">
      <path
        d="M8 8.25a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"
        stroke="currentColor"
        strokeWidth="1.25"
      />
      <path
        d="M8 14s4.5-3.56 4.5-7.25a4.5 4.5 0 1 0-9 0C3.5 10.44 8 14 8 14Z"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function ExperienceStageIdentity({ experience }: ExperienceStageIdentityProps) {
  const companyName = getStageCompanyDisplay(experience.company)

  return (
    <header
      className={[
        'exp-stage-id',
        experience.isCurrent ? 'exp-stage-id--current' : '',
      ]
        .filter(Boolean)
        .join(' ')}
      aria-label={`${experience.role} at ${companyName}`}
    >
      <CompanyLogo
        experience={experience}
        isCurrent={experience.isCurrent}
        className="exp-stage-id__logo"
      />

      <div className="exp-stage-id__lines">
        <h2 className="exp-stage-id__role">{experience.role}</h2>

        <div className="exp-stage-id__company-row">
          {experience.companyUrl ? (
            <a
              href={experience.companyUrl}
              target="_blank"
              rel="noreferrer"
              className="exp-stage-id__company-link"
              aria-label={`${companyName} (opens company site in a new tab)`}
            >
              {companyName}
            </a>
          ) : (
            <span className="exp-stage-id__company-text">{companyName}</span>
          )}
        </div>

        <p className="exp-stage-id__period">
          <CalendarIcon />
          <time dateTime={experience.period}>{experience.period}</time>
        </p>

        <p className="exp-stage-id__location">
          <LocationIcon />
          <span>{experience.location}</span>
        </p>
      </div>
    </header>
  )
}
