import type { ReactNode } from 'react'
import './PageHeader.css'

type PageHeaderProps = {
  title: string
  subtitle?: string
  eyebrow?: string
  children?: ReactNode
  className?: string
}

export function PageHeader({
  title,
  subtitle,
  eyebrow,
  children,
  className = '',
}: PageHeaderProps) {
  return (
    <section
      className={['page-header', 'section-block', className].filter(Boolean).join(' ')}
    >
      <div className="container page-header__inner">
        <div className="page-header__glow" aria-hidden="true" />

        <div className="page-header__copy">
          {eyebrow ? (
            <p className="page-header__eyebrow">
              <span className="page-header__eyebrow-mark" aria-hidden="true" />
              {eyebrow}
            </p>
          ) : null}

          <h1 className="page-header__title">
            <span className="page-header__title-text">{title}</span>
          </h1>

          {subtitle ? <p className="page-header__subtitle">{subtitle}</p> : null}

          <span className="page-header__rule" aria-hidden="true" />
        </div>

        {children}
      </div>
    </section>
  )
}
