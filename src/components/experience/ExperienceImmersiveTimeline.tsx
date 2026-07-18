import type { CSSProperties } from 'react'
import type { Experience } from '@/types'
import { ReadMoreList } from '@/components/common/ReadMoreList'
import { ExperienceMobileRolePanel } from '@/components/experience/ExperienceMobileRolePanel'
import { ExperienceRoleIdentity } from '@/components/experience/ExperienceRoleIdentity'
import { ShineBorderCard } from '@/components/ui/ShineBorderCard'
import { useInView } from '@/hooks/useInView'
import { useSpotlight } from '@/hooks/useSpotlight'
import { getExperienceAnchorId } from '@/utils/experienceHelpers'
import { extractExperienceTags } from '@/utils/experienceTags'
import { getSkillIcon } from '@/utils/skillIcons'
import '@/components/experience/ExperienceCardEffects.css'
import './ExperienceImmersiveTimeline.css'
import '@/components/experience/ExperienceRoleIdentity.css'
import '@/components/experience/CompanyLogo.css'

const HIGHLIGHT_PREVIEW_COUNT = 5
const SKILL_TAG_LIMIT = 12

type ExperienceImmersiveTimelineProps = {
  items: Experience[]
  activeId: string
  inView: boolean
}

type ImmersiveItemProps = {
  item: Experience
  index: number
  total: number
  parentInView: boolean
  isActive: boolean
}

function ImmersiveItem({ item, index, total, parentInView, isActive }: ImmersiveItemProps) {
  const { ref, inView } = useInView<HTMLLIElement>({
    threshold: 0,
    rootMargin: index === 0 ? '0px' : '0px 0px -4% 0px',
  })
  const { spotlight, handleMouseMove, handleMouseLeave } = useSpotlight<HTMLDivElement>()
  const revealed = parentInView && (inView || index === 0)
  const roleNumber = String(total - index).padStart(2, '0')
  const tags = extractExperienceTags(item.highlights, SKILL_TAG_LIMIT, { includeCore: true })
  const isReverse = index % 2 === 1

  return (
    <li
      ref={ref}
      id={getExperienceAnchorId(item.id)}
      className={[
        'immersive__item',
        isReverse ? 'immersive__item--reverse' : '',
        revealed ? 'immersive__item--in-view' : '',
        isActive ? 'immersive__item--active' : '',
      ]
        .filter(Boolean)
        .join(' ')}
      style={{ '--immersive-delay': `${index * 100}ms` } as CSSProperties}
    >
      <div className="immersive__rail" aria-hidden="true">
        <span className="immersive__index">{roleNumber}</span>
        <span
          className={[
            'immersive__dot',
            item.isCurrent ? 'immersive__dot--current' : '',
          ]
            .filter(Boolean)
            .join(' ')}
        />
        {index < total - 1 && <span className="immersive__connector" />}
      </div>

      <div className="immersive__card-col">
        <ShineBorderCard hoverOnly className="immersive__card-wrap">
          <article
            className={[
              'immersive-card',
              isActive ? 'immersive-card--active' : '',
            ]
              .filter(Boolean)
              .join(' ')}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={
              {
                '--immersive-spot-x': `${spotlight.x}%`,
                '--immersive-spot-y': `${spotlight.y}%`,
              } as CSSProperties
            }
          >
            <span
              className={[
                'immersive-card__spotlight',
                spotlight.active ? 'immersive-card__spotlight--active' : '',
              ]
                .filter(Boolean)
                .join(' ')}
              aria-hidden="true"
            />
            <span className="immersive-card__scan" aria-hidden="true" />

            <ExperienceMobileRolePanel
              experience={item}
              roleNumber={roleNumber}
              isActive={isActive}
            />

            <div className="immersive-card__body immersive-card__body--mobile">
              <div className="immersive-card__content">
                <div className="immersive-card__identity-desktop">
                  <ExperienceRoleIdentity experience={item} headingLevel="h3" titleOrder="role-first" />
                </div>

                {tags.length > 0 ? (
                  <ul className="immersive-card__tags" aria-label="Skills and technologies">
                    {tags.map((tag, tagIndex) => {
                      const icon = getSkillIcon(tag)

                      return (
                        <li
                          key={tag}
                          className="immersive-card__tag"
                          style={
                            {
                              '--immersive-tag-delay': `${tagIndex * 45}ms`,
                            } as CSSProperties
                          }
                        >
                          {icon ? (
                            <img
                              src={icon}
                              alt=""
                              className="immersive-card__tag-icon"
                              loading="lazy"
                              decoding="async"
                            />
                          ) : (
                            <span className="immersive-card__tag-dot" aria-hidden="true" />
                          )}
                          <span className="immersive-card__tag-label">{tag}</span>
                        </li>
                      )
                    })}
                  </ul>
                ) : null}

                <div className="immersive-card__highlights">
                  <ReadMoreList
                    items={item.highlights}
                    previewCount={HIGHLIGHT_PREVIEW_COUNT}
                    className="immersive-card__list-wrap"
                    listClassName="immersive-card__list"
                    itemClassName="immersive-card__list-item prose text-fluid-sm"
                  />
                </div>
              </div>
            </div>
          </article>
        </ShineBorderCard>
      </div>
    </li>
  )
}

export function ExperienceImmersiveTimeline({
  items,
  activeId,
  inView,
}: ExperienceImmersiveTimelineProps) {
  return (
    <ol
      className={['immersive', inView ? 'immersive--in-view' : ''].filter(Boolean).join(' ')}
      aria-label="Experience timeline"
    >
      {items.map((item, index) => (
        <ImmersiveItem
          key={item.id}
          item={item}
          index={index}
          total={items.length}
          parentInView={inView}
          isActive={item.id === activeId}
        />
      ))}
    </ol>
  )
}
