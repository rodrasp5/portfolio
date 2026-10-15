import { education, experiences } from '../data/background'
import { yearsOf } from './years'

// Nível = anos de formação + anos de experiência (arredondado, mínimo 1).
export function getProfileLevel() {
  const formation = education.reduce((sum, e) => sum + yearsOf(e.period), 0)
  const experience = experiences.reduce((sum, e) => sum + yearsOf(e.period), 0)
  return {
    formation,
    experience,
    level: Math.max(1, Math.round(formation + experience)),
  }
}
