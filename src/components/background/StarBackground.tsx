import { lazy, Suspense, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { ErrorBoundary } from '@/components/common/ErrorBoundary'
import { useTheme } from '@/hooks/useTheme'
import './StarBackground.css'

const StarBackgroundCanvas = lazy(() => import('@/components/background/StarBackgroundCanvas'))

function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setPrefersReducedMotion(media.matches)

    update()
    media.addEventListener('change', update)

    return () => media.removeEventListener('change', update)
  }, [])

  return prefersReducedMotion
}

function StarsCanvas() {
  const { isDark } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [canvasReady, setCanvasReady] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    const frame = window.requestAnimationFrame(() => {
      setCanvasReady(true)
    })

    return () => {
      window.cancelAnimationFrame(frame)
      setCanvasReady(false)
    }
  }, [mounted])

  if (!mounted || !canvasReady) {
    return null
  }

  return (
    <Suspense fallback={null}>
      <StarBackgroundCanvas key={isDark ? 'dark' : 'light'} isDark={isDark} />
    </Suspense>
  )
}

function StarBackgroundLayer() {
  const prefersReducedMotion = usePrefersReducedMotion()

  if (prefersReducedMotion) {
    return null
  }

  return (
    <div className="star-background" aria-hidden="true">
      <ErrorBoundary>
        <StarsCanvas />
      </ErrorBoundary>
      <div className="star-background__fade" />
    </div>
  )
}

export function StarBackground() {
  const [container, setContainer] = useState<HTMLElement | null>(null)

  useEffect(() => {
    setContainer(document.body)
  }, [])

  if (!container) {
    return null
  }

  return createPortal(<StarBackgroundLayer />, container)
}
