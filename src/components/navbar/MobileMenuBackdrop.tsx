type MobileMenuBackdropProps = {
  isOpen: boolean
  onClose: () => void
}

export function MobileMenuBackdrop({ isOpen, onClose }: MobileMenuBackdropProps) {
  return (
    <button
      type="button"
      className={`navbar-menu-backdrop ${isOpen ? 'navbar-menu-backdrop--open' : ''}`}
      aria-hidden={!isOpen}
      tabIndex={isOpen ? 0 : -1}
      aria-label="Close navigation menu"
      onClick={onClose}
    />
  )
}
