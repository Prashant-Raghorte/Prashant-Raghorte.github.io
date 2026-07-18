import type { CSSProperties, MouseEvent } from 'react'
import type { SkillCategoryFocus } from '@/utils/experienceImpactProfile'
import { getSkillIcon } from '@/utils/skillIcons'
import './ExperienceRoleSkillFocus.css'

type ExperienceRoleSkillFocusProps = {
  categories: SkillCategoryFocus[]
  title: string
  hint?: string
  className?: string
  onMouseMove?: (event: MouseEvent<HTMLDivElement>) => void
  onMouseLeave?: () => void
}

export function ExperienceRoleSkillFocus({
  categories,
  title,
  hint,
  className = '',
  onMouseMove,
  onMouseLeave,
}: ExperienceRoleSkillFocusProps) {
  if (categories.length === 0) return null

  return (
    <div
      className={['exp-skill-focus', className].filter(Boolean).join(' ')}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      <div className="exp-skill-focus__head">
        <span className="exp-skill-focus__accent" aria-hidden="true" />
        <div className="exp-skill-focus__head-copy">
          <h3 className="exp-skill-focus__title">{title}</h3>
          {hint ? <p className="exp-skill-focus__hint">{hint}</p> : null}
        </div>
      </div>

      <ul className="exp-skill-focus__list" aria-label={title}>
        {categories.map((category, index) => (
          <li
            key={category.id}
            className="exp-skill-focus__category"
            style={{ '--exp-skill-focus-delay': `${index * 70}ms` } as CSSProperties}
          >
            <div className="exp-skill-focus__row">
              <span className="exp-skill-focus__label">{category.label}</span>
              <span className="exp-skill-focus__count">{category.skillCount}</span>
            </div>
            <span className="exp-skill-focus__track" aria-hidden="true">
              <span
                className="exp-skill-focus__fill"
                style={{ '--exp-skill-focus-score': `${category.score}%` } as CSSProperties}
              />
            </span>
            <ul className="exp-skill-focus__tags" aria-label={`${category.label} skills`}>
              {category.skills.map((skill) => {
                const icon = getSkillIcon(skill)

                return (
                  <li key={skill} className="exp-skill-focus__tag">
                    {icon ? (
                      <img
                        src={icon}
                        alt=""
                        className="exp-skill-focus__tag-icon"
                        loading="lazy"
                        decoding="async"
                      />
                    ) : (
                      <span className="exp-skill-focus__tag-dot" aria-hidden="true" />
                    )}
                    <span>{skill}</span>
                  </li>
                )
              })}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  )
}
