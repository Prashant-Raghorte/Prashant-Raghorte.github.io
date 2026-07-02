import type { ReactNode } from 'react'
import './Section.css'

type SectionProps = {
  id?: string
  title?: string
  eyebrow?: string
  children: ReactNode
  className?: string
}

export function Section({ id, title, eyebrow, children, className = '' }: SectionProps) {
  return (
    <section id={id} className={`section-block ${className}`.trim()}>
      <div className="container section-block__inner">
        {(eyebrow || title) && (
          <header className="section-block__header">
            {eyebrow && <p className="section-block__eyebrow">{eyebrow}</p>}
            {title && <h2 className="section-block__title">{title}</h2>}
          </header>
        )}
        {children}
      </div>
    </section>
  )
}
