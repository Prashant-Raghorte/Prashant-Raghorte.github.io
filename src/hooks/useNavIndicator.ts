import { useCallback, useEffect, useRef, useState } from 'react'

type IndicatorState = {
  left: number
  width: number
  opacity: number
}

const HIDDEN_INDICATOR: IndicatorState = { left: 0, width: 0, opacity: 0 }

export function useNavIndicator(activeSectionId: string, enabled = true) {
  const containerRef = useRef<HTMLElement>(null)
  const linkRefs = useRef<Map<string, HTMLAnchorElement>>(new Map())
  const [indicator, setIndicator] = useState<IndicatorState>(HIDDEN_INDICATOR)

  const registerLink = useCallback((sectionId: string, element: HTMLAnchorElement | null) => {
    if (element) linkRefs.current.set(sectionId, element)
    else linkRefs.current.delete(sectionId)
  }, [])

  const updateIndicator = useCallback(() => {
    if (!enabled) {
      setIndicator(HIDDEN_INDICATOR)
      return
    }

    const container = containerRef.current
    const activeEl = linkRefs.current.get(activeSectionId)

    if (!container || !activeEl) return

    const containerRect = container.getBoundingClientRect()
    const linkRect = activeEl.getBoundingClientRect()

    setIndicator({
      left: linkRect.left - containerRect.left,
      width: linkRect.width,
      opacity: 1,
    })
  }, [activeSectionId, enabled])

  useEffect(() => {
    updateIndicator()
    window.addEventListener('resize', updateIndicator)
    window.addEventListener('scroll', updateIndicator, { passive: true })
    return () => {
      window.removeEventListener('resize', updateIndicator)
      window.removeEventListener('scroll', updateIndicator)
    }
  }, [updateIndicator])

  return { containerRef, registerLink, indicator, updateIndicator }
}
