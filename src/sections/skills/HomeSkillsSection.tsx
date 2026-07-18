import { useEffect, useMemo, useRef, useState, type CSSProperties } from 'react'
import { siteCopy } from '@/config/copy'
import { Section } from '@/components/common'
import { SECTION_IDS } from '@/constants'
import { useHomeSkillsLayout } from '@/hooks/useHomeSkillsLayout'
import {
  ALL_SKILLS_TAB_ID,
  getAllSkills,
  getOrderedSkillCategories,
  type HomeSkillTabId,
} from '@/utils/skillCategories'
import { ShineBorderCard } from '@/components/ui/ShineBorderCard'
import { SkillMoreTile, SkillTile } from '@/sections/skills/SkillTile'
import './HomeSkillsSection.css'
import './SkillTile.css'

const homeSkillCategories = getOrderedSkillCategories()

type SkillCountBadgeProps = {
  count: number
  label: string
}

function SkillCountBadge({ count, label }: SkillCountBadgeProps) {
  return (
    <div className="home-skills__count" aria-label={label}>
      <div className="home-skills__count-orbit" aria-hidden="true">
        <span className="home-skills__count-ring home-skills__count-ring--outer" />
        <span className="home-skills__count-ring home-skills__count-ring--inner" />
        <span className="home-skills__count-glow" />
        <span className="home-skills__count-value">{count}</span>
      </div>
    </div>
  )
}

export function HomeSkillsSection() {
  const { previewCount } = useHomeSkillsLayout()
  const [activeCategoryId, setActiveCategoryId] = useState<HomeSkillTabId>(ALL_SKILLS_TAB_ID)
  const [skillsExpanded, setSkillsExpanded] = useState(false)
  const [lockedMosaicHeight, setLockedMosaicHeight] = useState<number | null>(null)
  const mosaicRef = useRef<HTMLDivElement>(null)
  const allSkills = useMemo(() => getAllSkills(), [])
  const isAllView = activeCategoryId === ALL_SKILLS_TAB_ID
  const activeCategory = homeSkillCategories.find((category) => category.id === activeCategoryId)
  const activeSkills = isAllView ? allSkills : activeCategory?.skills ?? []
  const hasMoreSkills = activeSkills.length > previewCount
  const remainingSkills = Math.max(activeSkills.length - previewCount, 0)
  const visibleSkills =
    hasMoreSkills && !skillsExpanded
      ? activeSkills.slice(0, previewCount)
      : activeSkills
  const isExpanded = skillsExpanded && hasMoreSkills

  useEffect(() => {
    setSkillsExpanded(false)
    setLockedMosaicHeight(null)
  }, [activeCategoryId, previewCount])

  const expandSkills = () => {
    const mosaic = mosaicRef.current
    if (mosaic && window.innerWidth <= 1200) {
      setLockedMosaicHeight(mosaic.getBoundingClientRect().height)
    }
    setSkillsExpanded(true)
  }

  const collapseSkills = () => {
    setSkillsExpanded(false)
    setLockedMosaicHeight(null)
  }

  const mosaicStyle: CSSProperties | undefined =
    lockedMosaicHeight != null
      ? { minHeight: lockedMosaicHeight, height: lockedMosaicHeight }
      : undefined

  const panelTitle = isAllView ? siteCopy.skills.all.title : activeCategory?.title ?? siteCopy.skills.all.title
  const panelHint =
    hasMoreSkills && !skillsExpanded
      ? siteCopy.skills.all.showMore(remainingSkills)
      : isAllView
        ? siteCopy.skills.all.hint
        : siteCopy.skills.categoryHint

  const countLabel = isAllView
    ? `${allSkills.length} skills total`
    : `${activeSkills.length} ${activeCategory?.title ?? 'category'} skills`

  return (
    <Section id={SECTION_IDS.SKILLS} eyebrow="Stack" title="Skills & Tools">
      <nav className="home-skills__nav" aria-label="Skill categories">
        <button
          type="button"
          className={[
            'home-skills__tab',
            isAllView ? 'home-skills__tab--active' : '',
          ]
            .filter(Boolean)
            .join(' ')}
          onClick={() => setActiveCategoryId(ALL_SKILLS_TAB_ID)}
          aria-pressed={isAllView}
        >
          All
        </button>
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
            onClick={() => setActiveCategoryId(category.id as HomeSkillTabId)}
            aria-pressed={activeCategoryId === category.id}
          >
            {category.title}
          </button>
        ))}
      </nav>

      <ShineBorderCard hoverOnly>
        <div className="home-skills__panel">
          <div
            ref={mosaicRef}
            className={[
              'home-skills__mosaic',
              isExpanded ? 'home-skills__mosaic--expanded' : '',
            ]
              .filter(Boolean)
              .join(' ')}
            style={mosaicStyle}
          >
            <header className="home-skills__head">
              <div className="home-skills__head-copy">
                <span className="home-skills__head-accent" aria-hidden="true" />
                <div className="home-skills__head-text">
                  <h3 className="home-skills__head-title">{panelTitle}</h3>
                  <p className="home-skills__head-hint">{panelHint}</p>
                </div>
              </div>
              <SkillCountBadge count={activeSkills.length} label={countLabel} />
            </header>

            <div className="home-skills__mosaic-grid-wrap">
              <ul
                className={[
                  'home-skills__mosaic-grid',
                  isExpanded ? 'home-skills__mosaic-grid--expanded' : '',
                ]
                  .filter(Boolean)
                  .join(' ')}
              >
                {visibleSkills.map((skill) => (
                  <SkillTile key={skill} name={skill} />
                ))}
                {hasMoreSkills && !skillsExpanded ? (
                  <SkillMoreTile
                    count={remainingSkills}
                    label={siteCopy.skills.all.showMore(remainingSkills)}
                    onClick={expandSkills}
                  />
                ) : null}
              </ul>
            </div>

            {isExpanded ? (
              <div className="home-skills__mosaic-less">
                <button
                  type="button"
                  className="home-skills__mosaic-less-btn"
                  onClick={collapseSkills}
                  aria-label={siteCopy.skills.all.showLess}
                >
                  {siteCopy.skills.all.showLess}
                </button>
              </div>
            ) : null}
          </div>
        </div>
      </ShineBorderCard>
    </Section>
  )
}
