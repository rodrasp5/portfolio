import { skills } from '../data/skills'
import { projects } from '../data/projects'

export interface DerivedSkill {
  id: string
  name: string
  category: string
  field: string
  requires: string[]
  count: number // nº de projetos que usam a skill
  level: 0 | 1 | 2 | 3 // 0 bloqueada
  projectSlugs: string[]
}

// Lê os projetos e calcula, para cada skill, quantos a usam e o nível.
// Usar uma skill desbloqueia os pré-requisitos (quem usa Laravel sabe PHP).
export function deriveSkills(): DerivedSkill[] {
  const base = skills.map((s) => {
    const used = projects.filter((p) => p.skills.includes(s.id))
    const count = used.length
    const level = (count === 0 ? 0 : count === 1 ? 1 : count <= 3 ? 2 : 3) as DerivedSkill['level']
    return {
      id: s.id,
      name: s.name,
      category: s.category,
      field: s.field,
      requires: s.requires ?? [],
      count,
      level,
      projectSlugs: used.map((p) => p.slug),
    }
  })

  const byId = new Map(base.map((s) => [s.id, s]))
  const unlocked = new Set<string>()
  const unlock = (id: string) => {
    if (unlocked.has(id)) return
    unlocked.add(id)
    byId.get(id)?.requires.forEach(unlock)
  }
  base.filter((s) => s.count > 0).forEach((s) => unlock(s.id))

  return base.map((s) => ({
    ...s,
    level: (unlocked.has(s.id) ? Math.max(1, s.level) : 0) as DerivedSkill['level'],
  }))
}
