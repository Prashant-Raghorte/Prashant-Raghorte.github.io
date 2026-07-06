import type { CSSProperties } from 'react'
import type { Experience } from '@/types'
import { siteCopy } from '@/config/copy'
import { ExternalLinkIcon } from '@/components/ui/icons'
import { CompanyLogo } from '@/components/experience/CompanyLogo'
import { ShineBorderCard } from '@/components/ui/ShineBorderCard'
import { useSpotlight } from '@/hooks/useSpotlight'
import { getActiveExperience } from '@/utils/experienceHelpers'
import { extractExperienceTags } from '@/utils/experienceTags'
import './ExperienceRoleSpotlight.css'
import '@/components/experience/CompanyLogo.css'

type ExperienceRoleSpotlightProps = {
  items: Experience[]
  activeId: string
  inView: boolean
}

export function ExperienceRoleSpotlight({
  items,
  activeId,
  inView,
}: ExperienceRoleSpotlightProps) {
  const role = getActiveExperience(items, activeId)
  const { spotlight, handleMouseMove, handleMouseLeave } = useSpotlight<HTMLDivElement>()
  const tags = extractExperienceTags(role.highlights, 4)
  const copy = siteCopy.sections.experiencePage

  return (
    <div
      className={['exp-spotlight', inView ? 'exp-spotlight--in-view' : ''].filter(Boolean).join(' ')}
      aria-live="polite"
      aria-atomic="true"
    >
      <ShineBorderCard hoverOnly className="exp-spotlight__card">
        <div
          key={role.id}
          className="exp-spotlight__inner"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={
            {
              '--exp-spotlight-x': `${spotlight.x}%`,
              '--exp-spotlight-y': `${spotlight.y}%`,
            } as CSSProperties
          }
        >
          <span
            className={[
              'exp-spotlight__glow',
              spotlight.active ? 'exp-spotlight__glow--active' : '',
            ]
              .filter(Boolean)
              .join(' ')}
            aria-hidden="true"
          />

          <span className="exp-spotlight__label">{copy.spotlightLabel}</span>

          <div className="exp-spotlight__main">
            <CompanyLogo experience={role} isCurrent={role.isCurrent} className="exp-spotlight__logo" />

            <div className="exp-spotlight__copy">
              <div className="exp-spotlight__title-row">
                <h3 className="exp-spotlight__role">{role.role}</h3>
                {role.isCurrent ? <span className="exp-spotlight__badge">Current</span> : null}
              </div>

              {role.companyUrl ? (
                <a
                  href={role.companyUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="exp-spotlight__company exp-spotlight__company--link"
                >
                  {role.company}
                  <ExternalLinkIcon />
                </a>
              ) : (
                <p className="exp-spotlight__company">{role.company}</p>
              )}

              <p className="exp-spotlight__impact">{role.highlights[0]}</p>
            </div>

            <div className="exp-spotlight__meta">
              <span className="exp-spotlight__pill">{role.period}</span>
              <span className="exp-spotlight__pill">{role.location}</span>
              <span className="exp-spotlight__pill exp-spotlight__pill--accent">
                {role.highlights.length} impacts
              </span>
            </div>
          </div>

          {tags.length > 0 ? (
            <ul className="exp-spotlight__tags" aria-label="Technologies">
              {tags.map((tag) => (
                <li key={tag}>{tag}</li>
              ))}
            </ul>
          ) : null}
        </div>
      </ShineBorderCard>
    </div>
  )
}
