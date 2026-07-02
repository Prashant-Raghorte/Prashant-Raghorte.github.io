import type { ReactNode } from 'react'
import './PageHeader.css'

type PageHeaderProps = {
  title: string
  subtitle?: string
  children?: ReactNode
}

export function PageHeader({ title, subtitle, children }: PageHeaderProps) {
  return (
    <section className="page-header section-block">
      <div className="container page-header__inner">
        <h1 className="page-header__title">{title}</h1>
        {subtitle && <p className="page-header__subtitle">{subtitle}</p>}
        {children}
      </div>
    </section>
  )
}
