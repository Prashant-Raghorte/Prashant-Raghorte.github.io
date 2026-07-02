import { educationList } from '@/data/portfolio'
import { ShineBorderCard } from '@/components/ui/ShineBorderCard'
import './AboutEducationList.css'

function GraduationIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 3 2 8l10 5 10-5-10-5Z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
      <path
        d="M6 11v4.5c0 .8 2.2 2.5 6 2.5s6-1.7 6-2.5V11"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
      <path
        d="M20 8v6"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </svg>
  )
}

export function AboutEducationList() {
  return (
    <div className="about-education">
      {educationList.map((item) => (
        <ShineBorderCard key={item.id} hoverOnly>
          <article className="about-education__item">
            <span className="about-education__icon-wrap" aria-hidden="true">
              <GraduationIcon />
            </span>
            <div className="about-education__content">
              <h3 className="about-education__degree">{item.degree}</h3>
              <p className="about-education__school">{item.institution}</p>
              <p className="about-education__period">{item.period}</p>
            </div>
          </article>
        </ShineBorderCard>
      ))}
    </div>
  )
}
