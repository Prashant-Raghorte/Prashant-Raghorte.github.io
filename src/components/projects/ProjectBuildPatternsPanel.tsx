import { useState, type CSSProperties } from 'react'
import type { BuildPattern } from '@/utils/projectDeliveryProfile'
import './ProjectBuildPatternsPanel.css'

type ProjectBuildPatternsPanelProps = {
  patterns: BuildPattern[]
  title: string
  hint?: string
  productsLabel: string
}

const PATTERN_GLYPHS: Record<string, string> = {
  async: 'AS',
  'cloud-messaging': 'EN',
  'object-storage': 'S3',
  multidb: 'MD',
  webhooks: 'WH',
  'email-automation': 'EM',
  payments: 'SB',
  search: 'SA',
  'llm-integrations': 'LL',
  'api-platform': 'API',
  'enterprise-auth': 'EA',
  'ci-delivery': 'CI',
}

export function ProjectBuildPatternsPanel({
  patterns,
  title,
  hint,
  productsLabel,
}: ProjectBuildPatternsPanelProps) {
  const [activePatternId, setActivePatternId] = useState<string | null>(null)

  if (patterns.length === 0) return null

  const peakCoverage = Math.max(...patterns.map((pattern) => pattern.productCount), 1)

  return (
    <div
      className={[
        'build-patterns',
        activePatternId ? 'build-patterns--linking' : '',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <span className="build-patterns__mesh" aria-hidden="true" />
      <span className="build-patterns__rail" aria-hidden="true" />

      <header className="build-patterns__head">
        <span className="build-patterns__accent" aria-hidden="true" />
        <div className="build-patterns__head-copy">
          <h3 className="build-patterns__title">{title}</h3>
          {hint ? <p className="build-patterns__hint">{hint}</p> : null}
        </div>
      </header>

      <div className="build-patterns__summary">
        <div className="build-patterns__summary-stat build-patterns__summary-stat--patterns">
          <span className="build-patterns__summary-rail" aria-hidden="true" />
          <span className="build-patterns__summary-glow" aria-hidden="true" />
          <span className="build-patterns__summary-icon" aria-hidden="true">
            <span className="build-patterns__summary-icon-glyph">AP</span>
          </span>
          <div className="build-patterns__summary-body">
            <span className="build-patterns__summary-label">Active patterns</span>
            <span className="build-patterns__summary-value">{patterns.length}</span>
          </div>
        </div>
        <div className="build-patterns__summary-stat build-patterns__summary-stat--peak">
          <span className="build-patterns__summary-rail" aria-hidden="true" />
          <span className="build-patterns__summary-glow" aria-hidden="true" />
          <span className="build-patterns__summary-icon" aria-hidden="true">
            <span className="build-patterns__summary-icon-glyph">PC</span>
          </span>
          <div className="build-patterns__summary-body">
            <span className="build-patterns__summary-label">Peak coverage</span>
            <span className="build-patterns__summary-value">{peakCoverage}</span>
          </div>
        </div>
      </div>

      <ul className="build-patterns__list" aria-label={title}>
        {patterns.map((pattern, index) => {
          const linked = activePatternId === pattern.id
          const dimmed = activePatternId !== null && !linked
          const glyph = PATTERN_GLYPHS[pattern.id] ?? 'PT'

          return (
            <li
              key={pattern.id}
              className={[
                'build-patterns__item',
                linked ? 'build-patterns__item--linked' : '',
                dimmed ? 'build-patterns__item--dimmed' : '',
              ]
                .filter(Boolean)
                .join(' ')}
              style={
                {
                  '--build-pattern-delay': `${index * 70}ms`,
                  '--pattern-score': pattern.score,
                  '--pattern-coverage':
                    peakCoverage > 0 ? (pattern.productCount / peakCoverage) * 100 : 0,
                } as CSSProperties
              }
              onMouseEnter={() => setActivePatternId(pattern.id)}
              onMouseLeave={() => setActivePatternId(null)}
              onFocus={() => setActivePatternId(pattern.id)}
              onBlur={() => setActivePatternId(null)}
              tabIndex={0}
            >
              <span className="build-patterns__index" aria-hidden="true">
                {String(index + 1).padStart(2, '0')}
              </span>

              <span className="build-patterns__glyph" aria-hidden="true">
                {glyph}
              </span>

              <div className="build-patterns__item-copy">
                <span className="build-patterns__item-label">{pattern.label}</span>
                <span className="build-patterns__item-hint">{pattern.hint}</span>
                <span className="build-patterns__coverage" aria-hidden="true">
                  <span className="build-patterns__coverage-fill" />
                </span>
              </div>

              <div className="build-patterns__signal" aria-hidden="true">
                <span
                  className="build-patterns__signal-ring"
                  style={{ '--pattern-score': pattern.score } as CSSProperties}
                >
                  <span className="build-patterns__signal-core">{pattern.productCount}</span>
                </span>
                <span className="build-patterns__signal-label">
                  {pattern.productCount} {productsLabel}
                </span>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
