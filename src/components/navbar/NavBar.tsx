import { useEffect, useState } from 'react'
import { mainNavItems } from '@/constants'
import {
  useActiveNav,
  useNavIndicator,
  useScrollNavbar,
  useSpotlight,
  useTheme,
} from '@/hooks'
import { useMobileMenuLock } from '@/hooks/useMobileMenuLock'
import { MobileMenuToggle } from '@/components/navbar/MobileMenuToggle'
import { MobileMenuBackdrop } from '@/components/navbar/MobileMenuBackdrop'
import { NavBarIndicator, NavBarSpotlight, NavBarShineRing } from '@/components/navbar/NavBarEffects'
import { NavBarLogo } from '@/components/navbar/NavBarLogo'
import { NavBarMenu } from '@/components/navbar/NavBarMenu'
import { ThemeCycleSwitcher } from '@/components/navbar/ThemeCycleSwitcher'
import type { NavbarScrollState } from '@/hooks/useScrollNavbar'
import './NavBar.css'

function getShellClass(scrollState: NavbarScrollState, menuOpen: boolean) {
  return [
    'navbar-shell',
    `navbar-shell--${scrollState}`,
    menuOpen ? 'navbar-shell--open' : '',
  ]
    .filter(Boolean)
    .join(' ')
}

export function NavBar() {
  const activeNavId = useActiveNav()
  const { scrollState, isHidden } = useScrollNavbar()
  const { theme, cycle } = useTheme()
  const { spotlight, handleMouseMove, handleMouseLeave } = useSpotlight<HTMLElement>()
  const [menuOpen, setMenuOpen] = useState(false)
  const [isDesktop, setIsDesktop] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(min-width: 900px)').matches,
  )

  const { containerRef, registerLink, indicator } = useNavIndicator(
    activeNavId,
    isDesktop && !menuOpen,
  )

  useMobileMenuLock(menuOpen && !isDesktop)

  useEffect(() => {
    const media = window.matchMedia('(min-width: 900px)')

    const handleChange = (event: MediaQueryListEvent) => {
      setIsDesktop(event.matches)
      if (event.matches) setMenuOpen(false)
    }

    setIsDesktop(media.matches)
    media.addEventListener('change', handleChange)
    return () => media.removeEventListener('change', handleChange)
  }, [])

  useEffect(() => {
    if (!menuOpen || isDesktop) return

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }

    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [isDesktop, menuOpen])

  const closeMenu = () => setMenuOpen(false)
  const shouldHide = isHidden && !menuOpen

  return (
    <header
      className={[
        'navbar',
        shouldHide ? 'navbar--hidden' : 'navbar--visible',
        `navbar--${scrollState}`,
        menuOpen ? 'navbar--menu-open' : '',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <MobileMenuBackdrop isOpen={menuOpen && !isDesktop} onClose={closeMenu} />

      <nav
        ref={containerRef}
        className={getShellClass(scrollState, menuOpen)}
        aria-label="Main navigation"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={
          {
            '--spot-x': `${spotlight.x}%`,
            '--spot-y': `${spotlight.y}%`,
            '--indicator-left': `${indicator.left}px`,
            '--indicator-width': `${indicator.width}px`,
          } as React.CSSProperties
        }
      >
        <NavBarSpotlight active={spotlight.active} />
        <NavBarShineRing />

        <NavBarLogo />

        <NavBarMenu
          items={mainNavItems}
          activeNavId={activeNavId}
          isOpen={isDesktop || menuOpen}
          registerLink={registerLink}
          onNavigate={closeMenu}
        />

        <div className="navbar-shell__actions">
          <ThemeCycleSwitcher theme={theme} onCycle={cycle} />
          <MobileMenuToggle
            isOpen={menuOpen}
            onToggle={() => setMenuOpen((open) => !open)}
          />
        </div>

        <NavBarIndicator opacity={indicator.opacity} />
      </nav>
    </header>
  )
}
