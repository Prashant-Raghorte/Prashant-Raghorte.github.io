import type { CSSProperties } from 'react'
import type { Experience } from '@/types'
import { siteCopy } from '@/config/copy'
import { ExperienceStageIdentity } from '@/components/experience/ExperienceStageIdentity'
import { ExperienceRoleSkillFocus } from '@/components/experience/ExperienceRoleSkillFocus'
import { ShineBorderCard } from '@/components/ui/ShineBorderCard'
import { useSpotlight } from '@/hooks/useSpotlight'
import { getActiveExperience } from '@/utils/experienceHelpers'
import { buildSkillCategoryFocus } from '@/utils/experienceImpactProfile'
import { extractExperienceTags } from '@/utils/experienceTags'
import './ExperienceRoleStage.css'
import '@/components/experience/ExperienceStageIdentity.css'
import '@/components/experience/CompanyLogo.css'
import '@/components/experience/ExperienceRoleSkillFocus.css'

type ExperienceRoleStageProps = {
  items: Experience[]
  activeId: string
  inView: boolean
}

export function ExperienceRoleStage({ items, activeId, inView }: ExperienceRoleStageProps) {
  const activeRole = getActiveExperience(items, activeId)
  const { spotlight, handleMouseMove, handleMouseLeave } = useSpotlight<HTMLDivElement>()
  const tags = extractExperienceTags(activeRole.highlights, 12, { includeCore: true })
  const skillCategories = buildSkillCategoryFocus(tags, activeRole.highlights)
  const copy = siteCopy.sections.experiencePage

  return (
    <div
      className={['exp-stage', inView ? 'exp-stage--in-view' : ''].filter(Boolean).join(' ')}
      aria-live="polite"
      aria-atomic="true"
    >
      <ShineBorderCard hoverOnly className="exp-stage__card">
        <div
          key={activeRole.id}
          className="exp-stage__inner"
          style={
            {
              '--exp-stage-spot-x': `${spotlight.x}%`,
              '--exp-stage-spot-y': `${spotlight.y}%`,
            } as CSSProperties
          }
        >
          <span
            className={[
              'exp-stage__spotlight',
              spotlight.active ? 'exp-stage__spotlight--active' : '',
            ]
              .filter(Boolean)
              .join(' ')}
            aria-hidden="true"
          />
          <span className="exp-stage__grid-lines" aria-hidden="true" />

          <div className="exp-stage__content">
            <span className="exp-stage__label">{copy.stageLabel}</span>

            <ExperienceStageIdentity experience={activeRole} />

            <ExperienceRoleSkillFocus
              categories={skillCategories}
              title={copy.roleImpactTitle}
              hint={copy.roleImpactHint}
              className="exp-stage__skill-focus"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            />
          </div>
        </div>
      </ShineBorderCard>
    </div>
  )
}
