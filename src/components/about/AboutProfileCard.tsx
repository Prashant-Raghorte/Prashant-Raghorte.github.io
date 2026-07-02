import type { ReactNode } from 'react'
import { siteConfig } from '@/config/site'
import { AvailabilityBadge } from '@/components/common/AvailabilityBadge'
import { ShineBorderCard } from '@/components/ui/ShineBorderCard'
import { SocialIcon } from '@/components/ui/SocialIcon'
import './AboutProfileCard.css'

type DetailItem = {
  id: string
  label: string
  value: string
  href?: string
  external?: boolean
  icon: ReactNode
}

type SocialLink = {
  id: string
  href: string
  label: string
  icon: 'github' | 'linkedin' | 'instagram'
}

function LocationIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 21s7-4.5 7-11a7 7 0 1 0-14 0c0 6.5 7 11 7 11Z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.75" />
    </svg>
  )
}

function buildDetailItems(): DetailItem[] {
  const { email, phone } = siteConfig.links
  const items: DetailItem[] = []

  if (siteConfig.location) {
    items.push({
      id: 'location',
      label: 'Location',
      value: siteConfig.location,
      href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(siteConfig.location)}`,
      external: true,
      icon: <LocationIcon />,
    })
  }

  if (email) {
    items.push({
      id: 'email',
      label: 'Email',
      value: email,
      href: `mailto:${email}`,
      icon: <SocialIcon name="email" className="about-profile__tile-icon-svg" />,
    })
  }

  if (phone) {
    items.push({
      id: 'phone',
      label: 'Phone',
      value: phone,
      href: `tel:${phone.replace(/\s+/g, '')}`,
      icon: <SocialIcon name="phone" className="about-profile__tile-icon-svg" />,
    })
  }

  return items
}

function buildSocialLinks(): SocialLink[] {
  const { github, linkedin, instagram } = siteConfig.links
  const links: SocialLink[] = []

  if (github) {
    links.push({ id: 'github', href: github, label: 'GitHub', icon: 'github' })
  }

  if (linkedin) {
    links.push({ id: 'linkedin', href: linkedin, label: 'LinkedIn', icon: 'linkedin' })
  }

  if (instagram) {
    links.push({ id: 'instagram', href: instagram, label: 'Instagram', icon: 'instagram' })
  }

  return links
}

function DetailTile({ item }: { item: DetailItem }) {
  const content = (
    <>
      <span className="about-profile__tile-icon" aria-hidden="true">
        {item.icon}
      </span>
      <span className="about-profile__tile-copy">
        <span className="about-profile__tile-label">{item.label}</span>
        <span className="about-profile__tile-value">{item.value}</span>
      </span>
    </>
  )

  if (item.href) {
    return (
      <a
        href={item.href}
        className="about-profile__tile about-profile__tile--link"
        {...(item.external
          ? { target: '_blank', rel: 'noreferrer', 'aria-label': `Open ${item.value} in Google Maps` }
          : {})}
      >
        {content}
      </a>
    )
  }

  return <div className="about-profile__tile about-profile__tile--static">{content}</div>
}

export function AboutProfileCard() {
  const detailItems = buildDetailItems()
  const socialLinks = buildSocialLinks()

  return (
    <ShineBorderCard hoverOnly className="about-profile-card">
      <div className="about-profile">
        <div className="about-profile__visual">
          <div className="about-profile__visual-backdrop" aria-hidden="true" />
          <div className="about-profile__portrait">
            <div className="about-profile__portrait-glow" aria-hidden="true" />
            <div className="about-profile__portrait-shell">
              <img
                src={siteConfig.profileImageUrl}
                alt={`Portrait of ${siteConfig.name}`}
                className="about-profile__portrait-image"
                width={280}
                height={280}
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
        </div>

        <div className="about-profile__body">
          <header className="about-profile__header">
            <div className="about-profile__intro">
              <h2 className="about-profile__name">{siteConfig.name}</h2>
              <p className="about-profile__role">{siteConfig.role}</p>
              <p className="about-profile__tagline">{siteConfig.tagline}</p>
            </div>
            <AvailabilityBadge className="about-profile__availability" />
          </header>

          <div className="about-profile__details">
            {detailItems.map((item) => (
              <DetailTile key={item.id} item={item} />
            ))}
          </div>
        </div>

        {socialLinks.length > 0 && (
          <aside className="about-profile__aside" aria-label="Social profiles">
            <p className="about-profile__aside-label">Connect</p>
            <div className="about-profile__social-list">
              {socialLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="about-profile__social-item"
                  aria-label={`${link.label} profile`}
                >
                  <span className="about-profile__social-icon-wrap" aria-hidden="true">
                    <SocialIcon name={link.icon} className="about-profile__social-icon" />
                  </span>
                  <span className="about-profile__social-label">{link.label}</span>
                </a>
              ))}
            </div>
          </aside>
        )}
      </div>
    </ShineBorderCard>
  )
}
