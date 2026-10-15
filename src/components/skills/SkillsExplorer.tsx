import { useState } from 'react'
import SkillTree from '../skilltree/SkillTree'
import SkillList from './list/SkillList'
import ViewToggle, { type SkillsView } from './ViewToggle'

interface Props {
  embedded?: boolean
  treeClassName?: string
}

// Alterna entre a skill tree e a versão simplificada em lista
export default function SkillsExplorer({ embedded = false, treeClassName }: Props) {
  const [view, setView] = useState<SkillsView>('tree')

  return (
    <div>
      <div className="mb-4 flex justify-end">
        <ViewToggle view={view} onChange={setView} />
      </div>
      {view === 'tree' ? (
        <SkillTree embedded={embedded} className={treeClassName} />
      ) : (
        <SkillList />
      )}
    </div>
  )
}
