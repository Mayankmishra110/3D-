export interface Stat {
  label: string
  value: number
  suffix: string
  description: string
}

export interface Project {
  id: string
  title: string
  tagline: string
  description: string
  tech: string[]
  highlights: string[]
  accentColor: string
  featured: boolean
  github: string
  live: string
  category: string
  size: 'large' | 'small'
}

export interface SkillGroup {
  label: string
  items: string[]
}

export interface Experience {
  title: string
  company: string
  companyUrl: string
  location: string
  period: string
  type: string
  description: string
  highlights: string[]
  tech: string[]
}

export interface NavItem {
  label: string
  href: string
}

export interface NodeDatum {
  orbitRadius: number
  orbitSpeed: number
  phase: number
  yAmplitude: number
  colorIndex: 0 | 1 | 2
}

export type PerformanceTier = 'low' | 'high'
