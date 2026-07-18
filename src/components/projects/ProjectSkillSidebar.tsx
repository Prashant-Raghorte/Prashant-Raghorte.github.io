import { useId, useState } from 'react'
import { siteCopy } from '@/config/copy'
import { ShineBorderCard } from '@/components/ui/ShineBorderCard'
import {
  getProjectSkillsByCategory,
  getSkillProductCount,
} from '@/utils/projectSkills'
import { getSkillIcon } from '@/utils/skillIcons'
import './ProjectSkillSidebar.css'
import '@/components/ui/ShineBorderCard.css'

type ProjectSkillSidebarProps = {
  activeSkills: string[]
  onSkillsChange: (skills: string[]) => void
  resultCount: number
  totalCount: number
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

export function ProjectSkillSidebar({
  activeSkills,
  onSkillsChange,
  resultCount,
  totalCount,
}: ProjectSkillSidebarProps) {
  const copy = siteCopy.sections.projectsPage
  const skillGroups = getProjectSkillsByCategory()
  const hasActiveFilters = activeSkills.length > 0
  const totalSkills = skillGroups.reduce((sum, group) => sum + group.skills.length, 0)
  const [activeCategory, setActiveCategory] = useState(skillGroups[0]?.categoryId ?? 'backend')
  const [unavailableSkill, setUnavailableSkill] = useState<string | null>(null)
  const unavailableTipId = useId()
  const activeGroup =
    skillGroups.find((group) => group.categoryId === activeCategory) ?? skillGroups[0]

  const toggleSkill = (skill: string) => {
    if (activeSkills.includes(skill)) {
      onSkillsChange(activeSkills.filter((item) => item !== skill))
      return
    }

    onSkillsChange([...activeSkills, skill])
  }

  const handleClearAll = () => {
    onSkillsChange([])
  }

  return (
    <aside className="stack-filter" aria-label="Filter projects by technology">
      <ShineBorderCard hoverOnly className="stack-filter__card">
        <div className="stack-filter__shell">
          <span className="stack-filter__glow" aria-hidden="true" />

        <header className="stack-filter__intro">
          <span className="stack-filter__title">{copy.filterLabel}</span>
          <p className="stack-filter__hint">{copy.filterHint}</p>
        </header>

        <header className="stack-filter__head">
          <div className="stack-filter__metric" aria-live="polite">
            <span className="stack-filter__metric-value">{resultCount}</span>
            <span className="stack-filter__metric-copy">
              <span className="stack-filter__metric-label">
                {resultCount === 1 ? 'Product' : 'Products'} matched
              </span>
              <span className="stack-filter__metric-total">of {totalCount}</span>
            </span>
          </div>
          {hasActiveFilters ? (
            <button
              type="button"
              className="stack-filter__clear"
              onClick={handleClearAll}
              aria-label="Clear all filters"
            >
              <ClearIcon />
              <span>Clear</span>
            </button>
          ) : null}
        </header>

        {hasActiveFilters ? (
          <div className="stack-filter__active" role="status">
            {activeSkills.map((skill) => (
              <button
                key={skill}
                type="button"
                className="stack-filter__active-chip"
                onClick={() => toggleSkill(skill)}
                aria-label={`Remove ${skill} filter`}
              >
                <span>{skill}</span>
                <ClearIcon />
              </button>
            ))}
          </div>
        ) : null}

        <button
          type="button"
          className={[
            'stack-filter__all',
            !hasActiveFilters ? 'stack-filter__all--active' : '',
          ]
            .filter(Boolean)
            .join(' ')}
          onClick={handleClearAll}
          aria-pressed={!hasActiveFilters}
        >
          All products
          <span className="stack-filter__all-count">{totalSkills}</span>
        </button>

        <div
          className="stack-filter__tabs"
          role="tablist"
          aria-label="Skill categories"
        >
          {skillGroups.map((group) => {
            const isOpen = group.categoryId === activeCategory
            const activeInGroup = group.skills.filter((skill) =>
              activeSkills.includes(skill),
            ).length

            return (
              <button
                key={group.categoryId}
                type="button"
                role="tab"
                id={`stack-filter-tab-${group.categoryId}`}
                aria-selected={isOpen}
                aria-controls={`stack-filter-panel-${group.categoryId}`}
                className={[
                  'stack-filter__tab',
                  isOpen ? 'stack-filter__tab--active' : '',
                ]
                  .filter(Boolean)
                  .join(' ')}
                onClick={() => setActiveCategory(group.categoryId)}
              >
                <span
                  className={`stack-filter__tab-dot stack-filter__tab-dot--${group.categoryId}`}
                  aria-hidden="true"
                />
                <span className="stack-filter__tab-label">{group.title}</span>
                {activeInGroup > 0 ? (
                  <span className="stack-filter__tab-badge">{activeInGroup}</span>
                ) : null}
              </button>
            )
          })}
        </div>

        <div className="stack-filter__scroll">
          {activeGroup ? (
            <section
              className={[
                'stack-filter__panel',
                `stack-filter__panel--${activeGroup.categoryId}`,
              ].join(' ')}
              role="tabpanel"
              id={`stack-filter-panel-${activeGroup.categoryId}`}
              aria-labelledby={`stack-filter-tab-${activeGroup.categoryId}`}
            >
              <p className="stack-filter__panel-meta">
                {activeGroup.skills.length} skills in {activeGroup.title.toLowerCase()}
              </p>
              <ul
                className="stack-filter__mosaic"
                onMouseLeave={() => setUnavailableSkill(null)}
              >
                {activeGroup.skills.map((skill) => {
                  const isActive = activeSkills.includes(skill)
                  const productCount = getSkillProductCount(skill)
                  const isDisabled = productCount === 0
                  const icon = getSkillIcon(skill)

                  const pill = (
                    <button
                      type="button"
                      className={[
                        'stack-filter__pill',
                        isActive ? 'stack-filter__pill--active' : '',
                        isDisabled ? 'stack-filter__pill--disabled' : '',
                      ]
                        .filter(Boolean)
                        .join(' ')}
                      onClick={() => toggleSkill(skill)}
                      aria-pressed={isActive}
                      disabled={isDisabled}
                      aria-disabled={isDisabled}
                      tabIndex={isDisabled ? -1 : undefined}
                    >
                      {icon ? (
                        <img
                          src={icon}
                          alt=""
                          className="stack-filter__pill-icon"
                          loading="lazy"
                          decoding="async"
                        />
                      ) : (
                        <span className="stack-filter__pill-fallback" aria-hidden="true">
                          {skill.charAt(0)}
                        </span>
                      )}
                      <span className="stack-filter__pill-label">{skill}</span>
                      {isDisabled ? (
                        <span className="stack-filter__pill-off" aria-hidden="true">
                          0
                        </span>
                      ) : productCount > 0 ? (
                        <span className="stack-filter__pill-count">{productCount}</span>
                      ) : null}
                    </button>
                  )

                  return (
                    <li key={skill} className="stack-filter__mosaic-item">
                      {isDisabled ? (
                        <span
                          className="stack-filter__pill-wrap stack-filter__pill-wrap--disabled"
                          tabIndex={0}
                          role="group"
                          aria-label={`${skill}: ${copy.stackFilterUnavailableLabel}`}
                          aria-describedby={
                            unavailableSkill === skill ? unavailableTipId : undefined
                          }
                          onMouseEnter={() => setUnavailableSkill(skill)}
                          onFocus={() => setUnavailableSkill(skill)}
                          onBlur={(event) => {
                            if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
                              setUnavailableSkill(null)
                            }
                          }}
                        >
                          {pill}
                        </span>
                      ) : (
                        pill
                      )}
                    </li>
                  )
                })}
              </ul>
              <div
                id={unavailableTipId}
                className={[
                  'stack-filter__unavailable',
                  unavailableSkill ? 'stack-filter__unavailable--visible' : '',
                ]
                  .filter(Boolean)
                  .join(' ')}
                role="status"
                aria-live="polite"
              >
                {unavailableSkill ? (
                  <>
                    <span className="stack-filter__unavailable-skill">{unavailableSkill}</span>
                    <span className="stack-filter__unavailable-copy">
                      <span className="stack-filter__unavailable-hint">
                        {copy.stackFilterUnavailableHint}
                      </span>
                      <span className="stack-filter__unavailable-label">
                        {copy.stackFilterUnavailableLabel}
                      </span>
                    </span>
                  </>
                ) : null}
              </div>
            </section>
          ) : null}
        </div>
        </div>
      </ShineBorderCard>
    </aside>
  )
}
