import type { CSSProperties } from 'react'
import type { NavItem } from '@/constants'
import { NavBarLink } from '@/components/navbar/NavBarLink'
import './NavBarMenu.css'

type NavBarMenuProps = {
  items: NavItem[]
  activeNavId: string
  isOpen: boolean
  registerLink: (itemId: string, element: HTMLAnchorElement | null) => void
  onNavigate: () => void
}

export function NavBarMenu({
  items,
  activeNavId,
  isOpen,
  registerLink,
  onNavigate,
}: NavBarMenuProps) {
  return (
    <div
      className={`navbar-menu-panel ${isOpen ? 'navbar-menu-panel--open' : ''}`}
      aria-hidden={!isOpen}
    >
      <div className="navbar-menu-panel__shine" aria-hidden="true" />
      <header className="navbar-menu-panel__head">
        <div className="navbar-menu-panel__head-copy">
          <p className="navbar-menu-panel__eyebrow">Navigation</p>
          <p className="navbar-menu-panel__title">Where to next?</p>
        </div>
        <button
          type="button"
          className="navbar-menu-panel__close"
          aria-label="Cancel and close menu"
          onClick={onNavigate}
        >
          Cancel
        </button>
      </header>

      <ul
        id="navbar-menu"
        className={`navbar-menu ${isOpen ? 'navbar-menu--open' : ''}`}
      >
        {items.map((item, index) => (
          <NavBarLink
            key={item.id}
            item={item}
            index={index}
            isActive={activeNavId === item.id}
            registerRef={registerLink}
            onNavigate={onNavigate}
            style={{ '--nav-link-delay': `${index * 55}ms` } as CSSProperties}
          />
        ))}
      </ul>
    </div>
  )
}
