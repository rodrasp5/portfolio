import { useTranslation } from 'react-i18next'
import { experiences } from '../../../data/background'
import { useLocalized } from '../../../i18n/useLocalized'
import { formatPeriod } from '../../../lib/years'
import ListBlock from './ListBlock'

export default function ExperienceList() {
  const { t } = useTranslation()
  const { l, lang } = useLocalized()
  if (experiences.length === 0) return null

  return (
    <ListBlock title={t('list.experience')}>
      <ul className="space-y-4">
        {experiences.map((e) => (
          <li key={e.id}>
            <p className="font-medium">{l(e.role)}</p>
            <p className="text-sm text-slate-400">{e.company}</p>
            <p className="text-sm text-slate-500">{formatPeriod(e.period, lang, t('list.present'))}</p>
            {e.description && <p className="mt-1 max-w-xl text-sm text-slate-300">{l(e.description)}</p>}
          </li>
        ))}
      </ul>
    </ListBlock>
  )
}
