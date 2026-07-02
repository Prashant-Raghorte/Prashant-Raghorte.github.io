import { siteCopy } from '@/config/copy'
import { siteConfig } from '@/config/site'
import { ShineBorderCard } from '@/components/ui/ShineBorderCard'
import { SocialIcon } from '@/components/ui/SocialIcon'
import './ContactConnectPanel.css'

type ConnectChannel = {
  id: string
  name: string
  href: string
  display: string
  icon: 'github' | 'linkedin' | 'email' | 'phone'
}

function formatChannelUrl(url: string): string {
  return url.replace(/^(mailto:|tel:|https:\/\/|http:\/\/)/, '')
}

function buildChannels(): ConnectChannel[] {
  const { github, linkedin, email, phone } = siteConfig.links
  const channels: ConnectChannel[] = []

  if (email) {
    channels.push({
      id: 'email',
      name: 'Email',
      href: `mailto:${email}`,
      display: email,
      icon: 'email',
    })
  }

  if (phone) {
    channels.push({
      id: 'phone',
      name: 'Phone',
      href: `tel:${phone.replace(/\s+/g, '')}`,
      display: phone,
      icon: 'phone',
    })
  }

  if (github) {
    channels.push({
      id: 'github',
      name: 'GitHub',
      href: github,
      display: formatChannelUrl(github),
      icon: 'github',
    })
  }

  if (linkedin) {
    channels.push({
      id: 'linkedin',
      name: 'LinkedIn',
      href: linkedin,
      display: formatChannelUrl(linkedin),
      icon: 'linkedin',
    })
  }

  return channels
}

export function ContactConnectPanel() {
  const channels = buildChannels()

  return (
    <ShineBorderCard hoverOnly className="contact-connect-card">
      <div className="contact-connect">
        <header className="contact-connect__header">
          <h3 className="contact-connect__title">{siteCopy.sections.contactConnect.title}</h3>
          <p className="contact-connect__subtitle">{siteCopy.sections.contactConnect.subtitle}</p>
        </header>

        <div className="contact-connect__channels">
          {channels.map((channel) => (
            <a
              key={channel.id}
              href={channel.href}
              target={channel.id === 'email' || channel.id === 'phone' ? undefined : '_blank'}
              rel={channel.id === 'email' || channel.id === 'phone' ? undefined : 'noreferrer'}
              className="contact-connect__channel"
            >
              <span className="contact-connect__icon-wrap" aria-hidden="true">
                <SocialIcon name={channel.icon} className="contact-connect__icon" />
              </span>
              <span className="contact-connect__channel-text">
                <span className="contact-connect__channel-name">{channel.name}</span>
                <span className="contact-connect__channel-url">{channel.display}</span>
              </span>
            </a>
          ))}
        </div>

        {siteConfig.location && (
          <div className="contact-connect__location">
            <h4 className="contact-connect__location-title">
              {siteCopy.sections.contactConnect.locationTitle}
            </h4>
            <p className="contact-connect__location-text">{siteConfig.location}</p>
          </div>
        )}
      </div>
    </ShineBorderCard>
  )
}
