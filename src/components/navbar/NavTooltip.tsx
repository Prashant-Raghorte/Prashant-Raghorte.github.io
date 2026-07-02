import type { ReactNode } from 'react'
import './NavTooltip.css'

type NavTooltipProps = {
  label: string
  hint?: string
  children: ReactNode
  className?: string
  placement?: 'top' | 'bottom'
}

export function NavTooltip({
  label,
  hint,
  children,
  className = '',
  placement = 'top',
}: NavTooltipProps) {
  const classes = [
    'nav-tooltip',
    placement === 'bottom' ? 'nav-tooltip--bottom' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <span className={classes}>
      {children}
      <span className="nav-tooltip__bubble" role="tooltip">
        <span className="nav-tooltip__shine" aria-hidden="true" />
        {hint && <span className="nav-tooltip__hint">{hint}</span>}
        <span className="nav-tooltip__label">{label}</span>
        <span className="nav-tooltip__arrow" aria-hidden="true" />
      </span>
    </span>
  )
}
