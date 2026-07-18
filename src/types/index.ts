export type NavIconName =
  | 'home'
  | 'about'
  | 'experience'
  | 'education'
  | 'skills'
  | 'projects'
  | 'contact'

export type Experience = {
  id: string
  company: string
  companyUrl?: string
  companyLogoUrl?: string
  role: string
  location: string
  period: string
  isCurrent?: boolean
  highlights: string[]
}

export type Education = {
  id: string
  institution: string
  degree: string
  period: string
  level: string
  credentialCode: string
  startYear: number
  endYear: number
  /** Stream or discipline for this step */
  stream: string
  location: string
  /** Single sentence framing this step */
  highlight: string
  /** Study focus topics shown as a quiet text row */
  focus: string[]
  board?: string
  affiliation?: string
}

export type SkillCategory = {
  id: string
  title: string
  skills: string[]
}

export type ProjectDeliverySnapshot = {
  integrations: number
  dataStores: number
  aiIntegrations: number
}

export type Project = {
  id: string
  title: string
  domain: string
  description: string
  catalogSummary: string
  spotlightQuote: string
  modules: string[]
  deliverySnapshot: ProjectDeliverySnapshot
  tags: string[]
  highlights?: string[]
  url?: string
  repoUrl?: string
  logoUrl?: string
}

export type Skill = {
  name: string
  category: 'frontend' | 'backend' | 'tools' | 'other'
}
