import { useId, useRef, useState, type CSSProperties, type PointerEvent } from 'react'
import { aboutBioParagraphs } from '@/data/about'
import { ShineBorderCard } from '@/components/ui/ShineBorderCard'
import './AboutBioCard.css'

const BIO_CHAPTERS = [
  { id: 'origin', label: 'Origin', hint: 'Profile' },
  { id: 'craft', label: 'Craft', hint: 'Delivery' },
  { id: 'open', label: 'Open to', hint: 'Next step' },
] as const

export function AboutBioCard() {
  const labelId = useId()
  const [active, setActive] = useState(0)
  const [hotLane, setHotLane] = useState<number | null>(null)
  const laneRefs = useRef<(HTMLButtonElement | null)[]>([])

  function handleLanePointer(index: number, event: PointerEvent<HTMLButtonElement>) {
    const node = laneRefs.current[index]
    if (!node) return
    const rect = node.getBoundingClientRect()
    if (rect.width === 0 || rect.height === 0) return
    node.style.setProperty('--lane-x', `${((event.clientX - rect.left) / rect.width) * 100}%`)
    node.style.setProperty('--lane-y', `${((event.clientY - rect.top) / rect.height) * 100}%`)
    setActive(index)
    setHotLane(index)
  }

  const activeChapter = BIO_CHAPTERS[active] ?? BIO_CHAPTERS[0]

  return (
    <ShineBorderCard hoverOnly className="about-bio-card">
      <article
        className={['about-bio', hotLane !== null ? 'about-bio--armed' : '']
          .filter(Boolean)
          .join(' ')}
        style={
          {
            '--bio-active': active,
            '--bio-progress': `${((active + 1) / aboutBioParagraphs.length) * 100}%`,
          } as CSSProperties
        }
        aria-labelledby={labelId}
        onPointerLeave={() => setHotLane(null)}
      >
        <div className="about-bio__mesh" aria-hidden="true" />
        <div className="about-bio__glow" aria-hidden="true" />
        <div className="about-bio__sheen" aria-hidden="true" />

        <header className="about-bio__chrome">
          <div className="about-bio__identity">
            <span className="about-bio__orb" aria-hidden="true">
              <span className="about-bio__orb-ring" />
              <span className="about-bio__orb-core" />
            </span>
            <div className="about-bio__identity-copy">
              <p className="about-bio__eyebrow" id={labelId}>
                Narrative lattice
              </p>
              <h3 className="about-bio__heading">Professional overview</h3>
            </div>
          </div>

          <div className="about-bio__switch" role="tablist" aria-label="Bio chapters">
            {BIO_CHAPTERS.map((chapter, index) => (
              <button
                key={chapter.id}
                type="button"
                role="tab"
                aria-selected={active === index}
                className={[
                  'about-bio__chip',
                  active === index ? 'about-bio__chip--active' : '',
                ]
                  .filter(Boolean)
                  .join(' ')}
                onClick={() => setActive(index)}
                onPointerEnter={() => setActive(index)}
              >
                <span className="about-bio__chip-idx">{String(index + 1).padStart(2, '0')}</span>
                <span className="about-bio__chip-label">{chapter.label}</span>
              </button>
            ))}
            <span
              className="about-bio__switch-thumb"
              aria-hidden="true"
              style={{ '--bio-thumb': active } as CSSProperties}
            />
          </div>
        </header>

        <div className="about-bio__progress" aria-hidden="true">
          <span className="about-bio__progress-track" />
          <span className="about-bio__progress-fill" />
          <span className="about-bio__progress-label">{activeChapter.hint}</span>
        </div>

        <div className="about-bio__stack">
          <div className="about-bio__conductor" aria-hidden="true">
            <span className="about-bio__conductor-fill" />
          </div>

          {aboutBioParagraphs.map((paragraph, index) => {
            const chapter = BIO_CHAPTERS[index]
            return (
              <button
                key={chapter?.id ?? index}
                type="button"
                ref={(node) => {
                  laneRefs.current[index] = node
                }}
                className={[
                  'about-bio__panel',
                  active === index ? 'about-bio__panel--active' : '',
                  hotLane === index ? 'about-bio__panel--hot' : '',
                  hotLane !== null && hotLane !== index ? 'about-bio__panel--dim' : '',
                  index === 0 ? 'about-bio__panel--lead' : '',
                  index === 1 ? 'about-bio__panel--craft' : '',
                ]
                  .filter(Boolean)
                  .join(' ')}
                style={{ '--bio-i': index } as CSSProperties}
                onClick={() => setActive(index)}
                onPointerEnter={(event) => handleLanePointer(index, event)}
                onPointerMove={(event) => handleLanePointer(index, event)}
                aria-pressed={active === index}
              >
                <span className="about-bio__panel-spot" aria-hidden="true" />
                <span className="about-bio__panel-beam" aria-hidden="true" />
                <span className="about-bio__panel-edge" aria-hidden="true" />
                <span className="about-bio__panel-node" aria-hidden="true" />
                <span className="about-bio__panel-main">
                  <span className="about-bio__panel-meta">
                    <span className="about-bio__panel-tag">{chapter?.label}</span>
                    <span className="about-bio__panel-code">
                      BIO/{String(index + 1).padStart(2, '0')}
                    </span>
                  </span>
                  <span className="about-bio__panel-text">{paragraph}</span>
                </span>
              </button>
            )
          })}
        </div>
      </article>
    </ShineBorderCard>
  )
}
