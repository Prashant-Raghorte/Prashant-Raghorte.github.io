import { useCallback } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { ROUTES } from '@/constants'
import { scrollToSection } from '@/utils/scroll'

export function useHomeSectionNav() {
  const location = useLocation()
  const navigate = useNavigate()

  return useCallback(
    (sectionId: string) => {
      if (location.pathname === ROUTES.HOME) {
        scrollToSection(sectionId)
        return
      }

      navigate(ROUTES.HOME)
      window.setTimeout(() => scrollToSection(sectionId), 80)
    },
    [location.pathname, navigate],
  )

}
