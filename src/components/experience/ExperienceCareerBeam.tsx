import type { CSSProperties } from 'react'
import type { Experience } from '@/types'
import { getCompanyShortName } from '@/utils/experienceHelpers'
import './ExperienceCareerBeam.css'

type ExperienceCareerBeamProps = {
  items: Experience[]
  activeId: string
  inView: boolean
}

function parseStartYear(period: string): number {
  const match = period.match(/\b(20\d{2})\b/)
  return match ? Number(match[1]) : new Date().getFullYear()
}

export function ExperienceCareerBeam({ items, activeId, inView }: ExperienceCareerBeamProps) {
  const startYears = items.map((item) => parseStartYear(item.period))
  const minYear = Math.min(...startYears)
  const maxYear = new Date().getFullYear()
  const span = Math.max(maxYear - minYear, 1)

  const milestones = items.map((item) => {
    const year = parseStartYear(item.period)
    const position = ((year - minYear) / span) * 100

    return {
      id: item.id,
      year,
      label: getCompanyShortName(item.company),
      position,
      isCurrent: item.isCurrent ?? false,
    }
  })

  const activeMilestone = milestones.find((m) => m.id === activeId) ?? milestones[0]
  const progressWidth = activeMilestone
    ? Math.min(100, Math.max(8, activeMilestone.position + (activeMilestone.isCurrent ? 4 : 0)))
    : 0

  return (
    <div
      className={['exp-beam', inView ? 'exp-beam--in-view' : ''].filter(Boolean).join(' ')}
      aria-hidden="true"
    >
      <div className="exp-beam__track">
        <span className="exp-beam__glow" />
        <span
          className="exp-beam__fill"
          style={{ '--exp-beam-progress': `${progressWidth}%` } as CSSProperties}
        />
      </div>

      <div className="exp-beam__years">
        <span className="exp-beam__year exp-beam__year--start">{minYear}</span>
        <span className="exp-beam__year exp-beam__year--end">{maxYear}</span>
      </div>

      <ul className="exp-beam__milestones">
        {milestones.map((milestone, index) => (
          <li
            key={milestone.id}
            className={[
              'exp-beam__milestone',
              milestone.id === activeId ? 'exp-beam__milestone--active' : '',
              milestone.isCurrent ? 'exp-beam__milestone--current' : '',
            ]
              .filter(Boolean)
              .join(' ')}
            style={
              {
                '--exp-beam-position': `${milestone.position}%`,
                '--exp-beam-delay': `${index * 80}ms`,
              } as CSSProperties
            }
          >
            <span className="exp-beam__node" />
            <span className="exp-beam__label">{milestone.label}</span>
            <span className="exp-beam__year-tag">{milestone.year}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
