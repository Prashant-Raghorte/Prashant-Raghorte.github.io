import { useState, type CSSProperties } from 'react'
import { siteCopy } from '@/config/copy'
import type { ImpactTheme } from '@/utils/experienceImpactProfile'
import './ExperienceCareerImpactMap.css'

const experienceCopy = siteCopy.sections.experiencePage

type ExperienceCareerImpactMapProps = {
  themes: ImpactTheme[]
  title: string
  hint?: string
  className?: string
}

const THEME_META: Record<string, { glyph: string; color: string }> = {
  core: { glyph: 'BE', color: '#a78bfa' },
  ai: { glyph: 'AI', color: '#60a5fa' },
  data: { glyph: 'DB', color: '#34d399' },
  security: { glyph: 'AU', color: '#fbbf24' },
  async: { glyph: 'AS', color: '#f472b6' },
  cloud: { glyph: 'CL', color: '#22d3ee' },
}

const ORBIT_RADIUS = 38
const ALL_THEMES_ID = '__all__'

function getNodePosition(index: number, total: number) {
  const angleDeg = (index / total) * 360 - 90
  const angleRad = (angleDeg * Math.PI) / 180

  return {
    x: 50 + ORBIT_RADIUS * Math.cos(angleRad),
    y: 50 + ORBIT_RADIUS * Math.sin(angleRad),
  }
}

export function ExperienceCareerImpactMap({
  themes,
  title,
  hint,
  className = '',
}: ExperienceCareerImpactMapProps) {
  const [linkedThemeId, setLinkedThemeId] = useState<string | null>(null)

  if (themes.length === 0) return null

  const totalImpacts = themes.reduce((sum, theme) => sum + theme.count, 0)
  const peakScore = Math.max(...themes.map((theme) => theme.score), 1)
  const isAllLinked = linkedThemeId === ALL_THEMES_ID
  const isLinking = linkedThemeId !== null
  const isThemeLinked = (themeId: string) => isAllLinked || linkedThemeId === themeId

  return (
    <div
      className={[
        'impact-map',
        isLinking ? 'impact-map--linking' : '',
        isAllLinked ? 'impact-map--all-linked' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <div className="impact-map__head">
        <span className="impact-map__head-glow" aria-hidden="true" />
        <div className="impact-map__head-copy">
          <h3 className="impact-map__title">{title}</h3>
          {hint ? <p className="impact-map__hint">{hint}</p> : null}
        </div>
      </div>

      <div className="impact-map__body">
        <div className="impact-map__canvas" aria-hidden="true">
        <span className="impact-map__grid" />
        <span className="impact-map__ring impact-map__ring--outer" />
        <span className="impact-map__ring impact-map__ring--inner" />

        <svg className="impact-map__beams" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
          <defs>
            <linearGradient id="impact-map-beam" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="var(--color-accent-primary)" stopOpacity="0.55" />
              <stop offset="100%" stopColor="var(--color-accent-primary)" stopOpacity="0.08" />
            </linearGradient>
          </defs>
          {themes.map((theme, index) => {
            const { x, y } = getNodePosition(index, themes.length)
            return (
              <line
                key={theme.id}
                className={[
                  isThemeLinked(theme.id) ? 'impact-map__beam--linked' : '',
                ]
                  .filter(Boolean)
                  .join(' ')}
                data-theme={theme.id}
                x1="50"
                y1="50"
                x2={x}
                y2={y}
                stroke="url(#impact-map-beam)"
                strokeWidth="0.35"
                strokeLinecap="round"
                style={
                  {
                    '--impact-beam-delay': `${index * 90 + 180}ms`,
                    '--impact-beam-opacity': 0.35 + (theme.score / peakScore) * 0.55,
                  } as CSSProperties
                }
              />
            )
          })}
        </svg>

        <div
          className="impact-map__core"
          tabIndex={0}
          aria-label={`${totalImpacts} impact points across all themes`}
          onMouseEnter={() => setLinkedThemeId(ALL_THEMES_ID)}
          onMouseLeave={() => setLinkedThemeId(null)}
          onFocus={() => setLinkedThemeId(ALL_THEMES_ID)}
          onBlur={() => setLinkedThemeId(null)}
        >
          <span className="impact-map__core-ring" aria-hidden="true" />
          <span className="impact-map__core-value">{totalImpacts}</span>
          <span className="impact-map__core-label">Impact points</span>
        </div>

        <ul className="impact-map__orbit" aria-label={title}>
          {themes.map((theme, index) => {
            const { x, y } = getNodePosition(index, themes.length)
            const meta = THEME_META[theme.id] ?? { glyph: '•', color: 'var(--color-accent-primary)' }

            return (
              <li
                key={theme.id}
                className={[
                  'impact-map__node',
                  isThemeLinked(theme.id) ? 'impact-map__node--linked' : '',
                ]
                  .filter(Boolean)
                  .join(' ')}
                data-theme={theme.id}
                onMouseEnter={() => setLinkedThemeId(theme.id)}
                onMouseLeave={() => setLinkedThemeId(null)}
                style={
                  {
                    '--impact-node-x': `${x}%`,
                    '--impact-node-y': `${y}%`,
                    '--impact-node-score': theme.score,
                    '--impact-node-color': meta.color,
                    '--impact-node-delay': `${index * 90}ms`,
                  } as CSSProperties
                }
              >
                <article
                  className="impact-map__node-card"
                  tabIndex={0}
                  onFocus={() => setLinkedThemeId(theme.id)}
                  onBlur={() => setLinkedThemeId(null)}
                >
                  <span className="impact-map__node-orbit" aria-hidden="true">
                    <span className="impact-map__node-orbit-fill" />
                  </span>
                  <span className="impact-map__node-glyph" aria-hidden="true">
                    {meta.glyph}
                  </span>
                  <span className="impact-map__node-label">{theme.label}</span>
                  <span className="impact-map__node-count">{theme.count}</span>
                </article>
              </li>
            )
          })}
        </ul>
      </div>

        <aside className="impact-map__aside">
          <p className="impact-map__legend-title">{experienceCopy.impactMapLegendLabel}</p>
          <ul className="impact-map__legend" aria-label={`${title} breakdown`}>
            {themes.map((theme, index) => {
              const meta = THEME_META[theme.id] ?? { glyph: '•', color: 'var(--color-accent-primary)' }

              return (
                <li
                  key={theme.id}
                  className={[
                    'impact-map__legend-item',
                    isThemeLinked(theme.id) ? 'impact-map__legend-item--linked' : '',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                  data-theme={theme.id}
                  onMouseEnter={() => setLinkedThemeId(theme.id)}
                  onMouseLeave={() => setLinkedThemeId(null)}
                  onFocus={() => setLinkedThemeId(theme.id)}
                  onBlur={() => setLinkedThemeId(null)}
                  tabIndex={0}
                  style={
                    {
                      '--impact-node-color': meta.color,
                      '--impact-node-score': theme.score,
                      '--impact-node-delay': `${index * 70}ms`,
                    } as CSSProperties
                  }
                >
                  <span className="impact-map__legend-glyph" aria-hidden="true">
                    {meta.glyph}
                  </span>
                  <span className="impact-map__legend-copy">
                    <span className="impact-map__legend-label">{theme.label}</span>
                    <span className="impact-map__legend-meta">
                      {theme.count} impact{theme.count === 1 ? '' : 's'} · {theme.score}% density
                    </span>
                  </span>
                  <span className="impact-map__legend-meter" aria-hidden="true">
                    <span className="impact-map__legend-meter-fill" />
                  </span>
                </li>
              )
            })}
          </ul>
        </aside>
      </div>
    </div>
  )
}
