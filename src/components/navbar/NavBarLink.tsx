import type { NavItem } from '@/constants'
import { NavIcon } from '@/components/navbar/NavIcon'
import { NavTooltip } from '@/components/navbar/NavTooltip'
import { ROUTES } from '@/constants'
import { scrollToSection } from '@/utils/scroll'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import './NavBarLink.css'

type NavBarLinkProps = {
  item: NavItem
  index: number
  isActive: boolean
  onNavigate?: () => void
  registerRef?: (itemId: string, element: HTMLAnchorElement | null) => void
}

export function NavBarLink({ item, index, isActive, onNavigate, registerRef }: NavBarLinkProps) {
  const location = useLocation()
  const navigate = useNavigate()
  const sectionHint = String(index + 1).padStart(2, '0')

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (item.hash && item.to === ROUTES.HOME) {
      event.preventDefault()

      if (location.pathname === ROUTES.HOME) {
        scrollToSection(item.hash)
      } else {
        navigate(ROUTES.HOME)
        window.setTimeout(() => scrollToSection(item.hash!), 80)
      }
    }

    onNavigate?.()
  }

  return (
    <li>
      <NavTooltip label={item.label} hint={sectionHint}>
        <Link
          ref={(element) => registerRef?.(item.id, element)}
          to={item.to}
          className={isActive ? 'navbar-link navbar-link--active' : 'navbar-link'}
          aria-label={item.label}
          data-label={item.label}
          aria-current={isActive ? 'page' : undefined}
          onClick={handleClick}
        >
          <NavIcon name={item.icon} className="navbar-link__icon" />
        </Link>
      </NavTooltip>
    </li>
  )
}
