import { useTranslation } from 'react-i18next'
import { site } from '../data/site'

export default function Footer() {
  const { t } = useTranslation()

  return (
    <footer id="contactos" className="scroll-mt-16 bg-black px-4 py-12 text-white">
      <div className="mx-auto flex max-w-5xl flex-col gap-6 sm:flex-row sm:justify-between">
        <div>
          <h2 className="text-xl font-bold">{t('footer.title')}</h2>
          <p className="mt-2 text-sm text-slate-400">{t('footer.cta')}</p>
        </div>
        <ul className="space-y-1 text-sm">
          <li>
            <a href={`mailto:${site.contacts.email}`} className="hover:underline">
              {site.contacts.email}
            </a>
          </li>
          <li>
            <a href={site.contacts.github} target="_blank" rel="noreferrer" className="hover:underline">
              GitHub
            </a>
          </li>
          <li>
            <a href={site.contacts.linkedin} target="_blank" rel="noreferrer" className="hover:underline">
              LinkedIn
            </a>
          </li>
        </ul>
      </div>
      <p className="mx-auto mt-8 max-w-5xl text-xs text-slate-500">
        © {new Date().getFullYear()} {site.name}
      </p>
    </footer>
  )
}
