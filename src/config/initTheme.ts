import { DEFAULT_THEME, normalizeThemeId, THEME_STORAGE_KEY } from '@/config/themes'

const stored = localStorage.getItem(THEME_STORAGE_KEY)
const theme = stored ? normalizeThemeId(stored) : null
document.documentElement.dataset.theme = theme ?? DEFAULT_THEME

if (stored && theme && stored !== theme) {
  localStorage.setItem(THEME_STORAGE_KEY, theme)
}
