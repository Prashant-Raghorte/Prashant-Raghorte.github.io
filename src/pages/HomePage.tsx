import { FeaturedExperienceSection } from '@/sections/experience/FeaturedExperienceSection'
import { ContactPreviewSection } from '@/sections/contact/ContactPreviewSection'
import { HeroSection } from '@/sections/home/HeroSection'
import { FeaturedProjectsSection } from '@/sections/projects/FeaturedProjectsSection'
import { HomeSkillsSection } from '@/sections/skills/HomeSkillsSection'
import { PageMeta } from '@/components/seo/PageMeta'
import { getPersonJsonLd } from '@/config/seo'

export function HomePage() {
  return (
    <>
      <PageMeta page="home" jsonLd={getPersonJsonLd()} />
      <HeroSection />
      <FeaturedExperienceSection />
      <HomeSkillsSection />
      <FeaturedProjectsSection />
      <ContactPreviewSection />
    </>
  )
}
