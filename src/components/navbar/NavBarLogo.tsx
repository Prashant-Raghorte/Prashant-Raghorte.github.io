import { Link } from 'react-router-dom'
import { siteConfig } from '@/config/site'
import { ROUTES } from '@/constants'
import './NavBarLogo.css'

const LOGO_INITIALS = siteConfig.name
  .split(' ')
  .map((part) => part[0])
  .join('')
  .slice(0, 2)
  .toUpperCase()

export function NavBarLogo() {
  return (
    <Link to={ROUTES.HOME} className="navbar-logo">
      <span className="navbar-logo__mark">{LOGO_INITIALS}</span>
      <span className="navbar-logo__text">{siteConfig.name.split(' ')[0]}</span>
    </Link>
  )
}
