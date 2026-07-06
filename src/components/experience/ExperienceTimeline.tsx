import type { Experience } from '@/types'
import { ExternalLinkIcon } from '@/components/ui/icons'
import { ReadMoreList } from '@/components/common/ReadMoreList'
import { CompanyLogo } from '@/components/experience/CompanyLogo'
import { ShineBorderCard } from '@/components/ui/ShineBorderCard'
import '@/components/experience/ExperienceCardEffects.css'
import './ExperienceTimeline.css'
import '@/components/experience/CompanyLogo.css'

const HIGHLIGHT_PREVIEW_COUNT = 3

type ExperienceTimelineProps = {
  items: Experience[]
}

export function ExperienceTimeline({ items }: ExperienceTimelineProps) {
  return (
    <ol className="timeline" aria-label="Experience timeline">
      {items.map((item, index) => (
        <li key={item.id} className="timeline__item">
          <div className="timeline__marker" aria-hidden="true">
            <span
              className={[
                'timeline__dot',
                item.isCurrent ? 'timeline__dot--current' : '',
              ]
                .filter(Boolean)
                .join(' ')}
            />
            {index < items.length - 1 && <span className="timeline__connector" />}
          </div>

          <ShineBorderCard hoverOnly className="timeline__card-wrap">
            <article className="timeline-card">
              <header className="timeline-card__head">
                <CompanyLogo experience={item} isCurrent={item.isCurrent} />

                <div className="timeline-card__main">
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
                  <time className="timeline-card__meta-line timeline-card__meta-line--period">
                    {item.period}
                  </time>
                  <span className="timeline-card__meta-line timeline-card__meta-line--location">
                    {item.location}
                  </span>
                </div>
              </header>

              <ReadMoreList
                items={item.highlights}
                previewCount={HIGHLIGHT_PREVIEW_COUNT}
                className="timeline-card__list-wrap"
                listClassName="timeline-card__list"
                itemClassName="prose text-fluid-sm"
              />
            </article>
          </ShineBorderCard>
        </li>
      ))}
    </ol>
  )
}
