import { siteConfig } from '@/config/site'
import { getResumeDownloadFilename, siteCopy } from '@/config/copy'
import { SECTION_IDS, ROUTES } from '@/constants'
import { Button } from '@/components/ui/Button'
import { ChevronDownIcon, DownloadIcon } from '@/components/ui/icons'
import { scrollToSection } from '@/utils/scroll'
import './HeroSection.css'

export function HeroSection() {
  return (
    <section id="home" className="hero section-block">
      <div className="container hero__layout">
        <div className="hero__content">
          <h1 className="hero__title text-balance">{siteConfig.name}</h1>
          <p className="hero__subtitle prose text-fluid-base">{siteConfig.description}</p>
          <div className="hero__actions">
            <Button
              variant="shine"
              href={siteConfig.resumeUrl}
              download={getResumeDownloadFilename(siteConfig.name)}
              icon={<DownloadIcon />}
            >
              {siteCopy.footer.downloadCv}
            </Button>
            <Button variant="ghost" to={ROUTES.CONTACT}>
              Get in Touch
            </Button>
          </div>
          <button
            type="button"
            className="hero__scroll-cue"
            onClick={() => scrollToSection(SECTION_IDS.PROJECTS)}
            aria-label={siteCopy.hero.exploreWorkHint}
          >
            <span className="hero__scroll-cue-label">{siteCopy.hero.exploreWork}</span>
            <span className="hero__scroll-cue-icon">
              <ChevronDownIcon />
            </span>
          </button>
        </div>

        <div className="hero__media">
          <div className="hero__portrait">
            <div className="hero__portrait-glow" aria-hidden="true" />
            <div className="hero__portrait-orbit hero__portrait-orbit--outer" aria-hidden="true" />
            <div className="hero__portrait-orbit hero__portrait-orbit--inner" aria-hidden="true" />
            <span className="hero__portrait-spark hero__portrait-spark--1" aria-hidden="true" />
            <span className="hero__portrait-spark hero__portrait-spark--2" aria-hidden="true" />
            <span className="hero__portrait-spark hero__portrait-spark--3" aria-hidden="true" />
            <div className="hero__portrait-ring">
              <div className="hero__portrait-frame">
                <img
                  src={siteConfig.profileImageUrl}
                  alt={`Portrait of ${siteConfig.name}`}
                  className="hero__portrait-image"
                  width={480}
                  height={480}
                  loading="eager"
                  decoding="async"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
