import type { CSSProperties } from 'react'
import type { Experience } from '@/types'
import { siteCopy } from '@/config/copy'
import { CompanyLogo } from '@/components/experience/CompanyLogo'
import { getCompanyShortName, getExperienceAnchorId } from '@/utils/experienceHelpers'
import { scrollToElement } from '@/utils/scroll'
import './ExperienceConstellationNav.css'
import '@/components/experience/CompanyLogo.css'

type ExperienceConstellationNavProps = {
  items: Experience[]
  activeId: string
  inView: boolean
  showHead?: boolean
}

const WAVE_VIEW_HEIGHT = 24
const WAVE_MID = WAVE_VIEW_HEIGHT / 2
const WAVE_AMPLITUDE = 11

/**
 * Builds a wave path that crosses the vertical center exactly at every node,
 * alternating crests and troughs between neighbours. A negative amplitude
 * yields the phase-inverted wave, used as the morph target so the line
 * oscillates like a plucked string while keeping every node crossing fixed.
 */
function buildWavePath(nodeCount: number, amplitude: number): string {
  if (nodeCount <= 1) {
    return `M 0 ${WAVE_MID} L 100 ${WAVE_MID}`
  }

  const segment = 100 / (nodeCount - 1)
  let path = `M 0 ${WAVE_MID}`

  for (let index = 0; index < nodeCount - 1; index += 1) {
    const startX = index * segment
    const endX = (index + 1) * segment
    const controlX = (startX + endX) / 2
    const controlY = index % 2 === 0 ? WAVE_MID - amplitude : WAVE_MID + amplitude
    path += ` Q ${controlX} ${controlY}, ${endX} ${WAVE_MID}`
  }

  return path
}

const prefersReducedMotion =
  typeof window !== 'undefined' &&
  typeof window.matchMedia === 'function' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

type WaveMorphProps = {
  values: string
}

/** Oscillates the wave between its normal and phase-inverted shape. */
function WaveMorph({ values }: WaveMorphProps) {
  if (prefersReducedMotion) return null

  return (
    <animate
      attributeName="d"
      values={values}
      keyTimes="0; 0.5; 1"
      calcMode="spline"
      keySplines="0.45 0 0.55 1; 0.45 0 0.55 1"
      dur="9s"
      repeatCount="indefinite"
    />
  )
}

export function ExperienceConstellationNav({
  items,
  activeId,
  inView,
  showHead = true,
}: ExperienceConstellationNavProps) {
  const nodeCount = items.length
  const activeIndex = Math.max(
    0,
    items.findIndex((item) => item.id === activeId),
  )
  const progress = nodeCount <= 1 ? 1 : activeIndex / (nodeCount - 1)
  const wavePath = buildWavePath(nodeCount, WAVE_AMPLITUDE)
  const waveMorphValues = [
    wavePath,
    buildWavePath(nodeCount, -WAVE_AMPLITUDE * 0.72),
    wavePath,
  ].join('; ')

  return (
    <nav
      className={[
        'exp-constellation',
        !showHead ? 'exp-constellation--compact' : '',
        inView ? 'exp-constellation--in-view' : '',
      ]
        .filter(Boolean)
        .join(' ')}
      aria-label={siteCopy.sections.experiencePage.constellationLabel}
    >
      {showHead ? (
        <div className="exp-constellation__head">
          <span className="exp-constellation__accent" aria-hidden="true" />
          <h2 className="exp-constellation__title">
            {siteCopy.sections.experiencePage.constellationLabel}
          </h2>
        </div>
      ) : null}

      <div className="exp-constellation__scroller">
        <div
          className="exp-constellation__track"
          style={
            {
              '--exp-rail-count': nodeCount,
              '--exp-rail-progress': progress,
            } as CSSProperties
          }
        >
          <div className="exp-constellation__line" aria-hidden="true">
            <svg
              className="exp-constellation__wave"
              viewBox={`0 0 100 ${WAVE_VIEW_HEIGHT}`}
              preserveAspectRatio="none"
              focusable="false"
            >
              <defs>
                <linearGradient id="exp-wave-gradient" x1="0" y1="0" x2="1" y2="0">
                  <stop className="exp-constellation__wave-stop-a" offset="0" />
                  <stop className="exp-constellation__wave-stop-b" offset="0.55" />
                  <stop className="exp-constellation__wave-stop-c" offset="1" />
                  {prefersReducedMotion ? null : (
                    <animateTransform
                      attributeName="gradientTransform"
                      type="translate"
                      values="-0.2 0; 0.2 0; -0.2 0"
                      dur="6s"
                      repeatCount="indefinite"
                    />
                  )}
                </linearGradient>
              </defs>
              <path className="exp-constellation__wave-base" d={wavePath} pathLength={1}>
                <WaveMorph values={waveMorphValues} />
              </path>
              <path
                className="exp-constellation__wave-fill"
                d={wavePath}
                pathLength={1}
                stroke="url(#exp-wave-gradient)"
              >
                <WaveMorph values={waveMorphValues} />
              </path>
              <path className="exp-constellation__wave-pulse" d={wavePath} pathLength={1}>
                <WaveMorph values={waveMorphValues} />
              </path>
            </svg>
          </div>

          <ol className="exp-constellation__nodes">
            {items.map((item, index) => {
              const isActive = item.id === activeId
              const startYear =
                item.period.split('–')[0]?.trim() ??
                item.period.split('-')[0]?.trim() ??
                item.period

              return (
                <li
                  key={item.id}
                  className="exp-constellation__node-wrap"
                  style={{ '--exp-node-delay': `${index * 80}ms` } as CSSProperties}
                >
                  <button
                    type="button"
                    className={[
                      'exp-constellation__node',
                      isActive ? 'exp-constellation__node--active' : '',
                      item.isCurrent ? 'exp-constellation__node--current' : '',
                    ]
                      .filter(Boolean)
                      .join(' ')}
                    onClick={() => {
                      const element = document.getElementById(getExperienceAnchorId(item.id))
                      if (element) scrollToElement(element)
                    }}
                    aria-current={isActive ? 'true' : undefined}
                    aria-label={`${item.role} at ${item.company}`}
                  >
                    <span className="exp-constellation__marker" aria-hidden="true">
                      <span className="exp-constellation__halo" />
                      <CompanyLogo
                        experience={item}
                        isCurrent={item.isCurrent}
                        className="exp-constellation__logo"
                      />
                      {item.isCurrent ? (
                        <span className="exp-constellation__pulse" />
                      ) : null}
                    </span>

                    <span className="exp-constellation__copy">
                      <span className="exp-constellation__node-label">
                        {getCompanyShortName(item.company)}
                      </span>
                      <span className="exp-constellation__node-period">{startYear}</span>
                    </span>
                  </button>
                </li>
              )
            })}
          </ol>
        </div>
      </div>
    </nav>
  )
}
