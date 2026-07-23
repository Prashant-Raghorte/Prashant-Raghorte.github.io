import {
  useId,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
  type PointerEvent,
} from 'react'
import { siteConfig } from '@/config/site'
import { getResumeDownloadFilename, siteCopy } from '@/config/copy'
import { ROUTES } from '@/constants'
import {
  aboutAvailabilityShort,
  aboutFocusProfiles,
  aboutFocusProof,
} from '@/data/about'
import { Button } from '@/components/ui/Button'
import { DownloadIcon } from '@/components/ui/icons'
import { ShineBorderCard } from '@/components/ui/ShineBorderCard'
import './AboutHighlightsCard.css'

export function AboutHighlightsCard() {
  const focusId = useId()
  const panelId = useId()
  const cardRef = useRef<HTMLElement>(null)
  const [active, setActive] = useState(0)
  const [pointer, setPointer] = useState({ x: 72, y: 28 })
  const [cardHot, setCardHot] = useState(false)

  const current = aboutFocusProfiles[active] ?? aboutFocusProfiles[0]
  const total = aboutFocusProfiles.length

  function select(next: number) {
    setActive(((next % total) + total) % total)
  }

  function handlePointerMove(event: PointerEvent<HTMLElement>) {
    const node = cardRef.current
    if (!node) return
    const rect = node.getBoundingClientRect()
    if (rect.width === 0 || rect.height === 0) return
    setPointer({
      x: ((event.clientX - rect.left) / rect.width) * 100,
      y: ((event.clientY - rect.top) / rect.height) * 100,
    })
  }

  function onKeyNav(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
      event.preventDefault()
      select(active + 1)
    }
    if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
      event.preventDefault()
      select(active - 1)
    }
    if (event.key === 'Home') {
      event.preventDefault()
      select(0)
    }
    if (event.key === 'End') {
      event.preventDefault()
      select(total - 1)
    }
  }

  return (
    <ShineBorderCard hoverOnly className="about-focus-card">
      <article
        ref={cardRef}
        className={['about-focus', cardHot ? 'about-focus--hot' : ''].filter(Boolean).join(' ')}
        onPointerEnter={() => setCardHot(true)}
        onPointerLeave={() => setCardHot(false)}
        onPointerMove={handlePointerMove}
        style={
          {
            '--focus-i': active,
            '--focus-n': total,
            '--focus-x': `${pointer.x}%`,
            '--focus-y': `${pointer.y}%`,
            '--focus-progress': `${((active + 1) / total) * 100}%`,
            '--focus-ink': `var(--focus-tone-${current.toneKey})`,
          } as CSSProperties
        }
      >
        <header className="about-focus__head">
          <div className="about-focus__badge">
            <span className="about-focus__badge-kicker">
              <span className="about-focus__pulse" />
              Spectrum
            </span>
            <h3 id={focusId} className="about-focus__title">
              Focus areas
            </h3>
          </div>
          <div className="about-focus__dial" aria-hidden="true">
            <span className="about-focus__dial-ring" />
            <span className="about-focus__dial-value">
              {String(active + 1).padStart(2, '0')}
            </span>
          </div>
        </header>

        <div
          className="about-focus__stage"
          id={panelId}
          role="tabpanel"
          aria-labelledby={`${focusId}-${current.code}`}
        >
          <div className="about-focus__route" key={current.code}>
            <div className="about-focus__route-top">
              <span className="about-focus__method">{current.method}</span>
              <code className="about-focus__path">{current.route}</code>
              <span className="about-focus__status">
                <span className="about-focus__status-dot" />
                {current.status}
              </span>
            </div>

            <div className="about-focus__route-body">
              <div className="about-focus__route-title">
                <p className="about-focus__stage-label">{current.label}</p>
                <span className="about-focus__lane">{current.lane}</span>
              </div>
              <p className="about-focus__stage-detail">{current.detail}</p>
            </div>

            <ul className="about-focus__chips">
              {current.chips.map((chip) => (
                <li key={chip} className="about-focus__chip">
                  {chip}
                </li>
              ))}
            </ul>

            <span className="about-focus__stage-bar" aria-hidden="true">
              <span />
            </span>
          </div>
        </div>

        <div
          className="about-focus__keys"
          role="tablist"
          aria-label="Focus areas"
          onKeyDown={onKeyNav}
        >
          {aboutFocusProfiles.map((item, index) => {
            const selected = index === active
            return (
              <button
                key={item.code}
                type="button"
                role="tab"
                id={`${focusId}-${item.code}`}
                aria-selected={selected}
                aria-controls={panelId}
                tabIndex={selected ? 0 : -1}
                className={[
                  'about-focus__key',
                  selected ? 'about-focus__key--active' : '',
                ]
                  .filter(Boolean)
                  .join(' ')}
                style={
                  {
                    '--key-i': index,
                    '--key-tone': `var(--focus-tone-${item.toneKey})`,
                  } as CSSProperties
                }
                onClick={() => select(index)}
                onMouseEnter={() => select(index)}
                onFocus={() => select(index)}
              >
                <span className="about-focus__key-ripple" aria-hidden="true" />
                <span className="about-focus__key-code">{item.code}</span>
                <span className="about-focus__key-index">
                  {String(index + 1).padStart(2, '0')}
                </span>
              </button>
            )
          })}
        </div>

        <section className="about-focus__open" aria-label="Open to">
          <p className="about-focus__open-label">Open to</p>
          <ul className="about-focus__stamps">
            {aboutAvailabilityShort.map((item) => (
              <li key={item.label} className="about-focus__stamp">
                {item.short}
              </li>
            ))}
          </ul>
        </section>

        <section className="about-focus__proof" aria-label="Ship proof">
          <div className="about-focus__proof-head">
            <p className="about-focus__open-label">Ship proof</p>
            <span className="about-focus__proof-base" aria-hidden="true">
              {siteConfig.location}
            </span>
          </div>
          <ul className="about-focus__metrics">
            {aboutFocusProof.map((item) => (
              <li key={item.label} className="about-focus__metric">
                <span className="about-focus__metric-value">{item.value}</span>
                <span className="about-focus__metric-label">{item.label}</span>
              </li>
            ))}
          </ul>
        </section>

        <div className="about-focus__actions">
          <Button
            variant="shine"
            href={siteConfig.resumeUrl}
            download={getResumeDownloadFilename(siteConfig.name)}
            icon={<DownloadIcon />}
          >
            {siteCopy.footer.downloadCv}
          </Button>
          <Button variant="ghost" to={ROUTES.CONTACT}>
            Get in touch
          </Button>
        </div>
      </article>
    </ShineBorderCard>
  )
}
