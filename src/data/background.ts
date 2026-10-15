import type { Localizable } from '../i18n/useLocalized'

// Datas no formato 'YYYY-MM'. Sem "end" significa que ainda está em curso.
export interface Period {
  start: string
  end?: string
}

export interface Education {
  id: string
  title: Localizable
  institution: string
  period: Period
}

export interface Experience {
  id: string
  role: Localizable
  company: string
  period: Period
  description?: Localizable
}

export interface Certificate {
  id: string
  title: Localizable
  issuer: string
  date: string // 'YYYY-MM'
  url?: string
}

// Formação: entra no cálculo do nível. Confirma as datas.
export const education: Education[] = [
  {
    id: 'leic',
    title: {
      pt: 'Licenciatura em Engenharia Informática',
      en: "Bachelor's Degree in Computer Engineering",
    },
    institution: 'IPLeiria (ESTG)',
    period: { start: '2023-09', end: '2026-07' },
  },
]

// Experiência profissional: entra no cálculo do nível. Exemplo de entrada:
// {
//   id: 'estagio',
//   role: { pt: 'Estagiário', en: 'Intern' },
//   company: 'Empresa',
//   period: { start: '2025-03', end: '2025-06' },
//   description: { pt: 'O que fiz.', en: 'What I did.' },
// },
export const experiences: Experience[] = []

// Certificados. Exemplo de entrada:
// { id: 'c1', title: 'Nome do certificado', issuer: 'Entidade', date: '2025-11', url: 'https://...' },
export const certificates: Certificate[] = []
