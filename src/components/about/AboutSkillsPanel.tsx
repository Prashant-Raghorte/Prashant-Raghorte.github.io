import { useEffect, useMemo, useRef, useState, type CSSProperties } from 'react'
import { siteCopy } from '@/config/copy'
import { AboutSkillsCategoryPicker } from '@/components/about/AboutSkillsCategoryPicker'
import { ShineBorderCard } from '@/components/ui/ShineBorderCard'
import { useAboutSkillsLayout } from '@/hooks/useAboutSkillsLayout'
import { SkillMoreTile, SkillTile } from '@/sections/skills/SkillTile'
import {
  ALL_SKILLS_TAB_ID,
  getAllSkills,
  getOrderedSkillCategories,
  type HomeSkillTabId,
} from '@/utils/skillCategories'
import './AboutSkillsPanel.css'
import '@/sections/skills/SkillTile.css'

type SkillCountOrbitProps = {
  count: number
  label: string
}

function SkillCountOrbit({ count, label }: SkillCountOrbitProps) {
  return (
    <div className="about-skills__orbit" aria-label={label}>
      <span className="about-skills__orbit-ring about-skills__orbit-ring--outer" aria-hidden="true" />
      <span className="about-skills__orbit-ring about-skills__orbit-ring--inner" aria-hidden="true" />
      <span className="about-skills__orbit-glow" aria-hidden="true" />
      <span className="about-skills__orbit-value">{count}</span>
    </div>
  )
}

export function AboutSkillsPanel() {
  const categories = getOrderedSkillCategories()
  const allSkills = useMemo(() => getAllSkills(), [])
  const { previewCount, useSidebarNav } = useAboutSkillsLayout()
  const [activeCategoryId, setActiveCategoryId] = useState<HomeSkillTabId>(ALL_SKILLS_TAB_ID)
  const [skillsExpanded, setSkillsExpanded] = useState(false)
  const [lockedStageHeight, setLockedStageHeight] = useState<number | null>(null)
  const navRef = useRef<HTMLElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)

  const isAllView = activeCategoryId === ALL_SKILLS_TAB_ID
  const activeCategory = categories.find((category) => category.id === activeCategoryId)
  const activeSkills = isAllView ? allSkills : activeCategory?.skills ?? []

  const navItems = useMemo(
    () => [
      {
        id: ALL_SKILLS_TAB_ID,
        title: siteCopy.skills.all.title,
        count: allSkills.length,
      },
      ...categories.map((category) => ({
        id: category.id as HomeSkillTabId,
        title: category.title,
        count: category.skills.length,
      })),
    ],
    [allSkills.length, categories],
  )

  useEffect(() => {
    setSkillsExpanded(false)
    setLockedStageHeight(null)
  }, [activeCategoryId, previewCount])

  useEffect(() => {
    if (!useSidebarNav) return

    const nav = navRef.current
    if (!nav) return

    const activeButton = nav.querySelector<HTMLButtonElement>(
      '.about-skills__nav-btn--active',
    )
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    activeButton?.scrollIntoView({
      block: 'nearest',
      inline: 'nearest',
      behavior: reducedMotion ? 'auto' : 'smooth',
    })
  }, [activeCategoryId, useSidebarNav])

  if (activeSkills.length === 0) {
    return null
  }

  const hasMoreSkills = activeSkills.length > previewCount
  const remainingSkills = Math.max(activeSkills.length - previewCount, 0)
  const visibleSkills =
    hasMoreSkills && !skillsExpanded
      ? activeSkills.slice(0, previewCount)
      : activeSkills
  const isExpanded = skillsExpanded && hasMoreSkills
  const panelTitle = isAllView
    ? siteCopy.skills.all.title
    : activeCategory?.title ?? siteCopy.skills.all.title
  const countLabel = isAllView
    ? `${allSkills.length} skills total`
    : `${activeSkills.length} ${activeCategory?.title ?? 'category'} skills`

  const expandSkills = () => {
    const stage = stageRef.current
    if (stage) {
      setLockedStageHeight(stage.getBoundingClientRect().height)
    }
    setSkillsExpanded(true)
  }

  const collapseSkills = () => {
    setSkillsExpanded(false)
    setLockedStageHeight(null)
  }

  const stageStyle: CSSProperties | undefined =
    lockedStageHeight != null
      ? { minHeight: lockedStageHeight, height: lockedStageHeight }
      : undefined

  return (
    <ShineBorderCard hoverOnly className="about-skills-card">
      <div className="about-skills">
        {useSidebarNav ? (
          <aside className="about-skills__nav-panel">
            <div className="about-skills__nav-backdrop" aria-hidden="true" />
            <p className="about-skills__nav-label">{siteCopy.skills.navLabel}</p>

            <nav ref={navRef} className="about-skills__nav" aria-label="Skill categories">
              {navItems.map((item, index) => {
                const isActive = item.id === activeCategoryId

                return (
                  <button
                    key={item.id}
                    type="button"
                    className={[
                      'about-skills__nav-btn',
                      isActive ? 'about-skills__nav-btn--active' : '',
                    ]
                      .filter(Boolean)
                      .join(' ')}
                    onClick={() => setActiveCategoryId(item.id)}
                    aria-pressed={isActive}
                  >
                    <span className="about-skills__nav-rail" aria-hidden="true">
                      <span className="about-skills__nav-node" />
                      {index < navItems.length - 1 ? (
                        <span className="about-skills__nav-connector" />
                      ) : null}
                    </span>
                    <span className="about-skills__nav-copy">
                      <span className="about-skills__nav-title">{item.title}</span>
                      <span className="about-skills__nav-meta">
                        {siteCopy.skills.skillCount(item.count)}
                      </span>
                    </span>
                  </button>
                )
              })}
            </nav>
          </aside>
        ) : null}

        <div
          ref={stageRef}
          className={[
            'about-skills__stage',
            isExpanded ? 'about-skills__stage--expanded' : '',
          ]
            .filter(Boolean)
            .join(' ')}
          style={stageStyle}
          key={activeCategoryId}
        >
          <div className="about-skills__stage-backdrop" aria-hidden="true" />

          {!useSidebarNav ? (
            <AboutSkillsCategoryPicker
              label={siteCopy.skills.navLabel}
              items={navItems}
              value={activeCategoryId}
              onChange={setActiveCategoryId}
            />
          ) : null}

          <header className="about-skills__stage-head">
            <div className="about-skills__stage-copy">
              <span className="about-skills__stage-accent" aria-hidden="true" />
              <div className="about-skills__stage-text">
                <h3 className="about-skills__stage-title">{panelTitle}</h3>
                <p className="about-skills__stage-hint">
                  {hasMoreSkills && !skillsExpanded
                    ? siteCopy.skills.all.showMore(remainingSkills)
                    : isAllView
                      ? siteCopy.skills.all.hint
                      : siteCopy.skills.categoryHint}
                </p>
              </div>
            </div>
            <SkillCountOrbit count={activeSkills.length} label={countLabel} />
          </header>

          <div className="about-skills__grid-wrap">
            <ul
              className={[
                'about-skills__grid',
                isExpanded ? 'about-skills__grid--expanded' : '',
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
            <div className="about-skills__less">
              <button
                type="button"
                className="about-skills__less-btn"
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
  )
}
