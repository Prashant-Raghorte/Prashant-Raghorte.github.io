import type { Experience } from '@/types'
import { siteCopy } from '@/config/copy'
import { CompanyLogo } from '@/components/experience/CompanyLogo'
import { ExperienceRoleSkillFocus } from '@/components/experience/ExperienceRoleSkillFocus'
import { getStageCompanyDisplay } from '@/utils/experienceHelpers'
import { buildSkillCategoryFocus } from '@/utils/experienceImpactProfile'
import { extractExperienceTags } from '@/utils/experienceTags'
import './ExperienceMobileRolePanel.css'
import '@/components/experience/CompanyLogo.css'
import '@/components/experience/ExperienceRoleSkillFocus.css'

type ExperienceMobileRolePanelProps = {
  experience: Experience
  roleNumber: string
  isActive: boolean
}

function CalendarIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" className="exp-mobile-panel__meta-icon">
      <rect x="2" y="3" width="12" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.25" />
      <path d="M2 6.5h12M5.25 1.75V4M10.75 1.75V4" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
    </svg>
  )
}

function LocationIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" className="exp-mobile-panel__meta-icon">
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

export function ExperienceMobileRolePanel({
  experience,
  roleNumber,
  isActive,
}: ExperienceMobileRolePanelProps) {
  const copy = siteCopy.sections.experiencePage
  const companyName = getStageCompanyDisplay(experience.company)
  const tags = extractExperienceTags(experience.highlights, 12, { includeCore: true })
  const skillCategories = buildSkillCategoryFocus(tags, experience.highlights)

  return (
    <>
      <div
        className={[
          'exp-mobile-panel',
          isActive ? 'exp-mobile-panel--active' : '',
          experience.isCurrent ? 'exp-mobile-panel--current' : '',
        ]
          .filter(Boolean)
          .join(' ')}
      >
        <div className="exp-mobile-panel__spotlight">
          {isActive ? (
            <div className="exp-mobile-panel__top">
              <span className="exp-mobile-panel__live">
                <span className="exp-mobile-panel__live-dot" aria-hidden="true" />
                {copy.stageLabel}
              </span>
            </div>
          ) : null}

          <div className="exp-mobile-panel__identity">
            <CompanyLogo
              experience={experience}
              isCurrent={experience.isCurrent}
              className="exp-mobile-panel__logo"
            />

            <div className="exp-mobile-panel__grid">
              <div className="exp-mobile-panel__primary">
                <h3 className="exp-mobile-panel__role">{experience.role}</h3>
                {experience.companyUrl ? (
                  <a
                    href={experience.companyUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="exp-mobile-panel__company exp-mobile-panel__company--link"
                  >
                    {companyName}
                  </a>
                ) : (
                  <span className="exp-mobile-panel__company">{companyName}</span>
                )}
              </div>

              <div className="exp-mobile-panel__meta-col">
                {experience.isCurrent ? (
                  <span className="exp-mobile-panel__current">{copy.currentRoleLabel}</span>
                ) : (
                  <span className="exp-mobile-panel__index">{roleNumber}</span>
                )}
                <span className="exp-mobile-panel__meta-line">
                  <CalendarIcon />
                  <time dateTime={experience.period}>{experience.period}</time>
                </span>
                <span className="exp-mobile-panel__meta-line">
                  <LocationIcon />
                  <span>{experience.location}</span>
                </span>
              </div>
            </div>
          </div>

          {skillCategories.length > 0 ? (
            <ExperienceRoleSkillFocus
              categories={skillCategories}
              title={copy.roleImpactTitle}
              hint={copy.roleImpactHint}
              className="exp-mobile-panel__skills exp-skill-focus--mobile-compact"
            />
          ) : null}
        </div>
      </div>

      <div className="exp-mobile-panel__divider" aria-hidden="true" />
    </>
  )
}
