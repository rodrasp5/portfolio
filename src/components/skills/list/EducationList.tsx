import { useTranslation } from 'react-i18next'
import { education } from '../../../data/background'
import { useLocalized } from '../../../i18n/useLocalized'
import { formatPeriod } from '../../../lib/years'
import ListBlock from './ListBlock'

export default function EducationList() {
  const { t } = useTranslation()
  const { l, lang } = useLocalized()
  if (education.length === 0) return null

  return (
    <ListBlock title={t('list.education')}>
      <ul className="space-y-4">
        {education.map((e) => (
          <li key={e.id}>
            <p className="font-medium">{l(e.title)}</p>
            <p className="text-sm text-slate-400">{e.institution}</p>
            <p className="text-sm text-slate-500">{formatPeriod(e.period, lang, t('list.present'))}</p>
          </li>
        ))}
      </ul>
    </ListBlock>
  )
}
