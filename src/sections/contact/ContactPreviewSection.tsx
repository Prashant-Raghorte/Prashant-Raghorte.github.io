import type { CSSProperties } from 'react'
import { siteCopy } from '@/config/copy'
import { Link } from 'react-router-dom'
import { siteConfig } from '@/config/site'
import { AvailabilityBadge, Section } from '@/components/common'
import { SocialIcon } from '@/components/ui/SocialIcon'
import { ShineBorderCard } from '@/components/ui/ShineBorderCard'
import { ArrowRightIcon } from '@/components/ui/icons'
import { ROUTES, SECTION_IDS } from '@/constants'
import { useInView } from '@/hooks/useInView'
import { getContactChannels } from '@/utils/contactChannels'
import '@/components/common/ViewAllCard.css'
import './ContactPreviewSection.css'

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

function ClockIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="8.25" stroke="currentColor" strokeWidth="1.75" />
      <path
        d="M12 8v4.25l2.75 1.75"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function ContactPreviewSection() {
  const channels = getContactChannels({ featuredEmail: true })
  const { ref, inView } = useInView<HTMLDivElement>()
  const { contactConnect } = siteCopy.sections

  return (
    <Section id={SECTION_IDS.CONTACT} eyebrow="Connect" title="Get In Touch">
      <div
        ref={ref}
        className={['contact-preview', inView ? 'contact-preview--in-view' : '']
          .filter(Boolean)
          .join(' ')}
      >
        <div className="contact-preview__layout">
          <aside className="contact-preview__intro" aria-label="Contact introduction">
            <span className="contact-preview__align-rail" aria-hidden="true">
              <span className="contact-preview__align-node contact-preview__align-node--top" />
              <span className="contact-preview__align-line" />
              <span className="contact-preview__align-node contact-preview__align-node--bottom" />
            </span>

            <div className="contact-preview__intro-stack">
              <AvailabilityBadge
                showSummary
                className="contact-preview__availability availability-badge--center-mobile"
              />

              <p className="contact-preview__lede text-fluid-base">{siteCopy.sections.contactPreview}</p>

              <ul className="contact-preview__signals" aria-label="Contact details">
                <li className="contact-preview__signal">
                  <span className="contact-preview__signal-icon" aria-hidden="true">
                    <ClockIcon />
                  </span>
                  <span className="contact-preview__signal-copy">
                    <span className="contact-preview__signal-label">{contactConnect.responseTitle}</span>
                    <span className="contact-preview__signal-value">{contactConnect.responseHint}</span>
                  </span>
                </li>
                {siteConfig.location ? (
                  <li className="contact-preview__signal">
                    <span className="contact-preview__signal-icon" aria-hidden="true">
                      <LocationIcon />
                    </span>
                    <span className="contact-preview__signal-copy">
                      <span className="contact-preview__signal-label">{contactConnect.locationTitle}</span>
                      <span className="contact-preview__signal-value">{siteConfig.location}</span>
                    </span>
                  </li>
                ) : null}
              </ul>

              <div className="contact-preview__cta-block">
                <p className="contact-preview__cta-hint">{siteCopy.sections.contactPreviewCta.hint}</p>
                <ShineBorderCard hoverOnly className="contact-preview__cta-shine view-all-rail__shine">
                  <Link
                    to={ROUTES.CONTACT}
                    className="view-all-rail__pill contact-preview__cta"
                    aria-label={siteCopy.sections.contactPreviewCta.ariaLabel}
                  >
                    <span className="view-all-rail__label">
                      {siteCopy.sections.contactPreviewCta.label}
                    </span>
                    <span className="view-all-rail__arrow" aria-hidden="true">
                      <ArrowRightIcon />
                    </span>
                  </Link>
                </ShineBorderCard>
              </div>
            </div>
          </aside>

          <div className="contact-preview__hub-wrap">
            <ShineBorderCard hoverOnly className="contact-preview__hub-card">
              <div className="contact-preview__hub">
                <header className="contact-preview__hub-head">
                  <div className="contact-preview__orbit" aria-hidden="true">
                    <span className="contact-preview__orbit-ring contact-preview__orbit-ring--outer" />
                    <span className="contact-preview__orbit-ring contact-preview__orbit-ring--inner" />
                    <span className="contact-preview__orbit-glow" />
                    <span className="contact-preview__orbit-core">
                      <SocialIcon name="email" className="contact-preview__orbit-icon" />
                    </span>
                  </div>
                  <div className="contact-preview__hub-copy">
                    <p className="contact-preview__hub-label">{contactConnect.title}</p>
                    <p className="contact-preview__hub-title">Choose how to reach me</p>
                  </div>
                </header>

                <div className="contact-preview__grid" role="list" aria-label="Contact channels">
                  {channels.map((channel, index) => (
                    <a
                      key={channel.id}
                      href={channel.href}
                      target={channel.external ? '_blank' : undefined}
                      rel={channel.external ? 'noreferrer' : undefined}
                      className={[
                        'contact-preview__channel',
                        channel.featured ? 'contact-preview__channel--featured' : '',
                      ]
                        .filter(Boolean)
                        .join(' ')}
                      style={{ '--contact-channel-delay': `${index * 70}ms` } as CSSProperties}
                      role="listitem"
                      aria-label={`${channel.name}: ${channel.hint}`}
                    >
                      <span className="contact-preview__channel-beam" aria-hidden="true" />
                      <span className="contact-preview__channel-icon-wrap" aria-hidden="true">
                        <SocialIcon name={channel.icon} className="contact-preview__channel-icon" />
                      </span>
                      <span className="contact-preview__channel-text">
                        <span className="contact-preview__channel-name">{channel.name}</span>
                        <span className="contact-preview__channel-display">{channel.hint}</span>
                      </span>
                      <span className="contact-preview__channel-arrow" aria-hidden="true">
                        <ArrowRightIcon />
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            </ShineBorderCard>
          </div>
        </div>
      </div>
    </Section>
  )
}
