import { env } from '@/config/env'
import { siteConfig } from '@/config/site'

export type ContactFormPayload = {
  name: string
  email: string
  subject: string
  message: string
}

export async function submitContactForm(payload: ContactFormPayload): Promise<void> {
  const endpoint = resolveEndpoint()

  const body = {
    name: payload.name,
    email: payload.email,
    subject: payload.subject || `Contact from ${payload.name}`,
    message: payload.message,
    _subject: payload.subject || `New message from ${payload.name}`,
    _template: 'table',
    _captcha: 'false',
  }

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(body),
  })

  if (!response.ok) {
    throw new Error('Unable to send message. Please try again or email directly.')
  }
}

function resolveEndpoint(): string {
  if (env.contactFormEndpoint) {
    return env.contactFormEndpoint
  }

  const email = siteConfig.links.email
  if (!email) {
    throw new Error('Contact email is not configured.')
  }

  return `https://formsubmit.co/ajax/${encodeURIComponent(email)}`
}
