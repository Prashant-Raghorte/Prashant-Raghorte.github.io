/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_ENV?: 'development' | 'uat' | 'production'
  readonly VITE_API_URL?: string
  readonly VITE_SITE_URL?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

export type ThemeId = 'dark' | 'light' | 'midnight' | 'sunset'
