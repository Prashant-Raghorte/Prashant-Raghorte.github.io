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
    <ul id="navbar-menu" className={`navbar-menu ${isOpen ? 'navbar-menu--open' : ''}`}>
      {items.map((item, index) => (
        <NavBarLink
          key={item.id}
          item={item}
          index={index}
          isActive={activeNavId === item.id}
          registerRef={registerLink}
          onNavigate={onNavigate}
        />
      ))}
    </ul>
  )
}
