import { siteConfig } from '@/config/site'
import { getResumeDownloadFilename, siteCopy } from '@/config/copy'
import { ROUTES } from '@/constants'
import { aboutAvailability, aboutFocusAreas } from '@/data/about'
import { Button } from '@/components/ui/Button'
import { DownloadIcon } from '@/components/ui/icons'
import { ShineBorderCard } from '@/components/ui/ShineBorderCard'
import './AboutHighlightsCard.css'

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="m5 12.5 4 4 10-10"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function AboutHighlightsCard() {
  return (
    <ShineBorderCard hoverOnly className="about-highlights-card">
      <div className="about-highlights">
        <section className="about-highlights__section">
          <h3 className="about-highlights__title">Focus areas</h3>
          <ul className="about-highlights__chips">
            {aboutFocusAreas.map((item) => (
              <li key={item} className="about-highlights__chip">
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section className="about-highlights__section">
          <h3 className="about-highlights__title">Open to</h3>
          <ul className="about-highlights__list">
            {aboutAvailability.map((item) => (
              <li key={item} className="about-highlights__list-item">
                <span className="about-highlights__check" aria-hidden="true">
                  <CheckIcon />
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <div className="about-highlights__actions">
          <Button
            variant="shine"
            href={siteConfig.resumeUrl}
            download={getResumeDownloadFilename(siteConfig.name)}
            icon={<DownloadIcon />}
          >
            {siteCopy.footer.downloadCv}
          </Button>
          <Button variant="ghost" to={ROUTES.CONTACT}>
            Get in touch
          </Button>
        </div>
      </div>
    </ShineBorderCard>
  )
}
