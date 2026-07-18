import { useState } from 'react'
import type { Experience } from '@/types'
import { getCompanyInitials, getCompanyLogoSources } from '@/utils/companyLogos'
import './CompanyLogo.css'

type CompanyLogoProps = {
  experience: Pick<Experience, 'company' | 'companyLogoUrl' | 'companyUrl'>
  className?: string
  isCurrent?: boolean
}

export function CompanyLogo({ experience, className = '', isCurrent = false }: CompanyLogoProps) {
  const { primary, fallback } = getCompanyLogoSources(experience)
  const [sourceIndex, setSourceIndex] = useState(0)

  const sources = [primary, fallback].filter(
    (source, index, list): source is string =>
      Boolean(source) && list.indexOf(source) === index,
  )
  const logoSrc = sources[sourceIndex]
  const initials = getCompanyInitials(experience.company)

  const classes = [
    'company-logo',
    isCurrent ? 'company-logo--current' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  if (!logoSrc || sourceIndex >= sources.length) {
    return (
      <span className={`${classes} company-logo--fallback`} aria-hidden="true">
        {initials}
      </span>
    )
  }

  return (
    <span className={classes}>
      <img
        src={logoSrc}
        alt=""
        className="company-logo__image"
        loading="lazy"
        decoding="async"
        onError={() => setSourceIndex((current) => current + 1)}
      />
    </span>
  )
}
