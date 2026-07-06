import type { CSSProperties } from 'react'
import type { Experience } from '@/types'
import { ExternalLinkIcon } from '@/components/ui/icons'
import { ReadMoreList } from '@/components/common/ReadMoreList'
import { CompanyLogo } from '@/components/experience/CompanyLogo'
import { ExperienceCareerSnapshot } from '@/components/experience/ExperienceCareerSnapshot'
import { ShineBorderCard } from '@/components/ui/ShineBorderCard'
import { useInView } from '@/hooks/useInView'
import { useSpotlight } from '@/hooks/useSpotlight'
import { getExperienceAnchorId } from '@/utils/experienceHelpers'
import { extractExperienceTags } from '@/utils/experienceTags'
import '@/components/common/ViewAllCard.css'
import '@/components/experience/ExperienceCareerSnapshot.css'
import '@/components/experience/ExperienceCardEffects.css'
import './HomeExperienceShowcase.css'
import '@/components/experience/CompanyLogo.css'

const HOME_HIGHLIGHT_PREVIEW = 2
const PAGE_HIGHLIGHT_PREVIEW = 5

type HomeExperienceShowcaseProps = {
  items: Experience[]
  variant?: 'home' | 'page'
  activeId?: string
}

type ExperienceRailItemProps = {
  item: Experience
  index: number
  total: number
  isActive: boolean
  highlightPreview: number
}

function ExperienceRailItem({
  item,
  index,
  total,
  isActive,
  highlightPreview,
}: ExperienceRailItemProps) {
  const { ref, inView } = useInView<HTMLLIElement>({ threshold: 0.08, rootMargin: '0px 0px -6% 0px' })
  const { spotlight, handleMouseMove, handleMouseLeave } = useSpotlight<HTMLElement>()
  const tags = extractExperienceTags(item.highlights, 4)
  const roleNumber = String(total - index).padStart(2, '0')

  return (
    <li
      ref={ref}
      id={getExperienceAnchorId(item.id)}
      className={[
        'home-experience__item',
        isActive ? 'home-experience__item--active' : '',
        inView ? 'home-experience__item--in-view' : '',
      ]
        .filter(Boolean)
        .join(' ')}
      style={{ '--home-exp-delay': `${index * 90}ms` } as CSSProperties}
    >
      <div className="home-experience__marker" aria-hidden="true">
        <span className="home-experience__index">{roleNumber}</span>
        <span
          className={[
            'home-experience__dot',
            item.isCurrent ? 'home-experience__dot--current' : '',
            isActive ? 'home-experience__dot--active' : '',
          ]
            .filter(Boolean)
            .join(' ')}
        />
        {index < total - 1 && <span className="home-experience__connector" />}
      </div>

      <ShineBorderCard hoverOnly className="home-experience__card-wrap">
        <article
          className="home-experience__card"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={
            {
              '--home-exp-spot-x': `${spotlight.x}%`,
              '--home-exp-spot-y': `${spotlight.y}%`,
            } as CSSProperties
          }
        >
          <span
            className={[
              'home-experience__card-spotlight',
              spotlight.active ? 'home-experience__card-spotlight--active' : '',
            ]
              .filter(Boolean)
              .join(' ')}
            aria-hidden="true"
          />
          <span className="home-experience__card-scan" aria-hidden="true" />

          <header className="home-experience__card-head">
            <CompanyLogo experience={item} isCurrent={item.isCurrent} />

            <div className="home-experience__card-main">
              <div className="home-experience__title-row">
                <h3 className="home-experience__role">{item.role}</h3>
                {item.isCurrent && <span className="home-experience__badge">Current</span>}
              </div>

              {item.companyUrl ? (
                <a
                  href={item.companyUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="home-experience__company home-experience__company--link"
                >
                  {item.company}
                  <ExternalLinkIcon />
                </a>
              ) : (
                <p className="home-experience__company">{item.company}</p>
              )}
            </div>

            <div className="home-experience__meta">
              <time className="home-experience__meta-line home-experience__meta-line--period">
                {item.period}
              </time>
              <span className="home-experience__meta-line home-experience__meta-line--location">
                {item.location}
              </span>
              <span className="home-experience__impact-count">{item.highlights.length} impacts</span>
            </div>
          </header>

          {tags.length > 0 ? (
            <ul className="home-experience__tags" aria-label="Technologies">
              {tags.map((tag) => (
                <li key={tag}>{tag}</li>
              ))}
            </ul>
          ) : null}

          <ReadMoreList
            items={item.highlights}
            previewCount={highlightPreview}
            className="home-experience__card-body"
            listClassName="home-experience__list"
            itemClassName="prose text-fluid-sm"
          />
        </article>
      </ShineBorderCard>
    </li>
  )
}

export function HomeExperienceShowcase({
  items,
  variant = 'home',
  activeId,
}: HomeExperienceShowcaseProps) {
  const isPage = variant === 'page'
  const highlightPreview = isPage ? PAGE_HIGHLIGHT_PREVIEW : HOME_HIGHLIGHT_PREVIEW

  return (
    <div className={['home-experience', isPage ? 'home-experience--page' : ''].filter(Boolean).join(' ')}>
      <ExperienceCareerSnapshot items={items} variant={variant} activeId={activeId} />

      <ol className="home-experience__rail" aria-label="Experience timeline">
        {items.map((item, index) => {
          if (isPage) {
            return (
              <ExperienceRailItem
                key={item.id}
                item={item}
                index={index}
                total={items.length}
                isActive={item.id === activeId}
                highlightPreview={highlightPreview}
              />
            )
          }

          return (
            <li key={item.id} className="home-experience__item">
              <div className="home-experience__marker" aria-hidden="true">
                <span
                  className={[
                    'home-experience__dot',
                    item.isCurrent ? 'home-experience__dot--current' : '',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                />
                {index < items.length - 1 && <span className="home-experience__connector" />}
              </div>

              <ShineBorderCard hoverOnly className="home-experience__card-wrap">
                <article className="home-experience__card">
                  <header className="home-experience__card-head">
                    <CompanyLogo experience={item} isCurrent={item.isCurrent} />

                    <div className="home-experience__card-main">
                      <div className="home-experience__title-row">
                        <h3 className="home-experience__role">{item.role}</h3>
                        {item.isCurrent && (
                          <span className="home-experience__badge">Current</span>
                        )}
                      </div>

                      {item.companyUrl ? (
                        <a
                          href={item.companyUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="home-experience__company home-experience__company--link"
                        >
                          {item.company}
                          <ExternalLinkIcon />
                        </a>
                      ) : (
                        <p className="home-experience__company">{item.company}</p>
                      )}
                    </div>

                    <div className="home-experience__meta">
                      <time className="home-experience__meta-line home-experience__meta-line--period">
                        {item.period}
                      </time>
                      <span className="home-experience__meta-line home-experience__meta-line--location">
                        {item.location}
                      </span>
                    </div>
                  </header>

                  <ReadMoreList
                    items={item.highlights}
                    previewCount={highlightPreview}
                    className="home-experience__card-body"
                    listClassName="home-experience__list"
                    itemClassName="prose text-fluid-sm"
                  />
                </article>
              </ShineBorderCard>
            </li>
          )
        })}
      </ol>
    </div>
  )
}
