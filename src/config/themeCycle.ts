import { THEME_IDS, type ThemeId } from '@/config/themes'

export function cycleTheme(current: ThemeId): ThemeId {
  const index = THEME_IDS.indexOf(current)
  const nextIndex = index === -1 ? 0 : (index + 1) % THEME_IDS.length
  return THEME_IDS[nextIndex]
}

export function getNextThemeLabel(current: ThemeId): string {
  const next = cycleTheme(current)
  const labels: Record<ThemeId, string> = {
    dark: 'Dark',
    light: 'Light',
    midnight: 'Midnight',
    sunset: 'Sunset',
  }
  return labels[next]
}
