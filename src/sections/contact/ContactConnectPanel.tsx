import type { CSSProperties } from 'react'
import { ArrowRightIcon } from '@/components/ui/icons'
import { SocialIcon } from '@/components/ui/SocialIcon'
import { getContactChannels } from '@/utils/contactChannels'
import './ContactConnectPanel.css'

export function ContactConnectPanel() {
  const channels = getContactChannels({ featuredEmail: true })

  return (
    <div className="contact-dock" role="list" aria-label="Direct channels">
      {channels.map((channel, index) => (
        <a
          key={channel.id}
          href={channel.href}
          target={channel.external ? '_blank' : undefined}
          rel={channel.external ? 'noreferrer' : undefined}
          className={[
            'contact-dock__pad',
            `contact-dock__pad--${channel.id}`,
            channel.featured ? 'contact-dock__pad--featured' : '',
          ]
            .filter(Boolean)
            .join(' ')}
          style={{ '--dock-i': index } as CSSProperties}
          role="listitem"
          aria-label={`${channel.name}: ${channel.hint}`}
        >
          <span className="contact-dock__index" aria-hidden="true">
            {String(index + 1).padStart(2, '0')}
          </span>
          <span className="contact-dock__rail" aria-hidden="true" />

          <span className="contact-dock__body">
            <span className="contact-dock__icon" aria-hidden="true">
              <SocialIcon name={channel.icon} />
            </span>

            <span className="contact-dock__meta">
              <span className="contact-dock__name-row">
                <span className="contact-dock__name">{channel.name}</span>
                {channel.featured ? (
                  <span className="contact-dock__badge">Primary</span>
                ) : null}
              </span>
              <span className="contact-dock__hint">{channel.hint}</span>
            </span>

            <span className="contact-dock__arrow" aria-hidden="true">
              <ArrowRightIcon />
            </span>
          </span>
        </a>
      ))}
    </div>
  )
}
