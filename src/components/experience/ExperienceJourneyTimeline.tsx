import type { CSSProperties } from 'react'
import type { Experience } from '@/types'
import { ExternalLinkIcon } from '@/components/ui/icons'
import { ReadMoreList } from '@/components/common/ReadMoreList'
import { CompanyLogo } from '@/components/experience/CompanyLogo'
import { ShineBorderCard } from '@/components/ui/ShineBorderCard'
import { useInView } from '@/hooks/useInView'
import { getExperienceAnchorId } from '@/utils/experienceHelpers'
import '@/components/experience/ExperienceCardEffects.css'
import './ExperienceJourneyTimeline.css'
import '@/components/experience/CompanyLogo.css'

const HIGHLIGHT_PREVIEW_COUNT = 4

type ExperienceJourneyTimelineProps = {
  items: Experience[]
  inView: boolean
}

type JourneyItemProps = {
  item: Experience
  index: number
  total: number
  parentInView: boolean
}

function JourneyItem({ item, index, total, parentInView }: JourneyItemProps) {
  const { ref, inView } = useInView<HTMLLIElement>({ threshold: 0.08, rootMargin: '0px 0px -6% 0px' })
  const revealed = parentInView && inView
  const roleNumber = String(total - index).padStart(2, '0')

  return (
    <li
      ref={ref}
      id={getExperienceAnchorId(item.id)}
      className={['journey__item', revealed ? 'journey__item--in-view' : ''].filter(Boolean).join(' ')}
      style={{ '--journey-delay': `${index * 90}ms` } as CSSProperties}
    >
      <div className="journey__marker" aria-hidden="true">
        <span className="journey__index">{roleNumber}</span>
        <span
          className={[
            'journey__dot',
            item.isCurrent ? 'journey__dot--current' : '',
          ]
            .filter(Boolean)
            .join(' ')}
        />
        {index < total - 1 && <span className="journey__connector" />}
      </div>

      <ShineBorderCard hoverOnly className="journey__card-wrap">
        <article className="journey-card">
          <header className="journey-card__head">
            <CompanyLogo experience={item} isCurrent={item.isCurrent} />

            <div className="journey-card__main">
              <div className="journey-card__role-row">
                <h3 className="journey-card__role">{item.role}</h3>
                {item.isCurrent && <span className="journey-card__badge">Current</span>}
              </div>

              {item.companyUrl ? (
                <a
                  href={item.companyUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="journey-card__company journey-card__company--link"
                >
                  {item.company}
                  <ExternalLinkIcon />
                </a>
              ) : (
                <p className="journey-card__company">{item.company}</p>
              )}
            </div>

            <div className="journey-card__meta">
              <time className="journey-card__meta-line journey-card__meta-line--period">
                {item.period}
              </time>
              <span className="journey-card__meta-line journey-card__meta-line--location">
                {item.location}
              </span>
            </div>
          </header>

          <ReadMoreList
            items={item.highlights}
            previewCount={HIGHLIGHT_PREVIEW_COUNT}
            className="journey-card__list-wrap"
            listClassName="journey-card__list"
            itemClassName="prose text-fluid-sm"
          />
        </article>
      </ShineBorderCard>
    </li>
  )
}

export function ExperienceJourneyTimeline({ items, inView }: ExperienceJourneyTimelineProps) {
  return (
    <ol
      className={['journey', inView ? 'journey--in-view' : ''].filter(Boolean).join(' ')}
      aria-label="Experience timeline"
    >
      {items.map((item, index) => (
        <JourneyItem
          key={item.id}
          item={item}
          index={index}
          total={items.length}
          parentInView={inView}
        />
      ))}
    </ol>
  )
}
