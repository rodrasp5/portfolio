import { Link } from 'react-router'
import { useTranslation } from 'react-i18next'
import Section from './Section'
import SkillsExplorer from '../skills/SkillsExplorer'

export default function SkillsSection() {
  const { t } = useTranslation()

  return (
    <Section id="skills" tone="dark">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold">{t('skills.title')}</h2>
          <p className="mt-2 text-sm text-slate-400">{t('skills.subtitle')}</p>
        </div>
        <Link to="/skill-tree" className="shrink-0 text-sm underline">
          {t('skills.fullscreen')}
        </Link>
      </div>
      <div className="mt-6">
        <SkillsExplorer embedded treeClassName="h-[66vh] min-h-[440px]" />
      </div>
    </Section>
  )
}
