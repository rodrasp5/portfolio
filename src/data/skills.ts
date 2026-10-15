import type { Skill } from './types'

export const skills: Skill[] = [
  // Front end
  { id: 'js', name: 'JavaScript', category: 'linguagem', field: 'frontend' },
  { id: 'ts', name: 'TypeScript', category: 'linguagem', field: 'frontend', requires: ['js'] },
  { id: 'vue', name: 'Vue 3', category: 'framework', field: 'frontend', requires: ['js'] },
  { id: 'react', name: 'React', category: 'framework', field: 'frontend', requires: ['js'] },
  { id: 'tailwind', name: 'Tailwind CSS', category: 'ferramenta', field: 'frontend' },

  // Back end
  { id: 'php', name: 'PHP', category: 'linguagem', field: 'backend' },
  { id: 'laravel', name: 'Laravel', category: 'framework', field: 'backend', requires: ['php'] },
  { id: 'mysql', name: 'MySQL', category: 'base-de-dados', field: 'backend' },
  { id: 'docker', name: 'Docker', category: 'ferramenta', field: 'backend' },
  { id: 'git', name: 'Git', category: 'ferramenta', field: 'backend' },

  // Segurança (exemplos: ficam bloqueadas até aparecerem num projeto)
  { id: 'auth', name: 'Autenticação', category: 'conceito', field: 'security' },
  { id: 'owasp', name: 'OWASP Top 10', category: 'conceito', field: 'security' },
]
