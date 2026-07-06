import { siteCopy } from '@/config/copy'
import { siteConfig } from '@/config/site'
import { ShineBorderCard } from '@/components/ui/ShineBorderCard'
import { ArrowRightIcon } from '@/components/ui/icons'
import { SocialIcon } from '@/components/ui/SocialIcon'
import { getContactChannels } from '@/utils/contactChannels'
import './ContactConnectPanel.css'

export function ContactConnectPanel() {
  const channels = getContactChannels()
  const { contactConnect } = siteCopy.sections

  return (
    <ShineBorderCard hoverOnly className="contact-connect-card">
      <div className="contact-connect">
        <header className="contact-connect__header">
          <h3 className="contact-connect__title">{contactConnect.title}</h3>
          <p className="contact-connect__subtitle">{contactConnect.subtitle}</p>
        </header>

        <div className="contact-connect__channels">
          {channels.map((channel) => (
            <a
              key={channel.id}
              href={channel.href}
              target={channel.external ? '_blank' : undefined}
              rel={channel.external ? 'noreferrer' : undefined}
              className="contact-connect__channel"
              aria-label={`${channel.name}: ${channel.hint}`}
            >
              <span className="contact-connect__channel-beam" aria-hidden="true" />
              <span className="contact-connect__icon-wrap" aria-hidden="true">
                <SocialIcon name={channel.icon} className="contact-connect__icon" />
              </span>
              <span className="contact-connect__channel-text">
                <span className="contact-connect__channel-name">{channel.name}</span>
                <span className="contact-connect__channel-hint">{channel.hint}</span>
              </span>
              <span className="contact-connect__channel-arrow" aria-hidden="true">
                <ArrowRightIcon />
              </span>
            </a>
          ))}
        </div>

        <div className="contact-connect__meta">
          {siteConfig.location ? (
            <div className="contact-connect__meta-item">
              <h4 className="contact-connect__meta-title">{contactConnect.locationTitle}</h4>
              <p className="contact-connect__meta-text">{siteConfig.location}</p>
              <p className="contact-connect__meta-hint">{contactConnect.locationHint}</p>
            </div>
          ) : null}
          <div className="contact-connect__meta-item">
            <h4 className="contact-connect__meta-title">{contactConnect.responseTitle}</h4>
            <p className="contact-connect__meta-text">{contactConnect.responseHint}</p>
          </div>
        </div>
      </div>
    </ShineBorderCard>
  )
}
