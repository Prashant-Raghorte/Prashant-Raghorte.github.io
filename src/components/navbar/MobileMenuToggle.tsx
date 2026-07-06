type MobileMenuToggleProps = {
  isOpen: boolean
  onToggle: () => void
}

export function MobileMenuToggle({ isOpen, onToggle }: MobileMenuToggleProps) {
  return (
    <button
      type="button"
      className={`navbar-toggle ${isOpen ? 'navbar-toggle--open' : ''}`}
      aria-expanded={isOpen}
      aria-controls="navbar-menu"
      aria-label={isOpen ? 'Close menu' : 'Open menu'}
      onClick={onToggle}
    >
      <span className="navbar-toggle__shine" aria-hidden="true" />
      <span className="navbar-toggle__bars" aria-hidden="true">
        <span className="navbar-toggle__bar" />
        <span className="navbar-toggle__bar" />
        <span className="navbar-toggle__bar" />
      </span>
    </button>
  )
}
