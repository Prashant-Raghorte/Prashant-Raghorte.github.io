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
              <h2 className="about-page__heading">Who I Am</h2>
              <div className="about-page__who-grid">
                <AboutBioCard />
                <AboutHighlightsCard />
              </div>
            </div>

            <div className="about-page__skills">
              <h2 className="about-page__heading about-page__heading--spaced">Skills &amp; Tools</h2>
              <AboutSkillsPanel />
            </div>

            <h2 className="about-page__heading about-page__heading--spaced">Education</h2>
            <AboutEducationList />
          </div>
        </div>
      </section>
    </>
  )
}
