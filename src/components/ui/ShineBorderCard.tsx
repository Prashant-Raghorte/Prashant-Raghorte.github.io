import type { ReactNode } from 'react'
import './ShineBorderCard.css'

type ShineBorderCardProps = {
  children: ReactNode
  className?: string
  active?: boolean
  hoverOnly?: boolean
}

export function ShineBorderCard({
  children,
  className = '',
  active = false,
  hoverOnly = false,
}: ShineBorderCardProps) {
  return (
    <div
      className={[
        'shine-card',
        active ? 'shine-card--active' : '',
        hoverOnly ? 'shine-card--hover' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <div className="shine-card__inner">{children}</div>
    </div>
  )
}
