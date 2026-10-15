import type { Node, NodeProps } from '@xyflow/react'
import { useTranslation } from 'react-i18next'
import { round1 } from '../../lib/years'
import CenterHandles from './CenterHandles'
import { GOLD } from './theme'

export type CenterNodeType = Node<
  { name: string; level: number; formation: number; experience: number },
  'center'
>

export default function CenterNode({ data }: NodeProps<CenterNodeType>) {
  const { t } = useTranslation()

  return (
    <div
      className="flex h-44 w-44 flex-col items-center justify-center rounded-full border-4 bg-slate-950 text-center"
      style={{ borderColor: GOLD, boxShadow: `0 0 36px ${GOLD}55` }}
    >
      <CenterHandles />
      <div className="text-xs text-slate-400">{data.name}</div>
      <div className="text-3xl font-bold text-white">{t('tree.level', { level: data.level })}</div>
      <div className="mt-1 text-[11px] leading-tight text-slate-300">
        {t('tree.formationYears', { count: round1(data.formation) })}
      </div>
      <div className="text-[11px] leading-tight text-slate-300">
        {t('tree.experienceYears', { count: round1(data.experience) })}
      </div>
    </div>
  )
}
