import type { Experience } from '@/types'
import { ExternalLinkIcon } from '@/components/ui/icons'
import { CompanyLogo } from '@/components/experience/CompanyLogo'
import './ExperienceRoleIdentity.css'

type ExperienceRoleIdentityProps = {
  experience: Experience
  headingLevel?: 'h2' | 'h3'
  className?: string
  titleOrder?: 'role-first' | 'company-first'
}

export function ExperienceRoleIdentity({
  experience,
  headingLevel = 'h3',
  className = '',
  titleOrder = 'role-first',
}: ExperienceRoleIdentityProps) {
  const RoleTag = headingLevel

  const companyNode = experience.companyUrl ? (
    <a
      href={experience.companyUrl}
      target="_blank"
      rel="noreferrer"
      className="exp-identity__company exp-identity__company--link"
    >
      <span>{experience.company}</span>
      <ExternalLinkIcon />
    </a>
  ) : (
    <p className="exp-identity__company">{experience.company}</p>
  )

  const roleNode = <RoleTag className="exp-identity__role">{experience.role}</RoleTag>

  const titleBlock =
    titleOrder === 'role-first' ? (
      <>
        <div className="exp-identity__role-row">
          {roleNode}
          {experience.isCurrent ? <span className="exp-identity__badge">Current</span> : null}
        </div>
        {companyNode}
      </>
    ) : (
      <>
        <div className="exp-identity__company-row">
          {companyNode}
          {experience.isCurrent ? <span className="exp-identity__badge">Current</span> : null}
        </div>
        {roleNode}
      </>
    )

  return (
    <header
      className={['exp-identity', className].filter(Boolean).join(' ')}
      aria-label={`${experience.role} at ${experience.company}`}
    >
      <div className="exp-identity__surface">
        <div className="exp-identity__brand">
          <div className="exp-identity__logo-frame" aria-hidden="true">
            <span className="exp-identity__logo-ring" />
            <CompanyLogo
              experience={experience}
              isCurrent={experience.isCurrent}
              className="exp-identity__logo"
            />
          </div>

          <div
            className={[
              'exp-identity__copy',
              titleOrder === 'role-first' ? 'exp-identity__copy--role-first' : '',
            ]
              .filter(Boolean)
              .join(' ')}
          >
            {titleBlock}
          </div>
        </div>

        <dl className="exp-identity__facts">
          <div className="exp-identity__fact">
            <dt className="exp-identity__fact-label">Period</dt>
            <dd className="exp-identity__fact-value">
              <time dateTime={experience.period}>{experience.period}</time>
            </dd>
          </div>
          <div className="exp-identity__fact">
            <dt className="exp-identity__fact-label">Location</dt>
            <dd className="exp-identity__fact-value">{experience.location}</dd>
          </div>
        </dl>
      </div>
    </header>
  )
}
