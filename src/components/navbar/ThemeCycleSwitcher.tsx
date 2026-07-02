import { cycleTheme, getNextThemeLabel } from '@/config/themeCycle'
import type { ThemeId } from '@/config/themes'
import { NavTooltip } from '@/components/navbar/NavTooltip'
import './ThemeSwitcher.css'

type ThemeCycleSwitcherProps = {
  theme: ThemeId
  onCycle: () => void
}

function ThemeIcon({ nextTheme }: { nextTheme: ThemeId }) {
  if (nextTheme === 'light') {
    return (
      <svg className="theme-switcher__icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="12" cy="12" r="4.5" stroke="currentColor" strokeWidth="1.75" />
        <path
          d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
        />
      </svg>
    )
  }

  if (nextTheme === 'dark') {
    return (
      <svg className="theme-switcher__icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M20 14.5A7.5 7.5 0 0 1 9.5 4 6.5 6.5 0 1 0 20 14.5Z"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinejoin="round"
        />
      </svg>
    )
  }

  if (nextTheme === 'midnight') {
    return (
      <svg className="theme-switcher__icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M12 3.5l1.1 3.4h3.6l-2.9 2.1 1.1 3.4L12 10.3 9.2 12.4l1.1-3.4-2.9-2.1h3.6L12 3.5Z"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinejoin="round"
        />
        <path
          d="M5.5 4.5l.6 1.8M18.5 4.5l-.6 1.8M4 12H2M22 12h-2M5.5 19.5l.6-1.8M18.5 19.5l-.6-1.8"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
        />
      </svg>
    )
  }

  return (
    <svg className="theme-switcher__icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 17h16" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
      <path
        d="M12 15a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"
        stroke="currentColor"
        strokeWidth="1.75"
      />
      <path
        d="M7 17c1.2-2.2 2.8-3.2 5-3.2s3.8 1 5 3.2"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </svg>
  )
}

export function ThemeCycleSwitcher({ theme, onCycle }: ThemeCycleSwitcherProps) {
  const nextTheme = cycleTheme(theme)
  const nextLabel = getNextThemeLabel(theme)

  return (
    <NavTooltip label={`${nextLabel} mode`} hint="Theme" placement="bottom">
      <button
        type="button"
        className="theme-switcher"
        onClick={(event) => {
          onCycle()
          event.currentTarget.blur()
        }}
        aria-label={`Switch to ${nextLabel.toLowerCase()} theme`}
      >
        <ThemeIcon nextTheme={nextTheme} />
      </button>
    </NavTooltip>
  )
}
