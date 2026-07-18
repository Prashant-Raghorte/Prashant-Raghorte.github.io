import { Fragment, useEffect, useRef, useState } from 'react'
import type { CSSProperties } from 'react'
import type { Project } from '@/types'
import { siteCopy } from '@/config/copy'
import { ProjectLogo } from '@/components/projects/ProjectLogo'
import { getProjectAnchorId } from '@/utils/projectHelpers'
import { scrollToElement } from '@/utils/scroll'
import './ProjectCatalogTimeline.css'
import '@/components/projects/ProjectLogo.css'

type ProjectCatalogTimelineProps = {
  projects: Project[]
  activeId: string
  inView: boolean
}

function getBridgePath(dip: boolean): string {
  return dip ? 'M 0 12 Q 50 22 100 12' : 'M 0 12 Q 50 2 100 12'
}

/** Time for one comet hop across a bridge */
const HOP_MS = 920
/** Pause on the destination node before the next hop.
    Must exceed the 550ms catch-ring animation so it is never cut off mid-play. */
const HOLD_MS = 600

export function ProjectCatalogTimeline({
  projects,
  activeId,
  inView,
}: ProjectCatalogTimelineProps) {
  const copy = siteCopy.sections.projectsPage
  const nodeCount = projects.length
  const bridgeCount = Math.max(nodeCount - 1, 0)
  const activeIndex = Math.max(
    0,
    projects.findIndex((project) => project.id === activeId),
  )

  /** Bridge index currently carrying the relay comet (−1 when idle) */
  const [liveBridge, setLiveBridge] = useState(-1)
  /** Node that just received the handoff — brief catch ring */
  const [catchIndex, setCatchIndex] = useState(-1)
  /** Arrival callback for the comet's animationend event (set by the effect) */
  const arriveRef = useRef<(() => void) | null>(null)

  useEffect(() => {
    if (!inView || bridgeCount === 0) {
      setLiveBridge(-1)
      setCatchIndex(-1)
      return
    }

    let cancelled = false
    let timeoutId = 0
    let hop = 0
    let arrived = false

    /* Arrival is driven by the comet's own animationend event, so the hop can
       never be unmounted mid-flight when the CSS animation starts later than
       the React commit (busy main thread). The timer below is only a fallback
       for when animations don't run (e.g. prefers-reduced-motion). */
    const arrive = () => {
      if (cancelled || arrived) return
      arrived = true
      window.clearTimeout(timeoutId)

      // Comet finished — destination node catches the signal
      setCatchIndex(hop + 1)
      setLiveBridge(-1)

      timeoutId = window.setTimeout(() => {
        if (cancelled) return
        hop = (hop + 1) % bridgeCount
        runHop()
      }, HOLD_MS)
    }

    const runHop = () => {
      if (cancelled) return
      arrived = false
      setCatchIndex(-1)
      setLiveBridge(hop)
      timeoutId = window.setTimeout(arrive, HOP_MS + 500)
    }

    arriveRef.current = arrive

    // Small settle so enter transitions finish before the first hop
    timeoutId = window.setTimeout(runHop, 420)

    return () => {
      cancelled = true
      arriveRef.current = null
      window.clearTimeout(timeoutId)
    }
  }, [inView, bridgeCount])

  if (nodeCount === 0) return null

  return (
    <nav
      className={[
        'projects-timeline',
        inView ? 'projects-timeline--in-view' : '',
      ]
        .filter(Boolean)
        .join(' ')}
      aria-label={copy.catalogTimelineLabel}
      style={
        {
          '--proj-hop-ms': `${HOP_MS}ms`,
        } as CSSProperties
      }
    >
      <div className="projects-timeline__scroller">
        <div
          className="projects-timeline__track"
          style={{ '--proj-rail-count': nodeCount } as CSSProperties}
        >
          <svg className="projects-timeline__defs" aria-hidden="true" focusable="false">
            <defs>
              <radialGradient id="proj-timeline-mote" cx="50%" cy="50%" r="50%">
                <stop className="projects-timeline__mote-stop-core" offset="0%" />
                <stop className="projects-timeline__mote-stop-mid" offset="45%" />
                <stop className="projects-timeline__mote-stop-edge" offset="100%" />
              </radialGradient>
              <filter id="proj-timeline-mote-blur" x="-80%" y="-80%" width="260%" height="260%">
                <feGaussianBlur in="SourceGraphic" stdDeviation="1.1" />
              </filter>
            </defs>
          </svg>

          <ol className="projects-timeline__nodes">
            {projects.map((project, index) => {
              const isActive = project.id === activeId
              const indexLabel = String(index + 1).padStart(2, '0')
              const bridgeDip = index % 2 === 1
              const bridgePath = getBridgePath(bridgeDip)
              const isBridgePast = index < activeIndex
              const isBridgeLeading = index === activeIndex
              const isBridgeLive = index === liveBridge
              const isCatching = index === catchIndex
              const isSending = liveBridge === index

              return (
                <Fragment key={project.id}>
                  <li
                    className={[
                      'projects-timeline__node-wrap',
                      isCatching ? 'projects-timeline__node-wrap--catch' : '',
                      isSending ? 'projects-timeline__node-wrap--send' : '',
                    ]
                      .filter(Boolean)
                      .join(' ')}
                    style={{ '--proj-node-delay': `${index * 65}ms` } as CSSProperties}
                  >
                    <button
                      type="button"
                      className={[
                        'projects-timeline__node',
                        isActive ? 'projects-timeline__node--active' : '',
                      ]
                        .filter(Boolean)
                        .join(' ')}
                      onClick={() => {
                        const element = document.getElementById(getProjectAnchorId(project.id))
                        if (element) scrollToElement(element)
                      }}
                      aria-current={isActive ? 'true' : undefined}
                      aria-label={`${indexLabel}. ${project.title}, ${project.domain}`}
                    >
                      <span className="projects-timeline__marker-shell" aria-hidden="true">
                        <span className="projects-timeline__marker-ring" />
                        <span className="projects-timeline__marker">
                          <span className="projects-timeline__marker-glow" />
                          <ProjectLogo
                            project={project}
                            size="sm"
                            className="projects-timeline__logo"
                          />
                        </span>
                      </span>

                      <span className="projects-timeline__copy">
                        <span className="projects-timeline__node-label">{project.title}</span>
                        <span className="projects-timeline__node-tag">{project.domain}</span>
                      </span>
                    </button>
                  </li>

                  {index < projects.length - 1 ? (
                    <li
                      className={[
                        'projects-timeline__bridge',
                        bridgeDip ? 'projects-timeline__bridge--dip' : '',
                        isBridgePast ? 'projects-timeline__bridge--past' : '',
                        isBridgeLeading ? 'projects-timeline__bridge--leading' : '',
                        isBridgeLive ? 'projects-timeline__bridge--live' : '',
                      ]
                        .filter(Boolean)
                        .join(' ')}
                      style={
                        {
                          '--proj-fiber-phase': `${index * 0.55}s`,
                        } as CSSProperties
                      }
                      aria-hidden="true"
                    >
                      <svg
                        className="projects-timeline__bridge-svg"
                        viewBox="0 0 100 24"
                        preserveAspectRatio="none"
                        aria-hidden="true"
                      >
                        <path
                          className="projects-timeline__bridge-track"
                          d={bridgePath}
                          pathLength={100}
                        />
                        <path
                          className="projects-timeline__bridge-ticks"
                          d={bridgePath}
                          pathLength={100}
                        />
                        {isBridgeLive ? (
                          <>
                            <path
                              key={`wake-${liveBridge}`}
                              className="projects-timeline__bridge-wake"
                              d={bridgePath}
                              pathLength={100}
                            />
                            <path
                              key={`comet-${liveBridge}`}
                              className="projects-timeline__bridge-comet"
                              d={bridgePath}
                              pathLength={100}
                              onAnimationEnd={(event) => {
                                if (event.animationName === 'projects-timeline-comet-hop') {
                                  arriveRef.current?.()
                                }
                              }}
                            />
                            <circle
                              key={`mote-${liveBridge}`}
                              className="projects-timeline__bridge-mote"
                              r="3.2"
                              fill="url(#proj-timeline-mote)"
                              filter="url(#proj-timeline-mote-blur)"
                            >
                              {/* begin="indefinite" + beginElement(): SMIL otherwise
                                  resolves begin=0 against page-load time and renders
                                  frozen at the path end instead of traveling */}
                              <animateMotion
                                ref={(el) => {
                                  ;(el as SVGAnimateElement | null)?.beginElement()
                                }}
                                begin="indefinite"
                                dur={`${HOP_MS}ms`}
                                fill="freeze"
                                rotate="auto"
                                path={bridgePath}
                                calcMode="spline"
                                keyTimes="0;1"
                                keySplines="0.22 0.61 0.36 1"
                              />
                            </circle>
                          </>
                        ) : null}
                      </svg>
                    </li>
                  ) : null}
                </Fragment>
              )
            })}
          </ol>
        </div>
      </div>
    </nav>
  )
}
