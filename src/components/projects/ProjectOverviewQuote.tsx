import type { ReactNode } from 'react'
import './ProjectOverviewQuote.css'

type ProjectOverviewQuoteProps = {
  children: ReactNode
  className?: string
}

export function ProjectOverviewQuote({ children, className }: ProjectOverviewQuoteProps) {
  return (
    <blockquote
      className={['projects-quote', className].filter(Boolean).join(' ')}
    >
      <span className="projects-quote__mark" aria-hidden="true">
        “
      </span>
      <div className="projects-quote__body">
        {typeof children === 'string' ? <p>{children}</p> : children}
      </div>
    </blockquote>
  )
}
