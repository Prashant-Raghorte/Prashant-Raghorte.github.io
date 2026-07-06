import { useEffect, useState } from 'react'
import type { Experience } from '@/types'
import { getExperienceAnchorId } from '@/utils/experienceHelpers'

function pickActiveExperienceId(items: Experience[]): string | null {
  const viewportHeight = window.innerHeight
  const isMobile = window.matchMedia('(max-width: 1023px)').matches
  const anchorY = viewportHeight * (isMobile ? 0.34 : 0.42)
  let best: { id: string; score: number } | null = null

  for (const item of items) {
    const element = document.getElementById(getExperienceAnchorId(item.id))
    if (!element) continue

    const rect = element.getBoundingClientRect()
    const visibleTop = Math.max(rect.top, 0)
    const visibleBottom = Math.min(rect.bottom, viewportHeight)
    const visibleHeight = Math.max(0, visibleBottom - visibleTop)

    if (visibleHeight <= 0) continue

    const visibility = visibleHeight / Math.min(rect.height, viewportHeight)
    const focusY = rect.top + rect.height * (isMobile ? 0.22 : 0.5)
    const centerProximity = 1 - Math.min(Math.abs(focusY - anchorY) / viewportHeight, 1)
    const score = visibility * 0.62 + centerProximity * 0.38

    if (!best || score > best.score) {
      best = { id: item.id, score }
    }
  }

  return best?.id ?? null
}

export function useActiveExperience(items: Experience[]) {
  const [activeId, setActiveId] = useState(items[0]?.id ?? '')

  useEffect(() => {
    if (items.length === 0) return

    let frame = 0

    const updateActive = () => {
      const nextId = pickActiveExperienceId(items) ?? items[0]?.id
      if (!nextId) return

      setActiveId((current) => (current === nextId ? current : nextId))
    }

    const onScroll = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(updateActive)
    }

    const scheduleInitialUpdate = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        frame = requestAnimationFrame(updateActive)
      })
    }

    scheduleInitialUpdate()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [items])

  return activeId
}
