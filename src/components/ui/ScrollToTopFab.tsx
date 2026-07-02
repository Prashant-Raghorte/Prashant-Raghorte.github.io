import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { ROUTES, SECTION_IDS } from '@/constants'
import { scrollToSection } from '@/utils/scroll'
import './ScrollToTopFab.css'

const SHOW_AFTER = 480

export function ScrollToTopFab() {
  const navigate = useNavigate()
  const location = useLocation()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > SHOW_AFTER)
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleClick = () => {
    if (location.pathname === ROUTES.HOME) {
      scrollToSection(SECTION_IDS.HOME)
      return
    }

    navigate(ROUTES.HOME)
  }

  return (
    <div className={`scroll-fab-wrap${visible ? ' scroll-fab-wrap--visible' : ''}`}>
      <span className="scroll-fab__tooltip" role="tooltip">
        Back to top
      </span>
      <button
        type="button"
        className="scroll-fab"
        onClick={handleClick}
        aria-label="Back to top"
      >
        <span className="scroll-fab__inner">
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M12 5.5 6 11.5M12 5.5l6 6M12 5.5V18.5"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </button>
    </div>
  )
}
