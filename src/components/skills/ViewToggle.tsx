import { useTranslation } from 'react-i18next'

export type SkillsView = 'tree' | 'list'

interface Props {
  view: SkillsView
  onChange: (view: SkillsView) => void
}

export default function ViewToggle({ view, onChange }: Props) {
  const { t } = useTranslation()

  return (
    <button
      type="button"
      onClick={() => onChange(view === 'tree' ? 'list' : 'tree')}
      className="rounded-full border border-slate-500 px-4 py-1.5 text-sm hover:bg-white hover:text-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
    >
      {view === 'tree' ? t('view.toList') : t('view.toTree')}
    </button>
  )
}
