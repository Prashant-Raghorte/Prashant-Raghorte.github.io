import { useCallback, useState } from 'react'

type SpotlightState = {
  x: number
  y: number
  active: boolean
}

const DEFAULT_SPOTLIGHT: SpotlightState = { x: 50, y: 50, active: false }

export function useSpotlight<T extends HTMLElement>() {
  const [spotlight, setSpotlight] = useState<SpotlightState>(DEFAULT_SPOTLIGHT)

  const handleMouseMove = useCallback((event: React.MouseEvent<T>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const x = ((event.clientX - rect.left) / rect.width) * 100
    const y = ((event.clientY - rect.top) / rect.height) * 100

    setSpotlight({ x, y, active: true })
  }, [])

  const handleMouseLeave = useCallback(() => {
    setSpotlight((prev) => ({ ...prev, active: false }))
  }, [])

  return { spotlight, handleMouseMove, handleMouseLeave }
}
