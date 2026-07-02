import { useState } from 'react'
import { Section } from '@/components/common'
import { SECTION_IDS } from '@/constants'
import { SKILL_CATEGORY_ORDER, skillCategories } from '@/data/portfolio'
import { ShineBorderCard } from '@/components/ui/ShineBorderCard'
import { SkillChip } from '@/sections/skills/SkillChip'
import './HomeSkillsSection.css'

const homeSkillCategories = SKILL_CATEGORY_ORDER.map((id) =>
  skillCategories.find((category) => category.id === id),
).filter((category): category is (typeof skillCategories)[number] => category !== undefined)

export function HomeSkillsSection() {
  const [activeCategoryId, setActiveCategoryId] = useState<string>(SKILL_CATEGORY_ORDER[0])
  const activeCategory =
    homeSkillCategories.find((category) => category.id === activeCategoryId) ??
    homeSkillCategories[0]

  return (
    <Section id={SECTION_IDS.SKILLS} eyebrow="Stack" title="Skills & Tools">
      <nav className="home-skills__nav" aria-label="Skill categories">
        {homeSkillCategories.map((category) => (
          <button
            key={category.id}
            type="button"
            className={[
              'home-skills__tab',
              activeCategoryId === category.id ? 'home-skills__tab--active' : '',
            ]
              .filter(Boolean)
              .join(' ')}
            onClick={() => setActiveCategoryId(category.id)}
            aria-pressed={activeCategoryId === category.id}
          >
            {category.title}
          </button>
        ))}
      </nav>

      <ShineBorderCard hoverOnly>
        <div
          className={[
            'home-skills__panel',
            activeCategory.skills.length <= 2 ? 'home-skills__panel--compact' : '',
          ]
            .filter(Boolean)
            .join(' ')}
        >
          <h3 className="home-skills__panel-title">{activeCategory.title}</h3>
          <ul
            className={[
              'home-skills__list',
              activeCategory.skills.length <= 2 ? 'home-skills__list--compact' : '',
            ]
              .filter(Boolean)
              .join(' ')}
          >
            {activeCategory.skills.map((skill) => (
              <SkillChip key={skill} name={skill} />
            ))}
          </ul>
        </div>
      </ShineBorderCard>
    </Section>
  )
}
