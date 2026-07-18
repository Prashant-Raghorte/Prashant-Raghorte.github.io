import type { CSSProperties } from 'react'
import type { Experience } from '@/types'
import { siteCopy } from '@/config/copy'
import { ShineBorderCard } from '@/components/ui/ShineBorderCard'
import { useSpotlight } from '@/hooks/useSpotlight'
import {
  getCareerStats,
  getTotalHighlights,
  YEARS_EXPERIENCE,
} from '@/utils/experienceHelpers'
import { extractExperienceTags } from '@/utils/experienceTags'
import './ExperienceBentoHero.css'

function StackIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 3.5 4.5 7.25v7.5L12 18.5l7.5-3.75v-7.5L12 3.5Z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
      <path d="M4.5 7.25 12 11l7.5-3.75M12 11v7.5" stroke="currentColor" strokeWidth="1.75" />
    </svg>
  )
}

function SparkIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 3.5v4M12 16.5v4M4.5 12h4M15.5 12h4M7.05 7.05l2.83 2.83M14.12 14.12l2.83 2.83M7.05 16.95l2.83-2.83M14.12 9.88l2.83-2.83"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </svg>
  )
}

type ExperienceBentoHeroProps = {
  items: Experience[]
  inView: boolean
}

export function ExperienceBentoHero({ items, inView }: ExperienceBentoHeroProps) {
  const { spotlight, handleMouseMove, handleMouseLeave } = useSpotlight<HTMLDivElement>()
  const careerStats = getCareerStats(items)
  const totalHighlights = getTotalHighlights(items)
  const allHighlights = items.flatMap((item) => item.highlights)
  const craftTags = extractExperienceTags(allHighlights, 4)
  const hasAi = craftTags.includes('LLM / AI')
  const copy = siteCopy.sections.experiencePage

  const bentoStats = [
    ...careerStats.filter((stat) => stat.id !== 'years'),
    { id: 'impacts', value: String(totalHighlights), label: copy.bentoHighlights },
  ]

  return (
    <div
      className={['exp-bento', inView ? 'exp-bento--in-view' : ''].filter(Boolean).join(' ')}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={
        {
          '--exp-spot-x': `${spotlight.x}%`,
          '--exp-spot-y': `${spotlight.y}%`,
        } as CSSProperties
      }
    >
      <span
        className={[
          'exp-bento__spotlight',
          spotlight.active ? 'exp-bento__spotlight--active' : '',
        ]
          .filter(Boolean)
          .join(' ')}
        aria-hidden="true"
      />
      <span className="exp-bento__mesh" aria-hidden="true" />

      <div className="exp-bento__grid">
        <ShineBorderCard hoverOnly className="exp-bento__tile exp-bento__tile--orbit">
          <div className="exp-bento__orbit-wrap">
            <div className="exp-bento__orbit" aria-hidden="true">
              <span className="exp-bento__orbit-ring exp-bento__orbit-ring--outer" />
              <span className="exp-bento__orbit-ring exp-bento__orbit-ring--inner" />
              <span className="exp-bento__orbit-glow" />
              <span className="exp-bento__orbit-value">{YEARS_EXPERIENCE}</span>
            </div>
            <p className="exp-bento__orbit-label">Years building backends</p>
          </div>
        </ShineBorderCard>

        <ShineBorderCard hoverOnly className="exp-bento__tile exp-bento__tile--craft">
          <div className="exp-bento__craft">
            <span className="exp-bento__craft-label">{copy.craftLabel}</span>
            <p className="exp-bento__craft-title">{copy.craftTitle}</p>
            <ul className="exp-bento__craft-meta">
              <li className="exp-bento__craft-item">
                <span className="exp-bento__craft-icon" aria-hidden="true">
                  <StackIcon />
                </span>
                <span className="exp-bento__craft-copy">
                  <span className="exp-bento__craft-item-label">Stack</span>
                  <span className="exp-bento__craft-item-value">{copy.craftStack}</span>
                </span>
              </li>
              {hasAi ? (
                <li className="exp-bento__craft-item">
                  <span className="exp-bento__craft-icon" aria-hidden="true">
                    <SparkIcon />
                  </span>
                  <span className="exp-bento__craft-copy">
                    <span className="exp-bento__craft-item-label">AI edge</span>
                    <span className="exp-bento__craft-item-value">{copy.craftAi}</span>
                  </span>
                </li>
              ) : null}
            </ul>
            {craftTags.length > 0 ? (
              <ul className="exp-bento__craft-tags" aria-label="Technologies">
                {craftTags.map((tag) => (
                  <li key={tag}>{tag}</li>
                ))}
              </ul>
            ) : null}
          </div>
        </ShineBorderCard>

        {bentoStats.map((stat, index) => (
          <div
            key={stat.id}
            className="exp-bento__stat-wrap"
            style={{ '--exp-bento-stat-delay': `${index * 70 + 160}ms` } as CSSProperties}
          >
            <ShineBorderCard hoverOnly className="exp-bento__tile exp-bento__tile--stat">
              <div className="exp-bento__stat">
                <span className="exp-bento__stat-value">{stat.value}</span>
                <span className="exp-bento__stat-label">{stat.label}</span>
              </div>
            </ShineBorderCard>
          </div>
        ))}
      </div>
    </div>
  )
}
