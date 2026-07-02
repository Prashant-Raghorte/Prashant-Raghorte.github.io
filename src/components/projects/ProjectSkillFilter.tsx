import { useState } from 'react'
import { getProjectSkills } from '@/utils/projectSkills'
import './ProjectSkillFilter.css'

const VISIBLE_SKILL_COUNT = 7

type ProjectSkillFilterProps = {
  activeSkills: string[]
  onSkillsChange: (skills: string[]) => void
}

function ClearIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="m7 7 10 10M17 7 7 17"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </svg>
  )
}

export function ProjectSkillFilter({ activeSkills, onSkillsChange }: ProjectSkillFilterProps) {
  const [showAllSkills, setShowAllSkills] = useState(false)
  const allSkills = getProjectSkills()
  const hiddenCount = Math.max(allSkills.length - VISIBLE_SKILL_COUNT, 0)
  const visibleSkills = showAllSkills ? allSkills : allSkills.slice(0, VISIBLE_SKILL_COUNT)
  const hasActiveFilters = activeSkills.length > 0

  const toggleSkill = (skill: string) => {
    if (activeSkills.includes(skill)) {
      onSkillsChange(activeSkills.filter((item) => item !== skill))
      return
    }

    onSkillsChange([...activeSkills, skill])
  }

  const removeSkill = (skill: string) => {
    onSkillsChange(activeSkills.filter((item) => item !== skill))
  }

  const handleClearAll = () => {
    onSkillsChange([])
    setShowAllSkills(false)
  }

  return (
    <div className="project-skill-filter-wrap">
      {hasActiveFilters && (
        <div className="project-skill-filter__banner" role="status" aria-live="polite">
          <div className="project-skill-filter__banner-text">
            <span className="project-skill-filter__banner-label">
              {activeSkills.length} filter{activeSkills.length > 1 ? 's' : ''} active
            </span>
            <div className="project-skill-filter__active-list">
              {activeSkills.map((skill) => (
                <button
                  key={skill}
                  type="button"
                  className="project-skill-filter__active-chip"
                  onClick={() => removeSkill(skill)}
                  aria-label={`Remove ${skill} filter`}
                >
                  <span>{skill}</span>
                  <ClearIcon />
                </button>
              ))}
            </div>
          </div>
          <button
            type="button"
            className="project-skill-filter__clear"
            onClick={handleClearAll}
            aria-label="Clear all filters"
          >
            <ClearIcon />
            <span>Clear all</span>
          </button>
        </div>
      )}

      <div className="project-skill-filter" role="group" aria-label="Filter projects by skill">
        <button
          type="button"
          className={[
            'project-skill-filter__chip',
            !hasActiveFilters ? 'project-skill-filter__chip--active' : '',
          ]
            .filter(Boolean)
            .join(' ')}
          onClick={handleClearAll}
          aria-pressed={!hasActiveFilters}
        >
          All
        </button>

        {visibleSkills.map((skill) => {
          const isActive = activeSkills.includes(skill)

          return (
            <button
              key={skill}
              type="button"
              className={[
                'project-skill-filter__chip',
                isActive ? 'project-skill-filter__chip--active' : '',
              ]
                .filter(Boolean)
                .join(' ')}
              onClick={() => toggleSkill(skill)}
              aria-pressed={isActive}
            >
              {skill}
            </button>
          )
        })}

        {hiddenCount > 0 && (
          <button
            type="button"
            className="project-skill-filter__chip project-skill-filter__chip--more"
            onClick={() => setShowAllSkills((current) => !current)}
            aria-expanded={showAllSkills}
          >
            {showAllSkills ? 'Show less' : `+${hiddenCount}`}
          </button>
        )}
      </div>
    </div>
  )
}
