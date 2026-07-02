import { NavTooltip } from '@/components/navbar/NavTooltip'
import './ThemeSwitcher.css'

type ThemeSwitcherProps = {
  isDark: boolean
  onToggle: () => void
}

export function ThemeSwitcher({ isDark, onToggle }: ThemeSwitcherProps) {
  const label = isDark ? 'Light mode' : 'Dark mode'

  return (
    <NavTooltip label={label} hint="Theme" placement="bottom">
      <button
        type="button"
        className="theme-switcher"
        onClick={(event) => {
          onToggle()
          event.currentTarget.blur()
        }}
        aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      >
        {isDark ? (
          <svg className="theme-switcher__icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <circle cx="12" cy="12" r="4.5" stroke="currentColor" strokeWidth="1.75" />
            <path
              d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
            />
          </svg>
        ) : (
          <svg className="theme-switcher__icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M20 14.5A7.5 7.5 0 0 1 9.5 4 6.5 6.5 0 1 0 20 14.5Z"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </button>
    </NavTooltip>
  )
}
