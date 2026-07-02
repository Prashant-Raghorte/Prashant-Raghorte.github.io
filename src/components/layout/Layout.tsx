import type { ReactNode } from 'react'
import { StarBackground } from '@/components/background'
import { Footer } from './Footer'
import { Header } from './Header'
import { ScrollProgress } from '@/components/ui/ScrollProgress'
import { ScrollToTopFab } from '@/components/ui/ScrollToTopFab'
import { useHashScroll, useScrollToTopOnRoute } from '@/hooks'
import './Layout.css'

type LayoutProps = {
  children: ReactNode
}

export function Layout({ children }: LayoutProps) {
  useScrollToTopOnRoute()
  useHashScroll()

  return (
    <div className="layout">
      <StarBackground />
      <ScrollProgress />
      <Header />
      <main className="layout__main">{children}</main>
      <Footer />
      <ScrollToTopFab />
    </div>
  )
}
