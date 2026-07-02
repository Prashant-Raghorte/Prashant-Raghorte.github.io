import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@/config/initTheme'
import '@/styles/index.css'
import '@/styles/interactions.css'
import { App } from '@/App'

const redirect = sessionStorage.getItem('redirect')
if (redirect) {
  sessionStorage.removeItem('redirect')
  window.history.replaceState(null, '', redirect)
}

const rootElement = document.getElementById('root')

if (!rootElement) {
  throw new Error('Root element #root not found')
}

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
