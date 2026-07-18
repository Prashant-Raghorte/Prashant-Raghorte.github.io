import { useRef, useState, type CSSProperties, type FocusEvent, type PointerEvent } from 'react'
import { ProjectLogo } from '@/components/projects/ProjectLogo'
import type { ProductDeliveryLedger } from '@/utils/projectDeliveryProfile'
import './ProjectDeliveryLedgerPanel.css'
import '@/components/projects/ProjectLogo.css'

type ProjectDeliveryLedgerPanelProps = {
  ledger: ProductDeliveryLedger
  title: string
  hint?: string
  legendLabel: string
  totalLabel: string
  shareLabel: string
}

export function ProjectDeliveryLedgerPanel({
  ledger,
  title,
  hint,
  legendLabel,
  totalLabel,
  shareLabel,
}: ProjectDeliveryLedgerPanelProps) {
  const [globalSegmentId, setGlobalSegmentId] = useState<string | null>(null)
  const [rowSegmentFocus, setRowSegmentFocus] = useState<{
    rowId: string
    segmentId: string
  } | null>(null)
  const [ringHovered, setRingHovered] = useState(false)
  const clearSegmentFocusFrame = useRef<number | null>(null)

  const SEGMENT_INTERACTIVE_SELECTOR =
    '.delivery-ledger__legend-chip, .delivery-ledger__prism-segment, .delivery-ledger__ring'

  const clearSegmentFocus = () => {
    setGlobalSegmentId(null)
    setRowSegmentFocus(null)
    setRingHovered(false)
  }

  const clearSegmentFocusIfPointerOutsideInteractors = (clientX: number, clientY: number) => {
    if (clearSegmentFocusFrame.current !== null) {
      cancelAnimationFrame(clearSegmentFocusFrame.current)
    }

    clearSegmentFocusFrame.current = requestAnimationFrame(() => {
      clearSegmentFocusFrame.current = null
      const element = document.elementFromPoint(clientX, clientY)
      if (element?.closest(SEGMENT_INTERACTIVE_SELECTOR)) return
      clearSegmentFocus()
    })
  }

  const handleSegmentPointerLeave = (event: PointerEvent<HTMLElement>) => {
    clearSegmentFocusIfPointerOutsideInteractors(event.clientX, event.clientY)
  }

  const handleSegmentBlur = (event: FocusEvent<HTMLElement>) => {
    const related = event.relatedTarget as Node | null
    if (related instanceof Element && related.closest(SEGMENT_INTERACTIVE_SELECTOR)) return
    clearSegmentFocus()
  }

  if (ledger.rows.length === 0) return null

  const globalSegmentFocus = globalSegmentId !== null
  const activeSegment = ledger.aggregateSegments.find((segment) => segment.id === globalSegmentId)

  const focusGlobalSegment = (segmentId: string) => {
    setRowSegmentFocus(null)
    setGlobalSegmentId(segmentId)
  }

  const getSegmentIdAtRingAngle = (angleDeg: number) => {
    for (const arc of ledger.ringSegments) {
      const end = arc.startDeg + arc.spanDeg
      if (angleDeg >= arc.startDeg && angleDeg < end) return arc.id
    }

    return ledger.ringSegments[ledger.ringSegments.length - 1]?.id ?? null
  }

  const handleRingPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const x = event.clientX - (rect.left + rect.width / 2)
    const y = event.clientY - (rect.top + rect.height / 2)
    const distance = Math.hypot(x, y)
    const outerRadius = rect.width / 2
    const innerRadius = outerRadius * 0.739

    if (distance < innerRadius) {
      setRingHovered(true)
      setGlobalSegmentId(null)
      return
    }

    if (distance > outerRadius) {
      setRingHovered(false)
      return
    }

    setRingHovered(false)

    let angleDeg = (Math.atan2(y, x) * 180) / Math.PI + 90
    if (angleDeg < 0) angleDeg += 360
    if (angleDeg >= 360) angleDeg -= 360

    const segmentId = getSegmentIdAtRingAngle(angleDeg)
    if (segmentId) focusGlobalSegment(segmentId)
  }

  const clearSegmentFocusOnLeave = (event: PointerEvent<HTMLDivElement>) => {
    const nextTarget = event.relatedTarget as Node | null
    if (!nextTarget || !event.currentTarget.contains(nextTarget)) {
      clearSegmentFocus()
    }
  }

  const getPrismSegmentState = (segmentId: string, rowId: string) => {
    if (globalSegmentFocus) {
      return {
        linked: globalSegmentId === segmentId,
        dimmed: globalSegmentId !== segmentId,
      }
    }

    if (rowSegmentFocus && rowSegmentFocus.rowId === rowId) {
      return {
        linked: rowSegmentFocus.segmentId === segmentId,
        dimmed: rowSegmentFocus.segmentId !== segmentId,
      }
    }

    return { linked: false, dimmed: false }
  }

  const getPillSegmentState = (segmentId: string, rowId: string) => {
    if (globalSegmentFocus) {
      return getPrismSegmentState(segmentId, rowId)
    }

    if (rowSegmentFocus && rowSegmentFocus.rowId === rowId) {
      return {
        linked: rowSegmentFocus.segmentId === segmentId,
        dimmed: rowSegmentFocus.segmentId !== segmentId,
      }
    }

    return { linked: false, dimmed: false }
  }

  const hudLinked = ringHovered || globalSegmentFocus
  const hudStyle = globalSegmentFocus && activeSegment
    ? ({ '--hud-segment-color': activeSegment.color } as CSSProperties)
    : undefined

  return (
    <div
      className={[
        'delivery-ledger',
        globalSegmentFocus ? 'delivery-ledger--segment-focus' : '',
        rowSegmentFocus ? 'delivery-ledger--row-segment-focus' : '',
        ringHovered ? 'delivery-ledger--ring-focus' : '',
      ]
        .filter(Boolean)
        .join(' ')}
      onPointerLeave={clearSegmentFocusOnLeave}
    >
      <span className="delivery-ledger__mesh" aria-hidden="true" />
      <span className="delivery-ledger__scan" aria-hidden="true" />

      <header className="delivery-ledger__head">
        <span className="delivery-ledger__accent" aria-hidden="true" />
        <div className="delivery-ledger__head-copy">
          <h3 className="delivery-ledger__title">{title}</h3>
          {hint ? <p className="delivery-ledger__hint">{hint}</p> : null}
        </div>
      </header>

      <div
        className={[
          'delivery-ledger__hud',
          hudLinked ? 'delivery-ledger__hud--linked' : '',
          globalSegmentFocus ? 'delivery-ledger__hud--segment-linked' : '',
        ]
          .filter(Boolean)
          .join(' ')}
        style={hudStyle}
      >
        <div
          className="delivery-ledger__ring"
          onPointerMove={handleRingPointerMove}
          onPointerLeave={handleSegmentPointerLeave}
          onFocus={() => setRingHovered(true)}
          onBlur={() => setRingHovered(false)}
          tabIndex={0}
          aria-label={`${ledger.portfolioTotal} ${totalLabel}`}
        >
          {ledger.ringSegments.map((arc) => {
            const linked = globalSegmentFocus && globalSegmentId === arc.id
            const dimmed = globalSegmentFocus && globalSegmentId !== arc.id

            return (
              <span
                key={arc.id}
                className={[
                  'delivery-ledger__ring-arc',
                  linked ? 'delivery-ledger__ring-arc--linked' : '',
                  dimmed ? 'delivery-ledger__ring-arc--dimmed' : '',
                ]
                  .filter(Boolean)
                  .join(' ')}
                style={
                  {
                    '--arc-start': `${arc.startDeg}deg`,
                    '--arc-span': `${arc.spanDeg}deg`,
                    '--ledger-segment-color': arc.color,
                  } as CSSProperties
                }
                aria-hidden="true"
              />
            )
          })}
          <span className="delivery-ledger__ring-glow" aria-hidden="true" />
          <span className="delivery-ledger__ring-core">
            <span className="delivery-ledger__ring-value">{ledger.portfolioTotal}</span>
            <span className="delivery-ledger__ring-label">{totalLabel}</span>
          </span>
        </div>

        <div className="delivery-ledger__hud-copy">
          <p className="delivery-ledger__hud-kicker">
            {ledger.productCount} products · {legendLabel}
          </p>
          <ul className="delivery-ledger__legend" aria-label={legendLabel}>
            {ledger.aggregateSegments.map((item) => (
              <li key={item.id}>
                <button
                  type="button"
                  className={[
                    'delivery-ledger__legend-chip',
                    globalSegmentId === item.id ? 'delivery-ledger__legend-chip--linked' : '',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                  style={{ '--ledger-segment-color': item.color } as CSSProperties}
                  onPointerEnter={() => focusGlobalSegment(item.id)}
                  onPointerLeave={handleSegmentPointerLeave}
                  onFocus={() => focusGlobalSegment(item.id)}
                  onBlur={handleSegmentBlur}
                >
                  <span className="delivery-ledger__legend-swatch" aria-hidden="true" />
                  <span className="delivery-ledger__legend-copy">
                    <span className="delivery-ledger__legend-label">{item.label}</span>
                    <span className="delivery-ledger__legend-meta">
                      {item.value} · {item.share}%
                    </span>
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <ol className="delivery-ledger__list" aria-label={title}>
        {ledger.rows.map((row, index) => {
          const rowLinked = rowSegmentFocus?.rowId === row.id

          return (
            <li
              key={row.id}
              className={[
                'delivery-ledger__row',
                rowLinked ? 'delivery-ledger__row--linked' : '',
                rowSegmentFocus?.rowId === row.id ? 'delivery-ledger__row--segment-active' : '',
              ]
                .filter(Boolean)
                .join(' ')}
              style={{ '--ledger-row-delay': `${index * 70}ms` } as CSSProperties}
            >
              <span className="delivery-ledger__rank" aria-hidden="true">
                {String(row.rank).padStart(2, '0')}
              </span>

              <div className="delivery-ledger__logo">
                <ProjectLogo
                  project={{
                    title: row.title,
                    logoUrl: row.logoUrl,
                    url: row.url,
                    repoUrl: row.repoUrl,
                  }}
                  size="sm"
                />
              </div>

              <div className="delivery-ledger__lane">
                <div
                  className="delivery-ledger__row-head"
                  onPointerEnter={clearSegmentFocus}
                >
                  <div className="delivery-ledger__row-copy">
                    <div className="delivery-ledger__title-row">
                      <span className="delivery-ledger__row-title">{row.title}</span>
                      <span className="delivery-ledger__domain-tag">{row.domain}</span>
                    </div>
                  </div>
                  <div className="delivery-ledger__row-meta">
                    <span className="delivery-ledger__row-total">{row.total}</span>
                    <span className="delivery-ledger__row-share">
                      {row.share}
                      {shareLabel}
                    </span>
                  </div>
                </div>

                <div
                  className="delivery-ledger__prism-track"
                  style={{ '--ledger-bar-score': row.barScore } as CSSProperties}
                >
                  <div
                    className="delivery-ledger__prism"
                    role="group"
                    aria-label={`${row.title} delivery mix`}
                    onPointerLeave={handleSegmentPointerLeave}
                  >
                    {row.segments.map((segment) => {
                      const segmentState = getPrismSegmentState(segment.id, row.id)

                      return (
                        <button
                          key={segment.id}
                          type="button"
                          className={[
                            'delivery-ledger__prism-segment',
                            segmentState.linked ? 'delivery-ledger__prism-segment--linked' : '',
                            segmentState.dimmed ? 'delivery-ledger__prism-segment--dimmed' : '',
                          ]
                            .filter(Boolean)
                            .join(' ')}
                          style={
                            {
                              '--ledger-segment-share': (segment.value / row.total) * 100,
                              '--ledger-segment-color': segment.color,
                            } as CSSProperties
                          }
                          aria-label={`${segment.label}: ${segment.value}`}
                          onPointerEnter={() => focusGlobalSegment(segment.id)}
                          onPointerLeave={handleSegmentPointerLeave}
                          onFocus={() => focusGlobalSegment(segment.id)}
                          onBlur={handleSegmentBlur}
                        />
                      )
                    })}
                  </div>
                </div>

                <ul className="delivery-ledger__segment-pills" aria-label={`${row.title} breakdown`}>
                  {row.segments.map((segment) => {
                    const segmentState = getPillSegmentState(segment.id, row.id)

                    return (
                      <li key={segment.id}>
                        <button
                          type="button"
                          className={[
                            'delivery-ledger__segment-pill',
                            segmentState.linked ? 'delivery-ledger__segment-pill--linked' : '',
                            segmentState.dimmed ? 'delivery-ledger__segment-pill--dimmed' : '',
                          ]
                            .filter(Boolean)
                            .join(' ')}
                          style={{ '--ledger-segment-color': segment.color } as CSSProperties}
                          onMouseEnter={() => {
                            setGlobalSegmentId(null)
                            setRowSegmentFocus({ rowId: row.id, segmentId: segment.id })
                          }}
                          onMouseLeave={() => setRowSegmentFocus(null)}
                          onFocus={() => {
                            setGlobalSegmentId(null)
                            setRowSegmentFocus({ rowId: row.id, segmentId: segment.id })
                          }}
                          onBlur={() => setRowSegmentFocus(null)}
                        >
                          <span>{segment.label}</span>
                          <strong>{segment.value}</strong>
                        </button>
                      </li>
                    )
                  })}
                </ul>
              </div>
            </li>
          )
        })}
      </ol>
    </div>
  )
}
