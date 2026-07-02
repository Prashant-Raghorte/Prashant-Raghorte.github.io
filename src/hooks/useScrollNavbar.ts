import { useEffect, useRef, useState } from 'react'

export type NavbarScrollState = 'top' | 'compact' | 'hidden'

const TOP_THRESHOLD = 48
const HIDE_THRESHOLD = 140

export function useScrollNavbar() {
  const lastScrollY = useRef(0)
  const [scrollState, setScrollState] = useState<NavbarScrollState>('top')

  useEffect(() => {
    lastScrollY.current = window.scrollY

    const handleScroll = () => {
      const currentScrollY = window.scrollY
      const scrollingDown = currentScrollY > lastScrollY.current

      if (currentScrollY <= TOP_THRESHOLD) {
        setScrollState('top')
      } else if (scrollingDown && currentScrollY > HIDE_THRESHOLD) {
        setScrollState('hidden')
      } else {
        setScrollState('compact')
      }

      lastScrollY.current = currentScrollY
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return {
    scrollState,
    isAtTop: scrollState === 'top',
    isCompact: scrollState === 'compact',
    isHidden: scrollState === 'hidden',
  }
}
