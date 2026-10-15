import { useTranslation } from 'react-i18next'
import Section from './Section'
import SkillsExplorer from '../skills/SkillsExplorer'

export default function SkillsSection() {
  const { t } = useTranslation()

  return (
    <Section id="skills" tone="dark" wide>
      <div>
        <h2 className="font-display text-3xl font-bold tracking-tight">{t('skills.title')}</h2>
        <p className="mt-2 text-sm text-slate-400">{t('skills.subtitle')}</p>
      </div>
      <div className="mt-6">
        <SkillsExplorer
          embedded
          fullscreenTo="/skill-tree"
          treeClassName="h-[calc(100svh-20rem)] min-h-[460px]"
        />
      </div>
    </Section>
  )
}