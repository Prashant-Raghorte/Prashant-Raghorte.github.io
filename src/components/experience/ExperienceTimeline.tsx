import type { Experience } from '@/types'
import { ExternalLinkIcon } from '@/components/ui/icons'
import { ReadMoreList } from '@/components/common/ReadMoreList'
import { ShineBorderCard } from '@/components/ui/ShineBorderCard'
import './ExperienceTimeline.css'

const HIGHLIGHT_PREVIEW_COUNT = 2

type ExperienceTimelineProps = {
  items: Experience[]
}

export function ExperienceTimeline({ items }: ExperienceTimelineProps) {
  return (
    <div className="timeline">
      {items.map((item) => (
        <ShineBorderCard key={item.id} active={item.isCurrent} hoverOnly={!item.isCurrent}>
          <article className="timeline-card">
            <div className="timeline-card__head">
              <div className="timeline-card__intro">
                <div className="timeline-card__role-row">
                  <h3 className="timeline-card__role">{item.role}</h3>
                  {item.isCurrent && (
                    <span className="timeline-card__badge">Current</span>
                  )}
                </div>
                {item.companyUrl ? (
                  <a
                    href={item.companyUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="timeline-card__company timeline-card__company--link"
                  >
                    {item.company}
                    <ExternalLinkIcon />
                  </a>
                ) : (
                  <p className="timeline-card__company">{item.company}</p>
                )}
              </div>
              <div className="timeline-card__meta">
                <span>{item.period}</span>
                <span>{item.location}</span>
              </div>
            </div>
            <ReadMoreList
              items={item.highlights}
              previewCount={HIGHLIGHT_PREVIEW_COUNT}
              listClassName="timeline-card__list"
              itemClassName="prose text-fluid-sm"
            />
          </article>
        </ShineBorderCard>
      ))}
    </div>
  )
}
