type NavBarSpotlightProps = {
  active: boolean
}

export function NavBarSpotlight({ active }: NavBarSpotlightProps) {
  return (
    <div
      className={`navbar-spotlight ${active ? 'navbar-spotlight--active' : ''}`}
      aria-hidden="true"
    />
  )
}

export function NavBarShineRing() {
  return <div className="navbar-shine-ring" aria-hidden="true" />
}

type NavBarIndicatorProps = {
  opacity: number
}

export function NavBarIndicator({ opacity }: NavBarIndicatorProps) {
  return (
    <div
      className="navbar-indicator"
      aria-hidden="true"
      style={{ '--indicator-opacity': opacity } as React.CSSProperties}
    />
  )
}
