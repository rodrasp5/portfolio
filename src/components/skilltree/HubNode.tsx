import type { Node, NodeProps } from '@xyflow/react'
import { useTranslation } from 'react-i18next'
import { useLocalized, type Localizable } from '../../i18n/useLocalized'
import CenterHandles from './CenterHandles'

export type HubNodeType = Node<
  { name: Localizable; icon: string; color: string; done: number; total: number },
  'hub'
>

export default function HubNode({ data }: NodeProps<HubNodeType>) {
  const { t } = useTranslation()
  const { l } = useLocalized()
  const active = data.done > 0

  return (
    <div
      className={`w-36 rounded-full border-2 bg-slate-950 px-4 py-2 text-center ${
        active ? '' : 'opacity-50 grayscale'
      }`}
      style={{
        borderColor: data.color,
        boxShadow: active ? `0 0 22px ${data.color}66` : 'none',
      }}
    >
      <CenterHandles />
      <div className="text-lg">{data.icon}</div>
      <div className="font-semibold text-white">{l(data.name)}</div>
      <div className="text-[11px] text-slate-400">
        {t('tree.fieldProgress', { done: data.done, total: data.total })}
      </div>
    </div>
  )
}
