import { siteCopy } from '@/config/copy'
import { PageHeader } from '@/components/common/PageHeader'
import { AboutBioCard } from '@/components/about/AboutBioCard'
import { AboutEducationList } from '@/components/about/AboutEducationList'
import { AboutHighlightsCard } from '@/components/about/AboutHighlightsCard'
import { AboutProfileCard } from '@/components/about/AboutProfileCard'
import { AboutSkillsPanel } from '@/components/about/AboutSkillsPanel'
import { PageMeta } from '@/components/seo/PageMeta'
import './AboutPage.css'
import '@/components/common/PageHeader.css'

export function AboutPage() {
  return (
    <>
      <PageMeta page="about" />
      <PageHeader
        title={siteCopy.pages.about.title}
        subtitle={siteCopy.pages.about.subtitle}
      />

      <section className="section-block about-page">
        <div className="container about-page__inner">
          <AboutProfileCard />

          <div className="about-page__content">
            <div className="about-page__who">
              <header className="about-section-head">
                <span className="about-section-head__accent" aria-hidden="true" />
                <div className="about-section-head__copy">
                  <h2 className="about-section-head__title">Who I Am</h2>
                  <p className="about-section-head__hint">
                    Narrative profile, focus spectrum, and how I like to collaborate
                  </p>
                </div>
              </header>
              <div className="about-page__who-grid">
                <AboutBioCard />
                <AboutHighlightsCard />
              </div>
            </div>

            <div className="about-page__skills">
              <header className="about-section-head">
                <span className="about-section-head__accent" aria-hidden="true" />
                <div className="about-section-head__copy">
                  <h2 className="about-section-head__title">Skills &amp; Tools</h2>
                  <p className="about-section-head__hint">
                    Languages, frameworks, and platforms I use to design and ship backend systems
                  </p>
                </div>
              </header>
              <AboutSkillsPanel />
            </div>

            <div className="about-page__education">
              <header className="about-section-head">
                <span className="about-section-head__accent" aria-hidden="true" />
                <div className="about-section-head__copy">
                  <h2 className="about-section-head__title">Qualifications</h2>
                  <p className="about-section-head__hint">
                    Formal academic path from science higher secondary to undergraduate
                    computer engineering
                  </p>
                </div>
              </header>
              <AboutEducationList />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
