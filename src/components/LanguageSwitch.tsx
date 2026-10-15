import { useTranslation } from 'react-i18next'
import { useLocalized } from '../i18n/useLocalized'

const languages = ['pt', 'en'] as const

export default function LanguageSwitch() {
  const { i18n, t } = useTranslation()
  const { lang } = useLocalized()

  return (
    <div role="group" aria-label={t('language.label')} className="flex gap-2 text-sm">
      {languages.map((code) => (
        <button
          key={code}
          type="button"
          onClick={() => void i18n.changeLanguage(code)}
          aria-pressed={code === lang}
          className={code === lang ? 'font-bold underline' : 'text-slate-400 hover:text-slate-900'}
        >
          {code.toUpperCase()}
        </button>
      ))}
    </div>
  )
}
