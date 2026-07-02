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
  details?: string
}

export type SkillCategory = {
  id: string
  title: string
  skills: string[]
}

export type Project = {
  id: string
  title: string
  description: string
  tags: string[]
  url?: string
  repoUrl?: string
}

export type Skill = {
  name: string
  category: 'frontend' | 'backend' | 'tools' | 'other'
}
