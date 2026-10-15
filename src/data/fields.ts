import type { Field } from './types'

// A ordem define a posição: o 1.º fica no setor superior esquerdo e os seguintes
// seguem no sentido dos ponteiros do relógio. Para acrescentar um campo novo,
// basta juntar um objeto aqui e usar o id em skills.ts.
export const fields: Field[] = [
  { id: 'frontend', name: { pt: 'Front end', en: 'Front end' }, color: '#38bdf8', icon: '🎨' },
  { id: 'backend', name: { pt: 'Back end', en: 'Back end' }, color: '#f59e0b', icon: '⚙️' },
  { id: 'security', name: { pt: 'Segurança', en: 'Security' }, color: '#f472b6', icon: '🛡️' },
]
