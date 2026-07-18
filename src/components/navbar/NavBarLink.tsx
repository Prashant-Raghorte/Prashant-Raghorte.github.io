import type { CSSProperties } from 'react'
import type { NavItem } from '@/constants'
import { NavIcon } from '@/components/navbar/NavIcon'
import { NavTooltip } from '@/components/navbar/NavTooltip'
import { ArrowRightIcon } from '@/components/ui/icons'
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
  style?: CSSProperties
}

export function NavBarLink({
  item,
  index,
  isActive,
  onNavigate,
  registerRef,
  style,
}: NavBarLinkProps) {
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

  const linkClass = isActive ? 'navbar-link navbar-link--active' : 'navbar-link'

  const linkContent = (
    <Link
      ref={(element) => registerRef?.(item.id, element)}
      to={item.to}
      className={linkClass}
      aria-label={item.label}
      aria-current={isActive ? 'page' : undefined}
      onClick={handleClick}
      style={style}
    >
      <span className="navbar-link__beam" aria-hidden="true" />
      <span className="navbar-link__index" aria-hidden="true">
        {sectionHint}
      </span>
      <span className="navbar-link__icon-wrap" aria-hidden="true">
        <NavIcon name={item.icon} className="navbar-link__icon" />
      </span>
      <span className="navbar-link__label">{item.label}</span>
      <span className="navbar-link__arrow" aria-hidden="true">
        <ArrowRightIcon />
      </span>
    </Link>
  )

  return (
    <li className="navbar-link-item">
      <NavTooltip label={item.label} hint={sectionHint}>
        {linkContent}
      </NavTooltip>
    </li>
  )
}
