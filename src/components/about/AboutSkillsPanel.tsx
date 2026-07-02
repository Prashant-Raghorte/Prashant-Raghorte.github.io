import { ShineBorderCard } from '@/components/ui/ShineBorderCard'
import { SkillChip } from '@/sections/skills/SkillChip'
import {
  getOrderedSkillCategories,
  getSkillCategoryDensity,
} from '@/utils/skillCategories'
import './AboutSkillsPanel.css'

export function AboutSkillsPanel() {
  const categories = getOrderedSkillCategories()

  return (
    <ShineBorderCard hoverOnly className="about-skills-card">
      <div className="about-skills">
        {categories.map((category) => {
          const density = getSkillCategoryDensity(category.skills.length)

          return (
            <article
              key={category.id}
              className={[
                'about-skills__category',
                `about-skills__category--${density}`,
              ].join(' ')}
            >
              <header className="about-skills__header">
                <div className="about-skills__header-copy">
                  <span className="about-skills__accent" aria-hidden="true" />
                  <h3 className="about-skills__title">{category.title}</h3>
                </div>
              </header>

              <div className="about-skills__list-wrap">
                <ul className="about-skills__list">
                  {category.skills.map((skill) => (
                    <SkillChip key={skill} name={skill} />
                  ))}
                </ul>
              </div>
            </article>
          )
        })}
      </div>
    </ShineBorderCard>
  )
}
