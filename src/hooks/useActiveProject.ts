import { useEffect, useState } from 'react'
import type { Project } from '@/types'
import { getProjectAnchorId } from '@/utils/projectHelpers'

const ACTIVE_SWITCH_MARGIN = 0.1

function pickActiveProjectId(items: Project[], currentId: string): string | null {
  const viewportHeight = window.innerHeight
  const isMobile = window.matchMedia('(max-width: 1023px)').matches
  const anchorY = viewportHeight * (isMobile ? 0.36 : 0.42)
  let best: { id: string; score: number } | null = null

  for (const item of items) {
    const element = document.getElementById(getProjectAnchorId(item.id))
    if (!element) continue

    const rect = element.getBoundingClientRect()
    const visibleTop = Math.max(rect.top, 0)
    const visibleBottom = Math.min(rect.bottom, viewportHeight)
    const visibleHeight = Math.max(0, visibleBottom - visibleTop)

    if (visibleHeight <= 0) continue

    const visibility = visibleHeight / Math.min(rect.height, viewportHeight)
    const focusY = rect.top + rect.height * (isMobile ? 0.2 : 0.35)
    const centerProximity = 1 - Math.min(Math.abs(focusY - anchorY) / viewportHeight, 1)
    const score = visibility * 0.68 + centerProximity * 0.32

    if (!best || score > best.score) {
      best = { id: item.id, score }
    }
  }

  if (!best) return null

  if (currentId && best.id !== currentId) {
    const currentElement = document.getElementById(getProjectAnchorId(currentId))
    if (currentElement) {
      const rect = currentElement.getBoundingClientRect()
      const visibleTop = Math.max(rect.top, 0)
      const visibleBottom = Math.min(rect.bottom, viewportHeight)
      const visibleHeight = Math.max(0, visibleBottom - visibleTop)
      const visibility = visibleHeight / Math.min(rect.height, viewportHeight)
      const focusY = rect.top + rect.height * (isMobile ? 0.2 : 0.35)
      const centerProximity = 1 - Math.min(Math.abs(focusY - anchorY) / viewportHeight, 1)
      const currentScore = visibility * 0.68 + centerProximity * 0.32

      if (best.score - currentScore < ACTIVE_SWITCH_MARGIN) {
        return currentId
      }
    }
  }

  return best.id
}

export function useActiveProject(items: Project[]) {
  const [activeId, setActiveId] = useState(items[0]?.id ?? '')

  useEffect(() => {
    if (items.length === 0) return

    let frame = 0

    const updateActive = () => {
      setActiveId((current) => {
        const nextId = pickActiveProjectId(items, current) ?? items[0]?.id
        if (!nextId) return current
        return current === nextId ? current : nextId
      })
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
