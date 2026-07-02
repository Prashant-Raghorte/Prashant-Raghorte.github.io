import { siteConfig } from '@/config/site'
import './AvailabilityBadge.css'

type AvailabilityBadgeProps = {
  showSummary?: boolean
  className?: string
}

export function AvailabilityBadge({ showSummary = false, className }: AvailabilityBadgeProps) {
  const { availability } = siteConfig
  const rootClass = ['availability-badge', className].filter(Boolean).join(' ')

  return (
    <div className={rootClass}>
      <span
        className={[
          'availability-badge__status',
          `availability-badge__status--${availability.state}`,
        ].join(' ')}
      >
        <span className="availability-badge__dot-wrap" aria-hidden="true">
          <span className="availability-badge__dot" />
        </span>
        <span>{availability.label}</span>
      </span>
      {showSummary && availability.summary ? (
        <p className="availability-badge__summary">{availability.summary}</p>
      ) : null}
    </div>
  )
}
