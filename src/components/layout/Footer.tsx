import { Link } from 'react-router-dom'
import { getCopyrightNotice, getResumeDownloadFilename, siteCopy } from '@/config/copy'
import { siteConfig } from '@/config/site'
import { mainNavItems, ROUTES } from '@/constants'
import { NavIcon } from '@/components/navbar/NavIcon'
import { SocialIcon } from '@/components/ui/SocialIcon'
import './Footer.css'

const LOGO_INITIALS = siteConfig.name
  .split(' ')
  .map((part) => part[0])
  .join('')
  .slice(0, 2)
  .toUpperCase()

export function Footer() {
  const { github, linkedin, instagram, email, phone } = siteConfig.links

  return (
    <footer className="footer">
      <div className="footer__shine" aria-hidden="true" />

      <div className="container footer__panel">
        <Link to={ROUTES.HOME} className="footer__brand" aria-label={`${siteConfig.name} — home`}>
          <span className="footer__mark">{LOGO_INITIALS}</span>
          <span className="footer__brand-copy">
            <span className="footer__name">{siteConfig.name}</span>
            <span className="footer__tagline">{siteConfig.tagline}</span>
          </span>
        </Link>

        <nav className="footer__orbit" aria-label="Footer navigation">
          {mainNavItems.map((item) => (
            <Link
              key={item.id}
              to={item.to}
              className="footer__orbit-link"
              title={item.label}
              aria-label={item.label}
            >
              <NavIcon name={item.icon} className="footer__orbit-icon" />
            </Link>
          ))}
        </nav>

        <div className="footer__connect">
          <div className="footer__socials" aria-label="Social and contact links">
            {email && (
              <a href={`mailto:${email}`} className="footer-social-link" aria-label="Send email">
                <SocialIcon name="email" className="footer-social-link__icon" />
              </a>
            )}
            {phone && (
              <a
                href={`tel:${phone.replace(/\s+/g, '')}`}
                className="footer-social-link"
                aria-label="Call phone"
              >
                <SocialIcon name="phone" className="footer-social-link__icon" />
              </a>
            )}
            {github && (
              <a
                href={github}
                target="_blank"
                rel="noreferrer"
                className="footer-social-link"
                aria-label="GitHub profile"
              >
                <SocialIcon name="github" className="footer-social-link__icon" />
              </a>
            )}
            {linkedin && (
              <a
                href={linkedin}
                target="_blank"
                rel="noreferrer"
                className="footer-social-link"
                aria-label="LinkedIn profile"
              >
                <SocialIcon name="linkedin" className="footer-social-link__icon" />
              </a>
            )}
            {instagram && (
              <a
                href={instagram}
                target="_blank"
                rel="noreferrer"
                className="footer-social-link"
                aria-label="Instagram profile"
              >
                <SocialIcon name="instagram" className="footer-social-link__icon" />
              </a>
            )}
          </div>

          <span className="footer__connect-divider" aria-hidden="true" />

          <a
            href={siteConfig.resumeUrl}
            download={getResumeDownloadFilename(siteConfig.name)}
            className="footer__resume"
          >
            <span className="footer__resume-inner">{siteCopy.footer.downloadCv}</span>
          </a>
        </div>
      </div>

      <div className="container footer__bottom">
        <p className="footer__copyright">{getCopyrightNotice(siteConfig.name)}</p>
      </div>
    </footer>
  )
}
