type MobileMenuToggleProps = {
  isOpen: boolean
  onToggle: () => void
}

export function MobileMenuToggle({ isOpen, onToggle }: MobileMenuToggleProps) {
  return (
    <button
      type="button"
      className="navbar-toggle"
      aria-expanded={isOpen}
      aria-controls="navbar-menu"
      aria-label={isOpen ? 'Close menu' : 'Open menu'}
      onClick={onToggle}
    >
      <span />
      <span />
      <span />
    </button>
  )
}
