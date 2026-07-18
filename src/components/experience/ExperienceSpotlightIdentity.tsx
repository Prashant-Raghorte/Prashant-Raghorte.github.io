import type { Experience } from '@/types'
import { ExternalLinkIcon } from '@/components/ui/icons'
import { CompanyLogo } from '@/components/experience/CompanyLogo'
import './ExperienceSpotlightIdentity.css'

type ExperienceSpotlightIdentityProps = {
  experience: Experience
}

export function ExperienceSpotlightIdentity({ experience }: ExperienceSpotlightIdentityProps) {
  return (
    <header
      className="exp-spotlight-id"
      aria-label={`${experience.role} at ${experience.company}`}
    >
      <CompanyLogo
        experience={experience}
        isCurrent={experience.isCurrent}
        className="exp-spotlight-id__logo"
      />

      <div className="exp-spotlight-id__role-wrap">
        <h2 className="exp-spotlight-id__role">{experience.role}</h2>
        {experience.isCurrent ? <span className="exp-spotlight-id__badge">Current</span> : null}
      </div>

      <div className="exp-spotlight-id__company-wrap">
        {experience.companyUrl ? (
          <a
            href={experience.companyUrl}
            target="_blank"
            rel="noreferrer"
            className="exp-spotlight-id__company exp-spotlight-id__company--link"
          >
            <span>{experience.company}</span>
            <ExternalLinkIcon />
          </a>
        ) : (
          <p className="exp-spotlight-id__company">{experience.company}</p>
        )}
      </div>

      <time className="exp-spotlight-id__meta exp-spotlight-id__meta--period" dateTime={experience.period}>
        {experience.period}
      </time>
      <span className="exp-spotlight-id__meta exp-spotlight-id__meta--location">
        {experience.location}
      </span>
    </header>
  )
}
