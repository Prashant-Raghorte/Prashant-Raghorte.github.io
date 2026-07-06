import { useEffect } from 'react'

const MENU_OPEN_CLASS = 'navbar-menu-open'

export function useMobileMenuLock(isOpen: boolean) {
  useEffect(() => {
    const root = document.documentElement

    if (isOpen) {
      const previousOverflow = document.body.style.overflow
      root.classList.add(MENU_OPEN_CLASS)
      document.body.style.overflow = 'hidden'

      return () => {
        root.classList.remove(MENU_OPEN_CLASS)
        document.body.style.overflow = previousOverflow
      }
    }

    root.classList.remove(MENU_OPEN_CLASS)
    return undefined
  }, [isOpen])
}
