import { useTranslation } from 'react-i18next'
import { certificates } from '../../../data/background'
import { useLocalized } from '../../../i18n/useLocalized'
import { formatMonth } from '../../../lib/years'
import ListBlock from './ListBlock'

export default function CertificateList() {
  const { t } = useTranslation()
  const { l, lang } = useLocalized()
  if (certificates.length === 0) return null

  return (
    <ListBlock title={t('list.certificates')}>
      <ul className="space-y-4">
        {certificates.map((c) => (
          <li key={c.id}>
            <p className="font-medium">{l(c.title)}</p>
            <p className="text-sm text-slate-400">{c.issuer}</p>
            <p className="text-sm text-slate-500">{formatMonth(c.date, lang)}</p>
            {c.url && (
              <a href={c.url} target="_blank" rel="noreferrer" className="text-sm underline">
                {t('list.viewCertificate')}
              </a>
            )}
          </li>
        ))}
      </ul>
    </ListBlock>
  )
}
