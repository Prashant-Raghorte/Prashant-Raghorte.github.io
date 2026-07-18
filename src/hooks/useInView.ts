import { useEffect, useRef, useState } from 'react'

type UseInViewOptions = {
  threshold?: number
  rootMargin?: string
  once?: boolean
}

export function useInView<T extends HTMLElement>({
  threshold = 0.12,
  rootMargin = '0px 0px -8% 0px',
  once = true,
}: UseInViewOptions = {}) {
  const ref = useRef<T>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    let cancelled = false

    const markInView = () => {
      if (cancelled) return
      setInView(true)
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return

        markInView()
        if (once) observer.disconnect()
      },
      { threshold, rootMargin },
    )

    observer.observe(element)

    // Capture the observer's initial intersection after layout — avoids a blank
    // first paint when the element is already on screen.
    requestAnimationFrame(() => {
      if (cancelled) return

      const [entry] = observer.takeRecords()
      if (entry?.isIntersecting) {
        markInView()
        if (once) observer.disconnect()
      }
    })

    return () => {
      cancelled = true
      observer.disconnect()
    }
  }, [once, rootMargin, threshold])

  return { ref, inView }
}
