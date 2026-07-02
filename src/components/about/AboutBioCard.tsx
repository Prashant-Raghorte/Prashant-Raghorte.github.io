import { aboutBioParagraphs } from '@/data/about'
import { ShineBorderCard } from '@/components/ui/ShineBorderCard'
import './AboutBioCard.css'

export function AboutBioCard() {
  return (
    <ShineBorderCard hoverOnly className="about-bio-card">
      <div className="about-bio">
        {aboutBioParagraphs.map((paragraph, index) => (
          <p key={index} className="about-bio__paragraph text-fluid-base">
            {paragraph}
          </p>
        ))}
      </div>
    </ShineBorderCard>
  )
}
