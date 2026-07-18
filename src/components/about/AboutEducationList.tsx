import { useId, useState } from 'react'
import { educationList } from '@/data/portfolio'
import { ShineBorderCard } from '@/components/ui/ShineBorderCard'
import './AboutEducationList.css'

/** Newest credential first: B.E. → HSC */
function descendingEducation() {
  return [...educationList].sort((a, b) => b.startYear - a.startYear)
}

export function AboutEducationList() {
  const labelId = useId()
  const steps = descendingEducation()
  const primary = steps[0]
  const foundation = steps[steps.length - 1]
  const [focusId, setFocusId] = useState<string | null>(null)

  return (
    <ShineBorderCard hoverOnly className="edu-compact-shell">
      <section className="edu-compact" aria-labelledby={labelId}>
        <div className="edu-compact__aura" aria-hidden="true" />
        <div className="edu-compact__grid-bg" aria-hidden="true" />

        <header className="edu-compact__bar">
          <div className="edu-compact__identity">
            <p className="edu-compact__eyebrow">
              <span className="edu-compact__pulse" aria-hidden="true" />
              Learning pathway
            </p>
            <h3 className="edu-compact__title" id={labelId}>
              Academic credentials
            </h3>
          </div>

          <div className="edu-compact__stats" aria-label="Credential overview">
            {primary ? (
              <button
                type="button"
                className={[
                  'edu-compact__stat',
                  focusId === primary.id ? 'edu-compact__stat--hot' : '',
                ]
                  .filter(Boolean)
                  .join(' ')}
                aria-pressed={focusId === primary.id}
                onPointerEnter={() => setFocusId(primary.id)}
                onPointerLeave={() => setFocusId(null)}
                onFocus={() => setFocusId(primary.id)}
                onBlur={() => setFocusId(null)}
              >
                <span className="edu-compact__stat-label">Highest</span>
                <span className="edu-compact__stat-value">{primary.credentialCode}</span>
              </button>
            ) : null}
            {foundation && foundation.id !== primary?.id ? (
              <button
                type="button"
                className={[
                  'edu-compact__stat',
                  focusId === foundation.id ? 'edu-compact__stat--hot' : '',
                ]
                  .filter(Boolean)
                  .join(' ')}
                aria-pressed={focusId === foundation.id}
                onPointerEnter={() => setFocusId(foundation.id)}
                onPointerLeave={() => setFocusId(null)}
                onFocus={() => setFocusId(foundation.id)}
                onBlur={() => setFocusId(null)}
              >
                <span className="edu-compact__stat-label">Foundation</span>
                <span className="edu-compact__stat-value">{foundation.credentialCode}</span>
              </button>
            ) : null}
          </div>
        </header>

        <ol className="edu-compact__grid">
          {steps.map((step) => {
            const authority = step.board ?? step.affiliation
            const isFocused = focusId === step.id
            const isDimmed = focusId !== null && !isFocused
            return (
              <li
                key={step.id}
                className={[
                  'edu-compact__card',
                  isFocused ? 'edu-compact__card--focus' : '',
                  isDimmed ? 'edu-compact__card--dim' : '',
                ]
                  .filter(Boolean)
                  .join(' ')}
              >
                <span className="edu-compact__rail" aria-hidden="true" />
                <span className="edu-compact__sheen" aria-hidden="true" />

                <div className="edu-compact__head">
                  <span className="edu-compact__code">{step.credentialCode}</span>
                  <span className="edu-compact__years">
                    {step.startYear}–{step.endYear}
                  </span>
                </div>

                <p className="edu-compact__level">
                  {step.level}
                  <span className="edu-compact__sep" aria-hidden="true" />
                  {step.stream}
                </p>
                <h4 className="edu-compact__degree">{step.degree}</h4>
                <p className="edu-compact__school">{step.institution}</p>

                {step.highlight ? (
                  <p className="edu-compact__highlight">{step.highlight}</p>
                ) : null}

                <div className="edu-compact__meta">
                  {authority ? (
                    <div className="edu-compact__meta-row">
                      <span className="edu-compact__meta-label">
                        {step.board ? 'Board' : 'University'}
                      </span>
                      <span className="edu-compact__meta-value">{authority}</span>
                    </div>
                  ) : null}
                  {step.focus.length > 0 ? (
                    <div className="edu-compact__meta-row">
                      <span className="edu-compact__meta-label">Focus</span>
                      <span className="edu-compact__meta-value">
                        {step.focus.join(' · ')}
                      </span>
                    </div>
                  ) : null}
                </div>

                {step.location ? (
                  <p className="edu-compact__location">
                    <svg
                      className="edu-compact__location-icon"
                      viewBox="0 0 24 24"
                      fill="none"
                      aria-hidden="true"
                    >
                      <path
                        d="M12 21s7-5.4 7-11a7 7 0 1 0-14 0c0 5.6 7 11 7 11Z"
                        stroke="currentColor"
                        strokeWidth="1.75"
                        strokeLinejoin="round"
                      />
                      <circle
                        cx="12"
                        cy="10"
                        r="2.25"
                        stroke="currentColor"
                        strokeWidth="1.75"
                      />
                    </svg>
                    <span className="edu-compact__location-text">{step.location}</span>
                  </p>
                ) : null}
              </li>
            )
          })}
        </ol>
      </section>
    </ShineBorderCard>
  )
}
