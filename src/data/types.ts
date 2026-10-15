import type { Localizable } from '../i18n/useLocalized'

export type SkillCategory = 'linguagem' | 'framework' | 'base-de-dados' | 'ferramenta' | 'conceito'

// Campo = setor da skill tree (Front end, Back end, Segurança...)
export interface Field {
  id: string
  name: Localizable
  color: string
  icon: string
}

export interface Skill {
  id: string
  name: string
  category: SkillCategory // tipo de tecnologia
  field: string // id de um Field (setor da árvore onde aparece)
  requires?: string[] // pré-requisitos (ex: laravel requer php)
}

export interface ProjectLink {
  label: Localizable
  url: string
}

export interface Project {
  slug: string
  name: Localizable
  description: Localizable
  images: string[]
  links: ProjectLink[]
  skills: string[] // ids de Skill usadas neste projeto
  date: string // 'YYYY-MM'
  featured?: boolean
}
