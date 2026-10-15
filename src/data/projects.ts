import type { Project } from './types'

export const projects: Project[] = [
  {
    slug: 'exemplo',
    name: 'Projeto de exemplo',
    description: {
      pt: 'Descrição curta do projeto.',
      en: 'Short description of the project.',
    },
    images: ['/projects/exemplo-1.webp'],
    links: [
      { label: { pt: 'Código', en: 'Code' }, url: 'https://github.com/...' },
      { label: 'Demo', url: 'https://...' },
    ],
    skills: ['laravel', 'vue', 'mysql', 'docker', 'tailwind'],
    date: '2026-06',
    featured: true,
  },
]
