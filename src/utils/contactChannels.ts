import { siteCopy } from '@/config/copy'
import { siteConfig } from '@/config/site'

export type ContactChannelIcon = 'email' | 'phone' | 'github' | 'linkedin' | 'instagram'

export type ContactChannel = {
  id: string
  name: string
  hint: string
  href: string
  icon: ContactChannelIcon
  external?: boolean
  featured?: boolean
}

export function getContactChannels(options: { featuredEmail?: boolean } = {}): ContactChannel[] {
  const { featuredEmail = false } = options
  const { github, linkedin, instagram, email, phone } = siteConfig.links
  const hints = siteCopy.sections.contactChannels
  const channels: ContactChannel[] = []

  if (email) {
    channels.push({
      id: 'email',
      name: 'Email',
      hint: hints.email,
      href: `mailto:${email}`,
      icon: 'email',
      featured: featuredEmail,
    })
  }

  if (phone) {
    channels.push({
      id: 'phone',
      name: 'Phone',
      hint: hints.phone,
      href: `tel:${phone.replace(/\s+/g, '')}`,
      icon: 'phone',
    })
  }

  if (github) {
    channels.push({
      id: 'github',
      name: 'GitHub',
      hint: hints.github,
      href: github,
      icon: 'github',
      external: true,
    })
  }

  if (linkedin) {
    channels.push({
      id: 'linkedin',
      name: 'LinkedIn',
      hint: hints.linkedin,
      href: linkedin,
      icon: 'linkedin',
      external: true,
    })
  }

  if (instagram) {
    channels.push({
      id: 'instagram',
      name: 'Instagram',
      hint: hints.instagram,
      href: instagram,
      icon: 'instagram',
      external: true,
    })
  }

  return channels
}
