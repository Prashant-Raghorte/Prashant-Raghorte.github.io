import type { CSSProperties } from 'react'
import type { ImpactTheme } from '@/utils/experienceImpactProfile'
import './ExperienceImpactSpectrum.css'

type ExperienceImpactSpectrumProps = {
  themes: ImpactTheme[]
  title: string
  hint?: string
  className?: string
}

export function ExperienceImpactSpectrum({
  themes,
  title,
  hint,
  className = '',
}: ExperienceImpactSpectrumProps) {
  if (themes.length === 0) return null

  return (
    <div className={['exp-spectrum', className].filter(Boolean).join(' ')}>
      <div className="exp-spectrum__head">
        <span className="exp-spectrum__accent" aria-hidden="true" />
        <div className="exp-spectrum__head-copy">
          <h3 className="exp-spectrum__title">{title}</h3>
          {hint ? <p className="exp-spectrum__hint">{hint}</p> : null}
        </div>
      </div>

      <ul className="exp-spectrum__list" aria-label={title}>
        {themes.map((theme, index) => (
          <li
            key={theme.id}
            className="exp-spectrum__item"
            style={{ '--exp-spectrum-delay': `${index * 70}ms` } as CSSProperties}
          >
            <div className="exp-spectrum__row">
              <span className="exp-spectrum__label">{theme.label}</span>
              <span className="exp-spectrum__count">{theme.count}</span>
            </div>
            <span className="exp-spectrum__track" aria-hidden="true">
              <span
                className="exp-spectrum__fill"
                style={{ '--exp-spectrum-score': `${theme.score}%` } as CSSProperties}
              />
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}
