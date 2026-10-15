import type { Node, NodeProps } from '@xyflow/react'
import { useTranslation } from 'react-i18next'
import CenterHandles from './CenterHandles'
import LevelPips from './LevelPips'
import { categoryIcon } from './theme'

export type SkillNodeType = Node<
  {
    name: string
    category: string
    color: string
    level: number // 0 bloqueada, 1 a 3
    count: number // nº de projetos que usam a skill
  },
  'skill'
>

export default function SkillNode({ data }: NodeProps<SkillNodeType>) {
  const { t } = useTranslation()
  const locked = data.level === 0

  return (
    <div
      className={`w-[132px] rounded-xl border-2 bg-slate-950 px-2 py-2 text-center ${
        locked ? 'opacity-40 grayscale' : ''
      }`}
      style={{
        borderColor: data.color,
        boxShadow: locked ? 'none' : `0 0 16px ${data.color}55`,
      }}
    >
      <CenterHandles />
      <div className="text-lg">{locked ? '🔒' : categoryIcon(data.category)}</div>
      <div className="text-sm font-semibold text-white">{data.name}</div>
      <div className="text-[11px]" style={{ color: data.color }}>
        {t(`category.${data.category}`)}
      </div>
      <div className="mt-2">
        <LevelPips level={data.level} color={data.color} />
      </div>
      <div className="mt-1 text-[11px] leading-tight text-slate-400">
        {locked ? (
          t('tree.locked')
        ) : (
          <>
            <div>{t('tree.level', { level: data.level })}</div>
            <div>{data.count > 0 ? t('tree.projects', { count: data.count }) : t('tree.base')}</div>
          </>
        )}
      </div>
    </div>
  )
}
