import type { Period } from '../data/background'
import type { Lang } from '../i18n/useLocalized'

const monthIndex = (ym: string) => {
  const [y, m] = ym.split('-').map(Number)
  return y * 12 + (m - 1)
}

export function yearsOf(period: Period, now = new Date()): number {
  const start = monthIndex(period.start)
  const end = period.end ? monthIndex(period.end) : now.getFullYear() * 12 + now.getMonth()
  return Math.max(0, (end - start) / 12)
}

export const round1 = (n: number) => Math.round(n * 10) / 10

const locales: Record<Lang, string> = { pt: 'pt-PT', en: 'en-GB' }

export function formatMonth(ym: string, lang: Lang): string {
  const [y, m] = ym.split('-').map(Number)
  return new Date(y, m - 1).toLocaleDateString(locales[lang], { month: 'short', year: 'numeric' })
}

export function formatPeriod(period: Period, lang: Lang, presentLabel: string): string {
  const end = period.end ? formatMonth(period.end, lang) : presentLabel
  return `${formatMonth(period.start, lang)} - ${end}`
}
