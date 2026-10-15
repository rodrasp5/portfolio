import { useTranslation } from 'react-i18next'

export type Lang = 'pt' | 'en'
export type LocalizedText = Record<Lang, string>
// Texto simples (igual nas duas línguas) ou { pt, en }
export type Localizable = string | LocalizedText

export function useLocalized() {
  const { i18n } = useTranslation()
  const lang: Lang = i18n.resolvedLanguage === 'en' ? 'en' : 'pt'
  const l = (text: Localizable) => (typeof text === 'string' ? text : text[lang])
  return { lang, l }
}
