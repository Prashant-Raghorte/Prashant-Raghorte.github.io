import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { scrollToSection } from '@/utils/scroll'

export function useHashScroll() {
  const location = useLocation()

  useEffect(() => {
    if (!location.hash) return

    const sectionId = location.hash.replace('#', '')
    const timer = window.setTimeout(() => {
      scrollToSection(sectionId)
      window.history.replaceState(null, '', location.pathname + location.search)
    }, 60)

    return () => window.clearTimeout(timer)
  }, [location.pathname, location.hash, location.search])
}
