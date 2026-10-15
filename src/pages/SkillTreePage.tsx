import { useTranslation } from 'react-i18next'
import SkillsExplorer from '../components/skills/SkillsExplorer'

export default function SkillTreePage() {
  const { t } = useTranslation()

  return (
    <main className="min-h-[calc(100svh-4rem)] bg-black px-4 py-6 text-white">
      <div className="mx-auto max-w-6xl">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">{t('skills.pageTitle')}</h1>
          <a href="/#skills" className="text-sm underline">
            {t('skills.backHome')}
          </a>
        </div>
        <div className="mt-4">
          <SkillsExplorer treeClassName="h-[calc(100svh-12rem)] min-h-[480px]" />
        </div>
      </div>
    </main>
  )
}
