import { siteCopy } from '@/config/copy'
import { Link } from 'react-router-dom'
import { siteConfig } from '@/config/site'
import { AvailabilityBadge, Section } from '@/components/common'
import { SocialIcon } from '@/components/ui/SocialIcon'
import { ROUTES } from '@/constants'
import './ContactPreviewSection.css'

export function ContactPreviewSection() {
  const { github, linkedin, instagram, email, phone } = siteConfig.links

  return (
    <Section eyebrow="Connect" title="Get In Touch">
      <div className="contact-preview">
        <AvailabilityBadge showSummary className="contact-preview__availability" />

        <p className="prose prose--wide text-fluid-base contact-preview__text">
          {siteCopy.sections.contactPreview}
        </p>

        <div className="contact-preview__socials">
          {email && (
            <a
              href={`mailto:${email}`}
              className="contact-preview__social"
              aria-label="Email"
            >
              <SocialIcon name="email" className="contact-preview__social-icon" />
              <span>Email</span>
            </a>
          )}
          {phone && (
            <a
              href={`tel:${phone.replace(/\s+/g, '')}`}
              className="contact-preview__social"
              aria-label="Phone"
            >
              <SocialIcon name="phone" className="contact-preview__social-icon" />
              <span>Phone</span>
            </a>
          )}
          {github && (
            <a
              href={github}
              target="_blank"
              rel="noreferrer"
              className="contact-preview__social"
              aria-label="GitHub profile"
            >
              <SocialIcon name="github" className="contact-preview__social-icon" />
              <span>GitHub</span>
            </a>
          )}
          {linkedin && (
            <a
              href={linkedin}
              target="_blank"
              rel="noreferrer"
              className="contact-preview__social"
              aria-label="LinkedIn profile"
            >
              <SocialIcon name="linkedin" className="contact-preview__social-icon" />
              <span>LinkedIn</span>
            </a>
          )}
          {instagram && (
            <a
              href={instagram}
              target="_blank"
              rel="noreferrer"
              className="contact-preview__social"
              aria-label="Instagram profile"
            >
              <SocialIcon name="instagram" className="contact-preview__social-icon" />
              <span>Instagram</span>
            </a>
          )}
        </div>

        <p className="contact-preview__note">
          For detailed inquiries, proposals, or collaboration requests, please{' '}
          <Link to={ROUTES.CONTACT} className="contact-preview__link">
            visit the contact page
          </Link>
          .
        </p>
      </div>
    </Section>
  )
}
