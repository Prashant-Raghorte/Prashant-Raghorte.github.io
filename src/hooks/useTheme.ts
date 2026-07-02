import { useCallback, useEffect, useState } from 'react'
import { cycleTheme } from '@/config/themeCycle'
import {
  DEFAULT_THEME,
  isDarkTheme,
  normalizeThemeId,
  THEME_STORAGE_KEY,
  type ThemeId,
} from '@/config/themes'

function readStoredTheme(): ThemeId {
  if (typeof window === 'undefined') return DEFAULT_THEME
  const stored = localStorage.getItem(THEME_STORAGE_KEY)
  return stored ? (normalizeThemeId(stored) ?? DEFAULT_THEME) : DEFAULT_THEME
}

function applyTheme(theme: ThemeId) {
  document.documentElement.dataset.theme = theme
  localStorage.setItem(THEME_STORAGE_KEY, theme)
}

export function useTheme() {
  const [theme, setThemeState] = useState<ThemeId>(() => readStoredTheme())

  useEffect(() => {
    applyTheme(theme)
  }, [theme])

  const setTheme = useCallback((next: ThemeId) => {
    setThemeState(next)
  }, [])

  const cycle = useCallback(() => {
    setThemeState((current) => cycleTheme(current))
  }, [])

  return { theme, setTheme, cycle, isDark: isDarkTheme(theme) }
}
