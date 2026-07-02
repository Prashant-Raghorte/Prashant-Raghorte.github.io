import { Link } from 'react-router-dom'
import { siteCopy } from '@/config/copy'
import { ShineBorderCard } from '@/components/ui/ShineBorderCard'
import { ArrowRightIcon } from '@/components/ui/icons'
import './ViewAllCard.css'

export type ViewAllVariant = 'experience' | 'projects'

type ViewAllCardProps = {
  to: string
  variant: ViewAllVariant
}

const DOT_COUNT = 3

export function ViewAllCard({ to, variant }: ViewAllCardProps) {
  const copy = siteCopy.viewAll[variant]

  return (
    <div className="view-all-rail">
      <span className="view-all-rail__line" aria-hidden="true" />

      <div className="view-all-rail__row">
        <div className="view-all-rail__dots view-all-rail__dots--left" aria-hidden="true">
          {Array.from({ length: DOT_COUNT }, (_, index) => (
            <span
              key={index}
              className="view-all-rail__dot"
              style={{ opacity: 0.3 + index * 0.22 }}
            />
          ))}
        </div>

        <ShineBorderCard hoverOnly className="view-all-rail__shine">
          <Link to={to} className="view-all-rail__pill" aria-label={copy.title}>
            <span className="view-all-rail__label">{copy.title}</span>
            <span className="view-all-rail__arrow" aria-hidden="true">
              <ArrowRightIcon />
            </span>
          </Link>
        </ShineBorderCard>

        <div className="view-all-rail__dots view-all-rail__dots--right" aria-hidden="true">
          {Array.from({ length: DOT_COUNT }, (_, index) => (
            <span
              key={index}
              className="view-all-rail__dot"
              style={{ opacity: 0.3 + (DOT_COUNT - index - 1) * 0.22 }}
            />
          ))}
        </div>
      </div>

      <span className="view-all-rail__line" aria-hidden="true" />
    </div>
  )
}
