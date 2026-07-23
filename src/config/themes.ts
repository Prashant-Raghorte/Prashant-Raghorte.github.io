export const THEME_IDS = ['dark', 'light', 'midnight', 'sunset'] as const

export type ThemeId = (typeof THEME_IDS)[number]

export type ThemeMeta = {
  id: ThemeId
  label: string
}

export const themes: ThemeMeta[] = [
  { id: 'dark', label: 'Dark' },
  { id: 'light', label: 'Light' },
  { id: 'midnight', label: 'Midnight' },
  { id: 'sunset', label: 'Sunset' },
]

export const DEFAULT_THEME: ThemeId = 'light'

export const THEME_STORAGE_KEY = 'portfolio-theme'

const LEGACY_THEME_MAP: Record<string, ThemeId> = {
  ocean: 'midnight',
  sunset: 'sunset',
  charcoal: 'dark',
  Dark: 'dark',
  Light: 'light',
}

export function normalizeThemeId(value: string): ThemeId | null {
  if (isThemeId(value)) return value
  return LEGACY_THEME_MAP[value] ?? null
}

export function toggleTheme(current: ThemeId): ThemeId {
  return current === 'dark' ? 'light' : 'dark'
}

export function isThemeId(value: string): value is ThemeId {
  return THEME_IDS.includes(value as ThemeId)
}

export function isLightTheme(theme: ThemeId): boolean {
  return theme === 'light'
}

export function isDarkTheme(theme: ThemeId): boolean {
  return theme === 'dark' || theme === 'midnight' || theme === 'sunset'
}
