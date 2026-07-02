/**
 * Centralized environment config.
 * Values come from .env.[mode] files (see .env.example).
 * Only VITE_* variables are exposed to the browser.
 */
export const env = {
  mode: import.meta.env.MODE as 'development' | 'uat' | 'production',
  isDev: import.meta.env.DEV,
  isProd: import.meta.env.PROD,
  appEnv: import.meta.env.VITE_APP_ENV ?? import.meta.env.MODE,
  siteUrl: import.meta.env.VITE_SITE_URL ?? 'http://localhost:3000',
  apiUrl: import.meta.env.VITE_API_URL ?? '',
  contactFormEndpoint: import.meta.env.VITE_CONTACT_FORM_ENDPOINT ?? '',
} as const

export type AppEnv = typeof env.appEnv
